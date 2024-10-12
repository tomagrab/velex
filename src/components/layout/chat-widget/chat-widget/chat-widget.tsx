'use client';

import { useState, useRef } from 'react';
import { MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import ChatWidgetHeader from '@/components/layout/chat-widget/chat-widget-header/chat-widget-header';
import ChatWidgetBody from '@/components/layout/chat-widget/chat-widget-body/chat-widget-body';
import ChatWidgetFooter from '@/components/layout/chat-widget/chat-widget-footer/chat-widget-footer';
import { CustomError } from '@/lib/interfaces/utilities/custom-error/custom-error';
import { Message } from '@/lib/types/utilities/open-ai/message/message';
import { v4 as uuidv4 } from 'uuid';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [threadId, setThreadId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Refs to store the reader and controller for cancellation
  const readerRef = useRef<ReadableStreamDefaultReader | null>(null);
  const controllerRef = useRef<AbortController | null>(null);

  const handleSendMessage = async (messageContent: string) => {
    // Assign a unique ID to the user's message using uuidv4
    const userMessageId = uuidv4();

    // Add the user's message to the chat
    setMessages(prev => [
      ...prev,
      { id: userMessageId, sender: 'user', content: messageContent },
    ]);
    setIsLoading(true);

    try {
      const controller = new AbortController();
      controllerRef.current = controller;

      const response = await fetch('/api/openai/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: messageContent, threadId }),
        signal: controller.signal,
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error from API:', errorData.error);
        // Display error message to the user
        const errorMessageId = uuidv4();

        setMessages(prev => [
          ...prev,
          {
            id: errorMessageId,
            sender: 'error',
            content: `Error: ${errorData.error}`,
          },
        ]);
        return;
      }

      // Get threadId from response headers
      const newThreadId = response.headers.get('X-Thread-Id');
      if (newThreadId) {
        setThreadId(newThreadId);
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('Failed to get reader from response body');
      }

      readerRef.current = reader;

      let assistantMessage = '';
      const decoder = new TextDecoder();

      const readStream = async () => {
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            break;
          }

          const chunk = decoder.decode(value);
          assistantMessage += chunk;

          // Update the last assistant message in the chat
          setMessages(prev => {
            const lastMessage = prev[prev.length - 1];
            if (lastMessage && lastMessage.sender === 'assistant') {
              // Update existing assistant message

              return [
                ...prev.slice(0, -1),
                {
                  id: lastMessage.id,
                  sender: 'assistant',
                  content: assistantMessage,
                },
              ];
            } else {
              // Assign a unique ID to the assistant's message
              const assistantMessageId = uuidv4();

              // Add new assistant message
              return [
                ...prev,
                {
                  id: assistantMessageId,
                  sender: 'assistant',
                  content: assistantMessage,
                },
              ];
            }
          });
        }
      };

      await readStream();
    } catch (error: unknown) {
      const customError = error as CustomError;

      if (customError.name === 'AbortError') {
        // Assign a unique ID to the info message
        const infoMessageId = uuidv4();

        // Add the info message to the chat
        setMessages(prev => [
          ...prev,
          {
            id: infoMessageId,
            sender: 'info',
            content: 'Response generation stopped by user.',
          },
        ]);

        // Remove the info message after 3 seconds
        setTimeout(() => {
          setMessages(prevMessages =>
            prevMessages.filter(message => message.id !== infoMessageId),
          );
        }, 3000);
      } else {
        console.error('Error sending message:', error);
        // Display error message to the user
        const errorMessageId = uuidv4();

        setMessages(prev => [
          ...prev,
          {
            id: errorMessageId,
            sender: 'error',
            content: `Error: ${customError.message}`,
          },
        ]);
      }
    } finally {
      // Ensure isLoading is set to false in all cases
      setIsLoading(false);
      readerRef.current = null;
      controllerRef.current = null;
    }
  };

  const handleClearChat = () => {
    setMessages([]);
    setThreadId(null);
  };

  const handleStopStream = () => {
    if (controllerRef.current) {
      controllerRef.current.abort();
    }
  };

  return (
    <div
      onClick={() => {
        if (!isOpen) {
          setIsOpen(true);
        }
      }}
      className={cn(
        'fixed z-50 overflow-hidden shadow-lg transition-all duration-300',
        isOpen ? 'rounded-lg' : 'rounded-full',
        isOpen
          ? 'bottom-8 right-8 h-96 w-80 sm:h-[32rem] sm:w-96'
          : 'bottom-8 right-8 h-8 w-8 cursor-pointer sm:h-10 sm:w-10',
      )}
    >
      {/* Closed State */}
      {!isOpen && (
        <div className="flex h-full w-full items-center justify-center bg-black dark:bg-slate-800">
          <MessageCircle className="text-white" size={20} />
        </div>
      )}

      {/* Open State */}
      {isOpen && (
        <div className="flex h-full w-full flex-col">
          <ChatWidgetHeader
            title="Chat"
            setIsOpen={setIsOpen}
            messages={messages}
            onClearChat={handleClearChat}
          />

          <ChatWidgetBody messages={messages} />

          <ChatWidgetFooter
            onSend={handleSendMessage}
            isLoading={isLoading}
            onStop={handleStopStream}
          />
        </div>
      )}
    </div>
  );
}

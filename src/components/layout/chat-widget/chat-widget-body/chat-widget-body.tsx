import AgentMessage from '@/components/layout/chat-widget/agent-message/agent-message';
import UserMessage from '@/components/layout/chat-widget/user-message/user-message';
import AssistantMessage from '@/components/layout/chat-widget/assistant-message/assistant-message';
import InfoMessage from '@/components/layout/chat-widget/info-message/info-message';
import ErrorMessage from '@/components/layout/chat-widget/error-message/error-message';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Message } from '@/lib/types/utilities/open-ai/message/message';

type ChatWidgetBodyProps = {
  messages: Message[];
};

export default function ChatWidgetBody({ messages }: ChatWidgetBodyProps) {
  return (
    <ScrollArea className="chat-widget-body flex-1 px-4 py-2 dark:bg-slate-600">
      {messages.map((msg, index) => {
        switch (msg.sender) {
          case 'user':
            return <UserMessage key={index} message={msg} />;
          case 'agent':
            return <AgentMessage key={index} message={msg} />;
          case 'assistant':
            return <AssistantMessage key={index} message={msg} />;
          case 'info':
            return <InfoMessage key={index} message={msg} />;
          case 'error':
            return <ErrorMessage key={index} message={msg} />;
          default:
            return null;
        }
      })}
    </ScrollArea>
  );
}

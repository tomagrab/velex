'use client';

import { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import ChatWidgetHeader from '@/components/layout/chat-widget/chat-widget-header/chat-widget-header';
import ChatWidgetBody from '@/components/layout/chat-widget/chat-widget-body/chat-widget-body';
import ChatWidgetFooter from '@/components/layout/chat-widget/chat-widget-footer/chat-widget-footer';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

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
          <ChatWidgetHeader title="Chat" setIsOpen={setIsOpen} />

          <ChatWidgetBody />

          <ChatWidgetFooter />
        </div>
      )}
    </div>
  );
}

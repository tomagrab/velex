'use client';

import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { ArrowUp, XCircle } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

type ChatWidgetFooterProps = {
  onSend: (message: string) => void;
  isLoading: boolean;
  onStop: () => void;
};

export default function ChatWidgetFooter({
  onSend,
  isLoading,
  onStop,
}: ChatWidgetFooterProps) {
  const [inputValue, setInputValue] = useState('');
  const isDisabled = inputValue.trim().length === 0;

  const handleSend = () => {
    if (inputValue.trim()) {
      onSend(inputValue.trim());
      setInputValue('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && !isLoading) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t bg-slate-800">
      <div className="flex items-center gap-2 p-2">
        <Textarea
          className="resize-none bg-white text-black dark:bg-slate-500 dark:text-white"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
        />
        {isLoading ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={onStop}
                  className="flex items-center justify-center rounded-full bg-red-500 p-2 dark:bg-red-700"
                >
                  <XCircle className="text-white" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <span>Stop Generation</span>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={handleSend}
                  disabled={isLoading || isDisabled}
                  className="flex items-center justify-center rounded-full bg-blue-500 p-2 disabled:cursor-not-allowed disabled:bg-gray-400 dark:bg-background"
                >
                  <ArrowUp className="text-white" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <span>Send Message</span>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
    </div>
  );
}

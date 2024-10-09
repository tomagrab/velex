import { Minus, Trash2 } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Message } from '@/lib/types/utilities/open-ai/message/message';

type ChatWidgetHeaderProps = {
  title: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  messages: Message[];
  onClearChat: () => void;
};

export default function ChatWidgetHeader({
  title,
  setIsOpen,
  messages,
  onClearChat,
}: ChatWidgetHeaderProps) {
  return (
    <div className="flex select-none items-center justify-between bg-slate-800 px-4 py-2 text-white">
      <h2 className="text-lg font-semibold">{title}</h2>
      <div className="flex items-center space-x-2">
        {messages.length > 0 && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={e => {
                    e.stopPropagation();
                    onClearChat();
                  }}
                  className="focus:outline-none"
                >
                  <Trash2 size={20} />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <span>Clear Chat</span>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={e => {
                  e.stopPropagation();
                  setIsOpen(false);
                }}
                className="focus:outline-none"
              >
                <Minus size={20} />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <span>Minimize</span>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}

import { Textarea } from '@/components/ui/textarea';
import { ArrowUp } from 'lucide-react';

export default function ChatWidgetFooter() {
  return (
    <div className="border-t bg-slate-800">
      <div className="flex items-center gap-2 p-2">
        <Textarea className="resize-none bg-white text-black dark:bg-slate-500 dark:text-white" />
        <button className="flex items-center justify-center rounded-full bg-blue-500 p-2 dark:bg-background">
          <ArrowUp className="text-white" />
        </button>
      </div>
    </div>
  );
}

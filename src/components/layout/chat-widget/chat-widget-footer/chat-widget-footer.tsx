import { Textarea } from '@/components/ui/textarea';
import { Send } from 'lucide-react';

export default function ChatWidgetFooter() {
  return (
    <div className="border-t dark:last:bg-slate-800">
      <div className="flex items-center gap-2 p-2">
        <Textarea className="resize-none bg-white text-black" />
        <button className="flex items-center justify-center rounded-full bg-slate-800 p-2 dark:bg-background">
          <Send className="text-white" />
        </button>
      </div>
    </div>
  );
}

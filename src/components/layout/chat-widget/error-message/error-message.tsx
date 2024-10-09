import MarkdownRender from '@/components/layout/chat-widget/markdown-render/markdown-render';
import { Message } from '@/lib/types/utilities/open-ai/message/message';

type ErrorMessageProps = {
  message: Message;
};

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="max-w-xs self-center rounded-lg bg-red-200 p-2 text-red-800">
      <MarkdownRender content={message.content} />
    </div>
  );
}

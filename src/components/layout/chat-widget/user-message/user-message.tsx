import MarkdownRender from '@/components/layout/chat-widget/markdown-render/markdown-render';
import { Message } from '@/lib/types/utilities/open-ai/message/message';

type UserMessageProps = {
  message: Message;
};

export default function UserMessage({ message }: UserMessageProps) {
  return (
    <div className="max-w-xs self-end rounded-lg bg-blue-500 p-2 text-white">
      <MarkdownRender content={message.content} />
    </div>
  );
}

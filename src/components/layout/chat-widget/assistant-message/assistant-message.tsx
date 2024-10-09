import MarkdownRender from '@/components/layout/chat-widget/markdown-render/markdown-render';
import { Message } from '@/lib/types/utilities/open-ai/message/message';

type AssistantMessageProps = {
  message: Message;
};

export default function AssistantMessage({ message }: AssistantMessageProps) {
  return (
    <div className="max-w-xs self-start rounded-lg bg-gray-200 p-2 text-gray-800">
      <MarkdownRender content={message.content} />
    </div>
  );
}

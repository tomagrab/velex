import { useEffect, useState } from 'react';
import MarkdownRender from '@/components/layout/chat-widget/markdown-render/markdown-render';
import { Message } from '@/lib/types/utilities/open-ai/message/message';

type InfoMessageProps = {
  message: Message;
};

export default function InfoMessage({ message }: InfoMessageProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Start fading out after 2.5 seconds
    const fadeOutTimeout = setTimeout(() => {
      setVisible(false);
    }, 2500);

    return () => {
      clearTimeout(fadeOutTimeout);
    };
  }, []);

  return (
    <div
      className={`max-w-xs self-center rounded-lg bg-yellow-200 p-2 text-yellow-800 transition-opacity duration-500 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <MarkdownRender content={message.content} />
    </div>
  );
}

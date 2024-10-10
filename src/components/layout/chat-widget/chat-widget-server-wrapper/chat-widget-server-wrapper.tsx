import ChatWidget from '@/components/layout/chat-widget/chat-widget/chat-widget';
import { isChatEnabled } from '@/lib/utilities/openai/chat-enabled/chat-enabled';

export default async function ChatWidgetServerWrapper() {
  const chatEnabled = await isChatEnabled();

  return chatEnabled ? <ChatWidget /> : null;
}

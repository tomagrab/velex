import { validateAPIKey } from '@/lib/utilities/openai/validate-openai-api-key/validate-openai-api-key';
import { hasOpenAIAPIKey } from '@/lib/utilities/features/features';
import ChatWidget from '@/components/layout/chat-widget/chat-widget/chat-widget';

export default async function ChatWidgetServerWrapper() {
  const isOpenAIAPIKeyValid = await validateAPIKey();

  const isChatEnabled = isOpenAIAPIKeyValid && hasOpenAIAPIKey;

  return isChatEnabled ? <ChatWidget /> : null;
}

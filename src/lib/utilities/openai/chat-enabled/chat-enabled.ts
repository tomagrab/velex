import { hasOpenAIAPIKey } from '@/lib/utilities/features/features';
import { validateAPIKey } from '@/lib/utilities/openai/validate-openai-api-key/validate-openai-api-key';

export async function isChatEnabled(): Promise<boolean> {
  return hasOpenAIAPIKey && (await validateAPIKey());
}

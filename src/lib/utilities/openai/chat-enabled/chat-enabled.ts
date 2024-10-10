import { getSession } from '@auth0/nextjs-auth0';
import { hasOpenAIAPIKey } from '@/lib/utilities/features/features';
import { validateAPIKey } from '@/lib/utilities/openai/validate-openai-api-key/validate-openai-api-key';

export async function isChatEnabled(): Promise<boolean> {
  const session = await getSession();
  const user = session?.user;
  const validAPIKey = await validateAPIKey();

  if (!user) {
    return false;
  }

  if (!hasOpenAIAPIKey) {
    return false;
  }

  if (!validAPIKey) {
    return false;
  }

  return hasOpenAIAPIKey && user && validAPIKey;
}

import { isChatEnabled } from '@/lib/utilities/openai/chat-enabled/chat-enabled';
import { getAssistantId } from '@/lib/utilities/openai/openai-client/openai-client';
import { withRetry } from '@/lib/utilities/with-retry/with-retry';

export async function GET() {
  const chatEnabled = await isChatEnabled();

  if (!chatEnabled) {
    return new Response(JSON.stringify({ error: 'Chat is disabled.' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const assistantId = await withRetry(() => getAssistantId());

    return new Response(JSON.stringify({ assistantId }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error retrieving assistant ID:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to retrieve assistant ID.' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }
}

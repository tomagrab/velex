import { getAssistantId } from '@/lib/utilities/openai/openai-client/openai-client';
import { withRetry } from '@/lib/utilities/with-retry/with-retry';

export async function GET() {
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

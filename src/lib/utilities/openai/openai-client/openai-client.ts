import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

let assistantIdPromise: Promise<string> | null = null;

/**
 * Get or create the assistant ID.
 * @returns {Promise<string>} The assistant ID.
 */
export async function getAssistantId(): Promise<string> {
  if (!assistantIdPromise) {
    assistantIdPromise = (async () => {
      try {
        const assistant = await openai.beta.assistants.create({
          model: 'gpt-4o',
          name: 'Chat Assistant',
          instructions: 'You are a helpful assistant.',
        });
        return assistant.id;
      } catch (error) {
        console.error('Error creating assistant:', error);
        // Reset the promise to allow retries
        assistantIdPromise = null;
        throw new Error('Failed to create assistant.');
      }
    })();
  }
  return assistantIdPromise;
}

export default openai;

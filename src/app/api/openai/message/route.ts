import { CustomError } from '@/lib/interfaces/utilities/custom-error/custom-error';
import { isChatEnabled } from '@/lib/utilities/openai/chat-enabled/chat-enabled';
import openai, {
  getAssistantId,
} from '@/lib/utilities/openai/openai-client/openai-client';
import { withRetry } from '@/lib/utilities/with-retry/with-retry';
import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export const POST = withApiAuthRequired(async req => {
  const res = new NextResponse();
  const session = await getSession(req, res);
  const user = session?.user;

  if (!user) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const chatEnabled = await isChatEnabled();

  if (!chatEnabled) {
    return new Response(JSON.stringify({ error: 'Chat is disabled.' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { message, threadId } = await req.json();

  if (!message) {
    return new Response(
      JSON.stringify({ error: 'Message content is required.' }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }

  try {
    // Create a thread if not provided
    let currentThreadId = threadId;
    if (!currentThreadId) {
      const thread = await openai.beta.threads.create();
      currentThreadId = thread.id;
    }

    if (!currentThreadId) {
      throw new Error('Failed to create a new thread.');
    }

    // Add user message to the thread
    const messageResponse = await openai.beta.threads.messages.create(
      currentThreadId,
      {
        role: 'user',
        content: message,
      },
    );

    if (!messageResponse || !messageResponse.id) {
      throw new Error('Failed to add message to the thread.');
    }

    // Retrieve assistant ID directly
    const assistantId = await withRetry(() => getAssistantId());

    // Run the assistant on the thread using runs.stream
    const run = openai.beta.threads.runs.stream(currentThreadId, {
      assistant_id: assistantId,
    });

    const encoder = new TextEncoder();

    const stream = new ReadableStream({
      start(controller) {
        let isControllerClosed = false; // Flag to track controller state

        // Handle text deltas from the assistant
        run.on('textDelta', delta => {
          if (isControllerClosed) return;

          try {
            const chunk = delta.value;
            controller.enqueue(encoder.encode(chunk));
          } catch (error) {
            console.error('Error processing text delta:', error);
            if (!isControllerClosed) {
              controller.error(error);
              isControllerClosed = true;
            }
          }
        });

        // Handle errors emitted by the assistant stream
        run.on('error', error => {
          if (isControllerClosed) return;

          console.error('Streaming error:', error);

          // If the error is due to the run being aborted, we can ignore it
          if ((error as CustomError).name === 'APIUserAbortError') {
            // Do nothing; the cancel method will handle closing the controller
          } else {
            if (!isControllerClosed) {
              controller.error(error);
              isControllerClosed = true;
            }
          }
        });

        // Handle the end of the assistant stream
        run.on('end', () => {
          if (isControllerClosed) return;

          controller.close();
          isControllerClosed = true;
        });

        // Handle the abort event
        run.on('abort', () => {
          if (isControllerClosed) return;

          console.log('Assistant stream aborted.');
          // Close the controller if not already closed
          if (!isControllerClosed) {
            controller.close();
            isControllerClosed = true;
          }
        });

        // Start the run
        run.finalRun().catch(error => {
          if (isControllerClosed) return;

          console.error('Error in finalRun:', error);
          if (!isControllerClosed) {
            controller.error(error);
            isControllerClosed = true;
          }
        });
      },
      cancel(reason) {
        console.log('Stream cancelled:', reason);
        // Abort the run
        run.abort();
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'X-Thread-Id': currentThreadId,
      },
    });
  } catch (error: unknown) {
    console.error('Error handling message:', error);

    const customError = error as CustomError;
    const statusCode = customError.statusCode || 500;
    const errorMessage = customError.message || 'Failed to process message.';

    return new Response(JSON.stringify({ error: errorMessage }), {
      status: statusCode,
      headers: { 'Content-Type': 'application/json' },
    });
  }
});

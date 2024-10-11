import { CustomError } from '@/lib/interfaces/utilities/custom-error/custom-error';
import { isChatEnabled } from '@/lib/utilities/openai/chat-enabled/chat-enabled';
import openai, {
  getAssistantId,
} from '@/lib/utilities/openai/openai-client/openai-client';
import { withRetry } from '@/lib/utilities/with-retry/with-retry';
import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

export const POST = withApiAuthRequired(async (request: NextRequest) => {
  try {
    const response = new NextResponse();
    const session = await getSession(request, response);
    const user = session?.user;

    if (!user) {
      return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const chatEnabled = await isChatEnabled();
    if (!chatEnabled) {
      return new NextResponse(JSON.stringify({ error: 'Chat is disabled.' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const { message, threadId } = await request.json();
    if (!message) {
      return new NextResponse(
        JSON.stringify({ error: 'Message content is required.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } },
      );
    }

    let currentThreadId = threadId;

    if (!currentThreadId) {
      const thread = await openai.beta.threads.create();
      currentThreadId = thread.id;

      if (!currentThreadId) {
        throw new Error('Failed to create a new thread.');
      }
    }

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

    const assistantId = await withRetry(() => getAssistantId());

    const run = openai.beta.threads.runs.stream(currentThreadId, {
      assistant_id: assistantId,
    });

    const encoder = new TextEncoder();

    const stream = new ReadableStream({
      start(controller) {
        let isControllerClosed = false;

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

        run.on('error', error => {
          if (isControllerClosed) return;

          console.error('Streaming error:', error);
          if (error.name === 'APIUserAbortError') {
            // ignore, controller will close
          } else {
            if (!isControllerClosed) {
              controller.error(error);
              isControllerClosed = true;
            }
          }
        });

        run.on('end', () => {
          if (isControllerClosed) return;
          controller.close();
          isControllerClosed = true;
        });

        run.on('abort', () => {
          if (isControllerClosed) return;
          controller.close();
          isControllerClosed = true;
        });

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
    return new NextResponse(
      JSON.stringify({
        error: customError.message || 'Failed to process message.',
      }),
      {
        status: customError.statusCode || 500,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }
});

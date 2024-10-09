import { CustomError } from '@/lib/interfaces/utilities/custom-error/custom-error';

export async function withRetry<T>(
  fn: () => Promise<T>,
  retries = 3,
): Promise<T> {
  try {
    return await fn();
  } catch (error: unknown) {
    const customError = error as CustomError;

    if (retries > 0 && customError.statusCode === 429) {
      // Wait and retry
      await new Promise(resolve => setTimeout(resolve, 1000));
      return withRetry(fn, retries - 1);
    }
    throw error;
  }
}

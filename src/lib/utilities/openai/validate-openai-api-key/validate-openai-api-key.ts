import { CustomError } from '@/lib/interfaces/utilities/custom-error/custom-error';
import openai from '@/lib/utilities/openai/openai-client/openai-client';

// Check if the API key is invalid by making a test request
export const validateAPIKey = async () => {
  try {
    await openai.beta.assistants.list();

    return true;
  } catch (error) {
    const customError = error as CustomError;

    console.error('Error validating API key:', customError.message);
    return false;
  }
};

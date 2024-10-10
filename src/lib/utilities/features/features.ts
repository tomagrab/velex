/* App Environment */
export const isDev = process.env.APP_ENV === 'dev';
export const isQA = process.env.APP_ENV === 'qa';
export const isUAT = process.env.APP_ENV === 'uat';
export const isProd = process.env.APP_ENV === 'prod';

/* Third Party API Keys */
export const hasOpenAIAPIKey = !!process.env.OPENAI_API_KEY;

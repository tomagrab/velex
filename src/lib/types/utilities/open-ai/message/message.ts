export type Message = {
  id: string;
  sender: 'user' | 'agent' | 'assistant' | 'info' | 'error';
  content: string;
};

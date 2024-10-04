import AgentMessage from '@/components/layout/chat-widget/agent-message/agent-message';
import UserMessage from '@/components/layout/chat-widget/user-message/user-message';

export default function ChatWidgetBody() {
  return (
    <div className="flex flex-1 flex-col space-y-4 overflow-y-auto p-4 dark:bg-slate-600">
      <UserMessage message="Hello, I need help." />
      <AgentMessage message="Sure, how can I assist you?" />
    </div>
  );
}

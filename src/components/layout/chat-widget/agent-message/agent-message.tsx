type AgentMessageProps = {
  message: string;
};

export default function AgentMessage({ message }: AgentMessageProps) {
  return (
    <div className="max-w-xs self-start rounded-lg bg-gray-200 p-2 text-gray-800">
      {message}
    </div>
  );
}

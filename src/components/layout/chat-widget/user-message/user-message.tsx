type UserMessageProps = {
  message: string;
};

export default function UserMessage({ message }: UserMessageProps) {
  return (
    <div className="max-w-xs self-end rounded-lg bg-blue-500 p-2 text-white">
      {message}
    </div>
  );
}

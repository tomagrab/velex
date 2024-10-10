import { Loader } from 'lucide-react';

export default function LoadingPage() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex items-center gap-4">
        <Loader className="text-primary-500 h-16 w-16 animate-spin" />
      </div>
    </div>
  );
}

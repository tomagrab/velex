import { Minus } from 'lucide-react';

type ChatWidgetHeaderProps = {
  title: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ChatWidgetHeader({
  title,
  setIsOpen,
}: ChatWidgetHeaderProps) {
  return (
    <div className="flex select-none items-center justify-between bg-slate-800 px-4 py-2 text-white">
      <h2 className="text-lg font-semibold">{title}</h2>
      <button
        onClick={e => {
          e.stopPropagation();
          setIsOpen(false);
        }}
        className="focus:outline-none"
      >
        <Minus size={20} />
      </button>
    </div>
  );
}

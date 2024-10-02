import ModeToggle from '@/components/layout/header/mode-toggle/mode-toggle';

export default function Header() {
  return (
    <header className="header flex h-16 w-full items-center justify-center overflow-hidden">
      <div className="flex w-1/2 justify-start"></div>
      <div className="flex shrink-0">
        <h1 className="hidden text-4xl font-bold md:flex">velex</h1>
        <div className="flex h-full items-center justify-center md:hidden"></div>
      </div>
      <div className="flex w-1/2 justify-end gap-2 px-4">
        <ModeToggle />
      </div>
    </header>
  );
}

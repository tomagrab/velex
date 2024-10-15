import Image from 'next/image';
import SidebarMenu from './sidebar-menu/sidebar-menu';

export default function Sidebar() {
  return (
    <aside className="sidebar flex h-[100dvh] min-w-16 flex-col items-center gap-8 bg-slate-800 text-white dark:bg-background">
      <div className="sidebar__logo h-16">
        <Image
          className="object-"
          src="https://picsum.photos/64"
          alt="velex Logo"
          width={64}
          height={64}
        />
      </div>
      <SidebarMenu />
    </aside>
  );
}

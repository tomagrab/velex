import { SidebarMenuItemProps } from '@/lib/types/layout/sidebar/sidebar-menu/sidebar-menu-item/sidebar-menu-item-type';
import { House, Settings, Ticket, User } from 'lucide-react';
import SidebarMenuItem from './sidebar-menu-item/sidebar-menu-item';

export default function SidebarMenu() {
  const menuItemClasses =
    'motion-safe:transition-transform hover:motion-safe:scale-110';

  const menuItems: SidebarMenuItemProps[] = [
    {
      title: 'Dashboard',
      icon: <House className={menuItemClasses} />,
      link: '/',
    },
    {
      title: 'Users',
      icon: <User className={menuItemClasses} />,
      link: '/users',
    },
    {
      title: 'Tickets',
      icon: <Ticket className={menuItemClasses} />,
      link: '/tickets',
    },
  ];

  return (
    <nav className="flex flex-1 flex-col">
      <ul className="flex flex-1 flex-col gap-4">
        {menuItems.map((menuItem, index) => (
          <li key={index}>
            <SidebarMenuItem {...menuItem} />
          </li>
        ))}
      </ul>
      <div className="flex h-16 items-center justify-center">
        <SidebarMenuItem
          title="Settings"
          icon={
            <Settings
              className={`${menuItemClasses} hover:motion-safe:rotate-180`}
            />
          }
          link="/settings"
        />
      </div>
    </nav>
  );
}

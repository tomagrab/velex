import { SidebarMenuItemProps } from '@/lib/types/layout/sidebar/sidebar-menu/sidebar-menu-item/sidebar-menu-item-type';
import { House, Settings, Smartphone, Ticket, User } from 'lucide-react';
import SidebarMenuItem from '@/components/layout/sidebar/sidebar-menu/sidebar-menu-item/sidebar-menu-item';
import { getSession } from '@auth0/nextjs-auth0';
import { getAuth0UserRoles } from '@/lib/utilities/api/users/auth0/get-auth0-user-roles/get-auth0-user-roles';

export default async function SidebarMenu() {
  const session = await getSession();
  const user = session?.user;
  const userId = user?.sub;
  const userRoles = await getAuth0UserRoles(userId);
  const userRole = userRoles.data?.roles[0];

  const menuItemClasses =
    'motion-safe:transition-transform hover:motion-safe:scale-110';

  const menuItems: SidebarMenuItemProps[] = [
    {
      id: 'dashboard-menu-item',
      title: 'Dashboard',
      icon: <House className={menuItemClasses} />,
      link: '/',
      userRole: userRole,
    },
    {
      id: 'assets-menu-item',
      title: 'Assets',
      icon: <Smartphone className={menuItemClasses} />,
      link: '/assets',
      userRole: userRole,
    },
    {
      id: 'tickets-menu-item',
      title: 'Tickets',
      icon: <Ticket className={menuItemClasses} />,
      link: '/tickets',
      userRole: userRole,
    },
    {
      id: 'users-menu-item',
      title: 'Users',
      icon: <User className={menuItemClasses} />,
      link: '/users',
      userRole: userRole,
    },
  ];

  return (
    <nav className="flex flex-1 flex-col">
      <ul className="flex flex-1 flex-col gap-4">
        {menuItems.map(menuItem => (
          <li key={menuItem.id}>
            <SidebarMenuItem {...menuItem} />
          </li>
        ))}
      </ul>
      <div className="flex h-16 items-center justify-center">
        <SidebarMenuItem
          userRole={userRole}
          id="settings-menu-item"
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

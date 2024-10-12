import { Auth0Role } from '@/lib/types/api/auth0/auth0-role/auth0-role';

export type SidebarMenuItemProps = {
  id: string;
  title: string;
  icon: JSX.Element;
  link: string;
  userRole: Auth0Role | undefined;
};

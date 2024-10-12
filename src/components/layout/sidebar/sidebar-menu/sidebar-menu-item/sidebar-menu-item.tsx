'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import { SidebarMenuItemProps } from '@/lib/types/layout/sidebar/sidebar-menu/sidebar-menu-item/sidebar-menu-item-type';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import Link from 'next/link';
import { Loader } from 'lucide-react';

export default function SidebarMenuItem({
  title,
  link,
  icon,
}: SidebarMenuItemProps) {
  const { user, error, isLoading } = useUser();
  const requiresAuth = ['Assets', 'Tickets', 'Users'].includes(title);

  // Show the loader if loading, but only for authenticated routes
  if (isLoading && requiresAuth) {
    return <Loader className="h-6 w-6 animate-spin" />;
  }

  // Prevent rendering if error exists or no user is authenticated for the routes requiring auth
  if (requiresAuth && (error || !user)) {
    return null;
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link href={link}>{icon}</Link>
        </TooltipTrigger>
        <TooltipContent>{title}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

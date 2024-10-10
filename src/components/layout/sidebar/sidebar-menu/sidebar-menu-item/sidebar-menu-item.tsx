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

export default function SidebarMenuItem(menuItem: SidebarMenuItemProps) {
  const { user, error, isLoading } = useUser();

  const titlesRequiringAuth = ['Assets', 'Tickets', 'Users'];

  if (isLoading && titlesRequiringAuth.includes(menuItem.title)) {
    return <Loader className="h-6 w-6 animate-spin" />;
  }

  if (error && titlesRequiringAuth.includes(menuItem.title)) {
    return null;
  }

  if (!user && titlesRequiringAuth.includes(menuItem.title)) {
    return null;
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link href={menuItem.link}>{menuItem.icon}</Link>
        </TooltipTrigger>
        <TooltipContent>{menuItem.title}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

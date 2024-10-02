import { SidebarMenuItemProps } from '@/lib/types/layout/sidebar/sidebar-menu/sidebar-menu-item/sidebar-menu-item-type';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import Link from 'next/link';

export default function SidebarMenuItem(menuItem: SidebarMenuItemProps) {
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

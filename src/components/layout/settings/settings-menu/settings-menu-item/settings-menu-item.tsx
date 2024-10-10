import Link from 'next/link';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { SettingsMenuItemProps } from '@/lib/types/layout/settings/settings-menu/settings-menu-item';

export default function SettingsMenuItem(menuItem: SettingsMenuItemProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            href={menuItem.link}
            className="flex items-center gap-2 rounded-lg p-4 transition-colors hover:bg-foreground hover:text-background"
          >
            {menuItem.icon}
            {menuItem.title}
          </Link>
        </TooltipTrigger>
        <TooltipContent>{menuItem.description}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

import { Metadata } from 'next';
import PageHeading from '@/components/layout/page-heading/page-heading';

import { Cog, UserPen } from 'lucide-react';
import SettingsMenuItem from '@/components/layout/settings/settings-menu/settings-menu-item/settings-menu-item';
import { SettingsMenuItemProps } from '@/lib/types/layout/settings/settings-menu/settings-menu-item';

export const metadata: Metadata = {
  title: 'Settings | velex',
  description: 'Settings is where you can configure the application settings.',
};

export default function SettingsPage() {
  const menuItems: SettingsMenuItemProps[] = [
    {
      id: 'configuration-menu-item',
      title: 'Configuration',
      description: 'Configure the application settings.',
      icon: <Cog />,
      link: '/settings/configuration',
    },
    {
      id: 'profile-menu-item',
      title: 'Profile',
      description: 'Update your profile information.',
      icon: <UserPen />,
      link: '/settings/profile',
    },
  ];

  return (
    <div className="flex-1">
      <PageHeading title="Settings" />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {menuItems.map(menuItem => (
          <SettingsMenuItem key={menuItem.id} {...menuItem} />
        ))}
      </div>
    </div>
  );
}

import { Metadata } from 'next';
import PageHeading from '@/components/layout/page-heading/page-heading';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Settings | velex',
  description: 'Settings is where you can configure the application settings.',
};

export default function SettingsPage() {
  return (
    <div>
      <PageHeading title="Settings" />
      <div>
        <p>
          This is the settings page. Go to the{' '}
          <Link href="/settings/configuration" className="paragraph-link">
            Configuration
          </Link>{' '}
          page.
        </p>
      </div>
    </div>
  );
}

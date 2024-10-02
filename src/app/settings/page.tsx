import PageHeading from '@/components/layout/page-heading/page-heading';
import Link from 'next/link';

export default function Settings() {
  return (
    <div>
      <PageHeading title="Settings" />
      <div>
        <p>
          This is the settings page. Go to the{' '}
          <Link href="/settings/configuration" className='paragraph-link'>Configuration</Link> page.
        </p>
      </div>
    </div>
  );
}

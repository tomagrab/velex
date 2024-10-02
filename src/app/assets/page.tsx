import type { Metadata } from 'next';
import PageHeading from '@/components/layout/page-heading/page-heading';

export const metadata: Metadata = {
  title: 'Assets | velex',
  description:
    'Assets is where you can view, create, update, and delete assets.',
};

export default function AssetsPage() {
  return (
    <div>
      <PageHeading title="Assets" />
      <div>
        <p>
          This is the assets page.
        </p>
      </div>
    </div>
  );
}

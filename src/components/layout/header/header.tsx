import PageHeadingBreadcrumbs from '@/components/layout/page-heading/page-heading-breadcrumbs/page-heading-breadcrumbs';
import HeaderRight from '@/components/layout/header/header-right/header-right';

export default function Header() {
  return (
    <header className="header flex h-16 w-full items-center justify-center overflow-hidden bg-slate-800 text-white dark:bg-background">
      <div className="flex w-1/2 justify-start pl-8">
        <PageHeadingBreadcrumbs />
      </div>
      <div className="flex shrink-0">
        <h1 className="hidden text-4xl font-bold md:flex">velex</h1>
        <div className="flex h-full items-center justify-center md:hidden"></div>
      </div>
      <div className="flex w-1/2 justify-end gap-2 pr-8">
        <HeaderRight />
      </div>
    </header>
  );
}

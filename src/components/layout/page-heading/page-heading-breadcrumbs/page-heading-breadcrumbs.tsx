'use client';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { PathnamePartType } from '@/lib/types/layout/page-heading/page-heading-breadcrumbs/pathname-part/pathname-part-type';
import { usePathname } from 'next/navigation';

export default function PageHeadingBreadcrumbs() {
  // Get the current pathname
  const pathname = usePathname();

  // Split the pathname into parts
  const pathnameParts: PathnamePartType[] = pathname
    .split('/')
    .filter(part => part !== '')
    .map((part, index, parts) => {
      const id = parts.slice(0, index + 1).join('/');
      return {
        id,
        name: part,
        href: `/${id}`,
      };
    });

  // Function to format the pathname parts by capitalizing the first letter of each part
  const formatPathnameParts = (pathnameParts: PathnamePartType[]) => {
    return pathnameParts.map(part => {
      return {
        ...part,
        name: part.name.charAt(0).toUpperCase() + part.name.slice(1),
      };
    });
  };

  // Format the pathname parts
  const formattedPathnameParts = formatPathnameParts(pathnameParts);

  // If there are no pathname parts, return null
  if (formattedPathnameParts.length === 0) {
    return null;
  }

  // If there is only one pathname part, return the breadcrumb with the home link and the current page
  if (formattedPathnameParts.length === 1) {
    return (
      <Breadcrumb>
        <BreadcrumbList className="text-slate-400">
          <BreadcrumbItem>
            <BreadcrumbLink href="/" className="hover:text-slate-200">
              Dashboard
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-white">
              {formattedPathnameParts[0].name}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );
  }

  // If there are more than one pathname parts, return the breadcrumb with the home link, the first part, and the current page
  return (
    <Breadcrumb>
      <BreadcrumbList className="text-slate-400">
        <BreadcrumbItem>
          <BreadcrumbLink href="/" className="hover:text-slate-200">
            Dashboard
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {formattedPathnameParts.slice(0, -1).map(part => (
          <BreadcrumbItem key={part.id}>
            <BreadcrumbLink href={part.href} className="hover:text-slate-200">
              {part.name}
            </BreadcrumbLink>
          </BreadcrumbItem>
        ))}
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className="text-white">
            {formattedPathnameParts[formattedPathnameParts.length - 1].name}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

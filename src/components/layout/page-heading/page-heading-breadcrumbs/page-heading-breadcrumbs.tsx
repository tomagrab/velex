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
import { useEffect, useState } from 'react';

export default function PageHeadingBreadcrumbs() {
  const pathname = usePathname();
  const [userName, setUserName] = useState<string | null>(null);

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

  // Detect if the last part of the pathname is a user ID (in this case, for simplicity, assuming a user page follows a pattern like /users/[id])
  const isUserPage = pathnameParts.some(part => part.id.includes('users'));
  console.log(pathnameParts);
  console.log(isUserPage);

  // Fetch user name if the page is a user page
  useEffect(() => {
    const fetchUserName = async () => {
      const userId = pathnameParts[pathnameParts.length - 1].name;
      const response = await fetch(
        `${process.env.APP_ENV_URL}/api/users/${userId}/name`,
      );
      if (response.ok) {
        const data = await response.json();
        setUserName(data.name);
      }
    };

    if (isUserPage) {
      fetchUserName();
    }
  }, [isUserPage, pathnameParts]);

  const formatPathnameParts = (pathnameParts: PathnamePartType[]) => {
    return pathnameParts.map(part => {
      return {
        ...part,
        name: part.name.charAt(0).toUpperCase() + part.name.slice(1),
      };
    });
  };

  const formattedPathnameParts = formatPathnameParts(pathnameParts);

  // Replace last part with user name if it's a user page
  if (isUserPage && userName) {
    formattedPathnameParts[formattedPathnameParts.length - 1].name = userName;
  }

  // If there are no pathname parts, return null
  if (formattedPathnameParts.length === 0) {
    return null;
  }

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

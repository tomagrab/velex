'use client';

import DataTable from '@/components/layout/data-table/data-table';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { User } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';

// Define your user columns
export const userColumns: ColumnDef<User>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={value => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'role',
    header: 'Role',
  },
  {
    accessorKey: 'actions',
    header: 'Actions',
    cell: ({ row }) => (
      <Button variant={`ghost`}>
        <Link href={`/users/${row.original.id}`}>View</Link>
      </Button>
    ),
  },
];

export default function UserTable({ users }: { users: User[] }) {
  return <DataTable columns={userColumns} data={users} />;
}

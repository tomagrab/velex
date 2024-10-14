'use client';

import DataTable from '@/components/layout/data-table/data-table';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Ticket } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';

type TicketsTableProps = {
  tickets: Ticket[];
};

export const ticketsColumns: ColumnDef<Ticket>[] = [
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
    accessorKey: 'creator',
    header: 'Creator',
  },
  {
    accessorKey: 'owner',
    header: 'Owner',
  },
  {
    accessorKey: 'assignedTo',
    header: 'assignedTo',
  },
  {
    accessorKey: 'status',
    header: 'status',
  },
  {
    accessorKey: 'category',
    header: 'Category',
  },
  {
    accessorKey: 'subCategory',
    header: 'Sub Category',
  },
  {
    accessorKey: 'createdOn',
    header: 'Created',
  },
  {
    accessorKey: 'updatedOn',
    header: 'Updated',
  },
  {
    accessorKey: 'actions',
    header: 'Actions',
    cell: ({ row }) => (
      <Button variant={`ghost`}>
        <Link href={`/tickets/${row.original.id}`}>View</Link>
      </Button>
    ),
  },
];

export default function TicketsTable({ tickets }: TicketsTableProps) {
  return <DataTable columns={ticketsColumns} data={tickets} />;
}

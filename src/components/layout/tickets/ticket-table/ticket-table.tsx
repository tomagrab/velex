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
    accessorKey: 'creator.name', // Access specific field in creator
    header: 'Creator',
  },
  {
    accessorKey: 'owner.name', // Access specific field in owner
    header: 'Owner',
  },
  {
    accessorKey: 'assignedTo.name', // Access specific field in assignedTo
    header: 'Assigned To',
  },
  {
    accessorKey: 'status.name', // Access specific field in status
    header: 'Status',
  },
  {
    accessorKey: 'category.name', // Access specific field in category
    header: 'Category',
  },
  {
    accessorKey: 'subCategory.name', // Access specific field in subCategory
    header: 'Sub Category',
  },
  {
    accessorKey: 'createdAt', // Assuming 'createdAt' is a date field
    header: 'Created',
    cell: ({ row }) => new Date(row.original.createdAt).toLocaleString(), // Format date
  },
  {
    accessorKey: 'updatedAt', // Assuming 'updatedAt' is a date field
    header: 'Updated',
    cell: ({ row }) => new Date(row.original.updatedAt).toLocaleString(), // Format date
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

'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useUser } from '@auth0/nextjs-auth0/client';
import { Loader } from 'lucide-react';
import { ticketSchema } from '@/lib/form/schemas/ticket-schema/ticket-schema';
import { useEffect, useState } from 'react';
import { Category, Status, SubCategory, User } from '@prisma/client';

type TicketFormProps = {
  ticket?: {
    id: string;
    creatorId: string;
    ownerId: string;
    lastEditedById: string;
    assignedToId: string;
    clientName: string;
    clientEmail: string;
    clientPhone: string;
    statusId: string;
    categoryId: string;
    subCategoryId: string;
    notes: string;
  };
  isEditMode?: boolean;
};

export default function TicketForm({
  ticket,
  isEditMode = false,
}: TicketFormProps) {
  const { user, isLoading, error } = useUser();
  const [dbUser, setDbUser] = useState<User>({} as User);
  const [ticketStatus, setTicketStatus] = useState<Status[]>([]);
  const [ticketCategory, setTicketCategory] = useState<Category[]>([]);
  const [ticketSubCategory, setTicketSubCategory] = useState<SubCategory[]>([]);

  useEffect(() => {
    if (user) {
      fetch(`/api/users/${user.sub}`)
        .then(res => res.json())
        .then(data => setDbUser(data));
    }

    fetch('/api/status')
      .then(res => res.json())
      .then(data => setTicketStatus(data));

    fetch('/api/categories')
      .then(res => res.json())
      .then(data => setTicketCategory(data));
  }, [user]);

  useEffect(() => {
    if (ticketCategory.length > 0 || ticket?.categoryId) {
      fetch(`/api/subcategories/${ticket?.categoryId ?? ticketCategory[0].id}`)
        .then(res => res.json())
        .then(data => setTicketSubCategory(data));
    }
  }, [ticket?.categoryId, ticketCategory]);

  // Define react-hook-form with Zod schema validation
  const form = useForm<z.infer<typeof ticketSchema>>({
    resolver: zodResolver(ticketSchema),
    defaultValues: {
      creatorId: ticket?.creatorId ?? dbUser.id ?? '',
      ownerId: ticket?.ownerId ?? dbUser.id ?? '',
      lastEditedById: ticket?.lastEditedById ?? dbUser.id ?? '',
      assignedToId: ticket?.assignedToId ?? dbUser.id ?? '',
      clientName: ticket?.clientName ?? '',
      clientEmail: ticket?.clientEmail ?? '',
      clientPhone: ticket?.clientPhone ?? '',
      statusId: ticket?.statusId ?? ticketStatus[0]?.id ?? '',
      categoryId: ticket?.categoryId ?? ticketCategory[0]?.id ?? '',
      subCategoryId: ticket?.subCategoryId ?? ticketSubCategory[0]?.id ?? '',
      notes: ticket?.notes || '',
    },
  });

  if (isLoading) {
    return (
      <div>
        <Loader className="h-24 w-24 animate-spin" />
      </div>
    );
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  if (user === undefined || user === null) {
    return <div>Not authenticated</div>;
  }

  // Submit handler
  const handleSubmit = async (data: z.infer<typeof ticketSchema>) => {
    try {
      const response = await fetch(
        isEditMode && ticket?.id ? `/api/tickets/${ticket.id}` : '/api/tickets',
        {
          method: isEditMode ? 'PUT' : 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        },
      );

      if (!response.ok) {
        throw new Error('Failed to submit the form');
      }

      // Optionally redirect or handle success
      console.log('Form submitted successfully', data);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        {/* Client Name Field */}
        <FormField
          control={form.control}
          name="clientName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Client Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter client name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Client Email Field */}
        <FormField
          control={form.control}
          name="clientEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Client Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter client email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Client Phone Field */}
        <FormField
          control={form.control}
          name="clientPhone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Client Phone</FormLabel>
              <FormControl>
                <Input placeholder="Enter client phone" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Status ID Field */}
        <FormField
          control={form.control}
          name="statusId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <FormControl>
                <Input placeholder="Enter status ID" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Category ID Field */}
        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Input placeholder="Enter category ID" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* SubCategory ID Field */}
        <FormField
          control={form.control}
          name="subCategoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subcategory</FormLabel>
              <FormControl>
                <Input placeholder="Enter subcategory ID" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button type="submit">
          {isEditMode ? 'Update Ticket' : 'Create Ticket'}
        </Button>
      </form>
    </Form>
  );
}

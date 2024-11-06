'use client';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { ticketSchema } from '@/lib/form/schemas/ticket-schema/ticket-schema';
import { User } from '@prisma/client';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { useEffect } from 'react';
import { CommonTicketType } from '@/lib/types/layout/tickets/common-ticket-type/common-ticket-type';

type NotesFieldsProps = {
  user: User;
  form: UseFormReturn<z.infer<typeof ticketSchema>>;
  isEditMode?: boolean;
  ticket?: CommonTicketType | null;
};

export default function NotesField({
  user,
  form,
  isEditMode,
}: NotesFieldsProps) {
  useEffect(() => {
    form.setValue('notes.0.creatorId', user.id);
    form.setValue('notes.0.lastEditedById', user.id);
  }, [user.id, form]);

  return (
    <div className="w-full">
      <input type="hidden" {...form.register('notes.0.creatorId')} />
      <input type="hidden" {...form.register('notes.0.lastEditedById')} />

      <FormLabel>New Note</FormLabel>
      <FormField
        disabled={!isEditMode}
        control={form.control}
        name="notes.0.content"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormControl>
              <Textarea placeholder="Enter a new note" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

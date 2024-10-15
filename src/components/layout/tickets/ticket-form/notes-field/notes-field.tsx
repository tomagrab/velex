import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { ticketSchema } from '@/lib/form/schemas/ticket-schema/ticket-schema';
import { Prisma } from '@prisma/client';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import NotesHistory from './notes-history/notes-history';

type NotesFieldsProps = {
  form: UseFormReturn<z.infer<typeof ticketSchema>>;
  ticket: Prisma.TicketGetPayload<{
    include: {
      creator: true;
      owner: true;
      status: true;
      category: true;
      subCategory: true;
      notes: true;
    };
  }> | null;
};

export default function NotesField({ form, ticket }: NotesFieldsProps) {
  return (
    <>
      <div className="w-3/4">
        <FormLabel>New Note</FormLabel>
        <FormField
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

      {(ticket?.notes?.length ?? 0) > 0 ? (
        <div className="w-1/4">
          <NotesHistory ticket={ticket} />
        </div>
      ) : null}
    </>
  );
}

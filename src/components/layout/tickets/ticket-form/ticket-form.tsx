'use client';

import { useEffect } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { Ticket } from '@prisma/client';
import { useUser } from '@auth0/nextjs-auth0/client';
import { Loader } from 'lucide-react';
import { ticketSchema } from '@/lib/form/schemas/ticket-schema/ticket-schema';
import { CreateTicket } from '@/app/server/actions/tickets/ticket-actions';
import { useTicketData } from '@/hooks/tickets/use-ticket-data/use-ticket-data';
import ClientInformationFields from '@/components/layout/tickets/ticket-form/client-information-fields/client-information-fields';
import CategoryFields from '@/components/layout/tickets/ticket-form/category-fields/category-fields';
import StatusFields from '@/components/layout/tickets/ticket-form/status-field/status-field';
import NotesField from '@/components/layout/tickets/ticket-form/notes-field/notes-field';
import ButtonField from '@/components/layout/tickets/ticket-form/button-field/button-field';

type TicketFormProps = {
  ticketId?: Ticket['id'];
  isEditMode?: boolean;
};

export default function TicketForm({
  ticketId,
  isEditMode = false,
}: TicketFormProps) {
  const { user, isLoading: userLoading, error: userError } = useUser();

  const {
    ticket,
    isUpdating,
    availableStatus,
    availableCategory,
    availableSubCategory,
    loading: dataLoading,
    error: dataError,
  } = useTicketData(ticketId);

  const isLoading = dataLoading || userLoading;

  // Form setup with react-hook-form and Zod validation
  const form = useForm<z.infer<typeof ticketSchema>>({
    resolver: zodResolver(ticketSchema),
    defaultValues: {
      creatorId: '',
      ownerId: '',
      lastEditedById: '',
      assignedToId: '',
      clientName: '',
      clientEmail: '',
      clientPhone: '',
      statusId: '',
      categoryId: '',
      subCategoryId: '',
      notes: [],
    },
  });

  // Update form values with ticket data when it loads
  useEffect(() => {
    if (ticket) {
      form.reset({
        creatorId: ticket.creatorId,
        ownerId: ticket.ownerId,
        lastEditedById: ticket.lastEditedById,
        assignedToId: ticket.assignedToId,
        clientName: ticket.clientName,
        clientEmail: ticket.clientEmail ?? '',
        clientPhone: ticket.clientPhone ?? '',
        statusId: ticket.statusId,
        categoryId: ticket.categoryId,
        subCategoryId: ticket.subCategoryId,
      });
    }
  }, [ticket, form]);

  if (isLoading) {
    return (
      <div>
        <Loader className="h-24 w-24 animate-spin" />
      </div>
    );
  }

  if (userError || dataError) {
    return <div>Error: {userError?.message || dataError?.message}</div>;
  }

  if (!user) {
    return <div>Not authenticated</div>;
  }

  return (
    <Form {...form}>
      <form action={CreateTicket} className="flex flex-wrap items-center">
        <input type="hidden" {...form.register('creatorId')} />
        <input type="hidden" {...form.register('ownerId')} />
        <input type="hidden" {...form.register('lastEditedById')} />
        <input type="hidden" {...form.register('assignedToId')} />
        {/* This section should take 1/2 width of the form container */}
        <section className="flex w-full flex-col gap-2 pr-2 md:w-1/2">
          <ClientInformationFields form={form} />
        </section>

        {/* This section should take 1/2 width of the form container */}
        <section className="flex w-full flex-col gap-2 pl-2 md:w-1/2">
          {/* Category ID Field */}
          <CategoryFields
            form={form}
            availableCategory={availableCategory}
            availableSubCategory={availableSubCategory}
          />
          <StatusFields form={form} availableStatus={availableStatus} />
        </section>

        <section className="flex w-full items-center gap-4 py-4">
          <NotesField form={form} ticket={ticket} />
        </section>

        <section>
          <ButtonField
            ticketStates={{
              isEditMode,
              isUpdating,
              isLoading,
            }}
          />
        </section>
      </form>
    </Form>
  );
}

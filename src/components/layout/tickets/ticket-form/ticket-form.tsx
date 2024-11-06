'use client';

import { useEffect, useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { UserProfile } from '@auth0/nextjs-auth0/client';
import { Loader } from 'lucide-react';
import { ticketSchema } from '@/lib/form/schemas/ticket-schema/ticket-schema';
import {
  CreateTicket,
  UpdateTicket,
} from '@/app/server/actions/tickets/ticket-actions';
import { useTicketData } from '@/hooks/tickets/use-ticket-data/use-ticket-data';
import ClientInformationFields from '@/components/layout/tickets/ticket-form/client-information-fields/client-information-fields';
import CategoryFields from '@/components/layout/tickets/ticket-form/category-fields/category-fields';
import StatusFields from '@/components/layout/tickets/ticket-form/status-field/status-field';
import NotesField from '@/components/layout/tickets/ticket-form/notes-field/notes-field';
import ButtonField from '@/components/layout/tickets/ticket-form/button-field/button-field';
import { useRouter } from 'next/navigation';
import { formatTicketFormData } from '@/lib/utilities/format/tickets/format-ticket-form-data/format-ticket-form-data';
import { CommonTicketType } from '@/lib/types/layout/tickets/common-ticket-type/common-ticket-type';
import { Category, Status, SubCategory, User } from '@prisma/client';

type TicketFormProps = {
  user: UserProfile;
  userLoading: boolean;
  userError: Error | undefined;
  dbUser: User | null;
  isEditMode?: boolean;
  ticket?: CommonTicketType | null;
  statuses: Status[] | null;
  categories: Category[] | null;
  subCategories: SubCategory[] | null;
};

export default function TicketForm({
  user,
  userLoading,
  userError,
  dbUser,
  isEditMode = false,
  ticket,
  statuses,
  categories,
  subCategories,
}: TicketFormProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useRouter();

  const userAuth0Id = user.sub;

  const { loading: dataLoading, error: dataError } = useTicketData({
    userAuth0Id,
  });

  const isLoading = dataLoading || userLoading;

  // Form setup with react-hook-form and Zod validation
  const form = useForm<z.infer<typeof ticketSchema>>({
    resolver: zodResolver(ticketSchema),
    defaultValues: {
      creatorId: '',
      ownerId: '',
      lastEditedById: '',
      assignedId: '',
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
        assignedId: ticket.assignedId,
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

  if (userError || dataError || !dbUser) {
    console.error('Error:', userError || dataError);
    return <div>Error: {userError?.message || dataError?.message}</div>;
  }

  if (!user || !dbUser) {
    return <div>Not authenticated</div>;
  }

  const handleSubmit = async (formData: z.infer<typeof ticketSchema>) => {
    try {
      if (!ticket) {
        // Validate the data with Zod
        const ticketParsed = ticketSchema.parse(formData);

        // Convert the data to FormData
        const formattedTicketFormData = formatTicketFormData(ticketParsed);

        // Create the ticket
        const newTicketId = await CreateTicket(formattedTicketFormData);
        router.push(`/tickets/${newTicketId}?isEditMode=true`);
      } else {
        setIsUpdating(true);
        // Validate the data with Zod
        const ticketParsed = ticketSchema.parse(formData);

        // Convert the data to FormData
        const formattedTicketFormData = formatTicketFormData(ticketParsed);

        // Update the ticket
        await UpdateTicket(ticket.id, formattedTicketFormData);
        router.push(`/tickets/${ticket.id}?isEditMode=true`);
        setIsUpdating(false);
      }
    } catch (error) {
      console.error('Error creating ticket:', error);
    }
  };

  // Set creatorId, ownerId, lastEditedById, and assignedId to the current user
  form.setValue('creatorId', dbUser.id);
  form.setValue('ownerId', dbUser.id);
  form.setValue('lastEditedById', dbUser.id);
  form.setValue('assignedId', dbUser.id);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-wrap items-center"
      >
        <input type="hidden" {...form.register('creatorId')} />
        <input type="hidden" {...form.register('ownerId')} />
        <input type="hidden" {...form.register('lastEditedById')} />
        <input type="hidden" {...form.register('assignedId')} />

        {/* This section should take 1/2 width of the form container */}
        <section className="flex w-full flex-col gap-2 pr-2 md:w-1/2">
          <ClientInformationFields form={form} isEditMode={isEditMode} />
        </section>

        {/* This section should take 1/2 width of the form container */}
        <section className="flex w-full flex-col gap-2 pl-2 md:w-1/2">
          {/* Category ID Field */}
          <CategoryFields
            form={form}
            isEditMode={isEditMode}
            categories={categories}
            subCategories={subCategories}
          />
          <StatusFields
            form={form}
            isEditMode={isEditMode}
            statuses={statuses}
          />
        </section>

        <section className="flex w-full items-center gap-4 py-4">
          <NotesField
            user={dbUser}
            form={form}
            isEditMode={isEditMode}
            ticket={ticket}
          />
        </section>

        <section>
          <ButtonField
            ticketFormStates={{
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

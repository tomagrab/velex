'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import prisma from '@/lib/db/prisma/prisma';

export const CreateTicket = async (formData: FormData): Promise<void> => {
  try {
    // Parse the ticket data from the form data
    const parsedTicket = {
      creatorId: formData.get('creatorId') as string,
      ownerId: formData.get('ownerId') as string,
      lastEditedById: formData.get('lastEditedById') as string,
      assignedToId: formData.get('assignedToId') as string,
      clientName: formData.get('clientName') as string,
      clientEmail: formData.get('clientEmail') as string | null,
      clientPhone: formData.get('clientPhone') as string | null,
      statusId: formData.get('statusId') as string,
      categoryId: formData.get('categoryId') as string,
      subCategoryId: formData.get('subCategoryId') as string,
      notes: formData.getAll('notes') as string[],
    };

    // Create the ticket in the database
    const newTicket = await prisma.ticket.create({
      data: {
        creator: { connect: { id: parsedTicket.creatorId } },
        owner: { connect: { id: parsedTicket.ownerId } },
        lastEditedBy: { connect: { id: parsedTicket.lastEditedById } },
        assignedTo: { connect: { id: parsedTicket.assignedToId } },
        clientName: parsedTicket.clientName,
        clientEmail: parsedTicket.clientEmail || null,
        clientPhone: parsedTicket.clientPhone || null,
        status: { connect: { id: parsedTicket.statusId } },
        category: { connect: { id: parsedTicket.categoryId } },
        subCategory: { connect: { id: parsedTicket.subCategoryId } },
        notes: {
          create: parsedTicket.notes.map(note => ({
            content: note,
            creator: { connect: { id: parsedTicket.creatorId } },
            lastEditedBy: { connect: { id: parsedTicket.lastEditedById } },
          })),
        },
      },
    });

    // Revalidate the ticket list cache (if you're caching the ticket list)
    revalidatePath('/tickets');

    // Redirect the user to the newly created ticket's page
    redirect(`/tickets/${newTicket.id}`);
  } catch (error) {
    // Handle the error (this could be logged, displayed, etc.)
    console.error('Error creating ticket:', error);
    throw new Error('Failed to create the ticket');
  }
};

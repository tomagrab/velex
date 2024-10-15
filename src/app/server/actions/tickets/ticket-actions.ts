'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import prisma from '@/lib/db/prisma/prisma';
import { Note } from '@prisma/client';

export const CreateTicket = async (formData: FormData): Promise<void> => {
  try {
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
      notes: JSON.parse(formData.get('notes') as string).map((note: Note) => ({
        content: note.content, // Content of the note
        creatorId: note.creatorId,
        lastEditedById: note.lastEditedById,
      })),
    };

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
          create: parsedTicket.notes.map((note: Note) => ({
            content: note.content,
            creator: { connect: { id: note.creatorId } },
            lastEditedBy: { connect: { id: note.lastEditedById } },
          })),
        },
      },
    });

    revalidatePath('/tickets');
    redirect(`/tickets/${newTicket.id}`);
  } catch (error) {
    console.error('Error creating ticket:', error);
    throw new Error('Failed to create the ticket');
  }
};

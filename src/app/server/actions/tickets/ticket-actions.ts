'use server';

import { revalidatePath } from 'next/cache';
import prisma from '@/lib/db/prisma/prisma';

export const CreateTicket = async (formData: FormData): Promise<string> => {
  console.log('Creating ticket:', formData);

  try {
    const parsedTicket = {
      creatorId: formData.get('creatorId') as string,
      ownerId: formData.get('ownerId') as string,
      lastEditedById: formData.get('lastEditedById') as string,
      assignedId: formData.get('assignedId') as string,
      clientName: formData.get('clientName') as string,
      clientEmail:
        formData.get('clientEmail') === '' ? null : formData.get('clientEmail'),
      clientPhone:
        formData.get('clientPhone') === '' ? null : formData.get('clientPhone'),
      statusId: formData.get('statusId') as string,
      categoryId: formData.get('categoryId') as string,
      subCategoryId: formData.get('subCategoryId') as string,
      notes: [
        {
          content: formData.get('notes[0].content') as string,
          creatorId: formData.get('notes[0].creatorId') as string,
          lastEditedById: formData.get('notes[0].lastEditedById') as string,
        },
      ],
    };

    const newTicket = await prisma.ticket.create({
      data: {
        creator: { connect: { id: parsedTicket.creatorId } },
        owner: { connect: { id: parsedTicket.ownerId } },
        lastEditedBy: { connect: { id: parsedTicket.lastEditedById } },
        assigned: { connect: { id: parsedTicket.assignedId } },
        clientName: parsedTicket.clientName,
        clientEmail: parsedTicket.clientEmail as string | null,
        clientPhone: (parsedTicket.clientPhone as string) || null,
        status: { connect: { id: parsedTicket.statusId } },
        category: { connect: { id: parsedTicket.categoryId } },
        subCategory: { connect: { id: parsedTicket.subCategoryId } },
        notes: {
          create: parsedTicket.notes.map(note => ({
            content: note.content,
            creator: { connect: { id: note.creatorId } },
            lastEditedBy: { connect: { id: note.lastEditedById } },
          })),
        },
      },
    });

    revalidatePath('/tickets');
    return newTicket.id;
  } catch (error) {
    console.error('Error creating ticket:', error);
    throw new Error('Failed to create the ticket');
  }
};

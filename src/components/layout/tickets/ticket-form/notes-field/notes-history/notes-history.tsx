import { ScrollArea } from '@/components/ui/scroll-area'; // Import ScrollArea component

import { FormLabel } from '@/components/ui/form';
import { Prisma } from '@prisma/client';
import NotesHistoryItem from './notes-history-item/notes-history-item';

type NotesHistoryProps = {
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

export default function NotesHistory({ ticket }: NotesHistoryProps) {
  if (!ticket || !ticket?.notes || ticket.notes.length === 0) {
    return null;
  }

  return (
    <>
      <FormLabel>Existing Notes</FormLabel>
      <ScrollArea className="rounded-md border p-4">
        {ticket.notes.map((note, ) => (
          <NotesHistoryItem
            key={note.id}
            ticket={ticket}
            note={note}
          />
        ))}
      </ScrollArea>
    </>
  );
}

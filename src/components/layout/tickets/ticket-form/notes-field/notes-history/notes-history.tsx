import { ScrollArea } from '@/components/ui/scroll-area';
import { FormLabel } from '@/components/ui/form';
import NotesHistoryItem from './notes-history-item/notes-history-item';
import { CommonTicketType } from '@/lib/types/layout/tickets/common-ticket-type/common-ticket-type';

type NotesHistoryProps = {
  ticket: CommonTicketType;
};

export default function NotesHistory({ ticket }: NotesHistoryProps) {
  if (!ticket || !ticket?.notes || ticket.notes.length === 0) {
    return null;
  }

  return (
    <>
      <FormLabel>Previous Notes</FormLabel>
      <ScrollArea className="rounded-md border p-4">
        {ticket.notes.map(note => (
          <NotesHistoryItem key={note.id} ticket={ticket} note={note} />
        ))}
      </ScrollArea>
    </>
  );
}

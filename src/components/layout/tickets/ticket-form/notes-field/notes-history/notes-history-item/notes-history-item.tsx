import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { useDbUserWithDbId } from '@/hooks/use-db-user-with-db-id/use-db-user-with-db-id';
import { mmDdYy } from '@/lib/utilities/format/datetime/mm-dd-yy/mm-dd-yy';
import { Prisma } from '@prisma/client';
import { Loader } from 'lucide-react';

type NotesHistoryItemProps = {
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
  note: {
    id: string;
    creatorId: string;
    lastEditedById: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    ticketId: string;
  };
};

export default function NotesHistoryItem({
  ticket,
  note,
}: NotesHistoryItemProps) {
  const {
    dbUser: noteAuthor,
    loading: noteAuthorLoading,
    error: noteAuthorError,
  } = useDbUserWithDbId(note.creatorId);
  const {
    dbUser: noteEditor,
    loading: noteEditorLoading,
    error: noteEditorError,
  } = useDbUserWithDbId(note.lastEditedById);

  if (!ticket || !ticket?.notes || ticket.notes.length === 0) {
    return null;
  }

  if (noteAuthorLoading || noteEditorLoading) {
    return <Loader className="h-4 w-4 animate-spin" />;
  }

  if (noteAuthorError || noteEditorError) {
    return (
      <div>
        <p>Error loading note author/editor</p>
        <p>
          <strong>Author error</strong>: {noteAuthorError?.message}
        </p>
        <p>
          <strong>Author error</strong>: {noteEditorError?.message}
        </p>
      </div>
    );
  }

  return (
    <div key={note.id} className="mb-2">
      <Dialog>
        <DialogTrigger asChild>
          <button className="text-blue-500 underline">
            {noteAuthor?.name ?? 'Author Name Not Found'}
          </button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader className="flex flex-col gap-4">
            <DialogTitle className="flex flex-col gap-4">
              {noteAuthor?.name ?? 'Author Name Not Found'}&apos;s note
              <div className="flex gap-2">
                <Badge className="text-xs">
                  Created {mmDdYy(new Date(note.createdAt))}
                </Badge>
                <Badge className="text-xs">
                  Updated {mmDdYy(new Date(note.updatedAt))}
                </Badge>
              </div>
            </DialogTitle>
            <DialogDescription>{note.content}</DialogDescription>
            <DialogFooter className="text-sm">
              <strong>Last edited by</strong>{' '}
              {noteEditor?.name ?? 'Editor Name Not Found'}
            </DialogFooter>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

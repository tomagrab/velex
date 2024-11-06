-- DropForeignKey
ALTER TABLE "Note" DROP CONSTRAINT "Note_ticketId_fkey";

-- CreateTable
CREATE TABLE "NoteHistory" (
    "id" TEXT NOT NULL,
    "noteId" TEXT NOT NULL,
    "creatorId" TEXT NOT NULL,
    "lastEditedById" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NoteHistory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "Ticket"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NoteHistory" ADD CONSTRAINT "NoteHistory_noteId_fkey" FOREIGN KEY ("noteId") REFERENCES "Note"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NoteHistory" ADD CONSTRAINT "NoteHistory_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NoteHistory" ADD CONSTRAINT "NoteHistory_lastEditedById_fkey" FOREIGN KEY ("lastEditedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

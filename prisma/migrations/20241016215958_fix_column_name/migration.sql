/*
  Warnings:

  - You are about to drop the column `assignedToId` on the `Ticket` table. All the data in the column will be lost.
  - Added the required column `assignedId` to the `Ticket` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_assignedToId_fkey";

-- AlterTable
ALTER TABLE "Ticket" DROP COLUMN "assignedToId",
ADD COLUMN     "assignedId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_assignedId_fkey" FOREIGN KEY ("assignedId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

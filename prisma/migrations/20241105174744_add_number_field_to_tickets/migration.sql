/*
  Warnings:

  - A unique constraint covering the columns `[number]` on the table `Ticket` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Ticket" ADD COLUMN     "number" SERIAL NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Ticket_number_key" ON "Ticket"("number");

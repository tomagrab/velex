import { z } from 'zod';

export const ticketSchema = z.object({
  creatorId: z.string(),
  ownerId: z.string(),
  lastEditedById: z.string(),
  assignedToId: z.string(),
  clientName: z.string(),
  clientEmail: z.string().email().optional(),
  clientPhone: z.string().optional(),
  statusId: z.string(),
  categoryId: z.string(),
  subCategoryId: z.string(),
  notes: z.string(),
});

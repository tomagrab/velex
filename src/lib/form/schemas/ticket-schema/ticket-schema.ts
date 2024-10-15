import { isValidPhoneNumber } from 'react-phone-number-input';
import { z } from 'zod';

export const noteSchema = z.object({
  id: z.string().optional(),
  content: z
    .string()
    .min(1, { message: 'Note content is required' })
    .max(10000, { message: 'Note content is too long' }),
  creatorId: z.string().min(1),
  creator: z
    .object({
      id: z.string(),
      name: z.string(),
    })
    .optional(), // Add creator info if available
  lastEditedById: z.string().min(1),
  lastEditedBy: z
    .object({
      id: z.string(),
      name: z.string(),
    })
    .optional(), // Add editor info if available
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const ticketSchema = z.object({
  creatorId: z.string().min(1).max(255),
  ownerId: z.string().min(1).max(255),
  lastEditedById: z.string().min(1).max(255),
  assignedToId: z.string().min(1).max(255),
  clientName: z.string().min(1).max(255),
  clientEmail: z.string().email().nullable().optional(),
  clientPhone: z
    .string()
    .refine(phone => phone === null || isValidPhoneNumber(phone), {
      message: 'Invalid phone number',
    })
    .nullable()
    .optional(),
  statusId: z.string().min(1).max(255),
  categoryId: z.string().min(1).max(255),
  subCategoryId: z.string().min(1).max(255),
  notes: z.array(
    z.object({
      id: z.string().optional(),
      content: z.string().min(1).max(10000),
      creatorId: z.string().min(1),
      lastEditedById: z.string().min(1),
      creator: z
        .object({
          id: z.string(),
          name: z.string(),
        })
        .optional(),
      lastEditedBy: z
        .object({
          id: z.string(),
          name: z.string(),
        })
        .optional(),
      createdAt: z.date().optional(),
      updatedAt: z.date().optional(),
    }),
  ),
});

import { isValidPhoneNumber } from 'react-phone-number-input';
import { z } from 'zod';

export const ticketSchema = z.object({
  creatorId: z.string().min(1).max(255),
  ownerId: z.string().min(1).max(255),
  lastEditedById: z.string().min(1).max(255),
  assignedId: z.string().min(1).max(255),
  clientName: z.string().min(1).max(255),
  clientEmail: z.union([z.literal(''), z.string().email()]),
  clientPhone: z
    .string()
    .optional()
    .nullable()
    .refine(
      phone =>
        phone === null ||
        phone === '' ||
        (typeof phone === 'string' && isValidPhoneNumber(phone)),
      {
        message: 'Invalid phone number',
      },
    )
    .transform(value => (value === '' ? null : value)),
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

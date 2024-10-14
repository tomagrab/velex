import { isValidPhoneNumber } from 'react-phone-number-input';
import { z } from 'zod';

export const ticketSchema = z.object({
  creatorId: z.string().min(1).max(255),
  ownerId: z.string().min(1).max(255),
  lastEditedById: z.string().min(1).max(255),
  assignedToId: z.string().min(1).max(255),
  clientName: z
    .string()
    .min(1, { message: 'Client name is required' })
    .max(255, { message: 'Client name is too long' }),
  clientEmail: z
    .string()
    .max(255, { message: 'Client email is too long' })
    .email({ message: 'Invalid email address' })
    .or(z.literal('')),
  clientPhone: z
    .string()
    .refine(isValidPhoneNumber, {
      message: 'Invalid phone number',
    })
    .or(z.literal('')),
  statusId: z
    .string()
    .min(1, { message: 'Status is required' })
    .max(255, { message: 'Status is too long' }),
  categoryId: z
    .string()
    .min(1, { message: 'Category is required' })
    .max(255, { message: 'Category is too long' }),
  subCategoryId: z
    .string()
    .min(1, { message: 'Subcategory is required' })
    .max(255, { message: 'Subcategory is too long' }),
  notes: z
    .string()
    .min(1, { message: 'Notes are required' })
    .max(5000, { message: 'Notes are too long' }),
});

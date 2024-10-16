import { z } from 'zod';
import { ticketSchema } from '@/lib/form/schemas/ticket-schema/ticket-schema';

export const formatTicketFormData = (
  formData: z.infer<typeof ticketSchema>,
) => {
  const formattedTicketFormData = new FormData();
  Object.entries(formData).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((item, index) => {
        Object.entries(item).forEach(([subKey, subValue]) => {
          formattedTicketFormData.append(
            `${key}[${index}].${subKey}`,
            subValue === '' || subValue === null ? '' : (subValue as string),
          );
        });
      });
    } else {
      formattedTicketFormData.append(
        key,
        value === '' || value === null ? '' : (value as string),
      );
    }
  });

  return formattedTicketFormData;
};

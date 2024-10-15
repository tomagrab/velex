import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { PhoneInput } from '@/components/ui/phone-input';
import { ticketSchema } from '@/lib/form/schemas/ticket-schema/ticket-schema';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

type ClientInformationFieldsProps = {
  form: UseFormReturn<z.infer<typeof ticketSchema>>;
  isEditMode?: boolean;
};

export default function ClientInformationFields({
  form,
  isEditMode,
}: ClientInformationFieldsProps) {
  return (
    <>
      {/* Client Name Field */}
      <FormField
        disabled={!isEditMode}
        control={form.control}
        name="clientName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Client Name</FormLabel>
            <FormControl>
              <Input placeholder="Enter client name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {/* Client Email Field */}
      <FormField
        disabled={!isEditMode}
        control={form.control}
        name="clientEmail"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Client Email</FormLabel>
            <FormControl>
              <Input
                placeholder="Enter client email"
                {...field}
                value={field.value ?? ''}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {/* Client Phone Field */}
      <FormField
        disabled={!isEditMode}
        control={form.control}
        name="clientPhone"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Client Phone</FormLabel>
            <FormControl>
              <PhoneInput
                placeholder="Enter client phone"
                {...field}
                value={field.value ?? undefined}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}

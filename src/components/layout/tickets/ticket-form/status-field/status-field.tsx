import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { ticketSchema } from '@/lib/form/schemas/ticket-schema/ticket-schema';
import { Status } from '@prisma/client';
import { useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

type StatusFieldsProps = {
  form: UseFormReturn<z.infer<typeof ticketSchema>>;
  isEditMode?: boolean;
  statuses: Status[] | null;
};

export default function StatusFields({
  form,
  isEditMode,
  statuses,
}: StatusFieldsProps) {
  // Effect to default to first available status if not already set
  useEffect(() => {
    const currentStatusId = form.getValues('statusId');

    if (statuses && !currentStatusId) {
      form.setValue('statusId', statuses[0].id);
    }
  }, [statuses, form]);

  if (!statuses || statuses === undefined) {
    return null;
  }

  return (
    <>
      {/* Status Id Field */}
      <FormField
        control={form.control}
        name="statusId"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>Status</FormLabel>
            <Select onValueChange={field.onChange}>
              <FormControl>
                <div>
                  <input type="hidden" {...field} />
                  <SelectTrigger disabled={!isEditMode}>
                    <SelectValue
                      placeholder={
                        statuses.find(status => status.name === 'Open')?.name ||
                        statuses[0].name
                      }
                    />
                  </SelectTrigger>
                </div>
              </FormControl>
              <SelectContent>
                {statuses.map(status => (
                  <SelectItem key={status.id} value={status.id}>
                    {status.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}

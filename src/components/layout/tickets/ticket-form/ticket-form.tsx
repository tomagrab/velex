'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Input } from '@/components/ui/input';
import { useUser } from '@auth0/nextjs-auth0/client';
import { Check, ChevronsUpDown, Loader } from 'lucide-react';
import { ticketSchema } from '@/lib/form/schemas/ticket-schema/ticket-schema';
import { useEffect, useState } from 'react';
import { Category, Status, SubCategory, User } from '@prisma/client';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Textarea } from '@/components/ui/textarea';
import { PhoneInput } from '@/components/ui/phone-input';
import { CreateTicket } from '@/app/server/actions/tickets/ticket-actions';

type TicketFormProps = {
  ticket?: z.infer<typeof ticketSchema>;
  isEditMode?: boolean;
};

export default function TicketForm({
  ticket,
  isEditMode = false,
}: TicketFormProps) {
  const { user, isLoading, error } = useUser();
  const [dbUser, setDbUser] = useState<User>({} as User);

  // These are the required states for form values
  const [ticketStatus, setTicketStatus] = useState<Status>({} as Status);
  const [ticketCategory, setTicketCategory] = useState<Category>(
    {} as Category,
  );
  const [ticketSubCategory, setTicketSubCategory] = useState<SubCategory>(
    {} as SubCategory,
  );

  const [availableStatus, setAvailableStatus] = useState<Status[]>([]);
  const [availableCategory, setAvailableCategory] = useState<Category[]>([]);
  const [availableSubCategory, setAvailableSubCategory] = useState<
    SubCategory[]
  >([]);

  // Fetch initial data for statuses, categories, and subcategories
  useEffect(() => {
    if (user) {
      fetch(`/api/users/${user.sub}`)
        .then(res => res.json())
        .then(data => setDbUser(data));
    }

    fetch('/api/status')
      .then(res => res.json())
      .then(data => setAvailableStatus(data))
      .catch(error => console.error('Error fetching statuses:', error));

    fetch('/api/category')
      .then(res => res.json())
      .then(data => setAvailableCategory(data))
      .catch(error => console.error('Error fetching categories:', error));

    fetch('/api/subcategory')
      .then(res => res.json())
      .then(data => setAvailableSubCategory(data))
      .catch(error => console.error('Error fetching subcategories:', error));
  }, [user]);

  // Update the ticket state when available data changes
  useEffect(() => {
    if (
      !isEditMode &&
      availableStatus.length > 0 &&
      availableCategory.length > 0 &&
      availableSubCategory.length > 0
    ) {
      const initialCategory = availableCategory[0];
      const initialSubCategory =
        availableSubCategory.find(
          sub => sub.categoryId === initialCategory.id,
        ) || ({} as SubCategory);

      // Set the ticket states to the first available values
      setTicketStatus(availableStatus[0]);
      setTicketCategory(initialCategory);
      setTicketSubCategory(initialSubCategory);
    }
  }, [availableStatus, availableCategory, availableSubCategory, isEditMode]);

  // Form setup with react-hook-form and Zod validation
  const form = useForm<z.infer<typeof ticketSchema>>({
    resolver: zodResolver(ticketSchema),
    defaultValues: {
      creatorId: ticket?.creatorId ?? dbUser.id ?? '',
      ownerId: ticket?.ownerId ?? dbUser.id ?? '',
      lastEditedById: ticket?.lastEditedById ?? dbUser.id ?? '',
      assignedToId: ticket?.assignedToId ?? dbUser.id ?? '',
      clientName: ticket?.clientName ?? '',
      clientEmail: ticket?.clientEmail ?? '',
      clientPhone: ticket?.clientPhone ?? '',
      statusId: ticket?.statusId ?? ticketStatus.id ?? '',
      categoryId: ticket?.categoryId ?? ticketCategory.id ?? '',
      subCategoryId: ticket?.subCategoryId ?? ticketSubCategory.id ?? '',
      notes: ticket?.notes ? ticket.notes : [],
    },
  });

  // Ensure the form gets reset when the state for ticketStatus, ticketCategory, or ticketSubCategory updates
  useEffect(() => {
    if (ticketStatus.id && ticketCategory.id && ticketSubCategory.id) {
      form.reset({
        creatorId: dbUser.id || '',
        ownerId: dbUser.id || '',
        lastEditedById: dbUser.id || '',
        assignedToId: dbUser.id || '',
        clientName: ticket?.clientName || '',
        clientEmail: ticket?.clientEmail || '',
        clientPhone: ticket?.clientPhone || '',
        statusId: ticket?.statusId || ticketStatus.id,
        categoryId: ticket?.categoryId || ticketCategory.id,
        subCategoryId: ticket?.subCategoryId || ticketSubCategory.id,
        notes: ticket?.notes ? ticket.notes : [],
      });
    }
  }, [
    form,
    ticket,
    dbUser,
    ticketStatus.id,
    ticketCategory.id,
    ticketSubCategory.id,
  ]);

  if (isLoading) {
    return (
      <div>
        <Loader className="h-24 w-24 animate-spin" />
      </div>
    );
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  if (!user) {
    return <div>Not authenticated</div>;
  }

  return (
    <Form {...form}>
      <form action={CreateTicket} className="flex flex-wrap items-center">
        <input type="hidden" {...form.register('creatorId')} />
        <input type="hidden" {...form.register('ownerId')} />
        <input type="hidden" {...form.register('lastEditedById')} />
        <input type="hidden" {...form.register('assignedToId')} />
        {/* This section should take 1/2 width of the form container */}
        <section className="flex w-full flex-col gap-2 pr-2 md:w-1/2">
          {/* Client Name Field */}
          <FormField
            control={form.control}
            name="clientName"
            render={({ field }) => (
              <FormItem className="flex flex-col">
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
            control={form.control}
            name="clientEmail"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Client Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter client email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Client Phone Field */}
          <FormField
            control={form.control}
            name="clientPhone"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Client Phone</FormLabel>
                <FormControl>
                  <PhoneInput
                    initialValueFormat="national"
                    defaultCountry="US"
                    placeholder="Enter client phone"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </section>

        {/* This section should take 1/2 width of the form container */}
        <section className="flex w-full flex-col gap-2 pl-2 md:w-1/2">
          {/* Category ID Field */}
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Category</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          'justify-between',
                          !field.value && 'text-muted-foreground',
                        )}
                      >
                        {field.value
                          ? availableCategory.find(
                              category => category.id === field.value,
                            )?.name
                          : 'Select category'}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="p-0">
                    <Command>
                      <CommandInput placeholder="Search category..." />
                      <CommandList>
                        <CommandEmpty>No category found.</CommandEmpty>
                        <CommandGroup>
                          {availableCategory.map(category => (
                            <CommandItem
                              defaultValue={category.id}
                              value={category.name}
                              key={category.id}
                              onSelect={() => {
                                form.setValue('categoryId', category.id);
                                form.setValue(
                                  'subCategoryId',
                                  availableSubCategory.find(
                                    sub => sub.categoryId === category.id,
                                  )?.id || '',
                                );
                              }}
                            >
                              <Check
                                className={cn(
                                  'mr-2 h-4 w-4',
                                  category.id === field.value
                                    ? 'opacity-100'
                                    : 'opacity-0',
                                )}
                              />
                              {category.name}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* SubCategory ID Field */}
          <FormField
            control={form.control}
            name="subCategoryId"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Subcategory</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          'justify-between',
                          !field.value && 'text-muted-foreground',
                        )}
                      >
                        {field.value
                          ? availableSubCategory.find(
                              subCategory => subCategory.id === field.value,
                            )?.name
                          : 'Select subcategory'}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="p-0">
                    <Command>
                      <CommandInput placeholder="Search subcategory..." />
                      <CommandList>
                        <CommandEmpty>No subcategory found.</CommandEmpty>
                        <CommandGroup>
                          {availableSubCategory
                            .filter(
                              sub =>
                                sub.categoryId === form.getValues('categoryId'),
                            )
                            .map(subCategory => (
                              <CommandItem
                                defaultValue={subCategory.id}
                                value={subCategory.name}
                                key={subCategory.id}
                                onSelect={() => {
                                  form.setValue(
                                    'subCategoryId',
                                    subCategory.id,
                                  );
                                }}
                              >
                                <Check
                                  className={cn(
                                    'mr-2 h-4 w-4',
                                    subCategory.id === field.value
                                      ? 'opacity-100'
                                      : 'opacity-0',
                                  )}
                                />
                                {subCategory.name}
                              </CommandItem>
                            ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Status ID Field */}
          <FormField
            control={form.control}
            name="statusId"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={
                    availableStatus.find(status => status.name === 'Open')
                      ?.id || availableStatus[0]?.id
                  } // Default to "Open" or first status if not found
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder={
                          availableStatus.find(status => status.name === 'Open')
                            ?.name || availableStatus[0]?.name
                        }
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {availableStatus.map(status => (
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
        </section>

        <section className="w-full py-4">
          {/* Notes */}
          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Notes</FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter notes" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </section>

        <section>
          {/* Submit Button */}
          <Button type="submit">
            {isEditMode ? 'Update Ticket' : 'Create Ticket'}
          </Button>
        </section>
      </form>
    </Form>
  );
}

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandInput,
} from '@/components/ui/command';

import { Check, ChevronsUpDown } from 'lucide-react';
import { ticketSchema } from '@/lib/form/schemas/ticket-schema/ticket-schema';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { cn } from '@/lib/utils';
import { Category, SubCategory } from '@prisma/client';
import { useEffect } from 'react';

type CategoryFieldsProps = {
  form: UseFormReturn<z.infer<typeof ticketSchema>>;
  isEditMode?: boolean;
  categories: Category[] | null;
  subCategories: SubCategory[] | null;
};

export default function CategoryFields({
  form,
  isEditMode,
  categories,
  subCategories,
}: CategoryFieldsProps) {
  // Effect to set the initial category and subcategory values
  useEffect(() => {
    // If no category or subcategory is already set and options are available
    const currentCategoryId = form.getValues('categoryId');
    const currentSubCategoryId = form.getValues('subCategoryId');

    if (
      categories?.length &&
      subCategories?.length &&
      (!currentCategoryId || !currentSubCategoryId)
    ) {
      // Check if the form has ticket data with pre-existing category or subcategory
      if (!currentCategoryId) {
        const initialCategory = categories[0];
        form.setValue('categoryId', initialCategory.id);

        const initialSubCategory = subCategories.find(
          sub => sub.categoryId === initialCategory.id,
        );
        form.setValue('subCategoryId', initialSubCategory?.id || '');
      }

      // Check if the form has pre-existing subcategory and it's valid
      if (!currentSubCategoryId && currentCategoryId) {
        const validSubCategory = subCategories.find(
          sub => sub.categoryId === currentCategoryId,
        );
        form.setValue('subCategoryId', validSubCategory?.id || '');
      }
    }
  }, [categories, subCategories, form]);

  if (
    !categories ||
    categories === undefined ||
    !subCategories ||
    subCategories === undefined
  ) {
    return null;
  }

  return (
    <>
      <FormField
        control={form.control}
        name="categoryId"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>Category</FormLabel>
            <FormControl>
              <div>
                {/* Hidden input field */}
                <input type="hidden" {...field} />
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      disabled={!isEditMode}
                      defaultValue={categories[0].id}
                      variant="outline"
                      role="combobox"
                      className={cn(
                        'w-full justify-between',
                        !field.value && 'text-muted-foreground',
                      )}
                    >
                      {field.value
                        ? categories.find(
                            category => category.id === field.value,
                          )?.name
                        : 'Select category'}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="p-0">
                    <Command>
                      <CommandInput placeholder="Search category..." />
                      <CommandList>
                        <CommandEmpty>No category found.</CommandEmpty>
                        <CommandGroup>
                          {categories.map(category => (
                            <CommandItem
                              value={category.id}
                              key={category.id}
                              onSelect={() => {
                                field.onChange(category.id);
                                form.setValue(
                                  'subCategoryId',
                                  subCategories.find(
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
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="subCategoryId"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>Subcategory</FormLabel>
            <FormControl>
              <div>
                {/* Hidden input field */}
                <input type="hidden" {...field} />
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      disabled={!isEditMode}
                      variant="outline"
                      role="combobox"
                      className={cn(
                        'w-full justify-between',
                        !field.value && 'text-muted-foreground',
                      )}
                    >
                      {field.value
                        ? subCategories.find(
                            subCategory => subCategory.id === field.value,
                          )?.name
                        : 'Select subcategory'}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="p-0">
                    <Command>
                      <CommandInput placeholder="Search subcategory..." />
                      <CommandList>
                        <CommandEmpty>No subcategory found.</CommandEmpty>
                        <CommandGroup>
                          {subCategories
                            .filter(
                              sub =>
                                sub.categoryId === form.getValues('categoryId'),
                            )
                            .map(subCategory => (
                              <CommandItem
                                value={subCategory.id}
                                key={subCategory.id}
                                onSelect={() => {
                                  field.onChange(subCategory.id);
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
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}

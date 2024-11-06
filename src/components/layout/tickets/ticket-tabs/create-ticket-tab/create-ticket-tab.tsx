import TicketFormWrapper from '@/components/layout/tickets/ticket-form-wrapper/ticket-form-wrapper';
import { Category, Status, SubCategory, User } from '@prisma/client';

type CreateTicketTabProps = {
  dbUser: User | null;
  statuses: Status[] | null;
  categories: Category[] | null;
  subCategories: SubCategory[] | null;
};

export default function CreateTicketTab({
  dbUser,
  statuses,
  categories,
  subCategories,
}: CreateTicketTabProps) {
  return (
    <TicketFormWrapper
      dbUser={dbUser}
      ticket={null}
      statuses={statuses}
      categories={categories}
      subCategories={subCategories}
    />
  );
}

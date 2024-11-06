import { Prisma } from '@prisma/client';

export type CommonTicketType = Prisma.TicketGetPayload<{
  include: {
    creator: true;
    owner: true;
    status: true;
    category: true;
    subCategory: true;
    notes: true;
  };
}>;

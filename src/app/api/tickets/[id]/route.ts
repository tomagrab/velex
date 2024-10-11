import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const ticket = await prisma.ticket.findUnique({
      where: { id: params.id },
      include: {
        creator: true,
        owner: true,
        status: true,
        category: true,
        subCategory: true,
        notes: true,
      },
    });

    if (!ticket) {
      return NextResponse.json({ error: 'Ticket not found' }, { status: 404 });
    }

    return NextResponse.json(ticket);
  } catch (error) {
    console.error('Error fetching ticket:', error);
    return NextResponse.json(
      { error: 'Error fetching ticket' },
      { status: 500 },
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const data = await request.json();

    const updatedTicket = await prisma.ticket.update({
      where: { id: params.id },
      data: {
        ...data,
        // Ensure relations are properly connected
        creator: { connect: { id: data.creatorId } },
        owner: { connect: { id: data.ownerId } },
        status: { connect: { id: data.statusId } },
        category: { connect: { id: data.categoryId } },
        subCategory: { connect: { id: data.subCategoryId } },
      },
    });

    return NextResponse.json(updatedTicket);
  } catch (error) {
    console.error('Error updating ticket:', error);
    return NextResponse.json(
      { error: 'Error updating ticket' },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    await prisma.ticket.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: 'Ticket deleted' });
  } catch (error) {
    console.error('Error deleting ticket:', error);
    return NextResponse.json(
      { error: 'Error deleting ticket' },
      { status: 500 },
    );
  }
}

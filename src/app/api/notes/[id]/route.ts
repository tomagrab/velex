import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const note = await prisma.note.findUnique({
      where: { id: params.id },
      include: {
        ticket: true,
        creator: true,
      },
    });

    if (!note) {
      return NextResponse.json({ error: 'Note not found' }, { status: 404 });
    }

    return NextResponse.json(note);
  } catch (error) {
    console.error('Error fetching note:', error);
    return NextResponse.json({ error: 'Error fetching note' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const data = await request.json();

    const updatedNote = await prisma.note.update({
      where: { id: params.id },
      data: {
        ...data,
        lastEditedBy: { connect: { id: data.lastEditedById } },
      },
    });

    return NextResponse.json(updatedNote);
  } catch (error) {
    console.error('Error updating note:', error);
    return NextResponse.json({ error: 'Error updating note' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    await prisma.note.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: 'Note deleted' });
  } catch (error) {
    console.error('Error deleting note:', error);
    return NextResponse.json({ error: 'Error deleting note' }, { status: 500 });
  }
}

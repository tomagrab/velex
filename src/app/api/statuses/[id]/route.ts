import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const id = parseInt(params.id);
    const status = await prisma.status.findUnique({
      where: { id },
    });

    if (!status) {
      return NextResponse.json({ error: 'Status not found' }, { status: 404 });
    }

    return NextResponse.json(status);
  } catch (error) {
    console.error('Error fetching status:', error);
    return NextResponse.json(
      { error: 'Error fetching status' },
      { status: 500 },
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const id = parseInt(params.id);
    const data = await request.json();

    const updatedStatus = await prisma.status.update({
      where: { id },
      data,
    });

    return NextResponse.json(updatedStatus);
  } catch (error) {
    console.error('Error updating status:', error);
    return NextResponse.json(
      { error: 'Error updating status' },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const id = parseInt(params.id);
    await prisma.status.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Status deleted' });
  } catch (error) {
    console.error('Error deleting status:', error);
    return NextResponse.json(
      { error: 'Error deleting status' },
      { status: 500 },
    );
  }
}

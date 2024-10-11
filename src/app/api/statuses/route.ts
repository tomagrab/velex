import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma/prisma';

export async function GET() {
  try {
    const statuses = await prisma.status.findMany();

    return NextResponse.json(statuses);
  } catch (error) {
    console.error('Error fetching statuses:', error);
    return NextResponse.json(
      { error: 'Error fetching statuses' },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const newStatus = await prisma.status.create({
      data,
    });

    return NextResponse.json(newStatus);
  } catch (error) {
    console.error('Error creating status:', error);
    return NextResponse.json(
      { error: 'Error creating status' },
      { status: 500 },
    );
  }
}

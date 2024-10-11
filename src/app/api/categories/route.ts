import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma/prisma';

export async function GET() {
  try {
    const categories = await prisma.category.findMany();

    return NextResponse.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: 'Error fetching categories' },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const newCategory = await prisma.category.create({
      data,
    });

    return NextResponse.json(newCategory);
  } catch (error) {
    console.error('Error creating category:', error);
    return NextResponse.json(
      { error: 'Error creating category' },
      { status: 500 },
    );
  }
}

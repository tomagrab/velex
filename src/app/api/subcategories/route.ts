import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma/prisma';

export async function GET() {
  try {
    const subcategories = await prisma.subCategory.findMany();

    return NextResponse.json(subcategories);
  } catch (error) {
    console.error('Error fetching subcategories:', error);
    return NextResponse.json(
      { error: 'Error fetching subcategories' },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const newSubCategory = await prisma.subCategory.create({
      data,
    });

    return NextResponse.json(newSubCategory);
  } catch (error) {
    console.error('Error creating subcategory:', error);
    return NextResponse.json(
      { error: 'Error creating subcategory' },
      { status: 500 },
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const id = parseInt(params.id);
    const subcategory = await prisma.subCategory.findUnique({
      where: { id },
    });

    if (!subcategory) {
      return NextResponse.json(
        { error: 'Subcategory not found' },
        { status: 404 },
      );
    }

    return NextResponse.json(subcategory);
  } catch (error) {
    console.error('Error fetching subcategory:', error);
    return NextResponse.json(
      { error: 'Error fetching subcategory' },
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

    const updatedSubCategory = await prisma.subCategory.update({
      where: { id },
      data,
    });

    return NextResponse.json(updatedSubCategory);
  } catch (error) {
    console.error('Error updating subcategory:', error);
    return NextResponse.json(
      { error: 'Error updating subcategory' },
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
    await prisma.subCategory.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Subcategory deleted' });
  } catch (error) {
    console.error('Error deleting subcategory:', error);
    return NextResponse.json(
      { error: 'Error deleting subcategory' },
      { status: 500 },
    );
  }
}

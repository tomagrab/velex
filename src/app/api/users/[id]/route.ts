// src/app/api/users/[id]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma/prisma';

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const user = await prisma.user.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: 'User deleted', user });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json({ error: 'Error deleting user' }, { status: 500 });
  }
}

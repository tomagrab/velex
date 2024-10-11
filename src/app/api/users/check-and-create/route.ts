import { NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma/prisma';

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const {
      auth0Id,
      email,
      givenName,
      familyName,
      nickname,
      name,
      picture,
      emailVerified,
      role,
    } = data;

    // Validate the required fields
    if (!auth0Id || !email) {
      return NextResponse.json(
        { error: 'auth0Id and email are required.' },
        { status: 400 },
      );
    }

    // Check if the user already exists
    let user = await prisma.user.findUnique({
      where: { auth0Id },
    });

    if (!user) {
      // Create a new user
      user = await prisma.user.create({
        data: {
          auth0Id,
          email,
          givenName,
          familyName,
          nickname,
          name,
          picture,
          emailVerified,
          role,
        },
      });

      return NextResponse.json(
        { message: 'User created successfully.', user },
        { status: 201 },
      );
    } else {
      // User exists, you can update the user if needed
      // For now, we'll just return the existing user
      return NextResponse.json(
        { message: 'User already exists.', user },
        { status: 200 },
      );
    }
  } catch (error: unknown) {
    console.error('Error in /api/users/check-and-create:', error);

    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}

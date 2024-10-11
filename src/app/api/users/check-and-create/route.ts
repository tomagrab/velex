import { NextResponse, NextRequest } from 'next/server';
import prisma from '@/lib/db/prisma/prisma';
import jwt, { JwtHeader, SigningKeyCallback } from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';
import { CustomError } from '@/lib/interfaces/utilities/custom-error/custom-error';

const AUTH0_ACTION_M2M_DOMAIN = process.env.AUTH0_ACTION_M2M_DOMAIN; // e.g., "your-domain.us.auth0.com"
const AUTH0_ACTION_M2M_API_IDENTIFIER =
  process.env.AUTH0_ACTION_M2M_API_IDENTIFIER; // e.g., "https://your-api-identifier"

// Set up the JWKS client
const client = jwksClient({
  jwksUri: `https://${AUTH0_ACTION_M2M_DOMAIN}/.well-known/jwks.json`,
});

function getKey(header: JwtHeader, callback: SigningKeyCallback) {
  client.getSigningKey(header.kid!, function (err, key) {
    if (err) {
      callback(err, undefined);
    } else if (key) {
      const signingKey = key.getPublicKey();
      callback(null, signingKey);
    } else {
      callback(new Error('Signing key is undefined'), undefined);
    }
  });
}

export async function POST(request: NextRequest) {
  try {
    // Extract the Authorization header
    const authHeader = request.headers.get('authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Missing or invalid authorization header.' },
        { status: 401 },
      );
    }

    const token = authHeader.split(' ')[1];

    // Verify the token
    await new Promise<void>((resolve, reject) => {
      jwt.verify(
        token,
        getKey,
        {
          audience: AUTH0_ACTION_M2M_API_IDENTIFIER,
          issuer: `https://${AUTH0_ACTION_M2M_DOMAIN}/`,
          algorithms: ['RS256'],
        },
        err => {
          if (err) {
            console.error('JWT verification failed:', err);
            reject(err);
          } else {
            resolve();
          }
        },
      );
    });

    // Proceed with the original logic
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

    const customError = error as CustomError;

    if (customError.name === 'JsonWebTokenError') {
      return NextResponse.json({ error: 'Invalid token.' }, { status: 401 });
    }

    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}

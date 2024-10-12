import { NextResponse, NextRequest } from 'next/server';
import prisma from '@/lib/db/prisma/prisma';
import jwt, { JwtHeader, SigningKeyCallback } from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';
import { CustomError } from '@/lib/interfaces/utilities/custom-error/custom-error';
import { managementAPI } from '@/lib/api/auth0/management-api/management-api';
import { getAuth0UserRoles } from '@/lib/utilities/api/users/auth0/get-auth0-user-roles/get-auth0-user-roles';
import { User } from '@prisma/client';

const AUTH0_DOMAIN = process.env.AUTH0_DOMAIN;
const AUTH0_ACTION_M2M_API_IDENTIFIER =
  process.env.AUTH0_ACTION_M2M_API_IDENTIFIER;
const AUTH0_USER_ROLE_ID = process.env.AUTH0_USER_ROLE_ID!;

// Set up the JWKS client
const client = jwksClient({
  jwksUri: `https://${AUTH0_DOMAIN}/.well-known/jwks.json`,
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

async function assignUserRole(auth0Id: User['auth0Id']) {
  try {
    // Check if the user already has the 'User' role in Auth0
    const rolesResponse = await getAuth0UserRoles(auth0Id);

    const hasUserRole = rolesResponse.data?.roles.some(
      role => role.id === AUTH0_USER_ROLE_ID,
    );

    if (!hasUserRole) {
      // Assign the 'User' role
      await managementAPI.users.assignRoles(
        { id: auth0Id },
        { roles: [AUTH0_USER_ROLE_ID] },
      );
    }

    return { success: true };
  } catch (error) {
    console.error('Error assigning role in Auth0:', error);
    return { success: false, error: 'Failed to assign role in Auth0' };
  }
}

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Missing or invalid authorization header.' },
        { status: 401 },
      );
    }

    const token = authHeader.split(' ')[1];

    await new Promise<void>((resolve, reject) => {
      jwt.verify(
        token,
        getKey,
        {
          audience: AUTH0_ACTION_M2M_API_IDENTIFIER,
          issuer: `https://${AUTH0_DOMAIN}/`,
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

    if (!auth0Id || !email) {
      return NextResponse.json(
        { error: 'auth0Id and email are required.' },
        { status: 400 },
      );
    }

    let user = await prisma.user.findUnique({
      where: { auth0Id },
    });

    if (!user) {
      // Create the user in the database
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

      // Assign the "User" role in Auth0
      const roleAssignmentResponse = await assignUserRole(auth0Id);
      if (!roleAssignmentResponse.success) {
        return NextResponse.json(
          { error: roleAssignmentResponse.error },
          { status: 500 },
        );
      }

      return NextResponse.json(
        { message: 'User created successfully and role assigned.', user },
        { status: 201 },
      );
    } else {
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

import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma/prisma';
import { getUserFromDatabase } from '@/lib/utilities/api/users/database/get-user-by-id/get-user-by-id';
import { getAuth0UserRoles } from '@/lib/utilities/api/users/auth0/get-auth0-user-roles/get-auth0-user-roles';
import { updateAuth0UserRole } from '@/lib/utilities/api/users/auth0/update-auth0-user-role/update-auth0-user-role';
import { updateUserInDatabase } from '@/lib/utilities/api/users/database/update-user-by-id/update-user-by-id';
import { checkUserRole } from '@/lib/utilities/api/users/auth0/check-user-role/check-user-role';

export const GET = withApiAuthRequired(
  async (
    request: NextRequest,
    context: { params?: Record<string, string | string[]> },
  ) => {
    try {
      const response = new NextResponse();
      const session = await getSession(request, response);
      const user = session?.user;

      if (!user) {
        return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      if (!context.params || !context.params.id) {
        return NextResponse.json(
          { error: 'Invalid request parameters' },
          { status: 400 },
        );
      }

      const id = context.params.id as string;
      const foundUser = await prisma.user.findUnique({
        where: { auth0Id: id },
      });

      if (!foundUser) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }

      return NextResponse.json(foundUser);
    } catch (error) {
      console.error('Error fetching user:', error);
      return NextResponse.json(
        { error: 'Error fetching user' },
        { status: 500 },
      );
    }
  },
);

export const PUT = withApiAuthRequired(
  async (
    request: NextRequest,
    context: { params?: Record<string, string | string[]> },
  ) => {
    try {
      const response = new NextResponse();
      const session = await getSession(request, response);
      const user = session?.user;

      if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }

      if (!context.params || !context.params.id) {
        return NextResponse.json(
          { error: 'Invalid request parameters' },
          { status: 400 },
        );
      }

      const id = context.params.id as string;
      const data: {
        role: 'Administrator' | 'Manager' | 'User';
        givenName: string;
        familyName: string;
        name: string;
      } = await request.json();

      // Step 1: Fetch the user from the database
      const userResponse = await getUserFromDatabase(id);
      if (
        !userResponse.success ||
        !userResponse.data ||
        !userResponse.data.user
      ) {
        return NextResponse.json(
          { error: userResponse.error },
          { status: userResponse.status },
        );
      }

      const currentUser = userResponse.data.user;

      // Step 2: Fetch the logged-in user's current roles from Auth0
      const loggedInUserRolesResponse = await getAuth0UserRoles(user.sub);
      if (
        !loggedInUserRolesResponse.success ||
        !loggedInUserRolesResponse.data ||
        !loggedInUserRolesResponse.data.roles
      ) {
        return NextResponse.json(
          { error: loggedInUserRolesResponse.error },
          { status: loggedInUserRolesResponse.status },
        );
      }

      const loggedInUserRoles = loggedInUserRolesResponse.data.roles;

      // Step 3: Map the new role from request data
      const roleMapping = {
        Administrator: process.env.AUTH0_ADMINISTRATOR_ROLE_ID,
        Manager: process.env.AUTH0_MANAGER_ROLE_ID,
        User: process.env.AUTH0_USER_ROLE_ID,
      };
      const newRoleId =
        roleMapping[data.role as 'Administrator' | 'Manager' | 'User'];

      if (!newRoleId) {
        return NextResponse.json(
          { error: 'Invalid role provided' },
          { status: 400 },
        );
      }

      // Step 4: Check the logged-in user's role using the checkUserRole utility function
      const adminRoleId = process.env.AUTH0_ADMINISTRATOR_ROLE_ID!;
      const managerRoleId = process.env.AUTH0_MANAGER_ROLE_ID!;
      const userRoleId = process.env.AUTH0_USER_ROLE_ID!;

      // Check if the logged-in user is a User
      const checkUserRoleResponse = await checkUserRole(
        loggedInUserRoles,
        userRoleId,
      );
      if (
        checkUserRoleResponse.success &&
        checkUserRoleResponse.data?.hasRole
      ) {
        return NextResponse.json(
          { error: 'Users cannot assign roles' },
          { status: 403 },
        );
      }

      // Check if the logged-in user is a Manager
      const checkManagerRoleResponse = await checkUserRole(
        loggedInUserRoles,
        managerRoleId,
      );
      if (
        checkManagerRoleResponse.success &&
        checkManagerRoleResponse.data?.hasRole
      ) {
        if (newRoleId === adminRoleId) {
          return NextResponse.json(
            { error: 'Managers cannot assign Administrator role' },
            { status: 403 },
          );
        }
      }

      // Step 5: Fetch the current user's role from Auth0
      const rolesResponse = await getAuth0UserRoles(currentUser.auth0Id);
      if (!rolesResponse.success || !rolesResponse.data?.roles) {
        return NextResponse.json(
          { error: rolesResponse.error },
          { status: rolesResponse.status },
        );
      }
      const auth0Roles = rolesResponse.data.roles;

      // Step 6: Update the user's role in Auth0 if needed
      const updateRoleResponse = await updateAuth0UserRole(
        currentUser.auth0Id,
        auth0Roles,
        newRoleId,
      );
      if (!updateRoleResponse.success) {
        return NextResponse.json(
          { error: updateRoleResponse.error },
          { status: updateRoleResponse.status },
        );
      }

      // Step 7: Update the user's role and name fields in the database
      const updateUserResponse = await updateUserInDatabase(
        currentUser.auth0Id,
        {
          role: data.role,
          givenName: data.givenName,
          familyName: data.familyName,
          name: data.name,
        },
      );

      if (!updateUserResponse.success || !updateUserResponse.data?.user) {
        return NextResponse.json(
          { error: updateUserResponse.error },
          { status: updateUserResponse.status },
        );
      }

      return NextResponse.json(updateUserResponse.data.user);
    } catch (error) {
      console.error('Error updating user or role:', error);
      return NextResponse.json(
        { error: `Error updating user or role: ${error}` },
        { status: 500 },
      );
    }
  },
);

export const DELETE = withApiAuthRequired(
  async (
    request: NextRequest,
    context: { params?: Record<string, string | string[]> },
  ) => {
    try {
      const response = new NextResponse();
      const session = await getSession(request, response);
      const user = session?.user;

      if (!user) {
        return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      if (!context.params || !context.params.id) {
        return NextResponse.json(
          { error: 'Invalid request parameters' },
          { status: 400 },
        );
      }

      const id = context.params.id as string;
      await prisma.user.delete({
        where: { id },
      });

      return NextResponse.json({ message: 'User deleted' });
    } catch (error) {
      console.error('Error deleting user:', error);
      return NextResponse.json(
        { error: 'Error deleting user' },
        { status: 500 },
      );
    }
  },
);

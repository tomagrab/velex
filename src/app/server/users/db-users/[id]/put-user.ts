import prisma from '@/lib/db/prisma/prisma';
import { User } from '@prisma/client';
import { CommonResponse } from '@/lib/types/api/common-response/common-response';
import { updateAuth0UserRole } from '@/lib/utilities/api/users/auth0/update-auth0-user-role/update-auth0-user-role';
import { getAuth0UserRoles } from '@/lib/utilities/api/users/auth0/get-auth0-user-roles/get-auth0-user-roles';
import { checkUserRole } from '@/lib/utilities/api/users/auth0/check-user-role/check-user-role';
import { updateUserInDatabase } from '@/lib/utilities/api/users/database/update-user-by-id/update-user-by-id';

// Utility function to update a user for SSR pages
export const PutUser = async (
  id: string,
  data: {
    role: 'Administrator' | 'Manager' | 'User';
    givenName: string;
    familyName: string;
    name: string;
  },
  loggedInUserId: string,
): Promise<CommonResponse<User | null>> => {
  try {
    // Fetch the user from the database
    const currentUserResponse = await prisma.user.findUnique({
      where: { auth0Id: id },
    });
    if (!currentUserResponse) {
      return {
        success: false,
        status: 404,
        error: 'User not found',
        data: null,
      };
    }

    const currentUser = currentUserResponse;

    // Fetch the logged-in user's roles from Auth0
    const loggedInUserRolesResponse = await getAuth0UserRoles(loggedInUserId);
    if (
      !loggedInUserRolesResponse.success ||
      !loggedInUserRolesResponse.data?.roles
    ) {
      return {
        success: false,
        status: loggedInUserRolesResponse.status,
        error: loggedInUserRolesResponse.error,
        data: null,
      };
    }

    const loggedInUserRoles = loggedInUserRolesResponse.data.roles;

    // Map the new role from request data
    const roleMapping = {
      Administrator: process.env.AUTH0_ADMINISTRATOR_ROLE_ID!,
      Manager: process.env.AUTH0_MANAGER_ROLE_ID!,
      User: process.env.AUTH0_USER_ROLE_ID!,
    };
    const newRoleId = roleMapping[data.role];

    if (!newRoleId) {
      return {
        success: false,
        status: 400,
        error: 'Invalid role provided',
        data: null,
      };
    }

    // Role-based checks
    const userRoleId = process.env.AUTH0_USER_ROLE_ID!;
    const managerRoleId = process.env.AUTH0_MANAGER_ROLE_ID!;
    const adminRoleId = process.env.AUTH0_ADMINISTRATOR_ROLE_ID!;

    const checkUserRoleResponse = await checkUserRole(
      loggedInUserRoles,
      userRoleId,
    );
    if (checkUserRoleResponse.success && checkUserRoleResponse.data?.hasRole) {
      return {
        success: false,
        status: 403,
        error: 'Users cannot assign roles',
        data: null,
      };
    }

    const checkManagerRoleResponse = await checkUserRole(
      loggedInUserRoles,
      managerRoleId,
    );
    if (
      checkManagerRoleResponse.success &&
      checkManagerRoleResponse.data?.hasRole
    ) {
      if (newRoleId === adminRoleId) {
        return {
          success: false,
          status: 403,
          error: 'Managers cannot assign Administrator role',
          data: null,
        };
      }
    }

    // Update the user's role in Auth0 if needed
    const currentRolesResponse = await getAuth0UserRoles(currentUser.auth0Id);
    if (!currentRolesResponse.success || !currentRolesResponse.data?.roles) {
      return {
        success: false,
        status: currentRolesResponse.status,
        error: currentRolesResponse.error,
        data: null,
      };
    }

    const updateRoleResponse = await updateAuth0UserRole(
      currentUser.auth0Id,
      currentRolesResponse.data.roles,
      newRoleId,
    );
    if (!updateRoleResponse.success) {
      return {
        success: false,
        status: updateRoleResponse.status,
        error: updateRoleResponse.error,
        data: null,
      };
    }

    // Update the user's role and name fields in the database
    const updatedUserResponse = await updateUserInDatabase(
      currentUser.auth0Id,
      {
        role: data.role,
        givenName: data.givenName,
        familyName: data.familyName,
        name: data.name,
      },
    );

    if (!updatedUserResponse.success || !updatedUserResponse.data?.user) {
      return {
        success: false,
        status: updatedUserResponse.status,
        error: updatedUserResponse.error,
        data: null,
      };
    }

    return { success: true, status: 200, data: updatedUserResponse.data.user };
  } catch (error) {
    console.error('Error updating user for SSR:', error);
    return {
      success: false,
      status: 500,
      error: 'Error updating user for SSR',
      data: null,
    };
  }
};

import { managementAPI } from '@/lib/api/auth0/management-api/management-api';
import { CommonResponse } from '@/lib/types/api/common-response/common-response';

export const updateAuth0UserRole = async (
  auth0Id: string,
  currentRoles: Array<{ id: string }>,
  newRoleId: string,
): Promise<CommonResponse<null>> => {
  try {
    if (currentRoles.length && currentRoles[0].id !== newRoleId) {
      // Remove current role
      await managementAPI.users.deleteRoles(
        { id: auth0Id },
        { roles: [currentRoles[0].id] },
      );

      // Assign new role
      await managementAPI.users.assignRoles(
        { id: auth0Id },
        { roles: [newRoleId] },
      );
    }

    return { success: true, status: 200 };
  } catch (error) {
    console.error('Error updating Auth0 user role:', error);
    return {
      success: false,
      error: 'Failed to update role in Auth0',
      status: 500,
    };
  }
};

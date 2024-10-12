import { managementAPI } from '@/lib/api/auth0/management-api/management-api';
import { Auth0Role } from '@/lib/types/api/auth0/auth0-role/auth0-role';
import { CommonResponse } from '@/lib/types/api/common-response/common-response';

export const getAuth0UserRoles = async (
  auth0Id: string,
): Promise<CommonResponse<{ roles: Auth0Role[] }>> => {
  try {
    const rolesResponse = await managementAPI.users.getRoles({ id: auth0Id });

    if (
      !rolesResponse ||
      !rolesResponse.data ||
      rolesResponse.data.length === 0
    ) {
      return {
        success: false,
        error: 'No roles found for the user',
        status: 404,
      };
    }

    return { success: true, data: { roles: rolesResponse.data }, status: 200 };
  } catch (error) {
    console.error(
      'Error fetching roles from Auth0 for user with ID:',
      auth0Id,
      error,
    );
    return {
      success: false,
      error: 'Failed to fetch roles from Auth0',
      status: 500,
    };
  }
};

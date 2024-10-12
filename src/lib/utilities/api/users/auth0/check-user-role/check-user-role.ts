import { Auth0Role } from '@/lib/types/api/auth0/auth0-role/auth0-role';
import { CommonResponse } from '@/lib/types/api/common-response/common-response';

export const checkUserRole = async (
  loggedInUserRoles: Auth0Role[],
  requiredRoleId: string,
): Promise<CommonResponse<{ hasRole: boolean }>> => {
  try {
    const hasRole = loggedInUserRoles.some(role => role.id === requiredRoleId);

    return { success: true, data: { hasRole }, status: 200 };
  } catch (error) {
    console.error('Error checking user role:', error);
    return {
      success: false,
      error: 'Failed to check user role',
      status: 500,
    };
  }
};

import { ManagementClient } from 'auth0';

export const managementAPI = new ManagementClient({
  domain: process.env.AUTH0_DOMAIN!,
  clientId: process.env.AUTH0_MANAGEMENT_API_CLIENT_ID!,
  clientSecret: process.env.AUTH0_MANAGEMENT_API_CLIENT_SECRET!,
});

import { withMiddlewareAuthRequired } from '@auth0/nextjs-auth0/edge';

export default withMiddlewareAuthRequired();

export const config = {
  matcher: [
    '/assets',
    '/tickets',
    '/users',
    '/settings/profile',
    '/api/openai/:path*',
  ],
};

import { withMiddlewareAuthRequired } from '@auth0/nextjs-auth0/edge';

export default withMiddlewareAuthRequired();

export const config = {
  matcher: [
    '/',
    '/:path*',
    '/assets',
    '/tickets',
    '/users',
    '/settings/profile',
    '/api/openai/:path*',
  ],
};

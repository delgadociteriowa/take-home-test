import { authOptions } from '@/utils/authOptions';
import NextAuth from 'next-auth';

// Initialize NextAuth with the authorization options as the argument
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

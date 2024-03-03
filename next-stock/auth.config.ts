import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnManager = nextUrl.pathname.startsWith('/manager');
      if (isOnManager) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/manager', nextUrl));
      }
      return true;
    },
    // async session({session, user}) {
    //   if (session?.user) {
    //     session.user.id = user.id;
    //   }
    //   return session;
    // },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
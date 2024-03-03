import { authConfig } from './auth.config';
import bcrypt from 'bcryptjs';
import Credentials from 'next-auth/providers/credentials';
import NextAuth from 'next-auth';
import { PrismaClient } from '@prisma/client';
import type { User } from '@/app/lib/definitions';
import { z } from 'zod';

const prisma = new PrismaClient();


/**
 * HACK: 
 * Although we're using the Credentials provider, it's generally recommended to use alternative providers 
 * such as OAuth or email providers.
 * https://authjs.dev/getting-started/providers
 */

async function getUser(email: string): Promise<User | null> {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if(user) {
      const userWithIdAsString = {
        ...user,
        id: user.id.toString(),
      };
      return userWithIdAsString;
    }
    return null;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {

        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(5) })
          .safeParse(credentials);
        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          if (!user) return null;
          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (passwordsMatch) return user;
        }
        console.log('Invalid credentials');
        return null;
      },
    }),
  ],

});
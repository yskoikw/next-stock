import { Argon2id } from "oslo/password";
import bcrypt from 'bcryptjs';
import { cookies } from "next/headers";
import { cache } from "react";
import { Lucia, Session, User } from "lucia";
import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const client = new PrismaClient();
const adapter = new PrismaAdapter(client.session, client.user);
const prisma = new PrismaClient();

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		// this sets cookies with super long expiration
		// since Next.js doesn't allow Lucia to extend cookie expiration when rendering pages
		expires: false,
		attributes: {
			// set to `true` when using HTTPS
			secure: process.env.NODE_ENV === "production"
		}
	},
  getUserAttributes: (attributes) => {
		return {
			// attributes has the type of DatabaseUserAttributes
			firstName: attributes.firstName
		};
	}
});


/**
 * TODO: use validateRequest in middleware
 */
export const validateRequest = cache(
	async (): Promise<{ user: User; session: Session } | { user: null; session: null }> => {
		const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
		if (!sessionId) {
			return {
				user: null,
				session: null
			};
		}

		const result = await lucia.validateSession(sessionId);
		// next.js throws when you attempt to set cookie when rendering page
		try {
			if (result.session && result.session.fresh) {
				const sessionCookie = lucia.createSessionCookie(result.session.id);
				cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
			}
			if (!result.session) {
				const sessionCookie = lucia.createBlankSessionCookie();
				cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
			}
		} catch {}
    console.log(result);
		return result;
	}
);

declare module "lucia" {
	interface Register {
		Lucia: typeof lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
	}
}

interface DatabaseUserAttributes {
	firstName: string;
}


// login
export async function login( formData: FormData) {
	const email = formData.get("email");
  const password = formData.get("password");
	if ( typeof email !== "string" || email.length < 3 || email.length > 50 ) {
		return null;
	}
	if (typeof password !== "string" || password.length < 6 || password.length > 255) {
		return null;
	}

  const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
  });
  if(!user) return null;

	const validPassword = await new Argon2id().verify(user.password, password);
	if (!validPassword) null;
  const userId = user.id;
	const session = await lucia.createSession(userId, {});
	const sessionCookie = lucia.createSessionCookie(session.id);
	cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
  return user;
}
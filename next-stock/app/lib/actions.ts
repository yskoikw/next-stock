"use server";
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import { revalidatePath } from "next/cache";
import { Argon2id } from "oslo/password";
import { cookies } from "next/headers";
import { lucia, login, validateRequest } from "@/auth";
import type { NextRequest } from 'next/server'
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

export async function authenticate(_currentState: unknown, formData: FormData) {
  try {
    const user = await login(formData);
    if(!user) return 'invaild';
  } catch (error) {
    return 'Something went wrong.'
  }
}

//sign up & create org
export async function signup(
  prevState: {
    message: string;
  },
  formData: FormData,
) {
  const name = formData.get("name");
  const phone = formData.get("phone");
	const firstName = formData.get("first_name");
  const lastName = formData.get("last_name");
  const email = formData.get("email");
	// username must be between 4 ~ 31 characters, and only consists of lowercase letters, 0-9, -, and _
	// keep in mind some database (e.g. mysql) are case insensitive
	if (
    typeof name !== "string" ||
    typeof phone !== "string" ||
		typeof firstName !== "string" ||
    typeof lastName !== "string" ||
    typeof email !== "string" ||
		firstName.length < 3 ||
		firstName.length > 31
	) {
		return {
			message: "Invalid firstName"
		};
	}
	const password = formData.get("password");
	if (typeof password !== "string" || password.length < 6 || password.length > 255) {
		return {
			message: "Invalid password"
		};
	}
	const hashedPassword = await new Argon2id().hash(password);
	console.log('validate finish');
  const organization = await prisma.organization.create({
    data: {
      name: name,
      phone: phone,
    },
  });

  const user = await prisma.user.create({
    data: {
      organizationId: organization.id,
      email: email,
      password: hashedPassword,
      roleId: '1',
      firstName: firstName,
      lastName: lastName,
    },
  });

  const userId = user.id.toString();
	const session = await lucia.createSession(userId, {});
	const sessionCookie = lucia.createSessionCookie(session.id);
	cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
	// return redirect("/");
  return { message: `success` };
}


// logout
export async function logout() {
	const { session } = await validateRequest();
	if (!session) {
		return {
			error: "Unauthorized"
		};
	}

	await lucia.invalidateSession(session.id);
  // remove session cookie by setting a blank session cookie
	const sessionCookie = lucia.createBlankSessionCookie();
	cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
	return redirect("/login");
}
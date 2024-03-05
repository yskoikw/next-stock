'use server'
import bcrypt from 'bcryptjs';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { PrismaClient } from '@prisma/client';
import type { User } from '@/app/lib/definitions';
import { auth } from "@/auth.config";

const prisma = new PrismaClient();

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
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
	const hashedPassword = await bcrypt.hash(password, 10);
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
	// return redirect("/");
  return { message: `success` };
}

export async function getSessionUser(): Promise<User | null> {
  const session = await auth();
  const email = session?.user?.email;
  if(!email) return null;
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  return user ?? null;
}

export async function getOrganizationId(): Promise<String | null> {
  const session = await auth();
  const email = session?.user?.email;
  if(!email) return null;
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  return user?.organizationId ?? null;
}
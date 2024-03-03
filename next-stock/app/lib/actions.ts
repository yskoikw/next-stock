"use server";
import { AuthError } from 'next-auth';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import { revalidatePath } from "next/cache";
import { signIn } from '@/auth';
// import { getServerSession } from "next-auth/next";


const prisma = new PrismaClient();

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    // console.log('formData:', Object.fromEntries(formData.entries()));
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return "Sorry, that email or password didn't work.";
        default:
          return "Sorry, Something went wrong.";
      }
    }
    throw error;
  }
}


// export async function settionAction() {
//   console.log('ccccccccccc');
//   const session = await getServerSession();
  
//   // const session = await getSession();
//   // const userRole = session?.user;
  
  
//   console.log(session);  
//   console.log('ddddddddddd');
//   return session;
// }

export async function createOrgAndUser(
  prevState: {
    message: string;
  },
  formData: FormData,
) {

  try {
    const name = formData.get('name');
    const phone = formData.get('phone');
    const email = formData.get('email');
    const firstName = formData.get('firstName');
    const lastName = formData.get('lastName');
    const password = formData.get('password');
    if (typeof name !== 'string' || typeof phone !== 'string' || typeof email !== 'string' || typeof password !== 'string' || typeof firstName !== 'string' || typeof lastName !== 'string') {
      throw new Error('All form fields are required and must be strings');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const organization = await prisma.organization.create({
      data: {
        name: name,
        phone: phone,
      },
    });
    const user = await prisma.user.create({
      data: {
        email: email,
        password: hashedPassword,
        role_id: 1,
        first_name: firstName,
        last_name: lastName,
      },
    });
    return { message: `success` };
  } catch (e) {
    console.error(e);
    return { message: "Failed to create todo" };
  }
}

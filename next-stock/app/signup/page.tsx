"use client"
import { signup } from '@/app/lib/actions';
import { PrismaClient } from '@prisma/client';
import { useFormState, useFormStatus } from "react-dom";

const prisma = new PrismaClient();
const initialState = {
  message: "",
};

export default async function Page() {
  const [state, formAction] = useFormState(signup, initialState);
	return (
		<>
			<h1>Create an account</h1>
			<form action={formAction} className="text-black">
        <label  htmlFor="organization" className="text-white">Organization</label>
        <input type="string" name="name" id="name"placeholder="organization" />
        <input type="number" name="phone" id="phone"placeholder="phone" />
        <br />
				<label  htmlFor="username" className="text-white">Username</label>
				<input type="string" name="first_name" id="first_name"placeholder="first name" />
        <input type="string" name="last_name" id="last_name"placeholder="last name" />
				<br />
        <label  htmlFor="email" className="text-white">Email</label>
        <input type="email" name="email" id="email"placeholder="email" />
        <br />
				<label  htmlFor="password" className="text-white">Password</label>
				<input type="password" name="password" id="password"placeholder="password" />
				<br />
				<button>Continue</button>
			</form>
		</>
	);
}

interface ActionResult {
	error: string;
}
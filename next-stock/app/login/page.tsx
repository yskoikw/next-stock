"use client"
import { authenticate } from '@/app/lib/actions';
import { BlueButton } from "@/app/ui/common/buttons";
import Footer from "@/app/ui/common/footer";
import Link from 'next/link';
import Header from "@/app/ui/common/header";
import { useFormState } from "react-dom";
 
export default function Page() {
  const [errorMessage, formAction] = useFormState(authenticate, undefined)
 
  return (
	<main>
			<Header />
			<div className="flex flex-col items-center px-24 py-8">
				<h2 className="text-[42px] font-bold my-4">Login</h2>
				<form action={formAction}>
					<div className="p-8 px-16 rounded-md border border-solid border-paleGlay">
						<ul>
							<li className="mb-3">
								<p>Email</p>
								<input type="email" name="email" id="email" placeholder="example@example.com" className="px-4 py-2 w-80 bg-transparent rounded-md border border-solid border-paleGlay" />
							</li>
							<li className="mb-3">
								<p >Password</p>
								<input type="password" name="password" id="password" placeholder="password" className="px-4 py-2 w-80 bg-transparent rounded-md border border-solid border-paleGlay" />
							</li>
						</ul>
					</div>
					<p>
						You don’t have an account? 
						<Link href="/signup" className='underline'>Sign up</Link>
					</p>
					<div className="m-5">
						<button className="contents">
							<BlueButton text="Login"/>
						</button>
					</div>
					<div className='text-red'>{errorMessage && <p>{errorMessage}</p>}</div>
				</form>
			</div>
			<Footer />
		</main>    
  )
}
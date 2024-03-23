"use client"
import { BlueButton } from "@/app/ui/common/buttons";
import Footer from "@/app/ui/common/footer";
import Header from "@/app/ui/common/header";
import { signup } from '@/app/lib/actions';
import { useFormState } from "react-dom";

const initialState = {
	message: ""
};

export default function Page() {
	const [state, formAction] = useFormState(signup, initialState);
	return (
		<main>
			<Header />
			<div className="flex flex-col items-center px-24 py-8">
				<h2 className="text-[42px] font-bold my-4">Try NextStock for FREE</h2>
				<form action={formAction}>
					<div className="p-8 px-16 rounded-md border border-solid border-paleGlay">
						<ul>
							<li className="mb-3">
								<p>Organization/Store name </p>
								<input type="string" name="name" id="name" placeholder="Organization/Store name" className="px-4 py-2 w-80 bg-transparent rounded-md border border-solid border-paleGlay" />
							</li>
							<li className="mb-3">
								<p>Organization/Store phone number</p>
								<input type="number" name="phone" id="phone" placeholder="1234567890" className="px-4 py-2 w-80 bg-transparent rounded-md border border-solid border-paleGlay" />
							</li>
							<li className="mb-3">
								<p>First name</p>
								<input type="string" name="first_name" id="first_name" placeholder="First name" className="px-4 py-2 w-80 bg-transparent rounded-md border border-solid border-paleGlay" />
							</li>
							<li className="mb-3">
								<p>Last name</p>
								<input type="string" name="last_name" id="last_name" placeholder="last name" className="px-4 py-2 w-80 bg-transparent rounded-md border border-solid border-paleGlay" />
							</li>
							<li className="mb-3">
								<p>Your email</p>
								<input type="email" name="email" id="email" placeholder="example@example.com" className="px-4 py-2 w-80 bg-transparent rounded-md border border-solid border-paleGlay" />
							</li>
							<li className="mb-3">
								<p >Password</p>
								<input type="password" name="password" id="password" placeholder="password" className="px-4 py-2 w-80 bg-transparent rounded-md border border-solid border-paleGlay" />
							</li>
						</ul>
					</div>
					<div className="m-5">
						<button className="contents">
							<BlueButton text="Get started"/>
						</button>
					</div>
				</form>
			</div>
			<Footer />
		</main>
	);
}
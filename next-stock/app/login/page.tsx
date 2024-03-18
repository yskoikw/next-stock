"use client"
import { authenticate } from '@/app/lib/actions';
import { useFormState, useFormStatus } from "react-dom";
 
export default function Page() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined)
 
  return (
    <form action={dispatch}>
	 	<label htmlFor="email">Emaill</label>
		<input name="email" id="email" />
		<br />
		<label htmlFor="password">Password</label>
		<input type="password" name="password" id="password" />
		<br />
      	<div className='text-red'>{errorMessage && <p>{errorMessage}</p>}</div>
		<button>Continue</button>
    </form>
  )
}
'use client';
import { FormEvent, useState } from 'react';
import { useFormState, useFormStatus } from "react-dom";
import { createOrgAndUser } from "@/app/lib/actions";

const initialState = {
    message: "",
};

function SubmitButton() {
    const { pending } = useFormStatus();
  
    return (
      <button type="submit" aria-disabled={pending}>
        Add
      </button>
    );
  }

export default function Page() {
    const [state, formAction] = useFormState(createOrgAndUser, initialState);
    return (
        <main>
             <form action={formAction} className='text-black'>
                <input id="name" type="string" name="name" placeholder='organazation name'/>
                <input id="phone" type="number" name="phone" placeholder='phone'/>
                <input id="email" type="email" name="email" placeholder="email" />
                <input id="password" type="password" name="password" placeholder="password" />
                <input id="firstName" type="firstName" name="firstName" placeholder="firstName" />
                <input id="lastName" type="lastName" name="lastName" placeholder="lastName" />
                <SubmitButton />
            </form>
        </main>
    );
}
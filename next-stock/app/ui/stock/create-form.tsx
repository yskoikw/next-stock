'use client'
import { useFormState } from "react-dom";
import { createStock } from '@/app/lib/stock/actions';

export default function Form() {    
    const [errorMessage, formAction] = useFormState(createStock, undefined)
    return (
        <form action={formAction} className="text-black">
            <label className="text-white">Stock</label>
            <br />
            <input type="string" name="name" id="name" placeholder="name" />
            <input type="number" name="price" id="price" placeholder="price(CAD)" />
            <input type="number" name="quantity" id="quantity" placeholder="initial quantity" />
            <input type="number" name="asset" id="asset" placeholder="initial asset" />
            <button>Create</button>
            {errorMessage && (
                <>
                <p className="text-sm text-red-500">{errorMessage}</p>
                </>
            )}
      </form>
    );
}
'use client'
import { createProductAndStock } from '@/app/lib/stock/actions';
import { PrismaClient } from '@prisma/client';
import { useFormState } from "react-dom";

export default function Page() {
  const [errorMessage, formAction] = useFormState(createProductAndStock, undefined)
  return (
    <>
      <h1>Create New Stock</h1>
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
    </>
  );
}
'use client'
import { useFormState } from "react-dom";
import { createPurchase } from "@/app/lib/stock/actions";

interface PurchaseFormProps {
    stockId: string;
  }

export default function purchaseForm(prop: PurchaseFormProps) {    
    const [errorMessage, formAction] = useFormState(createPurchase, undefined)
    return (
        <form action={formAction}>
                <label>Input purchase amount and purchase cost</label>
                <br />
                <input type="number" name="quantity" placeholder="Quantity" />
                <input type="number" name="cost" placeholder="Purchase cost (CAD)" />
                <input type="text" name="stockId" defaultValue={prop.stockId} hidden/>
                <button>Registor</button>
                {errorMessage && (
                    <>
                    <p className="text-sm text-red-500">{errorMessage}</p>
                    </>
                )}
        </form>
    );
}
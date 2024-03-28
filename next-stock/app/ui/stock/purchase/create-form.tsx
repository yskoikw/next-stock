'use client'
import { BlueButton } from '@/app/ui/common/buttons';
import { CONSTANTS } from '@/app/constants';
import { createPurchase } from "@/app/lib/stock/actions";
import { useFormState } from "react-dom";

export default function PurchaseForm(prop: {stockId: string}) {    
    const [errorMessage, formAction] = useFormState(createPurchase, undefined)
    return (
        <form action={formAction}>
            <div className="p-8 rounded-md border border-solid border-paleGlay">
                <p className='border-b border-paleGlay mb-5'>Input purchase amount and purchase cost.</p>
                <ul>
                    <li className="mb-3">
                        <p>Quantity</p>
                        <input type="number" name="quantity" placeholder="Quantity" min={0} className="px-4 py-2 w-80 bg-transparent rounded-md border border-solid border-paleGlay" />
                    </li>
                    <li className="mb-3">
                        <p>Purchase cost ({CONSTANTS.CAD_SIGN})</p>
                        <input type="number" name="cost" placeholder="Purchase cost" min={0} className="px-4 py-2 w-80 bg-transparent rounded-md border border-solid border-paleGlay" />
                    </li>
                </ul>
            </div>
            <input type="text" name="stockId" defaultValue={prop.stockId} hidden/>
            <div className="m-5">
                <button className="contents">
                    <BlueButton text="Registor" />
                </button>
            </div>
            <div className='text-red'>{errorMessage && <p>{errorMessage}</p>}</div>
        </form>
    );
}
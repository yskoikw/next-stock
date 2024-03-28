'use client'
import { BlueButton } from '@/app/ui/common/buttons';
import { CONSTANTS } from '@/app/constants';
import { createStock } from '@/app/lib/stock/actions';
import { useFormState } from "react-dom";

export default function Form() {
    const [errorMessage, formAction] = useFormState(createStock, undefined)
    return (
        <form action={formAction}>
            <div className="p-8 rounded-md border border-solid border-paleGlay">
                <ul>
                    <li className="mb-3">
                        <p>Name</p>
                        <input type="string" name="name" id="name" placeholder="name" className="px-4 py-2 w-80 bg-transparent rounded-md border border-solid border-paleGlay" />
                    </li>
                    <li className="mb-3">
                        <p>Price ({CONSTANTS.CAD_SIGN})</p>
                        <input type="number" name="price" id="price" placeholder="price" min={0} className="px-4 py-2 w-80 bg-transparent rounded-md border border-solid border-paleGlay" />
                    </li>
                    <li>
                        <p>Initial quantity</p>
                        <input type="number" name="quantity" id="quantity" placeholder="Initial quantity" min={0} className="px-4 py-2 w-80 bg-transparent rounded-md border border-solid border-paleGlay" />
                    </li>
                    <li>
                        <p>Initial asset ({CONSTANTS.CAD_SIGN})</p>
                        <input type="number" name="asset" id="asset" placeholder="Initial asset" min={0} className="px-4 py-2 w-80 bg-transparent rounded-md border border-solid border-paleGlay" />
                    </li>
                </ul>
            </div>
            <div className="m-5">
                <button className="contents">
                    <BlueButton text="Create" />
                </button>
            </div>
            <div className='text-red'>{errorMessage && <p>{errorMessage}</p>}</div>
        </form>
    );
}
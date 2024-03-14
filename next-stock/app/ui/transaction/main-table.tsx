'use client'
import { CONSTANTS } from '@/app/constants';
import type { Stock, PaymentMethod } from '@prisma/client';
import { createSale } from "@/app/lib/sale/actions";
import { useFormState } from "react-dom";
import { useState } from 'react';

type SelectedStockFormat = {
    id: string;
    name: string;
    price: number;
};


export default function TransactionTable({ stocks, paymentMethods }: { stocks: Stock[], paymentMethods: PaymentMethod[] }) {
    const [selectedStocks, setSelectedStocks] = useState<SelectedStockFormat[]>([]);
    const [errorMessage, formAction] = useFormState(createSale, undefined)
    const multiplier = CONSTANTS.CAD_MULTIPLIER;

    function handle(newStock: SelectedStockFormat) {
        return () => {
            const nextSelectedStocks = [...selectedStocks, newStock];
            setSelectedStocks(nextSelectedStocks);
        };
    }

    // if(selectedStocks.length === 0) return <p>No purchase history.</p>
    return (
        <div>
            <form action={formAction} className="text-black">
                {
                    selectedStocks.length === 0
                        ? <p>empty</p>
                        : ( <div>
                            <ul className='p-3'>
                            {
                                selectedStocks.map((stock) => (
                                    <li key={stock.id} className='p-2'>
                                        <ul className='flex'>
                                            <li className='p-1'>{stock.name}</li>
                                            <li className='p-1'>${stock.price}</li>
                                            <input type="number" name={`items[${stock.id}][quantity]`} placeholder='input quantity' />
                                            <input type="number" name={`items[${stock.id}][price]`} defaultValue={stock.price} hidden />
                                        </ul>
                                    </li>
                                ))
                            }
                            </ul>
                            <input type="number" name="tipRate" placeholder="Tip(%)" />
                            <input type="number" name="discountRate" placeholder="discount(%)" />
                            <select name="paymentMethodId">
                                {
                                    paymentMethods.map((paymentMethod) => (
                                        <option value={paymentMethod.id} key={paymentMethod.id}>
                                            {paymentMethod.name}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>
                        )
                }
                {
                    errorMessage && (
                        <>
                            <p className="text-sm text-red-500">{errorMessage}</p>
                        </>
                    )
                }
                <button>Create</button>
            </form>
            <ul>
                {
                    stocks.map((stock) => (
                        <li key={stock.id} className='cursor-pointer flex' onClick={handle({ id: stock.id, name: stock.name, price: stock.price / multiplier })}>
                            <p>{stock.name}</p>
                            <p>{CONSTANTS.CAD_SIGN}{stock.price > 0 ? stock.price / multiplier : 0}</p>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}
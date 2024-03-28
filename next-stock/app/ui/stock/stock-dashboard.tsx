
'use client'
import Card from '@/app/ui/common/card';
import { CONSTANTS } from '@/app/constants';
import { getStockById } from "@/app/lib/stock/actions";
import React, { useEffect, useState } from 'react';
import type { Stock } from '@prisma/client';

export default function StockDashboard(prop: { stockId: string }) {
    const [stock, setStock] = useState<Stock | null>(null);

    useEffect(() => {
        async function fetchPurchases() {
            const fetchedStock = await getStockById(prop.stockId);
            if (!fetchedStock) return null;
            setStock(fetchedStock);
        }
        fetchPurchases();
    }, [prop.stockId]);

    const multiplier = CONSTANTS.CAD_MULTIPLIER;
    if (stock === null) return <p>No Data.</p>
    return (
        <div>
            <h2 className='text-[25px] font-bold'>{stock.name}</h2>
            <ul className='flex items-start my-3'>
                <li className='mr-3'>
                    <Card title='Quantity' value={String(stock.quantity)}/>
                </li>
                <li className='mr-3'>
                    <Card title='Asset' value={CONSTANTS.CAD_SIGN + String(stock.asset > 0 ? stock.asset / multiplier : 0)}/>
                </li>
                <li className='mr-3'>
                    <Card title='Cost' value={CONSTANTS.CAD_SIGN + String( stock.asset > 0 && stock.quantity > 0 ? ( Math.round(stock.asset / stock.quantity) / multiplier ) : 0 )}/>
                </li>
                <li className='mr-3'>
                    <Card title='Price' value={CONSTANTS.CAD_SIGN + String(stock.price > 0 ? stock.price / multiplier : 0)}/>
                </li>
            </ul>
        </div>
    );
}
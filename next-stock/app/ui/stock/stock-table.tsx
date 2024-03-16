
'use client'
import { CONSTANTS } from '@/app/constants';
import { getStockById } from "@/app/lib/stock/actions";
import React, { useEffect, useState } from 'react';
import type { Stock } from '@prisma/client';

export default function StockTable(prop: { stockId: string }) {
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
        <table className='m-3'>
            <thead>
                <tr>
                    <th>name</th>
                    <th>quantity</th>
                    <th>price</th>
                    <th>asset</th>
                </tr>
            </thead>
            <tbody>
                {
                    <tr>
                        <td>{stock.name}</td>
                        <td>{stock.quantity}</td>
                        <td>{stock.price > 0 ? stock.price / multiplier : 0}</td>
                        <td>{stock.asset > 0 ? stock.asset / multiplier : 0}</td>
                    </tr>
                }
            </tbody>
        </table>
    );
}
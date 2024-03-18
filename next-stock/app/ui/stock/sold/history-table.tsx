'use client'
import { CONSTANTS } from '@/app/constants';
import { getSaleItemsById } from '@/app/lib/stock/actions';
import React, { useEffect, useState } from 'react';
import type { SaleItem } from '@prisma/client';

export default function SoldHistorytable(prop: {stockId: string}) {
    const [saleItems, setSaleItems] = useState<SaleItem[]>([]);
    const multiplier = CONSTANTS.CAD_MULTIPLIER;

    useEffect(() => {
        async function fetchPurchases() {
        const saleItems = await getSaleItemsById(prop.stockId);
        if(!saleItems) return null;
        setSaleItems(saleItems);
        }

        fetchPurchases();
    }, [prop.stockId]);
    if(saleItems.length === 0) return <p>No sold history.</p>
    return (
        <div className='m-3'>
            <h2>Sold History</h2>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Quantity</th>
                        <th>Cost</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        saleItems.map((saleItem) => (
                            <tr key={saleItem.id}>
                                <td>{changeDateFormat(saleItem.createdAt)}</td>
                                <td>{saleItem.quantity}</td>
                                <td>{CONSTANTS.CAD_SIGN}{saleItem.cost > 0 ? saleItem.cost / multiplier : 0}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}

export function changeDateFormat(date: Date | string) {
    return new Intl.DateTimeFormat('en-CA', {
      timeZone: 'America/Los_Angeles',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }).format(new Date(date)).replace(',', '');
  }
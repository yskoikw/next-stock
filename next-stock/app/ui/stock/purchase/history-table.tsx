
'use client'
import { CONSTANTS } from '@/app/constants';
import { getPurchases } from "@/app/lib/stock/actions";
import React, { useEffect, useState } from 'react';

type FechedPurchase = {
    id: string;
    stockId: string;
    userId: string;
    quantity: number;
    cost: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    user: {
      firstName: string;
      lastName: string;
    };
  };

export default function PurchaseHistorytable(prop: {stockId: string}) {
    "use client"
    const [purchases, setPurchases] = useState<FechedPurchase[]>([]);
    const multiplier = CONSTANTS.CAD_MULTIPLIER;

    useEffect(() => {
      async function fetchPurchases() {
        const fetchedPurchases = await getPurchases(prop.stockId);
        if(!fetchedPurchases) return null;
        setPurchases(fetchedPurchases);
      }
  
      fetchPurchases();
    }, [prop.stockId]);
    if(purchases.length === 0) return <p>No purchase history.</p>
    return (
        <table>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Quantity</th>
                    <th>Cost</th>
                    <th>User</th>
                </tr>
            </thead>
            <tbody>
                {
                    purchases ? 
                    purchases.map((purchase) => (
                        <tr key={purchase.id}>
                            <td>{changeDateFormat(purchase.createdAt)}</td>
                            <td>{purchase.quantity}</td>
                            <td>{purchase.cost > 0 ? purchase.cost / multiplier : 0}</td>
                            <td>{purchase.user.firstName} {purchase.user.lastName}</td>
                        </tr>
                    ))
                    : <p>Loading...</p>
                }
            </tbody>
        </table>
    );
}

function changeDateFormat(date: Date | string) {
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
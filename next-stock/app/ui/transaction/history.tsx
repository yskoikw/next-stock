
'use client'
import { CONSTANTS } from '@/app/constants';
import { FechedSaleTransactions } from '@/app/lib/definitions';
import { getSaleTransactions } from "@/app/lib/sale/actions";
import React, { useEffect, useState } from 'react';

export default function History() {
    "use client"
    const [saleTransactions, setSaleTransactions] = useState<FechedSaleTransactions[]>([]);
    const multiplier = CONSTANTS.CAD_MULTIPLIER;
    const currencySign = CONSTANTS.CAD_SIGN;

    useEffect(() => {
      async function fetchPurchases() {
        const fetchedSaleTransactions = await getSaleTransactions();
        if(!fetchedSaleTransactions) return null;
        setSaleTransactions(fetchedSaleTransactions);
      }
      fetchPurchases();
    }, []);
    if(saleTransactions.length === 0) return <p>No sale history.</p>
    return (
        <div>
            {
                    saleTransactions ? 
                    saleTransactions.map((saleTransaction) => (
                        <div key={saleTransaction.id} className='m-3 bg-gray-200'>
                            <ul className='flex'>
                                <li className='p-2'>DATE: {changeDateFormat(saleTransaction.createdAt)}</li>
                                <li className='p-2'>SUBTOTAL: {currencySign}{saleTransaction.subTotalAmount > 0 ? saleTransaction.subTotalAmount / multiplier : 0}</li>
                                <li className='p-2'>USER: {saleTransaction.user.firstName} {saleTransaction.user.lastName}</li>
                                <li className='p-2'>DISCOUNT: {currencySign}{saleTransaction.discountAmount > 0 ? saleTransaction.discountAmount / multiplier : 0}</li>
                                <li className='p-2'>TAX: {currencySign}{saleTransaction.taxAmount > 0 ? saleTransaction.taxAmount / multiplier : 0}</li>
                                <li className='p-2'>TIP: {currencySign}{saleTransaction.tipAmount > 0 ? saleTransaction.tipAmount / multiplier : 0}</li>
                                <li className='p-2'>TOTAL: {currencySign}{saleTransaction.totalAmount > 0 ? saleTransaction.totalAmount / multiplier : 0}</li>
                            </ul>
                            <ul>
                                {
                                    saleTransaction.saleItem.map((item) => (
                                        <li key={item.id}>
                                            <ul className='flex'>
                                                <li className='p-2'>{item.stock.name}</li>
                                                <li className='p-2'>quantity: {item.quantity}</li>
                                                <li className='p-2'>price: {item.price > 0 ? item.price / multiplier : 0}</li>
                                            </ul>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    ))
                    : <p>Loading...</p>
            }
        </div>
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
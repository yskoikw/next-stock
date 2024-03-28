'use client'
import PurchaseHistorytable from "@/app/ui/stock/purchase/history-table"
import SaleHistorytable from '@/app/ui/stock/sale/history-table';
import { useState } from 'react';

export default function StockTable(prop: {stockId: string}) {
    const stockId = prop.stockId;
    const [activeTable, setActiveTable] = useState<String>('purchase-table');
    return (
        <div id='table' className='my-5 p-5 border border-paleGlay rounded-md'>
            <ul className='flex'>
                <li 
                    className={`mr-3 cursor-pointer ${activeTable === 'purchase-table' ? 'text-blue border-b border-blue' : ''}`}
                    onClick={() => setActiveTable('purchase-table')}
                >
                    Purchase history
                </li>
                <li
                    className={`mr-3 cursor-pointer ${activeTable === 'sale-table' ? 'text-blue border-b border-blue' : ''}`}
                    onClick={() => setActiveTable('sale-table')}
                >
                    Sale history
                </li>
            </ul>
            <div id='purchase-table' className={activeTable === 'purchase-table' ? '' : 'hidden'}>
                <PurchaseHistorytable stockId={stockId} />
            </div>
            <div id='sale-table' className={activeTable === 'sale-table' ? '' : 'hidden'}>
                <SaleHistorytable stockId={stockId} />
            </div>
        </div>
    );
}
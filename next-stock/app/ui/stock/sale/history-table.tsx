'use client'
import { ColumnDef } from "@tanstack/react-table";
import { CONSTANTS } from '@/app/constants';
import { getSaleItemsById } from '@/app/lib/stock/actions';
import React, { useEffect, useMemo, useState } from 'react';
import type { SaleItem } from '@prisma/client';
import Table from '@/app/ui/common/table';

type dataType = {
    date: string;
    quantity: number;
    cost: number;
    user: string;
}

export default function SaleHistorytable(prop: {stockId: string}) {
    const [saleItems, setSaleItems] = useState<SaleItem[]>([]);

    useEffect(() => {
        async function fetchPurchases() {
        const saleItems = await getSaleItemsById(prop.stockId);
        if(!saleItems) return null;
        setSaleItems(saleItems);
        }

        fetchPurchases();
    }, [prop.stockId]);

    const data = useMemo(() => saleItems.map((saleItem: SaleItem) => ({
        date: changeDateFormat(saleItem.createdAt),
        quantity: saleItem.quantity,
        cost: saleItem.cost,
    })), [saleItems]);

    const columns: ColumnDef<dataType>[] = [
        {
            accessorKey: 'date',
            header: 'Date',
        },
        {
            accessorKey: 'quantity',
            header: 'Quantity',
        },
        {
            accessorKey: 'cost',
            header: `Cost (${CONSTANTS.CAD_SIGN})`,
        },
    ];

    return <Table data={data} columns={columns} noBorder={true} />;
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
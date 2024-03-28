
'use client'
import { ColumnDef } from "@tanstack/react-table";
import { CONSTANTS } from '@/app/constants';
import { getPurchases } from "@/app/lib/stock/actions";
import React, { useEffect, useMemo, useState } from 'react';
import Table from '@/app/ui/common/table';

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

type dataType = {
    date: string;
    quantity: number;
    cost: number;
    user: string;
}

export default function PurchaseHistorytable(prop: { stockId: string }) {
    const [purchases, setPurchases] = useState<FechedPurchase[]>([]);

    useEffect(() => {
        async function fetchPurchases() {
            const fetchedPurchases = await getPurchases(prop.stockId);
            if (!fetchedPurchases) return null;
            setPurchases(fetchedPurchases);
        }

        fetchPurchases();
    }, [prop.stockId]);

    const data = useMemo(() => purchases.map((purchase: FechedPurchase) => ({
        date: changeDateFormat(purchase.createdAt),
        quantity: purchase.quantity,
        cost: purchase.cost,
        user: purchase.user.firstName + ' ' + purchase.user.lastName,
    })), [purchases]);

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
        {
            accessorKey: 'user',
            header: 'User',
        },
    ];

    return <Table data={data} columns={columns} noBorder={true} />;
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
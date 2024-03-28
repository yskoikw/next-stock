'use client'
import { ColumnDef } from "@tanstack/react-table";
import { CONSTANTS } from '@/app/constants';
import { getStocks } from "@/app/lib/stock/actions";
import React, { useEffect, useMemo, useState } from 'react';
import type { Stock } from '@prisma/client';
import { WhiteButtonSmall } from '@/app/ui/common/buttons';
import Table from '@/app/ui/common/table';

type dataType = {
  id: string;
  name: string;
  quantity: number;
  asset: number;
  cost: number;
  price: number;
}

export default function Stocks() {  
  const [stocks, setStocks] = useState<Stock[]>([]);
    useEffect(() => {
      async function fetchStocks() {
        const fetchedStocks = await getStocks();
        if(!fetchedStocks) return null;
        setStocks(fetchedStocks);
      }
      fetchStocks();
    }, []); 
    const multiplier = CONSTANTS.CAD_MULTIPLIER;
    const data = useMemo(() => stocks.map((stock: Stock) => ({
      id: stock.id,
      name: stock.name,
      quantity: stock.quantity,
      asset: stock.asset / multiplier,
      cost: Math.round(stock.asset / stock.quantity) / multiplier,
      price: stock.price / multiplier,
    })), [stocks, multiplier]);

    const columns: ColumnDef<dataType>[]  = [
      {
        accessorKey: 'name',
        header: 'Name',
      },
      {
        accessorKey: 'quantity',
        header: 'Quantity',
      },
      {
        accessorKey: 'asset',
        header: 'Asset',
      },
      {
        accessorKey: 'cost',
        header: 'Cost',
      },
      {
        accessorKey: 'price',
        header: 'Price',
      },
      {
        id: "actions",
        cell: ({ row }) => {
          const stock = row.original;
          return (
              <div style={{ cursor: "pointer" }}>
                <a href={`/manager/stock/${stock.id}/purchase`}>
                  <WhiteButtonSmall text='Purchase' />
                </a>
              </div>
          );
        },
      },
      {
        id: "actions",
        cell: ({ row }) => {
          const stock = row.original;
          return (
              <div style={{ cursor: "pointer" }}>
                <a href={`/manager/stock/${stock.id}`}>
                  <WhiteButtonSmall text='Detail' />
                </a>
              </div>
          );
        },
      },
    ];
    
    return <Table data={data} columns={columns}/>
}
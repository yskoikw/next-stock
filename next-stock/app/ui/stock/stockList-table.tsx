import { CONSTANTS } from '@/app/constants';
import { getStocks } from "@/app/lib/stock/actions";
import type { Stock } from '@prisma/client';
import Link from 'next/link';

export default async function Stocks() {
    const stocks = await getStocks();
    const multiplier = CONSTANTS.CAD_MULTIPLIER;
    if(!stocks) return null;
    return (
      <table className='m-5'>
        <thead>
          <tr>
            <th>name</th>
            <th>quantity</th>
            <th>price</th>
            <th>asset($)</th>
          </tr>
        </thead>
        <tbody>
        {
        stocks.length === 0 ? 
        (
          <tr>
            <td>no stock data</td>
          </tr>
        ) :
        (

        
        stocks.map((stock: Stock) => (
          <tr key={stock.id}>
            <td>{stock.name}</td>
            <td>{stock.quantity}</td>
            <td>{stock.price / multiplier}</td>
            <td>{stock.asset / multiplier}</td>
            <td>
            <Link
              href={`/manager/stock/${stock.id}`}
              className="rounded-md border p-2 hover:bg-gray-100"
            >
              Detail
            </Link>
            <Link
              href={`/manager/stock/${stock.id}/purchase`}
              className="rounded-md border p-2 hover:bg-gray-100"
            >
              Purchase {/* ENG: Delivery, Purchase, Edit? */}
            </Link>
            </td>
          </tr>
        ))
        )}
        </tbody>
      </table>
    )
  }
import { CONSTANTS } from '@/app/constants';
import { getStocks } from "@/app/lib/stock/actions";
import type { Stock } from '@prisma/client';
import Link from 'next/link';

export default async function Stocks() {
    const stocks = await getStocks();
    const multiplier = CONSTANTS.CAD_MULTIPLIER;
    if(!stocks) return null;
    return (
      <table>
        <thead>
          <tr>
            <th>name</th>
            <th>quantity</th>
            <th>price</th>
            <th>asset($)</th>
          </tr>
        </thead>
        <tbody>
        {stocks.map((stock: Stock) => (
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
        ))}
        </tbody>
      </table>
    )
  }


// export  function StockTable(prop: { stockId: string }) {
//     const [stock, setStock] = useState<Stock | null>(null);

//     useEffect(() => {
//         async function fetchPurchases() {
//             const fetchedStock = await getStockById(prop.stockId);
//             if (!fetchedStock) return null;
//             setStock(fetchedStock);
//         }
//         fetchPurchases();
//     }, [prop.stockId]);

//     const multiplier = CONSTANTS.CAD_MULTIPLIER;
//     if (stock === null) return <p>No Data.</p>
//     return (
//         <table className='m-3'>
//             <thead>
//                 <tr>
//                     <th>name</th>
//                     <th>quantity</th>
//                     <th>price</th>
//                     <th>asset</th>
//                 </tr>
//             </thead>
//             <tbody>
//                 {
//                     <tr>
//                         <td>{stock.name}</td>
//                         <td>{stock.quantity}</td>
//                         <td>{stock.price > 0 ? stock.price / multiplier : 0}</td>
//                         <td>{stock.asset > 0 ? stock.asset / multiplier : 0}</td>
//                     </tr>
//                 }
//             </tbody>
//         </table>
//     );
// }
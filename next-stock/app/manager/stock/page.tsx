import SideNav from "@/app/ui/sidenav";
import Stocks from "@/app/ui/stock/stockList-table";

export default function Page() {
	return (
    <div>
      <SideNav />
      <h1>Create Stock</h1>
      <ul>
        <li><a href="same">same</a></li>
        <li><a href="saparate">saparate</a></li>
      </ul>
      <div>
        <Stocks />
      </div>
    </div>
  );
}

// export async function Stocks() {
//   const stocks = await getStocks();
//   const multiplier = CONSTANTS.CAD_MULTIPLIER;
//   if(!stocks) return null;
//   return (
//     <table>
//       <thead>
//         <tr>
//           <th>name</th>
//           <th>quantity</th>
//           <th>price</th>
//           <th>asset($)</th>
//         </tr>
//       </thead>
//       <tbody>
//       {stocks.map((stock: Stock) => (
//         <tr key={stock.id}>
//           <td>{stock.name}</td>
//           <td>{stock.quantity}</td>
//           <td>{stock.price / multiplier}</td>
//           <td>{stock.asset / multiplier}</td>
//           <td>
//           <Link
//             href={`/manager/stock/${stock.id}`}
//             className="rounded-md border p-2 hover:bg-gray-100"
//           >
//             Detail
//           </Link>
//           <Link
//             href={`/manager/stock/${stock.id}/purchase`}
//             className="rounded-md border p-2 hover:bg-gray-100"
//           >
//             Purchase {/* ENG: Delivery, Purchase, Edit? */}
//           </Link>
//           </td>
//         </tr>
//       ))}
//       </tbody>
//     </table>
//   )
// }
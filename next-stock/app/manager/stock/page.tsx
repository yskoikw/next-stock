import SideNav from "@/app/ui/sidenav";
import { getOrganizationId } from "@/app/lib/actions";
import { getStocks } from "@/app/lib/stock/actions";
import type { Stock } from '@prisma/client';
import { table } from "console";

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

export async function Stocks() {
  const stocks = await getStocks();
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
        <tr>
          <td>{stock.name}</td>
          <td>{stock.quantity}</td>
          <td>{stock.price}</td>
          <td>{stock.asset}</td>
        </tr>
      ))}
      </tbody>
    </table>
  )
}
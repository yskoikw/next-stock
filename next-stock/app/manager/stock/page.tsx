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
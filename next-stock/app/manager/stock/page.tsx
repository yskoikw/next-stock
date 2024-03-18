import Link from 'next/link';
import SideNav from "@/app/ui/sidenav";
import Stocks from "@/app/ui/stock/stockList-table";

export default function Page() {
	return (
    <div>
      <SideNav />
      <h1>Stocks</h1>
      <Stocks />
      <Link href={`/manager/stock/create`}
            className="h-[48px] rounded-md bg-gray-200 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600"
          >
            Create new stock
      </Link>
    </div>
  );
}
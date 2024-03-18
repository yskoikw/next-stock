import SideNav from "@/app/ui/sidenav";
import { getStocks } from "@/app/lib/stock/actions";
import { getPaymentMethods } from "@/app/lib/sale/actions";
import Link from 'next/link';
import TransactionTable from "@/app/ui/transaction/main-table";

export default async function Page() {
    const stocks = await getStocks();
    const paymentMethods = await getPaymentMethods();
    return (
        <div>
            <SideNav />
            <h1>Transaction</h1>
            <div className="m-5">
                {
                    !stocks || !paymentMethods
                        ? <p>no products</p>
                        : <TransactionTable stocks={stocks} paymentMethods={paymentMethods} />
                }
            </div>
            <Link href={`/manager/sale/history`}
                className="h-[48px] rounded-md bg-gray-200 p-3 m-5 text-sm font-medium hover:bg-sky-100 hover:text-blue-600"
            >
                Sale history
            </Link>
        </div>
    );
}
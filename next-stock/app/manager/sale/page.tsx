import SideNav from "@/app/ui/sidenav";
import { getStocks } from "@/app/lib/stock/actions";
import { getPaymentMethods } from "@/app/lib/sale/actions";
import TransactionTable from "@/app/ui/transaction/main-table";

export default async function Page() {
    const stocks = await getStocks();
    const paymentMethods = await getPaymentMethods();
    return (
        <div>
            <SideNav />
            <h1>Transaction</h1>
            {
                !stocks || !paymentMethods
                    ? <p>no products</p>
                    : <TransactionTable stocks={stocks} paymentMethods={paymentMethods} />
            }
        </div>
    );
}
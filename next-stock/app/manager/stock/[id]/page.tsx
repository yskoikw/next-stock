
import SideNav from "@/app/ui/sidenav";
import PurchaseHistorytable from "@/app/ui/stock/purchase/history-table"
import SoldHistorytable from '@/app/ui/stock/sold/history-table';
import StockTable from "@/app/ui/stock/stock-table";

export default function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    return (
        <div>
            <SideNav />
            <h1>Stock Details</h1>
            <StockTable stockId={id} />
            <PurchaseHistorytable stockId={id} />
            <SoldHistorytable stockId={id} />
        </div>
    );
}
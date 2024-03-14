import { CONSTANTS } from '@/app/constants';
import SideNav from "@/app/ui/sidenav";
import { getStockById } from "@/app/lib/stock/actions";
import PurchaseHistorytable from "@/app/ui/stock/purchase/history-table"

export default function Page({ params }: { params: { id: string } }) {
    const id = params.id;  
    
    return (
        <div>
            <SideNav />
            <h1>Purchase Stock</h1>
            <StockTable stockId={id} />
            <PurchaseHistorytable stockId={id} />
        </div>
    );
}

export async function StockTable(prop: {stockId:string}) {
    const stock = await getStockById(prop.stockId);
    const multiplier = CONSTANTS.CAD_MULTIPLIER;
    return (
        <table>
            <thead>
                <tr>
                    <th>name</th>
                    <th>quantity</th>
                    <th>price</th>
                    <th>asset</th>
                </tr>
            </thead>
            <tbody>
                {
                    !stock ?
                    (
                        <tr>
                            <td>no data</td>
                        </tr>
                    ) :
                    (
                        <tr>
                            <td>{stock.name}</td>
                            <td>{stock.quantity}</td>
                            <td>{stock.price > 0 ? stock.price / multiplier : 0}</td>
                            <td>{stock.asset > 0 ? stock.asset / multiplier : 0}</td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    );
}
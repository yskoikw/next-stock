import { CONSTANTS } from '@/app/constants';
import SideNav from "@/app/ui/sidenav";
import Form from "@/app/ui/stock/purchase/create-form";
import { getStockById } from "@/app/lib/stock/actions";

export default function Page({ params }: { params: { id: string } }) {
    const id = params.id;  
    
    return (
        <div>
            <SideNav />
            <h1>Purchase Stock</h1>
            <Table stockId={id} />
            <Form stockId={id}/>
        </div>
    );
}

export async function Table(prop: {stockId:string}) {
    const multiplier = CONSTANTS.CAD_MULTIPLIER;
    const currencySign = CONSTANTS.CAD_SIGN;
    const stock = await getStockById(prop.stockId);
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
                        ( <tr><td>no data</td></tr> ) :
                        (
                            <tr>
                                <td>{stock.name}</td>
                                <td>{stock.quantity}</td>
                                <td>{currencySign}{stock.price > 0 ? stock.price / multiplier : 0}</td>
                                <td>{currencySign}{stock.asset > 0 ? stock.asset / multiplier : 0}</td>
                            </tr>
                        )
                    }
            </tbody>
        </table>
    );
}
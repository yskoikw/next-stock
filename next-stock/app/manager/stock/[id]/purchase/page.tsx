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
                <tr>
                    <td>{stock?.name}</td>
                    <td>{stock?.quantity}</td>
                    <td>{stock?.price}</td>
                    <td>{stock?.asset}</td>
                </tr>
            </tbody>
        </table>
    );
}
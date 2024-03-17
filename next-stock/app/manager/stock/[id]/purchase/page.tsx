import SideNav from "@/app/ui/sidenav";
import Form from "@/app/ui/stock/purchase/create-form";
import StockTable from "@/app/ui/stock/stock-table";

export default function Page({ params }: { params: { id: string } }) {
    const id = params.id;  
    
    return (
        <div>
            <SideNav />
            <h1>Purchase Stock</h1>
            <StockTable stockId={id} />
            <Form stockId={id}/>
        </div>
    );
}
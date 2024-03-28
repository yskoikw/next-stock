import Form from "@/app/ui/stock/purchase/create-form";

export default function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    return (
        <div>
            <h2 className="text-[25px] font-bold my-4">Purchase</h2>
            <Form stockId={id}/>
        </div>
    );
}
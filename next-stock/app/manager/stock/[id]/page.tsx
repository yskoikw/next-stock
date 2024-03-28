import Link from 'next/link';
import { WhiteButton } from '@/app/ui/common/buttons';
import StockDashboard from "@/app/ui/stock/stock-dashboard";
import StockTable from '@/app/ui/stock/stock-table';

export default function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    return (
        <div>
            <StockDashboard stockId={id} />
            <Link href={`/manager/stock/${id}/purchase`} className='inline-block'>
                <WhiteButton text='Purchase' />
            </Link>
            <StockTable stockId={id} />
        </div>
    );
}
import Link from 'next/link';
import Stocks from "@/app/ui/stock/stockList-table";
import { WhiteButton } from '@/app/ui/common/buttons';

export default function Page() {
	return (
      <div>
        <h2 className='text-[25px] font-bold'>Stocks</h2>
        <Link href={`/manager/stock/create`} className='inline-block'>
          <WhiteButton text='Create new stock' />
        </Link>
        <Stocks />
      </div>
  );
}
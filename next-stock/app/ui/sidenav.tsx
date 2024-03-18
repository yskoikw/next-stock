import Link from 'next/link';
import { signOut } from '@/auth';
 
export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <div className="flex justify-left space-x-2">
        <Link href={`/manager`}
              className="flex item-center h-[48px] gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600"
            >
              Home
        </Link>
        <Link href={`/manager/stock`}
              className="flex item-center h-[48px] gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600"
            >
              Stock
        </Link>
        <Link href={`/manager/sale`}
              className="flex item-center h-[48px] gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600"
            >
              Sale
        </Link>
        <form
          action={async () => {
            'use server';
            await signOut();
          }}
        >
          <button className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-red-100 hover:text-red-600">
            Sign Out
          </button>
        </form>
      </div>
    </div>
  );
}
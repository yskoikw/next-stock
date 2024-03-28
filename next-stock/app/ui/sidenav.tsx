import Image from "next/image";
import Link from 'next/link';
import { signOut } from '@/auth';
 
export default function SideNav() {
  return (
    <div className="w-60 p-5 border-solid border border-r-paleGlay">
      <ul>
        <li>
          <MenuButton link="/manager" icon="home" text="Home" />
        </li>
        <li>
          <MenuButton link="/manager/stock" icon="home" text="Stock" />
        </li>
        <li>
          <MenuButton link="/manager/sale" icon="home" text="Sale" />
        </li>
        <li>
          <form
            action={async () => {
              'use server';
              await signOut();
            }}
          >
            <button className="flex items-center contents-start bg-white my-3 px-5 py-2 rounded-md shadow-xl hover:bg-paleRed hover:text-red">
              <Image
                className="mr-3"
                src={`/icon/logout.svg`}
                alt={`Icon logout`} 
                width={30}
                height={30}
                priority
              />
              Log out
            </button>
          </form>
        </li>
      </ul>
    </div>
  );
}

function MenuButton({
  link,
  icon,
  text
}: {
  link: string,
  icon: string,
  text: string
}) {
  return (
    <Link href={link} className='flex items-center contents-start bg-white my-3 px-5 py-2 rounded-md shadow-xl hover:bg-sky-100 hover:text-blue'>
          <Image
              className="mr-3"
              src={`/icon/${icon}.svg`}
              alt={`Icon ${icon}`} 
              width={30}
              height={30}
              priority
              />
          {text}
    </Link>
  );
}
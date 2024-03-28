import { BlueButtonLarge, WhiteButtonLarge } from "@/app/ui/common/buttons";
import { CONSTANTS } from "@/app/constants";
import Header from "@/app/ui/common/header";
import Feature from "@/app/ui/toppage/feature";
import Image from "next/image";
import Link from 'next/link';
import Footer from "@/app/ui/common/footer";

export default function Home() {
  return (
    <main className="">
      <Header />
      <div id="fv" className="flex items-stretch py-8 pl-24">
        <div className="flex flex-col items-start justify-between">
          <div className="pt-20 pb-5">
            <h2 className="text-[42px] font-bold">Best stock management system for retail stores</h2>
            <p className="text-2xl">NextStock helps stock management simply for every retail stores.</p>
          </div>  
          <div className="py-5 w-full">
            <p className="text-xl mb-1">30-days free trial with NO credit card.</p>
            <Link href={`/manager/signup`} className="block max-w-lg">
              <BlueButtonLarge text="Free trial" />
            </Link>
          </div>
        </div>
        <Image
          className="ml-11"
          src="/fv.png"
          alt="main image"
          width={900}
          height={900}
         />
      </div>

      <div id="message-1" className="text-white text-center px-24 py-16 bg-darkBlue">
        <h2 className="text-[42px] font-bold my-4">Don’t spend time for stock counting.</h2>
        <p className="text-2xl">Transform Your Retail Operations with Our All-in-One Inventory and POS Solution.</p>
      </div>

      <div className="px-24 py-16">
        <ul className="flex contents-between flex-wrap">
          <Feature 
            icon="production_quantity_limits" 
            dt="Inventory Management" 
            dd="You always know what's available, what's running low, and what needs replenishment."
          />
          <Feature
           icon="payments"
           dt="POS System"
           dd="Tailor every business enhanced cash register."
          />
          <Feature
           icon="price_check"
           dt="Cost Insight"
           dd="Gain insight into your cost structure with our moving average cost method."
          />
          <Feature
           icon="bubble"
           dt="Stock Auto-Adjust"
           dd="No need to manually update your stock count after every sale."
          />
          <Feature
           icon="shipping"
           dt="Procurement Tracking"
           dd="You can track purchases and automatically updates your inventory levels."
          />
          <Feature
           icon="monitoring"
           dt="Dashboard Insights"
           dd="Access vital business insights at a glance."
          />
        </ul>
      </div>

      <div id="portfolio" className="px-24 py-16 text-center relative  after:block after:w-48 after:h-48 after:absolute after:top-0 after:inset-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:dark:from-red-500 after:dark:via-[#1B6CE7] after:dark:opacity-50">
        <h2 className="text-[42px] font-bold my-4">This is a portfolio</h2>
        <p className="text-lg">
          This is created for my experience and portfolio. 
          <br />You can use it 30-days free.
          <br />I appreciate for any feed backs for <a href={CONSTANTS.GITHUB} target="_blank" className="text-blue underline">GitHub</a>.
          <br />If you want to continue NextStock after 30-days, let me know from blow email.
        </p>
        <a href={`mailto:${CONSTANTS.EMAIL}`} className="text-blue underline">{CONSTANTS.EMAIL}</a>
      </div>

      <div id="cta" className="text-white text-center px-24 py-16 bg-darkBlue flex items-center flex-col">
        <p className="text-2xl">Do not count your stocks manually</p>
        <Link href={`/manager/signup`} className="block w-96 my-12">
          <WhiteButtonLarge text="Free trial"  />
        </Link>
      </div>

      <Footer />
    </main>
  );
}
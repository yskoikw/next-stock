import From from '@/app/ui/stock/create-form';
import SideNav from "@/app/ui/sidenav";

export default function Page() {
  return (
    <>
      <SideNav />
      <h1>Create New Stock</h1>
      <From />
    </>
  );
}
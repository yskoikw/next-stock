import SideNav from "../ui/sidenav";
import { getSessionUser } from "@/app/lib/actions"

export default async function Page() {
  const user = await getSessionUser();
	return (
    <div>
      <h2 className='text-[42px] font-bold'>top page</h2>
      <p>Hi, {user?.firstName}!</p>
    </div>
  );
}

import SideNav from "../ui/sidenav";
import { getSessionUser } from "@/app/lib/actions"

export default async function Page() {
  const user = await getSessionUser();
	return (
    <div>
      <SideNav />
      <h1>Hi, {user?.firstName}!</h1>
    </div>
  );
}

import SideNav from "../ui/sidenav";
import { validateRequest } from "@/auth";
import { redirect } from "next/navigation";

export default async function Page() {
	const { user } = await validateRequest();
	if (!user) {
		return redirect("/login");
	}
  // console.log(user);

	return (
    <div>
      <SideNav />
      <h1>Hi, {user.firstName}!</h1>
    </div>
  );
}

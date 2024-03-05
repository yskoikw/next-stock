import SideNav from "@/app/ui/sidenav";
import { validateRequest } from "@/auth";
import { redirect } from "next/navigation";

export default async function Page() {
	const { user } = await validateRequest();
	if (!user) {
		return redirect("/login");
	}

	return (
    <div>
      <SideNav />
      <h1>Create Stock</h1>
      <ul>
        <li><a href="same">same</a></li>
        <li><a href="saparate">saparate</a></li>
      </ul>
    </div>
  );
}
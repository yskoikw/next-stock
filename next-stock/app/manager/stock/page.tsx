import SideNav from "@/app/ui/sidenav";

export default async function Page() {
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
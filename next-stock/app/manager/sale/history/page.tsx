import SideNav from "@/app/ui/sidenav";
import History from "@/app/ui/transaction/history"

export default function Page() {
    return (
        <div>
            <SideNav />
            <h1>Transaction History</h1>
            <History />
        </div>
    );
}
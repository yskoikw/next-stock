import SideNav from "../ui/sidenav";
import { useSession } from "next-auth/react";

export default function Page() {
    
    const { data: session, status } = useSession();
  
    // if (status === "loading") {
    //   return <p>Loading...</p>;
    // }
  
    // if (!session) {
    //   return <p>Access Denied</p>;
    // }
  
    return (
      <div>
        <SideNav />
        {/* <p>Hello, {session.user.name}! This is {session.user.organization}'s page.</p> */}
      </div>
    );
  }

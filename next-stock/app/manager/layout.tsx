import HeaderManager from "@/app/ui/common/headerManager";
import Footer from "@/app/ui/common/footer";
import SideNav from "@/app/ui/sidenav";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
        <HeaderManager/>
        <div className="flex">
            <SideNav />
            <div className="min-h-[60vh] p-5">
                {children}
            </div>
        </div>
        <Footer />
    </main>
  );
}

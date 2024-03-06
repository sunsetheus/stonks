import { Topbar, Sidebar } from "@/components/navigation";
import "../../styles/global.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body>
      <div className="flex">
        <nav className="z-50">
          <Topbar />
          <Sidebar />
        </nav>
        
        <main className="flex-1 bg-stonks-100 pt-[25px] md:pt-0">
          {children}
        </main>
      </div>
    </body>
  </html>
  );
}

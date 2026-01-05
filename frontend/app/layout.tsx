import Sidebar from "@/src/components/sidebar"; // Use @ alias
import { UserProvider } from "@/src/context/UserContext";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen bg-slate-50">
        <UserProvider>
          <Sidebar /> 
          <main className="flex-1 overflow-y-auto">
            {children}
          </main>
        </UserProvider>
      </body>
    </html>
  );
}
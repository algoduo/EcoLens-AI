"use client"

import { usePathname } from "next/navigation"
import { Sidebar } from "../src/components/sidebar" // Correct path to src
import { UserProvider } from "../src/context/UserContext"
import "./globals.css"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Explicitly define the variable before using it
  const isLoginPage = pathname === "/login" || pathname === "/register";

  return (
    <html lang="en">
      <body className="antialiased">
        <UserProvider>
          <div className="flex min-h-screen bg-slate-50">
            {/* Sidebar only renders if NOT on auth pages */}
            {!isLoginPage && <Sidebar />}
            
            <main className={isLoginPage ? "w-full" : "flex-1"}>
              {children}
            </main>
          </div>
        </UserProvider>
      </body>
    </html>
  );
}
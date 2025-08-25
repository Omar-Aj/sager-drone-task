import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sager Drone Task",
  description: "Tracing drones application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex h-svh flex-col antialiased`}>
        <Header />
        <div className="flex grow overflow-hidden">
          <Sidebar />
          {children}
        </div>
      </body>
    </html>
  );
}

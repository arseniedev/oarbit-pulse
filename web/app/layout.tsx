import "@/_styles/globals.css";
import Header from "@/_components/layout/Header";
import Footer from "@/_components/layout/Footer";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata = {
  title: "OarBit Pulse",
  description: "Habit & routine management system",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body>
        <Header />
        <main className="app-main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
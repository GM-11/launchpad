import type { Metadata } from "next";
import Navbar from "../lib/components/Navbar";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Wallet } from "./Wallet";

const poppins = Poppins({
  weight: "700",
  subsets: ["latin"],

});

export const metadata: Metadata = {
  title: "Launchpad",
  description: "Your Token Launchpad",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Wallet>
        <body className={poppins.className}>{children}</body>
      </Wallet>
    </html>
  );
}

import Navbar from "@/components/layouts/Navbar";
import CONSTANTS from "@/utils/constants";
import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: CONSTANTS.A_BOARD,
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` antialiased overflow-hidden`}>
        <Suspense>
          <Navbar />
          {children}
        </Suspense>
      </body>
    </html>
  );
}

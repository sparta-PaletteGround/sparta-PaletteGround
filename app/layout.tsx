import { GeistSans } from "geist/font/sans";
import "./globals.css";
import QueryProvider from "./provider";
import HeaderNav from "./_components/layout/header";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="">
        <div></div>
        <HeaderNav />
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}

import { GeistSans } from "geist/font/sans";
import "./globals.css";
import QueryProvider from "./provider";
import HeaderNav from "./_components/layout/header";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Palette Ground",
  description: "The fastest way to build apps with Next.js and Supabase",
  icons: {
    icon: "/favicon.ico",
  },
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
        <QueryProvider>
          <HeaderNav />
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}

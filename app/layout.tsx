import type { Metadata } from "next";
import "./globals.css";

export const runtime = 'edge';

export const metadata: Metadata = {
  title: "Wildfern",
  description: "Wildfern Luxury Resort & Sanctuary. Guanacaste Coast.",
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="antialiased bg-[#0d1512] text-white selection:bg-emerald-500/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}

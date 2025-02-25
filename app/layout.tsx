import type { Metadata } from "next";
import "./globals.css";
import { inter } from '@/app/fonts'

export const metadata: Metadata = {
  title: "To Do app",
  description: "Copyright by Jan Gwiaździński 2025",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

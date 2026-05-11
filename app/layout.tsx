import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rolodex — Modern Address Book",
  description: "A clean, fast SaaS-style address book to manage all your contacts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

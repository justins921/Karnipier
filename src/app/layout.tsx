import type { Metadata } from "next";
import localFont from "next/font/local";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    default: "Piers 2U | Custom Dock Builder in Wisconsin — Since the 1950s",
    template: "%s | Piers 2U — Custom Dock Builder Wisconsin",
  },
  description:
    "Karni-Pier LLC dba Piers 2U builds custom stationary docks, floating docks, roll-in dock systems, and boat lifts in Wisconsin. Family owned since the 1950s. Get a free quote today.",
  metadataBase: new URL("https://www.pierstoyou.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Piers 2U — Karni-Pier LLC",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} font-sans antialiased`}>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

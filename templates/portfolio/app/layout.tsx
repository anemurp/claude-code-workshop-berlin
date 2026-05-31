import "./globals.css";
import type { Metadata } from "next";
import { meta } from "../content";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Inter, Caveat } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "700", "800"],
  variable: "--font-inter",
});

const caveat = Caveat({
  subsets: ["latin"],
  display: "swap",
  weight: ["700"],
  variable: "--font-caveat",
});

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`scroll-smooth ${inter.variable} ${caveat.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased bg-cobalt">
        <Navbar />
        <div className="rounded-b-[32px]" style={{ backgroundColor: "var(--bg)" }}>
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}

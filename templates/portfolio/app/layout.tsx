import "./globals.css";
import type { Metadata } from "next";
import { meta } from "../content";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "700", "800"],
  variable: "--font-inter",
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
    <html lang="en" className={`scroll-smooth ${inter.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased bg-cobalt">
        <div className="rounded-b-[32px]" style={{ backgroundColor: "var(--bg)" }}>
          <Navbar />
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}

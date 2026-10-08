import type { Metadata } from "next";
import { Inter, Big_Shoulders } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const display = Big_Shoulders({
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: {
    default: "Expert Marketing & Developers — Construction Company Islamabad & Rawalpindi",
    template: "%s | Expert Marketing & Developers",
  },
  description:
    "Grey structure to turnkey home construction in Islamabad and Rawalpindi with written BOQ, engineering supervision and milestone payments.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${display.variable} bg-paper text-ink antialiased`}>
        <Header />
        <main className="pt-16">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
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
      <body className={`${montserrat.variable} bg-paper text-ink antialiased`}>
        <Header />
        <main className="pt-16">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}

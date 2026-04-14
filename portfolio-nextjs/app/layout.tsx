import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatbotWidget from "@/components/ChatbotWidget";
import CustomCursor from "@/components/CustomCursor";
import ScrollToTop from "@/components/ScrollToTop";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://diogobit.vercel.app"
  ),
  title: "Diogo Bittencourt | Portfólio",
  description:
    "Portfólio de Diogo Bittencourt — Desenvolvedor Full-stack & Designer Gráfico. Projetos, habilidades e experiência profissional.",
  openGraph: {
    title: "Diogo Bittencourt | Portfólio",
    description:
      "Portfólio de Diogo Bittencourt — Desenvolvedor Full-stack & Designer Gráfico.",
    images: [{ url: "/img/diogo.png", width: 1200, height: 1200, alt: "Diogo Bittencourt" }],
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground">
        <ScrollToTop />
        <CustomCursor />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <ChatbotWidget />
      </body>
    </html>
  );
}

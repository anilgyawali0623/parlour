import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Aura & Ash — A Parlour for Hair, Skin & Occasion Styling",
  description:
    "An appointment-only parlour in the Riverside District offering hair, skin, bridal, and finishing services. Book your slot at Aura & Ash.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col bg-[var(--paper)] font-body text-[var(--charcoal)]">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

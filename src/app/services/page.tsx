import type { Metadata } from "next";
import { Suspense } from "react";
import ServicesExplorer from "./ServicesExplorer";

export const metadata: Metadata = {
  title: "Services & Pricing — Aura & Ash",
  description:
    "Browse and search the full Aura & Ash menu: hair, skin, bridal & occasion, and finishing touches, with pricing and duration.",
};

export default function ServicesPage() {
  return (
    <Suspense fallback={null}>
      <ServicesExplorer />
    </Suspense>
  );
}

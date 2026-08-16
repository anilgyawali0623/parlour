import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact & Booking — Aura & Ash",
  description:
    "Book your slot at Aura & Ash: 14 Marlowe Lane, Riverside District. Call, email, or send a note through the booking form.",
};

export default function ContactPage() {
  return (
    <>
      <section className="border-b border-[var(--charcoal)]/10 bg-[var(--paper-deep)]">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <SectionHeading eyebrow="Get in touch" title="Book your slot" />
          <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-[var(--charcoal-60)]">
            Send a note and we&rsquo;ll confirm a time within one business day,
            or call the studio directly during open hours.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-[1fr_1.1fr]">
        <div className="space-y-8">
          <div
            className="ticket ticket-dark rounded-sm p-6 text-[var(--paper)]"
            style={{ ["--paper-band" as unknown as string]: "var(--ink)" }}
          >
            <p className="eyebrow text-[var(--gold-soft)]">Studio</p>
            <ul className="perforation mt-4 space-y-4 pt-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={17} strokeWidth={1.5} className="mt-0.5 shrink-0 text-[var(--gold-soft)]" />
                14 Marlowe Lane, Riverside District
              </li>
              <li className="flex items-center gap-3">
                <Phone size={17} strokeWidth={1.5} className="shrink-0 text-[var(--gold-soft)]" />
                (555) 014-2288
              </li>
              <li className="flex items-center gap-3">
                <Mail size={17} strokeWidth={1.5} className="shrink-0 text-[var(--gold-soft)]" />
                hello@auraandash.studio
              </li>
              <li className="flex items-start gap-3">
                <Clock size={17} strokeWidth={1.5} className="mt-0.5 shrink-0 text-[var(--gold-soft)]" />
                <span>
                  Tue&ndash;Fri 10&ndash;7 &middot; Sat 9&ndash;6 &middot; Sun 11&ndash;4 &middot; Mon closed
                </span>
              </li>
            </ul>
          </div>

          <div className="overflow-hidden rounded-sm border border-[var(--charcoal)]/12">
            <iframe
              title="Aura & Ash location map"
              className="h-64 w-full grayscale"
              loading="lazy"
              src="https://www.google.com/maps?q=Riverside+District&output=embed"
            />
          </div>
        </div>

        <ContactForm />
      </section>
    </>
  );
}

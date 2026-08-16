import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "About — Aura & Ash",
  description:
    "The story behind Aura & Ash: a six-chair parlour in a converted Riverside townhouse, and the people who run it.",
};

const team = [
  { name: "Priya Anand", role: "Founder & Colourist", note: "Trained in London, twelve years behind the chair." },
  { name: "Noor El-Amin", role: "Lead Stylist", note: "Specialises in texture-first cutting." },
  { name: "Camila Reyes", role: "Skin Therapist", note: "Esthetician, formerly of a dermatology clinic." },
  { name: "Jonas Weber", role: "Bridal & Occasion", note: "Ten seasons of wedding season, no regrets." },
];

const values = [
  { title: "One chair, one client", body: "No stylist runs two heads at once. Your appointment is the only one happening at that station." },
  { title: "Consult before commit", body: "Every service opens with a real conversation, not a rushed glance in the mirror." },
  { title: "Products we'd use ourselves", body: "We carry what we actually reach for at home, and we'll tell you when you don't need the upsell." },
  { title: "Slow room, fast results", body: "The pace is unhurried. The outcome — cut, colour, or calm — still shows up on schedule." },
];

export default function AboutPage() {
  return (
    <>
      <section className="bg-[var(--paper-deep)] border-b border-[var(--charcoal)]/10">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <p className="eyebrow text-[var(--gold)]">Our story</p>
          <h1 className="mt-3 max-w-2xl font-display text-4xl leading-tight sm:text-5xl text-[var(--ink)]">
            A townhouse on Marlowe Lane, six chairs, and a rule against double-booking.
          </h1>
          <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-[var(--charcoal-60)]">
            Aura &amp; Ash opened in 2014 in a former dressmaker&rsquo;s townhouse,
            after its founder, Priya, spent a decade watching salons stretch
            stylists thin across too many chairs. The fix was structural, not
            aesthetic: cap the chairs, cap the clients per hour, and let the
            room stay quiet enough to hear the water running.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <SectionHeading eyebrow="What we hold to" title="Four working rules" />
        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          {values.map((v) => (
            <div key={v.title} className="border-t border-[var(--charcoal)]/15 pt-5">
              <h3 className="font-display text-xl text-[var(--ink)]">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--charcoal-60)]">{v.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[var(--ink)] text-[var(--paper)]">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <SectionHeading eyebrow="Behind the chairs" title="The people" light />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((t) => (
              <div
                key={t.name}
                className="ticket ticket-dark rounded-sm p-5"
                style={{ ["--paper-band" as unknown as string]: "var(--ink)" }}
              >
                <p className="font-display text-lg">{t.name}</p>
                <p className="perforation mt-2 pt-2 eyebrow text-[var(--gold-soft)]">{t.role}</p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--paper)]/70">{t.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-8 text-center sm:grid-cols-3">
          {[
            { stat: "6", label: "chairs, never more" },
            { stat: "1", label: "client per stylist, always" },
            { stat: "11", label: "years on Marlowe Lane" },
          ].map((s) => (
            <div key={s.label}>
              <p className="font-display text-5xl text-[var(--rose-deep)]">{s.stat}</p>
              <p className="mt-2 eyebrow text-[var(--charcoal-60)]">{s.label}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

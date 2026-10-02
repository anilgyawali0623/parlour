import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import { FaTiktok , FaFacebook, FaInstagram} from 'react-icons/fa6';


export default function Footer() {
  return (
    <footer className="bg-[var(--ink)] text-[var(--paper)]">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-[1.3fr_1fr_1fr_1.1fr]">
          <div>
            <span className="font-display text-1xl">Neva Threading & Beauty Salon</span>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-[var(--paper)]/70">
               salon for skin, and occasion styling.
            </p>
            <div className="mt-5 flex gap-3">
              <a
                href="https://www.instagram.com/nevathreadingbeauty"
                aria-label="Instagram"
                target="_blank"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--paper)]/25 transition hover:border-[var(--gold-soft)] hover:text-[var(--gold-soft)]"
              >
                <FaInstagram />
              </a>
              <a
                href="https://www.facebook.com/share/19NXfXoF9a/?mibextid=wwXIfr"
                aria-label="Facebook"
                target="_blank"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--paper)]/25 transition hover:border-[var(--gold-soft)] hover:text-[var(--gold-soft)]"
              >
                <FaFacebook />
              </a>
              
              <a
                href="https://www.tiktok.com/@neva.threading.be?_r=1&_t=ZT-9AC7gs3WKYI"
                aria-label="TikTok"
                target="_blank"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--paper)]/25 transition hover:border-[var(--gold-soft)] hover:text-[var(--gold-soft)]"
              >
                <FaTiktok />
              </a>
            </div>
          </div>

          <div>
            <p className="eyebrow text-[var(--gold-soft)]">Explore</p>
            <ul className="mt-4 space-y-2.5 text-sm text-[var(--paper)]/80">
              <li><Link href="/" className="transition hover:text-[var(--paper)]">Home</Link></li>
              <li><Link href="/about" className="transition hover:text-[var(--paper)]">About</Link></li>
              <li><Link href="/services" className="transition hover:text-[var(--paper)]">Services</Link></li>
              <li><Link href="/contact" className="transition hover:text-[var(--paper)]">Contact</Link></li>
            </ul>
          </div>

          <div>
            <p className="eyebrow text-[var(--gold-soft)]">Hours</p>
            <ul className="mt-4  text-sm text-[var(--paper)]/80 font-mono">
              <li className="flex gap-1 "><span>Monday – Saturday</span><span> 10am – 7pm</span></li>
              <li className="flex  gap-1"><span>Sunday</span><span>11am – 6pm</span></li>

            </ul>
          </div>

          <div>
            <p className="eyebrow text-[var(--gold-soft)]">Visit</p>
            <ul className="mt-4 space-y-3 text-sm text-[var(--paper)]/80">
              <li className="flex items-start gap-2.5">
                <MapPin size={16} strokeWidth={1.75} className="mt-0.5 shrink-0 text-[var(--gold-soft)]" />
                601 Harwood Rd Ste 1, Bedford, TX 76021, USA
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={16} strokeWidth={1.75} className="shrink-0 text-[var(--gold-soft)]" />
                +1 (682) 416-3606
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={16} strokeWidth={1.75} className="shrink-0 text-[var(--gold-soft)]" />
                nevathreading@gmail.com
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-center gap-4 border-t border-[var(--paper)]/15 pt-6 text-xs text-[var(--paper)]/55 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Neva Threading & Beauty Salon. All rights reserved.</p>
          
        </div>
      </div>
    </footer>
  );
}

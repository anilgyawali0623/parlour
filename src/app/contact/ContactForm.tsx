"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { services } from "@/data/services";

type Status = "idle" | "submitting" | "success";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    date: "",
    message: "",
  });

  function update(field: keyof typeof values, value: string) {
    setValues((v) => ({ ...v, [field]: value }));
  }

  function validate() {
    const next: Record<string, string> = {};
    if (!values.name.trim()) next.name = "Enter your name.";
    if (!values.email.trim()) {
      next.email = "Enter your email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      next.email = "Enter a valid email.";
    }
    if (!values.service) next.service = "Choose a service.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setStatus("submitting");
    // Simulated submit — wire this up to your booking backend or email service.
    setTimeout(() => setStatus("success"), 700);
  }

  if (status === "success") {
    return (
      <div
        className="ticket rounded-sm p-8"
        style={{ ["--paper-band" as unknown as string]: "var(--paper)" }}
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--sage)] text-white">
          <Check size={18} strokeWidth={2} />
        </span>
        <h3 className="mt-4 font-display text-2xl text-[var(--ink)]">
          Request sent
        </h3>
        <p className="perforation mt-3 pt-4 text-sm leading-relaxed text-[var(--charcoal-60)]">
          Thanks, {values.name.split(" ")[0] || "there"}. We&rsquo;ll confirm your{" "}
          <strong>{values.service}</strong> slot
          {values.date ? ` for ${values.date}` : ""} by email within one
          business day.
        </p>
        <button
          onClick={() => {
            setValues({ name: "", email: "", phone: "", service: "", date: "", message: "" });
            setStatus("idle");
          }}
          className="mt-6 font-mono text-xs uppercase tracking-wider text-[var(--rose-deep)] underline underline-offset-4"
        >
          Send another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" error={errors.name}>
          <input
            type="text"
            value={values.name}
            onChange={(e) => update("name", e.target.value)}
            className={inputClass(!!errors.name)}
            placeholder="Jordan Ellis"
          />
        </Field>
        <Field label="Email" error={errors.email}>
          <input
            type="email"
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
            className={inputClass(!!errors.email)}
            placeholder="jordan@email.com"
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Phone (optional)">
          <input
            type="tel"
            value={values.phone}
            onChange={(e) => update("phone", e.target.value)}
            className={inputClass(false)}
            placeholder="(555) 000-0000"
          />
        </Field>
        <Field label="Preferred date (optional)">
          <input
            type="date"
            value={values.date}
            onChange={(e) => update("date", e.target.value)}
            className={inputClass(false)}
          />
        </Field>
      </div>

      <Field label="Service" error={errors.service}>
        <select
          value={values.service}
          onChange={(e) => update("service", e.target.value)}
          className={inputClass(!!errors.service)}
        >
          <option value="">Choose a service…</option>
          {services.map((s) => (
            <option key={s.slug} value={s.name}>
              {s.name} — {s.price}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Anything we should know? (optional)">
        <textarea
          value={values.message}
          onChange={(e) => update("message", e.target.value)}
          rows={4}
          className={inputClass(false)}
          placeholder="First-time visit, allergy notes, occasion details…"
        />
      </Field>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full rounded-full bg-[var(--ink)] px-6 py-3.5 font-mono text-xs uppercase tracking-wider text-[var(--paper)] transition hover:bg-[var(--rose-deep)] disabled:opacity-60 sm:w-auto"
      >
        {status === "submitting" ? "Sending…" : "Request appointment"}
      </button>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="eyebrow text-[var(--charcoal-60)]">{label}</span>
      <div className="mt-2">{children}</div>
      {error && <span className="mt-1.5 block text-xs text-[var(--rose-deep)]">{error}</span>}
    </label>
  );
}

function inputClass(hasError: boolean) {
  return `w-full rounded-sm border bg-[var(--paper)] px-3.5 py-2.5 text-sm text-[var(--charcoal)] outline-none transition placeholder:text-[var(--charcoal-60)]/70 focus:border-[var(--gold)] ${
    hasError ? "border-[var(--rose-deep)]" : "border-[var(--charcoal)]/20"
  }`;
}

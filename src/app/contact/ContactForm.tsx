"use client";

import { useState,useEffect, useRef } from "react";
import { Check } from "lucide-react";
import { services } from "@/data/services";
import { Search, ChevronDown, X } from "lucide-react";
type Status = "idle" | "submitting" | "success";
function ServiceSearch({
  value,
  onChange,
  error,
}: {
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const containerRef = useRef<HTMLDivElement>(null);

  const selectedService = services.find((s) => s.name === value);

  const filteredServices = services.filter((s) => {
    const q = query.trim().toLowerCase();

    if (!q) return true;

    return (
      s.name.toLowerCase().includes(q) ||
      s.category.toLowerCase().includes(q) ||
      s.description.toLowerCase().includes(q) ||
      s.keywords?.some((k) =>
        k.toLowerCase().includes(q)
      )
    );
  });

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function selectService(serviceName: string) {
    onChange(serviceName);
    setQuery("");
    setOpen(false);
  }

  return (
    <div ref={containerRef} className="relative">
      {/* Selected service / search trigger */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={`flex w-full items-center justify-between rounded-sm border bg-[var(--paper)] px-4 py-3 text-left text-sm transition ${
          error
            ? "border-red-500"
            : "border-[var(--charcoal)]/15 hover:border-[var(--gold)]"
        }`}
      >
        <span
          className={
            selectedService
              ? "text-[var(--ink)]"
              : "text-[var(--charcoal-60)]"
          }
        >
          {selectedService
            ? `${selectedService.name} — ${selectedService.price}`
            : "Choose a service…"}
        </span>

        <ChevronDown
          size={17}
          className={`shrink-0 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-sm border border-[var(--charcoal)]/12 bg-[var(--paper)] shadow-xl">
          
          {/* Search */}
          <div className="border-b border-[var(--charcoal)]/10 p-3">
            <div className="flex items-center gap-2 border-b border-[var(--ink)]/30 pb-2">
              <Search
                size={16}
                className="shrink-0 opacity-50"
              />

              <input
                autoFocus
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search service..."
                className="w-full bg-transparent text-sm outline-none placeholder:text-[var(--charcoal-60)]"
              />

              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="opacity-50 hover:opacity-100"
                >
                  <X size={15} />
                </button>
              )}
            </div>
          </div>

          {/* Results */}
          <div className="max-h-64 overflow-y-auto">
            {filteredServices.length === 0 ? (
              <p className="px-4 py-4 text-sm text-[var(--charcoal-60)]">
                No services found.
              </p>
            ) : (
              filteredServices.map((s) => (
                <button
                  key={s.slug}
                  type="button"
                  onClick={() => selectService(s.name)}
                  className={`flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm transition hover:bg-[var(--paper-deep)] ${
                    value === s.name
                      ? "bg-[var(--paper-deep)]"
                      : ""
                  }`}
                >
                  <span>
                    <span className="block font-medium text-[var(--ink)]">
                      {s.name}
                    </span>

                    <span className="eyebrow text-[var(--charcoal-60)]">
                      {s.category}
                    </span>
                  </span>

                  <span className="shrink-0 font-mono text-xs text-[var(--gold)]">
                    {s.price}
                  </span>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
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
 console.log("Current form values:", values);
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

  async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();

  if (!validate()) return;

  setStatus("submitting");

  console.log("Submitting form with values:", values);

  try {
    const res = await fetch(
      "https://parlour-nine-sigma.vercel.app/api/contact",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }
    );

    const responseText = await res.text();

    console.log("API status:", res.status);
    console.log("API response:", responseText);

    if (!res.ok) {
      throw new Error(
        `Request failed: ${res.status} - ${responseText}`
      );
    }

    setStatus("success");
  } catch (err) {
    console.error("Contact form error:", err);

    setStatus("idle");

    setErrors({
      form: "Something went wrong sending your request. Please try again or call us directly.",
    });
  }
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
  <ServiceSearch
    value={values.service}
    onChange={(value) => update("service", value)}
    error={!!errors.service}
  />
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
        {errors.form && (
          <p className="text-sm text-[var(--rose-deep)]">{errors.form}</p>
        )}

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
  return `w-full rounded-sm border bg-[var(--paper)] px-3.5 py-2.5 text-sm text-[var(--charcoal)] outline-none transition placeholder:text-[var(--charcoal-60)]/70 focus:border-[var(--gold)] ${hasError ? "border-[var(--rose-deep)]" : "border-[var(--charcoal)]/20"
    }`;
}

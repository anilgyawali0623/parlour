"use client";

import { useState, useEffect, useRef } from "react";
import { Check } from "lucide-react";
import { services } from "@/data/services";
import { Search, ChevronDown, X } from "lucide-react";
type Status = "idle" | "submitting" | "success";

function ServiceSearch({
  value,
  onChange,
  error,
}: {
  value: string[];
  onChange: (value: string[]) => void;
  error?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const containerRef = useRef<HTMLDivElement>(null);

  const selectedServices = services.filter((s) =>
    value.includes(s.name)
  );

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
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  function toggleService(serviceName: string) {
    if (value.includes(serviceName)) {
      onChange(
        value.filter((service) => service !== serviceName)
      );
    } else {
      onChange([...value, serviceName]);
    }
  }

  return (
    <div ref={containerRef} className="relative">
      {/* Selected services / search trigger */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={`flex min-h-[46px] w-full items-center justify-between rounded-sm border bg-[var(--paper)] px-4 py-3 text-left text-sm transition ${error
          ? "border-red-500"
          : "border-[var(--charcoal)]/15 hover:border-[var(--gold)]"
          }`}
      >
        <div className="flex flex-wrap gap-2">
          {selectedServices.length > 0 ? (
            selectedServices.map((service) => (
              <span
                key={service.slug}
                className="rounded-full bg-[var(--paper-deep)] px-3 py-1 text-xs text-[var(--ink)]"
              >
                {service.name}
              </span>
            ))
          ) : (
            <span className="text-[var(--charcoal-60)]">
              Choose services…
            </span>
          )}
        </div>

        <ChevronDown
          size={17}
          className={`ml-2 shrink-0 transition-transform ${open ? "rotate-180" : ""
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
              filteredServices.map((s) => {
                const isSelected = value.includes(s.name);

                return (
                  <button
                    key={s.slug}
                    type="button"
                    onClick={() => toggleService(s.name)}
                    className={`flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm transition hover:bg-[var(--paper-deep)] ${isSelected
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

                    <div className="flex items-center gap-3">
                      <span className="shrink-0 font-mono text-xs text-[var(--gold)]">
                        {s.price}
                      </span>

                      {isSelected && (
                        <Check
                          size={16}
                          className="text-[var(--gold)]"
                        />
                      )}
                    </div>
                  </button>
                );
              })
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
    service: [] as string[],
    date: "",
    requestedTime: "",
    message: "",
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  console.log("Current form values:", values);
  const [timeSlots, setTimeSlots] = useState<
    { to: string; from: string }[]
  >([]);
  console.log("Current time slots:", timeSlots);

  const [loadingSlots, setLoadingSlots] = useState(false);
  console.log("Current form values:", values);
  function update(
    field: keyof typeof values,
    value: string | string[]
  ) {
    setValues((v) => ({
      ...v,
      [field]: value,
    }));
  }
  useEffect(() => {
    if (!values.date) {
      setTimeSlots([]);
      return;
    }

    fetchAvailableSlots(values.date);
  }, [values.date]);
  async function fetchAvailableSlots(date: string) {
    if (!date) {
      setTimeSlots([]);
      return;
    }

    try {
      setLoadingSlots(true);

      const res = await fetch(
        `/api/booking/available-slot?date=${encodeURIComponent(date)}`
      );

      const data = await res.json();
      console.log("Available slots API response:", data);
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to fetch unavailable slots");
      }

      setTimeSlots(data.unavailableSlots || []);
    } catch (error) {
      console.error("Failed to fetch unavailable slots:", error);
      setTimeSlots([]);
    } finally {
      setLoadingSlots(false);
    }
  }

  function validate() {
    const next: Record<string, string> = {};

    if (!values.name.trim()) {
      next.name = "Enter your name.";
    }

    if (!values.email.trim()) {
      next.email = "Enter your email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      next.email = "Enter a valid email.";
    }

    if (!values.phone.trim()) {
      next.phone = "Enter your phone number.";
    }

    if (!values.date) {
      next.date = "Choose a date.";
    }
    if (values.service.length === 0) {
      next.service = "Choose at least one service.";
    }

    if (!values.requestedTime) {
      next.requestedTime = "Choose an available time.";
    }

    setErrors(next);

    return Object.keys(next).length === 0;
  }
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!validate()) return;

    setStatus("submitting");

    console.log("Submitting booking:", values);

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await res.json();
      console.log("API status:", res.status);
      console.log("API response:", data);
      console.log("API status:", res.status);
      console.log("API response:", data);
      console.log("API message:", data.message);
      if (!res.ok) {
        setErrorMessage(data.message || "Booking failed");

        if (res.status === 409) {
          await fetchAvailableSlots(values.date);
        }

        setStatus("idle");
        return;
      }

      setStatus("success");
    } catch (err) {
      console.error("Booking error:", err);

      setStatus("idle");

      setErrors({
        form:
          "Something went wrong. Please try again or call us directly.",
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
            setValues({ name: "", email: "", phone: "", service: [], date: "", message: "", requestedTime: "" });
            setStatus("idle");
            setTimeSlots([]);
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
        <Field label="Preferred date">
          <input
            type="date"
            value={values.date}
            onChange={(e) => {
              const selectedDate = e.target.value;

              update("date", selectedDate);

              // Clear previously selected time
              update("requestedTime", "");

              // Get slots for new date
              fetchAvailableSlots(selectedDate);
            }}
            className={inputClass(!!errors.date)}
          />
        </Field>

      </div>


      <div>
        {timeSlots.length > 0 && (
          <div className="mt-2">
            <p className="text-sm text-[var(--charcoal-60)]">
              Unavailable time slots for {values.date}:
            </p>
            <ul className="mt-1.5 space-y-1 text-sm text-[var(--charcoal-60)]">
              {timeSlots.map((slot, index) => (
                <li key={index}>
                  {slot.from} - {slot.to}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>





      <Field label="Preferred time">
        <input
          type="time"
          value={values.requestedTime}
          onChange={(e) => {
            const selectedTime = e.target.value;
            update("requestedTime", selectedTime);
          }}
          className={inputClass(!!errors.requestedTime)}
        />
      </Field>

      <Field label="Services" error={errors.service}>
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
        {/* {errors && (
          <p className="text-sm text-[var(--rose-deep)]">{errorMessage}</p>
        )} */}

      </button>
      {errorMessage && (
        <div className="rounded-sm border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {errorMessage}
        </div>
      )}
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
      {/* {errorMessage && <span className="mt-1.5 block text-xs text-[var(--rose-deep)]">{errorMessage}</span>} */}
    </label>
  );
}

function inputClass(hasError: boolean) {
  return `w-full rounded-sm border bg-[var(--paper)] px-3.5 py-2.5 text-sm text-[var(--charcoal)] outline-none transition placeholder:text-[var(--charcoal-60)]/70 focus:border-[var(--gold)] ${hasError ? "border-[var(--rose-deep)]" : "border-[var(--charcoal)]/20"
    }`;
}

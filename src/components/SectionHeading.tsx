export default function SectionHeading({
  eyebrow,
  title,
  align = "left",
  light = false,
}: {
  eyebrow: string;
  title: string;
  align?: "left" | "center";
  light?: boolean;
}) {
  return (
    <div className={align === "center" ? "text-center" : "text-left"}>
      <p className="eyebrow" style={{ color: "var(--gold)" }}>
        {eyebrow}
      </p>
      <h2
        className={`mt-2 font-display text-3xl leading-tight sm:text-4xl ${
          light ? "text-[var(--paper)]" : "text-[var(--ink)]"
        }`}
      >
        {title}
      </h2>
    </div>
  );
}

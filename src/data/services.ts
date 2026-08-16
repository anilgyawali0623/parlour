export type Service = {
  slug: string;
  name: string;
  category: "Hair" | "Skin" | "Bridal & Occasion" | "Finishing Touches";
  price: string;
  duration: string;
  description: string;
  keywords: string[];
};

export const services: Service[] = [
  // Hair
  {
    slug: "signature-cut-finish",
    name: "Signature Cut & Finish",
    category: "Hair",
    price: "$65",
    duration: "45 min",
    description:
      "A precision cut mapped to your face shape and hair pattern, finished with a blowout that holds.",
    keywords: ["haircut", "trim", "blowdry", "blowout"],
  },
  {
    slug: "balayage-color-melt",
    name: "Balayage & Colour Melt",
    category: "Hair",
    price: "$180",
    duration: "2.5 hrs",
    description:
      "Hand-painted dimension that grows out softly, tailored to your natural base tone.",
    keywords: ["color", "colour", "highlights", "balayage", "dye"],
  },
  {
    slug: "gloss-toning",
    name: "Gloss & Toning Treatment",
    category: "Hair",
    price: "$55",
    duration: "30 min",
    description:
      "A clear or tinted gloss that seals the cuticle, cutting brass and adding mirror-shine.",
    keywords: ["shine", "tone", "gloss", "color refresh"],
  },
  {
    slug: "keratin-smoothing",
    name: "Keratin Smoothing",
    category: "Hair",
    price: "$220",
    duration: "2 hrs",
    description:
      "A frizz-taming treatment that softens texture for up to twelve weeks without flattening it.",
    keywords: ["keratin", "smoothing", "frizz", "straightening"],
  },

  // Skin
  {
    slug: "signature-facial",
    name: "Signature Facial",
    category: "Skin",
    price: "$95",
    duration: "60 min",
    description:
      "A double-cleanse, gentle exfoliation, and mask suited to your skin's mood that week.",
    keywords: ["facial", "skincare", "cleanse", "glow"],
  },
  {
    slug: "dermaplaning",
    name: "Dermaplaning",
    category: "Skin",
    price: "$75",
    duration: "40 min",
    description:
      "Manual exfoliation that lifts dulling buildup and peach fuzz for a smoother makeup finish.",
    keywords: ["exfoliation", "peach fuzz", "smooth skin"],
  },
  {
    slug: "led-light-therapy",
    name: "LED Light Therapy",
    category: "Skin",
    price: "$60",
    duration: "30 min",
    description:
      "Red and amber light to calm inflammation and support collagen, layered onto any facial.",
    keywords: ["led", "light therapy", "collagen", "acne"],
  },
  {
    slug: "brow-lamination-tint",
    name: "Brow Lamination & Tint",
    category: "Skin",
    price: "$45",
    duration: "30 min",
    description:
      "Brows brushed into a fuller, uniform shape and tinted to match, lasting four to six weeks.",
    keywords: ["brows", "eyebrows", "lamination", "tint"],
  },

  // Bridal & Occasion
  {
    slug: "bridal-trial",
    name: "Bridal Trial",
    category: "Bridal & Occasion",
    price: "$150",
    duration: "90 min",
    description:
      "A full run-through of hair and makeup, photographed, before the day itself.",
    keywords: ["bridal", "wedding", "trial", "makeup"],
  },
  {
    slug: "bridal-day-of-styling",
    name: "Bridal Day-Of Styling",
    category: "Bridal & Occasion",
    price: "$350",
    duration: "Half day",
    description:
      "On-site hair and makeup for the bride, timed against your getting-ready schedule.",
    keywords: ["bridal", "wedding day", "on-site", "makeup", "hair"],
  },
  {
    slug: "occasion-updo",
    name: "Occasion Updo",
    category: "Bridal & Occasion",
    price: "$85",
    duration: "45 min",
    description:
      "A structured or undone updo built to last a full evening of dancing.",
    keywords: ["updo", "formal", "event", "party hair"],
  },
  {
    slug: "airbrush-makeup",
    name: "Airbrush Makeup",
    category: "Bridal & Occasion",
    price: "$120",
    duration: "60 min",
    description:
      "A lightweight, buildable base applied by airbrush for a photograph-ready finish.",
    keywords: ["makeup", "airbrush", "foundation", "event makeup"],
  },

  // Finishing Touches
  {
    slug: "gel-manicure",
    name: "Gel Manicure",
    category: "Finishing Touches",
    price: "$50",
    duration: "45 min",
    description:
      "Shape, cuticle care, and a chip-resistant gel finish in a colour of your choice.",
    keywords: ["nails", "manicure", "gel"],
  },
  {
    slug: "spa-pedicure",
    name: "Spa Pedicure",
    category: "Finishing Touches",
    price: "$65",
    duration: "50 min",
    description:
      "A warm soak, callus treatment, and extended massage, finished with polish.",
    keywords: ["nails", "pedicure", "feet", "massage"],
  },
  {
    slug: "lash-lift-tint",
    name: "Lash Lift & Tint",
    category: "Finishing Touches",
    price: "$70",
    duration: "45 min",
    description:
      "A curl lifted from the root and tinted darker, for definition without extensions.",
    keywords: ["lashes", "eyelashes", "lift", "tint"],
  },
  {
    slug: "scalp-massage-addon",
    name: "Scalp Massage Add-on",
    category: "Finishing Touches",
    price: "$20",
    duration: "15 min",
    description:
      "Fifteen unhurried minutes added to any service, worked with warmed oil.",
    keywords: ["scalp", "massage", "relax", "add-on"],
  },
];

export const categories = Array.from(new Set(services.map((s) => s.category)));

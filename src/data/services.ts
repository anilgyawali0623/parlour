export type Service = {
  slug: string;
  name: string;
  category: "Threading" | "Waxing" | "Lashes" | "Facial";
  price: string;
  duration: string;
  description: string;
  keywords: string[];
};

export const services: Service[] = [
  // Threading
  {
    slug: "eyebrow-threading",
    name: "Eyebrow Threading",
    category: "Threading",
    price: "$8",
    duration: "",
    description:
      "Precise eyebrow threading to shape and define your brows for a clean, polished look.",
    keywords: ["threading", "eyebrow", "brows"],
  },
  {
    slug: "upper-lip-threading",
    name: "Upper Lip Threading",
    category: "Threading",
    price: "$6",
    duration: "",
    description:
      "Gentle threading to remove unwanted hair from the upper lip and leave the skin smooth.",
    keywords: ["threading", "upper lip", "facial hair"],
  },
  {
    slug: "lower-lip-threading",
    name: "Lower Lip Threading",
    category: "Threading",
    price: "$3",
    duration: "",
    description:
      "Quick and precise threading for unwanted hair around the lower lip.",
    keywords: ["threading", "lower lip", "facial hair"],
  },
  {
    slug: "chin-threading",
    name: "Chin Threading",
    category: "Threading",
    price: "$6+",
    duration: "",
    description:
      "Precise chin threading for a smooth, clean facial finish.",
    keywords: ["threading", "chin", "facial hair"],
  },
  {
    slug: "neck-threading",
    name: "Neck Threading",
    category: "Threading",
    price: "$6",
    duration: "",
    description:
      "Threading service designed to remove unwanted hair from the neck area.",
    keywords: ["threading", "neck", "hair removal"],
  },
  {
    slug: "forehead-threading",
    name: "Forehead Threading",
    category: "Threading",
    price: "$6",
    duration: "",
    description:
      "Gentle forehead threading for a smooth and even facial appearance.",
    keywords: ["threading", "forehead", "facial hair"],
  },
  {
    slug: "sides-threading",
    name: "Sides Threading",
    category: "Threading",
    price: "$15",
    duration: "",
    description:
      "Threading for the sides of the face to create a smooth and refined look.",
    keywords: ["threading", "sides", "face", "hair removal"],
  },
  {
    slug: "sideburns-cheeks-threading",
    name: "Sideburns / Cheeks Threading",
    category: "Threading",
    price: "$8",
    duration: "",
    description:
      "Facial threading for the sideburn and cheek areas for a clean, smooth finish.",
    keywords: ["threading", "sideburns", "cheeks", "face"],
  },
  {
    slug: "full-face-threading",
    name: "Full Face Threading",
    category: "Threading",
    price: "$30",
    duration: "",
    description:
      "Complete facial threading service for a smooth, polished appearance.",
    keywords: ["threading", "full face", "facial hair removal"],
  },
  {
    slug: "full-face-threading-collagen-mask",
    name: "Full Face Threading with Collagen Mask",
    category: "Threading",
    price: "$40",
    duration: "",
    description:
      "Full face threading followed by a collagen mask to leave the skin feeling refreshed and smooth.",
    keywords: ["threading", "full face", "collagen mask", "facial"],
  },

  // Waxing
  {
    slug: "eyebrow-waxing",
    name: "Eyebrow Waxing",
    category: "Waxing",
    price: "$10",
    duration: "",
    description:
      "Professional eyebrow waxing to shape and define your brows with a clean finish.",
    keywords: ["waxing", "eyebrow", "brows"],
  },
  {
    slug: "full-face-waxing",
    name: "Full Face Waxing",
    category: "Waxing",
    price: "$35",
    duration: "",
    description:
      "Full facial waxing to remove unwanted hair and leave the skin feeling smooth.",
    keywords: ["waxing", "full face", "hair removal"],
  },
  {
    slug: "nose-wax",
    name: "Nose Wax",
    category: "Waxing",
    price: "$15",
    duration: "",
    description:
      "Quick and professional nose waxing for unwanted visible hair.",
    keywords: ["waxing", "nose", "hair removal"],
  },
  {
    slug: "full-arms-waxing",
    name: "Full Arms Waxing",
    category: "Waxing",
    price: "$30",
    duration: "",
    description:
      "Full arm waxing for smooth, hair-free skin from shoulders to wrists.",
    keywords: ["waxing", "arms", "full arms", "hair removal"],
  },
  {
    slug: "full-legs-waxing",
    name: "Full Legs Waxing",
    category: "Waxing",
    price: "$40",
    duration: "",
    description:
      "Full leg waxing for smooth, clean-looking skin throughout the legs.",
    keywords: ["waxing", "legs", "full legs", "hair removal"],
  },
  {
    slug: "half-legs-waxing",
    name: "Half Legs Waxing",
    category: "Waxing",
    price: "$30",
    duration: "",
    description:
      "Half-leg waxing focused on removing unwanted hair for smooth skin.",
    keywords: ["waxing", "half legs", "legs"],
  },
  {
    slug: "half-arm-waxing",
    name: "Half Arm Waxing",
    category: "Waxing",
    price: "$20",
    duration: "",
    description:
      "Half-arm waxing for smooth and polished skin.",
    keywords: ["waxing", "half arm", "arms"],
  },
  {
    slug: "back-waxing",
    name: "Back Waxing",
    category: "Waxing",
    price: "$30",
    duration: "",
    description:
      "Professional back waxing to remove unwanted hair and leave the skin smooth.",
    keywords: ["waxing", "back", "body waxing"],
  },
  {
    slug: "bikini-wax",
    name: "Bikini Wax",
    category: "Waxing",
    price: "$25+",
    duration: "",
    description:
      "Bikini waxing for a clean and smooth finish around the bikini area.",
    keywords: ["waxing", "bikini", "bikini wax"],
  },
  {
    slug: "brazilian-wax",
    name: "Brazilian Wax",
    category: "Waxing",
    price: "$40+",
    duration: "",
    description:
      "Professional Brazilian waxing service for a smooth and clean finish.",
    keywords: ["waxing", "brazilian", "body waxing"],
  },
  {
    slug: "belly-wax",
    name: "Belly Wax",
    category: "Waxing",
    price: "$20",
    duration: "",
    description:
      "Belly waxing to remove unwanted hair and leave the area smooth.",
    keywords: ["waxing", "belly", "stomach", "body waxing"],
  },
  {
    slug: "underarms-wax",
    name: "Underarms Wax",
    category: "Waxing",
    price: "$12",
    duration: "",
    description:
      "Underarm waxing for smooth, clean-looking skin and effective hair removal.",
    keywords: ["waxing", "underarms", "armpits"],
  },
  {
    slug: "ear-wax",
    name: "Ear Wax",
    category: "Waxing",
    price: "$15",
    duration: "",
    description:
      "Professional ear waxing for removing unwanted visible hair around the ears.",
    keywords: ["waxing", "ear", "hair removal"],
  },

  // Lashes
  {
    slug: "natural-flare-lashes",
    name: "Natural Flare Lashes",
    category: "Lashes",
    price: "$40",
    duration: "",
    description:
      "Natural flare lashes that add subtle volume and definition while maintaining a soft appearance.",
    keywords: ["lashes", "eyelashes", "natural lashes", "flare"],
  },
  {
    slug: "volume-full-flare-lashes",
    name: "Volume Full Flare Lashes",
    category: "Lashes",
    price: "$50",
    duration: "",
    description:
      "Fuller flare lashes designed to create a more dramatic and voluminous eye look.",
    keywords: ["lashes", "volume lashes", "full flare", "eyelashes"],
  },
  {
    slug: "lash-refill",
    name: "Lash Refill",
    category: "Lashes",
    price: "$15+",
    duration: "",
    description:
      "Lash refill service to refresh and maintain your existing lash look.",
    keywords: ["lashes", "lash refill", "eyelashes"],
  },
  {
    slug: "lash-tint",
    name: "Lash Tint",
    category: "Lashes",
    price: "$20",
    duration: "",
    description:
      "Lash tinting that enhances the natural appearance of your lashes with deeper definition.",
    keywords: ["lashes", "lash tint", "eyelashes", "tint"],
  },
  {
    slug: "brow-tint",
    name: "Brow Tint",
    category: "Lashes",
    price: "$20",
    duration: "",
    description:
      "Brow tinting to add definition and enhance the natural appearance of your eyebrows.",
    keywords: ["brows", "eyebrows", "brow tint", "tint"],
  },
  {
    slug: "lash-lift",
    name: "Lash Lift",
    category: "Lashes",
    price: "$50",
    duration: "",
    description:
      "A lash lift that curls and opens up the appearance of your eyes without extensions.",
    keywords: ["lashes", "lash lift", "eyelashes", "curl"],
  },
  {
    slug: "lash-lift-with-tint",
    name: "Lash Lift with Tint",
    category: "Lashes",
    price: "$60",
    duration: "",
    description:
      "A lash lift combined with tinting for beautifully curled and defined natural lashes.",
    keywords: ["lashes", "lash lift", "lash tint", "eyelashes"],
  },
  {
    slug: "brow-lamination",
    name: "Brow Lamination",
    category: "Lashes",
    price: "$50",
    duration: "",
    description:
      "Brow lamination that creates a fuller, smoother and more defined brow appearance.",
    keywords: ["brows", "eyebrows", "brow lamination"],
  },
  {
    slug: "brow-lamination-with-tint",
    name: "Brow Lamination with Tint",
    category: "Lashes",
    price: "$60",
    duration: "",
    description:
      "Brow lamination combined with tinting for fuller-looking and beautifully defined brows.",
    keywords: ["brows", "eyebrows", "lamination", "tint"],
  },

  // Facial
  {
    slug: "cleansing-facial",
    name: "Cleansing Facial",
    category: "Facial",
    price: "$35",
    duration: "",
    description:
      "A cleansing facial designed to refresh the skin and leave it feeling clean and revitalized.",
    keywords: ["facial", "cleansing", "skincare", "clean skin"],
  },
  {
    slug: "fruit-facial",
    name: "Fruit Facial",
    category: "Facial",
    price: "$45",
    duration: "",
    description:
      "A refreshing fruit facial designed to nourish the skin and enhance its natural glow.",
    keywords: ["facial", "fruit facial", "glow", "skincare"],
  },
  {
    slug: "24-carat-gold-facial",
    name: "24 Carat Gold Facial",
    category: "Facial",
    price: "$50",
    duration: "",
    description:
      "A luxurious 24 carat gold facial treatment designed to refresh and brighten the appearance of the skin.",
    keywords: ["facial", "gold facial", "24 carat gold", "skincare"],
  },
  {
    slug: "diamond-facial",
    name: "Diamond Facial",
    category: "Facial",
    price: "$55",
    duration: "",
    description:
      "A premium diamond facial treatment designed to refresh, smooth and brighten the skin.",
    keywords: ["facial", "diamond facial", "skincare", "glow"],
  },
  {
    slug: "collagen-facial",
    name: "Collagen Facial",
    category: "Facial",
    price: "$50",
    duration: "",
    description:
      "A collagen-focused facial designed to leave the skin feeling hydrated, refreshed and radiant.",
    keywords: ["facial", "collagen", "skincare", "hydration"],
  },
  {
    slug: "microdermabrasion",
    name: "Microdermabrasion",
    category: "Facial",
    price: "$75",
    duration: "",
    description:
      "A professional exfoliating treatment that helps improve the appearance and smoothness of the skin.",
    keywords: ["facial", "microdermabrasion", "exfoliation", "skincare"],
  },
];

export const categories = Array.from(
  new Set(services.map((service) => service.category))
);
import type { MembershipConfig } from "./types";

const config: MembershipConfig = {
  productName: "MealWeek",
  tagline: "Your family's week, planned in minutes.",
  primaryColor: "#4A7C59",
  secondaryColor: "#F28C38",
  fontFamily: "Poppins",
  logoText: "MealWeek",

  heroHeadline: "A weekly meal planner and grocery list app built for busy families",
  heroSubheadline: "Browse hundreds of family-friendly recipes, plan your lunches and dinners for the whole week, and get one combined grocery list ready before you hit the store.",
  benefits: [
    { title: "No more 5pm panic", description: "Assign recipes to every lunch and dinner slot for the week in one sitting — so you always know what's for dinner before hunger strikes.", icon: "🗓️" },
    { title: "One list, not seven", description: "MealWeek automatically combines ingredients across all your planned meals and merges duplicates, so you walk into the grocery store with a single, clean list.", icon: "🛒" },
    { title: "Filter for your family's needs", description: "Instantly filter recipes by cuisine type and dietary tags like vegetarian, gluten-free, or dairy-free — so every meal works for everyone at the table.", icon: "🥦" },
  ],
  ctaText: "Create your free meal plan",
  ctaSecondaryText: "Browse recipes without signing up",

  ownerEmail: "admin@mealweek.com",
  contactEmail: "admin@mealweek.com",
  privacyPolicyUrl: "/privacy",
  termsUrl: "/terms",

  features: {},

  supabaseUrl: "YOUR_SUPABASE_URL",
  supabaseAnonKey: "YOUR_SUPABASE_ANON_KEY",
  stripePublishableKey: "",

  siteUrl: "https://mealweek.com",
  metaDescription: "MealWeek helps busy families plan weekly meals, browse recipes by diet and cuisine, and auto-generate a combined grocery list. Free to join.",

  membershipName: "",
  membershipBenefits: ["", "", ""],
  monthlyPriceUsd: 29,
  yearlyPriceUsd: 249,
  stripeMonthlyPriceId: "",
  stripeYearlyPriceId: "",
  freeTrialDays: 0,
};

export default config;

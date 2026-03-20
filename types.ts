export interface TemplateConfig {
  productName: string;
  tagline: string;
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  logoText: string;

  heroHeadline: string;
  heroSubheadline: string;
  benefits: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
  ctaText: string;
  ctaSecondaryText: string;

  ownerEmail: string;
  contactEmail: string;
  privacyPolicyUrl: string;
  termsUrl: string;

  features: Record<string, boolean>;

  supabaseUrl: string;
  supabaseAnonKey: string;

  stripePublishableKey?: string;
  stripeProductId?: string;
  stripeCheckoutUrl?: string;

  posthogKey?: string;
  posthogHost?: string;

  siteUrl: string;
  metaDescription: string;
  ogImageUrl?: string;
}

export interface BookingConfig extends TemplateConfig {
  serviceName: string;
  serviceDescription: string;
  sessionDuration: number;
  bookingLeadTime: number;
  maxBookingsPerDay: number;
  adminEmail: string;
  confirmationEmailSubject: string;
  adminPassword: string;
}

export interface StorefrontConfig extends TemplateConfig {
  currency: string;
  shippingEnabled: boolean;
  digitalProduct: boolean;
  stripeWebhookSecret: string;
}

export interface MembershipConfig extends TemplateConfig {
  membershipName: string;
  membershipBenefits: string[];
  monthlyPriceUsd: number;
  yearlyPriceUsd: number;
  stripeMonthlyPriceId: string;
  stripeYearlyPriceId: string;
  freeTrialDays: number;
}

export interface DirectoryConfig extends TemplateConfig {
  directoryType: string;
  listingNoun: string;
  filterableFields: string[];
  submissionFee: number;
  requiresApproval: boolean;
}

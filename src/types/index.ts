// ── UI Primitives ──

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  class?: string;
}

export interface CardProps {
  variant?: 'default' | 'glass' | 'elevated';
  class?: string;
}

export interface BadgeProps {
  variant?: 'primary' | 'secondary' | 'accent';
  class?: string;
}

export interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  badge?: string;
  align?: 'left' | 'center';
}

export interface ContainerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  class?: string;
}

// ── Data Models ──

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  href: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar?: string;
  rating: number;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
  social?: {
    linkedin?: string;
    twitter?: string;
  };
}

export interface Partner {
  name: string;
  logo: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

export interface Stat {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
}

// ── Calculator ──

export interface LoanInput {
  amount: number;
  annualRate: number;
  termMonths: number;
}

export interface LoanResult {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  schedule: AmortizationEntry[];
}

export interface AmortizationEntry {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

// ── SEO ──

export interface SiteConfig {
  name: string;
  url: string;
  logo: string;
  description: string;
  telephone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  social: string[];
}

export interface LayoutProps {
  title: string;
  description: string;
  image?: string;
  url: string;
  type?: 'website' | 'article';
  jsonLd?: object | null;
}

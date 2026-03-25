import type { SiteConfig, Service } from '../types/index';

export function generateOrganizationJsonLd(config: SiteConfig): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: config.name,
    url: config.url,
    logo: `${config.url}${config.logo}`,
    description: config.description,
    telephone: config.telephone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: config.address.street,
      addressLocality: config.address.city,
      addressRegion: config.address.state,
      postalCode: config.address.zip,
      addressCountry: config.address.country,
    },
    sameAs: config.social,
  };
}

export function generateLocalBusinessJsonLd(config: SiteConfig): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'FinancialService',
    name: config.name,
    url: config.url,
    logo: `${config.url}${config.logo}`,
    description: config.description,
    telephone: config.telephone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: config.address.street,
      addressLocality: config.address.city,
      addressRegion: config.address.state,
      postalCode: config.address.zip,
      addressCountry: config.address.country,
    },
    sameAs: config.social,
    openingHours: 'Mo-Fr 08:00-17:00',
    priceRange: '$$',
  };
}

export function generateServiceJsonLd(services: Service[], config: SiteConfig): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: config.name,
    url: config.url,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Servicios Financieros',
      itemListElement: services.map((service) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: service.title,
          description: service.description,
          provider: {
            '@type': 'Organization',
            name: config.name,
          },
          areaServed: {
            '@type': 'Country',
            name: 'Honduras',
          },
        },
      })),
    },
  };
}

export function generateWebAppJsonLd(name: string, description: string, url: string): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name,
    description,
    url,
    applicationCategory: 'FinanceApplication',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'HNL',
    },
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript',
  };
}

export function generateBreadcrumbJsonLd(items: { name: string; url: string }[]): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateFaqJsonLd(faqs: { question: string; answer: string }[]): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

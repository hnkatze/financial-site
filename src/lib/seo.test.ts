import { describe, it, expect } from 'vitest';
import {
  generateOrganizationJsonLd,
  generateLocalBusinessJsonLd,
  generateServiceJsonLd,
  generateWebAppJsonLd,
  generateBreadcrumbJsonLd,
  generateFaqJsonLd,
} from './seo';
import type { SiteConfig, Service } from '../types/index';

const mockSiteConfig: SiteConfig = {
  name: 'TestFinance',
  url: 'https://test.com',
  logo: '/logo.svg',
  description: 'Test financial company',
  telephone: '+504 0000-0000',
  address: {
    street: 'Test Street 123',
    city: 'Tegucigalpa',
    state: 'Francisco Morazán',
    zip: '11101',
    country: 'HN',
  },
  social: ['https://facebook.com/test', 'https://instagram.com/test'],
};

const mockServices: Service[] = [
  {
    id: 'loans',
    title: 'Préstamos',
    description: 'Test loans',
    icon: 'banknotes',
    features: ['Feature 1'],
    href: '/services#loans',
  },
  {
    id: 'insurance',
    title: 'Seguros',
    description: 'Test insurance',
    icon: 'shield',
    features: ['Feature 1'],
    href: '/services#insurance',
  },
];

describe('generateOrganizationJsonLd', () => {
  it('generates valid Organization schema', () => {
    const result = generateOrganizationJsonLd(mockSiteConfig);

    expect(result).toHaveProperty('@context', 'https://schema.org');
    expect(result).toHaveProperty('@type', 'Organization');
    expect(result).toHaveProperty('name', 'TestFinance');
    expect(result).toHaveProperty('url', 'https://test.com');
    expect(result).toHaveProperty('logo', 'https://test.com/logo.svg');
    expect(result).toHaveProperty('description', 'Test financial company');
    expect(result).toHaveProperty('telephone', '+504 0000-0000');
  });

  it('includes full address', () => {
    const result = generateOrganizationJsonLd(mockSiteConfig) as Record<string, unknown>;
    const address = result.address as Record<string, unknown>;

    expect(address).toHaveProperty('@type', 'PostalAddress');
    expect(address).toHaveProperty('streetAddress', 'Test Street 123');
    expect(address).toHaveProperty('addressLocality', 'Tegucigalpa');
    expect(address).toHaveProperty('addressCountry', 'HN');
  });

  it('includes social links', () => {
    const result = generateOrganizationJsonLd(mockSiteConfig) as Record<string, unknown>;

    expect(result.sameAs).toEqual([
      'https://facebook.com/test',
      'https://instagram.com/test',
    ]);
  });
});

describe('generateLocalBusinessJsonLd', () => {
  it('generates FinancialService type', () => {
    const result = generateLocalBusinessJsonLd(mockSiteConfig);

    expect(result).toHaveProperty('@type', 'FinancialService');
  });

  it('includes opening hours and price range', () => {
    const result = generateLocalBusinessJsonLd(mockSiteConfig) as Record<string, unknown>;

    expect(result).toHaveProperty('openingHours', 'Mo-Fr 08:00-17:00');
    expect(result).toHaveProperty('priceRange', '$$');
  });
});

describe('generateServiceJsonLd', () => {
  it('generates OfferCatalog with correct number of services', () => {
    const result = generateServiceJsonLd(mockServices, mockSiteConfig) as Record<string, unknown>;
    const catalog = result.hasOfferCatalog as Record<string, unknown>;
    const items = catalog.itemListElement as unknown[];

    expect(catalog).toHaveProperty('@type', 'OfferCatalog');
    expect(items).toHaveLength(2);
  });

  it('each service has correct structure', () => {
    const result = generateServiceJsonLd(mockServices, mockSiteConfig) as Record<string, unknown>;
    const catalog = result.hasOfferCatalog as Record<string, unknown>;
    const items = catalog.itemListElement as Record<string, unknown>[];
    const firstItem = items[0].itemOffered as Record<string, unknown>;

    expect(firstItem).toHaveProperty('@type', 'Service');
    expect(firstItem).toHaveProperty('name', 'Préstamos');
    expect(firstItem).toHaveProperty('description', 'Test loans');
  });

  it('handles empty services array', () => {
    const result = generateServiceJsonLd([], mockSiteConfig) as Record<string, unknown>;
    const catalog = result.hasOfferCatalog as Record<string, unknown>;
    const items = catalog.itemListElement as unknown[];

    expect(items).toHaveLength(0);
  });
});

describe('generateWebAppJsonLd', () => {
  it('generates WebApplication schema', () => {
    const result = generateWebAppJsonLd(
      'Calculadora',
      'Test calculator',
      'https://test.com/calculator',
    );

    expect(result).toHaveProperty('@type', 'WebApplication');
    expect(result).toHaveProperty('name', 'Calculadora');
    expect(result).toHaveProperty('applicationCategory', 'FinanceApplication');
  });

  it('includes free offer in HNL', () => {
    const result = generateWebAppJsonLd('Test', 'Desc', 'https://test.com') as Record<string, unknown>;
    const offers = result.offers as Record<string, unknown>;

    expect(offers).toHaveProperty('price', '0');
    expect(offers).toHaveProperty('priceCurrency', 'HNL');
  });
});

describe('generateBreadcrumbJsonLd', () => {
  it('generates BreadcrumbList with correct positions', () => {
    const items = [
      { name: 'Inicio', url: 'https://test.com' },
      { name: 'Servicios', url: 'https://test.com/services' },
    ];
    const result = generateBreadcrumbJsonLd(items) as Record<string, unknown>;
    const elements = result.itemListElement as Record<string, unknown>[];

    expect(result).toHaveProperty('@type', 'BreadcrumbList');
    expect(elements).toHaveLength(2);
    expect(elements[0]).toHaveProperty('position', 1);
    expect(elements[1]).toHaveProperty('position', 2);
    expect(elements[0]).toHaveProperty('name', 'Inicio');
  });

  it('handles single breadcrumb item', () => {
    const result = generateBreadcrumbJsonLd([
      { name: 'Inicio', url: 'https://test.com' },
    ]) as Record<string, unknown>;
    const elements = result.itemListElement as unknown[];

    expect(elements).toHaveLength(1);
  });
});

describe('generateFaqJsonLd', () => {
  it('generates FAQPage schema', () => {
    const faqs = [
      { question: '¿Qué tasa ofrecen?', answer: 'Desde 8.5%' },
      { question: '¿Cuánto tarda?', answer: '24 horas' },
    ];
    const result = generateFaqJsonLd(faqs) as Record<string, unknown>;
    const entities = result.mainEntity as Record<string, unknown>[];

    expect(result).toHaveProperty('@type', 'FAQPage');
    expect(entities).toHaveLength(2);
    expect(entities[0]).toHaveProperty('@type', 'Question');
    expect(entities[0]).toHaveProperty('name', '¿Qué tasa ofrecen?');
  });

  it('each answer has correct structure', () => {
    const faqs = [{ question: 'Test?', answer: 'Test answer' }];
    const result = generateFaqJsonLd(faqs) as Record<string, unknown>;
    const entities = result.mainEntity as Record<string, unknown>[];
    const answer = entities[0].acceptedAnswer as Record<string, unknown>;

    expect(answer).toHaveProperty('@type', 'Answer');
    expect(answer).toHaveProperty('text', 'Test answer');
  });

  it('handles empty FAQ array', () => {
    const result = generateFaqJsonLd([]) as Record<string, unknown>;
    const entities = result.mainEntity as unknown[];

    expect(entities).toHaveLength(0);
  });
});

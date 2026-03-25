import type { SiteConfig } from '../types/index';

interface SiteData extends SiteConfig {
  email: string;
}

export const siteData = {
  name: 'FinanzaPro',
  url: 'https://www.example.com',
  logo: '/images/logo.svg',
  description: 'Soluciones financieras integrales para personas y empresas en Honduras. Préstamos, inversiones, seguros y asesoría financiera personalizada.',
  telephone: '+504 2235-8800',
  email: 'info@finanzapro.hn',
  address: {
    street: 'Boulevard Morazán, Torre Financiera, Piso 12',
    city: 'Tegucigalpa',
    state: 'Francisco Morazán',
    zip: '11101',
    country: 'HN',
  },
  social: [
    'https://facebook.com/finanzapro',
    'https://instagram.com/finanzapro',
    'https://linkedin.com/company/finanzapro',
    'https://twitter.com/finanzapro',
  ],
} satisfies SiteData;

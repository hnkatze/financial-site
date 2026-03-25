import type { Partner } from '../types/index';

export const partners = [
  { name: 'Banco Central de Honduras', logo: '/images/partners/bch.svg' },
  { name: 'CNBS', logo: '/images/partners/cnbs.svg' },
  { name: 'Cámara de Comercio de Tegucigalpa', logo: '/images/partners/cct.svg' },
  { name: 'COHEP', logo: '/images/partners/cohep.svg' },
  { name: 'BCIE', logo: '/images/partners/bcie.svg' },
  { name: 'AHM', logo: '/images/partners/ahm.svg' },
] as const satisfies readonly Partner[];

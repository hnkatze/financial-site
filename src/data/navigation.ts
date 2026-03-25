import type { NavItem } from '../types/index';

export const navigation = [
  { label: 'Inicio', href: '/' },
  { label: 'Nosotros', href: '/about' },
  { label: 'Servicios', href: '/services' },
  { label: 'Contacto', href: '/contact' },
  { label: 'Calculadora', href: '/calculator' },
] as const satisfies readonly NavItem[];

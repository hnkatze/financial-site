import type { Service } from '../types/index';

export const services = [
  {
    id: 'prestamos-personales',
    title: 'Préstamos Personales',
    description: 'Financiamiento flexible adaptado a tus necesidades. Tasas competitivas y plazos desde 12 hasta 60 meses con aprobación rápida.',
    icon: 'banknotes',
    features: [
      'Tasas desde 8.5% anual',
      'Plazos de 12 a 60 meses',
      'Aprobación en 24 horas',
      'Sin penalización por pago anticipado',
      'Montos desde L. 10,000 hasta L. 500,000',
    ],
    href: '/services#prestamos-personales',
  },
  {
    id: 'creditos-empresariales',
    title: 'Créditos Empresariales',
    description: 'Impulsa el crecimiento de tu negocio con líneas de crédito diseñadas para empresas de todos los tamaños.',
    icon: 'building-office',
    features: [
      'Líneas de crédito rotativas',
      'Capital de trabajo y expansión',
      'Asesoría financiera incluida',
      'Plazos hasta 120 meses',
      'Garantías flexibles',
    ],
    href: '/services#creditos-empresariales',
  },
  {
    id: 'inversiones',
    title: 'Inversiones y Ahorro',
    description: 'Haz crecer tu patrimonio con nuestros productos de inversión y ahorro con rendimientos garantizados.',
    icon: 'chart-bar',
    features: [
      'Certificados de depósito a plazo',
      'Fondos de inversión diversificados',
      'Rendimientos competitivos',
      'Asesoría personalizada',
      'Acceso en línea a tu portafolio',
    ],
    href: '/services#inversiones',
  },
  {
    id: 'seguros',
    title: 'Seguros y Protección',
    description: 'Protege lo que más importa con nuestros planes de seguros integrales para ti y tu familia.',
    icon: 'shield-check',
    features: [
      'Seguro de vida y accidentes',
      'Seguro de hogar y vehículo',
      'Planes familiares con descuento',
      'Cobertura internacional',
      'Proceso de reclamo simplificado',
    ],
    href: '/services#seguros',
  },
  {
    id: 'asesoria-financiera',
    title: 'Asesoría Financiera',
    description: 'Planifica tu futuro financiero con la guía de nuestros expertos certificados en planificación patrimonial.',
    icon: 'academic-cap',
    features: [
      'Planificación de retiro',
      'Optimización fiscal',
      'Gestión de deudas',
      'Educación financiera',
      'Plan financiero personalizado',
    ],
    href: '/services#asesoria-financiera',
  },
] as const satisfies readonly Service[];

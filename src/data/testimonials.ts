import type { Testimonial } from '../types/index';

export const testimonials = [
  {
    id: 'testimonial-1',
    name: 'María Fernanda López',
    role: 'Gerente General',
    company: 'Distribuidora del Norte',
    content: 'Gracias a FinanzaPro pudimos obtener el crédito empresarial que necesitábamos para expandir nuestras operaciones. El proceso fue rápido y transparente, y la asesoría que recibimos fue invaluable.',
    rating: 5,
  },
  {
    id: 'testimonial-2',
    name: 'Carlos Alberto Reyes',
    role: 'Emprendedor',
    company: 'TechStart Honduras',
    content: 'Como emprendedor, encontrar financiamiento confiable es difícil. FinanzaPro no solo me otorgó el préstamo, sino que me asesoraron para optimizar mis finanzas personales y empresariales.',
    rating: 5,
  },
  {
    id: 'testimonial-3',
    name: 'Ana Patricia Hernández',
    role: 'Directora de Operaciones',
    company: 'Grupo Comercial Centroamericano',
    content: 'Llevamos más de 5 años trabajando con FinanzaPro y su servicio siempre ha sido excepcional. Sus productos de inversión nos han ayudado a hacer crecer nuestro patrimonio de manera sostenida.',
    rating: 5,
  },
  {
    id: 'testimonial-4',
    name: 'Roberto Alejandro Mejía',
    role: 'Ingeniero Civil',
    company: 'Constructora Mejía & Asociados',
    content: 'El préstamo personal que obtuve con FinanzaPro tenía las mejores condiciones del mercado. La atención al cliente es de primera y el proceso de aprobación fue increíblemente rápido.',
    rating: 4,
  },
] as const satisfies readonly Testimonial[];

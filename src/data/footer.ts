export const footerData = {
  sections: {
    services: {
      heading: 'Servicios',
      links: [
        { label: 'Préstamos Personales', href: '/services#prestamos-personales' },
        { label: 'Créditos Empresariales', href: '/services#creditos-empresariales' },
        { label: 'Inversiones y Ahorro', href: '/services#inversiones' },
        { label: 'Seguros y Protección', href: '/services#seguros' },
        { label: 'Asesoría Financiera', href: '/services#asesoria-financiera' },
      ],
    },
    company: {
      heading: 'Empresa',
      links: [
        { label: 'Nosotros', href: '/about' },
        { label: 'Servicios', href: '/services' },
        { label: 'Calculadora', href: '/calculator' },
        { label: 'Contacto', href: '/contact' },
      ],
    },
    legal: {
      heading: 'Legal',
      links: [
        { label: 'Términos y Condiciones', href: '#' },
        { label: 'Política de Privacidad', href: '#' },
        { label: 'Aviso Legal', href: '#' },
      ],
    },
    contact: {
      heading: 'Contacto',
    },
  },
  socialAriaLabels: {
    facebook: 'Visitar nuestra página de Facebook',
    instagram: 'Visitar nuestro perfil de Instagram',
    linkedin: 'Visitar nuestro perfil de LinkedIn',
    twitter: 'Visitar nuestro perfil de Twitter',
  },
  copyright: 'Todos los derechos reservados.',
} as const;

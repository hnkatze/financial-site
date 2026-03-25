export const contactContent = {
  hero: {
    badge: 'Estamos para ayudarte',
    title: 'Contáctanos',
    subtitle: 'Nuestro equipo de asesores está listo para ayudarte a encontrar la solución financiera ideal. Escríbenos o visítanos.',
  },
  form: {
    sectionTitle: 'Envíanos un mensaje',
    sectionSubtitle: 'Completa el formulario y nos pondremos en contacto contigo lo antes posible.',
    fields: {
      name: {
        label: 'Nombre completo',
        placeholder: 'Ej: María Fernández',
        error: 'Por favor ingresa tu nombre completo.',
      },
      email: {
        label: 'Correo electrónico',
        placeholder: 'correo@ejemplo.com',
        error: 'Por favor ingresa un correo electrónico válido.',
      },
      phone: {
        label: 'Teléfono',
        placeholder: '+504 9999-0000',
      },
      subject: {
        label: 'Asunto',
        defaultOption: 'Selecciona un asunto',
        options: [
          { value: 'prestamos', label: 'Préstamos Personales' },
          { value: 'creditos', label: 'Créditos Empresariales' },
          { value: 'inversiones', label: 'Inversiones y Ahorro' },
          { value: 'seguros', label: 'Seguros y Protección' },
          { value: 'asesoria', label: 'Asesoría Financiera' },
          { value: 'otro', label: 'Otro' },
        ],
      },
      message: {
        label: 'Mensaje',
        placeholder: 'Cuéntanos cómo podemos ayudarte...',
        error: 'Por favor ingresa un mensaje de al menos 10 caracteres.',
      },
    },
    submitText: 'Enviar Mensaje',
    success: {
      title: '¡Mensaje enviado!',
      text: 'Esto es una demostración. En producción, tu mensaje sería procesado por nuestro equipo.',
    },
    requiredIndicator: '*',
  },
  sidebar: {
    address: {
      title: 'Dirección',
      countryLabel: 'Honduras',
    },
    phone: {
      title: 'Teléfono',
      hours: 'Lunes a Viernes, 8:00 AM - 5:00 PM',
    },
    email: {
      title: 'Correo electrónico',
      responseTime: 'Respondemos en menos de 24 horas',
    },
    social: {
      title: 'Síguenos',
      ariaLabels: {
        facebook: 'Facebook de FinanzaPro',
        instagram: 'Instagram de FinanzaPro',
        linkedin: 'LinkedIn de FinanzaPro',
        twitter: 'Twitter de FinanzaPro',
      },
    },
  },
} as const;

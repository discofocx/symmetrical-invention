/**
 * Global site configuration
 * Contains values that are used throughout the site
 */

export const siteConfig = {
  name: "Altivento",
  description: "Más de 30 años creando estructuras memorables para eventos sociales y corporativos.",
  contact: {
    phone: "+52 (442) 190-0928",
    email: "hola@altivento.mx",
    whatsapp: "524421900928", // International format for Mexico (+52) + area code + number
    address: "Querétaro, México"
  },
  social: {
    facebook: "https://facebook.com/altivento.mx",
    instagram: "https://instagram.com/altivento.mx",
    youtube: "https://youtube.com/@altivento"
  },
  email: {
    formSubmission: {
      from: "noreply@altivento.mx",
      to: "erica@altivento.mx", // Primary recipient for form submissions
      cc: "gerardo@altivento.mx" // Secondary recipient
    }
  },
  whatsapp: {
    defaultMessage: "Hola, estoy interesado en sus servicios para un evento."
  }
};

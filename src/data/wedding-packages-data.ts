import { WeddingPackageData } from "@/types/wedding-packages-types";

export const weddingPackageData: WeddingPackageData = {
  venue: {
    name: "Quinta El Refugio",
    price: 20000,
    description: "Un hermoso espacio para celebrar tu boda, con amplios jardines y vistas panorámicas. Ubicado a solo 15 minutos del centro de Querétaro.",
    image: "/images/bodas/laquinta.webp",
    features: [
      "Uso exclusivo del jardín principal (capacidad hasta 500 personas)",
      "Estacionamiento privado para 80 vehículos",
      "Acceso a salón interior climatizado para 150 personas",
      "Baños para damas y caballeros con servicio de limpieza",
      "Apoyo vial y seguridad durante el evento",
      "Horario de uso: 8 horas (extensión disponible por costo adicional)"
    ]
  },
  
  packages: [
    {
      id: "esencial",
      name: "Boda Esencial",
      description: "Paquete básico con todo lo necesario para una celebración íntima y elegante.",
      features: [
        // Core features - present in all packages
        "Carpa 15×15m, plafón liso blanco (4m altura)",
        "Pista 25m² (5×5m) pintada a un tono",
        "Estrado para novios 2.44×3.66m",
        "Planta de luz 70 KVA",
        // Premium features - empty placeholders
        "-",
        "-",
        // Luxury features - empty placeholders
        "-",
        "-",
        "-"
      ],
      basePrice: {
        "150": 23000,
        "200": 26000,
        "250": 29000,
        "300": 32000,
        "350": 35000,
        "400": 38000,
        "450": 41000
      }
    },
    {
      id: "plus",
      name: "Boda Plus",
      description: "Paquete mejorado con opciones de personalización y mayor comodidad para tus invitados.",
      features: [
        // Core features - upgraded versions
        "Carpa Alemana 15×20m, plafón plisado en V (blanco, negro o ivory)",
        "Pista 30m² (4.88×6.10m) en charol, laminado o duela",
        "Estrado para novios 2.44×3.66m",
        "Planta de luz 70 KVA",
        // Premium features - empty placeholders
        "-",
        "-",
        // Luxury features - empty placeholders
        "-",
        "-",
        "-"
      ],
      basePrice: {
        "150": 37000,
        "200": 41000,
        "250": 45000,
        "300": 49000,
        "350": 53000,
        "400": 57000,
        "450": 61000
      }
    },
    {
      id: "premium",
      name: "Boda Premium",
      description: "Una experiencia excepcional con elementos de diseño que harán de tu boda un evento inolvidable.",
      features: [
        // Core features - upgraded versions
        "Carpa 15×20m, 5m altura, transparente con botón y olas",
        "Pista 30m² (4.88×6.10m) con diseño personalizado",
        "Estrado para novios con diseño personalizado",
        "Planta de luz 70 KVA",
        // Premium features - added in this tier
        "Barra con diseño personalizado",
        "Estrado para DJ",
        // Luxury features - empty placeholders
        "-",
        "-",
        "-"
      ],
      basePrice: {
        "150": 55200,
        "200": 60200,
        "250": 65200,
        "300": 70200,
        "350": 75200,
        "400": 80200,
        "450": 85200
      }
    },
    {
      id: "lujo",
      name: "Boda de Lujo",
      description: "La experiencia más completa y lujosa, con detalles exclusivos para una celebración verdaderamente extraordinaria.",
      features: [
        // Core features - luxurious versions
        "Carpa 15×20m, botón, iluminación arquitectónica en postes",
        "Pista 30m² (4.88×6.10m) con diseño personalizado premium",
        "Estrado para novios con lienzos de tela diagonales",
        "Planta de luz 70 KVA",
        // Premium features - upgraded versions
        "Barra con diseño personalizado premium",
        "Estrado para DJ con iluminación",
        // Luxury features - exclusive to this tier
        "Jardín flotante con iluminación retro",
        "Iluminación de área de cóctel con focos retro",
        "Decoración floral en áreas selectas"
      ],
      basePrice: {
        "150": 80000,
        "200": 85000,
        "250": 90000,
        "300": 95000,
        "350": 100000,
        "400": 105000,
        "450": 110000
      }
    }
  ],
  
  addOns: [
    {
      id: "iluminacion-arquitectonica",
      name: "Iluminación arquitectónica adicional",
      description: "Iluminación profesional para destacar elementos arquitectónicos del espacio, incluye 8 luces LED de colores.",
      price: 6000
    },
    {
      id: "faroles",
      name: "Conjunto de faroles decorativos",
      description: "12 faroles decorativos para exterior con velas LED para iluminar caminos y áreas de jardín.",
      price: 7500
    },
    {
      id: "jardin-flotante",
      name: "Jardín flotante con iluminación",
      description: "Instalación floral suspendida con iluminación integrada para crear un ambiente mágico sobre la pista de baile o área de comedor.",
      price: 15000
    },
    {
      id: "back-telas",
      name: "Back de telas para fotografías",
      description: "Fondo decorativo de telas para área de fotografías o estrado, disponible en varios colores para complementar la paleta de tu evento.",
      price: 8000
    },
    {
      id: "area-lounge",
      name: "Área lounge exterior",
      description: "Montaje de área lounge con 3 salas, mesas de centro, y sombrillas para exterior. Ideal para crear un espacio de descanso para tus invitados.",
      price: 12000
    },
    {
      id: "tapete-ceremonial",
      name: "Tapete ceremonial",
      description: "Elegante pasillo alfombrado de 15m de largo para tu ceremonia, disponible en blanco, rojo o beige.",
      price: 4500
    }
  ],
  
  guestCountOptions: [150, 200, 250, 300, 350, 400, 450]
};
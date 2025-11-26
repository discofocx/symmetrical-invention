import { WeddingPackageData } from "@/types/wedding-packages-types";

export const weddingPackageData: WeddingPackageData = {
  venue: {
    name: "Quinta El Refugio",
    basePrice: 20000, // Precio base por 150 pax
    basePax: 150,
    pricePerExtraPax: 50, // $50 MXN por cada invitado adicional
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
        "Planta de luz 45 KVA",
        // Premium features - empty placeholders
        "-",
        "-",
        // Luxury features - empty placeholders
        "-",
        "-",
        "-"
      ],
      basePrice: {
        "150": 25000, // + 2000 MXN
        "200": 28000,
        "250": 31000,
        "300": 34000,
        "350": 37000,
        "400": 40000,
        "450": 43000
      }
    },
    {
      id: "plus",
      name: "Boda Plus",
      description: "Paquete mejorado con opciones de personalización y mayor comodidad para tus invitados.",
      features: [
        // Core features - upgraded versions
        "Carpa Alemana 15×20m, plafón plisado en V (blanco, negro o ivory)", // 25,500
        "Pista 30m² (4.88×6.10m) en charol, laminado o duela", // 4,500
        "Estrado para novios 2.44×3.66m", 
        "Planta de luz 45 KVA",
        // Premium features - empty placeholders
        "-",
        "-",
        // Luxury features - empty placeholders
        "-",
        "-",
        "-"
      ],
      basePrice: {
        "150": 39000, // + 2000 mxn
        "200": 43000,
        "250": 47000,
        "300": 51000,
        "350": 55000,
        "400": 59000,
        "450": 63000
      }
    },
    {
      id: "premium",
      name: "Boda Premium",
      description: "Una experiencia excepcional con elementos de diseño que harán de tu boda un evento inolvidable.",
      features: [
        // Core features - upgraded versions
        "Carpa 15×20m, 5m altura, transparente con botón y olas",
        "Pista 30m² (4.88×6.10m) con diseño personalizado", // 10000
        "Estrado para novios con diseño personalizado", // 3800
        "Planta de luz 45 KVA", // 5000
        // Premium features - added in this tier
        "Barra con diseño personalizado", // 2000
        "Estrado para DJ", //
        // Luxury features - empty placeholders
        "-",
        "-",
        "-"
      ],
      basePrice: {
        "150": 57000,
        "200": 62000,
        "250": 67000,
        "300": 72000,
        "350": 77000,
        "400": 82000,
        "450": 87000
      }
    },
    {
      id: "lujo",
      name: "Boda de Lujo",
      description: "La experiencia más completa y lujosa, con detalles exclusivos para una celebración verdaderamente extraordinaria.",
      features: [
        // Core features - luxurious versions
        "Carpa 15×20m, botón, iluminación arquitectónica en postes", // 38000
        "Pista 30m² (4.88×6.10m) con diseño personalizado premium", // 10000
        "Estrado para novios con lienzos de tela diagonales", // 5300
        "Planta de luz 45 KVA", // 5000
        // Premium features - upgraded versions
        "Barra con diseño personalizado premium", // 2000
        "Estrado para DJ", // 1800
        // Luxury features - exclusive to this tier
        "Jardín flotante con iluminación retro", // 12000
        "Iluminación de área de cóctel con focos retro", // 3000
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
      description: "10 faroles decorativos dentro de la carpa.",
      price: 7500
    },
    {
      id: "jardin-flotante",
      name: "Jardín flotante con iluminación",
      description: "Instalación floral suspendida con iluminación integrada para crear un ambiente mágico sobre la pista de baile o área de comedor.",
      price: 12000
    },
    {
      id: "back-telas",
      name: "Back de telas para fotografías",
      description: "Fondo decorativo de telas para área de fotografías o estrado, disponible en varios colores para complementar la paleta de tu evento.",
      price: 6000
    },
    {
      id: "area-lounge",
      name: "Área lounge exterior",
      description: "Montaje de área lounge con 2 salas y mesas de centro, 4 periqueras, y 2 sombrillas para exterior. Ideal para crear un espacio de descanso para tus invitados.",
      price: 12000
    },
  ],
  
  guestCountOptions: [150, 200, 250, 300, 350, 400, 450]
};
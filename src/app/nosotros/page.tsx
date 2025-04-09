// src/app/nosotros/page.tsx
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Nosotros - Altivento',
  description: 'Conoce a Altivento, más de 30 años de experiencia creando infraestructuras para eventos en Querétaro y alrededores.',
};

export default function AboutPage() {
  // Sample team members data
  const teamMembers = [
    {
      name: 'Roberto Sánchez',
      position: 'Director General',
      bio: 'Fundador de Altivento con más de 30 años de experiencia en el sector de eventos.',
      image: '/images/placeholders/about/team-member.svg',
    },
    {
      name: 'Laura Méndez',
      position: 'Gerente de Operaciones',
      bio: 'Especialista en logística y planificación de eventos con 15 años de experiencia.',
      image: '/images/placeholders/about/team-member.svg',
    },
    {
      name: 'Carlos Jiménez',
      position: 'Jefe de Instalación',
      bio: 'Responsable de supervisar todos los montajes y garantizar la calidad en cada evento.',
      image: '/images/placeholders/about/team-member.svg',
    },
  ];

  // Sample values/pillars
  const values = [
    {
      title: 'Calidad',
      description: 'Empleamos solo materiales de la más alta calidad, con revisiones periódicas para garantizar su perfecto estado.',
      icon: '✓',
    },
    {
      title: 'Experiencia',
      description: 'Más de tres décadas en el sector nos permiten anticipar y resolver cualquier desafío en tu evento.',
      icon: '✓',
    },
    {
      title: 'Personalización',
      description: 'Adaptamos nuestros servicios a las necesidades específicas de cada cliente y tipo de evento.',
      icon: '✓',
    },
    {
      title: 'Innovación',
      description: 'Renovamos constantemente nuestro inventario con las últimas tendencias en diseño y tecnología.',
      icon: '✓',
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="bg-forest text-cream py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-boska font-bold mb-6">
                Nuestra Historia
              </h1>
              <p className="text-lg mb-6">
                Desde 1990, Altivento se ha establecido como el referente en infraestructura para eventos en Querétaro, combinando calidad y servicio excepcional en cada proyecto.
              </p>
              <div className="flex space-x-4">
                <Link 
                  href="/contacto"
                  className="bg-peach text-forest px-6 py-3 rounded-full font-medium transition-colors hover:bg-peach/90"
                >
                  Contactar
                </Link>
                <Link 
                  href="/galeria"
                  className="bg-transparent border-2 border-cream text-cream px-6 py-3 rounded-full font-medium transition-colors hover:bg-cream/10"
                >
                  Ver Proyectos
                </Link>
              </div>
            </div>
            <div className="relative h-64 md:h-96 rounded-lg overflow-hidden">
              <Image
                src="/images/placeholders/about/company.svg"
                alt="Altivento historia"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="aspect-[4/3] rounded-lg relative overflow-hidden">
                <Image
                  src="/images/placeholders/about/history.svg"
                  alt="Historia de Altivento"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl font-boska font-bold text-forest mb-6">
                De pequeños inicios a grandes proyectos
              </h2>
              <p className="mb-4">
                Altivento nació como un pequeño negocio familiar en 1990, cuando Roberto Sánchez, tras años de experiencia en el sector de eventos, decidió crear una empresa especializada en infraestructuras para eventos sociales y corporativos en Querétaro.
              </p>
              <p className="mb-4">
                Lo que comenzó con un pequeño inventario de carpas básicas ha evolucionado hasta convertirnos en la empresa líder en el sector, con capacidad para atender eventos de cualquier escala, desde íntimas celebraciones familiares hasta grandes eventos corporativos y gubernamentales.
              </p>
              <p>
                Nuestro crecimiento se ha basado en una filosofía clara: ofrecer la mejor calidad, cumplir siempre con nuestros compromisos y adaptarnos constantemente a las nuevas tendencias del mercado.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-sand/30 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-boska font-bold text-forest mb-12 text-center">
            Altivento en Cifras
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-boska font-bold text-peach mb-2">+30</div>
              <div className="text-forest font-medium">Años de experiencia</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-boska font-bold text-peach mb-2">+5,000</div>
              <div className="text-forest font-medium">Eventos realizados</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-boska font-bold text-peach mb-2">25</div>
              <div className="text-forest font-medium">Profesionales en nuestro equipo</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-boska font-bold text-peach mb-2">98%</div>
              <div className="text-forest font-medium">Clientes satisfechos</div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-boska font-bold text-forest mb-4 text-center">
            Nuestros Valores
          </h2>
          <p className="text-lg text-forest/80 mb-12 text-center max-w-3xl mx-auto">
            Estos son los pilares que guían cada aspecto de nuestro negocio y definen cómo trabajamos con nuestros clientes.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-cream p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-peach/20 rounded-full flex items-center justify-center text-peach text-xl mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-boska font-bold text-forest mb-2">{value.title}</h3>
                <p className="text-forest/80">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-16 bg-sand/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-boska font-bold text-forest mb-4 text-center">
            Nuestro Equipo
          </h2>
          <p className="text-lg text-forest/80 mb-12 text-center max-w-3xl mx-auto">
            Detrás de cada evento exitoso hay un equipo apasionado y experimentado trabajando para superar tus expectativas.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-cream rounded-lg overflow-hidden shadow-sm">
                <div className="aspect-square relative">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-boska font-bold text-forest mb-1">{member.name}</h3>
                  <p className="text-peach mb-3">{member.position}</p>
                  <p className="text-forest/80">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-boska font-bold text-forest mb-6">
                ¿Por qué elegir Altivento?
              </h2>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-peach mr-3 text-xl">✓</span>
                  <div>
                    <h3 className="font-bold text-forest mb-1">Materiales de primera calidad</h3>
                    <p className="text-forest/80">Todas nuestras estructuras se fabrican con materiales de alta resistencia y se someten a mantenimiento constante.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-peach mr-3 text-xl">✓</span>
                  <div>
                    <h3 className="font-bold text-forest mb-1">Equipo profesional</h3>
                    <p className="text-forest/80">Contamos con personal capacitado y especializado en cada área, desde el diseño hasta la instalación.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-peach mr-3 text-xl">✓</span>
                  <div>
                    <h3 className="font-bold text-forest mb-1">Servicio integral</h3>
                    <p className="text-forest/80">Ofrecemos soluciones completas, desde la asesoría inicial hasta el desmontaje, para que no tengas que preocuparte por nada.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-peach mr-3 text-xl">✓</span>
                  <div>
                    <h3 className="font-bold text-forest mb-1">Atención a los detalles</h3>
                    <p className="text-forest/80">Nos distinguimos por nuestra meticulosidad en cada aspecto, garantizando resultados impecables.</p>
                  </div>
                </li>
              </ul>
            </div>
            <div>
              <div className="aspect-[4/3] rounded-lg relative overflow-hidden">
                <Image
                  src="/images/placeholders/about/event-setup.svg"
                  alt="Montaje de evento Altivento"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-forest text-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-boska font-bold mb-12 text-center">
            Lo que dicen nuestros clientes
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/5 p-6 rounded-lg">
              <blockquote className="mb-4 text-lg font-boska italic">
                &quot;Elegimos Altivento para nuestra boda y fue una decisión acertada. Desde la asesoría inicial hasta el desmontaje, todo fue perfecto. La carpa quedó espectacular y nuestros invitados no paraban de elogiarla.&quot;
              </blockquote>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-peach/20 rounded-full mr-3"></div>
                <div>
                  <p className="font-medium">María y Juan</p>
                  <p className="text-cream/70 text-sm">Boda en Hacienda Galindo</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/5 p-6 rounded-lg">
              <blockquote className="mb-4 text-lg font-boska italic">
                &quot;Como organizador de eventos corporativos, he trabajado con muchos proveedores, pero Altivento destaca por su profesionalismo y calidad. Siempre cumplen con los tiempos y las instalaciones son impecables.&quot;
              </blockquote>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-peach/20 rounded-full mr-3"></div>
                <div>
                  <p className="font-medium">Carlos Mendoza</p>
                  <p className="text-cream/70 text-sm">Director de Eventos Corporativos</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-peach/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-boska font-bold text-forest mb-4">
            Hagamos realidad tu próximo evento
          </h2>
          <p className="max-w-3xl mx-auto text-lg mb-8 text-forest/80">
            Con más de tres décadas de experiencia, estamos listos para ayudarte a crear el evento de tus sueños. Contáctanos hoy mismo para una consulta personalizada.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link 
              href="/contacto"
              className="bg-forest text-cream px-6 py-3 rounded-full font-medium transition-colors hover:bg-forest/90"
            >
              Solicitar Cotización
            </Link>
            <Link 
              href="/galeria"
              className="bg-transparent border-2 border-forest text-forest px-6 py-3 rounded-full font-medium transition-colors hover:bg-forest/5"
            >
              Ver Nuestros Proyectos
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
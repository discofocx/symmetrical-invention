import Link from 'next/link';


export default function Home() {
  return (
    <div>
      <section className="bg-linear-45/oklch from-peach via-sand to-cream py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-boska font-bold text-forest mb-4">
                Estructuras memorables para eventos inolvidables
              </h1>
              <p className="text-lg mb-6">
                Más de 30 años creando espacios perfectos para eventos sociales y corporativos.
              </p>
              <div className="flex space-x-4">
                <Link 
                  href="/productos"
                  className="bg-peach text-forest px-6 py-3 rounded-full font-medium transition-colors hover:bg-peach/90"
                >
                  Explorar Productos
                </Link>
                <Link 
                  href="/contacto"
                  className="bg-transparent border-2 border-forest text-forest px-6 py-3 rounded-full font-medium transition-colors hover:bg-forest/5"
                >
                  Contactar
                </Link>
              </div>
            </div>
            <div className="md:w-1/2">
              {/* Placeholder for hero image */}
              <div className="aspect-[4/3] bg-forest/10 rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Other sections would follow */}
    </div>
  );
}
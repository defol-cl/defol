

export default function Header() {
  return (
    <header className="bg-indigo-600 sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto sm:px-3 xl:px-0" aria-label="Top">
        <div className="w-full py-6 flex items-center justify-between border-b border-indigo-500 lg:border-none">
          <div className="flex items-center">
            <a href="#inicio">
              <img src="./assets/logo-white.svg" alt="Logotipo" className="w-48" />
            </a>
            <div className="hidden ml-10 space-x-8 lg:block text-base font-medium ">
              <a
                href="#beneficios"
                className="text-white hover:text-indigo-100 transition-colors duration-200"
              >
                Beneficios
              </a>
              <a
                href="#como-funciona"
                className="text-white hover:text-indigo-100 transition-colors duration-200"
              >
                ¿Cómo funciona?
              </a>
              <a
                href="#precios"
                className="text-white hover:text-indigo-100 transition-colors duration-200"
              >
                Precios
              </a>
              <a
                href="#ingresa"
                className="text-white hover:text-indigo-100 transition-colors duration-200"
              >
                Ingresa
              </a>
              <a
                href="#quienes-somos"
                className="text-white hover:text-indigo-100 transition-colors duration-200"
              >
                ¿Quiénes somos?
              </a>
            </div>
          </div>
          <div className="ml-10 space-x-4">
            <a
              href="mailto:contacto@defol.cl"
              className="inline-block bg-indigo-500 py-2 px-4 border border-transparent rounded-md text-base font-medium text-white hover:bg-opacity-75 transition-colors duration-200"
            >
              Contáctanos
            </a>
            <a
              href="mailto:quiero-contratar@defol.cl"
              className="inline-block bg-white py-2 px-4 border border-transparent rounded-md text-base font-medium text-indigo-600 hover:bg-indigo-50 transition-colors duration-200"
            >
              Contrata ahora
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}

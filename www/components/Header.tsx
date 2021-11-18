export default function Header() {
  return (
    <header className="bg-indigo-600 sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="w-full py-6 flex items-center justify-between border-b border-indigo-500 lg:border-none">
          <div className="flex items-center">
            <a href="#inicio">
              <img
                className="h-10 w-auto"
                src="https://tailwindui.com/img/logos/workflow-mark.svg?color=white"
                alt="Logotipo"
              />
            </a>
            <div className="hidden ml-10 space-x-8 lg:block">
              <a
                href="#beneficios"
                className="text-base font-medium text-white hover:text-indigo-50"
              >
                Beneficios
              </a>
              <a
                href="#como-funciona"
                className="text-base font-medium text-white hover:text-indigo-50"
              >
                ¿Cómo funciona?
              </a>
              <a
                href="#precios"
                className="text-base font-medium text-white hover:text-indigo-50"
              >
                Precios
              </a>
              <a
                href="#demo"
                className="text-base font-medium text-white hover:text-indigo-50"
              >
                Demo
              </a>
              <a
                href="#quienes-somos"
                className="text-base font-medium text-white hover:text-indigo-50"
              >
                ¿Quiénes somos?
              </a>
            </div>
          </div>
          <div className="ml-10 space-x-4">
            <a
              href="#"
              className="inline-block bg-indigo-500 py-2 px-4 border border-transparent rounded-md text-base font-medium text-white hover:bg-opacity-75"
            >
              Contáctanos
            </a>
            <a
              href="#"
              className="inline-block bg-white py-2 px-4 border border-transparent rounded-md text-base font-medium text-indigo-600 hover:bg-indigo-50"
            >
              Contrata ahora
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}

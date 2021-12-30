export default function Example() {
  return (
    <>
      <section
        className="px-4 sm:px-6 lg:px-8 pt-32 pb-12 bg-white"
        id="inicio"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center text-center lg:text-left mb-24">
            <div className="lg:w-1/2 lg:pr-10 mt-10 lg:mt-0 order-1 lg:order-none">
              <h2 className="hidden lgplus:block text-6xl mb-2 font-semibold font-heading text-gray-900">
                Asesórate <br />{" "}
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;con
                defol
              </h2>
              <h2 className="lgplus:hidden text-6xl mb-2 font-semibold font-heading text-gray-900">
                Asesórate con defol
              </h2>
              <p className="mb-8 leading-relaxed text-2xl text-gray-900">
                Somos una Plataforma de consulta legal en línea, {" "}
                <b>
                  donde el usuario puede resolver sus dudas
                  en materia jurídica
                </b>{" "}
                y descargar información necesaria para diversos trámites legales.
              </p>
            </div>
            <div className="lg:w-1/2">
              <img
                src="./assets/hero-image.svg"
                alt="asesórate con defol"
                className="w-auto"
              />
            </div>
          </div>
        </div>
        <div className="bg-indigo-700">
          <div className="max-w-4xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              <span className="block">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 mx-auto"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                  />
                </svg>
                Buscamos democratizar el acceso a la justicia, otorgando un
                servicio de consulta dinámica, a un precio{" "}
                <span className="underline">asequible y de calidad</span>.
              </span>
            </h2>
            <p className="mt-4 text-lg leading-6 text-indigo-200">
              ¿Te interesa otorgar el beneficio de asesorías legales con DEFOL?
            </p>
            <a
              href="#"
              className="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-100 sm:w-auto transition-colors duration-200"
            >
              Contáctanos
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

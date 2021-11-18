export default function Beneficios() {
  return (
    <>
      <section
        className="px-4 sm:px-6 lg:px-8 py-12 text-center bg-gray-100"
        id="beneficios"
      >
        <div className="max-w-7xl mx-auto">
          <div className="w-full max-w-2xl mx-auto">
            <span className="text-sm font-semibold">BENEFICIOS</span>
            <h2 className="text-4xl mt-2 mb-6 leading-tight font-semibold font-heading">
              Lorem ipsum dolor sit amet
            </h2>
          </div>
          <div className="my-8 flex justify-center">
            <div className="relative self-center mt-6 bg-gray-100 rounded-lg p-0.5 flex sm:mt-8">
              <button
                type="button"
                className="relative w-1/2 bg-white border-gray-200 rounded-md shadow-sm py-2 text-sm font-medium text-gray-900 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:z-10 sm:w-auto sm:px-8"
              >
                Empresas
              </button>
              <button
                type="button"
                className="ml-0.5 relative w-1/2 border border-transparent rounded-md py-2 text-sm font-medium text-gray-700 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:z-10 sm:w-auto sm:px-8"
              >
                Personas (Próximamente)
              </button>
            </div>
            </div>
            <div className="flex flex-wrap -mx-8 text-center">
              <div className="lg:w-1/3 px-8 mb-8 lg:mb-0">
                <svg
                  className="text-indigo-600 w-8 h-8 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                  ></path>
                </svg>
                <h3 className="text-2xl my-3 font-semibold">
                  Otorga acceso gratuito a tus colaboradores y stakeholders
                </h3>
              </div>
              <div className="lg:w-1/3 px-8 mb-8 lg:mb-0">
                <svg
                  className="text-indigo-600 w-8 h-8 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  ></path>
                </svg>
                <h3 className="text-2xl my-3 font-semibold">
                  Bajo costo fijo, no necesitas contar con infraestructura y
                  personal
                </h3>
              </div>
              <div className="lg:w-1/3 px-8 mb-8 lg:mb-0">
                <svg
                  className="text-indigo-600 w-8 h-8 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  ></path>
                </svg>
                <h3 className="text-2xl my-3 font-semibold">
                  Informes mensuales con la utilización del servicio
                </h3>
              </div>
            </div>
          </div>

      </section>
    </>
  );
}

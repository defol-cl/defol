import { CheckIcon, MinusIcon } from "@heroicons/react/solid";

export default function Pricing() {
  return (
    <>
      <section className="px-4 sm:px-6 lg:px-8 py-12 bg-gray-100" id="precios">
        <div className="max-w-7xl mx-auto">
          <div className="sm:flex sm:flex-col sm:align-center">
            <div className="w-full max-w-2xl mx-auto text-center">
              <h2 className="text-4xl mt-2 mb-6 leading-tight font-semibold font-heading text-gray-900">
                ¿Cuánto cuesta defol?
              </h2>
            </div>
            <div className="relative self-center mt-6 bg-gray-100 rounded-lg p-0.5 flex sm:mt-8">
              <button
                type="button"
                className="relative w-1/2 bg-white border-gray-200 rounded-md shadow-sm py-2 text-sm font-medium text-gray-900 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:z-10 sm:w-auto sm:px-8"
              >
                Para Empresas{" "}
              </button>
              <button
                type="button"
                className="ml-0.5 relative w-1/2 border border-transparent rounded-md py-2 text-sm font-medium text-gray-700 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:z-10 sm:w-auto sm:px-8"
              >
                Para Personas (Próximamente)
              </button>
            </div>
          </div>
        </div>

        {/* TABLA */}

        <div className="max-w-7xl mx-auto bg-white rounded-xl py-6 sm:px-6 lg:px-8 mt-6">
          {/* <!-- xs to lg --> */}
          <div className="max-w-2xl mx-auto space-y-16 lg:hidden">
            <section>
              <div className="pb-4 px-4 text-xl leading-6 font-bold text-gray-900 text-left">
                Plan Básico{" "}
                <img
                  className="w-6 h-auto inline-block -mt-2"
                  src="./assets/emoji-sparkle.png"
                  alt="plan básico"
                />
              </div>
              <table className="w-full">
                <caption className="bg-gray-50 border-t border-gray-200 py-3 px-4 text-sm font-bold text-indigo-600 text-left">
                  ¿Qué incluye?
                </caption>
                <thead>
                  <tr>
                    <th className="sr-only" scope="col">
                      Característica
                    </th>
                    <th className="sr-only" scope="col">
                      Incluído
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="border-t border-gray-200">
                    <th
                      className="py-5 px-4 text-sm font-normal text-gray-500 text-left"
                      scope="row"
                    >
                      Preguntas y respuestas simples (hasta 1 réplica)
                    </th>
                    <td className="py-5 pr-4">
                      <CheckIcon className="h-5 w-5 text-green-500" />
                      <span className="sr-only">Sí</span>
                    </td>
                  </tr>

                  <tr className="border-t border-gray-200">
                    <th
                      className="py-5 px-4 text-sm font-normal text-gray-500 text-left"
                      scope="row"
                    >
                      Administración centralizada del convenio
                    </th>
                    <td className="py-5 pr-4">
                      <CheckIcon className="h-5 w-5 text-green-500" />
                      <span className="sr-only">Sí</span>
                    </td>
                  </tr>

                  <tr className="border-t border-gray-200">
                    <th
                      className="py-5 px-4 text-sm font-normal text-gray-500 text-left"
                      scope="row"
                    >
                      Informe mensual con detalle del servicio entregado
                    </th>
                    <td className="py-5 pr-4">
                      <CheckIcon className="h-5 w-5 text-green-500" />
                      <span className="sr-only">Sí</span>
                    </td>
                  </tr>
                </tbody>
              </table>

              <table className="w-full">
                <caption className="bg-gray-50 border-t border-gray-200 py-3 px-4 text-sm font-bold text-indigo-600 text-left">
                  Precios
                </caption>
                <thead>
                  <tr>
                    <th className="sr-only" scope="col">
                      Precios
                    </th>
                    <th className="sr-only" scope="col">
                      Monto
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="border-t border-gray-200">
                    <th
                      className="py-5 px-4 text-sm font-normal text-gray-500 text-left"
                      scope="row"
                    >
                      Hasta 200 preguntas
                    </th>
                    <td className="py-5 pr-4">
                      <p>
                        <span className="text-xl font-bold text-gray-900">
                          $130.000
                        </span>
                        <span className="text-base font-medium text-gray-500">
                          /mes
                        </span>
                      </p>
                    </td>
                  </tr>

                  <tr className="border-t border-gray-200">
                    <th
                      className="py-5 px-4 text-sm font-normal text-gray-500 text-left"
                      scope="row"
                    >
                      Hasta 400 preguntas
                    </th>
                    <td className="py-5 pr-4">
                      <p>
                        <span className="text-xl font-bold text-gray-900">
                          $250.000
                        </span>
                        <span className="text-base font-medium text-gray-500">
                          /mes
                        </span>
                      </p>
                    </td>
                  </tr>

                  <tr className="border-t border-gray-200">
                    <th
                      className="py-5 px-4 text-sm font-normal text-gray-500 text-left"
                      scope="row"
                    >
                      Hasta 800 preguntas
                    </th>
                    <td className="py-5 pr-4">
                      <p>
                        <span className="text-xl font-bold text-gray-900">
                          $470.000
                        </span>
                        <span className="text-base font-medium text-gray-500">
                          /mes
                        </span>
                      </p>
                    </td>
                  </tr>

                  <tr>
                    <td className="py-5 px-6" colSpan={2}>
                      <a
                        href="#"
                        className="block w-full bg-indigo-600 border border-indigo-600 rounded-md py-2 text-sm font-semibold text-white text-center hover:bg-indigo-400 transition-colors duration-200"
                      >
                        Disponible desde el 15 de diciembre
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </section>

            <section>
              <div className="pb-4 px-4 text-xl leading-6 font-bold text-gray-900 text-left">
                Plan Premium{" "}
                <img
                  className="w-6 h-auto inline-block -mt-2"
                  src="./assets/emoji-rayo.png"
                  alt="plan premium"
                />
              </div>
              <table className="w-full">
                <caption className="bg-gray-50 border-t border-gray-200 py-3 px-4 text-sm font-bold text-indigo-600 text-left">
                  ¿Qué incluye?
                </caption>
                <thead>
                  <tr>
                    <th className="sr-only" scope="col">
                      Característica
                    </th>
                    <th className="sr-only" scope="col">
                      Incluído
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="border-t border-gray-200">
                    <th
                      className="py-5 px-4 text-sm font-normal text-gray-500 text-left"
                      scope="row"
                    >
                      Preguntas y respuestas simples (hasta 1 réplica)
                    </th>
                    <td className="py-5 pr-4">
                      <CheckIcon className="h-5 w-5 text-green-500" />
                      <span className="sr-only">Sí</span>
                    </td>
                  </tr>

                  <tr className="border-t border-gray-200">
                    <th
                      className="py-5 px-4 text-sm font-normal text-gray-500 text-left"
                      scope="row"
                    >
                      Administración centralizada del convenio
                    </th>
                    <td className="py-5 pr-4">
                      <CheckIcon className="h-5 w-5 text-green-500" />
                      <span className="sr-only">Sí</span>
                    </td>
                  </tr>

                  <tr className="border-t border-gray-200">
                    <th
                      className="py-5 px-4 text-sm font-normal text-gray-500 text-left"
                      scope="row"
                    >
                      Informe mensual con detalle del servicio entregado
                    </th>
                    <td className="py-5 pr-4">
                      <CheckIcon className="h-5 w-5 text-green-500" />
                      <span className="sr-only">Sí</span>
                    </td>
                  </tr>

                  <tr className="border-t border-gray-200">
                    <th
                      className="py-5 px-4 text-sm font-normal text-gray-500 text-left"
                      scope="row"
                    >
                      Respuestas con documentación de ejemplo
                    </th>
                    <td className="py-5 pr-4">
                      <CheckIcon className="h-5 w-5 text-green-500" />
                      <span className="sr-only">Sí</span>
                    </td>
                  </tr>
                </tbody>
              </table>

              <table className="w-full">
                <caption className="bg-gray-50 border-t border-gray-200 py-3 px-4 text-sm font-bold text-indigo-600 text-left">
                  Precios
                </caption>
                <thead>
                  <tr>
                    <th className="sr-only" scope="col">
                      Precios
                    </th>
                    <th className="sr-only" scope="col">
                      Monto
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="border-t border-gray-200">
                    <th
                      className="py-5 px-4 text-sm font-normal text-gray-500 text-left"
                      scope="row"
                    >
                      Hasta 200 preguntas
                    </th>
                    <td className="py-5 pr-4">
                      <p>
                        <span className="text-xl font-bold text-gray-900">
                          $195.000
                        </span>
                        <span className="text-base font-medium text-gray-500">
                          /mes
                        </span>
                      </p>
                    </td>
                  </tr>

                  <tr className="border-t border-gray-200">
                    <th
                      className="py-5 px-4 text-sm font-normal text-gray-500 text-left"
                      scope="row"
                    >
                      Hasta 400 preguntas
                    </th>
                    <td className="py-5 pr-4">
                      <p>
                        <span className="text-xl font-bold text-gray-900">
                          $375.000
                        </span>
                        <span className="text-base font-medium text-gray-500">
                          /mes
                        </span>
                      </p>
                    </td>
                  </tr>

                  <tr className="border-t border-gray-200">
                    <th
                      className="py-5 px-4 text-sm font-normal text-gray-500 text-left"
                      scope="row"
                    >
                      Hasta 800 preguntas
                    </th>
                    <td className="py-5 pr-4">
                      <p>
                        <span className="text-xl font-bold text-gray-900">
                          $705.000
                        </span>
                        <span className="text-base font-medium text-gray-500">
                          /mes
                        </span>
                      </p>
                    </td>
                  </tr>

                  <tr>
                    <td className="py-5 px-6" colSpan={2}>
                      <a
                        href="#"
                        className="block w-full bg-indigo-600 border border-indigo-600 rounded-md py-2 text-sm font-semibold text-white text-center hover:bg-indigo-400 transition-colors duration-200"
                      >
                        Disponible desde el 15 de enero
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </section>

            <section>
              <div className="pb-4 px-4 text-xl leading-6 font-bold text-gray-900 text-left">
                Plan Ultimate{" "}
                <img
                  className="w-6 h-auto inline-block -mt-2"
                  src="./assets/emoji-fuego.png"
                  alt="plan ultimate"
                />
              </div>
              <table className="w-full">
                <caption className="bg-gray-50 border-t border-gray-200 py-3 px-4 text-sm font-bold text-indigo-600 text-left">
                  ¿Qué incluye?
                </caption>
                <thead>
                  <tr>
                    <th className="sr-only" scope="col">
                      Característica
                    </th>
                    <th className="sr-only" scope="col">
                      Incluído
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="border-t border-gray-200">
                    <th
                      className="py-5 px-4 text-sm font-normal text-gray-500 text-left"
                      scope="row"
                    >
                      Preguntas y respuestas simples (hasta 1 réplica)
                    </th>
                    <td className="py-5 pr-4">
                      <CheckIcon className="h-5 w-5 text-green-500" />
                      <span className="sr-only">Sí</span>
                    </td>
                  </tr>

                  <tr className="border-t border-gray-200">
                    <th
                      className="py-5 px-4 text-sm font-normal text-gray-500 text-left"
                      scope="row"
                    >
                      Administración centralizada del convenio
                    </th>
                    <td className="py-5 pr-4">
                      <CheckIcon className="h-5 w-5 text-green-500" />
                      <span className="sr-only">Sí</span>
                    </td>
                  </tr>

                  <tr className="border-t border-gray-200">
                    <th
                      className="py-5 px-4 text-sm font-normal text-gray-500 text-left"
                      scope="row"
                    >
                      Informe mensual con detalle del servicio entregado
                    </th>
                    <td className="py-5 pr-4">
                      <CheckIcon className="h-5 w-5 text-green-500" />
                      <span className="sr-only">Sí</span>
                    </td>
                  </tr>

                  <tr className="border-t border-gray-200">
                    <th
                      className="py-5 px-4 text-sm font-normal text-gray-500 text-left"
                      scope="row"
                    >
                      Respuestas con documentación de ejemplo
                    </th>
                    <td className="py-5 pr-4">
                      <CheckIcon className="h-5 w-5 text-green-500" />
                      <span className="sr-only">Sí</span>
                    </td>
                  </tr>

                  <tr className="border-t border-gray-200">
                    <th
                      className="py-5 px-4 text-sm font-normal text-gray-500 text-left"
                      scope="row"
                    >
                      Media jornada de orientación <br /> presencial (dos veces al mes){" "}
                    </th>
                    <td className="py-5 pr-4">
                      <CheckIcon className="h-5 w-5 text-green-500" />
                      <span className="sr-only">Sí</span>
                    </td>
                  </tr>
                </tbody>
              </table>

              <table className="w-full">
                <caption className="bg-gray-50 border-t border-gray-200 py-3 px-4 text-sm font-bold text-indigo-600 text-left">
                  Precios
                </caption>
                <thead>
                  <tr>
                    <th className="sr-only" scope="col">
                      Precios
                    </th>
                    <th className="sr-only" scope="col">
                      Monto
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="border-t border-gray-200">
                    <th
                      className="py-5 px-4 text-sm font-normal text-gray-500 text-left"
                      scope="row"
                    >
                      Hasta 200 preguntas
                    </th>
                    <td className="py-5 pr-4">
                      <p>
                        <span className="text-xl font-bold text-gray-900">
                          $253.500
                        </span>
                        <span className="text-base font-medium text-gray-500">
                          /mes
                        </span>
                      </p>
                    </td>
                  </tr>

                  <tr className="border-t border-gray-200">
                    <th
                      className="py-5 px-4 text-sm font-normal text-gray-500 text-left"
                      scope="row"
                    >
                      Hasta 400 preguntas
                    </th>
                    <td className="py-5 pr-4">
                      <p>
                        <span className="text-xl font-bold text-gray-900">
                          $487.500
                        </span>
                        <span className="text-base font-medium text-gray-500">
                          /mes
                        </span>
                      </p>
                    </td>
                  </tr>

                  <tr className="border-t border-gray-200">
                    <th
                      className="py-5 px-4 text-sm font-normal text-gray-500 text-left"
                      scope="row"
                    >
                      Hasta 800 preguntas
                    </th>
                    <td className="py-5 pr-4">
                      <p>
                        <span className="text-xl font-bold text-gray-900">
                          $916.500
                        </span>
                        <span className="text-base font-medium text-gray-500">
                          /mes
                        </span>
                      </p>
                    </td>
                  </tr>

                  <tr>
                  <td className="pt-5 px-6" colSpan={2}>
                    <a className="block w-full bg-gray-300 border  rounded-md py-2 text-sm font-semibold text-white text-center">
                      Disponible próximamente
                    </a>
                  </td>
                  </tr>
                </tbody>
              </table>
            </section>
          </div>

          {/* <!-- lg+ --> */}
          <div className="hidden lg:block">
            <table className="w-full h-px table-fixed">
              <caption className="sr-only">Compara los planes</caption>
              <thead>
                <tr>
                  <th
                    className="pb-4 px-6 text-xl font-medium text-gray-900 text-left"
                    scope="col"
                  >
                    <span>
                      Planes{" "}
                      <img
                        className="w-6 h-auto inline-block -mt-2"
                        src="./assets/emoji-derecha.png"
                        alt="planes"
                      />
                    </span>
                  </th>

                  <th
                    className="w-1/4 pb-4 px-6 text-xl leading-6 font-bold text-gray-900 text-left"
                    scope="col"
                  >
                    Básico{" "}
                    <img
                      className="w-6 h-auto inline-block -mt-2"
                      src="./assets/emoji-sparkle.png"
                      alt="plan básico"
                    />
                  </th>

                  <th
                    className="w-1/4 pb-4 px-6 text-xl leading-6 font-bold text-gray-900 text-left"
                    scope="col"
                  >
                    Premium{" "}
                    <img
                      className="w-6 h-auto inline-block -mt-2"
                      src="./assets/emoji-rayo.png"
                      alt="plan premium"
                    />
                  </th>

                  <th
                    className="w-1/4 pb-4 px-6 text-xl leading-6 font-bold text-gray-900 text-left"
                    scope="col"
                  >
                    Ultimate{" "}
                    <img
                      className="w-6 h-auto inline-block -mt-2"
                      src="./assets/emoji-fuego.png"
                      alt="plan ultimate"
                    />
                  </th>
                </tr>
              </thead>
              <tbody className="border-t border-gray-200 divide-y divide-gray-200">
                <tr>
                  <th
                    className="bg-gray-50 py-3 pl-6 text-sm font-bold text-indigo-600 text-left col-span-4"
                    colSpan={4}
                    scope="colgroup"
                  >
                    ¿Qué incluye?
                  </th>
                </tr>

                <tr>
                  <th
                    className="py-5 px-6 text-sm font-normal text-gray-500 text-left"
                    scope="row"
                  >
                    Preguntas y respuestas simples (hasta 1 réplica)
                  </th>

                  <td className="py-5 px-6">
                    <CheckIcon className="h-5 w-5 text-green-500" />
                    <span className="sr-only">Incluido en plan básico</span>
                  </td>

                  <td className="py-5 px-6">
                    <CheckIcon className="h-5 w-5 text-green-500" />
                    <span className="sr-only">Incluido en plan premium</span>
                  </td>

                  <td className="py-5 px-6">
                    <CheckIcon className="h-5 w-5 text-green-500" />
                    <span className="sr-only">Incluido en plan ultimate</span>
                  </td>
                </tr>

                <tr>
                  <th
                    className="py-5 px-6 text-sm font-normal text-gray-500 text-left"
                    scope="row"
                  >
                    Administración centralizada del convenio
                  </th>

                  <td className="py-5 px-6">
                    <CheckIcon className="h-5 w-5 text-green-500" />
                    <span className="sr-only">Incluido en plan básico</span>
                  </td>

                  <td className="py-5 px-6">
                    <CheckIcon className="h-5 w-5 text-green-500" />
                    <span className="sr-only">Incluido en plan premium</span>
                  </td>

                  <td className="py-5 px-6">
                    <CheckIcon className="h-5 w-5 text-green-500" />
                    <span className="sr-only">Incluido en plan ultimate</span>
                  </td>
                </tr>

                <tr>
                  <th
                    className="py-5 px-6 text-sm font-normal text-gray-500 text-left"
                    scope="row"
                  >
                    Informe mensual con detalle del servicio entregado
                  </th>

                  <td className="py-5 px-6">
                    <CheckIcon className="h-5 w-5 text-green-500" />
                    <span className="sr-only"> Incluido en plan básico</span>
                  </td>

                  <td className="py-5 px-6">
                    <CheckIcon className="h-5 w-5 text-green-500" />

                    <span className="sr-only">Incluido en plan premium</span>
                  </td>

                  <td className="py-5 px-6">
                    <CheckIcon className="h-5 w-5 text-green-500" />

                    <span className="sr-only">Incluido en plan ultimate</span>
                  </td>
                </tr>

                <tr>
                  <th
                    className="py-5 px-6 text-sm font-normal text-gray-500 text-left"
                    scope="row"
                  >
                    Respuestas con documentación de ejemplo
                  </th>

                  <td className="py-5 px-6">
                    <MinusIcon className="h-5 w-5 text-gray-400" />
                    <span className="sr-only">No Incluido en plan básico</span>
                  </td>

                  <td className="py-5 px-6">
                    <CheckIcon className="h-5 w-5 text-green-500" />
                    <span className="sr-only"> Incluido en plan premium</span>
                  </td>

                  <td className="py-5 px-6">
                    <CheckIcon className="h-5 w-5 text-green-500" />
                    <span className="sr-only"> Incluido en plan ultimate</span>
                  </td>
                </tr>

                <tr>
                  <th
                    className="py-5 px-6 text-sm font-normal text-gray-500 text-left"
                    scope="row"
                  >
                    Media jornada de orientación presencial (dos veces al mes)
                  </th>

                  <td className="py-5 px-6">
                    <MinusIcon className="h-5 w-5 text-gray-400" />
                    <span className="sr-only">No Incluido en plan básico</span>
                  </td>

                  <td className="py-5 px-6">
                    <MinusIcon className="h-5 w-5 text-gray-400" />
                    <span className="sr-only">
                      {" "}
                      No Incluido en plan premium
                    </span>
                  </td>

                  <td className="py-5 px-6">
                    <CheckIcon className="h-5 w-5 text-green-500" />
                    <span className="sr-only">Incluido en plan ultimate</span>
                  </td>
                </tr>

                <tr>
                  <th
                    className="bg-gray-50 py-3 pl-6 text-sm font-bold text-indigo-600 text-left"
                    colSpan={4}
                    scope="colgroup"
                  >
                    Precios
                  </th>
                </tr>

                <tr>
                  <th
                    className="py-5 px-6 text-sm font-semibold text-gray-900 text-left"
                    scope="row"
                  >
                    Hasta 200 preguntas
                  </th>

                  <td className="py-5 px-6">
                    <p>
                      <span className="text-2xl font-bold text-gray-900">
                        $2.998.000
                      </span>
                      <span className="text-base font-medium text-gray-500">
                        /mes
                      </span>
                    </p>
                  </td>
                  <td className="py-5 px-6">
                    <p>
                      <span className="text-2xl font-bold text-gray-900">
                        $3.597.600
                      </span>
                      <span className="text-base font-medium text-gray-500">
                        /mes
                      </span>
                    </p>
                  </td>

                  <td className="py-5 px-6">
                    <p>
                      <span className="text-2xl font-bold text-gray-900">
                        -
                      </span>
                    </p>
                  </td>
                </tr>

                <tr>
                  <th
                    className="py-5 px-6 text-sm font-semibold text-gray-900 text-left"
                    scope="row"
                  >
                    Hasta 400 preguntas
                  </th>

                  <td className="py-5 px-6">
                    <p>
                      <span className="text-2xl font-bold text-gray-900">
                        $5.396.400
                      </span>
                      <span className="text-base font-medium text-gray-500">
                        /mes
                      </span>
                    </p>
                  </td>
                  <td className="py-5 px-6">
                    <p>
                      <span className="text-2xl font-bold text-gray-900">
                        $6.475.680
                      </span>
                      <span className="text-base font-medium text-gray-500">
                        /mes
                      </span>
                    </p>
                  </td>

                  <td className="py-5 px-6">
                    <p>
                      <span className="text-2xl font-bold text-gray-900">
                        -
                      </span>
                    </p>
                  </td>
                </tr>

                <tr>
                  <th
                    className="py-5 px-6 text-sm font-semibold text-gray-900 text-left"
                    scope="row"
                  >
                    Hasta 800 preguntas
                  </th>

                  <td className="py-5 px-6">
                    <p>
                      <span className="text-2xl font-bold text-gray-900">
                        $9.593.600
                      </span>
                      <span className="text-base font-medium text-gray-500">
                        /mes
                      </span>
                    </p>
                  </td>
                  <td className="py-5 px-6">
                    <p>
                      <span className="text-2xl font-bold text-gray-900">
                        $11.512.320
                      </span>
                      <span className="text-base font-medium text-gray-500">
                        /mes
                      </span>
                    </p>
                  </td>

                  <td className="py-5 px-6">
                    <p>
                      <span className="text-2xl font-bold text-gray-900">
                        -
                      </span>
                    </p>
                  </td>
                </tr>
              </tbody>

              <tfoot>
                <tr className="border-t border-gray-200">
                  <th className="sr-only" scope="row">
                    Elige tu plan
                  </th>

                  <td className="pt-5 px-6">
                    <a
                      href="#"
                      className="block w-full bg-indigo-600 border border-indigo-600 rounded-md py-2 text-sm font-semibold text-white text-center hover:bg-indigo-400 transition-colors duration-200"
                    >
                      Disponible desde el 15 de diciembre
                    </a>
                  </td>

                  <td className="pt-5 px-6">
                    <a
                      href="#"
                      className="block w-full bg-indigo-600 border border-indigo-600 rounded-md py-2 text-sm font-semibold text-white text-center hover:bg-indigo-400 transition-colors duration-200"
                    >
                      Disponible desde el 15 de enero
                    </a>
                  </td>

                  <td className="pt-5 px-6">
                    <a className="block w-full bg-gray-300 border  rounded-md py-2 text-sm font-semibold text-white text-center">
                      Disponible próximamente
                    </a>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* TABLA */}
      </section>
    </>
  );
}

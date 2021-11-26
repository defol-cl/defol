export default function Funcionamiento() {
  return (
    <>
      <section
        className="px-4 sm:px-6 lg:px-8 py-12 text-center bg-white"
        id="como-funciona"
      >
        <div className="max-w-7xl mx-auto">
          <div className="w-full max-w-2xl mx-auto text-center">
            <h2 className="text-4xl mt-2 mb-6 leading-tight font-semibold font-heading text-gray-900">
              ¿Cómo funciona defol?
            </h2>
          </div>
          <div className="w-full max-w-2xl mx-auto invisible sm:visible">
            {" "}
            Acá va una imagen{" "}
          </div>
          <div className="w-4/5 mx-auto border-t border-indigo-600 mt-12 -mb-5"></div>
          <div className="w-full flex flex-wrap items-top text-center text-gray-500 text-base">
            <div className="lg:w-1/5 flex flex-col items-center">
              <span className="flex items-center justify-center rounded-full font-bold mb-1 w-10 h-10 bg-indigo-600 text-white">
                1
              </span>
              <p>Genera tu consulta</p>
            </div>
            <div className="lg:w-1/5 flex flex-col items-center">
              <span className="flex items-center justify-center rounded-full font-bold mb-1 w-10 h-10 bg-indigo-600 text-white">
                2
              </span>
              <p>Nuestro equipo responderá tu consulta</p>
            </div>
            <div className="lg:w-1/5 flex flex-col items-center">
              <span className="flex items-center justify-center rounded-full font-bold mb-1 w-10 h-10 bg-indigo-600 text-white">
                3
              </span>
              <p>Podrás realizar una réplica o cerrar tu consulta</p>
            </div>
            <div className="lg:w-1/5 flex flex-col items-center">
              <span className="flex items-center justify-center rounded-full font-bold mb-1 w-10 h-10 bg-indigo-600 text-white">
                4
              </span>
              <p>Nuestro equipo responderá tu réplica (dúplica)</p>
            </div>
            <div className="lg:w-1/5 flex flex-col items-center">
              <span className="flex items-center justify-center rounded-full font-bold mb-1 w-10 h-10 bg-indigo-600 text-white">
                5
              </span>
              <p>Cierre de la consulta</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

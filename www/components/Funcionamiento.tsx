export default function Funcionamiento() {
  return (
    <>
      <section
        className="px-4 sm:px-6 lg:px-8 py-12 text-center bg-white"
        id="como-funciona"
      >
        <div className="max-w-7xl mx-auto">
          <div className="w-full max-w-2xl mx-auto text-center">
            <span className="text-sm font-semibold">FUNCIONAMIENTO</span>
            <h2 className="text-4xl mt-2 mb-6 leading-tight font-semibold font-heading">
              Lorem ipsum dolor sit amet
            </h2>
          </div>
          <div className="w-full flex flex-wrap items-center mx-8 text-center">
            <div className="lg:w-1/5 py-8">
              <p className="text-xl text-gray-500">genera tu consulta</p>
            </div>
            <div className="lg:w-1/5 py-8">
              <p className="text-xl text-gray-500">
                nuestro equipo responderá tu consulta
              </p>
            </div>
            <div className="lg:w-1/5 py-8">
              <p className="text-xl text-gray-500">
                podrás realizar una réplica o cerrar tu consulta
              </p>
            </div>
            <div className="lg:w-1/5 py-8">
              <p className="text-xl text-gray-500">
                nuestro equipo responderá tu réplica (dúplica)
              </p>
            </div>
            <div className="lg:w-1/5 py-8">
              <p className="text-xl text-gray-500">cierre de la consulta</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

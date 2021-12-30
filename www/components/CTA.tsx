export default function Example() {
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-24 bg-gray-100" id="ingresa">
      <div className="max-w-7xl mx-auto">
        <div className="bg-indigo-700 rounded-lg shadow-xl overflow-hidden lg:grid lg:grid-cols-2 lg:gap-4">
          <div className="pt-10 pb-12 px-6 sm:pt-16 sm:px-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
            <div className="lg:self-center">
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                <span className="block">Ingresa a nuestra Plataforma</span>
              </h2>
              <p className="mt-4 text-lg leading-6 text-indigo-200">
                Hemos desarrollado una plataforma centrada en las necesidades
                legales de nuestros clientes directos y sus colaboradores para
                que puedan realizar sus consultas en una plataforma intuitiva,
                amigable y fácil de operar
              </p>

              <a
                href="https://app-master.defol.cl"
                className="mt-8 bg-white border border-transparent rounded-md shadow px-5 py-3 inline-flex items-center text-base font-medium mr-3 text-indigo-600 hover:bg-indigo-50"
              >
                Aplicación{" "}
              </a>
              <a
                href="https://admin-master.defol.cl"
                className="mt-8 bg-white border border-transparent rounded-md shadow px-5 py-3 inline-flex items-center text-base font-medium text-indigo-600 hover:bg-indigo-50"
              >
                Administración{" "}
              </a>
            </div>
          </div>
          <div className="-mt-6 aspect-w-5 aspect-h-3 md:aspect-w-2 md:aspect-h-1">
            <img
              className="transform translate-x-6 translate-y-6 rounded-md object-cover object-left-top sm:translate-x-16 lg:translate-y-20"
              src="./assets/plataforma.png"
              alt="App screenshot"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

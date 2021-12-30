export default function Equipo() {
  return (
    <section
      className="px-4 sm:px-6 lg:px-8 py-24 bg-gray-100"
      id="quienes-somos"
    >
      <div className="max-w-7xl mx-auto">
        <div className="w-full max-w-2xl mx-auto text-center">
          <h2 className="text-4xl mt-2 mb-12 leading-tight font-semibold font-heading text-gray-900">
            Conoce al equipo{" "}
          </h2>
        </div>
        <div className="flex flex-wrap text-center">
        <div className="w-full lg:w-1/3 px-4 mb-8">
            <div className="h-full rounded-xl bg-white overflow-hidden">
              <img
                src="/assets/JulioVillane2.jpg"
                alt=""
                className="w-auto"
              />
              <div className="p-8">
                <h3 className="text-xl mb-1 font-bold text-indigo-600">Julio Villane</h3>
                <span className="text-gray-400 font-semibold">Director de Tecnología</span>
                <p className="text-sm mt-2">
                  Profesional apasionado por la tecnología. Titulado como
                  Ingeniería Civil en Computación de la Universidad de Chile y
                  reconocido como alumno destacado por sus méritos académicos.
                  Cuenta con una amplia experiencia profesional y casos de éxito
                  en el desarrollo de soluciones tecnológicas para instituciones
                  relacionadas a diferentes ámbitos (educación, salud,
                  financiero y tecnología entre otros). Destacan proyectos
                  desarrollados para la Universidades de Chile y Católica, el
                  Ministerio de Salud y Fonasa, la Subsecretaría de Prevención
                  del Delito, SERCOTEC, JetSmart, ESign y Penta Financiero.
                </p>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/3 px-4 mb-8">
            <div className="h-full rounded-xl bg-white overflow-hidden">
              <img
                src="/assets/JaimeGonzalez.jpg"
                alt=""
                className="w-auto"
              />
              <div className="p-8">
                <h3 className="text-xl mb-1 font-bold text-indigo-600">
                  Jaime González Kazazian
                </h3>
                <span className="text-gray-400 font-semibold">Director de Asuntos Legales</span>
                <p className="text-sm mt-2">
                  Abogado de la Pontificia Universidad Católica de Chile, con
                  especialidad en Derecho Público Se ha desarrollado en el
                  ejercicio profesional asesorando a distintas instituciones
                  públicas y privadas, en las áreas del Derecho Administrativo y
                  Sanitario Además es Árbitro de la Excma Corte de Apelaciones
                  de Santiago, San Miguel, Valparaíso y Rancagua. También se desempeña como académico en la Facultad de
                  Derecho de la Universidad San Sebastián.
                </p>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/3 px-4 mb-8">
            <div className="h-full rounded-xl bg-white overflow-hidden">
              <img
                src="/assets/JoseManuel.jpg"
                alt=""
                className="w-auto"
              />
              <div className="p-8">
                <h3 className="text-xl mb-1 font-bold text-indigo-600">
                  José Manuel Heredia
                </h3>
                <span className="text-gray-400 font-semibold">Director Comercial y Financiero</span>
                <p className="text-sm mt-2">
                  Ingeniero Comercial, licenciado en economía de la U de
                  Concepción y Máster en Finanzas del ESE Business School de la
                  U de los Andes Cuenta con Experiencia en dirección de empresas
                  del rubro comercial, industrial, productivo y educacional.
                  Reconocido uno de los 100 líderes jóvenes del país en 2005 por
                  la Revista del Sábado. Actualmente se desempeña como Liquidador
                  de la Superintendencia de Insolvencia y Reemprendimiento.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

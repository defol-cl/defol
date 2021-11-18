export default function Example() {
  return (
    <>
      <section className="px-4 sm:px-6 lg:px-8 py-12 bg-white" id="inicio">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center text-center lg:text-left">
            <div className="lg:w-1/2 px-2 lg:pr-10 mt-10 lg:mt-0 order-1 lg:order-none">
              <h2 className="text-5xl mb-2 leading-tight font-semibold font-heading">
                Asesórate con defol
              </h2>
              <p className="mb-8  leading-relaxed">
                Somos un equipo preparado para asesorarte en aspectos legales, y
                que hemos decidido mejorar la experiencia de nuestros clientes,
                brindando orientación legal en línea a través de nuestra
                plataforma. <br /> <br /> Buscamos democratizar el acceso a la
                justicia, otorgando un servicio de consulta dinámica, a un
                precio asequible y de calidad.
              </p>

              <p className="mb-8 leading-relaxed">
                ¿Te interesa otorgar el beneficio de asesorías legales con
                DEFOL?
              </p>
              <a href="mailto:contacto@defol.cl">Contáctanos</a>
              <h2>¿Quieres hacerle una pregunta a nuestro equipo asesor?</h2>
              <p>Estamos trabajando para que esté disponible próximamente</p>
              <a href="mailto:subscripcion@defol.cl">Contáctanos</a>
            </div>
            <div className="lg:w-1/2">
              <img
                src="https://icountryschool.cl/wp-content/uploads/2020/08/placeholder.png"
                alt=""
                className="w-auto"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

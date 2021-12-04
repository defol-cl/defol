export default function Suscripcion() {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:py-16 lg:px-8">
        <div className="py-10 px-6 bg-indigo-700 rounded-3xl sm:py-16 sm:px-12 lg:p-20 lg:flex lg:items-center">
          <div className="lg:w-0 lg:flex-1">
            <h2 className="text-3xl font-bold tracking-tight text-white">Recibe tips y consejos a tu mail <span><img className="w-8 -mt-1 ml-2 inline" src="./assets/emoji-buzon.png" alt="emoji" /></span></h2>
            <p className="mt-4 max-w-3xl text-lg text-indigo-100">
Déjanos tu correo acá y te enviaremos consejos útiles y tips legales, nunca enviamos spam ¡lo prometo!
            </p>
          </div>
          <div className="mt-12 sm:w-full sm:max-w-md lg:mt-0 lg:ml-8 lg:flex-1">
            <form className="sm:flex">
              <label htmlFor="email-address" className="sr-only">
                Ingresa acá tu mail
              </label>
              <input
                id="email-address"
                name="email-address"
                type="email"
                autoComplete="email"
                required
                className="w-full border-white px-5 py-3 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-700 focus:ring-white rounded-md"
                placeholder="Ingresa acá tu mail"
              />
              <button
                type="submit"
                className="mt-3 w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-700 focus:ring-white sm:mt-0 sm:ml-3 sm:w-auto sm:flex-shrink-0"
              >
                Enviar
              </button>
            </form>
            <p className="mt-3 text-sm text-indigo-100">
              Nos importa la protección de tus datos, lee nuestra{' '}
              <a href="#" className="text-white font-medium underline">
                Política de Privacidad.
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

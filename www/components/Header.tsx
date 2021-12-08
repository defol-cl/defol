import { Popover, Transition } from "@headlessui/react";
import { CashIcon, HomeIcon, LightBulbIcon, LoginIcon, MenuIcon, SparklesIcon, UsersIcon, XIcon } from "@heroicons/react/outline";
import { Fragment } from "react";


function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  return (

    <Popover className=" bg-indigo-600 sticky top-0 z-50">
      <div className="flex justify-between items-center px-4 py-6 sm:px-6 lgplus:justify-start md:space-x-10 max-w-7xl mx-auto">
        <div>
          <a href="#inicio" className="flex">
            <span className="sr-only">Defol</span>
            <img
              className="h-auto w-48 sm:h-10"
              src="/assets/logo-white.svg"
              alt="Logotipo Defol"
            />
          </a>
        </div>
        <div className="-mr-2 -my-2 lgplus:hidden">
          <Popover.Button className="bg-indigo-500 rounded-md p-2 inline-flex items-center justify-center text-white hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
            <span className="sr-only">Abrir Menú</span>
            <MenuIcon className="h-6 w-6" aria-hidden="true" />
          </Popover.Button>
        </div>
        <div className="hidden lgplus:flex-1 lgplus:flex lgplus:items-center lgplus:justify-between">
          <Popover.Group as="nav" className="flex space-x-10">
            <a
              href="#beneficios"
              className="text-white hover:text-indigo-100 transition-colors duration-200"
            >
              Beneficios
            </a>
            <a
              href="#como-funciona"
              className="text-white hover:text-indigo-100 transition-colors duration-200"
            >
              ¿Cómo funciona?
            </a>
            <a
              href="#precios"
              className="text-white hover:text-indigo-100 transition-colors duration-200"
            >
              Precios
            </a>
            <a
              href="#ingresa"
              className="text-white hover:text-indigo-100 transition-colors duration-200"
            >
              Ingresa
            </a>
            <a
              href="#quienes-somos"
              className="text-white hover:text-indigo-100 transition-colors duration-200"
            >
              ¿Quiénes somos?
            </a>
          </Popover.Group>
          <div className="flex items-center lgplus:ml-12">
            <a
              href="mailto:quiero-contratar@defol.cl"
              className="inline-block bg-indigo-500 py-2 px-4 mr-4 border border-transparent rounded-md text-base font-medium text-white hover:bg-opacity-75 transition-colors duration-200"
            >
              Contáctanos
            </a>
            <a
              href="mailto:quiero-contratar@defol.cl"
              className="inline-block bg-white py-2 px-4 border border-transparent rounded-md text-base font-medium text-indigo-600 hover:bg-indigo-50 transition-colors duration-200"
            >
              Contrata ahora
            </a>
          </div>
        </div>
      </div>

      <Transition
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel
          focus
          className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right lgplus:hidden"
        >
          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
            <div className="pt-5 pb-6 px-5">
              <div className="flex items-center justify-between">
                <div>
                  <img
                    className="h-auto w-48 sm:h-10"
                    src="/assets/logo-indigo.svg"
                    alt="Workflow"
                  />
                </div>
                <div className="-mr-2">
                  <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Close menu</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
              <div className="mt-6">
                <nav className="grid gap-6">
                  
                    <a href="#inicio" className="-m-3 p-3 flex items-center rounded-lg hover:bg-gray-50">
                      <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-indigo-500 text-white">
                        <HomeIcon className="h-6 w-6" aria-hidden="true" />
                      </div>
                      <div className="ml-4 text-base font-medium text-gray-900">
                        Inicio
                      </div>
                    </a>

                    <a href="#beneficios" className="-m-3 p-3 flex items-center rounded-lg hover:bg-gray-50">
                      <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-indigo-500 text-white">
                        <SparklesIcon className="h-6 w-6" aria-hidden="true" />
                      </div>
                      <div className="ml-4 text-base font-medium text-gray-900">
                        Beneficios
                      </div>
                    </a>

                    <a href="#como-funciona" className="-m-3 p-3 flex items-center rounded-lg hover:bg-gray-50">
                      <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-indigo-500 text-white">
                        <LightBulbIcon className="h-6 w-6" aria-hidden="true" />
                      </div>
                      <div className="ml-4 text-base font-medium text-gray-900">
                        ¿Cómo funciona?
                      </div>
                    </a>

                    <a href="#precios" className="-m-3 p-3 flex items-center rounded-lg hover:bg-gray-50">
                      <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-indigo-500 text-white">
                        <CashIcon className="h-6 w-6" aria-hidden="true" />
                      </div>
                      <div className="ml-4 text-base font-medium text-gray-900">
                        Precios
                      </div>
                    </a>

                    <a href="#ingresa" className="-m-3 p-3 flex items-center rounded-lg hover:bg-gray-50">
                      <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-indigo-500 text-white">
                        <LoginIcon className="h-6 w-6" aria-hidden="true" />
                      </div>
                      <div className="ml-4 text-base font-medium text-gray-900">
                        Ingresa
                      </div>
                    </a>
                    
                    <a href="#quienes-somos" className="-m-3 p-3 flex items-center rounded-lg hover:bg-gray-50">
                      <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-indigo-500 text-white">
                        <UsersIcon className="h-6 w-6" aria-hidden="true" />
                      </div>
                      <div className="ml-4 text-base font-medium text-gray-900">
                        ¿Quiénes somos?
                      </div>
                    </a>

                </nav>
              </div>
            </div>
            <div className="py-6 px-5">

              <div>
                <a
                  href="mailto:quiero-contratar@defol.cl"
                  className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Contáctanos
                </a>
              </div>
              <div className="mt-4">
                <a
                  href="mailto:quiero-contratar@defol.cl"
                  className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-400 hover:bg-indigo-700"
                >
                  Contrata ahora
                </a>
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}

import Head from 'next/head';
import "tailwindcss/tailwind.css";
import Beneficios from "../components/Beneficios";
import CTA from "../components/CTA";
import Equipo from "../components/Equipo";
import Footer from "../components/Footer";
import Funcionamiento from "../components/Funcionamiento";
import Header from "../components/Header";
import Presentacion from "../components/Presentacion";
import Pricing from "../components/Pricing";
import Suscripcion from '../components/Suscripcion';

export default function Home() {
  return (
    <div className="w-full">
      <Head>
        <title>DEFOL - Defensoría On Line</title>
        <link rel="icon" href="/favicon.ico" />
        
      </Head>
      <main>
        <Header/>
        <Presentacion/>
        <Beneficios/>
        <Funcionamiento/>
        <Pricing/>
        <CTA/>
        <Equipo/>
        {/* <Suscripcion/> */}
      </main>
      <footer>
        <Footer/>
      </footer>
    </div>
  )
}

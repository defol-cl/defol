import Head from 'next/head'
import Header from "../components/Header";
import Presentacion from "../components/Presentacion";
import Footer from "../components/Footer";
import Beneficios from "../components/Beneficios";
import Funcionamiento from "../components/Funcionamiento";

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>DEFOL - Defensoría On Line</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header/>
        <Presentacion/>
        <Beneficios/>
        <Funcionamiento/>
      </main>

      <footer>
        <Footer/>
      </footer>
    </div>
  )
}

import React from "react";
import { Chart } from "react-google-charts";
import Header from '../components/header';
import Footer from '../components/footer';
import Tabela from "../components/tabela";
import Formulario from "../components/formulario";
import TabelaDeValores from "../components/tabeladevalores";
import FormularioAdd from "../components/formularioTabela";
import Grafico from "../components/graph";

function carteira() {
  return (
    <>
    < Header />
   
      <FormularioAdd />
   

<Footer />
</>
  );
}

export default carteira;


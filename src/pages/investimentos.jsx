import { useState, useEffect } from 'react';
import { getDatabase, ref, push, onValue, set } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import Footer from '../components/footer';
import Header from '../components/header';

export default function SuaPagina() {
  const [investimentos, setInvestimentos] = useState([]);
  const [nomeInvestimento, setNomeInvestimento] = useState('');
  const [valorInvestido, setValorInvestido] = useState('');
  const [taxaJuros, setTaxaJuros] = useState('');
  const [periodo, setPeriodo] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [valorTotal, setValorTotal] = useState(0);

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
        setMensagem("Você precisa estar autenticado para enviar os dados.");
        return;
    }

    const loadInvestimentos = async () => {
      const db = getDatabase();
      const userId = user.uid;
      const investimentosRef = ref(db, `users/${userId}/investimentos`);

      onValue(investimentosRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const investimentosArray = Object.values(data);
          setInvestimentos(investimentosArray);
          calcularValorTotal(investimentosArray);
        }
      });
    };

    loadInvestimentos();
  }, []);

  const calcularValorTotal = (investimentosArray) => {
    let total = 0;
    for (const investimento of investimentosArray) {
      const principal = investimento.valorInvestido;
      const taxa = investimento.taxaJuros / 100 / 12; // Taxa de juros mensal
      const tempo = investimento.periodo * 12; // Converter o período para meses
      const jurosCompostos = principal * Math.pow(1 + taxa, tempo);
      total += jurosCompostos - principal;
    }
    setValorTotal(total);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (nomeInvestimento === '' ||
        valorInvestido === '' || isNaN(parseFloat(valorInvestido)) ||
        taxaJuros === '' || isNaN(parseFloat(taxaJuros)) ||
        periodo === '' || isNaN(parseInt(periodo))) {
      setMensagem('Por favor, insira valores válidos.');
      return;
    }

    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
        setMensagem("Você precisa estar autenticado para enviar os dados.");
      return;
    }

    const db = getDatabase();
    const userId = user.uid;
    const investimentosRef = ref(db, `users/${userId}/investimentos`);

    const novoInvestimento = {
      nome: nomeInvestimento,
      valorInvestido: parseFloat(valorInvestido),
      taxaJuros: parseFloat(taxaJuros),
      periodo: parseInt(periodo),
    };

  
    const novoInvestimentoRef = push(investimentosRef, novoInvestimento);
    setMensagem('Investimento adicionado com sucesso.');

    setNomeInvestimento('');
    setValorInvestido('');
    setTaxaJuros('');
    setPeriodo('');
  };

  return (
    <div>
                  <Header />
<center>
      <h1 className='h1-form-investimento'>Sua Página</h1>
      <form className='form-investimentoS' onSubmit={handleSubmit}>
        <label className='input-tabela-investimento' htmlFor="nomeInvestimento">Nome do Investimento:</label>
        <input
          className='input-tabela-investimento2'
          type="text"
          id="nomeInvestimento"
          value={nomeInvestimento}
          onChange={(e) => setNomeInvestimento(e.target.value)}
        />
        <br />

        <label className='input-tabela-investimento' htmlFor="valorInvestido">Valor Investido:</label>
        <input
          className='input-tabela-investimento2'
          type="number"
          id="valorInvestido"
          value={valorInvestido}
          onChange={(e) => setValorInvestido(e.target.value)}
        />
        <br />

        <label className='input-tabela-investimento' htmlFor="taxaJuros">Taxa de Juros (% ao mês):</label>
        <input
          className='input-tabela-investimento2'
          type="number"
          id="taxaJuros"
          value={taxaJuros}
          onChange={(e) => setTaxaJuros(e.target.value)}
        />
        <br />

        <label className='input-tabela-investimento' htmlFor="periodo">Período (anos):</label>
        <input
        className='input-tabela-investimento2'
          type="number"
          id="periodo"
          value={periodo}
          onChange={(e) => setPeriodo(e.target.value)}
        />
        <br />

        <button className='bt-investimento' type="submit">Adicionar Investimento</button>
      </form>

      <h2 className='h1-form-investimento'>Investimentos:</h2>
      <table className='Tabela-investimento'>
        <thead>
          <tr>
            <th className='colunas-tabela'>Nome</th>
            <th className='colunas-tabela'>Valor Investido</th>
            <th className='colunas-tabela'>Taxa de Juros (% ao mês)</th>
            <th >Período (anos)</th>
          </tr>
        </thead>
        <tbody>
          {investimentos.map((investimento, index) => (
            <tr key={index}>
              <td>{investimento.nome}</td>
              <td>R$ {investimento.valorInvestido}</td>
              <td>{investimento.taxaJuros}%</td>
              <td>{investimento.periodo} anos</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2 className='h1-form-investimento'>Valor Total Ganho:</h2>
      <p>R$ {valorTotal.toFixed(2)}</p>

      {mensagem && <p>{mensagem}</p>}     
        </center>

      <Footer /> 
    </div>
  );
}

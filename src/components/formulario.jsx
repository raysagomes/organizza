import React, { useEffect, useRef, useState } from "react";
import { getDatabase, ref, set, runTransaction, onValue, get } from "firebase/database";
import { auth } from '../firebase/Firebase';
import Grafico from './graph';

function FormularioAdd() {
    const [tipo, setTipo] = useState("expense");
    const [valor, setValor] = useState("");
    const [categoria, setCategoria] = useState("");
    const [data, setData] = useState("");
    const [mensagem, setMensagem] = useState("");
    const [user, setUser] = useState(null);
    const [detalhesDespesa, setDetalhesDespesa] = useState([]);
    const [detalhesRendimento, setDetalhesRendimento] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [valorTotal, setValorTotal] = useState(0);
    const [rendimentos, setRendimentos] = useState(0);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    useEffect(() => {
        if (user) {
            const db = getDatabase();
            const userId = user.uid;
            const categoriasRef = ref(db, `users/${userId}/categorias`);
            const detalhesRef = ref(db, `users/${userId}/categorias/${categoria}/detalhes`);
            const rendimentosRef = ref(db, `users/${userId}/rendimentos`);

            onValue(detalhesRef, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    const detalhesArray = Object.values(data);
                    const detalhesDespesaArray = detalhesArray.filter(item => item.tipo === 'expense');
                    const detalhesRendimentoArray = detalhesArray.filter(item => item.tipo === 'income');
                    setDetalhesDespesa(detalhesDespesaArray);
                    setDetalhesRendimento(detalhesRendimentoArray);
                }
            });

            onValue(categoriasRef, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    const categoriasArray = Object.keys(data);
                    setCategorias(categoriasArray);
                }
            });

            // Calcular o valor total somando os gastos em todas as categorias
            let totalGastos = 0;
            categorias.forEach((cat) => {
                const totalValorRef = ref(db, `users/${userId}/categorias/${cat}/totalValor`);
                get(totalValorRef).then((snapshot) => {
                    totalGastos += snapshot.val() || 0;
                    setValorTotal(totalGastos);
                });
            });

            // Obter o valor total dos rendimentos
            get(rendimentosRef).then((snapshot) => {
                const rendimentosTotal = snapshot.val() || 0;
                setRendimentos(rendimentosTotal);
            });
        }
    }, [categoria, user, categorias]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            setMensagem("Você precisa estar autenticado para enviar os dados.");
            return;
        }

        if (valor === "" || isNaN(parseFloat(valor))) {
            setMensagem("Por favor, insira um valor numérico válido.");
            return;
        }

        if (data === "") {
            setMensagem("Por favor, insira uma data válida.");
            return;
        }

        const db = getDatabase();
        const userId = user.uid;
        const detalhesRef = ref(db, `users/${userId}/categorias/${categoria}/detalhes`);
        const rendimentosRef = ref(db, `users/${userId}/rendimentos`);

        try {
            await runTransaction(detalhesRef, (currentData) => {
                const detalhes = currentData || [];
                detalhes.push({
                    tipo: tipo,
                    categoria: categoria,
                    valor: parseFloat(valor),
                    data: data,
                });
                set(detalhesRef, detalhes);
                return detalhes;
            });

            // Atualizar rendimentos se for um rendimento (income)
            if (tipo === "income") {
                await runTransaction(rendimentosRef, (currentTotal) => {
                    const novoTotal = (currentTotal || 0) + parseFloat(valor);
                    set(rendimentosRef, novoTotal);
                    setRendimentos(novoTotal);
                    return novoTotal;
                });
            }

            setMensagem("Dados enviados com sucesso para o Firebase Realtime Database!");
            setValor("");
            setData("");
        } catch (error) {
            setMensagem("Ocorreu um erro ao enviar os dados.");
            console.error(error);
        }
    };

    return (
        <center>
            <div className="formulario-container">
                <form onSubmit={handleSubmit}>
                    <label className="select-categoria2">
                        Tipo:
                        <select
                            value={tipo}
                            onChange={(e) => setTipo(e.target.value)}
                            className="select-categoria"
                        >
                            <option value="expense">Despesa</option>
                            <option value="income">Rendimento</option>
                        </select>
                    </label>
                    <br />
                    <label className="select-categoria2">
                        Categoria:
                        <select
                            value={categoria}
                            onChange={(e) => setCategoria(e.target.value)}
                            className="select-categoria"
                        >
                            <option value="">Escolha uma categoria</option>
                            {categorias.map((cat, index) => (
                                <option key={index} value={cat}>
                                    {cat}
                                </option>
                            ))}
                        </select>
                    </label>
                    <br />
                    <label className="select-categoria2">
                        Valor:
                        <input
                            type="text"
                            value={valor}
                            onChange={(e) => setValor(e.target.value)}
                            className="select-categoria"
                        />
                    </label>
                    <br />
                    <label className="select-categoria2">
                        Data:
                        <input
                            type="text"
                            value={data}
                            onChange={(e) => setData(e.target.value)}
                            className="select-categoria"
                        />
                    </label>
                    <br />
                    <button className="bt-add" type="submit">Adicionar</button>
                </form>
                <div>{mensagem}</div>

                <h1 className="h1-tabela">Valor total gasto em todas as categorias: {valorTotal}</h1>
                <h1 className="h1-tabela">Valor total de rendimentos: {rendimentos}</h1>
                <h2 className="h2-tabela">Detalhes da Categoria</h2>

                <table className="Tabela-historico">
                    <thead>
                        <tr className="conteudo-linhas">
                            <th className="colunas-tabela">Tipo</th>
                            <th className="colunas-tabela">Categoria</th>
                            <th className="colunas-tabela">Valor</th>
                            <th className="colunas-tabela">Data</th>
                        </tr>
                    </thead>
                    <tbody>
                        {detalhesDespesa.map((item, index) => (
                            <tr key={index}>
                                <td>Despesa</td>
                                <td>{item.categoria}</td>
                                <td>{item.valor}</td>
                                <td>{item.data}</td>
                            </tr>
                        ))}
                        {detalhesRendimento.map((item, index) => (
                            <tr key={index}>
                                <td>Rendimento</td>
                                <td>{item.categoria}</td>
                                <td>{item.valor}</td>
                                <td>{item.data}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="Grafico">
                <Grafico detalhesDespesa={detalhesDespesa} detalhesRendimento={detalhesRendimento} />
            </div>
        </center>
    );
}

export default FormularioAdd;

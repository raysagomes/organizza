import React, { useState, useEffect } from "react";
import { getDatabase, ref, set, runTransaction, onValue } from "firebase/database";
import { auth } from '../pages/Firebase';
import Grafico from './graph';

function FormularioAdd() {
    const [tipo, setTipo] = useState("expense");
    const [valor, setValor] = useState("");
    const [categoria, setCategoria] = useState("");
    const [data, setData] = useState("");
    const [mensagem, setMensagem] = useState("");
    const [user, setUser] = useState(null);
    const [detalhes, setDetalhes] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [valorTotalRendimentos, setValorTotalRendimentos] = useState(0);
    const [valorTotalDespesas, setValorTotalDespesas] = useState(0);

    const calcularValoresTotais = (detalhes) => {
        // Calcular o valor total dos rendimentos e despesas
        const totalRendimentos = detalhes
            .filter((item) => item.tipo === "income")
            .reduce((total, item) => total + item.valor, 0);

        const totalDespesas = detalhes
            .filter((item) => item.tipo === "expense")
            .reduce((total, item) => total + item.valor, 0);

        setValorTotalRendimentos(totalRendimentos);
        setValorTotalDespesas(totalDespesas);
    };

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

            onValue(detalhesRef, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    const detalhesArray = Object.values(data);
                    setDetalhes(detalhesArray);
                    calcularValoresTotais(detalhesArray);
                }
            });

            onValue(categoriasRef, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    const categoriasArray = Object.keys(data);
                    setCategorias(categoriasArray);
                }
            });
        }
    }, [categoria, user]);

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
                calcularValoresTotais(detalhes);
                return detalhes;
            });

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
                        {detalhes.map((item, index) => (
                            <tr key={index}>
                                <td>{item.tipo === 'expense' ? 'Despesa' : 'Rendimento'}</td>
                                <td>{item.categoria}</td>
                                <td>{item.valor}</td>
                                <td>{item.data}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="total-container">
                    <p>Total Despesas: {valorTotalDespesas}</p>
                    <p>Total Rendimentos: {valorTotalRendimentos}</p>
                </div>
            </div>
            <div className="Grafico">
                <Grafico
                    detalhes={detalhes}
                    valorTotalDespesas={valorTotalDespesas}
                    valorTotalRendimentos={valorTotalRendimentos}
                />
            </div>
        </center>
    );
}

export default FormularioAdd;

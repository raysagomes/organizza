import React, { useState } from "react";
import { getDatabase, ref, set } from "firebase/database";
import { auth } from '../firebase/Firebase';

function Tabela() {
    const db = getDatabase();
    const user = auth.currentUser;
    const userId = user ? user.uid : null;
    
    const [valor, setValor] = useState("");
    const [descricao, setDescricao] = useState("");
    const [data, setData] = useState("");
    const [mensagem, setMensagem] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!userId) {
            setMensagem("Você precisa estar autenticado para enviar os dados.");
            return;
        }

        if (valor !== "" && descricao !== "" && data !== "") {
            const userRef = ref(db, `users/${userId}/tabelaValores`);
            const novoDadoRef = push(userRef); // Crie uma nova referência para adicionar um novo dado
            const novoDadoKey = key(novoDadoRef); // Obtenha a chave do novo dado
            const dados = {
                valor: valor,
                descricao: descricao,
                data: data
            };

            set(ref(novoDadoRef, novoDadoKey), dados) // Use a referência do novo dado para definir os dados
            setMensagem("Dados enviados com sucesso para o Firebase Realtime Database!");
        } else {
            setMensagem("Alguns valores estão faltando ou são vazios.");
        }
    };

    return (
        <div>
            <h2>Tabela</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Valor:
                    <input
                        type="text"
                        value={valor}
                        onChange={(e) => setValor(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Descrição:
                    <input
                        type="text"
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Data:
                    <input
                        type="text"
                        value={data}
                        onChange={(e) => setData(e.target.value)}
                    />
                </label>
                <br />
                <button type="submit">Enviar</button>
            </form>
            <div>{mensagem}</div>
        </div>
    );
}

export default Tabela;

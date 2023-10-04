import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { auth } from '../firebase/Firebase';

function TabelaDeValores() {
    const db = getDatabase();
    const user = auth.currentUser;
    const userId = user ? user.uid : null;
    const tabelaRef = userId ? ref(db, `users/${userId}/tabelaValores`) : null;
    const [valores, setValores] = useState([]);

    useEffect(() => {
        if (tabelaRef) {
            onValue(tabelaRef, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    const valoresArray = Object.values(data);
                    setValores(valoresArray);
                }
            });
        }
    }, [tabelaRef]);

    return (
        <div>
            <h2>Tabela de Valores</h2>
            <table>
                <thead>
                    <tr>
                        <th>Valor</th>
                        <th>Descrição</th>
                        <th>Data</th>
                    </tr>
                </thead>
                <tbody>
                    {valores.map((item, index) => (
                        <tr key={index}>
                            <td>{item.valor}</td>
                            <td>{item.descricao}</td>
                            <td>{item.data}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TabelaDeValores;

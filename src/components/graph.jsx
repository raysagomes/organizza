import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

function Grafico({ detalhes, valorTotalDespesas, valorTotalRendimentos }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        let chart = null;
        const ctx = canvasRef.current.getContext("2d");

        async function createChart() {
            // Verifique se já existe um gráfico e destrua-o antes de criar um novo
            if (chart) {
                chart.destroy();
            }

            // Extrair os valores de detalhes para as barras de despesa e rendimento
            const valoresDespesa = detalhes
                .filter((item) => item.tipo === "expense")
                .map((item) => item.valor);
            const valoresRendimento = detalhes
                .filter((item) => item.tipo === "income")
                .map((item) => item.valor);

            // Criar os dados para o gráfico
            const data = {
                labels: ["Despesa", "Rendimento"],
                datasets: [
                    {
                        label: "Valores",
                        data: [
                            valoresDespesa.reduce((a, b) => a + b, 0),
                            valoresRendimento.reduce((a, b) => a + b, 0),
                        ],
                        backgroundColor: ["rgba(255, 99, 132, 0.6)", "rgba(75, 192, 192, 0.6)"],
                    },
                ],
            };

            // Crie o novo gráfico
            chart = new Chart(ctx, {
                type: "bar",
                data: data,
            });
        }

        createChart();

        return () => {
            // Limpe o gráfico quando o componente for desmontado
            if (chart) {
                chart.destroy();
            }
        };
    }, [detalhes]);

    return <canvas ref={canvasRef} />;
}

export default Grafico;

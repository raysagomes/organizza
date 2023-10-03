import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

function Grafico({ valorTotalDespesas, valorTotalRendimentos, valorTotal }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);
  
  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");

    // Certifique-se de que o gráfico existente seja destruído antes de criar um novo
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    // Configurar dados para o gráfico
    const data = {
      labels: ["Despesas", "Rendimentos", "Totais"],
      datasets: [
        {
          label: "Valores",
          data: [valorTotalDespesas, valorTotalRendimentos, valorTotal],
          backgroundColor: ["#FF1717", "#46FF17",  "#FFE817"],
        },
      ],
    };

    // Criar o gráfico e armazená-lo em chartRef.current
    chartRef.current = new Chart(ctx, {
      type: "bar",
      data: data,
    });
  }, [valorTotalDespesas, valorTotalRendimentos, valorTotal]);

  return <canvas ref={canvasRef} />;
}

export default Grafico;

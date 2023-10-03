import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

function Grafico({ valorTotalDespesas, valorTotalRendimentos }) {
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
      labels: ["Despesas", "Rendimentos"],
      datasets: [
        {
          label: "Valores",
          data: [valorTotalDespesas, valorTotalRendimentos],
          backgroundColor: ["rgba(255, 99, 132, 0.6)", "rgba(75, 192, 192, 0.6)"],
        },
      ],
    };

    // Criar o gráfico e armazená-lo em chartRef.current
    chartRef.current = new Chart(ctx, {
      type: "bar",
      data: data,
    });
  }, [valorTotalDespesas, valorTotalRendimentos]);

  return <canvas ref={canvasRef} />;
}

export default Grafico;

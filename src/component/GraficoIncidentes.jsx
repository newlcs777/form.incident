import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend, ChartDataLabels);

export default function GraficoIncidentes({ incidents }) {
  // Conta incidentes por unidade
  const contagem = incidents.reduce((acc, item) => {
    acc[item.unidade] = (acc[item.unidade] || 0) + 1;
    return acc;
  }, {});

  const labels = Object.keys(contagem);
  const valores = Object.values(contagem);

  // Gradiente azul estilo Descomplica SP
  const gradientColor = (ctx) => {
    const chart = ctx.chart;
    const { ctx: canvas } = chart;

    const gradient = canvas.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, "#0060FF");
    gradient.addColorStop(1, "#0033A0");

    return gradient;
  };

  const data = {
    labels,
    datasets: [
      {
        label: "Incidentes",
        data: valores,
        backgroundColor: gradientColor,
        borderRadius: 12,
        maxBarThickness: 60, // 🔥 deixa barras modernas e finas
      },
    ],
  };

  const options = {
    plugins: {
      legend: { display: false },

      // 🔥 Mostra o número em cima da barra
      datalabels: {
        color: "#0033A0",
        anchor: "end",
        align: "end",
        font: { weight: "bold", size: 14 },
      },

      tooltip: {
        backgroundColor: "#0033A0",
        titleColor: "#fff",
        bodyColor: "#fff",
        padding: 10,
        cornerRadius: 6,
      },
    },

    responsive: true,
    maintainAspectRatio: false,

    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#0033A0", font: { weight: "600" } },
      },
      y: {
        beginAtZero: true,
        grid: { color: "#E5ECF6" },
        ticks: {
          stepSize: 1,
          color: "#0033A0",
          font: { weight: 600 },
        },
      },
    },
  };

  return (
    <div className="bg-white p-8 border border-[#D9DCE1] rounded-2xl shadow-md mt-10 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-[#0033A0] text-center mb-8">
        Incidentes por Unidade
      </h2>

      <div className="p-6 bg-[#F4F6FA] rounded-xl shadow-inner h-[380px]">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}

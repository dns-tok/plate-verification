import React, { useRef, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  LineController,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  LineController,
  Title,
  Tooltip,
  Legend,
  Filler
);

const PriceEvolutionChart = ({ historicoPreco = [], valorAtual = null }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  // Month names in Portuguese
  const monthNames = [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez",
  ];

  // Get last 12 items from historicoPreco
  const getLast12MonthsData = () => {
    if (!historicoPreco || historicoPreco.length === 0) {
      return [];
    }

    // Get last 12 items from historicoPreco
    const last12Items = historicoPreco.slice(-12);

    // Format the data for the chart
    const monthlyData = last12Items.map((item) => {
      const year = parseInt(item.ano);
      const month = parseInt(item.mes);
      const value = parseFloat(item.valor) || 0;
      const monthLabel = `${monthNames[month - 1]}/${year}`;
      return { month: monthLabel, price: value };
    });

    return monthlyData;
  };

  useEffect(() => {
    if (!chartRef.current) return;

    const monthlyData = getLast12MonthsData();

    if (monthlyData.length === 0) {
      return;
    }

    const labels = monthlyData.map((d) => d.month);
    const data = monthlyData.map((d) => d.price);

    // Calculate min and max prices dynamically
    const prices = data.filter((p) => p > 0);
    if (prices.length === 0) return;

    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const priceRange = maxPrice - minPrice;
    const padding = priceRange * 0.1; // 10% padding

    const chartMinPrice = Math.max(0, minPrice - padding);
    const chartMaxPrice = maxPrice + padding;

    // Calculate step size based on range
    const stepSize = Math.max(1000, Math.ceil(priceRange / 10 / 1000) * 1000);

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    chartInstanceRef.current = new ChartJS(chartRef.current, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "Preço (R$)",
            data,
            borderColor: "#1AABFE",
            backgroundColor: "rgba(26, 171, 254, 0.15)",
            borderWidth: 4,
            fill: true,
            tension: 0.45,
            pointRadius: 5,
            pointBackgroundColor: "#1AABFE",
            pointBorderColor: "#ffffff",
            pointBorderWidth: 2,
            pointHoverRadius: 7,
            pointHoverBackgroundColor: "#194D9A",
            pointHoverBorderColor: "#ffffff",
            pointHoverBorderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: "rgba(0,0,0,0.8)",
            padding: 12,
            titleFont: { size: 14, weight: "bold" },
            bodyFont: { size: 13 },
            callbacks: {
              label: (context) =>
                `R$ ${context.parsed.y.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}`,
            },
          },
        },
        scales: {
          y: {
            min: chartMinPrice,
            max: chartMaxPrice,
            ticks: {
              stepSize: stepSize,
              callback: (value) =>
                `R$ ${value.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}`,
              font: { size: 11 },
              color: "#666",
            },
            grid: { color: "rgba(0,0,0,0.1)" },
          },
          x: {
            ticks: {
              font: { size: 10 },
              color: "#666",
              maxRotation: 45,
              minRotation: 45,
            },
            grid: { display: false },
          },
        },
      },
    });

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
      }
    };
  }, [historicoPreco, valorAtual]);

  return (
    <div className="h-[500px] w-full">
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default PriceEvolutionChart;

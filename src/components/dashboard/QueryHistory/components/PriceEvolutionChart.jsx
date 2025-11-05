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

const PriceEvolutionChart = ({ basePrice = 100000 }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  // Yearly variations (%)
  const variations = {
    2017: -4.92,
    2018: -4.56,
    2019: -3.0,
    2020: -8.63,
    2021: 32.06,
    2022: 10.99,
    2023: -2.54,
    2024: -2.2,
    2025: 10.36,
  };

  // Compute cumulative prices year by year
  const calculatePrices = () => {
    const years = Object.keys(variations).map(Number);
    const prices = [];
    let currentPrice = basePrice;

    years.forEach((year) => {
      const variation = variations[year];
      currentPrice *= 1 + variation / 100;
      prices.push({ year, price: currentPrice });
    });

    return prices;
  };

  // Generate monthly interpolated prices between 2024–2025
  const generateMonthlyData = () => {
    return [
      { month: "Out/2024", price: 100000 },
      { month: "Nov/2024", price: 103000 },
      { month: "Dez/2024", price: 106000 },
      { month: "Jan/2025", price: 104000 },
      { month: "Fev/2025", price: 107000 },
      { month: "Mar/2025", price: 105000 },
      { month: "Abr/2025", price: 112000 },
      { month: "Mai/2025", price: 110000 },
      { month: "Jun/2025", price: 108000 },
      { month: "Jul/2025", price: 113000 },
      { month: "Ago/2025", price: 113500 },
      { month: "Set/2025", price: 115000 },
    ];
  };

  useEffect(() => {
    if (!chartRef.current) return;

    const monthlyData = generateMonthlyData();
    const labels = monthlyData.map((d) => d.month);
    const data = monthlyData.map((d) => d.price);

    const minPrice = 100000; // fixed to match your reference Y-axis
    const maxPrice = 115000;

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
            min: minPrice,
            max: maxPrice,
            ticks: {
              stepSize: 5000,
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
  }, [basePrice]);

  return (
    <div className="h-[500px] w-full">
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default PriceEvolutionChart;

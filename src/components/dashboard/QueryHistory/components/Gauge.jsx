import React, { useEffect, useRef } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  DoughnutController,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, DoughnutController);

const Gauge = ({
  value = 50,
  min = 0,
  max = 100,
  label = "Nível de risco geral",
  isPercentage = true,
  invertColors = false,
}) => {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // ✅ Destroy old chart to prevent "canvas already in use" error
    if (chartRef.current) {
      chartRef.current.destroy();
      chartRef.current = null;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Normalize percentage (0–100)
    const percentage = Math.max(min, Math.min(value, max));
    const percent = ((percentage - min) / (max - min)) * 100;

    // ✅ Dynamic color logic for center text
    const color =
      percent >= 75
        ? invertColors
          ? "#00b050"
          : "#f44336" // red
        : percent >= 50
        ? "#ffeb3b" // yellow
        : percent >= 25
        ? "#ff9800" // orange
        : invertColors
        ? "#f44336"
        : "#00b050"; // green

    // ✅ Chart setup - always show full gradient arc
    const chart = new ChartJS(ctx, {
      type: "doughnut",
      data: {
        datasets: [
          {
            data: [100], // Full arc always visible
            backgroundColor: ["transparent"], // Transparent, gradient drawn by plugin
            borderWidth: 0,
            circumference: 180,
            rotation: 270,
            cutout: "70%",
          },
        ],
      },
      options: {
        responsive: true,
        animation: {
          duration: 800,
          easing: "easeOutCubic",
        },
        plugins: { tooltip: { enabled: false } },
      },
      plugins: [
        // ✅ Gradient arc plugin - draws full gradient arc
        {
          id: "gradientArc",
          beforeDatasetDraw(chart) {
            const { ctx } = chart;
            const meta = chart.getDatasetMeta(0).data[0];
            const cx = meta.x;
            const cy = meta.y;
            const innerRadius = meta.innerRadius;
            const outerRadius = meta.outerRadius;

            // Draw gradient arc manually
            ctx.save();

            // Create gradient that follows the arc (left to right)
            const gradient = ctx.createLinearGradient(
              cx - outerRadius,
              cy,
              cx + outerRadius,
              cy
            );
            gradient.addColorStop(0, invertColors ? "#f44336" : "#00b050"); // green at left
            gradient.addColorStop(0.5, "#ffeb3b"); // yellow in middle
            gradient.addColorStop(1, invertColors ? "#00b050" : "#f44336"); // red at right

            // Draw the semi-circular arc (bottom half, matching Chart.js rotation)
            // Start at 180° (left) and go to 0° (right) for bottom half
            ctx.beginPath();
            ctx.arc(cx, cy, outerRadius, Math.PI, 0, false); // Outer arc: bottom half
            ctx.arc(cx, cy, innerRadius, 0, Math.PI, true); // Inner arc: reverse direction
            ctx.closePath();
            ctx.fillStyle = gradient;
            ctx.fill();

            ctx.restore();
          },
        },

        // ✅ Needle plugin
        {
          id: "needle",
          afterDatasetDraw(chart) {
            const { ctx } = chart;
            const meta = chart.getDatasetMeta(0).data[0];
            const cx = meta.x;
            const cy = meta.y;
            const radius = meta.outerRadius;
            const angle = Math.PI * (percent / 100);

            ctx.save();
            ctx.translate(cx, cy);
            ctx.rotate(Math.PI + angle);

            // Draw needle
            ctx.beginPath();
            ctx.moveTo(0, -10);
            ctx.lineTo(radius - 5, 0);
            ctx.lineTo(0, 10);
            ctx.fillStyle = "#111";
            ctx.fill();

            // Draw circular base (black outer circle)
            ctx.beginPath();
            ctx.arc(0, 0, 10, 0, Math.PI * 2);
            ctx.fillStyle = "#111";
            ctx.fill();

            // "Punch out" a white inner circle (to create a hollow look)
            ctx.globalCompositeOperation = "destination-out";
            ctx.beginPath();
            ctx.arc(0, 0, 5, 0, Math.PI * 2);
            ctx.fill();

            // Reset composite operation back to normal
            ctx.globalCompositeOperation = "source-over";

            ctx.restore();
          },
        },

        isPercentage && {
          id: "centerText",
          afterDraw(chart) {
            const { ctx } = chart;
            const meta = chart.getDatasetMeta(0).data[0];
            const cx = meta.x;
            const cy = meta.y;
            ctx.save();
            ctx.fillStyle = color;
            ctx.font = "bold 16px Arial";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(`${Math.round(percent)}%`, cx, cy + 20);
            ctx.restore();
          },
        },
      ],
    });

    chartRef.current = chart;

    // ✅ Cleanup
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  }, [value, min, max]);

  return (
    <div className="border-2 border-[#1AABFE]/80 rounded-xl  flex flex-col items-center justify-between p-4 relative">
      <p className="mb-[-20px] text-[#194D9A] font-medium me-auto ">{label}</p>
      <canvas ref={canvasRef} className="!w-[80%] !h-auto object-contain" />
      <div
        className={`absolute bottom-8 flex justify-between text-[13px] text-[#0078d7] font-medium w-[70%]`}
      >
        <span> {isPercentage ? `${min}%` : "Baixa"}</span>
        <span> {isPercentage ? `${max}%` : "Alta"}</span>
      </div>
    </div>
  );
};

export default Gauge;

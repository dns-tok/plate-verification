import React, { useEffect, useRef } from "react";

const HorizontalGauge = ({
  value = 50,
  min = 0,
  max = 100,
  label = "Nível de risco geral",
  isPercentage = true,
  steps = 10, // number of boxes
}) => {
  const canvasRef = useRef(null);

  // Helper: interpolate between two colors
  const interpolateColor = (color1, color2, factor) => {
    const c1 = color1.match(/\d+/g).map(Number);
    const c2 = color2.match(/\d+/g).map(Number);
    const result = c1.map((c, i) => Math.round(c + factor * (c2[i] - c)));
    return `rgb(${result[0]},${result[1]},${result[2]})`;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    const barY = height / 3;
    const barHeight = height / 3;
    const boxWidth = width / steps;

    // Gradient stops: green → yellow → red
    const colors = [
      { pos: 0, color: "rgb(0,176,80)" }, // green
      { pos: 0.5, color: "rgb(255,235,59)" }, // yellow
      { pos: 1, color: "rgb(244,67,54)" }, // red
    ];

    // Draw each box with interpolated color
    for (let i = 0; i < steps; i++) {
      const t = i / (steps - 1); // 0 → 1
      let color;
      if (t <= 0.5) {
        color = interpolateColor(colors[0].color, colors[1].color, t / 0.5);
      } else {
        color = interpolateColor(
          colors[1].color,
          colors[2].color,
          (t - 0.5) / 0.5
        );
      }
      ctx.fillStyle = color;
      ctx.fillRect(i * boxWidth, barY, boxWidth - 2, barHeight); // small gap
    }

    // Draw needle
    const percent = Math.max(min, Math.min(value, max));
    const needleX = ((percent - min) / (max - min)) * width;

    ctx.beginPath();
    ctx.moveTo(needleX, barY + barHeight - 10); // tip of the needle (bottom)
    ctx.lineTo(needleX - 10, 0); // left top
    ctx.lineTo(needleX + 10, 0); // right top
    ctx.closePath();
    ctx.fillStyle = "#111";
    ctx.fill();

    // Draw value above needle
    // ctx.fillStyle = "#111";
    // ctx.font = "bold 12px Arial";
    // ctx.textAlign = "center";
    // ctx.fillText(isPercentage ? `${percent}%` : percent, needleX, height / 6);
  }, [value, min, max, steps]);

  return (
    <div className="border-2 border-[#1AABFE]/80 rounded-xl p-4 flex flex-col items-center relative">
      {/* <p className="mb-2 text-[#1f4e79] font-medium">{label}</p> */}
      <canvas
        ref={canvasRef}
        width={300}
        height={50}
        className="w-full !h-12"
      />
      {/* <div className="absolute bottom-2 flex justify-between text-[13px] text-[#0078d7] font-medium w-full px-2">
        <span>{isPercentage ? `${min}%` : "Low"}</span>
        <span>{isPercentage ? `${max}%` : "High"}</span>
      </div> */}
    </div>
  );
};

export default HorizontalGauge;

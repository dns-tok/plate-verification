import React from "react";

/**
 * Reusable component for vertical score bar with three segments (green, yellow, red)
 * and a pointer indicating the score position
 */
const ScoreBar = ({ score, label = "Score" }) => {
  // Convert score to number if it's a string

  // Determine which segment the score falls into
  // Score 1 = Green (top), Score 2 = Yellow (middle), Score 3 = Red (bottom)
  const scoreValue = Number(score);

  const clampedScore = Math.min(Math.max(scoreValue, 1), 4);

  // Determine active segment
  const segmentPosition =
    clampedScore === 1
      ? "top"
      : clampedScore === 2
      ? "upperMiddle"
      : clampedScore === 3
      ? "lowerMiddle"
      : "bottom";

  // Get score description based on value
  const getScoreDescription = (score) => {
    switch (score) {
      case 1:
        return {
          title: "Pequenos Danos",
          description:
            "Veículos com este score possuem indícios de pequenos danos, como arranhões, pequenos amassados e avarias leves no momento do leilão.",
        };
      case 2:
        return {
          title: "Médios Danos",
          description:
            "Veículos com este score possuem indícios de médios danos, como amassados grandes, partes quebradas e problemas mecânicos no momento do leilão. Origem comum: veículos de acidentes, enchentes, recuperados de roubo com médios danos, de empresas públicas/privadas com danos ou avaria, e de seguradoras.",
        };
      case 3:
        return {
          title: "Grandes Danos",
          description:
            "Veículos com este score possuem indícios de grandes danos, como estrutura comprometida, danos extensos e problemas mecânicos graves no momento do leilão.",
        };
      default:
        return {
          title: "Sem Classificação",
          description: "Score não classificado.",
        };
    }
  };

  const scoreInfo = getScoreDescription(scoreValue);

  return (
    <div className="flex flex-col md:flex-row gap-6 items-start rounded-xl h-35">
      {/* Score Number and Bar */}
      <div className=" h-full flex items-center justify-center bg-white border-2 border-[#1AABFE]/80 rounded-2xl px-8 py-2 w-fit">
        {/* Left: Score number */}
        <div className="text-[6rem] font-extrabold text-orange-500 leading-none mr-4">
          {clampedScore}
        </div>

        {/* Right: Vertical color bar */}
        <div className="relative w-9 h-full flex flex-col rounded-full overflow-hidden p-2 ">
          <div className="w-full h-full flex flex-col rounded-full overflow-hidden ">
            {/* Green (Top) */}
            <div
              className={`flex-1 bg-green-500 ${
                segmentPosition === "top"
                  ? "ring-2 ring-white relative z-10"
                  : ""
              }`}
            />
            {/* Yellow (Upper Middle) */}
            <div
              className={`flex-1 bg-yellow-400 ${
                segmentPosition === "upperMiddle"
                  ? "ring-2 ring-white relative z-10"
                  : ""
              }`}
            />
            {/* Orange (Lower Middle) */}
            <div
              className={`flex-1 bg-orange-400 ring-2 ring-white relative z-10 `}
            />
            {/* Red (Bottom) */}
            <div
              className={`flex-1 bg-red-500 ${
                segmentPosition === "bottom"
                  ? "ring-2 ring-white relative z-10"
                  : ""
              }`}
            />

            {/* Pointer (Black triangle) */}
            <div
              className={`absolute right-0 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[10px] border-r-black z-20 transition-all duration-300 ${
                segmentPosition === "top"
                  ? "top-[12%]"
                  : segmentPosition === "upperMiddle"
                  ? "top-[37%]"
                  : segmentPosition === "lowerMiddle"
                  ? "top-[62%]"
                  : "top-[87%]"
              }`}
              style={{ transform: "translateY(-50%)" }}
            />
          </div>
        </div>
      </div>

      {/* Score Description */}
      <div className="flex-1 border-2 border-[#1AABFE]/80 rounded-xl p-4 bg-white">
        <div className="space-y-2">
          <p className="text-sm font-semibold text-[#194D9A]">
            Score Pontuação: {scoreInfo.title}
          </p>
          <p className="text-sm text-gray-800">{scoreInfo.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ScoreBar;

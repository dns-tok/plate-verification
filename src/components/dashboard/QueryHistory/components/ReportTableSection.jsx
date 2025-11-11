import React from "react";
import ReportSection from "./ReportSection";

/**
 * Reusable component for table sections in reports
 */
const ReportTableSection = ({ title, headers, rows, desc, className = "" }) => {
  if (!rows || rows.length === 0) return null;

  const tableContent = (
    <div className="">
      <div className="min-w-full border-collapse space-y-2">
        <div className="bg-[#1AABFE] text-white flex items-center justify-between px-2 py-1 rounded-full">
          {headers.map((header, index) => (
            <p
              key={index}
              className="px-2 py-1 text-[0.7rem] font-medium text-center  !break-words w-full "
            >
              {header}
            </p>
          ))}
        </div>

        <div className="space-y-2">
          {rows.map((row, rowIndex) => (
            <div key={rowIndex} className="flex flex-col  w-full  gap-2 ">
              <div
                key={rowIndex}
                className="bg-[#1AABFE]/10 text-white flex items-center justify-between px-2 py-1 rounded-full w-full"
              >
                {row.map((cell, cellIndex) => (
                  <p
                    key={cellIndex}
                    className={`${
                      parseFloat(cell) < 0 ? "text-red-500" : "text-[#194D9A]"
                    } px-2 py-1 text-[0.7rem] text-center w-full break-words break-all`}
                  >
                    {cell || "-"}
                  </p>
                ))}
              </div>
              {desc && (
                <div className="text-[0.7rem] border border-[#1AABFE] text-[#1AABFE] w-full rounded-full h-[31px] flex items-center ">
                  <span className="font-bold bg-[#1AABFE] text-white px-4 py-2 rounded-full me-4 ">
                    Descrição:
                  </span>{" "}
                  {desc[rowIndex]}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // If title is provided, wrap in ReportSection, otherwise return just the table
  if (title) {
    return (
      <ReportSection title={title} className={className}>
        {tableContent}
      </ReportSection>
    );
  }

  return <div className={className}>{tableContent}</div>;
};

export default ReportTableSection;

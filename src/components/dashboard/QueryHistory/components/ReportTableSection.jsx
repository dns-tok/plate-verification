import React from "react";
import ReportSection from "./ReportSection";

/**
 * Reusable component for table sections in reports
 */
const ReportTableSection = ({ title, headers, rows, className = "" }) => {
  if (!rows || rows.length === 0) return null;

  const tableContent = (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="bg-[#1AABFE] text-white">
            {headers.map((header, index) => (
              <th
                key={index}
                className="first:!rounded-l-full last:!rounded-r-full px-2 py-1 text-left text-xs font-medium  whitespace-nowrap"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="">
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="bg-[#1AABFE]/10 ">
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className={`first:!rounded-l-full last:!rounded-r-full px-2 py-1 text-xs text-[#194D9A] whitespace-nowrap`}
                >
                  {cell || "-"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
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

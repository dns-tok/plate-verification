import React, { useState, useRef, useEffect, useMemo } from "react";
import { Document, Page } from "react-pdf";

const PdfViewer = ({ url }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageWidth, setPageWidth] = useState(800);
  const containerRef = useRef(null);

  // Memoize file prop → prevents warning
  const file = useMemo(() => ({ url }), [url]);

  // Responsive width
  useEffect(() => {
    const observer = new ResizeObserver(() => {
      if (containerRef.current) {
        setPageWidth(containerRef.current.clientWidth);
      }
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
      setPageWidth(containerRef.current.clientWidth);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full overflow-auto">
      <Document
        file={file}
        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
        onLoadError={(err) => console.error("PDF load error:", err)}
        loading={<p className="p-4 text-center">Carregando PDF...</p>}
        error={
          <p className="p-4 text-center text-red-500">Erro ao carregar PDF.</p>
        }
      >
        {Array.from(new Array(numPages), (unused, i) => (
          <Page
            key={`page_${i + 1}`}
            pageNumber={i + 1}
            width={pageWidth}
            renderAnnotationLayer={false}
            renderTextLayer={false}
          />
        ))}
      </Document>
    </div>
  );
};

export default PdfViewer;

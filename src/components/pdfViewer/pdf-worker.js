import { pdfjs } from "react-pdf";
import workerSrc from "pdfjs-dist/build/pdf.worker.mjs?url";

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

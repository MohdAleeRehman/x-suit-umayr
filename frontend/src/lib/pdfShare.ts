import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { SavedRecord } from "@/types/records";

const prettyLabel = (key: string) =>
  key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (char) => char.toUpperCase())
    .trim();

const valueToText = (value: unknown): string => {
  if (value === null || value === undefined) return "-";
  if (typeof value === "number") {
    return Number.isInteger(value) ? value.toLocaleString("en-US") : value.toFixed(2);
  }
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
};

const buildRows = (record: SavedRecord): Array<[string, string]> => {
  const dataset = record.dataset || {};
  return Object.entries(dataset).map(([key, value]) => [prettyLabel(key), valueToText(value)]);
};

const downloadBlob = (blob: Blob, filename: string) => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
};

export async function shareRecordPdf(record: SavedRecord): Promise<"shared" | "downloaded"> {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const generatedAt = new Date(record.createdAt).toLocaleString("en-AE");

  doc.setFillColor(211, 47, 47);
  doc.rect(0, 0, 595, 86, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text("X Suite Real Estate Summary", 40, 40);
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.text(`Module: ${record.type.toUpperCase()}`, 40, 62);

  doc.setTextColor(24, 33, 47);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text(record.title, 40, 120);

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(`Generated: ${generatedAt}`, 40, 140);

  autoTable(doc, {
    startY: 160,
    head: [["Field", "Value"]],
    body: buildRows(record),
    styles: {
      fontSize: 10,
      cellPadding: 7,
      textColor: [24, 33, 47],
      lineColor: [226, 232, 240],
      lineWidth: 0.5,
    },
    headStyles: {
      fillColor: [24, 33, 47],
      textColor: [255, 255, 255],
      fontStyle: "bold",
    },
    alternateRowStyles: {
      fillColor: [248, 250, 252],
    },
    columnStyles: {
      0: { cellWidth: 200, fontStyle: "bold" },
      1: { cellWidth: "auto" },
    },
    margin: { left: 40, right: 40 },
  });

  const fileName = `x-suite-${record.type}-${record._id.slice(-6)}.pdf`;
  const blob = doc.output("blob");

  const supportsFileShare =
    typeof navigator !== "undefined" &&
    typeof navigator.share === "function" &&
    typeof navigator.canShare === "function";

  if (supportsFileShare) {
    const pdfFile = new File([blob], fileName, { type: "application/pdf" });
    if (navigator.canShare({ files: [pdfFile] })) {
      await navigator.share({
        title: record.title,
        text: "X Suite PDF report",
        files: [pdfFile],
      });
      return "shared";
    }
  }

  downloadBlob(blob, fileName);
  return "downloaded";
}

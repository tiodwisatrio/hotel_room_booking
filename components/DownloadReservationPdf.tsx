"use client";
import React from "react";

const DownloadReservationPdf = ({
  reservationId,
}: {
  reservationId: string;
}) => {
  const downloadPdf = async () => {
    try {
      const res = await fetch(`/api/reservations/${reservationId}/pdf`);
      if (!res.ok) {
        const text = await res.text().catch(() => "<no body>");
        console.error("PDF endpoint returned non-OK:", res.status, text);
        alert(
          `Failed to generate PDF: ${res.status}\nSee terminal or console for details.`
        );
        return;
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `reservation-${reservationId}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download error", err);
      alert("Gagal mengunduh PDF (lihat console).");
    }
  };

  return (
    <button
      type="button"
      className="px-6 py-3 text-sm text-white bg-[var(--gold)] my-4 right-0"
      onClick={downloadPdf}
    >
      Download
    </button>
  );
};

export default DownloadReservationPdf;

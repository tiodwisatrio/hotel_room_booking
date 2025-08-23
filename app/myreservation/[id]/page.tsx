import ReservationDetail from "@/components/ReservationDetail";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Reservation Detail",
};

export default async function MyReservationDetailPage(props: unknown) {
  // ambil kemungkinan params dari props (props bisa berupa object Next internal)
  const maybeParams = (props as { params?: unknown })?.params;

  // jika params adalah Promise, tunggu; jika object langsung, gunakan
  const resolvedParams =
    maybeParams &&
    typeof (maybeParams as { then?: unknown })?.then === "function"
      ? await (maybeParams as Promise<{ id?: string | string[] }>)
      : (maybeParams as { id?: string | string[] } | undefined);

  const rawId = resolvedParams?.id;
  const reservationId =
    typeof rawId === "string"
      ? rawId
      : Array.isArray(rawId)
      ? String(rawId[0])
      : "";

  if (!reservationId) {
    return (
      <div className="min-h-screen bg-[var(--background)]">
        <div className="max-w-screen-lg mx-auto py-20 px-4">
          <p className="text-white">Missing reservation id</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div
        className="max-w-screen-lg mx-auto py-20 px-4"
        data-aos="fade-down"
        data-aos-delay="200"
      >
        <h1 className="text-2xl font-semibold mb-8 text-white">
          Reservation Detail
        </h1>

        <Suspense fallback={<p>Loading...</p>}>
          <ReservationDetail reservationId={reservationId} />
        </Suspense>
      </div>
    </div>
  );
}

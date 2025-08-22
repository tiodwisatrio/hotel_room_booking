import ReservationDetail from "@/components/ReservationDetail";
import { Metadata } from "next";
import { Suspense } from "react";
export const metadata: Metadata = {
  title: "Reservation Detail",
};

type PageProps = { params?: Record<string, string | string[]> };

const MyReservationDetailPage = async (props: PageProps) => {
  const rawId = props?.params?.id;
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
};

export default MyReservationDetailPage;

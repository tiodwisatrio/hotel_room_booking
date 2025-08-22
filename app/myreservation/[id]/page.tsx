import ReservationDetail from "@/components/ReservationDetail";
import { Metadata } from "next";
import { Suspense } from "react";
export const metadata: Metadata = {
  title: "Reservation Detail",
};

const MyReservationDetailPage = async ({
  params,
}: {
  params: { id: string };
}) => {
  const reservationId = params.id;
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div
        className="max-w-screen-lg mx-auto py-20 px-4"
        data-aos="fade-down"
        data-aos-delay="200"
      >
        <h1 className="text-2xl font-semibold mb-8 text-white">
          Reservation Detail
        </h1>{" "}
        {/* Add more reservation details here */}
        <Suspense fallback={<p>Loading...</p>}>
          <ReservationDetail reservationId={reservationId} />
        </Suspense>
      </div>
    </div>
  );
};

export default MyReservationDetailPage;

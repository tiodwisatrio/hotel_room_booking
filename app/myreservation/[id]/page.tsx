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
  const reservationId = (await params).id;
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-screen-lg mx-auto mt-10 py-20 px-4">
        <h1 className="text-2xl font-semibold mb-8">Reservation Detail</h1>{" "}
        {/* Add more reservation details here */}
        <Suspense fallback={<p>Loading...</p>}>
          <ReservationDetail reservationId={reservationId} />
        </Suspense>
      </div>
    </div>
  );
};

export default MyReservationDetailPage;

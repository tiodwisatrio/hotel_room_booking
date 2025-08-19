import CheckoutDetail from "@/components/CheckoutDetail";
import { Suspense } from "react";
import { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Reservation Summary",
};

const CheckoutPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const reservationId = (await params).id;

  return (
    <div className="max-w-screen px-4 py-20 mx-auto mt-12 bg-[var(--background)]">
      <h1 className="text-2xl font-semibold mb-8 text-white">Reservation Summary</h1>
      <Suspense fallback={<p>Loading...</p>}>
        <CheckoutDetail reservationId={reservationId} />
      </Suspense>
      <Script
        src="https://app.sandbox.midtrans.com/snap/snap.js"
        strategy="lazyOnload"
        data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
      />
    </div>
  );
};

export default CheckoutPage;

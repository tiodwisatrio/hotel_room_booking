import { Metadata } from "next";
import { redirect } from "next/navigation";
import { HiCheckCircle } from "react-icons/hi";

import React from "react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Payment Success",
};
const SuccessPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ transaction_status: string }>;
}) => {
  const paymentStatus = (await searchParams).transaction_status;
  if (paymentStatus === "pending") redirect("/payment/pending");
  if (paymentStatus === "failure") redirect("/payment/failure");
  return (
    <div className="max-w-screen-xl px-4 mx-auto py-20">
      <div className="flex flex-col items-center justify-center mx-auto">
        <h1 className="text-green-500">Payment Done</h1>
        <HiCheckCircle />
      </div>
      <Link href="/myreservation" className="px-12 bg-indigo-600 text-white">
        View My Reservation
      </Link>
    </div>
  );
};

export default SuccessPage;

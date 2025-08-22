import { Metadata } from "next";
import { HiClock } from "react-icons/hi";
import React from "react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Payment Pending",
};
const PendingPage = async () => {
  return (
    <div className="max-w-screen-xl px-4 mx-auto py-20">
      <div className="flex flex-col items-center justify-center mx-auto">
        <h1 className="text-yellow-500">Payment Pending</h1>
        <HiClock />
      </div>
      <Link href="/myreservation" className="px-12 bg-indigo-600 text-white">
        View My Reservation
      </Link>
    </div>
  );
};

export default PendingPage;

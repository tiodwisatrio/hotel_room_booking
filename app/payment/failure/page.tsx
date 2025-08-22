import { Metadata } from "next";
import { HiXCircle } from "react-icons/hi";
import React from "react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Payment Failure",
};
const FailurePage = async () => {
  return (
    <div className="max-w-screen-xl px-4 mx-auto py-20">
      <div className="flex flex-col items-center justify-center mx-auto">
        <h1 className="text-red-500">Payment Failed</h1>
        <HiXCircle />
      </div>
      <Link href="/myreservation" className="px-12 bg-indigo-600 text-white">
        View My Reservation
      </Link>
    </div>
  );
};

export default FailurePage;

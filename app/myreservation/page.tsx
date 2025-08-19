import MyReserveList from "@/components/MyReserveList";
import React from "react";
import { Metadata } from "next";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
export const metadata: Metadata = {
  title: "My Reservations",
};

const MyReservationPage = async () => {
  const session = await auth();
  if (!session || !session.user) redirect("/signin");
  return (
    <div className="min-h-screen bg-[var(--background)] px-10">
      <div className="max-w-screen lg:mx-auto  py-20 px-4">
        <div className="flex items-center justify-between">
          <div className="text-white mb-8">
            <h3
              className="text-2xl text-white mb-2 font-semibold"
              data-aos="fade-down"
              data-aos-delay="200"
            >
              Hi, {session.user.name}
            </h3>
            <p className="text-sm mt-1 mb-4 opacity-70" data-aos="fade-down" data-aos-delay="400">
              Here&apos;s are your reservations
            </p>
          </div>
        </div>
        <div>
          <MyReserveList />
        </div>
      </div>
    </div>
  );
};

export default MyReservationPage;

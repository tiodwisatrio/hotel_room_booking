import DashboardCard from "@/components/admin/room/DashboardCard";
import ReservationList from "@/components/admin/room/ReservationList";
import { Metadata } from "next";
import { Suspense } from "react";
export const metadata: Metadata = {
  title: "Dashboard",
};

const DashboardPage = () => {
  return (
    <div className="mt-10 max-w-screen px-4 py-16 mx-auto">
      <h1 className="text-4xl font-bold text-gray-800 mb-10">Dashboard</h1>
      <Suspense fallback={<p>Loading...</p>}>
        <DashboardCard />
      </Suspense>
      <Suspense fallback={<p>Loading...</p>}>
        <ReservationList />
      </Suspense>
    </div>
  );
};

export default DashboardPage;

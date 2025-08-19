import DashboardCard from "@/components/admin/room/DashboardCard";
import ReservationList from "@/components/admin/room/ReservationList";
import { Metadata } from "next";
import { Suspense } from "react";
export const metadata: Metadata = {
  title: "Dashboard",
};

const DashboardPage = () => {
  return (
    <div className=" max-w-screen px-4 py-20 mx-auto">
      <h1 className="text-4xl font-bold text-white mb-10">Dashboard</h1>
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

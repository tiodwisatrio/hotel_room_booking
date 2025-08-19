import RoomTable from "@/components/admin/room/RoomTable";
import Link from "next/link";
import React, { Suspense } from "react";

const RoomPage = () => {
  return (
    <div className="max-w-screen-xl px-4 py-16 mt-10 mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold text-white">Room List</h1>
        <Link
          href="/admin/room/create"
          className="bg-[var(--gold)] rounded-md px-6 py-2.5 hover:bg-[var(--goldhover)] text-white font-semibold"
        >
          Create New
        </Link>
      </div>
      <Suspense fallback={<p>Loading data...</p>}>
        <RoomTable />
      </Suspense>
    </div>
  );
};

export default RoomPage;

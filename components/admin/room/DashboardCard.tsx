import { LuChartArea, LuShoppingCart, LuUser } from "react-icons/lu";
import { getRevenueAndReserve, getTotalCustomers } from "@/libs/data";
import { formatCurrency } from "@/libs/utils";
import { notFound } from "next/navigation";

const DashboardCard = async () => {
  const [revenueAndReserve, totalCustomers] = await Promise.all([
    getRevenueAndReserve(),
    getTotalCustomers(),
  ]);

  if (!revenueAndReserve || !totalCustomers) return notFound();
  return (
    <div className="grid md: grid-cols-3 gap-5 pb-10">
      <div className="flex items-center bg-[#1a1b1c] overflow-hidden shadow-sm rounded-md px-3 py-2">
        <div className="p-4">
          <LuChartArea className="size-12 text-white" />
        </div>
        <div className="px-4 text-white">
          <h3 className="text-sm tracking-wider">Total Revenue</h3>
          <p className="text-2xl font-semibold">
            {formatCurrency(revenueAndReserve.revenue)}
          </p>
        </div>
      </div>

      <div className="flex items-center bg-[#1a1b1c] overflow-hidden shadow-sm rounded-md px-3 py-2">
        <div className="p-4">
          <LuUser className="size-12 text-white" />
        </div>
        <div className="px-4 text-white">
          <h3 className="text-sm tracking-wider">Total Customers</h3>
          <p className="text-2xl font-semibold">{totalCustomers.length}</p>
        </div>
      </div>

      <div className="flex items-center bg-[#1a1b1c] overflow-hidden shadow-sm rounded-md px-3 py-2">
        <div className="p-4">
          <LuShoppingCart className="size-12 text-white" />
        </div>
        <div className="px-4 text-white">
          <h3 className="text-sm tracking-wider">Total Reservations</h3>
          <p className="text-2xl font-semibold">{revenueAndReserve.reserve}</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;

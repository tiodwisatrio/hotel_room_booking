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
      <div className="flex items-center bg-white border rounded-md overflow-hidden shadow-sm">
        <div className="p4 bg-teal-600">
          <LuChartArea className="size-12 text-white" />
        </div>
        <div className="px-4 text-gray-700">
          <h3 className="text-sm tracking-wider">Total Revenue</h3>
          <p className="text-2xl font-semibold">
            {formatCurrency(revenueAndReserve.revenue)}
          </p>
        </div>
      </div>

      <div className="flex items-center bg-white border rounded-md overflow-hidden shadow-sm">
        <div className="p4 bg-teal-600">
          <LuShoppingCart className="size-12 text-white" />
        </div>
        <div className="px-4 text-gray-700">
          <h3 className="text-sm tracking-wider">Total Reservation</h3>
          <p className="text-2xl font-semibold">{revenueAndReserve.reserve}</p>
        </div>
      </div>

      <div className="flex items-center bg-white border rounded-md overflow-hidden shadow-sm">
        <div className="p4 bg-teal-600">
          <LuUser className="size-12 text-white" />
        </div>
        <div className="px-4 text-gray-700">
          <h3 className="text-sm tracking-wider">Total Customers</h3>
          <p className="text-2xl font-semibold">{totalCustomers.length}</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;

import { getReservationByUserId, getReserveById } from "@/libs/data";
import { formatCurrency, formatDate } from "@/libs/utils";
import { notFound } from "next/navigation";
import { differenceInCalendarDays } from "date-fns";
import React from "react";

const ReservationDetail = async ({
  reservationId,
}: {
  reservationId: string;
}) => {
  const reservation = await getReserveById(reservationId);
  if (!reservation) return notFound();

  return (
    <div>
      {/* <button className="px-6 py-3 text-sm text-white bg-[var(--gold)] my-4 right-0">
        Download
      </button> */}
      <div className="w-full p-4 bg-white border border-gray-200 rounded-sm shadow">
        <div className="grid md:grid-cols-2 md:gap-5">
          <ul>
            <li className="py-2">
              <div className="flex items-center">
                <div className="flex-1/2 min-w-0 ms-4">
                  <p className="text-sm text-gray-900 font-medium truncate">
                    Reservation ID:
                  </p>
                </div>

                <div className="inline-flex items-center text-base font-semibold text-gray-900">
                  {reservation?.id}
                </div>
              </div>
            </li>

            <li className="py-2">
              <div className="flex items-center">
                <div className="flex-1/2 min-w-0 ms-4">
                  <p className="text-sm text-gray-900 font-medium truncate">
                    Book Date:
                  </p>
                </div>

                <div className="inline-flex items-center text-base font-semibold text-gray-900">
                  {formatDate(reservation?.createdAt.toISOString())}
                </div>
              </div>
            </li>

            <li className="py-2">
              <div className="flex items-center">
                <div className="flex-1/2 min-w-0 ms-4">
                  <p className="text-sm text-gray-900 font-medium truncate">
                    Name:
                  </p>
                </div>

                <div className="inline-flex items-center text-base font-semibold text-gray-900">
                  {reservation?.User.name}
                </div>
              </div>
            </li>

            <li className="py-2">
              <div className="flex items-center">
                <div className="flex-1/2 min-w-0 ms-4">
                  <p className="text-sm text-gray-900 font-medium truncate">
                    Email:
                  </p>
                </div>

                <div className="inline-flex items-center text-base font-semibold text-gray-900">
                  {reservation.User.email}
                </div>
              </div>
            </li>
          </ul>

          <ul>
            <li className="py-2">
              <div className="flex items-center">
                <div className="flex-1/2 min-w-0 ms-4">
                  <p className="text-sm text-gray-900 font-medium truncate">
                    Phone:
                  </p>
                </div>

                <div className="inline-flex items-center text-base font-semibold text-gray-900">
                  {reservation.User.phoneNumber}
                </div>
              </div>
            </li>

            {/* payment method */}
            <li className="py-2">
              <div className="flex items-center">
                <div className="flex-1/2 min-w-0 ms-4">
                  <p className="text-sm text-gray-900 font-medium truncate">
                    Payment Method:
                  </p>
                </div>

                <div className="inline-flex items-center text-base font-semibold text-gray-900 capitalize">
                  {reservation.Payment?.method
                    ? reservation.Payment.method.replace("_", " ")
                    : ""}
                </div>
              </div>
            </li>

            {/* payment status */}
            <li className="py-2">
              <div className="flex items-center">
                <div className="flex-1/2 min-w-0 ms-4">
                  <p className="text-sm text-gray-900 font-medium truncate">
                    Payment Status:
                  </p>
                </div>

                <div className="inline-flex items-center text-base font-semibold text-gray-900">
                  {reservation.Payment?.status || "unpaid"}
                </div>
              </div>
            </li>
          </ul>
        </div>
        {/* Table */}
        <div className="relative overflow-x-auto mt-3 py-6">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className=" text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="px-6 py-3">Room</th>
                <th className="px-6 py-3">Price</th>
                <th className="px-6 py-3 min-w-60 md:min-w-0">Arrival</th>
                <th className="px-6 py-3">Departure</th>
                <th className="px-6 py-3">Duration</th>
                <th className="px-6 py-3 text-right">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border-b">
                <td className="px-6 py-4">{reservation.Room.name}</td>
                <td className="px-6 py-2">
                  {formatCurrency(reservation.Room.price)}
                </td>
                <td className="px-6 py-4">
                  {formatDate(reservation.startDate.toDateString())}
                </td>
                <td className="px-6 py-4">
                  {formatDate(reservation.endDate.toDateString())}
                </td>
                <td className="px-6 py-4">
                  {differenceInCalendarDays(
                    reservation.endDate,
                    reservation.startDate
                  )}{" "}
                  days
                </td>
                <td className="px-6 py-4 text-right">
                  {reservation.Payment &&
                    formatCurrency(reservation.Payment.amount)}
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr className="mt-8">
                <td
                  className="px-6 py-3 font-bold text-xl text-black"
                  colSpan={2}
                >
                  Total
                </td>
                <td
                  className="px-6 py-3 font-bold text-right text-xl text-black"
                  colSpan={2}
                >
                  {reservation.Payment &&
                    formatCurrency(reservation.Payment.amount)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReservationDetail;

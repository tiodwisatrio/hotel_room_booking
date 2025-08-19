import Image from "next/image";
import React from "react";
import { getReserveById } from "@/libs/data";
import { formatDate } from "@/libs/utils";
import { differenceInCalendarDays } from "date-fns";
import { formatCurrency } from "@/libs/utils";
import PaymentButton from "./PaymentButton";

const CheckoutDetail = async ({ reservationId }: { reservationId: string }) => {
  const reservation = await getReserveById(reservationId);
  if (!reservation || !reservation.Payment)
    return <h1>No Reservation Found</h1>;

  const duration = differenceInCalendarDays(
    reservation.endDate,
    reservation.startDate
  );

  return (
    <div className="grid md:grid-cols-2 gap-5">
      <div className="order-2">
        <div className="flex flex-col mb-3 items-start bg-[#1a1b1c]  rounded-md md:flex-row md:w-full gap-x-4">
          <div className="aspect-video relative w-full rounded-md">
            <Image
              src={reservation.Room.image}
              width={800}
              height={300}
              className="object-cover rounded-md w-full rounded-t-md"
              //   className="object-cover w-full rounded-sm aspect-video md:rounded-none md:rounded-s-sm"
              alt="image"
            />
          </div>
          <div className="flex flex-col leading-normal w-full p-4">
            <h5 className="mb-1 text-4xl font-bold tracking-tight text-white">
              {reservation.Room.name}
            </h5>
            <div className="flex items-center gap-1 text-xl text-white opacity-90 mt-3">
              <div className="flex items-center justify-center gap-1">
                <span className="text-xl">
                  {formatCurrency(reservation.price)}
                </span>
                <span>/ night</span>
              </div>
            </div>
          </div>
        </div>
        <PaymentButton reservation={reservation} />
      </div>

      <div className="0 px-3 py-5 bg-[#1a1b1c] rounded-md text-white">
        <table className="w-full">
          <tbody>
            <tr>
              <td className="py-2">Reservation ID</td>
              <td className="py-2 text-right truncate">#{reservation.id}</td>
            </tr>

            <tr>
              <td className="py-2">Name</td>
              <td className="py-2 text-right truncate">
                {reservation.User.name}
              </td>
            </tr>

            <tr>
              <td className="py-2">Email</td>
              <td className="py-2 text-right truncate">
                {reservation.User.email}
              </td>
            </tr>

            <tr>
              <td className="py-2">Phone</td>
              <td className="py-2 text-right truncate">
                {reservation.User.phoneNumber}
              </td>
            </tr>

            <tr>
              <td className="py-2">Arrival</td>
              <td className="py-2 text-right truncate">
                {formatDate(reservation.startDate.toISOString())}
              </td>
            </tr>

            <tr>
              <td className="py-2">Departure</td>
              <td className="py-2 text-right truncate">
                {formatDate(reservation.endDate.toISOString())}
              </td>
            </tr>

            <tr>
              <td className="py-2">Duration</td>
              <td className="py-2 text-right truncate">
                <span>
                  {duration} {duration <= 1 ? "Night" : "Nights"}
                </span>
              </td>
            </tr>

            <tr>
              <td className="py-2">Amount in Rupiah</td>
              <td className="py-2 text-right truncate">
                <span>{formatCurrency(reservation.Payment.amount)}</span>
              </td>
            </tr>

            <tr>
              <td className="py-2">Status</td>
              <td className="py-2 text-right truncate">
                {reservation.Payment.status}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CheckoutDetail;

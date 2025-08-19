import Image from "next/image";
import React from "react";
import { getReservationByUserId } from "@/libs/data";
import { notFound } from "next/navigation";
import { formatCurrency, formatDate } from "@/libs/utils";
import { differenceInCalendarDays } from "date-fns";
import Link from "next/link";

const MyReserveList = async () => {
  const reservation = await getReservationByUserId();
  if (!reservation) return notFound();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      {reservation.map((item) => (
        <div
          className="bg-[#1a1b1c] shadow-[0px_5px_28px_-5px_rgba(255,_255,_255,_0.05)] rounded-md overflow-hidden flex flex-col md:flex-row"
          key={item.id}
        >
          {/* Gambar di kiri */}
          <div className="w-full md:w-1/2">
            <Image
              src={item.Room.image}
              alt="Reservation Image"
              width={800}
              height={300}
              className="object-cover w-full h-60 md:h-full"
            />
          </div>
          {/* Rincian di kanan */}
          <div className="w-full md:w-1/2 flex flex-col justify-start p-6">
            <div className="rounded mb-4 p-2 bg-[#2d2f31]">
              <div className="text-sm font-medium text-white truncate">
                Reservation ID: #{item.id}
              </div>
              <div className="text-sm capitalize mt-1">
                <span className="flex items-center">
                  <p className="text-white">Status: </p>
                  <p
                    className={
                      item.Payment?.status === "paid"
                        ? "text-green-500 font-semibold ml-1"
                        : "text-red-500 font-semibold ml-1"
                    }
                  >
                    {item.Payment?.status}
                  </p>
                </span>
           
              </div>
            </div>
            <div className="space-y-2 text-sm text-white">
              <div>
                <span className="font-medium">Room Name:</span> {item.Room.name}
              </div>
              <div>
                <span className="font-medium">Price:</span>{" "}
                {formatCurrency(item.Room.price)}
              </div>
              <div>
                <span className="font-medium">Arrival:</span>{" "}
                {formatDate(item.startDate.toISOString())}
              </div>
              <div>
                <span className="font-medium">Departure:</span>{" "}
                {formatDate(item.endDate.toISOString())}
              </div>
              <div>
                <span className="font-medium">Duration:</span>{" "}
                {differenceInCalendarDays(item.endDate, item.startDate)} Night
              </div>
              <div>
                <span className="font-medium">Subtotal:</span>{" "}
                {item.Payment && formatCurrency(item.Payment.amount)}
              </div>
            </div>
            <div className="flex justify-end mt-6">
              {item.Payment?.status === "unpaid" ? (
                <Link
                  href={`/payment/${item.Payment.id}`}
                  className="bg-[var(--gold)] hover:bg-[var(--goldhover)] text-white px-4 py-2 rounded"
                >
                  Pay Now
                </Link>
              ) : (
                <Link
                  href={`/myreservation/${item.id}`}
                  className="bg-transparent rounded border border-[var(--gold)] text-white hover:bg-[var(--gold)] hover:text-white px-4 py-2"
                >
                  View Detail
                </Link>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyReserveList;

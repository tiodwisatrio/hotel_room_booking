"use client";
import DatePicker from "react-datepicker";
import { useState, useActionState } from "react";
import { addDays } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import { createReserve } from "@/libs/actions";
import { DisabledDatesProps, RoomDetailProps } from "@/types/room";
import clsx from "clsx";

const ReserveForm = ({
  room,
  disabledDates,
}: {
  room: RoomDetailProps;
  disabledDates: DisabledDatesProps[];
}) => {
  const StartDate = new Date();
  const EndDate = addDays(StartDate, 1);

  const [startDate, setStartDate] = useState(StartDate);
  const [endDate, setEndDate] = useState(EndDate);

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start ?? StartDate);
    setEndDate(end ?? EndDate);
  };

  const [state, formAction, isPending] = useActionState(
    createReserve.bind(null, room.id, room.price, startDate, endDate),
    null
  );

  const excludeDates = disabledDates.map((item) => {
    return {
      start: item.startDate,
      end: item.endDate,
    };
  });
  return (
    <div>
      <form action={formAction}>
        <div className="mb-8">
          <label className="block mb-2 text-sm font-medium text-white">
            Arrival - Departure
          </label>
          <DatePicker
            selected={startDate}
            startDate={startDate}
            excludeDateIntervals={excludeDates}
            endDate={endDate}
            minDate={new Date()}
            selectsRange={true}
            onChange={handleDateChange}
            dateFormat={"dd-MM-YYYY"}
            wrapperClassName="w-full"
            className="py-2 px-4 rounded-md w-full border border-slate-500"
          />
          <div aria-live="polite" aria-atomic="true">
            <p className="text-sm text-red-500 mt-2">{state?.messageDate}</p>
          </div>
        </div>

        <div className="mb-8">
          <label className="block mb-2 text-sm font-medium text-white">
            Your Name
          </label>
          <input
            type="text"
            name="name"
            className="py-2 px-4 rounded-md border border-slate-500 w-full"
            placeholder="Full Name..."
          />
          <div aria-live="polite" aria-atomic="true">
            <p className="text-sm text-red-500 mt-2 ">{state?.error?.name}</p>
          </div>
        </div>

        <div className="mb-8">
          <label className="block mb-2 text-sm font-medium text-white">
            Phone Number
          </label>
          <input
            type="text"
            name="phoneNumber"
            className="py-2 px-4 rounded-md border border-slate-500 w-full"
            placeholder="Phone Number..."
          />
          <div aria-live="polite" aria-atomic="true">
            <p className="text-sm text-red-500 mt-2 ">
              {state?.error?.phoneNumber}
            </p>
          </div>
        </div>

        <button
          type="submit"
          className={clsx(
            "px-10 py-3 text-center font-semibold text-white w-full bg-[var(--gold)] hover:bg-[var(--goldhover)] rounded-sm cursor-pointer",
            {
              "opacity-50 cursor-progress": isPending,
            }
          )}
          disabled={isPending}
        >
          {isPending ? "Loading..." : "Reserve"}
        </button>
      </form>
    </div>
  );
};

export default ReserveForm;

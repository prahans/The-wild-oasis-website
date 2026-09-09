"use client";

import { differenceInCalendarDays, startOfDay } from "date-fns";
import { DayPicker, type DateRange } from "react-day-picker";
import "react-day-picker/style.css";
import { useReservation } from "./ReservationContext";

function DateSelector({ settings, bookedDates, cabin }) {
  // CHANGE
  const regularPrice = 23;
  const discount = 23;
  const { range, setRange, resetRange } = useReservation();
  const numNights =
    range?.from && range.to
      ? differenceInCalendarDays(range.to, range.from)
      : 0;
  const cabinPrice = numNights * (regularPrice - discount);
  const today = startOfDay(new Date());
  const endMonth = new Date(today.getFullYear() + 5, 11, 31);

  // SETTINGS
  const { minBookingLength, maxBookingLength } = settings;

  return (
    <div className="flex flex-col justify-between">
      <DayPicker
        className="date-selector mt-12 mb-8 place-self-center"
        mode="range"
        selected={range}
        onSelect={setRange}
        min={minBookingLength}
        max={maxBookingLength}
        startMonth={today}
        endMonth={endMonth}
        disabled={[{ before: today }, { after: endMonth }]}
        captionLayout="dropdown"
        numberOfMonths={2}
      />

      <div className="flex items-center justify-between px-8 bg-accent-500 text-primary-800 h-[72px]">
        <div className="flex items-baseline gap-6">
          <p className="flex gap-2 items-baseline">
            {discount > 0 ? (
              <>
                <span className="text-2xl">${regularPrice - discount}</span>
                <span className="line-through font-semibold text-primary-700">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-2xl">${regularPrice}</span>
            )}
            <span className="">/night</span>
          </p>
          {numNights ? (
            <>
              <p className="bg-accent-600 px-3 py-2 text-2xl">
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p>
                <span className="text-lg font-bold uppercase">Total</span>{" "}
                <span className="text-2xl font-semibold">${cabinPrice}</span>
              </p>
            </>
          ) : null}
        </div>

        {range?.from || range?.to ? (
          <button
            type="button"
            className="border border-primary-800 py-2 px-4 text-sm font-semibold"
            onClick={resetRange}
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default DateSelector;

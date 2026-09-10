"use client";

import {
  differenceInCalendarDays,
  isWithinInterval,
  startOfDay,
} from "date-fns";
import { DayPicker, type DateRange } from "react-day-picker";
import type { Cabin, Settings } from "@/app/_types/data";
import "react-day-picker/style.css";
import { useReservation } from "./ReservationContext";

function isAlreadyBooked(
  range: DateRange | undefined,
  datesArr: Date[],
): boolean {
  const from = range?.from;
  const to = range?.to;
  if (!from || !to) return false;

  return datesArr.some((date) =>
    isWithinInterval(date, { start: from, end: to }),
  );
}

type DateSelectorProps = {
  settings: Settings;
  bookedDates: Date[];
  cabin: Cabin;
};

function DateSelector({ settings, bookedDates, cabin }: DateSelectorProps) {
  const { regularPrice, discount } = cabin;
  const { range, setRange, resetRange } = useReservation();
  const displayRange = isAlreadyBooked(range, bookedDates) ? undefined : range;
  const numNights =
    displayRange?.from && displayRange.to
      ? differenceInCalendarDays(displayRange.to, displayRange.from)
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
        selected={displayRange}
        onSelect={setRange}
        min={minBookingLength}
        max={maxBookingLength}
        startMonth={today}
        endMonth={endMonth}
        disabled={[{ before: today }, { after: endMonth }, bookedDates]}
        captionLayout="dropdown"
        numberOfMonths={2}
        excludeDisabled
      />

      <div className="flex items-center justify-between px-8 bg-accent-500 text-primary-800 h-18">
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

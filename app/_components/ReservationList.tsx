"use client";

import type { BookingSummary, RecordId } from "@/app/_types/data";
import ReservationCard from "./ReservationCard";
import { useOptimistic } from "react";
import { deleteReservation } from "@/app/_lib/actions";

type ReservationListProps = {
  bookings: BookingSummary[];
};

export default function ReservationList({ bookings }: ReservationListProps) {
  const [optimisticBookings, optimisticDelete] = useOptimistic(
    bookings,
    (currentBookings, bookingId: RecordId) =>
      currentBookings.filter((booking) => booking.id !== Number(bookingId)),
  );

  async function handleDelete(bookingId: RecordId): Promise<void> {
    optimisticDelete(bookingId);
    await deleteReservation(bookingId);
  }

  return (
    <ul className="space-y-6">
      {optimisticBookings.map((booking) => (
        <ReservationCard
          booking={booking}
          key={booking.id}
          onDelete={handleDelete}
        />
      ))}
    </ul>
  );
}

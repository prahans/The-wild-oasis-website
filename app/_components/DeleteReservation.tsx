"use client";

import { TrashIcon } from "@heroicons/react/24/solid";
import type { RecordId } from "@/app/_types/data";
import { deleteReservation } from "../_lib/actions";

function DeleteReservation({ bookingId }: { bookingId: RecordId }) {
  return (
    <button
      onClick={() => deleteReservation(bookingId)}
      aria-label={`Delete reservation ${bookingId}`}
      className="group flex items-center gap-2 uppercase text-xs font-bold text-primary-300 grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-900"
    >
      <TrashIcon className="h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
      <span className="mt-1">Delete</span>
    </button>
  );
}

export default DeleteReservation;

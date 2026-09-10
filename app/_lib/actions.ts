"use server";

import { revalidatePath } from "next/cache";
import { auth, signOut } from "./auth";
import { signIn } from "./auth";
import { getSupabase } from "./supabase";
import type { CreateBookingData, RecordId } from "@/app/_types/data";
import { getBookings } from "./data-service";
import { redirect } from "next/navigation";

export async function updateGuest(formData: FormData): Promise<void> {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const guestId = session.user.guestId;
  if (guestId === undefined)
    throw new Error("Guest profile could not be found");

  const nationalID = formData.get("nationalID");
  if (
    typeof nationalID !== "string" ||
    nationalID !== nationalID.trim() ||
    !/^[a-zA-Z0-9]{6,12}$/.test(nationalID)
  ) {
    throw new Error("National ID must contain 6 to 12 letters or numbers.");
  }

  const country = formData.get("nationality");
  if (typeof country !== "string") {
    throw new Error("Please select a country.");
  }

  const [nationality, countryFlag] = country.split("%");
  if (!nationality || !countryFlag) {
    throw new Error("Please select a country.");
  }

  const updateDate = { nationality, countryFlag, nationalID };
  const { error } = await getSupabase()
    .from("guests")
    .update(updateDate)
    .eq("id", guestId);

  if (error) throw new Error("Guest could not be updated");
  revalidatePath("/account/profile");
}

export async function createBooking(
  bookingData: CreateBookingData,
  formData: FormData,
): Promise<void> {
  const { startDate, endDate } = bookingData;
  if (!startDate || !endDate || endDate <= startDate) {
    throw new Error("Please select valid check-in and check-out dates");
  }
  const session = await auth();
  if (!session) throw new Error("You must be logged in");
  const guestId = session.user.guestId;
  if (guestId === undefined)
    throw new Error("Guest profile could not be found");
  const newBooking = {
    ...bookingData,
    guestId,
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations")?.slice(0, 1000),
    extrasPrice: 0,
    totalPrice: bookingData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: "unconfirmed",
  };

  console.log(newBooking);
}

export async function deleteBooking(bookingId: RecordId) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");
  const guestId = session.user.guestId;
  if (guestId === undefined)
    throw new Error("Guest profile could not be found");

  const guestBookings = await getBookings(guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);
  if (!guestBookingIds.includes(Number(bookingId)))
    throw new Error("You are not allowed to delete this booking");
  const { error } = await getSupabase()
    .from("bookings")
    .delete()
    .eq("id", Number(bookingId));

  if (error) throw new Error("Booking could not be deleted");
  revalidatePath("/account/reservations");
}

export async function updateBooking(formData: FormData): Promise<void> {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");
  const guestId = session.user.guestId;
  if (guestId === undefined)
    throw new Error("Guest profile could not be found");

  const guestBookings = await getBookings(guestId);
  const bookingId = Number(formData.get("bookingId"));
  const guestBookingIds = guestBookings.map((booking) => booking.id);
  if (!guestBookingIds.includes(bookingId))
    throw new Error("You are not allowed to update this booking");

  const observations = formData.get("observations");
  if (observations !== null && typeof observations !== "string") {
    throw new Error("Observations must be text");
  }

  const updateData = {
    numGuests: Number(formData.get("numGuests")),
    observations: observations?.slice(0, 1000),
  };

  const { error } = await getSupabase()
    .from("bookings")
    .update(updateData)
    .eq("id", bookingId)
    .select()
    .single();

  if (error) throw new Error("Booking could not be updated");
  revalidatePath("/account/reservations");
  revalidatePath(`/account/reservations/edit/${bookingId}`);
  redirect("/account/reservations");
}

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

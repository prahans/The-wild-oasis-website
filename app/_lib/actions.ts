"use server";

import { auth, signOut } from "./auth";
import { signIn } from "./auth";
import { getSupabase } from "./supabase";

export async function updateGuest(formData: FormData): Promise<void> {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

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
    .eq("id", session.user.guestId);

  if (error) throw new Error("Guest could not be updated");
}

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

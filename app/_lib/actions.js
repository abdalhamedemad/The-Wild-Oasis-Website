"use server";

import { signIn, signOut, auth } from "./auth";
import { supabase } from "./supabase";
export async function updateGuest(formData) {
  console.log("update profile");
  const session = await auth();
  if (!session) throw new Error("You must be logged in");
  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");

  // check nationalID between 6,12 char
  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID)) {
    throw new Error("please provide a valid national id");
  }

  const updateData = { nationality, countryFlag, nationalID };
  const { data, error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session.user.guestId);

  if (error) throw new Error("Guest could not be updated");
}

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

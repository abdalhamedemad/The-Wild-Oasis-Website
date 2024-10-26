"use server";

const { signIn, signOut } = require("./auth");

export async function signInAction() {
  await signIn("google", { redirect: "/account" });
}

export async function signOutAction() {
  await signOut({ redirect: "/" });
}

"use server";

import { revalidatePath } from "next/cache";
import prisma from "./db";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

// delete user
export async function deleteUser(userId: string) {
  if (!userId) return;

  try {
    await prisma.user.delete({
      where: { id: parseInt(userId) },
    });
    cookies().delete("jwtToken");
  } catch {
    throw new Error("could not delete the user , please try again");
  }

  revalidatePath("/");
  redirect("/");
}

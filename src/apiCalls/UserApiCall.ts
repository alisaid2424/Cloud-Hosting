import { DOMAIN } from "@/utils/constants";
import { User } from "@prisma/client";
import { cookies } from "next/headers";

// Get Single User by id
export async function GetUserById(userId: string): Promise<User> {
  const token = cookies().get("jwtToken")?.value || "";
  const res = await fetch(`${DOMAIN}/api/users/profile/${userId}`, {
    headers: {
      Cookie: `jwtToken=${token}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed To Fatch User");
  }

  return res.json();
}

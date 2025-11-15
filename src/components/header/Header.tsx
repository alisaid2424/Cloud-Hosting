import { cookies } from "next/headers";
import { verifyTokenForPages } from "@/utils/verifyToken";
import { User } from "@prisma/client";
import { GetUserById } from "@/apiCalls/UserApiCall";
import Navbar from "./Navbar";

const Header = async () => {
  const token = cookies().get("jwtToken")?.value || "";
  const payload = verifyTokenForPages(token);
  let user: User | null = null;

  if (payload?.id) {
    user = await GetUserById(String(payload?.id));
  }

  return (
    <header className="border-b border-gray-300 shadow-sm">
      <Navbar user={user as User} />
    </header>
  );
};

export default Header;

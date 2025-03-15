import Link from "next/link";
import Navbar from "./Navbar";
import { cookies } from "next/headers";
import { verifyTokenForPages } from "@/utils/verifyToken";
import ButtonLogout from "./ButtonLogout";
import { User } from "@prisma/client";
import { GetUserById } from "@/apiCalls/UserApiCall";
import route from "@/utils/route";

const Header = async () => {
  const token = cookies().get("jwtToken")?.value || "";
  const payload = verifyTokenForPages(token);
  let user: User | null = null;

  if (payload?.id) {
    user = await GetUserById(String(payload?.id));
  }

  return (
    <header className="flex items-center justify-between h-[100px] px-4 md:px-10 border-b-2 border-gray-400 bg-gray-100 relative">
      <Navbar isAdmin={user?.isAdmin || false} />
      <div className="flex items-center gap-4">
        {user ? (
          <div className="flex items-center gap-7">
            <ButtonLogout />
            <Link
              href={route.profile}
              className="bg-blue-600 w-7 h-7 text-white rounded-full md:text-lg capitalize ring ring-blue-600 ring-offset-2 font-bold flex items-center justify-center"
            >
              {user?.username.slice(0, 1)}
            </Link>
          </div>
        ) : (
          <>
            <Link className="btnRightNav" href={route.login}>
              Login
            </Link>
            <Link className="btnRightNav" href={route.register}>
              Register
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;

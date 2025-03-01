import Link from "next/link";
import Navbar from "./Navbar";
import { cookies } from "next/headers";
import { verifyTokenForPages } from "@/utils/verifyToken";
import ButtonLogout from "./ButtonLogout";

const Header = () => {
  const token = cookies().get("jwtToken")?.value || "";
  const payload = verifyTokenForPages(token);
  return (
    <header className="flex items-center justify-between h-[100px] px-4 md:px-10 border-b-2 border-gray-400 bg-gray-100 relative">
      <Navbar isAdmin={payload?.isAdmin || false} />
      <div className="flex items-center gap-4">
        {payload ? (
          <>
            <strong className="text-blue-600 md:text-xl capitalize font-bold">
              {payload?.username}
            </strong>
            <ButtonLogout />
          </>
        ) : (
          <>
            <Link className="btnRightNav" href="/login">
              Login
            </Link>
            <Link className="btnRightNav" href="/register">
              Register
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;

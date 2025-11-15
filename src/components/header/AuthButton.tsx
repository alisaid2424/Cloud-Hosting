import { User } from "@prisma/client";
import ButtonLogout from "./ButtonLogout";
import Link from "next/link";
import route from "@/utils/route";

const AuthButton = ({
  user,
  setIsOpen,
}: {
  user: User;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <>
      {user ? (
        <div className="flex items-center gap-7">
          <ButtonLogout />
          <Link
            href={route.profile}
            onClick={() => setIsOpen(false)}
            className="bg-blue-600 w-7 h-7 text-white rounded-full md:text-lg capitalize ring ring-blue-600 ring-offset-2 font-bold flex items-center justify-center"
          >
            {user?.username.slice(0, 1)}
          </Link>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row items-center gap-7">
          <Link
            className="btn-auth"
            onClick={() => setIsOpen(false)}
            href={route.login}
          >
            Login
          </Link>
          <Link
            className="btn-auth"
            onClick={() => setIsOpen(false)}
            href={route.register}
          >
            Register
          </Link>
        </div>
      )}
    </>
  );
};

export default AuthButton;

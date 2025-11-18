import Image from "next/image";
import imgProfile from "../../../../public/img-profile.jpg";
import { User } from "@prisma/client";
import { GetUserById } from "@/apiCalls/UserApiCall";
import { cookies } from "next/headers";
import { verifyTokenForPages } from "@/utils/verifyToken";
import Link from "next/link";
import DeleteUserButton from "./DeleteUserButton";
import { notFound } from "next/navigation";
import route from "@/utils/route";

const ProfilePage = async () => {
  const token = cookies().get("jwtToken")?.value || "";
  const payload = verifyTokenForPages(token);
  const user: User = await GetUserById(String(payload?.id));

  if (!user) notFound();

  return (
    <div
      className="absolute bg-cover w-[90%] md:w-2/4 rounded-lg top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 sm:my-5"
      style={{ backgroundImage: "url(bg-profile.png)" }}
    >
      <div className="w-full bg-white bg-opacity-80 rounded-lg p-5 min-h-96">
        <Image
          src={imgProfile}
          width={120}
          height={120}
          alt="imgProfile"
          className="rounded-full absolute -top-7 left-1/2 -translate-x-1/2 -translate-y-7 w-32 h-32 object-cover"
        />

        <div className="mt-16 text-center">
          <h2 className="text-3xl font-semibold text-gray-800">
            {user.username}
          </h2>
          <p className="text-gray-600">{user.email}</p>
          <p className="mt-2 text-sm text-gray-600">
            {user.isAdmin ? "Administrator" : "User"}
          </p>
          <p className="mt-4 text-sm text-gray-600">
            Joined on {new Date(user.createdAt).toDateString()}
          </p>
        </div>

        <div className="mt-6 px-4 py-3 border-t border-gray-500">
          <h3 className="text-xl font-semibold text-gray-800">
            Account Settings
          </h3>
          <div className="flex justify-between items-end flex-wrap gap-5">
            <ul className="mt-4 text-sm text-gray-700">
              <li className="flex items-center">
                <span className="w-24 font-medium text-gray-500">Username</span>
                <span>{user.username}</span>
              </li>
              <li className="flex items-center mt-2">
                <span className="w-24 font-medium text-gray-500">Email</span>
                <span>{user.email}</span>
              </li>
              <li className="flex items-center mt-2">
                <span className="w-24 font-medium text-gray-500">Role</span>
                <span>{user.isAdmin ? "Administrator" : "User"}</span>
              </li>
            </ul>
            <div className="flex gap-3">
              <Link
                href={`${route.profile}/${user.id}`}
                className="bg-green-600 text-white py-1 px-3 rounded-md text-sm font-medium hover:bg-green-700 transition-colors"
              >
                Edit
              </Link>

              {!user.isAdmin && <DeleteUserButton userId={user.id} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

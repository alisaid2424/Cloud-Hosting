import { cookies } from "next/headers";
import AddArticlesForm from "./AddArticlesForm";
import { redirect } from "next/navigation";
import { verifyTokenForPages } from "@/utils/verifyToken";

const AdminPage = () => {
  const token = cookies().get("jwtToken")?.value;
  if (!token) redirect("/");

  const payload = verifyTokenForPages(token);
  if (payload?.isAdmin === false) redirect("/");

  return (
    <div className="h-full flex items-center justify-center px-5 lg:px-20">
      <div className="shadow p-4 bg-purple-200 rounded w-full">
        <h2 className="text-xl lg:text-2xl text-gray-700 font-semibold mb-4">
          Add New Article
        </h2>
        <AddArticlesForm />
      </div>
    </div>
  );
};

export default AdminPage;

import { verifyTokenForPages } from "@/utils/verifyToken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import EditArticleForm from "./EditArticleForm";
import { Article } from "@prisma/client";
import { GetArticleById } from "@/apiCalls/ArticlesApiCall";

interface EditArticlePageProps {
  params: { id: string };
}

const EditArticlePage = async ({ params }: EditArticlePageProps) => {
  const token = cookies().get("jwtToken")?.value;
  if (!token) redirect("/");
  const payload = verifyTokenForPages(token);
  if (payload?.isAdmin === false) redirect("/");

  const article: Article = await GetArticleById(params.id);

  return (
    <div className="h-full flex items-center justify-center px-5 lg:px-20">
      <div className="shadow p-4 bg-purple-200 rounded w-full">
        <h2 className="text-xl lg:text-2xl text-green-700 font-semibold mb-4">
          Edit Article
        </h2>
        <EditArticleForm article={article} />
      </div>
    </div>
  );
};

export default EditArticlePage;

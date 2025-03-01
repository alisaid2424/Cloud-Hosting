import { GetArticles } from "@/apiCalls/ArticlesApiCall";
import Pagination from "@/components/articles/Pagination";
import { ARTICLE_PER_PAGE } from "@/utils/constants";
import { verifyTokenForPages } from "@/utils/verifyToken";
import { Article } from "@prisma/client";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import DeleteArticleButton from "./DeleteArticleButton";
import prisma from "@/utils/db";

interface AdminArticlesTableProps {
  searchParams: { pageNumber: string };
}

const AdminArticlesTable = async ({
  searchParams: { pageNumber },
}: AdminArticlesTableProps) => {
  const token = cookies().get("jwtToken")?.value;
  if (!token) redirect("/");
  const payload = verifyTokenForPages(token);
  if (payload?.isAdmin === false) redirect("/");

  const articles: Article[] = await GetArticles(pageNumber);
  const count: number = await prisma.article.count();
  const pages = Math.ceil(count / ARTICLE_PER_PAGE);

  return (
    <section className="p-5">
      <h2 className="text-2xl font-semibold mb-7 text-gray-700">Articles</h2>

      <table className="table w-full text-left">
        <thead>
          <tr className="border-t-2 border-b-2 border-gray-500 lg:text-xl">
            <th className="p-1 lg:p-2">Title</th>
            <th className="hidden lg:inline-block p-1 lg:p-2">CreatedAt</th>
            <th>Actions</th>
            <th className="hidden lg:inline-block"></th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article) => (
            <tr
              key={article.id}
              className="border-t-2 border-b-2 border-gray-300"
            >
              <td className="p-3 text-gray-700">{article.title}</td>
              <td className="hidden lg:inline-block p-3">
                {new Date(article.createdAt).toDateString()}
              </td>
              <td className="py-2 sm:py-0">
                <Link
                  href={`/admin/articles-table/edit/${article.id}`}
                  className="bg-green-600 text-white rounded-lg py-1 px-2 mb-2 sm:mb-0 sm:me-3 hover:bg-green-800 transition-all duration-300 inline-block"
                >
                  Edit
                </Link>
                <DeleteArticleButton articleId={article.id} />
              </td>
              <td className="hidden lg:inline-block">
                <Link
                  href={`/articles/${article.id}`}
                  className="bg-blue-600 text-white rounded-lg py-2 px-3 hover:bg-blue-800 transition-all duration-300 "
                >
                  Read More
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        pageNumber={parseInt(pageNumber)}
        pages={pages}
        route="/admin/articles-table"
      />
    </section>
  );
};

export default AdminArticlesTable;

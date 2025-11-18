import { FC } from "react";
import Link from "next/link";
import Pagination from "@/components/articles/Pagination";
import { ARTICLE_PER_PAGE, COMMENTS_PER_PAGE } from "@/utils/constants";
import DeleteArticleButton from "@/app/admin/articles-table/DeleteArticleButton";
import DeleteCommentButton from "@/app/admin/comments-table/DeleteCommentButton";

interface AdminTableProps {
  data: any[];
  columns: Array<{ key: string; name: string }>;
  pageNumber: string;
  totalCount: number;
  type: "articles" | "comments";
}

const AdminTable: FC<AdminTableProps> = ({
  data,
  columns,
  pageNumber,
  totalCount,
  type,
}) => {
  const pages =
    type === "articles"
      ? Math.ceil(totalCount / ARTICLE_PER_PAGE)
      : Math.ceil(totalCount / COMMENTS_PER_PAGE);

  return (
    <section className="p-5">
      <h2 className="text-2xl font-semibold mb-7 text-gray-700">
        {type === "articles" ? "Articles" : "Comments"}
      </h2>

      <div className="overflow-x-auto py-3 mt-5">
        <table className="table w-full min-w-[950px] text-left">
          <thead>
            <tr className="border-t-2 border-b-2 border-gray-500 lg:text-xl">
              {columns.map((column) => (
                <th key={column.key} className="p-3 lg:p-2">
                  {column.name}
                </th>
              ))}
              <th className="p-3">Actions</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr
                key={item.id}
                className="border-t-2 border-b-2 border-gray-300"
              >
                {columns.map((column) => (
                  <td key={column.key} className="p-3 text-gray-700">
                    {column.key === "createdAt"
                      ? new Date(item[column.key]).toDateString()
                      : item[column.key]}
                  </td>
                ))}
                <td className="py-2 text-center">
                  {type === "articles" ? (
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/admin/articles-table/edit/${item.id}`}
                        className="bg-green-600 text-white rounded-lg py-1 px-2 hover:bg-green-800 transition-all duration-300"
                      >
                        Edit
                      </Link>
                      <DeleteArticleButton articleId={item.id} />
                    </div>
                  ) : (
                    <DeleteCommentButton commentId={item.id} />
                  )}
                </td>

                <td className="py-3">
                  {type === "articles" && (
                    <Link
                      href={`/articles/${item.id}`}
                      className="bg-blue-600 text-white rounded-lg py-2 px-3 hover:bg-blue-800 transition-all duration-300 "
                    >
                      Read More
                    </Link>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Pagination
          pageNumber={parseInt(pageNumber)}
          pages={pages}
          route={`/admin/${type}-table`}
        />
      </div>
    </section>
  );
};

export default AdminTable;

import { GetAllComments } from "@/apiCalls/AdminApiCall";
import { verifyTokenForPages } from "@/utils/verifyToken";
import { Comment } from "@prisma/client";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
import DeleteCommentButton from "./DeleteCommentButton";
import prisma from "@/utils/db";
import { COMMENTS_PER_PAGE } from "@/utils/constants";
import Pagination from "@/components/articles/Pagination";

interface AdminCommentsTableProps {
  searchParams: { pageNumber: string };
}

const AdminCommentsTable = async ({
  searchParams: { pageNumber },
}: AdminCommentsTableProps) => {
  const token = cookies().get("jwtToken")?.value;
  if (!token) redirect("/");

  const payload = verifyTokenForPages(token);
  if (payload?.isAdmin === false) redirect("/");

  const comments: Comment[] = await GetAllComments({ token, pageNumber });
  const count: number = await prisma.comment.count();
  const pages = Math.ceil(count / COMMENTS_PER_PAGE);

  return (
    <section className="p-5">
      <h2 className="text-2xl font-semibold mb-7 text-gray-700">Comments</h2>

      <table className="table w-full text-left">
        <thead>
          <tr className="border-t-2 border-b-2 border-gray-500 lg:text-xl">
            <th className="p-3">Comment</th>
            <th className="hidden lg:inline-block p-3">CreatedAt</th>
            <th className="p-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {comments.map((comment) => (
            <tr
              key={comment.id}
              className="border-t-2 border-b-2 border-gray-300"
            >
              <td className="p-3 text-gray-700">{comment.text}</td>
              <td className="hidden lg:inline-block p-3">
                {new Date(comment.createdAt).toDateString()}
              </td>
              <td className="py-2 sm:py-0 text-center">
                <DeleteCommentButton commentId={comment.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        pageNumber={parseInt(pageNumber)}
        pages={pages}
        route="/admin/comments-table"
      />
    </section>
  );
};

export default AdminCommentsTable;

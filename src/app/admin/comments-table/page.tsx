import { GetAllComments } from "@/apiCalls/AdminApiCall";
import { Comment } from "@prisma/client";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
import prisma from "@/utils/db";
import AdminTable from "@/components/AdminTable";

interface AdminCommentsTableProps {
  searchParams: { pageNumber: string };
}

const AdminCommentsTable = async ({
  searchParams: { pageNumber },
}: AdminCommentsTableProps) => {
  const token = cookies().get("jwtToken")?.value;
  if (!token) redirect("/");

  const comments: Comment[] = await GetAllComments({ token, pageNumber });
  const count: number = await prisma.comment.count();

  const columns = [
    { key: "text", name: "Comment" },
    { key: "createdAt", name: "CreatedAt" },
  ];

  return (
    <AdminTable
      data={comments}
      columns={columns}
      pageNumber={pageNumber}
      totalCount={count}
      type="comments"
    />
  );
};

export default AdminCommentsTable;

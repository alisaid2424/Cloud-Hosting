import { GetArticles } from "@/apiCalls/ArticlesApiCall";
import { Article } from "@prisma/client";
import prisma from "@/utils/db";
import AdminTable from "@/components/AdminTable";

interface AdminArticlesTableProps {
  searchParams: { pageNumber: string };
}

const AdminArticlesTable = async ({
  searchParams: { pageNumber },
}: AdminArticlesTableProps) => {
  const articles: Article[] = await GetArticles(pageNumber);
  const count: number = await prisma.article.count();

  const columns = [
    { key: "title", name: "Title" },
    { key: "createdAt", name: "CreatedAt" },
  ];

  return (
    <AdminTable
      data={articles}
      columns={columns}
      pageNumber={pageNumber}
      totalCount={count}
      type="articles"
    />
  );
};

export default AdminArticlesTable;

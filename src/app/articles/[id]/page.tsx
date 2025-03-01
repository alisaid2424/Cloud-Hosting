import { GetArticleById } from "@/apiCalls/ArticlesApiCall";
import AddCommentInput from "@/components/comments/AddCommentInput";
import CommentItem from "@/components/comments/CommentItem";
import { ArticleSingle } from "@/utils/types";
import { verifyTokenForPages } from "@/utils/verifyToken";
import { request } from "http";
import { cookies } from "next/headers";

import Link from "next/link";

interface SingleArticlePageProps {
  params: { id: string };
}

const SingleArticlePage = async ({ params }: SingleArticlePageProps) => {
  const token = cookies().get("jwtToken")?.value || "";
  const payload = verifyTokenForPages(token);

  const article: ArticleSingle = await GetArticleById(params.id);

  return (
    <section className="container w-full mx-auto px-5 pt-8 md:w-2/3">
      <div className="p-7 rounded-lg bg-white mb-7">
        <h2 className="text-3xl font-bold text-gray-800 capitalize mb-2">
          {article.title}
        </h2>
        <div className="text-gray-400 text-sm">
          {new Date(article.createdAt).toDateString()}
        </div>
        <p className="text-gray-700 text-base leading-[1.7] mt-3">
          {article.description}
        </p>
      </div>

      {payload ? (
        <AddCommentInput articleId={article.id} />
      ) : (
        <p className="text-blue-600 md:text-xl">
          to write a comment you should log in first
        </p>
      )}

      <h4 className="text-xl text-gray-800 ps-1 font-semibold mb-2 mt-7">
        Comments
      </h4>

      {article.comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} userId={payload?.id} />
      ))}

      <Link
        href="/articles?pageNumber=1"
        className="block my-7 text-xl text-blue-600 underline"
      >
        Back &rarr;
      </Link>
    </section>
  );
};

export default SingleArticlePage;

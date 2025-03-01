import { Article } from "@prisma/client";
import Link from "next/link";

interface ArticleItemProps {
  article: Article;
}

const ArticleItem = ({ article }: ArticleItemProps) => {
  return (
    <div className="p-4 hover:bg-slate-200 rounded-lg border-2 border-gray-400 shadow-lg">
      <h2 className="capitalize text-xl text-gray-900 font-bold line-clamp-1">
        {article.title}
      </h2>
      <p className="text-gray-700 my-2 text-base leading-[1.7] line-clamp-2">
        {article.description}
      </p>
      <Link
        href={`/articles/${article.id}`}
        className="text-sm bg-purple-700 hover:bg-purple-800 w-full block text-white py-2 text-center rounded-lg"
      >
        Read More
      </Link>
    </div>
  );
};

export default ArticleItem;

import { GetArticlesBySearch } from "@/apiCalls/ArticlesApiCall";
import ArticleItem from "@/components/articles/ArticleItem";
import route from "@/utils/route";
import { Article } from "@prisma/client";
import Link from "next/link";

interface SearchArticlesPageProps {
  searchParams: { searchText: string };
}

const SearchArticlesPage = async ({
  searchParams: { searchText },
}: SearchArticlesPageProps) => {
  const articles: Article[] = await GetArticlesBySearch(searchText);

  return (
    <div className="container max-w-7xl">
      {articles.length > 0 ? (
        <>
          <h2 className="text-3xl font-bold text-gray-800 mt-5 mb-3 ">
            Articles Based On
            <span className="text-green-500 ms-2 capitalize">{searchText}</span>
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-5 mb-10">
            {articles.map((item) => (
              <ArticleItem article={item} key={item.id} />
            ))}
          </div>

          <Link
            href={route.articles}
            className="bg-fuchsia-500 text-white py-2 px-4 rounded-full text-base"
          >
            Go Back
          </Link>
        </>
      ) : (
        <h2 className="text-2xl font-bold text-gray-800 h-[calc(100vh-94px)] flex flex-col gap-8 items-center justify-center">
          No articles found based on
          <span className="text-red-500 ms-2 capitalize">{searchText}</span>
          <Link
            href={route.articles}
            className="bg-fuchsia-500 text-white py-2 px-4 rounded-full text-base"
          >
            Go Back
          </Link>
        </h2>
      )}
    </div>
  );
};

export default SearchArticlesPage;

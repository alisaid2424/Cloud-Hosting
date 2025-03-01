import { GetArticlesBySearch } from "@/apiCalls/ArticlesApiCall";
import ArticleItem from "@/components/articles/ArticleItem";
import { Article } from "@prisma/client";

interface SearchArticlesPageProps {
  searchParams: { searchText: string };
}

const SearchArticlesPage = async ({
  searchParams: { searchText },
}: SearchArticlesPageProps) => {
  const articles: Article[] = await GetArticlesBySearch(searchText);

  return (
    <div className="container">
      {articles.length > 0 ? (
        <>
          <h2 className="text-3xl font-bold text-gray-800 mt-5 mb-3 ">
            Articles Based On
            <span className="text-green-500 ms-2 capitalize">{searchText}</span>
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 my-5">
            {articles.map((item) => (
              <ArticleItem article={item} key={item.id} />
            ))}
          </div>
        </>
      ) : (
        <h2 className="text-2xl font-bold text-gray-800 mt-5 mb-3 ">
          No articles found based on
          <span className="text-red-500 ms-2 capitalize">{searchText}</span>
        </h2>
      )}
    </div>
  );
};

export default SearchArticlesPage;

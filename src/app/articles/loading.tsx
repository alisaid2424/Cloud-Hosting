const articlesSkeleton = [1, 2, 3, 4, 5, 6];

const ArticleLoading = () => {
  return (
    <section className="container animate-pulse">
      <div className="my-5 w-full md:w-2/3 mx-auto bg-gray-300 h-12 rounded"></div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-7 my-10">
        {articlesSkeleton.map((item) => (
          <div key={item} className="p-5 rounded-lg my-1 bg-gray-200">
            <h3 className="bg-gray-300 h-6"></h3>
            <p className="my-2 bg-gray-300 p-1 h-12"></p>
            <div className="w-full p-1 bg-gray-400 rounded-lg h-8"></div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center">
        <div className="bg-gray-300 w-72 max-w-full rounded-md h-9"></div>
      </div>
    </section>
  );
};

export default ArticleLoading;

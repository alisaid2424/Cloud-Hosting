const SingleArticleLoading = () => {
  return (
    <section className="container w-full mx-auto px-5 pt-8 md:w-2/3 animate-pulse">
      <div className="bg-white p-7 rounded-lg">
        <h1 className="bg-gray-300 mb-2 h-6 rounded-lg"></h1>
        <div className="bg-gray-300 h-4 rounded-lg"></div>
        <p className="bg-gray-300 mt-5 h-12 rounded-lg"></p>
      </div>
      <div className="mt-8">
        <div className="p-2 rounded-lg bg-gray-300 h-10"></div>
        <button className="bg-gray-300 mt-2 p-1 rounded-lg h-8 w-20"></button>
      </div>
    </section>
  );
};

export default SingleArticleLoading;

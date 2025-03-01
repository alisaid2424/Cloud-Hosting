"use client";
import Link from "next/link";

interface ErrorPageProps {
  error: Error;
  reset: () => void;
}

const ArticleErrorPage = ({ error, reset }: ErrorPageProps) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center flex-col">
      <p className="mb-2">This is custom error page for articles route/page </p>

      <div className="text-3xl text-red-600 font-bold">
        Something Went Wrong
      </div>

      <h2 className="text-gray-700 my-5 text-xl">
        Error Message : {error.message}
      </h2>

      <button
        onClick={reset}
        className="text-white bg-blue-600 hover:bg-blue-700 transition-all duration-300 py-2 px-4 rounded-full"
      >
        Try Again
      </button>

      <Link href="/" className="text-xl block mt-7 text-blue-600 underline">
        Go To Home Page &rarr;
      </Link>
    </div>
  );
};

export default ArticleErrorPage;

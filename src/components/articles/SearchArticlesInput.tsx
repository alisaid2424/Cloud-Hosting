"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SearchArticlesInput = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const formSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log({ search });

    router.push(`/articles/search?searchText=${search}`);
  };

  return (
    <form onSubmit={formSubmitHandler} className="w-full md:w-2/3 my-5 mx-auto">
      <input
        className="input w-full h-12"
        type="search"
        placeholder="Search For Articles"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </form>
  );
};

export default SearchArticlesInput;

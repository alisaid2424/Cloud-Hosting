"use client";
import { DOMAIN } from "@/utils/constants";
import { Article } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

interface EditArticleFormProps {
  article: Article;
}

const EditArticleForm = ({ article }: EditArticleFormProps) => {
  const router = useRouter();
  const [input, setInput] = useState({
    title: article.title,
    description: article.description,
  });

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const formSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.title === "") return toast.error("Title is required");
    if (input.description === "") return toast.error("Description is required");

    try {
      await axios.put(`${DOMAIN}/api/articles/${article.id}`, {
        title: input.title,
        description: input.description,
      });
      toast.success("Article updated successfully");
      router.push("/admin/articles-table?pageNumber=1");
      router.refresh();
    } catch (error: any) {
      toast.error(error?.response?.data.message);
      console.log(error);
    }
  };

  return (
    <form onSubmit={formSubmitHandler} className="flex flex-col">
      <input
        className="input"
        type="text"
        name="title"
        value={input.title}
        onChange={handleOnChange}
      />
      <textarea
        className="input resize-none"
        name="description"
        value={input.description}
        onChange={handleOnChange}
        rows={5}
      ></textarea>

      <button
        type="submit"
        className="text-2xl text-white bg-green-700 hover:bg-green-900 p-2 rounded-lg font-bold transition-all duration-300"
      >
        Edit
      </button>
    </form>
  );
};

export default EditArticleForm;

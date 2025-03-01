"use client";
import { DOMAIN } from "@/utils/constants";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const AddArticlesForm = () => {
  const router = useRouter();
  const [input, setInput] = useState({
    title: "",
    description: "",
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
      await axios.post(`${DOMAIN}/api/articles`, {
        title: input.title,
        description: input.description,
      });
      toast.success("Article added successfully");
      setInput({
        title: "",
        description: "",
      });
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
        placeholder="Enter Your Title"
        value={input.title}
        onChange={handleOnChange}
      />
      <textarea
        className="input resize-none"
        name="description"
        placeholder="Enter Articles Description"
        value={input.description}
        onChange={handleOnChange}
        rows={5}
      ></textarea>

      <button
        type="submit"
        className="text-2xl text-white bg-blue-700 hover:bg-blue-900 p-2 rounded-lg font-bold transition-all duration-300"
      >
        Add
      </button>
    </form>
  );
};

export default AddArticlesForm;

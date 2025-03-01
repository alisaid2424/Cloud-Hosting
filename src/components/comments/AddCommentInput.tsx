"use client";
import { DOMAIN } from "@/utils/constants";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

interface AddCommentInputProps {
  articleId: number;
}

const AddCommentInput = ({ articleId }: AddCommentInputProps) => {
  const router = useRouter();
  const [text, setText] = useState("");

  const formSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    if (text === "") return toast.error("Comment is required");

    try {
      await axios.post(`${DOMAIN}/api/comments`, {
        text,
        articleId,
      });
      router.refresh();
      setText("");
      toast.success("Comment added successfully");
    } catch (error: any) {
      toast.error(error?.response?.data.message);
      console.log(error);
    }
  };

  return (
    <form onSubmit={formSubmitHandler}>
      <input
        className="input w-full h-12"
        type="text"
        placeholder="Write a comment..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        type="submit"
        className="bg-green-700 text-white mt-2 px-2 py-1 w-min text-base rounded-lg hover:bg-green-900 transition duration-300"
      >
        Comment
      </button>
    </form>
  );
};

export default AddCommentInput;

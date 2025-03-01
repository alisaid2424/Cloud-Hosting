"use client";

import { DOMAIN } from "@/utils/constants";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { toast } from "react-toastify";

interface UpdateCommentModelProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
  text: string;
  commentId: number;
}
const UpdateCommentModel = ({
  setOpen,
  text,
  commentId,
}: UpdateCommentModelProps) => {
  const router = useRouter();
  const [updatedText, setUpdatedText] = useState(text);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (updatedText === "") return toast.info("Please write Something");

    try {
      await axios.put(`${DOMAIN}/api/comments/${commentId}`, {
        text: updatedText,
      });
      toast.success("Comment updated successfully");
      router.refresh();
      setUpdatedText("");
      setOpen(false);
    } catch (error: any) {
      toast.error(error?.response?.data.message);
      console.log(error);
    }
  };

  return (
    <div className="fixed inset-0 z-10 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white p-3 rounded-lg w-11/12 lg:w-2/4">
        <div className="flex items-start justify-end mb-5">
          <IoIosCloseCircleOutline
            onClick={() => setOpen(false)}
            className="cursor-pointer text-red-600 text-3xl"
          />
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Edit Comment"
            className="w-full px-3 py-2 mb-5 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-600"
            value={updatedText}
            onChange={(e) => setUpdatedText(e.target.value)}
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-blue-600 text-white w-full"
          >
            Edit
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateCommentModel;

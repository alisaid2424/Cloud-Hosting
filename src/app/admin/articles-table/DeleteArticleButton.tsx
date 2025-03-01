"use client";

import { DOMAIN } from "@/utils/constants";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface DeleteArticleButtonProps {
  articleId: number;
}
const DeleteArticleButton = ({ articleId }: DeleteArticleButtonProps) => {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      if (confirm("Are you sure you want to delete this article?")) {
        await axios.delete(`${DOMAIN}/api/articles/${articleId}`);
        router.refresh();
        toast.success("Article deleted successfully");
      }
    } catch (error: any) {
      toast.error(error?.response?.data.message);
      console.log(error);
    }
  };

  return (
    <div
      onClick={handleDelete}
      className="bg-red-600 text-white py-1 px-2 hover:bg-red-800 transition-all duration-300 rounded-lg inline-block cursor-pointer"
    >
      Delete
    </div>
  );
};

export default DeleteArticleButton;

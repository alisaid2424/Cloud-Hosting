"use client";

import { CommentWithUser } from "@/utils/types";
import { FaEdit, FaTrash } from "react-icons/fa";
import UpdateCommentModel from "./UpdateCommentModel";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { DOMAIN } from "@/utils/constants";
import { useRouter } from "next/navigation";

interface CommentItemProps {
  comment: CommentWithUser;
  userId: number | undefined;
}

const CommentItem = ({ comment, userId }: CommentItemProps) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleDeleteComment = async () => {
    try {
      if (confirm("you want delete this comment, Are you sure?")) {
        await axios.delete(`${DOMAIN}/api/comments/${comment.id}`);
        toast.success("Comment deleted successfully!");
        router.refresh();
      }
    } catch (error: any) {
      toast.error(error?.response?.data.message);
      console.log(error);
    }
  };

  return (
    <div className="mb-5 rounded-lg p-3 bg-gray-200 border-2 border-gray-300">
      <div className="flex items-center justify-between mb-2">
        <strong className="text-gray-800 capitalize">
          {comment.user.username}
        </strong>
        <span className="bg-blue-700 px-2 py-1 rounded-lg text-white text-sm">
          {new Date(comment.createdAt).toDateString()}
        </span>
      </div>
      <p className="text-gray-800 text-sm mb-2">{comment.text}</p>
      {userId && userId === comment.userId && (
        <div className="flex justify-end items-center gap-5">
          <FaEdit
            onClick={() => setOpen(true)}
            className="text-green-600 text-xl cursor-pointer "
          />
          <FaTrash
            onClick={handleDeleteComment}
            className="text-red-600 text-xl cursor-pointer"
          />
        </div>
      )}

      {open && (
        <UpdateCommentModel
          setOpen={setOpen}
          text={comment.text}
          commentId={comment.id}
        />
      )}
    </div>
  );
};

export default CommentItem;

"use client";

import { deleteUser } from "@/utils/actions";
import { toast } from "react-toastify";

interface DeleteUserButtonProps {
  userId: number;
}
const DeleteUserButton = ({ userId }: DeleteUserButtonProps) => {
  const handleDelete = async () => {
    try {
      if (confirm("Are you sure you want to delete this user?")) {
        await deleteUser(String(userId));
        toast.success("User deleted successfully");
      }
    } catch (error: any) {
      toast.error(error?.response?.data.message);
      console.log(error);
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="bg-red-600 text-white py-1 px-3 rounded-md text-sm font-medium hover:bg-red-700 transition-colors"
    >
      Delete
    </button>
  );
};

export default DeleteUserButton;

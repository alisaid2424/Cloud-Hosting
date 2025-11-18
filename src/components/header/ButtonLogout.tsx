"use client";
import { DOMAIN } from "@/utils/constants";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";

const ButtonLogout = ({
  setIsOpen,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const router = useRouter();
  const handleButtonClick = async () => {
    try {
      await axios.get(`${DOMAIN}/api/users/logout`);
      setIsOpen(false);
      router.replace("/");
      router.refresh();
    } catch (error: any) {
      toast.error(error?.response?.data.message);
      console.log(error);
    }
  };
  return (
    <button
      onClick={handleButtonClick}
      className="text-white bg-blue-600 text-base px-4 py-2 rounded-full"
    >
      Logout
    </button>
  );
};

export default ButtonLogout;

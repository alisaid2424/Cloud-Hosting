"use client";
import { DOMAIN } from "@/utils/constants";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";

const ButtonLogout = () => {
  const router = useRouter();
  const handleButtonClick = async () => {
    try {
      await axios.get(`${DOMAIN}/api/users/logout`);
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
      className="text-white bg-gray-700 text-base px-3 py-1 rounded-md"
    >
      Log out
    </button>
  );
};

export default ButtonLogout;

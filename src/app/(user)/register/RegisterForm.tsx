"use client";
import ButtonSpinner from "@/components/ButtonSpinner";
import { DOMAIN } from "@/utils/constants";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const RegisterForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const formSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.username === "") return toast.error("Username is required");
    if (input.email === "") return toast.error("Email is required");
    if (input.password === "") return toast.error("Password is required");

    try {
      setIsLoading(true);
      await axios.post(`${DOMAIN}/api/users/register`, {
        username: input.username,
        email: input.email,
        password: input.password,
      });
      router.replace("/");
      setIsLoading(false);
      router.refresh();
    } catch (error: any) {
      toast.error(error?.response?.data.message);
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <form onSubmit={formSubmitHandler} className="flex flex-col">
      <input
        className="input"
        type="text"
        placeholder="Enter Your Username"
        value={input.username}
        name="username"
        onChange={handleOnChange}
      />
      <input
        className="input"
        type="email"
        placeholder="Enter Your Email"
        value={input.email}
        name="email"
        onChange={handleOnChange}
      />
      <input
        className="input"
        type="password"
        placeholder="Enter Your Password"
        value={input.password}
        name="password"
        onChange={handleOnChange}
      />
      <button
        type="submit"
        disabled={isLoading}
        className="text-xl text-white bg-blue-800 p-2 rounded-lg font-semibold disabled:cursor-not-allowed"
      >
        {isLoading ? <ButtonSpinner /> : "Register"}
      </button>
    </form>
  );
};

export default RegisterForm;

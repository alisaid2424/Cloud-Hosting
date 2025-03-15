/* "use client";

import ButtonSpinner from "@/components/ButtonSpinner";
import { DOMAIN } from "@/utils/constants";
import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

interface EditUserFormProps {
  user: User;
}

const EditUserForm = ({ user }: EditUserFormProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState({
    username: user.username,
    email: user.email,
    password: user.password,
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
      await axios.put(`${DOMAIN}/api/users/profile/${user.id}`, {
        username: input.username,
        email: input.email,
        password: input.password,
      });
      router.replace("/profile");
      setIsLoading(false);
      router.refresh();
      toast.success("User updated successfully");
    } catch (error: any) {
      toast.error(error?.response?.data.message);
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <form onSubmit={formSubmitHandler} className="flex flex-col ">
      <input
        className="input"
        type="text"
        value={input.username}
        name="username"
        onChange={handleOnChange}
      />
      <input
        className="input"
        type="email"
        value={input.email}
        name="email"
        onChange={handleOnChange}
      />
      <input
        className="input"
        type="password"
        placeholder="Enter New Password"
        value={input.password}
        name="password"
        onChange={handleOnChange}
      />
      <button
        type="submit"
        disabled={isLoading}
        className="text-xl text-white bg-green-800 p-2 rounded-lg font-semibold disabled:cursor-not-allowed"
      >
        {isLoading ? <ButtonSpinner /> : "Edit"}
      </button>
    </form>
  );
};

export default EditUserForm;
 */

"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ButtonSpinner from "@/components/ButtonSpinner";
import { DOMAIN } from "@/utils/constants";
import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Input from "@/components/forms/Input";
import { TEditUserType, UpdateUserSchema } from "@/utils/validationShemas";

interface EditUserFormProps {
  user: User;
}

const EditUserForm = ({ user }: EditUserFormProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // Initialize react-hook-form with zod validation resolver
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<TEditUserType>({
    mode: "onBlur",
    resolver: zodResolver(UpdateUserSchema),
  });

  // Set default values from the user prop
  useEffect(() => {
    setValue("username", user.username);
    setValue("email", user.email);
    setValue("password", user.password);
  }, [user, setValue]);

  // Form submit handler
  const formSubmitHandler: SubmitHandler<TEditUserType> = async (data) => {
    if (isLoading) return;

    try {
      setIsLoading(true);
      await axios.put(`${DOMAIN}/api/users/profile/${user.id}`, data);
      router.replace("/profile");
      setIsLoading(false);
      router.refresh();
      toast.success("User updated successfully");
    } catch (error: any) {
      toast.error(error?.response?.data.message);
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(formSubmitHandler)}
      className="flex flex-col space-y-3"
    >
      <Input
        name="username"
        type="text"
        register={register}
        error={errors.username?.message}
        disabled={isLoading}
        placeholder="Enter Your Username"
      />

      <Input
        name="email"
        type="email"
        register={register}
        error={errors.email?.message}
        disabled={isLoading}
        placeholder="Enter Your Email"
      />

      <Input
        name="password"
        type="password"
        register={register}
        error={errors.password?.message}
        disabled={isLoading}
        placeholder="Enter New Password"
      />

      <button
        type="submit"
        disabled={isLoading}
        className="text-xl text-white bg-green-800 p-2 rounded-lg font-semibold disabled:cursor-not-allowed"
      >
        {isLoading ? <ButtonSpinner /> : "Edit"}
      </button>
    </form>
  );
};

export default EditUserForm;

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

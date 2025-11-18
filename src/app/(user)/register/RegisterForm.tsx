"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ButtonSpinner from "@/components/ButtonSpinner";
import { DOMAIN } from "@/utils/constants";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { RegisterSchema, TRegisterType } from "@/utils/validationShemas";
import Input from "@/components/forms/Input";

const RegisterForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // Initialize react-hook-form with zod validation resolver
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TRegisterType>({
    mode: "onBlur",
    resolver: zodResolver(RegisterSchema),
  });

  // Form submit handler
  const formSubmitHandler: SubmitHandler<TRegisterType> = async (data) => {
    if (isLoading) return;

    try {
      setIsLoading(true);
      await axios.post(`${DOMAIN}/api/users/register`, data);
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
        placeholder="Enter Your Password"
      />

      <button
        type="submit"
        disabled={isLoading}
        className="text-base sm:text-lg text-white bg-blue-800 p-2 rounded-lg font-semibold disabled:cursor-not-allowed"
      >
        {isLoading ? <ButtonSpinner /> : "Register"}
      </button>
    </form>
  );
};

export default RegisterForm;

"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DOMAIN } from "@/utils/constants";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import {
  ArticleSchemaType,
  CreateArticleSchema,
} from "@/utils/validationShemas";
import Input from "@/components/forms/Input";
import ButtonSpinner from "@/components/ButtonSpinner";

const AddArticlesForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // Initialize react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ArticleSchemaType>({
    mode: "onBlur",
    resolver: zodResolver(CreateArticleSchema),
  });

  const formSubmitHandler: SubmitHandler<ArticleSchemaType> = async (data) => {
    if (isLoading) return;

    try {
      setIsLoading(true);
      await axios.post(`${DOMAIN}/api/articles`, data);
      router.refresh();
      router.push("/admin/articles-table?pageNumber=1");
      toast.success("Article added successfully");
      setIsLoading(false);
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
        name="title"
        type="text"
        register={register}
        error={errors.title?.message}
        disabled={isLoading}
        placeholder="Enter Your Title"
      />

      <Input
        name="description"
        type="textarea"
        register={register}
        error={errors.description?.message}
        disabled={isLoading}
        placeholder="Enter Articles Description"
        isTextArea={true}
      />

      <button
        type="submit"
        disabled={isLoading}
        className="text-base sm:text-lg text-white bg-blue-700 hover:bg-blue-900 p-2 rounded-lg font-bold transition-all duration-300 disabled:opacity-50"
      >
        {isLoading ? <ButtonSpinner /> : "Add Article"}
      </button>
    </form>
  );
};

export default AddArticlesForm;

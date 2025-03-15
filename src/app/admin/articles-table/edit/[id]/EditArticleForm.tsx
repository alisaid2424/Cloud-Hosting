"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DOMAIN } from "@/utils/constants";
import { Article } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import {
  ArticleSchemaType,
  CreateArticleSchema,
} from "@/utils/validationShemas";
import Input from "@/components/forms/Input";
import ButtonSpinner from "@/components/ButtonSpinner";
import { useEffect, useState } from "react";

interface EditArticleFormProps {
  article: Article;
}

const EditArticleForm = ({ article }: EditArticleFormProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // Initialize react-hook-form with validation schema
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ArticleSchemaType>({
    mode: "onBlur",
    resolver: zodResolver(CreateArticleSchema),
  });

  // Set initial values using the article data
  useEffect(() => {
    if (article) {
      setValue("title", article.title);
      setValue("description", article.description);
    }
  }, [article, setValue]);

  // Handle form submission
  const formSubmitHandler: SubmitHandler<ArticleSchemaType> = async (data) => {
    if (isLoading) return;

    try {
      setIsLoading(true);
      await axios.put(`${DOMAIN}/api/articles/${article.id}`, data);
      router.refresh();
      router.push("/admin/articles-table?pageNumber=1");
      toast.success("Article updated successfully");
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
        placeholder="Enter Your Title"
      />

      <Input
        name="description"
        type="textarea"
        register={register}
        error={errors.description?.message}
        placeholder="Enter Article Description"
        isTextArea={true}
      />

      <button
        type="submit"
        className="text-2xl text-white bg-green-700 hover:bg-green-900 p-2 rounded-lg font-bold transition-all duration-300"
      >
        {isLoading ? <ButtonSpinner /> : "Edit"}
      </button>
    </form>
  );
};

export default EditArticleForm;

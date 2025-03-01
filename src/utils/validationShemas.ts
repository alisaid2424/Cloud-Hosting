import { z } from "zod";

//Create Article Schema
export const CreateArticleSchema = z.object({
  title: z
    .string({
      required_error: "title is required",
      invalid_type_error: "title should be of type string",
    })
    .min(2, { message: "title should be at least 2 characters long" })
    .max(200, { message: "title should be less 200 characters" }),
  description: z
    .string({
      required_error: "description is required",
      invalid_type_error: "description should be of type string",
    })
    .min(10)
    .max(1000),
});

// Create Register Schema
export const RegisterSchema = z.object({
  username: z
    .string({
      required_error: "username is required",
      invalid_type_error: "username should be of type string",
    })
    .min(3, { message: "username should be at least 3 characters long" })
    .max(50, { message: "username should be less 50 characters" }), //.optional(),
  email: z
    .string({
      required_error: "email is required",
      invalid_type_error: "email should be of type string",
    })
    .min(3, { message: "email should be at least 3 characters long" })
    .max(200, { message: "email should be less 200 characters" })
    .email({ message: "email is not valid" }),
  password: z
    .string({
      required_error: "password is required",
      invalid_type_error: "password should be of type string",
    })
    .min(6, { message: "password should be at least 6 characters long" }),
});

// Create Login Schema
export const LoginSchema = z.object({
  email: z
    .string({
      required_error: "email is required",
      invalid_type_error: "email should be of type string",
    })
    .min(3, { message: "email should be at least 3 characters long" })
    .max(200, { message: "email should be less 200 characters" })
    .email({ message: "email is not valid" }),
  password: z
    .string({
      required_error: "password is required",
      invalid_type_error: "password should be of type string",
    })
    .min(6, { message: "password should be at least 6 characters long" }),
});

// Update User Schema
export const UpdateUserSchema = z.object({
  username: z
    .string({
      required_error: "username is required",
      invalid_type_error: "username should be of type string",
    })
    .min(3, { message: "username should be at least 3 characters long" })
    .max(50, { message: "username should be less 50 characters" })
    .optional(),
  email: z
    .string({
      required_error: "email is required",
      invalid_type_error: "email should be of type string",
    })
    .min(3, { message: "email should be at least 3 characters long" })
    .max(200, { message: "email should be less 200 characters" })
    .email({ message: "email is not valid" })
    .optional(),
  password: z
    .string({
      required_error: "password is required",
      invalid_type_error: "password should be of type string",
    })
    .min(6, { message: "password should be at least 6 characters long" })
    .optional(),
});

// Create a new Comment
export const CreateCommentSchema = z.object({
  text: z
    .string({
      required_error: "content is required",
      invalid_type_error: "content should be of type string",
    })
    .min(3, { message: "content should be at least 3 characters long" })
    .max(500, { message: "content should be less 500 characters" }),
  articleId: z.number(),
});

// Update a Comment
export const UpdateCommentSchema = z.object({
  text: z
    .string({
      required_error: "content is required",
      invalid_type_error: "content should be of type string",
    })
    .min(3, { message: "content should be at least 3 characters long" })
    .max(500, { message: "content should be less 500 characters" }),
});

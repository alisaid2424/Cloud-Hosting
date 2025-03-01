import { Article, Comment, User } from "@prisma/client";

export type JWTPayload = {
  id: number;
  username: string;
  isAdmin: boolean;
};

export type CommentWithUser = Comment & { user: User };

export type ArticleSingle = Article & { comments: CommentWithUser[] };

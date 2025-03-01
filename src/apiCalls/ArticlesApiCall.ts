import { DOMAIN } from "@/utils/constants";
import { ArticleSingle } from "@/utils/types";
import { Article } from "@prisma/client";

// Get articles Based on pageNumber
export async function GetArticles(
  pageNumber: string | undefined
): Promise<Article[]> {
  const res = await fetch(`${DOMAIN}/api/articles?pageNumber=${pageNumber}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed To Fatch Articles");
  }

  return res.json();
}

// Get articles Based on textSearch
export async function GetArticlesBySearch(
  searchText: string
): Promise<Article[]> {
  const res = await fetch(
    `${DOMAIN}/api/articles/search?searchText=${searchText}`
  );

  if (!res.ok) {
    throw new Error("Failed To Fatch Articles");
  }

  return res.json();
}

// Get Single Article by id
export async function GetArticleById(
  articleId: string
): Promise<ArticleSingle> {
  const res = await fetch(`${DOMAIN}/api/articles/${articleId}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed To Fatch Article");
  }

  return res.json();
}

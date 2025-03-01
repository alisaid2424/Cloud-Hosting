import { CreateArticleDTo } from "@/utils/dtos";
import { CreateArticleSchema } from "@/utils/validationShemas";
import { NextRequest, NextResponse } from "next/server";
import { Article } from "@prisma/client";
import prisma from "@/utils/db";
import { ARTICLE_PER_PAGE } from "@/utils/constants";
import { verifyToken } from "@/utils/verifyToken";

/**
 *@method  GET
 *@route   ~/api/articles
 *@desc    Get articles By page Number
 *@access  public
 */

export async function GET(repuest: NextRequest) {
  try {
    const pageNumber = repuest.nextUrl.searchParams.get("pageNumber") || "1";

    const articles = await prisma.article.findMany({
      skip: ARTICLE_PER_PAGE * (parseInt(pageNumber) - 1),
      take: ARTICLE_PER_PAGE,
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(articles, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}

/**
 *@method  POST
 *@route   ~/api/articles
 *@desc    Create New Article
 *@access  private (only Admin can create new articles)
 */
export async function POST(repuest: NextRequest) {
  try {
    const user = verifyToken(repuest);
    if (!user || !user.isAdmin) {
      return NextResponse.json(
        { message: "only admin, access denied" },
        { status: 403 }
      );
    }

    const body = (await repuest.json()) as CreateArticleDTo;

    const validation = CreateArticleSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 400 }
      );
    }

    const newArticle: Article = await prisma.article.create({
      data: {
        title: body.title,
        description: body.description,
      },
    });

    return NextResponse.json(newArticle, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}

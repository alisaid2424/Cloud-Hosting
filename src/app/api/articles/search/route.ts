import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";

/**
 *@method  GET
 *@route   ~/api/articles/search?searchText=value
 *@desc    Get articles By Search Text
 *@access  public
 */

export async function GET(repuest: NextRequest) {
  try {
    const searchText = repuest.nextUrl.searchParams.get("searchText");

    let articles;
    if (searchText) {
      articles = await prisma.article.findMany({
        where: {
          title: {
            startsWith: searchText,
            mode: "insensitive",
          },
        },
      });
    } else {
      articles = await prisma.article.findMany({ take: 6 });
    }

    return NextResponse.json(articles, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}

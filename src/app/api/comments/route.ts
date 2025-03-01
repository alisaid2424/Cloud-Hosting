import { COMMENTS_PER_PAGE } from "@/utils/constants";
import prisma from "@/utils/db";
import { CreateCommentDTo } from "@/utils/dtos";
import { CreateCommentSchema } from "@/utils/validationShemas";
import { verifyToken } from "@/utils/verifyToken";
import { NextRequest, NextResponse } from "next/server";

/**
 *@method  POST
 *@route   ~/api/comments
 *@desc    Create New Comment
 *@access  private (only logged in user)
 */

export async function POST(request: NextRequest) {
  try {
    const user = verifyToken(request);
    if (!user) {
      return NextResponse.json(
        { message: "only logged in user, access denied" },
        { status: 401 }
      );
    }

    const body = (await request.json()) as CreateCommentDTo;

    const validation = CreateCommentSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 400 }
      );
    }

    const newComment = await prisma.comment.create({
      data: {
        text: body.text,
        articleId: body.articleId,
        userId: user.id,
      },
    });
    return NextResponse.json(newComment, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}

/**
 *@method  GET
 *@route   ~/api/comments
 *@desc    Get All Comment
 *@access  private (only Admin)
 */

export async function GET(request: NextRequest) {
  try {
    const user = verifyToken(request);
    if (user === null || user.isAdmin === false) {
      return NextResponse.json(
        { message: "only admin user, access denied" },
        { status: 403 }
      );
    }

    const pageNumber = request.nextUrl.searchParams.get("pageNumber") || "1";

    const comments = await prisma.comment.findMany({
      skip: COMMENTS_PER_PAGE * (parseInt(pageNumber) - 1),
      take: COMMENTS_PER_PAGE,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(comments, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}

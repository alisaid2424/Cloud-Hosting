import prisma from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/utils/verifyToken";
import { UpdatedUserDTo } from "@/utils/dtos";
import { UpdateUserSchema } from "@/utils/validationShemas";
import bcrypt from "bcryptjs";

/**
 *@method  DELETE
 *@route   ~/api/users/profile/:id
 *@desc    delete a profile
 *@access  private (only user himself can delete his account)
 */

interface Props {
  params: { id: string };
}

export async function DELETE(request: NextRequest, { params }: Props) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(params.id) },
      include: { comments: true },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const userFromToken = verifyToken(request);

    if (userFromToken !== null && userFromToken.id === user.id) {
      // deleting the user
      await prisma.user.delete({ where: { id: parseInt(params.id) } });

      // Delete all comments for user
      const commentIds = user?.comments.map((comment) => comment.id);
      await prisma.comment.deleteMany({
        where: { id: { in: commentIds } },
      });

      return NextResponse.json(
        { message: "your profile (account) has been deleted" },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { message: "only user himself can delete his profile, forbidden" },
      { status: 403 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}

/**
 *@method  GET
 *@route   ~/api/users/profile/:id
 *@desc    get a profile by id
 *@access  private (only user himself can get his account/profile)
 */

export async function GET(request: NextRequest, { params }: Props) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(params.id) },
      select: {
        id: true,
        username: true,
        email: true,
        isAdmin: true,
        createdAt: true,
      },
    });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const userFromToken = verifyToken(request);
    if (userFromToken === null || userFromToken.id !== user.id) {
      return NextResponse.json(
        { message: "you are not allowed, access denied ,forbidden." },
        { status: 403 }
      );
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}

/**
 *@method  PUT
 *@route   ~/api/users/profile/:id
 *@desc    updated profile
 *@access  private (only user himself can update his account/profile)
 */

export async function PUT(request: NextRequest, { params }: Props) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(params.id) },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const userFromToken = verifyToken(request);
    if (userFromToken === null || userFromToken.id !== user.id) {
      return NextResponse.json(
        { message: "you are not allowed, access denied, forbidden." },
        { status: 403 }
      );
    }

    const body = (await request.json()) as UpdatedUserDTo;

    const validation = UpdateUserSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 400 }
      );
    }

    if (body.password) {
      const salt = await bcrypt.genSalt(10);
      body.password = await bcrypt.hash(body.password, salt);
    }

    const updatedUser = await prisma.user.update({
      where: { id: parseInt(params.id) },
      data: {
        username: body.username,
        email: body.email,
        password: body.password,
      },
    });

    const { password, ...other } = updatedUser;

    return NextResponse.json({ ...other }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}

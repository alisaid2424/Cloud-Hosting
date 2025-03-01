import prisma from "@/utils/db";
import { RegisterUserDTo } from "@/utils/dtos";
import { RegisterSchema } from "@/utils/validationShemas";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { setCookie } from "@/utils/generateToken";

/**
 *@method  POST
 *@route   ~/api/users/register
 *@desc    Create New User
 *@access  public
 */

export async function POST(repuest: NextRequest) {
  try {
    const body = (await repuest.json()) as RegisterUserDTo;

    const validation = RegisterSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({ where: { email: body.email } });

    if (user) {
      return NextResponse.json(
        { message: "this user already registered" },
        { status: 400 }
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(body.password, salt);

    const newUser = await prisma.user.create({
      data: {
        username: body.username,
        email: body.email,
        password: hashedPassword,
      },
      select: {
        id: true,
        username: true,
        isAdmin: true,
      },
    });

    const cookie = setCookie({
      id: newUser.id,
      username: newUser.username,
      isAdmin: newUser.isAdmin,
    });

    return NextResponse.json(
      { ...newUser, message: "Registered & Authenticated" },
      {
        status: 201,
        headers: { "Set-Cookie": cookie },
      }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}

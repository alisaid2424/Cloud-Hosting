import prisma from "@/utils/db";
import { LoginUserDTo } from "@/utils/dtos";
import { setCookie } from "@/utils/generateToken";
import { LoginSchema } from "@/utils/validationShemas";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

/**
 *@method  POST
 *@route   ~/api/users/login
 *@desc    Login User
 *@access  public
 */

export async function POST(repuest: NextRequest) {
  try {
    const body = (await repuest.json()) as LoginUserDTo;

    const validation = LoginSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({ where: { email: body.email } });

    if (!user) {
      return NextResponse.json(
        { message: "invalid email or password" },
        { status: 400 }
      );
    }

    const isPasswordMatch = await bcrypt.compare(body.password, user.password);
    if (!isPasswordMatch) {
      return NextResponse.json(
        { message: "invalid email or password" },
        { status: 400 }
      );
    }

    const cookie = setCookie({
      id: user.id,
      username: user.username,
      isAdmin: user.isAdmin,
    });

    return NextResponse.json(
      { message: "Authenticated" },
      {
        status: 200,
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

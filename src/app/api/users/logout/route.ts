import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

/**
 *@method  GET
 *@route   ~/api/users/logout
 *@desc    logout user
 *@access  public
 */

export function GET(request: NextRequest) {
  try {
    cookies().delete("jwtToken");
    return NextResponse.json(
      { message: "Logged out successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}

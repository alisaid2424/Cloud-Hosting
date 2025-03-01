import jwt from "jsonwebtoken";
import { JWTPayload } from "./types";
import { NextRequest } from "next/server";

//Verify Token For Api Endpoints
export function verifyToken(request: NextRequest): JWTPayload | null {
  try {
    const jwtToken = request.cookies.get("jwtToken");
    const token = jwtToken?.value as string;
    if (!token) return null;

    const privateKey = process.env.JWT_SECRET_KEY as string;

    const userFromToken = jwt.verify(token, privateKey) as JWTPayload;

    return userFromToken;
  } catch (error) {
    return null;
  }
}

//Verify Token For Pages
export function verifyTokenForPages(token: string): JWTPayload | null {
  try {
    const privateKey = process.env.JWT_SECRET_KEY as string;
    const userFromToken = jwt.verify(token, privateKey) as JWTPayload;
    if (!userFromToken) return null;

    return userFromToken;
  } catch (error) {
    return null;
  }
}

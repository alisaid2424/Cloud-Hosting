import Jwt from "jsonwebtoken";
import { JWTPayload } from "./types";
import { serialize } from "cookie";

//generate JWT token
export function generateJWT(payloadJWT: JWTPayload): string {
  const privateKey = process.env.JWT_SECRET_KEY as string;

  const token = Jwt.sign(payloadJWT, privateKey, {
    expiresIn: "30d",
  });

  return token;
}

// set Cookie with jwt
export function setCookie(payloadJWT: JWTPayload): string {
  const token = generateJWT(payloadJWT);

  const cookie = serialize("jwtToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  return cookie;
}

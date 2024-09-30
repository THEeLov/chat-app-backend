import jwt from "jsonwebtoken"
import { Response } from "express"

export const generateTokenAndSetCookie = (userId: string, res: Response) => {

  const token = jwt.sign({userId}, process.env.JWT_SECRET!, {
    expiresIn: "15d"
  })

  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, // mili seconds
    httpOnly: true, // prevent XSS attacks cross-site scripting attacks
    sameSite: "strict", // prevent CSRF attacks by only allowing cookies to be sent from the same origin as the request (strict mode)
    secure: process.env.NODE_ENV === "production", // true for production
  });
}
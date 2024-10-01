import jwt, { JwtPayload } from "jsonwebtoken";
import { Response, Request, NextFunction } from "express";
import User from "../models/user.model";

export const protectRoute = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res
        .status(401)
        .json({ error: "You are not authorized - No Token Provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!);

    if (!decoded) {
      return res
        .status(401)
        .json({ error: "You are not authorized - Invalid Token" });
    }

    const user = await User.findOne((decoded as JwtPayload).userId).select(
      "-password"
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    req.user = user;

    next();
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

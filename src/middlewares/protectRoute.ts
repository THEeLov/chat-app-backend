import jwt, { JwtPayload } from "jsonwebtoken";
import { Response, Request, NextFunction } from "express";
import User from "../models/user.model";
import { Types } from "mongoose";

export const protectRoute = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res
        .status(401)
        .json({ error: "You are not authorized - No Token Provided" });
    }

    const token = authHeader.split(' ')[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET!);

    if (!decoded) {
      return res
        .status(401)
        .json({ error: "You are not authorized - Invalid Token" });
    }

    const userId = new Types.ObjectId((decoded as JwtPayload).userId as string);

    const user = await User.findOne((userId)).select(
      "-password"
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    req.user = user;

    next();
  } catch (error) {
    return res.status(500).json({ error: "Internal server error token" });
  }
};

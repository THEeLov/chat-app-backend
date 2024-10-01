import { Request, Response } from "express";
import { findAllUsers, findUserById } from "../repositories/user.repository";
import { UserNotFound } from "../errors/databaseErrors";

export const getUser = async (req: Request, res: Response) => {
  const { id: userId } = req.params;

  const result = await findUserById(userId);

  if (result.isOk) {
    return res
      .status(200)
      .json({ message: "User Successfully Loaded", data: result.value });
  }

  const error = result.error;

  if (error instanceof UserNotFound) {
    return res.status(404).json({ error: "User Not Found" });
  }

  return res.status(500).json({ error: "Internal Server Error" });
};

export const getUsers = async (req: Request, res: Response) => {
  const result = await findAllUsers();

  if (result.isOk) {
    return res
      .status(200)
      .json({ message: "Users Successfully Loaded", data: result.value });
  }

  return res.status(500).json({ error: "Internal Server Error" });
};

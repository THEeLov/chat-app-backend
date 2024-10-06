import { Request, Response } from "express";
import { findAllUsers, findUserById, findUsersByEmail } from "../repositories/user.repository";
import { UserNotFound } from "../errors/databaseErrors";

export const getUser = async (req: Request, res: Response) => {
  const { id: userId } = req.params;

  const result = await findUserById(userId);

  if (result.isOk) {
    return res.status(200).json(result.value);
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
    return res.status(200).json(result.value);
  }

  return res.status(500).json({ error: "Internal Server Error" });
};


export const getUsersByEmail = async (req: Request, res: Response) => {

  const email = req.query.email as string;
  
  const result = await findUsersByEmail(email);

  if (result.isOk) {
    return res.status(200).json(result.value);
  }

  const error = result.error;

  if (error instanceof UserNotFound) {
    return res.status(404) .json({ error: "No user was found" });
  }

  return res.status(500).json({ error: "Internal Server Error" });
}
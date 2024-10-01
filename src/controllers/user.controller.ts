import { Request, Response } from "express";
import { findUserById } from "../repositories/user.repository";


export const getUser = async (req: Request, res: Response) => {

  const { id: userId } = req.params;

  const result = await findUserById(userId);

  if (result.isOk) {
      return 
  }

  const error = result.error;
}
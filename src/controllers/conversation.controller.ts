import { Request, Response } from "express";
import { getConversationsUser } from "../repositories/conversation.repository";

export const getConversationsById = async (req: Request, res: Response) => {
  const { id: userId } = req.params;

  const result = await getConversationsUser(userId);

  if (result.isOk) {
     return res.status(200).json(result.value);
  }

  return res.status(500).json({ error: "Internal server error" });
};

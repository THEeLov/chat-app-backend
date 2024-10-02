import { Response } from "express";
import { getConversationAndAddMessage } from "../repositories/conversation.repository";

export const sendMessage = async (req: any, res: Response) => {
  const { message }: { message: string } = req.body;
  const { id: receiverId } = req.params;
  const { senderId } = (req.user!._id).toString();

  const result = await getConversationAndAddMessage(senderId, receiverId, message);

  if (result.isOk) {
    return res.status(201).json(result.value);
  }

  return res.status(500).json({ error: "Internal server error"})
};

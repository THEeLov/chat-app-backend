import { Request, Response } from "express";
import { getConversationAndAddMessage } from "../repositories/conversation.repository";
import { createMessage } from "../repositories/message.repository";
import { ObjectId } from "mongoose";

export const sendMessage = async (req: Request, res: Response) => {
  const { message }: { message: string } = req.body;
  const { id: receiverId } = req.params;
  const { senderId } = (req.user._id).toString();

  const result = await getConversationAndAddMessage(senderId, receiverId, message);

  if (result.isOk) {
    return res.status(201).json({ message: "Message sent successfully", conversation: result.value });
  }

  return res.status(500).json({ error: "Internal server error"})
};

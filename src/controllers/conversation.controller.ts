import { Request, Response } from "express";
import {
  createConversation,
  getConversation,
  getConversationsUser,
} from "../repositories/conversation.repository";
import { ConversationAlreadyCreated } from "../errors/databaseErrors";
import { getSocketId, io } from "../socket/socket";

export const getConversationsById = async (req: Request, res: Response) => {
  const { id: userId } = req.params;

  const result = await getConversationsUser(userId);

  if (result.isOk) {
    return res.status(200).json(result.value);
  }

  return res.status(500).json({ error: "Internal server error" });
};

export const getConversationMessages = async (
  req: Request,
  response: Response,
) => {
  const { id } = req.params;

  const result = await getConversation(id);

  if (result.isOk) {
    return response.status(200).json(result.value);
  }

  return response.status(500).json({ error: "Internal server error" });
};

export const postConversation = async (req: Request, res: Response) => {
  const { senderId, receiverId } = req.body;

  const result = await createConversation(senderId, receiverId);

  if (result.isOk) {
    const receiverSocketId = getSocketId(receiverId);
    const senderSocketId = getSocketId(senderId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newContact", result.value);
    }
    if (senderSocketId) {
      io.to(senderSocketId).emit("newContact", result.value);
    }

    return res.status(200).json(result.value);
  }

  const error = result.error;

  if (error instanceof ConversationAlreadyCreated) {
    return res.status(409).json({ error: "Conversation already created" });
  }
  return res.status(500).json({ error: "Internal server error" });
};

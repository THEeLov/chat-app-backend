import { Response } from "express";
import { getConversationAndAddMessage } from "../repositories/conversation.repository";
import { getSocketId, io } from "../socket/socket";

export const sendMessage = async (req: any, res: Response) => {
  const { message }: { message: string } = req.body;
  const { id: receiverId } = req.params;

  const senderId = req.user!._id.toString();

  const result = await getConversationAndAddMessage(
    senderId,
    receiverId,
    message,
  );

  if (result.isOk) {
    const receiverSocketId = getSocketId(receiverId);
    const senderSocketId = getSocketId(senderId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", result.value);
    }
    if (senderSocketId) {
      io.to(senderSocketId).emit("newMessage", result.value);
    }

    return res.status(201).json(result.value);
  }

  return res.status(500).json({ error: "Internal server error" });
};

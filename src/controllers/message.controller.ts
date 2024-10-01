import { Request, Response } from "express"
import { getConversation } from "../repositories/conversation.repository";

export const sendMessage = async (req: Request, res: Response) => {
  const {message} = req.body;
  const {id: receiverId} = req.params;
  const { senderId } = req.user

  const result = await getConversation(senderId, receiverId);

  if (result.isOk) {
      
  }

  const error = result.error;

}
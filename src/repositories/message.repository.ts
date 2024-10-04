import { Result } from "@badrap/result";
import Message from "../models/message.model";
import { DbResult, MessageType } from "../types";
import { ObjectId } from "mongodb";

export const createMessage = async (
  senderId: string,
  receiverId: string,
  message: string
): Promise<DbResult<MessageType>> => {
  try {
    const newMessage = new Message({
      senderId: new ObjectId(senderId),
      receiverId: new ObjectId(receiverId),
      message,
    });

    const savedMessage = await newMessage.save();
    return Result.ok(savedMessage);
    
  } catch (error) {
    return Result.err(new Error("Failed to create message"));
  }
};
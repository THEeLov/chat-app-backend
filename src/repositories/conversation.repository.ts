import { Result } from "@badrap/result";
import Conversation from "../models/conversation.model";
import { ConversationType, DbResult } from "../types";
import { ConversationNotFound } from "../errors/databaseErrors";
import { ObjectId } from "mongodb";
import Message from "../models/message.model";

export const getConversation = async (
  senderId: string,
  receiverId: string
): Promise<DbResult<ConversationType>> => {
  try {
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    }).exec();

    if (!conversation) {
      return Result.err(new ConversationNotFound());
    }

    return Result.ok(conversation);
  } catch (error) {
    return Result.err(new Error());
  }
};

export const getConversationAndAddMessage = async (
  senderId: string,
  receiverId: string,
  message: string
): Promise<DbResult<ConversationType>> => {
  try {
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    }).exec();

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [new ObjectId(senderId), new ObjectId(receiverId)],
      });
    }

    const newMessage = new Message({
      senderId: new ObjectId(senderId),
      receiverId: new ObjectId(receiverId),
      message,
    });

    // This could be done with transaction
    await newMessage.save();
    conversation.messages.push(newMessage._id);
    await conversation.save();

    return Result.ok(conversation);
  } catch (error) {
    return Result.err(new Error());
  }
};
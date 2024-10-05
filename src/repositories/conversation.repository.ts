import { Result } from "@badrap/result";
import Conversation from "../models/conversation.model";
import { ConversationType, DbResult, MessageType } from "../types";
import { ConversationNotFound } from "../errors/databaseErrors";
import { ObjectId } from "mongodb";
import Message from "../models/message.model";

export const getConversation = async (
  convId: string
): Promise<DbResult<ConversationType>> => {
  try {
    const convObjectId = new ObjectId(convId);

    const conversation = await Conversation.findOne(convObjectId)
      .populate("participants")
      .populate("messages")
      .exec();

    if (!conversation) {
      return Result.err(new ConversationNotFound());
    }

    return Result.ok(conversation);
  } catch (error) {
    return Result.err(new Error());
  }
};

export const getConversationsUser = async (
  userId: string
): Promise<DbResult<ConversationType[]>> => {
  try {
    const senderObjectId = new ObjectId(userId);

    const conversations = await Conversation.find({
      participants: { $in: [senderObjectId] },
    })
      .populate("participants", "-password -__v")
      .select("-messages")
      .exec();

    return Result.ok(conversations);
  } catch (error) {
    return Result.err(new Error());
  }
};

export const getConversationAndAddMessage = async (
  senderId: string,
  receiverId: string,
  message: string
): Promise<DbResult<MessageType>> => {
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
    const addedMessage = await newMessage.save();
    conversation.messages.push(newMessage._id);
    await conversation.save();

    return Result.ok(addedMessage);
  } catch (error) {
    return Result.err(new Error());
  }
};

export const createConversation = async (
  senderId: string,
  receiverId: string
) => {
  try {
    const senderObjectId = new ObjectId(senderId);
    const receiverObjectId = new ObjectId(receiverId);

    const conversation = await Conversation.findOne({
      participants: { $all: [senderObjectId, receiverObjectId] },
    }).exec();

    if (conversation) {
      return Result.ok(conversation);
    }

    const newConversation = await Conversation.create({
      participants: [senderObjectId, receiverObjectId],
    });

    return Result.ok(newConversation);
  } catch (error) {
    return Result.err(new Error());
  }
};

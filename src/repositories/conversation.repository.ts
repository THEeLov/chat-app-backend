import { Result } from "@badrap/result";
import Conversation from "../models/conversation.model";
import { ConversationType, DbResult } from "../types";
import { ConversationNotFound } from "../errors/databaseErrors";

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

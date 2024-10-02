import { Result } from "@badrap/result";
import { ObjectId } from 'mongodb'; 

export type UserType = {
  _id: ObjectId;
  username: string;
  email: string;
  password: string;
  profilePic: string;
  createdAt: NativeDate;
  updatedAt: NativeDate;
};

export type ConversationType = {
  _id: ObjectId;
  participants: Array<ObjectId>;
  messages: Array<ObjectId>;
  createdAt: NativeDate;
  updatedAt: NativeDate;
}

export type MessageType = {
  _id: ObjectId;
  senderId: ObjectId;
  receiverId: ObjectId;
  message: string;
  createdAt: NativeDate;
  updatedAt: NativeDate;
}


export type UserCreateType = Omit<UserType, "_id" | "createdAt" | "updatedAt">;

export type DbResult<T> = Promise<Result<T>>;

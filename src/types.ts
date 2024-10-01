import { Result } from "@badrap/result";
import { ObjectId } from 'mongodb'; 

export type UserType = {
  _id: ObjectId;
  username: string;
  email: string;
  password: string;
  profilePic: string;
};

export type ConversationType = {
  _id: ObjectId;
  participants: Array<ObjectId>;
  messages: Array<ObjectId>;
}

export type UserCreateType = Omit<UserType, "_id">;

export type DbResult<T> = Promise<Result<T>>;

import { Result } from "@badrap/result";
import { ObjectId } from 'mongodb'; 

export type UserType = {
  _id: ObjectId;
  username: string;
  email: string;
  password: string;
  profilePic: string;
};

export type UserCreateType = Omit<UserType, "_id">;

export type DbResult<T> = Promise<Result<T>>;

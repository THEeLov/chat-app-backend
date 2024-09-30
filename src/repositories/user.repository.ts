import { UserType, UserCreateType } from "../types";
import { Result } from "@badrap/result";
import { DbResult } from "../types";
import { EmailAlreadyExists } from "../errors/databaseErrors";
import User from "../models/user.model";
import { MongoServerError } from "mongodb";

export const getUser = async () => {};

export const createUser = async (
  userData: UserCreateType
): Promise<DbResult<UserType>> => {
  try {
    const newUser = new User({
      username: userData.username,
      email: userData.email,
      password: userData.password,
      profilePic: userData.profilePic,
    });

    await newUser.save();

    return Result.ok(newUser);
  } catch (error: any) {
    if ((error as MongoServerError).code === 11000) {
      return Result.err(new EmailAlreadyExists());
    }

    return Result.err();
  }
};

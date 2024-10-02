import { UserType, UserCreateType } from "../types";
import { Result } from "@badrap/result";
import { DbResult } from "../types";
import {
  EmailAlreadyExists,
  InvalidCredentials,
  UserNotFound,
} from "../errors/databaseErrors";
import User from "../models/user.model";
import { MongoServerError, ObjectId } from "mongodb";
import bcrypt from "bcryptjs";

export const findAllUsers = async (): Promise<DbResult<UserType[]>> => {
  try {
    const users = await User.find().select("-password").exec();
    return Result.ok(users);
  } catch (error) {
    return Result.err(new Error());
  }
};

export const findUserById = async (
  userId: string
): Promise<DbResult<UserType>> => {
  try {
    const user = await User.findById(new ObjectId(userId)).exec();

    if (!user) {
      return Result.err(new UserNotFound());
    }

    return Result.ok(user);
  } catch (error) {
    return Result.err(new Error());
  }
};

export const findUserByEmailAndPassword = async (
  email: string,
  password: string
): Promise<DbResult<UserType>> => {
  try {
    const user = await User.findOne({ email }).exec();
    const isMatch = await bcrypt.compare(password, user?.password || "");

    if (!user || !isMatch) {
      return Result.err(new InvalidCredentials());
    }

    return Result.ok(user);
  } catch (error) {
    return Result.err(new Error());
  }
};

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

    const resultUser = await newUser.save();

    return Result.ok(resultUser);
  } catch (error: any) {
    if ((error as MongoServerError).code === 11000) {
      return Result.err(new EmailAlreadyExists());
    }

    return Result.err();
  }
};

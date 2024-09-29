import { UserCreate } from "../types";
import { Result } from "@badrap/result";
import { DbResult } from "../types";
import prisma from "../prisma/client";
import { Prisma } from "@prisma/client";
import { UserAlreadyExists } from "../errors/databaseErrors";

export const getUser = async () => {};

export const createUser = async (
  userData: UserCreate
): Promise<DbResult<UserCreate>> => {
  try {
    const createdUser = await prisma.user.create({ data: userData });
    return Result.ok(createdUser);
  } catch (error: any) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return Result.err(new UserAlreadyExists());
      }
    }
    return Result.err();
  }
};

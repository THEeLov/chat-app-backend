import { Result } from "@badrap/result"

export type UserCreate = {
  username: string;
  email: string;
  password: string;
  profilePic: string;
}

export type DbResult<T> = Promise<Result<T>>
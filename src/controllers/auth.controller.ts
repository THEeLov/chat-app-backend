import { Request, Response } from "express";
import { createUser } from "../repositories/user.repository";
import bcrypt from "bcryptjs";
import { UserAlreadyExists } from "../errors/databaseErrors";

export const signInUser = async (req: Request, res: Response) => {};

export const signUpUser = async (req: Request, res: Response) => {
  const { username, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ error: "Passwords do not match" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const profilePic = `https://avatar.iran.liara.run/username?username=${username}`;

  const result = await createUser({
    username,
    email,
    password: hashedPassword,
    profilePic,
  });

  if (result.isOk) {
    return res.status(201).json({ message: "User created successfully" });
  }

  const error = result.error;

  if (error instanceof UserAlreadyExists) {
    return res.status(409).json({ error: error.message });
  }

  return res.status(500).json({ error: "Internal server error" });
};

export const signOutUser = async (req: Request, res: Response) => {};

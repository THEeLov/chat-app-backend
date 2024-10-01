import { Request, Response } from "express";
import { createUser, findUserByEmailAndPassword } from "../repositories/user.repository";
import bcrypt from "bcryptjs";
import {
  EmailAlreadyExists,
  InvalidCredentials,
} from "../errors/databaseErrors";
import { generateTokenAndSetCookie } from "../utils/generateToken";

export const signInUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const result = await findUserByEmailAndPassword(email, password);

  if (result.isOk) {
    generateTokenAndSetCookie(result.value._id.toString(), res);
    return res
      .status(200)
      .json({ message: "User succesfully logged in", user: result.value });
  }

  const error = result.error;

  if (error instanceof InvalidCredentials) {
    return res.status(401).json({ error: error.message });
  }

  return res.status(500).json({ error: "Internal server error" });
};

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
    generateTokenAndSetCookie(result.value._id.toString(), res);
    return res
      .status(201)
      .json({ message: "User created successfully", user: result.value });
  }

  const error = result.error;

  if (error instanceof EmailAlreadyExists) {
    return res.status(409).json({ error: error.message });
  }

  return res.status(500).json({ error: "Internal server error" });
};

export const signOutUser = async (req: Request, res: Response) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "User signed out successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

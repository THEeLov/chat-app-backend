import { Request, Response } from "express";
import { createUser } from "../repositories/user.repository";

export const signInUser = async (req: Request, res: Response) => {
  


};

export const signUpUser = async (req: Request, res: Response) => {

  const { username, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ error: "Passwords do not match" });
  }

  const profilePic = `https://avatar.iran.liara.run/username?username=${username}`
  
  const result = await createUser()

};

export const signOutUser = async (req: Request, res: Response) => {};

import jwt from "jsonwebtoken";

export const generateToken = (userId: string) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET!, {
    expiresIn: "15d",
  });

  return token;
};

import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes";
import messageRoutes from "./routes/message.routes";
import userRoutes from "./routes/user.routes";
import { connectToMongoDB } from "./db/connectToMondoDB";
import dotenv from "dotenv";
import cors from "cors";
import conversationRoutes from "./routes/conversation.routes";
import { app, server } from "./socket/socket";

dotenv.config();

const port = 3000;

app.use(
  cors({
    origin: "https://bolt-krl3.onrender.com",
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);
app.use("/api/conversations", conversationRoutes);

// Start the server
server.listen(port, () => {
  connectToMongoDB();
  console.log(`Server running at http://localhost:${port}`);
});

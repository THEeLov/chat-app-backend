import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

const userSocketMap: Map<String, String> = new Map();

io.on("connection", (socket) => {
  console.log("a user connected,", socket.id);

  const userId = socket.handshake.query.userId;
  if (typeof userId === "string") {
    userSocketMap.set(userId, socket.id);
  } else {
    console.warn("User ID is not a valid string:", userId);
  }

  io.emit("getOnlineUsers", Array.from(userSocketMap.keys()));

  // socket.on() is used to listen to the events, can be used both on client and server side
  socket.on("disconnect", () => {
    console.log("user disconnected,", socket.id);
    if (typeof userId === "string") {
      userSocketMap.delete(userId);
      io.emit("getOnlineUsers", Array.from(userSocketMap.keys()));
    }
  });
});

export { app, io, server };

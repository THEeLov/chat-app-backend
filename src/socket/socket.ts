import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: true, // Should be changed changed for real app
    methods: ["GET", "POST"],
  },
});

const userSocketMap: Map<string, string> = new Map();

export const getSocketId = (id: string): string | undefined => {
  return userSocketMap.get(id);
};

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  if (typeof userId === "string") {
    userSocketMap.set(userId, socket.id);
  } else {
    console.warn("User ID is not a valid string:", userId);
  }

  io.emit("getOnlineUsers", Array.from(userSocketMap.keys()));

  // socket.on() is used to listen to the events, can be used both on client and server side
  socket.on("disconnect", () => {
    if (typeof userId === "string") {
      userSocketMap.delete(userId);
      io.emit("getOnlineUsers", Array.from(userSocketMap.keys()));
    }
  });
});

export { app, io, server };

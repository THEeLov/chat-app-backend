# 🔙 Chat Application - Backend

This backend supports a real-time chat application using **Node.js**, **Express**, and **MongoDB**. It handles user authentication, message storage, and real-time communication via **Socket.IO**.

## 🌐 Deployment

Deployed on **Railway**, the server may enter **sleep mode** when inactive, causing initial requests to take longer. Check out the live version here: [BOLT CHAT BACKEND](https://chat-app-backend-production-daf6.up.railway.app/)

## 🚀 Features

- **User Authentication**: Registration and login with JWT.
- **Real-Time Messaging**: Instant messaging with Socket.IO.
- **Online Status**: Broadcast users' online/offline status.
- **Conversations**: Create and manage chat threads.

## 🛠️ Technologies Used

- **Node.js**: JavaScript runtime for server-side applications.
- **Express**: Web framework for building APIs.
- **MongoDB**: NoSQL database for storing chat data.
- **Mongoose**: ODM for MongoDB, providing schema-based solutions.
- **Socket.IO**: Enables real-time, bidirectional communication.
- **jsonwebtoken**: Used for securing user authentication.
- **bcryptjs**: Password hashing for security.

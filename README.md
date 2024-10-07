# 🔙 Chat Application - Backend

This is the backend of the real-time chat application, built using **Node.js**, **Express**, and **MongoDB**. It handles user authentication, stores messages, and manages real-time communication using **Socket.IO**.


## 🌐 Deployment on Render

This backend is deployed on **Render**. Please be aware that when the server is inactive, it enters **sleep mode**. As a result, the initial request (like login or registration) may take a few extra seconds/minutes to wake up the server.
Check out the live version of the project here: [BOLT CHAT BACKEND](https://chat-app-backend-q3h4.onrender.com/)

## 🚀 Features

- **User Authentication**: Registration and login with JWT.
- **Real-Time Messaging**: Real-time messaging using Socket.IO.
- **Online Status**: Manage and broadcast users' online/offline status.
- **Conversations**: Create, manage, and fetch conversations.

## 🛠️ Technologies Used

- **Node.js**
- **Express**
- **MongoDB (Mongoose)**
- **Socket.IO**: For real-time communication.
- **jsonwebtoken**: For user authentication.
- **bcryptjs**: For password hashing.

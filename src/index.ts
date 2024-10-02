import express from 'express';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes';
import messageRoutes from './routes/message.routes';
import userRoutes from './routes/user.routes';
import { connectToMongoDB } from './db/connectToMondoDB';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const port = 3000;

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)
app.use("/api/users", userRoutes);

// Start the server
app.listen(port, () => {
  connectToMongoDB();
  console.log(`Server running at http://localhost:${port}`);
});
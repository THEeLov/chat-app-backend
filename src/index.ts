import express from 'express';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes';
import messageRoutes from './routes/message.routes';
import { connectToMongoDB } from './db/connectToMondoDB';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 3000;

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes)
app.use("/api/message", messageRoutes)

// Start the server
app.listen(port, () => {
  connectToMongoDB();
  console.log(`Server running at http://localhost:${port}`);
});
import express from 'express';
import { PrismaClient } from '@prisma/client';
import cookieParser from 'cookie-parser';

const prisma = new PrismaClient();

const app = express();
const port = 3000;

app.use(express.json());
app.use(cookieParser());

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const app = express();
const port = 3000;

app.use(express.json());

app.post('/users', async (req: Request, res: Response) => {
  const { name, email } = req.body;
  try {
    const user = await prisma.user.create({
      data: {
        email: "test@gmail.com",
        password: "password",
        username: "tester",
        profilePic: "testingPic"
      },
    });
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error creating user' });
  }
});

app.get("/users", async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error fetching users' });
  }
})

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
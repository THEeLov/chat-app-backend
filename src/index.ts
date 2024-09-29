import express from 'express';
import cookieParser from 'cookie-parser';

const app = express();
const port = 3000;

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes)

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
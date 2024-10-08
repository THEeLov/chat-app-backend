import express from "express";
import { protectRoute } from "../middlewares/protectRoute";
import { sendMessage } from "../controllers/message.controller";

const router = express.Router();

router.post("/send/:id", protectRoute, sendMessage);

export default router;

import express from "express";
import { protectRoute } from "../middlewares/protectRoute";
import { getConversationsById } from "../controllers/conversation.controller";

const router = express.Router();

router.get("/:id", protectRoute, getConversationsById);

export default router;
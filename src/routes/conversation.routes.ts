import express from "express";
import { protectRoute } from "../middlewares/protectRoute";
import {
  getConversationMessages,
  getConversationsById,
} from "../controllers/conversation.controller";

const router = express.Router();

router.get("/:id", protectRoute, getConversationsById);
router.get("/messages/:id", protectRoute, getConversationMessages);

export default router;

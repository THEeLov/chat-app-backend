import express from "express";
import { protectRoute } from "../middlewares/protectRoute";
import {
  getConversationMessages,
  getConversationsById,
  postConversation,
} from "../controllers/conversation.controller";

const router = express.Router();

router.get("/:id", protectRoute, getConversationsById);
router.get("/messages/:id", protectRoute, getConversationMessages);
router.post("", protectRoute, postConversation);

export default router;

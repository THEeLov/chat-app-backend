import express from "express";
import { getUser, getUsers } from "../controllers/user.controller";
import { protectRoute } from "../middlewares/protectRoute";

const router = express.Router();

router.get("/:id", protectRoute, getUser);
router.get("/", protectRoute, getUsers);

export default router;

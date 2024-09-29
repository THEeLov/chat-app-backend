import express from "express";
import {
  signInUser,
  signUpUser,
  signOutUser,
} from "../controllers/auth.controller";

const router = express.Router();

router.post("/signin", signInUser);
router.post("/signup", signUpUser);
router.post("/signout", signOutUser);

export default router;

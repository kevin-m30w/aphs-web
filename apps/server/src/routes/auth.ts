import express from "express";
import { getMe, login, register } from "../controllers/auth";
import { requireAuth } from "../middlewares/auth";

export const authRouter = express.Router();

authRouter.post("/login", login);
authRouter.post("/register", register);
authRouter.get("/me", requireAuth, getMe);

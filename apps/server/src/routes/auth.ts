import express from "express";
import { getMe, login, register } from "../controllers/auth";
import { expressjwt as jwt } from "express-jwt";
import { jwtSecret } from "../lib/env";

export const authRouter = express.Router();

authRouter.post("/login", login);
authRouter.post("/register", register);
authRouter.get("/me", jwt({ secret: jwtSecret, algorithms: ["HS256"] }), getMe);

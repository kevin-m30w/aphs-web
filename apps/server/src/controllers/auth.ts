import argon2 from "argon2";
import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import {
	getUserByEmail,
	getUserById,
	registerUser,
} from "../../../../packages/db/src";
import {
	loginSchema,
	registerSchema,
} from "../../../../packages/validators/src";
import { jwtSecret } from "../lib/env";

interface AuthRequest extends Request {
	auth?: {
		userId: string;
		iss?: string;
		exp?: number;
	};
}

export const login = async (req: Request, res: Response) => {
	try {
		const { email, password } = loginSchema.parse(req.body);
		const user = await getUserByEmail(email);

		if (!user?.[0]) {
			return res
				.status(401)
				.json({ ok: false, message: "Invalid credentials" });
		}

		const dbUser = user[0];

		const isPasswordValid = await argon2.verify(dbUser.password, password);
		if (!isPasswordValid) {
			return res
				.status(401)
				.json({ ok: false, message: "Invalid credentials" });
		}

		const token = jwt.sign({ userId: dbUser.id }, jwtSecret, {
			issuer: "APHS",
			expiresIn: "30d",
			algorithm: "HS256",
		});

		res.status(200).json({ ok: true, token });
	} catch (error) {
		console.error(error);
		res.status(500).json({ ok: false, message: "Internal Server Error" });
	}
};

export const register = async (req: Request, res: Response) => {
	try {
		const { username, email, password } = registerSchema.parse(req.body);

		const existingUser = await getUserByEmail(email);
		if (existingUser?.length) {
			return res.status(400).json({
				ok: false,
				message: "User already exists!",
			});
		}

		const hashedPassword = await argon2.hash(password);

		const user = await registerUser({
			username,
			password: hashedPassword,
			email,
		});

		const createdUser = user?.[0];
		if (!createdUser?.id) {
			return res
				.status(500)
				.json({ ok: false, message: "Failed to create user" });
		}

		const token = jwt.sign({ userId: createdUser.id }, jwtSecret, {
			issuer: "APHS",
			expiresIn: "30d",
			algorithm: "HS256",
		});

		res.status(201).json({ ok: true, token });
	} catch (error) {
		console.error(error);
		res.status(500).json({ ok: false, message: "Internal Server Error" });
	}
};

export const getMe = async (req: AuthRequest, res: Response) => {
	try {
		const userId = req.auth?.userId;
		if (!userId) {
			return res.status(401).json({ ok: false, message: "Unauthorized" });
		}

		const user = await getUserById(userId);
		if (!user?.[0]) {
			return res.status(401).json({ ok: false, message: "Unauthorized" });
		}

		const { password: _, ...safeUser } = user[0];

		res.status(200).json({ ok: true, user: safeUser });
	} catch (error) {
		console.error(error);
		res.status(500).json({ ok: false, message: "Internal Server Error" });
	}
};

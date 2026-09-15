import { z } from "zod";

// Validators
export const registerSchema = z.object({
	username: z
		.string()
		.trim()
		.min(3, "Username must be at least 3 characters")
		.max(30, "Username must be under 30 characters"),
	email: z.email("Must be a valid email!"),
	password: z.string().min(8, "Password must be 8 characters or more"),
});

export const loginSchema = z.object({
	email: z.email("Must be a valid email!"),
	password: z.string().min(8, "Password must be 8 characters or more"),
});

// Types
export type RegisterSchema = z.infer<typeof registerSchema>;
export type LoginSchema = z.infer<typeof registerSchema>;

import { db, eq } from "..";
import { type NewUser, type UpdateUser, users } from "../schema";

export const registerUser = async (user: NewUser) => {
	return db.insert(users).values(user).returning();
};

export const getUserById = async (id: string) => {
	return db.select().from(users).where(eq(users.id, id)).limit(1);
};

export const getUserByEmail = async (email: string) => {
	return db.select().from(users).where(eq(users.email, email)).limit(1);
};

export const updateUser = async (id: string, user: UpdateUser) => {
	return db.update(users).set(user).where(eq(users.id, id)).returning();
};

export const deleteUser = async (id: string) => {
	return db.delete(users).where(eq(users.id, id));
};

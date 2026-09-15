import { resolve } from "node:path";
import { config } from "dotenv";

config({ path: resolve(import.meta.dir, "../../../.env") });

import { drizzle } from "drizzle-orm/node-postgres";

export { eq, sql } from "drizzle-orm";
export * from "./query";

if (!process.env.DATABASE_URL) {
	throw new Error("Database URL missing!");
}

export const db = drizzle(process.env.DATABASE_URL);

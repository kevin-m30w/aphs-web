import { resolve } from "node:path";
import { config } from "dotenv";

config({ path: resolve(import.meta.dir, "../../../../.env") });

export const url = process.env.SUPABASE_URL!;
export const publishableKey = process.env.SUPABASE_PUBLISHABLE_KEY!;
export const secretKey = process.env.SUPABASE_SECRET_KEY!;

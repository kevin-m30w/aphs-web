import { db, sql } from "..";

export * from "./users";

export const getDBStatus = async (): Promise<boolean> => {
    try {
        await db.execute(sql`SELECT 1`);
        return true;
    } catch {
        return false;
    }
};

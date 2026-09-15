import type { NextFunction, Request, Response } from "express";
import { supabaseAdmin } from "../lib/supabase";

export const requireAuth = async (
    req: Request & { user?: any },
    res: Response,
    next: NextFunction,
) => {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
        return res
            .status(401)
            .json({ ok: false, message: "Missing or invalid token" });
    }

    const token = authHeader.split(" ")[1];
    const {
        data: { user },
        error,
    } = await supabaseAdmin.auth.getUser(token);

    if (error || !user) {
        return res.status(401).json({ ok: false, message: "Unauthorized" });
    }

    req.user = user;
    next();
};

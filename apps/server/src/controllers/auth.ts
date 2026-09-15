import type { Request, Response } from "express";
import {
    loginSchema,
    registerSchema,
} from "../../../../packages/validators/src";
import { supabaseAdmin, supabaseAuth } from "../lib/supabase";

interface AuthRequest extends Request {
    user?: {
        id: string;
        email?: string;
        user_metadata?: Record<string, any>;
    };
}

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = loginSchema.parse(req.body);

        const { data, error } = await supabaseAuth.auth.signInWithPassword({
            email,
            password,
        });

        if (error || !data.session) {
            return res.status(401).json({
                ok: false,
                message: error?.message || "Invalid credentials",
            });
        }

        res.status(200).json({
            ok: true,
            token: data.session.access_token,
            refreshToken: data.session.refresh_token,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ ok: false, message: "Internal Server Error" });
    }
};

export const register = async (req: Request, res: Response) => {
    try {
        const { username, email, password } = registerSchema.parse(req.body);

        const { data, error } = await supabaseAdmin.auth.admin.createUser({
            email,
            password,
            email_confirm: true,
            user_metadata: { username },
        });

        if (error || !data.user) {
            return res.status(400).json({
                ok: false,
                message: error?.message || "Failed to create user",
            });
        }

        const { data: sessionData, error: sessionError } =
            await supabaseAuth.auth.signInWithPassword({
                email,
                password,
            });

        if (sessionError || !sessionData.session) {
            return res.status(201).json({
                ok: true,
                message: "User created, please sign in.",
                user: data.user,
            });
        }

        res.status(201).json({
            ok: true,
            token: sessionData.session.access_token,
            refreshToken: sessionData.session.refresh_token,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ ok: false, message: "Internal Server Error" });
    }
};

export const getMe = async (req: AuthRequest, res: Response) => {
    try {
        const user = req.user;
        if (!user?.id) {
            return res.status(401).json({ ok: false, message: "Unauthorized" });
        }

        res.status(200).json({
            ok: true,
            user: {
                id: user.id,
                email: user.email,
                username: user.user_metadata?.username,
                ...user.user_metadata,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ ok: false, message: "Internal Server Error" });
    }
};

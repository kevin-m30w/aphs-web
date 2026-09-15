import express, {
    type NextFunction,
    type Request,
    type Response,
} from "express";
import { getDBStatus } from "../../../../packages/db/src";
import { authRouter } from "./auth";

export const appRouter = express.Router();

appRouter.get("/", async (_req: Request, res: Response) => {
    try {
        const dbConnection = await getDBStatus();
        res.status(200).json({
            ok: true,
            status: "healthy",
            db: dbConnection ? "connected" : "disconnected",
            uptime: process.uptime(),
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            status: "unhealthy",
            db: "disconnected",
            uptime: process.uptime(),
        });
    }
});

appRouter.use("/auth", authRouter);
appRouter.use((err: any, _req: Request, res: Response, next: NextFunction) => {
    if (err.name === "UnauthorizedError") {
        return res.status(401).json({
            ok: false,
            message: err.message || "Invalid or missing token",
        });
    }

    if (res.headersSent) {
        return next(err);
    }

    console.error(err);
    res.status(500).json({
        ok: false,
        message: "Internal Server Error",
    });
});

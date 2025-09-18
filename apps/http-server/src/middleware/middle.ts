import jwt from "jsonwebtoken";
import { NextFunction, Response, Request } from "express";
import { JWT_SECRET } from "@repo/common/common";

export async function Middleware(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies?.authorization; 

    if (!token) {
        return res.status(400).json({ msg: "no token found" });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { id?: string };
        req.user = decoded.id;
        next();
    } catch {
        return res.status(400).json({ msg: "invalid token" });
    }
}

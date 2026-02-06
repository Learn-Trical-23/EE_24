import { Router } from "express";
import jwt from "jsonwebtoken";
import { query } from "../db";
export const authRouter = Router();
// POST /api/auth/login
// Supabase-like auth flow: returns JWT with role claim.
authRouter.post("/login", async (req, res) => {
    const { email } = req.body;
    const users = await query("SELECT id, role, full_name FROM profiles WHERE email = $1", [email]);
    if (users.length === 0) {
        return res.status(401).json({ message: "Invalid credentials" });
    }
    const user = users[0];
    const token = jwt.sign({ sub: user.id, role: user.role }, process.env.JWT_SECRET ?? "dev-secret", { expiresIn: "1d" });
    return res.json({
        token,
        user: {
            id: user.id,
            name: user.full_name,
            role: user.role,
        },
    });
});
// POST /api/auth/request-admin
// Member creates admin access request; RLS-ready to be validated server-side.
authRouter.post("/request-admin", async (req, res) => {
    const { userId } = req.body;
    await query("INSERT INTO admin_requests (user_id, status) VALUES ($1, 'pending') ON CONFLICT DO NOTHING", [userId]);
    res.json({ status: "pending" });
});

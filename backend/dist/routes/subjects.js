import { Router } from "express";
import { authenticate, requireRole } from "../middleware/auth";
import { query } from "../db";
export const subjectRouter = Router();
subjectRouter.get("/", authenticate, async (_req, res) => {
    const subjects = await query("SELECT id, code, name FROM subjects ORDER BY code");
    res.json(subjects);
});
subjectRouter.post("/", authenticate, requireRole(["admin", "super_admin"]), async (req, res) => {
    const { code, name } = req.body;
    const [subject] = await query("INSERT INTO subjects (code, name) VALUES ($1, $2) RETURNING *", [code, name]);
    res.json(subject);
});
subjectRouter.get("/:subjectId", authenticate, async (req, res) => {
    const { subjectId } = req.params;
    const [subject] = await query("SELECT id, code, name FROM subjects WHERE id = $1", [subjectId]);
    res.json(subject);
});

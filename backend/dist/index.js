import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { authRouter } from "./routes/auth.js";
import { subjectRouter } from "./routes/subjects.js";
import { requestRouter } from "./routes/requests.js";
import { fileRouter } from "./routes/files.js";
import { activityRouter } from "./routes/activity.js";
import { usersRouter } from "./routes/users.js";
import eventsRouter from "./routes/events.js";
import { pool } from "./db.js";
dotenv.config();
const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.get("/health", (_req, res) => {
    res.json({ status: "ok", date: new Date().toISOString() });
});
app.use("/api/auth", authRouter);
app.use("/api/subjects", subjectRouter);
app.use("/api/requests", requestRouter);
app.use("/api/files", fileRouter);
app.use("/api/activity", activityRouter);
app.use("/api/users", usersRouter);
app.use("/api/events", eventsRouter);
// Cleanup: remove past events automatically (runs on startup and periodically)
async function cleanupPastEvents() {
    try {
        const res = await pool.query(`DELETE FROM events WHERE datetime < NOW() RETURNING id`);
        if (res.rowCount && res.rowCount > 0) {
            console.log(`cleanup: removed ${res.rowCount} past event(s)`);
        }
    }
    catch (err) {
        console.error('cleanupPastEvents failed', err);
    }
}
// run cleanup on startup
cleanupPastEvents();
// schedule hourly cleanup
setInterval(cleanupPastEvents, 1000 * 60 * 60);
const port = process.env.PORT ?? 4000;
app.listen(port, () => {
    console.log(`API running on ${port}`);
});

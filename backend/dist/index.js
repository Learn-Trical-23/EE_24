import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { authRouter } from "./routes/auth";
import { subjectRouter } from "./routes/subjects";
import { requestRouter } from "./routes/requests";
import { fileRouter } from "./routes/files";
import { activityRouter } from "./routes/activity";
import { usersRouter } from "./routes/users";
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
const port = process.env.PORT ?? 4000;
app.listen(port, () => {
    console.log(`API running on ${port}`);
});

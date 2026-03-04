import express from "express";
import cors from "cors";
import { router } from "./routes/index.js";

const app = express();

app.use(cors({ origin: "http://localhost:3001", credentials: true }));
app.use(express.json());

app.get("/health", (_, res) => {
  res.json({ status: "ok" });
});

app.use(router);

export default app;

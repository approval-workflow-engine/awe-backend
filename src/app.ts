import express from "express";
import cors from "cors";
import { router } from "./routes/index.js";
import Config from "./config.js";

const app = express();

app.use(cors({ origin: Config.FRONTEND_URL, credentials: true }));

app.use(express.json());

app.get("/health", (_, res) => {
  res.json({ status: "ok" });
});

app.use(router);

export default app;

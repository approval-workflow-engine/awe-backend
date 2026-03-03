import express from "express";
import { router } from "./routes/index.js";

const app = express();

app.use(express.json());

app.get("/health", (_, res) => {
  res.json({ status: "ok" });
});

app.use(router);

export default app;

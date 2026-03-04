import express from 'express';
import { router } from "./routes/index.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";

const app = express();

app.use(express.json());

app.use(errorMiddleware);

app.get("/health", (_, res) => {
  res.json({ status: "ok" });
});

app.use(router);

export default app;

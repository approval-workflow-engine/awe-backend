import express from 'express';
import authRoutes from "./routes/auth.routes.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";

const app = express();

app.use(express.json());

app.get('/health', (_, res) => {
  res.json({ status: 'ok' });
});

app.use("/api/v1/auth", authRoutes);

// Global error handler
app.use(errorMiddleware);

export default app;
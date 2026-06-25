import Fastify from "fastify";
import cors from "@fastify/cors";
import { collectRoute } from "./routes/collect";
import { statsRoute } from "./routes/stats";

export const app = Fastify({
  logger: true,
});

// ✅ ADD THIS
app.register(cors, {
  origin: ["http://localhost:5173","http://localhost:5174"],
  credentials: true,
});

app.register(collectRoute);
app.register(statsRoute);
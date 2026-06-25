import Fastify from "fastify";
import cors from "@fastify/cors";
import { collectRoute } from "./routes/collect";

export const app = Fastify({
  logger: true,
});

// ✅ ADD THIS
app.register(cors, {
  origin: "http://localhost:5173",
  credentials: true,
});

app.register(collectRoute);
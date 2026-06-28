import Fastify from "fastify";
import cors from "@fastify/cors";
import { collectRoute } from "./routes/collect";
import { statsRoute } from "./routes/stats";
import { pagesRoute } from "./routes/pages";
import { countriesRoute } from "./routes/countries";

export const app = Fastify({
  logger: true,
});

// ✅ ADD THIS
app.register(cors, {
  origin: ["http://localhost:5173","http://localhost:5174","https://dashboard-analytics-plat.vercel.app","https://tracker-test-prod.up.railway.app"],
  credentials: true,
});

app.register(collectRoute);
app.register(statsRoute);
app.register(pagesRoute);
app.register(countriesRoute);
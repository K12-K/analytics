import Fastify from "fastify";
import cors from "@fastify/cors";
import { collectRoute } from "./routes/collect";
import { statsRoute } from "./routes/stats";
import { pagesRoute } from "./routes/pages";
import { countriesRoute } from "./routes/countries";
import { sourcesRoute } from "./routes/sources";

export const app = Fastify({
  logger: true,
  trustProxy: true,
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
app.register(sourcesRoute);
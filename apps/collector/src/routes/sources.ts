import { FastifyInstance } from "fastify";
import { getSourceStats } from "../services/source-stats.service";

export async function sourcesRoute(app: FastifyInstance) {
  app.get("/sources", async () => {
    return getSourceStats();
  });
}
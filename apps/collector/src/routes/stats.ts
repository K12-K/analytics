import { FastifyInstance } from "fastify";
import {
  getStats,
  getLatestEvents,
} from "../services/stats.service";

export async function statsRoute(app: FastifyInstance) {
  app.get("/stats", async () => {
    return getStats();
  });

  app.get("/events", async () => {
    return getLatestEvents();
  });
}
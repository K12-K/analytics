import { FastifyInstance } from "fastify";
import { getTopPages } from "../services/page.service";

export async function pagesRoute(app: FastifyInstance) {
  app.get("/pages", async () => {
    return getTopPages();
  });
}
import { FastifyInstance } from "fastify";
import { getCountryStats } from "../services/country.service";

export async function countriesRoute(app: FastifyInstance) {
  app.get("/countries", async () => {
    return getCountryStats();
  });
}
import { db, sessions } from "@analytics/db";
import { sql, desc } from "drizzle-orm";

export async function getCountryStats() {
  return db
    .select({
      country: sessions.country,
      count: sql<number>`count(*)`,
    })
    .from(sessions)
    .groupBy(sessions.country)
    .orderBy(desc(sql`count(*)`));
}
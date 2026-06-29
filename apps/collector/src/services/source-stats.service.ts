import { db, events } from "@analytics/db";
import { sql, desc } from "drizzle-orm";

export async function getSourceStats() {
  return db
    .select({
      source: events.source,
      count: sql<number>`count(*)`,
    })
    .from(events)
    .groupBy(events.source)
    .orderBy(desc(sql`count(*)`));
}
import { db, events } from "@analytics/db";
import { eq, sql, desc } from "drizzle-orm";

export async function getTopPages() {
  return db
    .select({
      path: events.path,
      count: sql<number>`count(*)`,
    })
    .from(events)
    .where(eq(events.eventType, "pageview"))
    .groupBy(events.path)
    .orderBy(desc(sql`count(*)`))
    .limit(10);
}
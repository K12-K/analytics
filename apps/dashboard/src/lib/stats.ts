import { db, visitors, sessions, events } from "@analytics/db";
import { count, desc } from "drizzle-orm";

export async function getOverviewStats() {
  const [visitorCount] = await db
    .select({ count: count() })
    .from(visitors);

  const [sessionCount] = await db
    .select({ count: count() })
    .from(sessions);

  const [eventCount] = await db
    .select({ count: count() })
    .from(events);

  return {
    visitors: visitorCount.count,
    sessions: sessionCount.count,
    events: eventCount.count,
  };
}

export async function getRecentEvents() {
  return db
    .select()
    .from(events)
    .orderBy(desc(events.createdAt))
    .limit(10);
}
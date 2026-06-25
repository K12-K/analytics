import { db, visitors, sessions, events } from "@analytics/db";
import { count, desc } from "drizzle-orm";

export async function getStats() {
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
    visitors: Number(visitorCount.count),
    sessions: Number(sessionCount.count),
    events: Number(eventCount.count),
  };
}

export async function getLatestEvents() {
  return db
    .select()
    .from(events)
    .orderBy(desc(events.createdAt))
    .limit(20);
}
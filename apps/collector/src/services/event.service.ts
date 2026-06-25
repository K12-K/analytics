import { db, events } from "@analytics/db";
import { randomUUID } from "crypto";

type CreateEventInput = {
  siteId: string;
  visitorId: string;
  sessionId: string;
  eventType: string;
  path?: string;
  referrer?: string;
  payload?: Record<string, unknown>;
};

export async function createEvent(input: CreateEventInput) {
  const created = await db
    .insert(events)
    .values({
      id: randomUUID(),
      ...input,
    })
    .returning();

  return created[0];
}
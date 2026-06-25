import { db, sessions } from "@analytics/db";
import { eq } from "drizzle-orm";
import { randomUUID } from "crypto";
import { UAParser } from "ua-parser-js";

export async function findOrCreateSession(
  visitorId: string,
  sessionToken: string,
  userAgent?: string
) {
  const existing = await db
    .select()
    .from(sessions)
    .where(eq(sessions.id, sessionToken))
    .limit(1);

  if (existing[0]) {
    return existing[0];
  }

  const parsed = new UAParser(userAgent).getResult();

  const created = await db
    .insert(sessions)
    .values({
      id: sessionToken || randomUUID(),
      visitorId,
      country: "Unknown",
      city: "Unknown",
      browser: parsed.browser.name || null,
      os: parsed.os.name || null,
      device: parsed.device.type || "desktop",
    })
    .returning();

  return created[0];
}
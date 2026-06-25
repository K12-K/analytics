import { db, sessions } from "@analytics/db";
import { eq } from "drizzle-orm";
import { randomUUID } from "crypto";
import { UAParser } from "ua-parser-js";
import { getGeo } from "./geo.service";

export async function findOrCreateSession(
  visitorId: string,
  sessionToken: string,
  userAgent?: string,
  ip?: string
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
  const geo = ip ? await getGeo(ip) : null;

  const created = await db
    .insert(sessions)
    .values({
      id: sessionToken || randomUUID(),
      visitorId,
      country: geo?.country || "Unknown",
      city: geo?.city || "Unknown",
      browser: parsed.browser.name || null,
      os: parsed.os.name || null,
      device: parsed.device.type || "desktop",
    })
    .returning();

  return created[0];
}
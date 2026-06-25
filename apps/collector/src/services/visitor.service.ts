import { db, visitors } from "@analytics/db";
import { eq, and } from "drizzle-orm";
import { randomUUID } from "crypto";

export async function findOrCreateVisitor(
  siteId: string,
  visitorToken: string
) {
  const existing = await db
    .select()
    .from(visitors)
    .where(
      and(
        eq(visitors.siteId, siteId),
        eq(visitors.visitorToken, visitorToken)
      )
    )
    .limit(1);

  if (existing[0]) {
    return existing[0];
  }

  const created = await db
    .insert(visitors)
    .values({
      id: randomUUID(),
      siteId,
      visitorToken,
    })
    .returning();

  return created[0];
}
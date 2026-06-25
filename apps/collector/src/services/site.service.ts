import { db, sites } from "@analytics/db";
import { eq } from "drizzle-orm";

export async function getSite(siteId: string) {
  const result = await db
    .select()
    .from(sites)
    .where(eq(sites.id, siteId))
    .limit(1);

  return result[0] ?? null;
}
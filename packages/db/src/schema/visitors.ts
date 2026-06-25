import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";
import { sites } from "./sites";

export const visitors = pgTable("visitors", {
  id: uuid("id").primaryKey(),
  siteId: uuid("site_id")
    .references(() => sites.id)
    .notNull(),
  visitorToken: text("visitor_token").notNull(),
  firstSeen: timestamp("first_seen").defaultNow().notNull(),
  lastSeen: timestamp("last_seen").defaultNow().notNull(),
});
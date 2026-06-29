import {
  pgTable,
  uuid,
  text,
  timestamp,
  jsonb,
} from "drizzle-orm/pg-core";
import { sites } from "./sites";
import { visitors } from "./visitors";
import { sessions } from "./sessions";

export const events = pgTable("events", {
  id: uuid("id").primaryKey(),
  siteId: uuid("site_id")
    .references(() => sites.id)
    .notNull(),
  visitorId: uuid("visitor_id")
    .references(() => visitors.id)
    .notNull(),
  sessionId: uuid("session_id")
    .references(() => sessions.id)
    .notNull(),
  eventType: text("event_type").notNull(),
  source: text("source"),
  path: text("path"),
  referrer: text("referrer"),
  payload: jsonb("payload"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
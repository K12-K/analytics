import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";
import { visitors } from "./visitors";

export const sessions = pgTable("sessions", {
  id: uuid("id").primaryKey(),
  visitorId: uuid("visitor_id")
    .references(() => visitors.id)
    .notNull(),
  startedAt: timestamp("started_at").defaultNow().notNull(),
  endedAt: timestamp("ended_at"),
  country: text("country"),
  city: text("city"),
  browser: text("browser"),
  os: text("os"),
  device: text("device"),
});
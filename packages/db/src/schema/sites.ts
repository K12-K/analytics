import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";

export const sites = pgTable("sites", {
  id: uuid("id").primaryKey(),
  name: text("name").notNull(),
  domain: text("domain").notNull(),
  apiKey: text("api_key").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
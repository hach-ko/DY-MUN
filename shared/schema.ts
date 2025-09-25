import { sql } from "drizzle-orm";
import { pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Committee Types (Static data for now)
export interface Committee {
  name: string;
  subtitle: string;
  topic: string;
  chair: string;
  level: string;
  img: string;
  overview?: string;
  resources?: string[];
}

export interface CommitteeGroup {
  title: string;
  color: string;
  badge: string;
  committees: Committee[];
}

// Contact Types
export interface ContactPerson {
  name: string;
  position: string;
  phone?: string;
  email?: string;
  type: 'secretariat' | 'organizing' | 'main';
}

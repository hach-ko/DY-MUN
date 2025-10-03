import { sql } from "drizzle-orm";
import { pgTable, text, varchar, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  idNumber: text("id_number").notNull().unique(),
  gmail: text("gmail").notNull().unique(),
  password: text("password").notNull(),
  committee: text("committee").notNull(),
  institution: text("institution").notNull(),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const forumDoubts = pgTable("forum_doubts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  committeeName: text("committee_name").notNull(),
  question: text("question").notNull(),
  response: text("response"),
  isApproved: boolean("is_approved").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertForumDoubtSchema = createInsertSchema(forumDoubts).omit({
  id: true,
  createdAt: true,
});

export type InsertForumDoubt = z.infer<typeof insertForumDoubtSchema>;
export type ForumDoubt = typeof forumDoubts.$inferSelect;

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
  floor?: string;
  location?: string;
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

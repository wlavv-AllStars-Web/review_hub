import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const reviews = pgTable("reviews", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  reviewText: text("review_text").notNull(),
  rating: integer("rating").notNull(),
  files: jsonb("files").$type<string[]>().default([]),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// New table for Trustpilot review invitations
export const trustpilotInvitations = pgTable("trustpilot_invitations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  customerName: text("customer_name").notNull(),
  customerEmail: text("customer_email").notNull(),
  referenceId: text("reference_id"), // Optional order/service reference
  invitationUrl: text("invitation_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertReviewSchema = createInsertSchema(reviews).pick({
  reviewText: true,
  rating: true,
  files: true,
}).extend({
  rating: z.number().min(1).max(5),
  reviewText: z.string().min(1).max(5000),
  files: z.array(z.string()).optional(),
});

// Schema for Trustpilot invitation request
export const trustpilotInvitationSchema = z.object({
  customerName: z.string().min(1, "Name is required"),
  customerEmail: z.string().email("Valid email is required"),
  referenceId: z.string().optional(),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertReview = z.infer<typeof insertReviewSchema>;
export type Review = typeof reviews.$inferSelect;
export type TrustpilotInvitation = z.infer<typeof trustpilotInvitationSchema>;
export type TrustpilotInvitationRecord = typeof trustpilotInvitations.$inferSelect;

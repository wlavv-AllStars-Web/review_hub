import { type User, type InsertUser, type Review, type InsertReview, users, reviews } from "../shared/schema.ts";
import { randomUUID } from "crypto";
import { eq, desc } from "drizzle-orm";
import { withDb } from "./db.ts";
import type { NodePgDatabase } from "drizzle-orm/node-postgres";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createReview(review: InsertReview): Promise<Review>;
  getReviews(): Promise<Review[]>;
  getReview(id: string): Promise<Review | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private reviews: Map<string, Review>;

  constructor() {
    this.users = new Map();
    this.reviews = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createReview(insertReview: InsertReview): Promise<Review> {
    const id = randomUUID();
    const review: Review = {
      ...insertReview,
      id,
      files: insertReview.files || [],
      createdAt: new Date(),
    };
    this.reviews.set(id, review);
    return review;
  }

  async getReviews(): Promise<Review[]> {
    return Array.from(this.reviews.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async getReview(id: string): Promise<Review | undefined> {
    return this.reviews.get(id);
  }
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    try {
      return await withDb(async (db) => {
        const result = await db.select().from(users).where(eq(users.id, id));
        return result[0];
      });
    } catch (error) {
      console.error("Database error in getUser:", error);
      throw new Error(`Database connection failed: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return await withDb(async (db) => {
      const result = await db.select().from(users).where(eq(users.username, username));
      return result[0];
    });
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    return await withDb(async (db) => {
      const result = await db.insert(users).values(insertUser).returning();
      return result[0];
    });
  }

  async createReview(insertReview: InsertReview): Promise<Review> {
    return await withDb(async (db) => {
      const result = await db.insert(reviews).values(insertReview).returning();
      return result[0];
    });
  }

  async getReviews(): Promise<Review[]> {
    return await withDb(async (db) => {
      const result = await db.select().from(reviews).orderBy(desc(reviews.createdAt));
      return result;
    });
  }

  async getReview(id: string): Promise<Review | undefined> {
    return await withDb(async (db) => {
      const result = await db.select().from(reviews).where(eq(reviews.id, id));
      return result[0];
    });
  }
}

// Use database storage for persistence
export const storage = new DatabaseStorage();

import { type User, type InsertUser, type ForumDoubt, type InsertForumDoubt } from "@shared/schema";
import { randomUUID } from "crypto";
import bcrypt from "bcrypt";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByGmail(gmail: string): Promise<User | undefined>;
  getUserByIdNumber(idNumber: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Forum doubts
  createForumDoubt(doubt: InsertForumDoubt): Promise<ForumDoubt>;
  getForumDoubtsByCommittee(committeeName: string): Promise<ForumDoubt[]>;
  getForumDoubtsByUser(userId: string): Promise<ForumDoubt[]>;
  updateForumDoubt(id: string, updates: Partial<ForumDoubt>): Promise<ForumDoubt | undefined>;
  getAllForumDoubts(): Promise<ForumDoubt[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private forumDoubts: Map<string, ForumDoubt>;

  constructor() {
    this.users = new Map();
    this.forumDoubts = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByGmail(gmail: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.gmail === gmail,
    );
  }

  async getUserByIdNumber(idNumber: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.idNumber === idNumber,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const hashedPassword = await bcrypt.hash(insertUser.password, 10);
    const user: User = { ...insertUser, password: hashedPassword, id };
    this.users.set(id, user);
    return user;
  }

  async createForumDoubt(insertDoubt: InsertForumDoubt): Promise<ForumDoubt> {
    const id = randomUUID();
    const doubt: ForumDoubt = {
      ...insertDoubt,
      response: insertDoubt.response ?? null,
      isApproved: insertDoubt.isApproved ?? false,
      id,
      createdAt: new Date(),
    };
    this.forumDoubts.set(id, doubt);
    return doubt;
  }

  async getForumDoubtsByCommittee(committeeName: string): Promise<ForumDoubt[]> {
    return Array.from(this.forumDoubts.values()).filter(
      (doubt) => doubt.committeeName === committeeName,
    );
  }

  async getForumDoubtsByUser(userId: string): Promise<ForumDoubt[]> {
    return Array.from(this.forumDoubts.values()).filter(
      (doubt) => doubt.userId === userId,
    );
  }

  async updateForumDoubt(id: string, updates: Partial<ForumDoubt>): Promise<ForumDoubt | undefined> {
    const doubt = this.forumDoubts.get(id);
    if (!doubt) return undefined;
    
    const updatedDoubt = { ...doubt, ...updates };
    this.forumDoubts.set(id, updatedDoubt);
    return updatedDoubt;
  }

  async getAllForumDoubts(): Promise<ForumDoubt[]> {
    return Array.from(this.forumDoubts.values());
  }
}

export const storage = new MemStorage();

import { type User, type InsertUser, type ForumDoubt, type InsertForumDoubt } from "@shared/schema";
import { randomUUID } from "crypto";
import bcrypt from "bcrypt";
import fs from "fs/promises";
import path from "path";

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
  private doubtsFilePath: string;
  private writeQueue: Promise<any> = Promise.resolve();
  private initialized: Promise<void>;

  constructor() {
    this.users = new Map();
    this.doubtsFilePath = path.join(process.cwd(), "data", "forumDoubts.json");
    this.seedUsers();
    this.initialized = this.initializeStorage();
  }

  private async initializeStorage() {
    try {
      await fs.mkdir(path.dirname(this.doubtsFilePath), { recursive: true });
      try {
        await fs.access(this.doubtsFilePath);
        const content = await fs.readFile(this.doubtsFilePath, "utf-8");
        JSON.parse(content);
      } catch (error) {
        try {
          const content = await fs.readFile(this.doubtsFilePath, "utf-8");
          if (content && content.trim() !== "") {
            const backupPath = `${this.doubtsFilePath}.backup-${Date.now()}`;
            await fs.writeFile(backupPath, content, "utf-8");
            console.error(`Corrupted JSON file backed up to ${backupPath}`);
          }
        } catch {}
        await fs.writeFile(this.doubtsFilePath, "[]", "utf-8");
      }
    } catch (error) {
      console.error("Failed to initialize storage:", error);
      throw error;
    }
  }

  private async readDoubtsFromFile(): Promise<ForumDoubt[]> {
    await this.initialized;
    try {
      const data = await fs.readFile(this.doubtsFilePath, "utf-8");
      const doubts = JSON.parse(data);
      return doubts.map((doubt: any) => ({
        ...doubt,
        createdAt: new Date(doubt.createdAt),
      }));
    } catch (error) {
      console.error("Failed to read doubts from file:", error);
      try {
        const content = await fs.readFile(this.doubtsFilePath, "utf-8");
        if (content && content.trim() !== "") {
          const backupPath = `${this.doubtsFilePath}.backup-${Date.now()}`;
          await fs.writeFile(backupPath, content, "utf-8");
          console.error(`Corrupted JSON file backed up to ${backupPath}`);
        }
      } catch {}
      return [];
    }
  }


  private async seedUsers() {
    const committees = ["Harry Potter", "Disney", "FIFA", "CTC", "UNHRC", "UNSC", "SPECPOL", "IAEA"];
    const institutions = ["Delhi Public School", "Modern School", "The Shri Ram School", "Sanskriti School", "Amity International"];
    
    const placeholderUsers = [
      { idNumber: "DY001", gmail: "delegate1@example.com", password: "password123", committee: committees[0], institution: institutions[0] },
      { idNumber: "DY002", gmail: "delegate2@example.com", password: "password123", committee: committees[1], institution: institutions[1] },
      { idNumber: "DY003", gmail: "delegate3@example.com", password: "password123", committee: committees[2], institution: institutions[2] },
      { idNumber: "DY004", gmail: "delegate4@example.com", password: "password123", committee: committees[3], institution: institutions[3] },
      { idNumber: "DY005", gmail: "delegate5@example.com", password: "password123", committee: committees[4], institution: institutions[4] },
      { idNumber: "DY006", gmail: "delegate6@example.com", password: "password123", committee: committees[5], institution: institutions[0] },
      { idNumber: "DY007", gmail: "delegate7@example.com", password: "password123", committee: committees[6], institution: institutions[1] },
      { idNumber: "DY008", gmail: "delegate8@example.com", password: "password123", committee: committees[7], institution: institutions[2] },
      { idNumber: "DY009", gmail: "delegate9@example.com", password: "password123", committee: committees[0], institution: institutions[3] },
      { idNumber: "DY010", gmail: "delegate10@example.com", password: "password123", committee: committees[1], institution: institutions[4] },
    ];

    for (const userData of placeholderUsers) {
      await this.createUser(userData);
    }
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
    await this.initialized;
    const operation = async (): Promise<ForumDoubt> => {
      const doubts = await this.readDoubtsFromFile();
      const id = randomUUID();
      const doubt: ForumDoubt = {
        ...insertDoubt,
        response: insertDoubt.response ?? null,
        isApproved: insertDoubt.isApproved ?? false,
        id,
        createdAt: new Date(),
      };
      doubts.push(doubt);
      await this.writeDoubtsToFileInternal(doubts);
      return doubt;
    };
    this.writeQueue = this.writeQueue.then(operation, operation);
    return await this.writeQueue;
  }

  private async writeDoubtsToFileInternal(doubts: ForumDoubt[]): Promise<void> {
    try {
      const tempPath = `${this.doubtsFilePath}.tmp`;
      await fs.writeFile(tempPath, JSON.stringify(doubts, null, 2), "utf-8");
      await fs.rename(tempPath, this.doubtsFilePath);
    } catch (error) {
      console.error("Failed to write doubts to file:", error);
      throw error;
    }
  }

  async getForumDoubtsByCommittee(committeeName: string): Promise<ForumDoubt[]> {
    const doubts = await this.readDoubtsFromFile();
    return doubts.filter((doubt) => doubt.committeeName === committeeName && doubt.isApproved);
  }

  async getForumDoubtsByUser(userId: string): Promise<ForumDoubt[]> {
    const doubts = await this.readDoubtsFromFile();
    return doubts.filter((doubt) => doubt.userId === userId);
  }

  async updateForumDoubt(id: string, updates: Partial<ForumDoubt>): Promise<ForumDoubt | undefined> {
    await this.initialized;
    const operation = async (): Promise<ForumDoubt | undefined> => {
      const doubts = await this.readDoubtsFromFile();
      const index = doubts.findIndex((doubt) => doubt.id === id);
      if (index === -1) return undefined;
      
      const updatedDoubt = { ...doubts[index], ...updates };
      doubts[index] = updatedDoubt;
      await this.writeDoubtsToFileInternal(doubts);
      return updatedDoubt;
    };
    this.writeQueue = this.writeQueue.then(operation, operation);
    return await this.writeQueue;
  }

  async getAllForumDoubts(): Promise<ForumDoubt[]> {
    return await this.readDoubtsFromFile();
  }
}

export const storage = new MemStorage();

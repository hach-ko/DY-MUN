import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertForumDoubtSchema } from "@shared/schema";
import "./types";

// Authentication middleware
function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (req.session?.userId) {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Login route - simplified with plain text password
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { gmail, password } = req.body;
      
      if (!gmail || !password) {
        return res.status(400).json({ message: "Gmail and password are required" });
      }

      const user = await storage.getUserByGmail(gmail);
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      if (password !== user.password) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      req.session.userId = user.id;
      
      await new Promise<void>((resolve, reject) => {
        req.session.save((err) => {
          if (err) reject(err);
          else resolve();
        });
      });
      
      res.json({ user });
    } catch (error) {
      res.status(500).json({ message: "Login failed" });
    }
  });

  // Get current user - accessible with session or query params
  app.get("/api/auth/me", async (req, res) => {
    try {
      const userId = req.session.userId || req.query.userId;
      const gmail = req.query.gmail;
      
      let user;
      if (userId) {
        user = await storage.getUser(userId as string);
      } else if (gmail) {
        user = await storage.getUserByGmail(gmail as string);
      } else {
        return res.status(400).json({ message: "Please provide userId or gmail parameter, or login first" });
      }
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json({ user });
    } catch (error) {
      res.status(500).json({ message: "Failed to get user" });
    }
  });

  // Logout route
  app.post("/api/auth/logout", (req, res) => {
    req.session.destroy((err: Error | null) => {
      if (err) {
        return res.status(500).json({ message: "Logout failed" });
      }
      res.json({ message: "Logged out successfully" });
    });
  });

  // Easy access routes - get user data from JSON file
  app.get("/api/users", async (req, res) => {
    try {
      const fs = await import("fs/promises");
      const path = await import("path");
      const usersFilePath = path.default.join(process.cwd(), "data", "users.json");
      const data = await fs.default.readFile(usersFilePath, "utf-8");
      const users = JSON.parse(data);
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: "Failed to read users data" });
    }
  });

  app.get("/api/users/:id", async (req, res) => {
    try {
      const user = await storage.getUser(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Failed to get user" });
    }
  });

  app.get("/api/users/by-gmail/:gmail", async (req, res) => {
    try {
      const user = await storage.getUserByGmail(req.params.gmail);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Failed to get user" });
    }
  });

  app.get("/api/users/by-id-number/:idNumber", async (req, res) => {
    try {
      const user = await storage.getUserByIdNumber(req.params.idNumber);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Failed to get user" });
    }
  });

  // Forum routes - no auth required
  app.post("/api/forum/doubts", async (req, res) => {
    try {
      const dataWithUserId = {
        ...req.body,
        userId: req.session.userId || req.body.userId,
      };
      const validatedData = insertForumDoubtSchema.parse(dataWithUserId);
      const doubt = await storage.createForumDoubt(validatedData);
      res.json(doubt);
    } catch (error) {
      res.status(400).json({ message: "Failed to create doubt" });
    }
  });

  app.get("/api/forum/doubts/:committee", async (req, res) => {
    try {
      const { committee } = req.params;
      const doubts = await storage.getForumDoubtsByCommittee(committee);
      const approvedDoubts = doubts.filter(d => d.isApproved);
      res.json(approvedDoubts);
    } catch (error) {
      res.status(500).json({ message: "Failed to get doubts" });
    }
  });

  app.get("/api/forum/doubts/user/me", async (req, res) => {
    try {
      const userId = req.session.userId || req.query.userId;
      if (!userId) {
        return res.status(400).json({ message: "User ID required (login or provide ?userId=)" });
      }
      const doubts = await storage.getForumDoubtsByUser(userId as string);
      res.json(doubts);
    } catch (error) {
      res.status(500).json({ message: "Failed to get user doubts" });
    }
  });

  app.get("/api/forum/doubts/user/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      const doubts = await storage.getForumDoubtsByUser(userId);
      res.json(doubts);
    } catch (error) {
      res.status(500).json({ message: "Failed to get user doubts" });
    }
  });

  app.patch("/api/forum/doubts/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const updated = await storage.updateForumDoubt(id, req.body);
      if (!updated) {
        return res.status(404).json({ message: "Doubt not found" });
      }
      res.json(updated);
    } catch (error) {
      res.status(500).json({ message: "Failed to update doubt" });
    }
  });

  app.get("/api/forum/doubts", async (req, res) => {
    try {
      const doubts = await storage.getAllForumDoubts();
      res.json(doubts);
    } catch (error) {
      res.status(500).json({ message: "Failed to get all doubts" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}

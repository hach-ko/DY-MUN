import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import bcrypt from "bcrypt";
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
  // Login route
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { gmail, password } = req.body;
      
      console.log("Login attempt for:", gmail);
      
      if (!gmail || !password) {
        return res.status(400).json({ message: "Gmail and password are required" });
      }

      const user = await storage.getUserByGmail(gmail);
      console.log("User found:", user ? "Yes" : "No");
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const isValid = await bcrypt.compare(password, user.password);
      console.log("Password valid:", isValid);
      if (!isValid) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      req.session.userId = user.id;
      
      const { password: _, ...userWithoutPassword } = user;
      res.json({ user: userWithoutPassword });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Login failed" });
    }
  });

  // Get current user
  app.get("/api/auth/me", requireAuth, async (req, res) => {
    try {
      const user = await storage.getUser(req.session.userId!);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const { password: _, ...userWithoutPassword } = user;
      res.json({ user: userWithoutPassword });
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

  // Forum routes
  app.post("/api/forum/doubts", requireAuth, async (req, res) => {
    try {
      const dataWithUserId = {
        ...req.body,
        userId: req.session.userId!,
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

  app.get("/api/forum/doubts/user/me", requireAuth, async (req, res) => {
    try {
      const doubts = await storage.getForumDoubtsByUser(req.session.userId!);
      res.json(doubts);
    } catch (error) {
      res.status(500).json({ message: "Failed to get user doubts" });
    }
  });

  app.patch("/api/forum/doubts/:id", requireAuth, async (req, res) => {
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

  const httpServer = createServer(app);

  return httpServer;
}

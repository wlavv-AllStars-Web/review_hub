import express from "express";
import type { Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage.ts";
import { insertReviewSchema, trustpilotInvitationSchema } from "../shared/schema.ts";
import { generateTrustpilotInvitation } from "./trustpilot.ts";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Health check endpoint
  app.get("/api/health", (_req, res) => {
    res.json({ 
      status: "ok", 
      message: "Server is running",
      timestamp: new Date().toISOString()
    });
  });

  // Create a review
  app.post("/api/reviews", async (req, res) => {
    try {
      console.log("Review submission request body:", req.body);
      const validatedData = insertReviewSchema.parse(req.body);
      console.log("Validated data:", validatedData);
      const review = await storage.createReview(validatedData);
      console.log("Created review:", review);
      res.json(review);
    } catch (error) {
      console.error("Error creating review:", error);
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          message: "Validation error", 
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          message: "Failed to create review",
          error: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });

  // Get all reviews
  app.get("/api/reviews", async (req, res) => {
    try {
      console.log("Attempting to fetch reviews from database...");
      const reviews = await storage.getReviews();
      console.log("Successfully fetched reviews:", reviews.length, "reviews");
      res.json(reviews);
    } catch (error) {
      console.error("Detailed error fetching reviews:", error);
      res.status(500).json({ 
        message: "Failed to fetch reviews",
        error: error instanceof Error ? error.message : String(error)
      });
    }
  });

  // Get a specific review
  app.get("/api/reviews/:id", async (req, res) => {
    try {
      const review = await storage.getReview(req.params.id);
      if (!review) {
        res.status(404).json({ message: "Review not found" });
        return;
      }
      res.json(review);
    } catch (error) {
      res.status(500).json({ 
        message: "Failed to fetch review" 
      });
    }
  });

  // Generate Trustpilot invitation
  app.post("/api/trustpilot/invitation", async (req, res) => {
    try {
      console.log("Trustpilot invitation request:", req.body);
      const validatedData = trustpilotInvitationSchema.parse(req.body);
      console.log("Validated Trustpilot data:", validatedData);
      
      // Generate Trustpilot invitation URL
      const invitation = await generateTrustpilotInvitation(validatedData);
      console.log("Generated Trustpilot invitation:", invitation);
      
      // Store the invitation record for tracking
      const invitationRecord = {
        customerName: validatedData.customerName,
        customerEmail: validatedData.customerEmail,
        referenceId: validatedData.referenceId || null,
        invitationUrl: invitation.invitationUrl,
      };
      
      // Note: You could store this in the database for tracking
      // await storage.createTrustpilotInvitation(invitationRecord);
      
      res.json({
        success: invitation.success,
        invitationUrl: invitation.invitationUrl,
        message: invitation.message,
      });
    } catch (error) {
      console.error("Error generating Trustpilot invitation:", error);
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          message: "Validation error", 
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          message: "Failed to generate Trustpilot invitation",
          error: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });

  // Initialize storage bucket (create if not exists)
  app.post("/api/storage/init", async (req, res) => {
    try {
      console.log("Storage initialization request from client");
      
      // For now, return an error that suggests manual bucket creation
      // This could be improved by using a service role key if available
      res.status(400).json({
        success: false,
        error: "Storage bucket 'review-files' does not exist. Please create this bucket manually in your Supabase dashboard with public access enabled, or contact your administrator.",
        suggestion: "Go to your Supabase project > Storage > Create bucket named 'review-files' with public access"
      });
    } catch (error) {
      console.error("Error in storage initialization:", error);
      res.status(500).json({
        success: false,
        error: "Failed to initialize storage"
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

-- All-Stars Motorsport Database Schema
-- Run this SQL in your PostgreSQL database before deploying

-- Create reviews table
CREATE TABLE IF NOT EXISTS reviews (
    id VARCHAR(255) PRIMARY KEY DEFAULT gen_random_uuid()::text,
    review_text TEXT NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    files JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_reviews_created_at ON reviews(created_at DESC);

-- Optional: Create users table if you need authentication in the future
-- CREATE TABLE IF NOT EXISTS users (
--     id VARCHAR(255) PRIMARY KEY DEFAULT gen_random_uuid()::text,
--     username TEXT NOT NULL UNIQUE,
--     password TEXT NOT NULL
-- );

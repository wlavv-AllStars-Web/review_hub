# Review Application

## Overview

This is a full-stack review application built with React frontend and Express.js backend. The application allows users to submit reviews with text content, star ratings (1-5), and file attachments (images/videos). It features a modern UI built with shadcn/ui components and TailwindCSS, with real-time data management using TanStack Query.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite build system
- **UI Components**: shadcn/ui component library with Radix UI primitives
- **Styling**: TailwindCSS with custom CSS variables for theming
- **State Management**: TanStack Query for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Form Handling**: React Hook Form with Zod validation resolvers

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API with JSON responses
- **Validation**: Zod schemas for request/response validation
- **Storage**: Dual storage implementation (memory and database)
- **Development**: Hot module replacement with Vite integration

### Data Storage Solutions
- **Database**: PostgreSQL with Drizzle ORM
- **Connection**: Neon serverless PostgreSQL driver
- **Schema Management**: Drizzle Kit for migrations and schema changes
- **File Storage**: Supabase Storage for user-uploaded files (images/videos)
- **Session Storage**: PostgreSQL-backed sessions with connect-pg-simple

### Database Schema
- **Users Table**: ID, username, password fields
- **Reviews Table**: ID, review text, rating (1-5), file URLs array, timestamps
- **Shared Types**: TypeScript types generated from Drizzle schema

### Authentication and Authorization
- **Session-based**: Cookie-based sessions stored in PostgreSQL
- **Validation**: Zod schemas for input validation
- **Security**: Environment-based database URL configuration

### File Management
- **Upload Processing**: Browser-based image compression before upload
- **Storage**: Supabase Storage with public bucket for review files
- **Supported Formats**: Images and videos with size limits
- **Optimization**: Automatic image compression to 1MB max, 1920px max dimension

## External Dependencies

### Core Infrastructure
- **Neon**: Serverless PostgreSQL database hosting
- **Supabase**: File storage and management service

### Backend Dependencies
- **Express.js**: Web application framework
- **Drizzle ORM**: Type-safe database ORM with PostgreSQL dialect
- **Zod**: Runtime type validation and schema definition
- **connect-pg-simple**: PostgreSQL session store for Express

### Frontend Dependencies
- **React**: UI framework with hooks and context
- **TanStack Query**: Data fetching and caching library
- **Wouter**: Lightweight routing library
- **shadcn/ui**: Component library built on Radix UI primitives
- **TailwindCSS**: Utility-first CSS framework
- **React Hook Form**: Form state management and validation
- **browser-image-compression**: Client-side image optimization

### Development Tools
- **Vite**: Build tool and development server
- **TypeScript**: Static type checking and enhanced developer experience
- **Replit Integration**: Development environment plugins for runtime error handling
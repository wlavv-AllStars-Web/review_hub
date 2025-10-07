# Local Development Setup test


## Prerequisites
- Node.js 18+ installed
- PostgreSQL database (local or cloud like Neon/Supabase)
- Supabase account (for file uploads)

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the root directory:

```env
# Database Configuration
DATABASE_URL=postgresql://user:password@localhost:5432/dbname

# Supabase Configuration (for file uploads)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here

# Session Secret (generate a random string)
SESSION_SECRET=your-secret-key-at-least-32-characters-long

# Node Environment
NODE_ENV=development
```

### 3. Push Database Schema
```bash
npm run db:push
```

### 4. Run Development Server
```bash
npm run dev
```

The app will be available at `http://localhost:5000`

## Building for Production

### Build the Application
```bash
npm run build
```

This creates:
- `dist/public/` - Frontend files (HTML, CSS, JS)
- `dist/index.js` - Backend server

### Run Production Server
```bash
npm start
```

## Deploying to cPanel

### 1. Build Locally
```bash
npm install
npm run build
```

### 2. Upload to cPanel
Upload these folders/files:
- ✅ `dist/` folder
- ✅ `node_modules/` folder (or run `npm install --production` on server)
- ✅ `server/` folder
- ✅ `shared/` folder
- ✅ `package.json`

### 3. Configure cPanel
**Environment Variables** (in Node.js app settings):
```
NODE_ENV=production
DATABASE_URL=your_postgresql_url
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_key
SESSION_SECRET=your_secret_key
```

**Application Startup File**: `dist/index.js`

### 4. Start the App
The app should now be running on your cPanel domain!

## Troubleshooting

### Build fails with "Out of Memory"
- Build on your local computer instead
- Upload the `dist` folder to your server
- Don't build on low-memory shared hosting

### Missing environment variables
- Check that all variables in `.env` are set correctly
- On cPanel, verify environment variables in Node.js app settings

### Database connection errors
- Verify DATABASE_URL is correct
- Ensure PostgreSQL is accessible from your server
- Run `npm run db:push` to sync schema

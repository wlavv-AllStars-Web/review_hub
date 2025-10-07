# Setup Guide

## Required Environment Variables

You only need **4 environment variables** total:

```env
# 1. Database (use your Supabase PostgreSQL connection)
DATABASE_URL=postgresql://postgres.xxxxx:password@aws-x-xx-xxxx-x.pooler.supabase.com:5432/postgres

# 2. Supabase URL (for file uploads)
VITE_SUPABASE_URL=https://xxxxx.supabase.co

# 3. Supabase Anon Key (for file uploads)
VITE_SUPABASE_ANON_KEY=eyJhbGci...

# 4. Session Secret (any random string, 32+ characters)
SESSION_SECRET=your-random-secret-here

# Optional: Set to 'production' for deployment
NODE_ENV=development
```

---

## Local Development (Your Computer)

### Step 1: Clone/Download Project
Download the project from Replit or clone the repository.

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Create .env File
Create a `.env` file in the root folder:

```env
DATABASE_URL=postgresql://postgres.xxxxx:password@aws-x-xx-xxxx-x.pooler.supabase.com:5432/postgres
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGci...
SESSION_SECRET=any-random-string-at-least-32-chars
NODE_ENV=development
```

**Get your Supabase credentials:**
1. Go to https://supabase.com/dashboard
2. Select your project
3. Go to **Settings** → **Database** → Copy the **Connection String (Pooler)**
4. Go to **Settings** → **API** → Copy the **URL** and **anon public key**

### Step 4: Setup Database Schema
```bash
npm run db:push
```

### Step 5: Create Supabase Storage Bucket
1. Go to **Storage** in Supabase dashboard
2. Create a new bucket named: `review-files`
3. Make it **public** (uncheck "Restrict access")

### Step 6: Run Development Server
```bash
npm run dev
```

Visit: `http://localhost:5000`

---

## Deploy to cPanel

### Step 1: Build on Your Computer
```bash
npm run build
```

This creates the `dist` folder.

### Step 2: Upload to cPanel
Upload these files/folders:
- ✅ `dist/` (entire folder with `index.js` and `public/` inside)
- ✅ `node_modules/` (or run `npm install --production` on server)
- ✅ `package.json`

### Step 3: Configure cPanel

**Node.js Application Settings:**

**Application Startup File**: `dist/index.js`

**Environment Variables:**
```
DATABASE_URL = postgresql://postgres.xxxxx:password@aws-x-xx-xxxx-x.pooler.supabase.com:5432/postgres
VITE_SUPABASE_URL = https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY = eyJhbGci...
SESSION_SECRET = your-random-secret-here
NODE_ENV = production
```

**Important:** 
- ✅ `NODE_ENV` must be exactly `production` (not "developement")
- ✅ Use your actual Supabase values

### Step 4: Start the App
Click **"Restart"** in cPanel Node.js interface.

### Step 5: Verify It's Working
Visit: `https://yourdomain.com/api/health`

Should show:
```json
{"status":"ok","message":"Server is running"}
```

---

## Troubleshooting

### Local Development Issues

**Error: "Cannot connect to database"**
- Check your `DATABASE_URL` is correct
- Make sure you can access Supabase from your network

**Error: "Module not found"**
- Run `npm install` again
- Delete `node_modules` and run `npm install`

**Port 5000 already in use**
- Stop other apps using port 5000
- Or change the port in `server/index.ts`

### cPanel Deployment Issues

**404 on API calls**
- ✅ Check `NODE_ENV=production` (not "developement")
- ✅ Verify startup file is `dist/index.js`
- ✅ Make sure the app is "Running" (green status)

**WebAssembly memory error**
- ✅ Make sure you uploaded the NEW `dist` folder (13.1kb index.js)
- ✅ The new build doesn't use WebAssembly

**App won't start**
- Check application logs in cPanel
- Verify all environment variables are set
- Make sure `dist/index.js` file exists

---

## Clean Environment Variables Summary

**Remove these (not needed anymore):**
- ❌ PGDATABASE
- ❌ PGHOST
- ❌ PGPASSWORD
- ❌ PGPORT
- ❌ PGUSER
- ❌ SUPABASE_DATABASE_URL (use DATABASE_URL instead)

**Keep only these:**
- ✅ DATABASE_URL (Supabase PostgreSQL connection)
- ✅ VITE_SUPABASE_URL
- ✅ VITE_SUPABASE_ANON_KEY
- ✅ SESSION_SECRET
- ✅ NODE_ENV (development or production)

**That's it! Just 5 variables total.**

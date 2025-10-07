# cPanel Deployment Guide

## Required Files to Upload

Upload these **exact files and folders** to your cPanel server:

```
your-app-folder/
├── dist/
│   ├── index.js          ← Backend server (START FILE)
│   └── public/           ← Frontend files (HTML/CSS/JS)
│       ├── index.html
│       └── assets/
├── node_modules/         ← All dependencies
├── package.json          ← Required for npm start
└── .env                  ← Your environment variables
```

## Step-by-Step Deployment

### 1. Build on Your Local Computer
```bash
# In your project folder
npm install
npm run build
```

### 2. Upload to cPanel
Use FTP or cPanel File Manager to upload:
- ✅ `dist/` folder (contains `index.js` AND `public/` subfolder)
- ✅ `node_modules/` folder
- ✅ `package.json`

### 3. Create .env File on cPanel
Create a `.env` file in your app root folder with:

```env
NODE_ENV=production
DATABASE_URL=postgresql://user:password@host:5432/database
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=your-key-here
SESSION_SECRET=your-random-secret-at-least-32-chars
PORT=5000
```

### 4. Configure Node.js Application in cPanel

**Application Root**: `/home/username/your-app-folder`

**Application Startup File**: `dist/index.js`

**Environment Variables**: (set in cPanel UI)
- `NODE_ENV` = `production`
- `DATABASE_URL` = `your_postgresql_connection_string`
- `VITE_SUPABASE_URL` = `your_supabase_url`
- `VITE_SUPABASE_ANON_KEY` = `your_supabase_key`
- `SESSION_SECRET` = `your_secret_key`

**Application Mode**: Production

### 5. Start the Application
Click "Start" in cPanel Node.js interface, or run:
```bash
npm start
```

## Troubleshooting 404 Errors

### Error: "Cannot POST /api/trustpilot/invitation"

This usually means one of these issues:

#### ✅ Check 1: Is NODE_ENV set to production?
```bash
# Check environment variable
echo $NODE_ENV
# Should output: production
```

If not set, add it to your `.env` file or cPanel environment variables.

#### ✅ Check 2: Is dist/public folder present?
The folder structure must be:
```
dist/
  ├── index.js
  └── public/      ← MUST BE HERE
      ├── index.html
      └── assets/
```

#### ✅ Check 3: Check Application Logs
In cPanel Node.js app section, view the error logs to see:
- "serving on port 5000" (app started)
- Any error messages

#### ✅ Check 4: Verify All Files Uploaded
Make sure you uploaded **both** `dist/index.js` AND `dist/public/` folder.

### Error: "Could not find the build directory"
This means `dist/public` folder is missing. Re-upload the entire `dist` folder.

### Error: "Cannot find module"
This means `node_modules` is missing or incomplete.

Solution:
```bash
# On cPanel via SSH or terminal
cd /home/username/your-app-folder
npm install --production
```

## Verify Deployment

### 1. Check if Backend is Running
Visit: `https://yourdomain.com/api/reviews`

Should return: `[]` (empty array) or list of reviews

### 2. Check if Frontend Loads
Visit: `https://yourdomain.com`

Should show: Your review submission page

### 3. Test Trustpilot Button
Click "Write a Review on Trustpilot" button

Should: Open Trustpilot review page (no 404 error)

## Common cPanel Issues

### Memory Limits (Can't Build)
- ✅ **Solution**: Build locally, upload dist folder
- ❌ **Don't**: Try to run `npm run build` on shared hosting

### Port Already in Use
- Check if another app is using port 5000
- cPanel usually auto-assigns ports, use the one they provide

### Database Connection Fails
- Verify DATABASE_URL is correct
- Check if PostgreSQL is accessible from your hosting
- Use connection pooling for better performance

## Quick Restart
If you need to restart the app:
1. cPanel → Node.js Applications → Click "Restart"
2. Or via SSH: `npm start`

## Updating Your App
When you make code changes:
1. Build locally: `npm run build`
2. Upload new `dist/` folder to cPanel
3. Restart the application

---

**Need Help?**
- Check cPanel error logs
- Verify all environment variables are set
- Ensure `dist/public` folder exists
- Make sure NODE_ENV=production

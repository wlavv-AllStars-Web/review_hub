# Review Application

Simple review submission app with Trustpilot integration and image uploads.

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Environment Variables

Create a `.env` file in the root:

```env
DATABASE_URL=postgresql://postgres.xxxxx:password@aws-x-xx-xxxx-x.pooler.supabase.com:5432/postgres
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
SESSION_SECRET=your-random-secret-32-chars-min
```

### 3. Setup Database
```bash
npm run db:push
```

### 4. Run Development Server
```bash
node dev.js
```

Or on Windows PowerShell:
```powershell
node dev.js
```

Visit: http://localhost:5000

## Production Build

### Build:
```bash
npx vite build
npx esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist
```

### Run:
```bash
node start.js
```

## Deploy to cPanel

1. Build the project locally (see above)
2. Upload `dist/` folder, `node_modules/`, and `package.json`
3. Set environment variables in cPanel:
   - `DATABASE_URL`
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `SESSION_SECRET`
   - `NODE_ENV=production`
4. Set startup file: `dist/index.js`
5. Start the app

## Troubleshooting

**Windows PowerShell errors?**
- Use `node dev.js` instead of `npm run dev`
- Make sure you have a `.env` file

**Can't connect to database?**
- Check your DATABASE_URL in `.env`
- Make sure Supabase is accessible

**Port already in use?**
- Change PORT in `.env` file

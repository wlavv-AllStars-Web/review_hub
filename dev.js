// Simple dev server startup script for cross-platform compatibility
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Set environment variables
process.env.NODE_ENV = 'development';

// Start tsx with .env file support
const child = spawn('npx', ['tsx', '--env-file=.env', 'server/index.ts'], {
  stdio: 'inherit',
  shell: true,
  cwd: __dirname
});

child.on('exit', (code) => {
  process.exit(code || 0);
});

// Simple production server startup script for cross-platform compatibility
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Set environment variables
process.env.NODE_ENV = 'production';

// Start the production server from dist
const child = spawn('node', ['--env-file=.env', 'dist/index.js'], {
  stdio: 'inherit',
  shell: true,
  cwd: __dirname
});

child.on('exit', (code) => {
  process.exit(code || 0);
});

import { spawn } from 'child_process';
import path from 'path';

console.log('================================================================');
console.log('  LAND STACK - Integrated GIS DPI for Land Governance (SIH)');
console.log('================================================================');
console.log('Starting Backend Server (Port 5000) and Frontend (Port 5173)...');

const isWin = process.platform === 'win32';
const npmCmd = isWin ? 'npm.cmd' : 'npm';

// 1. Start Backend
const backend = spawn('node', ['server.js'], {
  cwd: path.resolve('./backend'),
  stdio: 'inherit',
  shell: isWin
});

// 2. Start Frontend
const frontend = spawn(npmCmd, ['run', 'dev'], {
  cwd: path.resolve('./frontend'),
  stdio: 'inherit',
  shell: isWin
});

process.on('SIGINT', () => {
  backend.kill();
  frontend.kill();
  process.exit();
});

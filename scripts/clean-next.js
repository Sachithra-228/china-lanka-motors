const fs = require('fs');
const path = require('path');

const nextDir = path.join(process.cwd(), '.next');

try {
  fs.rmSync(nextDir, { recursive: true, force: true });
  process.stdout.write('Cleared .next cache before starting dev.\n');
} catch (error) {
  process.stderr.write(`Failed to clear .next cache: ${error.message}\n`);
  process.exit(1);
}

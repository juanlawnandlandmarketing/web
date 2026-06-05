const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(process.cwd(), 'data', 'clients.json');
const TMP_FILE = '/tmp/seo-command-center-clients.json';

function readData() {
  // Try /tmp first (persists across warm invocations in production)
  if (fs.existsSync(TMP_FILE)) {
    try {
      return JSON.parse(fs.readFileSync(TMP_FILE, 'utf8'));
    } catch (e) {
      // Fall through to seed file
    }
  }
  // Fall back to bundled seed data
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  } catch (e) {
    return { clients: [] };
  }
}

function writeData(data) {
  const json = JSON.stringify(data, null, 2);
  // Always write to /tmp (writable in production and development)
  fs.writeFileSync(TMP_FILE, json);
  // Also try to update the seed file (works in local dev / vercel dev)
  try {
    fs.writeFileSync(DATA_FILE, json);
  } catch (e) {
    // Ignore in production (read-only /var/task)
  }
}

function generateId(prefix = 'id') {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function corsHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

module.exports = { readData, writeData, generateId, corsHeaders };

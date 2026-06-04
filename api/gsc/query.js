// GSC Proxy — handles service account JWT signing server-side
// Called by n8n KOGA Blog Engine to pull search analytics data
// Auth: x-koga-secret header must match REPORT_API_SECRET env var

const { createSign } = require('crypto');

module.exports = async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-koga-secret');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });

  // Auth check
  const secret = req.headers['x-koga-secret'];
  if (secret !== process.env.REPORT_API_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { site, startDate, endDate, dimensions, rowLimit } = req.body;
  if (!site) return res.status(400).json({ error: 'site is required' });

  const saJson = process.env.GSC_SERVICE_ACCOUNT_JSON;
  if (!saJson) return res.status(500).json({ error: 'GSC_SERVICE_ACCOUNT_JSON not configured' });

  let sa;
  try {
    sa = JSON.parse(saJson);
  } catch (e) {
    return res.status(500).json({ error: 'Invalid GSC_SERVICE_ACCOUNT_JSON' });
  }

  try {
    // Build JWT
    const now = Math.floor(Date.now() / 1000);
    const header = Buffer.from(JSON.stringify({ alg: 'RS256', typ: 'JWT' })).toString('base64url');
    const claims = Buffer.from(JSON.stringify({
      iss: sa.client_email,
      scope: 'https://www.googleapis.com/auth/webmasters.readonly',
      aud: 'https://oauth2.googleapis.com/token',
      exp: now + 3600,
      iat: now
    })).toString('base64url');

    const toSign = `${header}.${claims}`;
    const sign = createSign('RSA-SHA256');
    sign.update(toSign);
    const sig = sign.sign(sa.private_key, 'base64url');
    const jwt = `${toSign}.${sig}`;

    // Exchange for access token
    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
        assertion: jwt
      })
    });
    const tokenData = await tokenRes.json();
    const accessToken = tokenData.access_token;
    if (!accessToken) return res.status(502).json({ error: 'Failed to get GSC token', details: tokenData });

    // Query GSC Search Analytics
    const encodedSite = encodeURIComponent(site);
    const gscRes = await fetch(
      `https://www.googleapis.com/webmasters/v3/sites/${encodedSite}/searchAnalytics/query`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          startDate: startDate || new Date(Date.now() - 90 * 86400000).toISOString().slice(0, 10),
          endDate: endDate || new Date().toISOString().slice(0, 10),
          dimensions: dimensions || ['query', 'page'],
          rowLimit: rowLimit || 100
        })
      }
    );

    if (gscRes.status === 403) {
      // Property not yet added — return empty gracefully
      return res.status(200).json({ rows: [], note: `Service account not yet added to GSC for ${site}` });
    }

    const gscData = await gscRes.json();
    return res.status(200).json(gscData);

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

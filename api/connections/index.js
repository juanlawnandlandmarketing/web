const { corsHeaders } = require('../lib/data');
const { getConnectionStatus } = require('../lib/dataforseo');

module.exports = async function handler(req, res) {
  corsHeaders(res);

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const dataforseo = await getConnectionStatus();
  return res.status(200).json({
    dataforseo,
    checked_at: new Date().toISOString(),
  });
};

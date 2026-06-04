const { readData, corsHeaders } = require('../../../lib/data');

module.exports = async function handler(req, res) {
  corsHeaders(res);

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { id, kid } = req.query;
  const data = readData();
  const client = data.clients.find(c => c.id === id);

  if (!client) {
    return res.status(404).json({ error: 'Client not found' });
  }

  const keyword = client.keywords.find(k => k.id === kid);

  if (!keyword) {
    return res.status(404).json({ error: 'Keyword not found' });
  }

  return res.status(200).json({
    keyword: keyword.keyword,
    clientDomain: client.domain,
    checkedAt: keyword.rankings.checkedAt,
    position: keyword.rankings.position,
    serp: keyword.rankings.serp || []
  });
};

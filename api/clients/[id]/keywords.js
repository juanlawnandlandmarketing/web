const { readData, writeData, generateId, corsHeaders } = require('../../../lib/data');

module.exports = async function handler(req, res) {
  corsHeaders(res);

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { id, kid } = req.query;
  const data = readData();
  const clientIndex = data.clients.findIndex(c => c.id === id);

  if (clientIndex === -1) {
    return res.status(404).json({ error: 'Client not found' });
  }

  const client = data.clients[clientIndex];

  // POST — add keywords from service/area combos
  if (req.method === 'POST') {
    const { services, areas } = req.body || {};

    if (!Array.isArray(services) || !Array.isArray(areas) || !services.length || !areas.length) {
      return res.status(400).json({ error: 'services and areas must be non-empty arrays' });
    }

    const newKeywords = [];
    for (const service of services) {
      for (const area of areas) {
        const keyword = `${service.trim()} ${area.trim()}`.toLowerCase();
        // Avoid duplicates
        const exists = client.keywords.some(k => k.keyword === keyword);
        if (!exists) {
          newKeywords.push({
            id: generateId('kw'),
            keyword,
            service: service.trim(),
            area: area.trim(),
            rankings: {
              position: null,
              url: null,
              snippet: null,
              checkedAt: null,
              serp: []
            }
          });
        }
      }
    }

    client.keywords.push(...newKeywords);
    data.clients[clientIndex] = client;
    writeData(data);

    return res.status(201).json({ added: newKeywords.length, keywords: newKeywords });
  }

  // DELETE — remove a keyword by kid query param
  if (req.method === 'DELETE') {
    if (!kid) {
      return res.status(400).json({ error: 'kid query parameter is required' });
    }

    const kwIndex = client.keywords.findIndex(k => k.id === kid);
    if (kwIndex === -1) {
      return res.status(404).json({ error: 'Keyword not found' });
    }

    client.keywords.splice(kwIndex, 1);
    data.clients[clientIndex] = client;
    writeData(data);

    return res.status(200).json({ success: true });
  }

  return res.status(405).json({ error: 'Method not allowed' });
};

const { readData, writeData, generateId, corsHeaders } = require('../lib/data');

module.exports = async function handler(req, res) {
  corsHeaders(res);

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    const data = readData();
    return res.status(200).json(data.clients);
  }

  if (req.method === 'POST') {
    const { name, website, city, state } = req.body || {};

    if (!name || !website || !city || !state) {
      return res.status(400).json({ error: 'name, website, city, and state are required' });
    }

    let domain = website;
    try {
      domain = new URL(website).hostname.replace(/^www\./, '');
    } catch (e) {
      domain = website.replace(/^https?:\/\/(www\.)?/, '').split('/')[0];
    }

    const newClient = {
      id: generateId('client'),
      name,
      website,
      domain,
      city,
      state,
      keywords: [],
      recommendations: []
    };

    const data = readData();
    data.clients.push(newClient);
    writeData(data);

    return res.status(201).json(newClient);
  }

  return res.status(405).json({ error: 'Method not allowed' });
};

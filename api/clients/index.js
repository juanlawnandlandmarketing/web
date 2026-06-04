const { readData, writeData, generateId, corsHeaders } = require('../lib/data');
const { select } = require('../lib/supabase');

function supabaseClientToDashboardClient(client) {
  return {
    id: client.id,
    name: client.client_name,
    website: client.website_url,
    domain: client.domain,
    city: client.domain || 'Lawn & Land',
    state: '',
    keywords: [],
    recommendations: [],
  };
}

module.exports = async function handler(req, res) {
  corsHeaders(res);

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    try {
      const clients = await select('clients', {
        select: 'id,client_name,domain,website_url,status',
        status: 'eq.active',
        order: 'client_name.asc',
      });

      return res.status(200).json(clients.map(supabaseClientToDashboardClient));
    } catch (error) {
      const data = readData();
      return res.status(200).json(data.clients);
    }
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

const { readData, writeData, corsHeaders } = require('../../../lib/data');

module.exports = async function handler(req, res) {
  corsHeaders(res);

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { id } = req.query;
  const data = readData();
  const clientIndex = data.clients.findIndex(c => c.id === id);

  if (clientIndex === -1) {
    return res.status(404).json({ error: 'Client not found' });
  }

  if (req.method === 'GET') {
    return res.status(200).json(data.clients[clientIndex]);
  }

  if (req.method === 'DELETE') {
    data.clients.splice(clientIndex, 1);
    writeData(data);
    return res.status(200).json({ success: true });
  }

  return res.status(405).json({ error: 'Method not allowed' });
};

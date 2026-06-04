const { readData, writeData, corsHeaders } = require('../../lib/data');

// Run a lightweight on-page + backlinks audit for a client
module.exports = async function handler(req, res) {
  corsHeaders(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { id } = req.query;
  const data = readData();
  const ci = data.clients.findIndex(c => c.id === id);
  if (ci === -1) return res.status(404).json({ error: 'Client not found' });

  const client = data.clients[ci];
  if (!client.domain) return res.status(400).json({ error: 'Client has no domain' });

  const DFS_USER = process.env.DATAFORSEO_USERNAME;
  const DFS_PASS = process.env.DATAFORSEO_PASSWORD;
  if (!DFS_USER || !DFS_PASS) {
    // Simulate
    client.audit = {
      backlinks: { rank: Math.floor(Math.random()*80)+10, total: Math.floor(Math.random()*200)+5, referringDomains: Math.floor(Math.random()*50)+3, dofollow: Math.floor(Math.random()*100)+2 },
      onpage: { score: Math.floor(Math.random()*30)+70, pagesCrawled: Math.floor(Math.random()*20)+3, brokenLinks: Math.floor(Math.random()*3), duplicateTitle: Math.floor(Math.random()*2), duplicateDescription: Math.floor(Math.random()*2), missingH1: 0 },
      auditedAt: new Date().toISOString()
    };
    data.clients[ci] = client;
    writeData(data);
    return res.status(200).json({ client, note: 'Simulated audit' });
  }

  const auth = 'Basic ' + Buffer.from(`${DFS_USER}:${DFS_PASS}`).toString('base64');
  const headers = { 'Content-Type': 'application/json', 'Authorization': auth };
  const audit = { auditedAt: new Date().toISOString() };

  // Backlinks summary
  try {
    const blResp = await fetch('https://api.dataforseo.com/v3/backlinks/summary/live', {
      method: 'POST', headers,
      body: JSON.stringify([{ target: client.domain, internal_list_limit: 0 }])
    });
    if (blResp.ok) {
      const blData = await blResp.json();
      const r = blData.tasks?.[0]?.result?.[0];
      if (r) {
        audit.backlinks = {
          rank: r.rank || 0,
          total: r.backlinks || 0,
          referringDomains: r.referring_domains || 0,
          referringIPs: r.referring_ips || 0,
          dofollow: (r.backlinks || 0) - (r.backlinks_nofollow || 0),
          brokenBacklinks: r.broken_backlinks || 0,
          brokenPages: r.broken_pages || 0,
        };
      }
    }
  } catch (e) { console.error('Backlinks failed:', e.message); }

  // On-page: create task then immediately check summary
  // (task may not be done yet, but we can start it)
  try {
    const opResp = await fetch('https://api.dataforseo.com/v3/on_page/task_post', {
      method: 'POST', headers,
      body: JSON.stringify([{
        target: client.domain,
        max_crawl_pages: 20,
        store_raw_html: false,
        enable_javascript: false
      }])
    });
    if (opResp.ok) {
      const opData = await opResp.json();
      const taskId = opData.tasks?.[0]?.id;
      if (taskId) {
        // Wait a bit for crawl to start, then get summary
        await new Promise(r => setTimeout(r, 8000));
        const sumResp = await fetch(`https://api.dataforseo.com/v3/on_page/summary/${taskId}`, {
          method: 'GET', headers
        });
        if (sumResp.ok) {
          const sumData = await sumResp.json();
          const r = sumData.tasks?.[0]?.result?.[0];
          if (r) {
            const pm = r.page_metrics || {};
            audit.onpage = {
              score: r.onpage_score || pm.onpage_score || 0,
              pagesCrawled: r.crawl_status?.pages_crawled || 0,
              brokenLinks: pm.broken_links || 0,
              duplicateTitle: pm.duplicate_title || 0,
              duplicateDescription: pm.duplicate_description || 0,
              duplicateContent: pm.duplicate_content || 0,
              linksExternal: pm.links_external || 0,
              linksInternal: pm.links_internal || 0,
            };
          }
        }
      }
    }
  } catch (e) { console.error('On-page failed:', e.message); }

  client.audit = audit;
  data.clients[ci] = client;
  writeData(data);
  return res.status(200).json({ client });
};

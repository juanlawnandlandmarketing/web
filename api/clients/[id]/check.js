const { readData, writeData, corsHeaders } = require('../../../lib/data');

const DFS_URL = 'https://api.dataforseo.com/v3/serp/google/organic/live/regular';
const DFS_VOLUME_URL = 'https://api.dataforseo.com/v3/dataforseo_labs/google/keyword_suggestions/live';

const STATE_NAMES = {
  AL:'Alabama',AK:'Alaska',AZ:'Arizona',AR:'Arkansas',CA:'California',
  CO:'Colorado',CT:'Connecticut',DE:'Delaware',FL:'Florida',GA:'Georgia',
  HI:'Hawaii',ID:'Idaho',IL:'Illinois',IN:'Indiana',IA:'Iowa',
  KS:'Kansas',KY:'Kentucky',LA:'Louisiana',ME:'Maine',MD:'Maryland',
  MA:'Massachusetts',MI:'Michigan',MN:'Minnesota',MS:'Mississippi',
  MO:'Missouri',MT:'Montana',NE:'Nebraska',NV:'Nevada',NH:'New Hampshire',
  NJ:'New Jersey',NM:'New Mexico',NY:'New York',NC:'North Carolina',
  ND:'North Dakota',OH:'Ohio',OK:'Oklahoma',OR:'Oregon',PA:'Pennsylvania',
  RI:'Rhode Island',SC:'South Carolina',SD:'South Dakota',TN:'Tennessee',
  TX:'Texas',UT:'Utah',VT:'Vermont',VA:'Virginia',WA:'Washington',
  WV:'West Virginia',WI:'Wisconsin',WY:'Wyoming',DC:'District of Columbia'
};

// CTR curve by position (approximate Google organic CTR)
const CTR = {1:0.319,2:0.246,3:0.185,4:0.132,5:0.091,6:0.068,7:0.052,8:0.041,9:0.033,10:0.028};
function estimateCTR(pos) {
  if (!pos || pos <= 0) return 0;
  if (pos <= 10) return CTR[pos] || 0.028;
  if (pos <= 20) return 0.01;
  return 0.005;
}

function normalizeDomain(d) {
  return (d || '').replace(/^www\./, '').toLowerCase();
}

module.exports = async function handler(req, res) {
  corsHeaders(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { id } = req.query;
  const data = readData();
  const clientIndex = data.clients.findIndex(c => c.id === id);
  if (clientIndex === -1) return res.status(404).json({ error: 'Client not found' });

  const client = data.clients[clientIndex];
  if (!client.keywords.length) return res.status(400).json({ error: 'No keywords to check' });

  const DFS_USER = process.env.DATAFORSEO_USERNAME;
  const DFS_PASS = process.env.DATAFORSEO_PASSWORD;
  const authHeader = 'Basic ' + Buffer.from(`${DFS_USER}:${DFS_PASS}`).toString('base64');

  // If no credentials, simulate
  if (!DFS_USER || !DFS_PASS) {
    const now = new Date().toISOString();
    for (const kw of client.keywords) {
      const pos = kw.rankings.position || (Math.random() > 0.3 ? Math.floor(Math.random()*30)+1 : null);
      const prevPos = kw.rankings.position || null;
      kw.rankings = {
        ...kw.rankings,
        position: pos,
        previousPosition: prevPos,
        checkedAt: now,
        searchVolume: Math.floor(Math.random()*2000)+100,
        cpc: +(Math.random()*20+2).toFixed(2),
        monthlyTraffic: pos ? Math.floor((Math.random()*1000+50) * estimateCTR(pos)) : 0,
        trafficValue: 0,
      };
      if (kw.rankings.monthlyTraffic && kw.rankings.cpc) {
        kw.rankings.trafficValue = +(kw.rankings.monthlyTraffic * kw.rankings.cpc).toFixed(2);
      }
    }
    data.clients[clientIndex] = client;
    writeData(data);
    return res.status(200).json({ client, note: 'Simulated data — set DataForSEO credentials for live results' });
  }

  const stateName = STATE_NAMES[client.state] || client.state;
  const locationName = `${client.city},${stateName},United States`;
  const clientDomain = normalizeDomain(client.domain);

  // --- Step 1: SERP check for all keywords ---
  const dfsTasks = client.keywords.map(kw => ({
    keyword: kw.keyword,
    location_name: locationName,
    language_code: 'en',
    device: 'desktop',
    depth: 100
  }));

  const BATCH = 100;
  const resultsMap = {};

  for (let i = 0; i < dfsTasks.length; i += BATCH) {
    const batch = dfsTasks.slice(i, i + BATCH);
    try {
      const resp = await fetch(DFS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': authHeader },
        body: JSON.stringify(batch)
      });
      if (!resp.ok) return res.status(502).json({ error: 'DataForSEO SERP error: ' + await resp.text() });
      const dfs = await resp.json();

      for (const task of (dfs.tasks || [])) {
        if (!task.result?.[0]) continue;
        const keyword = task.data?.keyword;
        if (!keyword) continue;
        const items = task.result[0].items || [];
        const organic = items.filter(i => i.type === 'organic');

        const clientItem = organic.find(i => {
          const d = normalizeDomain(i.domain);
          return d === clientDomain || d.includes(clientDomain) || clientDomain.includes(d);
        });

        resultsMap[keyword] = {
          position: clientItem ? clientItem.rank_group : null,
          url: clientItem ? clientItem.url : null,
          snippet: clientItem ? (clientItem.description || '') : null,
          serp: organic.slice(0, 10).map(i => ({
            rank: i.rank_group, domain: i.domain || '', title: i.title || '',
            url: i.url || '', description: i.description || ''
          }))
        };
      }
    } catch (e) {
      return res.status(502).json({ error: 'SERP fetch failed: ' + e.message });
    }
  }

  // --- Step 2: Get search volume + CPC for all keywords ---
  // Use keyword_suggestions with include_seed_keyword for each unique keyword
  // Batch by doing bulk_keyword_difficulty which is cheaper
  try {
    const volResp = await fetch('https://api.dataforseo.com/v3/keywords_data/google_ads/search_volume/live', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': authHeader },
      body: JSON.stringify([{
        keywords: client.keywords.map(k => k.keyword),
        location_code: 21137, // US
        language_code: 'en'
      }])
    });
    if (volResp.ok) {
      const volData = await volResp.json();
      for (const item of (volData.tasks?.[0]?.result || [])) {
        const kw = item.keyword;
        if (resultsMap[kw]) {
          resultsMap[kw].searchVolume = item.search_volume || 0;
          resultsMap[kw].cpc = item.cpc || item.high_top_of_page_bid || 0;
        }
      }
    }
  } catch (e) {
    // Non-fatal — we still have SERP data
    console.error('Volume fetch failed:', e.message);
  }

  // --- Step 3: Apply results ---
  const now = new Date().toISOString();
  for (const kw of client.keywords) {
    const r = resultsMap[kw.keyword];
    if (!r) continue;

    const prevPos = kw.rankings.position || null;
    const pos = r.position;
    const vol = r.searchVolume || kw.rankings.searchVolume || 0;
    const cpc = r.cpc || kw.rankings.cpc || 0;
    const traffic = pos ? Math.round(vol * estimateCTR(pos)) : 0;
    const value = +(traffic * cpc).toFixed(2);

    kw.rankings = {
      position: pos,
      previousPosition: prevPos,
      url: r.url,
      snippet: r.snippet,
      checkedAt: now,
      serp: r.serp,
      searchVolume: vol,
      cpc: cpc,
      monthlyTraffic: traffic,
      trafficValue: value,
    };
  }

  data.clients[clientIndex] = client;
  writeData(data);
  return res.status(200).json({ client });
};

const { readData, writeData, generateId, corsHeaders } = require('../lib/data');
const { select } = require('../lib/supabase');

function firstByClient(rows) {
  const map = new Map();
  for (const row of rows || []) {
    if (!map.has(row.client_id)) map.set(row.client_id, row);
  }
  return map;
}

function supabaseClientToDashboardClient(client, health, trend) {
  const raw = health?.raw_audit_json || {};
  const trendRaw = trend?.raw_dataforseo_json || {};
  const rankedKeywords = Array.isArray(trendRaw.sample) ? trendRaw.sample : [];

  return {
    id: client.id,
    name: client.client_name,
    website: client.website_url,
    domain: client.domain,
    city: client.domain || 'Lawn & Land',
    state: '',
    keywords: rankedKeywords.map((item, index) => ({
      id: `${client.id}-dfs-${index}`,
      keyword: item.keyword,
      clientId: client.id,
      rankings: {
        position: Number(item.rank || 0),
        previousPosition: null,
        checkedAt: trendRaw.fetched_at || trend?.created_at || null,
        searchVolume: Number(item.search_volume || 0),
        cpc: Number(item.cpc || 0),
        monthlyTraffic: Number(item.estimated_traffic || 0),
        trafficValue: Number(item.estimated_value || 0),
        url: item.url || null,
        serp: [],
      },
    })),
    weeklyHealth: health || null,
    weeklyTrend: trend || null,
    audit: health ? {
      auditedAt: health.last_crawled_at || health.created_at,
      onpage: {
        score: Number(health.technical_seo_score || health.health_score || 0),
        pagesCrawled: Number(health.pages_crawled || 0),
        cleanPages: Number(health.clean_pages || 0),
        brokenLinks: Number(health.critical_error_count || 0),
        metadataHygieneScore: raw.metadata_hygiene_score ?? null,
        speedScore: raw.speed_score ?? null,
        sitemapScore: raw.sitemap_score ?? null,
        verifiedSeoScore: health.verified_seo_score ?? null,
      },
      backlinks: {
        rank: Math.round(Number(health.verified_seo_score || health.technical_seo_score || 0)),
        total: 0,
        referringDomains: 0,
      },
    } : null,
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

      const [healthRows, trendRows] = await Promise.all([
        select('technical_health_snapshots', {
          select: '*',
          order: 'created_at.desc',
        }),
        select('dataforseo_trend_snapshots', {
          select: '*',
          order: 'created_at.desc',
        }),
      ]);

      const healthByClient = firstByClient(healthRows);
      const trendByClient = firstByClient(trendRows);

      return res.status(200).json(clients.map((client) => (
        supabaseClientToDashboardClient(client, healthByClient.get(client.id), trendByClient.get(client.id))
      )));
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

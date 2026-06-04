const { corsHeaders } = require('../../lib/data');
const { select, upsert } = require('../../lib/supabase');

function currentIsoWeek() {
  const now = new Date();
  const date = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
  const day = date.getUTCDay() || 7;
  date.setUTCDate(date.getUTCDate() + 4 - day);
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  const week = Math.ceil((((date - yearStart) / 86400000) + 1) / 7);
  return { year: date.getUTCFullYear(), week_number: week };
}

function normalizeTarget(client) {
  const raw = client.website_url || client.domain || '';
  try {
    return new URL(raw.startsWith('http') ? raw : `https://${raw}`).hostname.replace(/^www\./, '');
  } catch (_) {
    return raw.replace(/^https?:\/\/(www\.)?/, '').split('/')[0];
  }
}

function percent(value, fallback = 0) {
  const n = Number(value);
  return Number.isFinite(n) ? Math.max(0, Math.min(100, Math.round(n))) : fallback;
}

function dashboardClient(client, health) {
  const raw = health?.raw_audit_json || {};
  return {
    id: client.id,
    name: client.client_name,
    website: client.website_url,
    domain: client.domain,
    city: client.domain || 'Lawn & Land',
    state: '',
    keywords: [],
    weeklyHealth: health || null,
    weeklyTrend: null,
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

async function runDataForSeoCrawl(target) {
  const username = process.env.DATAFORSEO_USERNAME;
  const password = process.env.DATAFORSEO_PASSWORD;

  if (!username || !password) {
    const error = new Error('DataForSEO credentials are not configured');
    error.statusCode = 500;
    throw error;
  }

  const headers = {
    Authorization: `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`,
    'Content-Type': 'application/json',
  };

  const taskResponse = await fetch('https://api.dataforseo.com/v3/on_page/task_post', {
    method: 'POST',
    headers,
    body: JSON.stringify([{
      target,
      max_crawl_pages: 20,
      store_raw_html: false,
      enable_javascript: false,
    }]),
  });

  const taskData = await taskResponse.json().catch(() => null);
  if (!taskResponse.ok) {
    const error = new Error(taskData?.status_message || 'DataForSEO crawl task failed');
    error.statusCode = taskResponse.status;
    error.details = taskData;
    throw error;
  }

  const task = taskData?.tasks?.[0];
  const taskId = task?.id;
  if (!taskId) {
    const error = new Error('DataForSEO did not return a crawl task id');
    error.details = taskData;
    throw error;
  }

  await new Promise((resolve) => setTimeout(resolve, 9000));

  const summaryResponse = await fetch(`https://api.dataforseo.com/v3/on_page/summary/${taskId}`, {
    method: 'GET',
    headers,
  });
  const summaryData = await summaryResponse.json().catch(() => null);
  if (!summaryResponse.ok) {
    const error = new Error(summaryData?.status_message || 'DataForSEO crawl summary failed');
    error.statusCode = summaryResponse.status;
    error.details = summaryData;
    throw error;
  }

  const result = summaryData?.tasks?.[0]?.result?.[0] || null;
  const pageMetrics = result?.page_metrics || {};
  const crawlStatus = result?.crawl_status || {};
  const pagesCrawled = Number(crawlStatus.pages_crawled || result?.total_pages || 0);
  const score = percent(result?.onpage_score ?? pageMetrics.onpage_score);
  const brokenLinks = Number(pageMetrics.broken_links || 0);
  const duplicateTitles = Number(pageMetrics.duplicate_title || 0);
  const duplicateDescriptions = Number(pageMetrics.duplicate_description || 0);
  const duplicateContent = Number(pageMetrics.duplicate_content || 0);
  const criticalErrors = brokenLinks + duplicateTitles + duplicateDescriptions + duplicateContent;
  const cleanPages = Math.max(0, pagesCrawled - criticalErrors);

  return {
    taskId,
    status: result ? 'success' : 'pending',
    score,
    pagesCrawled,
    cleanPages,
    criticalErrors,
    raw: {
      source: 'dataforseo_on_page',
      task_id: taskId,
      crawled_at: new Date().toISOString(),
      seo_quality_score: score,
      metadata_hygiene_score: percent(100 - ((duplicateTitles + duplicateDescriptions) * 5), score),
      speed_score: pageMetrics.page_speed_score ?? null,
      sitemap_score: result?.checks?.sitemap ? 100 : null,
      crawl_status: crawlStatus,
      page_metrics: pageMetrics,
      dataforseo_status: summaryData?.tasks?.[0]?.status_message || null,
    },
  };
}

module.exports = async function handler(req, res) {
  corsHeaders(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { id } = req.query;
    const [client] = await select('clients', {
      select: 'id,client_name,domain,website_url,status',
      id: `eq.${id}`,
      limit: 1,
    });

    if (!client) return res.status(404).json({ error: 'Client not found' });

    const target = normalizeTarget(client);
    if (!target) return res.status(400).json({ error: 'Client has no crawlable domain' });

    const defaults = currentIsoWeek();
    const year = Number.parseInt(req.body?.year || req.query.year || defaults.year, 10);
    const weekNumber = Number.parseInt(req.body?.week_number || req.query.week_number || defaults.week_number, 10);

    const [previous] = await select('technical_health_snapshots', {
      select: '*',
      client_id: `eq.${client.id}`,
      order: 'created_at.desc',
      limit: 1,
    });

    const crawl = await runDataForSeoCrawl(target);
    const previousScore = previous?.technical_seo_score ?? previous?.health_score ?? null;
    const now = new Date().toISOString();

    const [health] = await upsert('technical_health_snapshots', [{
      client_id: client.id,
      year,
      week_number: weekNumber,
      health_score: crawl.score,
      verified_seo_score: crawl.score,
      technical_seo_score: crawl.score,
      previous_technical_seo_score: previousScore,
      score_change: previousScore === null || previousScore === undefined ? null : crawl.score - Number(previousScore),
      pages_crawled: crawl.pagesCrawled,
      clean_pages: crawl.cleanPages,
      critical_error_count: crawl.criticalErrors,
      last_crawled_at: now,
      crawl_status: crawl.status,
      raw_audit_json: crawl.raw,
    }], 'client_id,year,week_number');

    return res.status(200).json({
      client: dashboardClient(client, health),
      health,
      note: `Technical crawl complete for ${client.client_name}`,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      error: error.message,
      details: error.details || null,
    });
  }
};

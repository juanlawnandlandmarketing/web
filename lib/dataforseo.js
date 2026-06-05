const DATAFORSEO_BASE_URL = 'https://api.dataforseo.com/v3';
const DEFAULT_LOCATION_CODE = 2840; // United States
const DEFAULT_LANGUAGE_CODE = 'en';

function getCredentials() {
  const username = process.env.DATAFORSEO_USERNAME || process.env.DATAFORSEO_LOGIN;
  const password = process.env.DATAFORSEO_PASSWORD;
  return { username, password, configured: Boolean(username && password) };
}

function requireCredentials() {
  const credentials = getCredentials();
  if (!credentials.configured) {
    const error = new Error('DataForSEO credentials are not configured');
    error.statusCode = 500;
    throw error;
  }
  return credentials;
}

function authHeaders() {
  const { username, password } = requireCredentials();
  return {
    Authorization: `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`,
    'Content-Type': 'application/json',
  };
}

function normalizeDomain(value) {
  const raw = String(value || '').trim();
  if (!raw) return '';
  try {
    return new URL(raw.startsWith('http') ? raw : `https://${raw}`).hostname.replace(/^www\./, '').toLowerCase();
  } catch (_) {
    return raw.replace(/^https?:\/\/(www\.)?/, '').split('/')[0].toLowerCase();
  }
}

async function dataForSeoFetch(path, options = {}) {
  const response = await fetch(`${DATAFORSEO_BASE_URL}${path}`, {
    ...options,
    headers: {
      ...authHeaders(),
      ...(options.headers || {}),
    },
  });

  const payload = await response.json().catch(() => null);
  if (!response.ok || (payload && Number(payload.status_code || 20000) >= 40000)) {
    const error = new Error(payload?.status_message || response.statusText || 'DataForSEO request failed');
    error.statusCode = response.ok ? 502 : response.status;
    error.details = payload;
    throw error;
  }
  return payload;
}

async function getUserData() {
  return dataForSeoFetch('/appendix/user_data', { method: 'GET' });
}

function extractAccount(payload) {
  const result = payload?.tasks?.[0]?.result?.[0] || payload?.tasks?.[0]?.result || payload?.result?.[0] || payload?.result || {};
  return {
    login: result.login || null,
    money: result.money ?? result.balance ?? null,
    rates: result.rates || null,
  };
}

async function getConnectionStatus() {
  const credentials = getCredentials();
  if (!credentials.configured) {
    return {
      configured: false,
      connected: false,
      status: 'not_configured',
      message: 'DATAFORSEO_USERNAME and DATAFORSEO_PASSWORD are missing in Vercel.',
    };
  }

  try {
    const payload = await getUserData();
    return {
      configured: true,
      connected: true,
      status: 'connected',
      account: extractAccount(payload),
      checked_at: new Date().toISOString(),
    };
  } catch (error) {
    return {
      configured: true,
      connected: false,
      status: 'error',
      message: error.message,
      details: error.details || null,
      checked_at: new Date().toISOString(),
    };
  }
}

function number(value, fallback = 0) {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

function parseRankedKeywordItem(item) {
  const keywordData = item.keyword_data || {};
  const keywordInfo = keywordData.keyword_info || {};
  const serpItem = item.ranked_serp_element?.serp_item || {};
  const rank = number(serpItem.rank_group || serpItem.rank_absolute || 0);
  const searchVolume = number(keywordInfo.search_volume || 0);
  const cpc = number(keywordInfo.cpc || keywordInfo.high_top_of_page_bid || 0);
  const traffic = Math.round(searchVolume * estimateCtr(rank));
  const value = Number((traffic * cpc).toFixed(2));

  return {
    keyword: keywordData.keyword || item.keyword || '',
    rank,
    search_volume: searchVolume,
    cpc,
    estimated_traffic: traffic,
    estimated_value: value,
    url: serpItem.url || null,
    title: serpItem.title || null,
    type: serpItem.type || null,
  };
}

function estimateCtr(rank) {
  if (!rank || rank <= 0) return 0;
  if (rank === 1) return 0.319;
  if (rank === 2) return 0.246;
  if (rank === 3) return 0.185;
  if (rank <= 10) return 0.07;
  if (rank <= 20) return 0.02;
  return 0.005;
}

function summarizeRankedKeywords(client, items, previousTrend) {
  const parsed = (items || []).map(parseRankedKeywordItem).filter((item) => item.keyword);
  const rankingKeywords = parsed.length;
  const top3 = parsed.filter((item) => item.rank > 0 && item.rank <= 3).length;
  const top10 = parsed.filter((item) => item.rank > 0 && item.rank <= 10).length;
  const top100 = parsed.filter((item) => item.rank > 0 && item.rank <= 100).length;
  const traffic = parsed.reduce((sum, item) => sum + number(item.estimated_traffic), 0);
  const value = parsed.reduce((sum, item) => sum + number(item.estimated_value), 0);
  const previousCount = number(previousTrend?.ranking_keywords, 0);

  return {
    client_id: client.id,
    ranking_keywords: rankingKeywords,
    top_3_keywords: top3,
    top_10_keywords: top10,
    top_100_keywords: top100,
    keyword_change: rankingKeywords - previousCount,
    estimated_traffic: Math.round(traffic),
    estimated_value: Number(value.toFixed(2)),
    biggest_wins: parsed.filter((item) => item.rank > 0 && item.rank <= 10).slice(0, 5),
    biggest_losses: parsed.filter((item) => item.rank > 10 && item.rank <= 100).slice(0, 5),
    raw_dataforseo_json: {
      source: 'dataforseo_labs_ranked_keywords',
      target: normalizeDomain(client.domain || client.website_url),
      fetched_at: new Date().toISOString(),
      total_items: parsed.length,
      sample: parsed.slice(0, 25),
    },
  };
}

async function fetchRankedKeywordsTrend(client, previousTrend) {
  const target = normalizeDomain(client.domain || client.website_url);
  if (!target) {
    const error = new Error('Client has no DataForSEO target domain');
    error.statusCode = 400;
    throw error;
  }

  const locationCode = Number.parseInt(client.dataforseo_location_code || DEFAULT_LOCATION_CODE, 10);
  const languageCode = client.dataforseo_language_code || DEFAULT_LANGUAGE_CODE;

  const payload = await dataForSeoFetch('/dataforseo_labs/google/ranked_keywords/live', {
    method: 'POST',
    body: JSON.stringify([{
      target,
      location_code: locationCode,
      language_code: languageCode,
      limit: 100,
      order_by: ['keyword_data.keyword_info.search_volume,desc'],
      filters: [
        ['ranked_serp_element.serp_item.type', '=', 'organic'],
        'and',
        ['keyword_data.keyword_info.search_volume', '>', 0],
      ],
    }]),
  });

  const result = payload?.tasks?.[0]?.result?.[0] || {};
  return summarizeRankedKeywords(client, result.items || [], previousTrend);
}

module.exports = {
  DEFAULT_LANGUAGE_CODE,
  DEFAULT_LOCATION_CODE,
  dataForSeoFetch,
  fetchRankedKeywordsTrend,
  getConnectionStatus,
  getCredentials,
  normalizeDomain,
};

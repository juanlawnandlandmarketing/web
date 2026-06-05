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

function normalizeKeyword(value) {
  return String(value || '').trim().toLowerCase();
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

function positionScore(rank) {
  const pos = number(rank);
  if (!pos || pos <= 0) return 0;
  if (pos <= 3) return 100 - ((pos - 1) * 12);
  if (pos <= 10) return 65 - ((pos - 4) * 5);
  if (pos <= 20) return 25 - ((pos - 11) * 1.5);
  if (pos <= 50) return 8;
  return 2;
}

function previousRankingMap(previousTrend) {
  const raw = previousTrend?.raw_dataforseo_json || {};
  const rows = []
    .concat(raw.ranking_snapshots?.organic || [])
    .concat(raw.ranking_snapshots?.local || [])
    .concat(raw.sample || []);
  const map = new Map();
  for (const row of rows) {
    const type = row.ranking_type || row.type || 'organic';
    const keyword = normalizeKeyword(row.keyword);
    if (keyword) map.set(`${type}:${keyword}`, row);
  }
  return map;
}

function addRankingComparison(row, previousMap) {
  const key = `${row.ranking_type}:${normalizeKeyword(row.keyword)}`;
  const previous = previousMap.get(key);
  const previousRank = number(previous?.rank || previous?.position || 0);
  const rank = number(row.rank || row.position || 0);
  return {
    ...row,
    previous_rank: previousRank || null,
    position_change: previousRank && rank ? previousRank - rank : 0,
    score: Math.round(positionScore(rank)),
  };
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
    ranking_type: 'organic',
    rank,
    search_volume: searchVolume,
    cpc,
    estimated_traffic: traffic,
    estimated_value: value,
    url: serpItem.url || null,
    title: serpItem.title || null,
    type: serpItem.type || 'organic',
  };
}

function parseLocalRankItem(item, client) {
  const domain = normalizeDomain(client.domain || client.website_url);
  const itemDomain = normalizeDomain(item.url || item.website || item.domain || '');
  const title = String(item.title || item.name || '').toLowerCase();
  const clientName = String(client.client_name || '').toLowerCase();
  const matchesDomain = domain && itemDomain && (itemDomain === domain || itemDomain.endsWith(`.${domain}`));
  const matchesName = clientName && title.includes(clientName);
  if (!matchesDomain && !matchesName) return null;
  return {
    rank: number(item.rank_group || item.rank_absolute || item.rank || 0),
    url: item.url || item.website || null,
    title: item.title || item.name || null,
    type: item.type || 'local',
  };
}

function rankingAlert(row) {
  const previous = number(row.previous_rank);
  const current = number(row.rank);
  const change = number(row.position_change);
  if (!previous) return null;
  if (!current) {
    return { severity: 'critical', type: 'lost_keyword', message: `${row.keyword} is no longer ranking in ${row.ranking_type}.`, keyword: row.keyword, ranking_type: row.ranking_type, previous_rank: previous, current_rank: null, position_change: change };
  }
  if (previous <= 3 && current > 3) {
    return { severity: 'critical', type: 'lost_top_3', message: `${row.keyword} fell out of the top 3 in ${row.ranking_type}.`, keyword: row.keyword, ranking_type: row.ranking_type, previous_rank: previous, current_rank: current, position_change: change };
  }
  if (previous <= 10 && current > 10) {
    return { severity: 'critical', type: 'lost_top_10', message: `${row.keyword} fell out of page 1 in ${row.ranking_type}.`, keyword: row.keyword, ranking_type: row.ranking_type, previous_rank: previous, current_rank: current, position_change: change };
  }
  if (change <= -3) {
    return { severity: 'warning', type: 'position_drop', message: `${row.keyword} dropped ${Math.abs(change)} positions in ${row.ranking_type}.`, keyword: row.keyword, ranking_type: row.ranking_type, previous_rank: previous, current_rank: current, position_change: change };
  }
  return null;
}

function summarizeRankingSet(rows) {
  const ranked = rows.filter((row) => number(row.rank) > 0);
  const score = rows.length
    ? Math.round(rows.reduce((sum, row) => sum + positionScore(row.rank), 0) / rows.length)
    : 0;
  return {
    score,
    total: rows.length,
    ranked: ranked.length,
    top_3: ranked.filter((row) => row.rank <= 3).length,
    top_10: ranked.filter((row) => row.rank <= 10).length,
    top_20: ranked.filter((row) => row.rank <= 20).length,
  };
}

async function fetchLocalRankingRows(client, organicRows) {
  const locationCode = Number.parseInt(client.dataforseo_location_code || DEFAULT_LOCATION_CODE, 10);
  const languageCode = client.dataforseo_language_code || DEFAULT_LANGUAGE_CODE;
  const limit = Number.parseInt(process.env.DATAFORSEO_LOCAL_KEYWORD_LIMIT || '10', 10);
  const keywords = organicRows
    .map((row) => row.keyword)
    .filter(Boolean)
    .slice(0, Number.isFinite(limit) && limit > 0 ? limit : 10);

  if (!keywords.length) return { rows: [], error: null };

  try {
    const payload = await dataForSeoFetch('/serp/google/local_finder/live/advanced', {
      method: 'POST',
      body: JSON.stringify(keywords.map((keyword) => ({
        keyword,
        location_code: locationCode,
        language_code: languageCode,
        depth: 20,
      }))),
    });

    const rows = (payload?.tasks || []).map((task, index) => {
      const keyword = task.data?.keyword || keywords[index];
      const items = task.result?.[0]?.items || [];
      const matched = items.map((item) => parseLocalRankItem(item, client)).find(Boolean);
      const organic = organicRows.find((row) => row.keyword === keyword) || {};
      return {
        keyword,
        ranking_type: 'local',
        rank: matched?.rank || 0,
        search_volume: number(organic.search_volume),
        cpc: number(organic.cpc),
        estimated_traffic: 0,
        estimated_value: 0,
        url: matched?.url || null,
        title: matched?.title || null,
        type: matched?.type || 'local',
      };
    });

    return { rows, error: null };
  } catch (error) {
    return { rows: [], error: { message: error.message, details: error.details || null } };
  }
}

function summarizeRankingModel(client, organicRows, localRows, previousTrend, localError) {
  const raw = previousTrend?.raw_dataforseo_json || {};
  const previousScore = number(raw.ranking_model?.score, 0);
  const allRows = [...organicRows, ...localRows];
  const organic = summarizeRankingSet(organicRows);
  const local = summarizeRankingSet(localRows);
  const organicWeight = organicRows.length ? 0.6 : 0;
  const localWeight = localRows.length ? 0.4 : 0;
  const totalWeight = organicWeight + localWeight;
  const rankingScore = totalWeight ? Math.round(((organic.score * organicWeight) + (local.score * localWeight)) / totalWeight) : 0;
  const scoreChange = previousScore ? rankingScore - previousScore : 0;
  const traffic = organicRows.reduce((sum, item) => sum + number(item.estimated_traffic), 0);
  const value = organicRows.reduce((sum, item) => sum + number(item.estimated_value), 0);
  const alerts = allRows.map(rankingAlert).filter(Boolean);

  if (previousScore && rankingScore && ((previousScore - rankingScore) / previousScore) >= 0.1) {
    alerts.unshift({ severity: 'critical', type: 'ranking_score_drop', message: `Unified ranking score dropped ${Math.round(((previousScore - rankingScore) / previousScore) * 100)}% week over week.`, previous_score: previousScore, current_score: rankingScore, score_change: scoreChange });
  }

  const rankedRows = allRows.filter((item) => item.rank > 0);
  const previousCount = number(previousTrend?.ranking_keywords, 0);

  return {
    client_id: client.id,
    ranking_keywords: rankedRows.length,
    top_3_keywords: rankedRows.filter((item) => item.rank <= 3).length,
    top_10_keywords: rankedRows.filter((item) => item.rank <= 10).length,
    top_100_keywords: rankedRows.filter((item) => item.rank <= 100).length,
    keyword_change: rankedRows.length - previousCount,
    estimated_traffic: Math.round(traffic),
    estimated_value: Number(value.toFixed(2)),
    biggest_wins: rankedRows.filter((item) => item.rank <= 10).slice(0, 5),
    biggest_losses: allRows.filter((item) => item.position_change <= -3 || item.rank > 10).slice(0, 5),
    raw_dataforseo_json: {
      source: 'dataforseo_rankings_model',
      target: normalizeDomain(client.domain || client.website_url),
      fetched_at: new Date().toISOString(),
      total_items: allRows.length,
      sample: organicRows.slice(0, 25),
      ranking_model: {
        score: rankingScore,
        previous_score: previousScore || null,
        score_change: scoreChange,
        organic,
        local,
        alert_count: alerts.length,
        critical_alert_count: alerts.filter((alert) => alert.severity === 'critical').length,
        warning_alert_count: alerts.filter((alert) => alert.severity === 'warning').length,
        formula: 'organic score weighted 60%, local score weighted 40%; top 3 ranks carry strongest weight, top 10 medium weight, top 20 light weight, unranked equals 0',
      },
      ranking_snapshots: {
        organic: organicRows,
        local: localRows,
      },
      ranking_alerts: alerts,
      local_error: localError,
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
  const previousMap = previousRankingMap(previousTrend);

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
  const organicRows = (result.items || [])
    .map(parseRankedKeywordItem)
    .filter((item) => item.keyword)
    .map((item) => addRankingComparison(item, previousMap));
  const localResult = await fetchLocalRankingRows(client, organicRows);
  const localRows = localResult.rows.map((item) => addRankingComparison(item, previousMap));
  return summarizeRankingModel(client, organicRows, localRows, previousTrend, localResult.error);
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

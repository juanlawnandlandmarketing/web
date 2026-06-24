const { corsHeaders } = require('../../lib/data');
const { fetchRankedKeywordsTrend, getCredentials } = require('../../lib/dataforseo');
const { insert, patch, select, upsert } = require('../../lib/supabase');
const {
  closeStaleWeeklyRuns,
  failRunBeforeTimeout,
  maxRunMs,
  shouldStopBeforeTimeout,
} = require('../../lib/weekly-runs');

function intParam(value, fallback) {
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function currentIsoWeek() {
  const now = new Date();
  const date = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
  const day = date.getUTCDay() || 7;
  date.setUTCDate(date.getUTCDate() + 4 - day);
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  const week = Math.ceil((((date - yearStart) / 86400000) + 1) / 7);
  return { year: date.getUTCFullYear(), week_number: week };
}

function latestByClient(rows) {
  const map = new Map();
  for (const row of rows || []) {
    if (!map.has(row.client_id)) map.set(row.client_id, row);
  }
  return map;
}

function latestPreviousByClient(rows, year, weekNumber) {
  const map = new Map();
  for (const row of rows || []) {
    if (Number(row.year) === Number(year) && Number(row.week_number) === Number(weekNumber)) continue;
    if (!map.has(row.client_id)) map.set(row.client_id, row);
  }
  return map;
}

function copyHealthForWeek(source, clientId) {
  if (!source) {
    return {
      client_id: clientId,
      pages_crawled: 0,
      clean_pages: 0,
      critical_error_count: 0,
      crawl_status: 'pending',
      raw_audit_json: {
        source: 'not_connected',
        note: 'No real technical SEO snapshot has been imported for this client yet.',
      },
    };
  }

  return {
    client_id: clientId,
    health_score: source.health_score,
    verified_seo_score: source.verified_seo_score,
    technical_seo_score: source.technical_seo_score,
    previous_technical_seo_score: source.previous_technical_seo_score,
    score_change: source.score_change,
    pages_crawled: source.pages_crawled || 0,
    clean_pages: source.clean_pages || 0,
    critical_error_count: source.critical_error_count || 0,
    last_crawled_at: source.last_crawled_at || source.created_at || new Date().toISOString(),
    crawl_status: source.crawl_status || 'success',
    raw_audit_json: source.raw_audit_json || {
      source: 'imported_snapshot',
      note: 'Copied from latest available real technical SEO snapshot.',
    },
  };
}

function emptyTrend(clientId, note = 'Real DataForSEO trend data is not connected yet.') {
  return {
    client_id: clientId,
    ranking_keywords: 0,
    top_3_keywords: 0,
    top_10_keywords: 0,
    top_100_keywords: 0,
    keyword_change: 0,
    estimated_traffic: null,
    estimated_value: null,
    biggest_wins: [],
    biggest_losses: [],
    raw_dataforseo_json: {
      source: 'not_connected',
      note,
    },
  };
}

function failedTrend(clientId, error) {
  return {
    ...emptyTrend(clientId, error.message),
    raw_dataforseo_json: {
      source: 'dataforseo_error',
      note: error.message,
      details: error.details || null,
      failed_at: new Date().toISOString(),
    },
  };
}

function normalizeAction(value) {
  const action = String(value || 'full').toLowerCase();
  if (['full', 'technical', 'rankings'].includes(action)) return action;
  return 'full';
}

function actionLabel(action) {
  if (action === 'technical') return 'Technical update';
  if (action === 'rankings') return 'Local + search update';
  return 'Weekly update';
}

module.exports = async function handler(req, res) {
  corsHeaders(res);

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const defaults = currentIsoWeek();
  const year = intParam(req.body?.year || req.query.year, defaults.year);
  const weekNumber = intParam(req.body?.week_number || req.query.week_number, defaults.week_number);
  const action = normalizeAction(req.body?.action || req.query.action);
  const runTechnical = action === 'full' || action === 'technical';
  const runRankings = action === 'full' || action === 'rankings';

  let run;
  const startedAt = Date.now();

  try {
    await closeStaleWeeklyRuns({ year, weekNumber });

    const clients = await select('clients', {
      select: 'id,client_name,domain,website_url,status,dataforseo_location_code,dataforseo_language_code',
      status: 'eq.active',
      order: 'client_name.asc',
    });

    [run] = await insert('weekly_update_runs', [{
      year,
      week_number: weekNumber,
      status: 'running',
      clients_total: clients.length,
      clients_completed: 0,
    }]);

    let completed = 0;

    const [currentHealthRows, latestHealthRows, previousTrendRows] = await Promise.all([
      select('technical_health_snapshots', {
        select: '*',
        year: `eq.${year}`,
        week_number: `eq.${weekNumber}`,
        order: 'created_at.desc',
      }),
      select('technical_health_snapshots', {
        select: '*',
        order: 'created_at.desc',
      }),
      select('dataforseo_trend_snapshots', {
        select: '*',
        order: 'created_at.desc',
      }),
    ]);
    const currentHealthByClient = latestByClient(currentHealthRows);
    const latestHealthByClient = latestByClient(latestHealthRows);
    const previousTrendByClient = latestPreviousByClient(previousTrendRows, year, weekNumber);
    const dataForSeoConfigured = getCredentials().configured;

    for (const client of clients) {
      if (shouldStopBeforeTimeout(startedAt)) {
        const failedRun = await failRunBeforeTimeout(run, completed, startedAt);
        return res.status(200).json({
          run: failedRun,
          note: `${actionLabel(action)} stopped before the serverless timeout after ${completed}/${clients.length} clients. Re-run it to keep refreshing the remaining clients.`,
        });
      }

      if (runTechnical) {
        const health = copyHealthForWeek(currentHealthByClient.get(client.id) || latestHealthByClient.get(client.id), client.id);
        await upsert('technical_health_snapshots', [{
          ...health,
          year,
          week_number: weekNumber,
        }], 'client_id,year,week_number');
      }

      if (runRankings) {
        let trend;

        if (dataForSeoConfigured) {
          try {
            trend = await fetchRankedKeywordsTrend(client, previousTrendByClient.get(client.id));
          } catch (error) {
            trend = failedTrend(client.id, error);
          }
        } else {
          trend = emptyTrend(client.id, 'Set DATAFORSEO_USERNAME and DATAFORSEO_PASSWORD in Vercel to enable real trend data.');
        }

        await upsert('dataforseo_trend_snapshots', [{
          ...trend,
          year,
          week_number: weekNumber,
        }], 'client_id,year,week_number');
      }

      await upsert('weekly_execution', [{
        client_id: client.id,
        year,
        week_number: weekNumber,
        completed_seo_tasks: false,
      }], 'client_id,year,week_number');

      await upsert('weekly_outputs', [{
        client_id: client.id,
        year,
        week_number: weekNumber,
        blog_done: false,
        prs_published_count: 0,
        report_sent_count: 0,
      }], 'client_id,year,week_number');

      completed += 1;
      await patch('weekly_update_runs', { id: `eq.${run.id}` }, { clients_completed: completed });
    }

    const [finishedRun] = await patch('weekly_update_runs', { id: `eq.${run.id}` }, {
      status: 'complete',
      clients_completed: completed,
      finished_at: new Date().toISOString(),
    });

    return res.status(200).json({
      run: finishedRun,
      note: runRankings && !dataForSeoConfigured
        ? `${actionLabel(action)} saved, but DataForSEO trend data is not connected because credentials are missing.`
        : `${actionLabel(action)} saved in ${Math.round((Date.now() - startedAt) / 1000)}s.`,
      max_run_seconds: Math.round(maxRunMs() / 1000),
    });
  } catch (error) {
    if (run?.id) {
      try {
        await patch('weekly_update_runs', { id: `eq.${run.id}` }, {
          status: 'failed',
          finished_at: new Date().toISOString(),
          error_message: error.message,
        });
      } catch (_) {
        // Keep the original error.
      }
    }

    return res.status(error.statusCode || 500).json({
      error: error.message,
      details: error.details || null,
    });
  }
};

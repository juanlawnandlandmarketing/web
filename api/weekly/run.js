const { corsHeaders } = require('../lib/data');
const { insert, patch, select, upsert } = require('../lib/supabase');

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

function mockHealth(client, index) {
  const pagesCrawled = 40 + (index * 7);
  const critical = index % 4;
  const cleanPages = Math.max(0, pagesCrawled - critical - 5);
  const healthScore = Math.round((cleanPages / pagesCrawled) * 100);
  const verifiedSeoScore = Math.max(0, healthScore - (critical * 3));
  const technicalSeoScore = Math.round((healthScore * 0.55) + (verifiedSeoScore * 0.45));

  return {
    client_id: client.id,
    health_score: healthScore,
    verified_seo_score: verifiedSeoScore,
    technical_seo_score: technicalSeoScore,
    previous_technical_seo_score: Math.max(0, technicalSeoScore - 2 + (index % 3)),
    score_change: technicalSeoScore - Math.max(0, technicalSeoScore - 2 + (index % 3)),
    pages_crawled: pagesCrawled,
    clean_pages: cleanPages,
    critical_error_count: critical,
    last_crawled_at: new Date().toISOString(),
    crawl_status: 'partial',
    raw_audit_json: {
      source: 'placeholder',
      note: 'Replace with technical SEO crawler output.',
    },
  };
}

function mockTrend(client, index) {
  const ranking = 18 + (index * 5);
  const top3 = Math.max(0, Math.floor(ranking * 0.12));
  const top10 = Math.max(top3, Math.floor(ranking * 0.34));

  return {
    client_id: client.id,
    ranking_keywords: ranking,
    top_3_keywords: top3,
    top_10_keywords: top10,
    top_100_keywords: ranking + 12,
    keyword_change: (index % 5) - 2,
    estimated_traffic: ranking * 18,
    estimated_value: ranking * 42,
    biggest_wins: [],
    biggest_losses: [],
    raw_dataforseo_json: {
      source: 'placeholder',
      note: 'Replace with DataForSEO trend response.',
    },
  };
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

  let run;

  try {
    const clients = await select('clients', {
      select: 'id,client_name,domain,status',
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

    for (const [index, client] of clients.entries()) {
      const health = mockHealth(client, index);
      const trend = mockTrend(client, index);

      await upsert('technical_health_snapshots', [{
        ...health,
        year,
        week_number: weekNumber,
      }], 'client_id,year,week_number');

      await upsert('dataforseo_trend_snapshots', [{
        ...trend,
        year,
        week_number: weekNumber,
      }], 'client_id,year,week_number');

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
      note: 'Weekly update saved. Technical crawl and DataForSEO are placeholder hooks until the live integrations are connected.',
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

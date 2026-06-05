const { corsHeaders } = require('../../lib/data');
const { select, upsert } = require('../../lib/supabase');

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

function byClient(rows) {
  return new Map((rows || []).map((row) => [row.client_id, row]));
}

function parseOutputNotes(notes) {
  if (!notes) return {};
  try {
    const parsed = JSON.parse(notes);
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

function hasOwn(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj || {}, key);
}

async function loadWeekly(year, weekNumber) {
  const clients = await select('clients', {
    select: 'id,client_name,domain,website_url,status,dataforseo_location_code,dataforseo_language_code',
    status: 'eq.active',
    order: 'client_name.asc',
  });

  const [execution, health, trends, outputs, runs] = await Promise.all([
    select('weekly_execution', { select: '*', year: `eq.${year}`, week_number: `eq.${weekNumber}` }),
    select('technical_health_snapshots', { select: '*', year: `eq.${year}`, week_number: `eq.${weekNumber}` }),
    select('dataforseo_trend_snapshots', { select: '*', year: `eq.${year}`, week_number: `eq.${weekNumber}` }),
    select('weekly_outputs', { select: '*', year: `eq.${year}`, week_number: `eq.${weekNumber}` }),
    select('weekly_update_runs', {
      select: '*',
      year: `eq.${year}`,
      week_number: `eq.${weekNumber}`,
      order: 'created_at.desc',
      limit: 5,
    }),
  ]);

  const executionMap = byClient(execution);
  const healthMap = byClient(health);
  const trendsMap = byClient(trends);
  const outputsMap = byClient(outputs);

  return {
    year,
    week_number: weekNumber,
    clients: clients.map((client) => ({
      ...client,
      execution: executionMap.get(client.id) || null,
      health: healthMap.get(client.id) || null,
      trend: trendsMap.get(client.id) || null,
      outputs: outputsMap.get(client.id) || null,
    })),
    runs,
  };
}

module.exports = async function handler(req, res) {
  corsHeaders(res);

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const defaults = currentIsoWeek();
  const year = intParam(req.query.year, defaults.year);
  const weekNumber = intParam(req.query.week_number, defaults.week_number);

  try {
    if (req.method === 'GET') {
      const data = await loadWeekly(year, weekNumber);
      return res.status(200).json(data);
    }

    if (req.method === 'POST') {
      const { client_id, execution, outputs, fulfillment } = req.body || {};
      if (!client_id) {
        return res.status(400).json({ error: 'client_id is required' });
      }

      const writes = [];

      if (execution) {
        const completed = Boolean(execution.completed_seo_tasks);
        writes.push(upsert('weekly_execution', [{
          client_id,
          year,
          week_number: weekNumber,
          completed_seo_tasks: completed,
          completed_at: completed ? new Date().toISOString() : null,
          notes: execution.notes || null,
        }], 'client_id,year,week_number'));
      }

      if (outputs || fulfillment) {
        const existingRows = await select('weekly_outputs', {
          select: '*',
          client_id: `eq.${client_id}`,
          year: `eq.${year}`,
          week_number: `eq.${weekNumber}`,
          limit: 1,
        });
        const existing = existingRows[0] || {};
        const notesPayload = parseOutputNotes(existing.notes);

        if (fulfillment?.category && fulfillment?.task_id) {
          notesPayload.fulfillment = notesPayload.fulfillment || {};
          notesPayload.fulfillment[fulfillment.category] = notesPayload.fulfillment[fulfillment.category] || {};
          notesPayload.fulfillment[fulfillment.category][fulfillment.task_id] = Boolean(fulfillment.done);
        }

        const mergedOutputs = outputs || {};
        writes.push(upsert('weekly_outputs', [{
          client_id,
          year,
          week_number: weekNumber,
          blog_done: hasOwn(mergedOutputs, 'blog_done') ? Boolean(mergedOutputs.blog_done) : Boolean(existing.blog_done),
          blog_url: hasOwn(mergedOutputs, 'blog_url') ? mergedOutputs.blog_url || null : existing.blog_url || null,
          prs_published_count: hasOwn(mergedOutputs, 'prs_published_count')
            ? Number.parseInt(mergedOutputs.prs_published_count || 0, 10)
            : Number.parseInt(existing.prs_published_count || 0, 10),
          report_sent_count: hasOwn(mergedOutputs, 'report_sent_count')
            ? Number.parseInt(mergedOutputs.report_sent_count || 0, 10)
            : Number.parseInt(existing.report_sent_count || 0, 10),
          report_notes: hasOwn(mergedOutputs, 'report_notes') ? mergedOutputs.report_notes || null : existing.report_notes || null,
          notes: fulfillment ? JSON.stringify(notesPayload) : hasOwn(mergedOutputs, 'notes') ? mergedOutputs.notes || null : existing.notes || null,
        }], 'client_id,year,week_number'));
      }

      await Promise.all(writes);
      const data = await loadWeekly(year, weekNumber);
      return res.status(200).json(data);
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      error: error.message,
      details: error.details || null,
    });
  }
};

const { patch } = require('./supabase');

const DEFAULT_STALE_RUN_MINUTES = 20;
const DEFAULT_MAX_RUN_MS = 45000;

function intEnv(name, fallback) {
  const parsed = Number.parseInt(process.env[name] || '', 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function staleRunMinutes() {
  return intEnv('WEEKLY_RUN_STALE_MINUTES', DEFAULT_STALE_RUN_MINUTES);
}

function maxRunMs() {
  return intEnv('WEEKLY_RUN_MAX_MS', DEFAULT_MAX_RUN_MS);
}

function staleCutoffIso(now = new Date()) {
  return new Date(now.getTime() - staleRunMinutes() * 60 * 1000).toISOString();
}

async function closeStaleWeeklyRuns({ year, weekNumber } = {}) {
  const filters = {
    status: 'eq.running',
    started_at: `lt.${staleCutoffIso()}`,
  };

  if (year) filters.year = `eq.${year}`;
  if (weekNumber) filters.week_number = `eq.${weekNumber}`;

  return patch('weekly_update_runs', filters, {
    status: 'failed',
    finished_at: new Date().toISOString(),
    error_message: `Marked failed automatically after ${staleRunMinutes()}+ minutes with no completion. Re-run the update if fresh data is needed.`,
  });
}

async function failRunBeforeTimeout(run, completed, startedAt) {
  if (!run?.id) return null;

  const elapsedSeconds = Math.round((Date.now() - startedAt) / 1000);
  const [failedRun] = await patch('weekly_update_runs', { id: `eq.${run.id}` }, {
    status: 'failed',
    clients_completed: completed,
    finished_at: new Date().toISOString(),
    error_message: `Stopped before Vercel timeout after ${completed}/${run.clients_total || 0} clients (${elapsedSeconds}s). Use a narrower update or re-run to continue refreshing data.`,
  });

  return failedRun;
}

function shouldStopBeforeTimeout(startedAt) {
  return Date.now() - startedAt >= maxRunMs();
}

module.exports = {
  closeStaleWeeklyRuns,
  failRunBeforeTimeout,
  maxRunMs,
  shouldStopBeforeTimeout,
  staleRunMinutes,
};

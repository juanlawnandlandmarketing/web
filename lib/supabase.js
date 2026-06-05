const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

function requireSupabase() {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    const err = new Error('Supabase env vars are missing');
    err.statusCode = 500;
    throw err;
  }
}

function qs(params) {
  return Object.entries(params)
    .filter(([, value]) => value !== undefined && value !== null && value !== '')
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');
}

async function supabaseFetch(path, options = {}) {
  requireSupabase();

  const response = await fetch(`${SUPABASE_URL}/rest/v1${path}`, {
    ...options,
    headers: {
      apikey: SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
      'Content-Type': 'application/json',
      Prefer: options.prefer || 'return=representation',
      ...(options.headers || {}),
    },
  });

  const text = await response.text();
  const payload = text ? JSON.parse(text) : null;

  if (!response.ok) {
    const err = new Error(payload?.message || response.statusText);
    err.statusCode = response.status;
    err.details = payload;
    throw err;
  }

  return payload;
}

function select(table, params = {}) {
  const query = qs(params);
  return supabaseFetch(`/${table}${query ? `?${query}` : ''}`, {
    method: 'GET',
    prefer: '',
  });
}

function upsert(table, body, onConflict) {
  const query = onConflict ? `?on_conflict=${encodeURIComponent(onConflict)}` : '';
  return supabaseFetch(`/${table}${query}`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { Prefer: 'resolution=merge-duplicates,return=representation' },
  });
}

function insert(table, body) {
  return supabaseFetch(`/${table}`, {
    method: 'POST',
    body: JSON.stringify(body),
  });
}

function patch(table, filters, body) {
  const query = qs(filters);
  return supabaseFetch(`/${table}?${query}`, {
    method: 'PATCH',
    body: JSON.stringify(body),
  });
}

module.exports = { select, upsert, insert, patch, qs };

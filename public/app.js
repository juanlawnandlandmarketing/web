'use strict';

/* ── State ───────────────────────────────────────────────── */
const S = {
  clients: [],
  view: 'weekly',
  clientId: null,
  search: '',
  sort: 'value',
  kwSort: 'opportunity',
  expandedKw: null,
  loading: false,
  checking: false,
  auditing: false,
  weekly: null,
  weeklyLoading: false,
  weeklyRunning: false,
  selectedYear: new Date().getFullYear(),
  selectedWeek: getIsoWeek(new Date()).week,
};

/* ── API ─────────────────────────────────────────────────── */
const api = {
  async get(u){const r=await fetch(u);if(!r.ok)throw new Error(await r.text());return r.json();},
  async post(u,b){const r=await fetch(u,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(b||{})});if(!r.ok){const e=await r.json().catch(()=>({error:r.statusText}));throw new Error(e.error||r.statusText);}return r.json();},
  async del(u){const r=await fetch(u,{method:'DELETE'});if(!r.ok)throw new Error(await r.text());return r.json();},
  clients(){return this.get('/api/clients');},
  createClient(d){return this.post('/api/clients',d);},
  deleteClient(id){return this.del(`/api/clients/${id}`);},
  addKeywords(id,s,a){return this.post(`/api/clients/${id}/keywords`,{services:s,areas:a});},
  deleteKeyword(cid,kid){return this.del(`/api/clients/${cid}/keywords?kid=${kid}`);},
  checkRankings(id){return this.post(`/api/clients/${id}/check`);},
  runAudit(id){return this.post(`/api/clients/${id}/audit`);},
  weekly(year, week){return this.get(`/api/weekly?year=${year}&week_number=${week}`);},
  saveWeekly(year, week, body){return this.post(`/api/weekly?year=${year}&week_number=${week}`, body);},
  runWeekly(year, week){return this.post('/api/weekly/run', { year, week_number: week });},
};

/* ── Helpers ──────────────────────────────────────────────── */
const $=s=>document.querySelector(s);
const h=s=>String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const fmt=n=>n>=1000?(n/1000).toFixed(1)+'k':String(n);
const fmtMoney=n=>n>=1000?'$'+(n/1000).toFixed(1)+'k':'$'+n.toFixed(0);

function tier(pos){if(!pos||pos===0)return'tn';if(pos<=3)return't1';if(pos<=10)return't2';if(pos<=20)return't3';if(pos<=50)return't4';return't5';}
function tierLabel(pos){if(!pos||pos===0)return'—';return'#'+pos;}
function timeAgo(iso){if(!iso)return'Never';const d=new Date(iso),now=new Date(),diff=Math.floor((now-d)/1000);if(diff<60)return'just now';if(diff<3600)return Math.floor(diff/60)+'m ago';if(diff<86400)return Math.floor(diff/3600)+'h ago';return d.toLocaleDateString();}
function clientSubtitle(c){return [c.city,c.state].filter(Boolean).join(', ')||c.domain||'';}

function getIsoWeek(input) {
  const date = new Date(Date.UTC(input.getFullYear(), input.getMonth(), input.getDate()));
  const day = date.getUTCDay() || 7;
  date.setUTCDate(date.getUTCDate() + 4 - day);
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  const week = Math.ceil((((date - yearStart) / 86400000) + 1) / 7);
  return { year: date.getUTCFullYear(), week };
}

function weekRange(year, week) {
  const simple = new Date(Date.UTC(year, 0, 1 + (week - 1) * 7));
  const day = simple.getUTCDay();
  const monday = new Date(simple);
  monday.setUTCDate(simple.getUTCDate() - ((day + 6) % 7));
  const sunday = new Date(monday);
  sunday.setUTCDate(monday.getUTCDate() + 6);
  const fmtDate = (date) => date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', timeZone: 'UTC' });
  return `${fmtDate(monday)} - ${fmtDate(sunday)}`;
}

function posChange(curr, prev) {
  if (!prev || !curr) return '';
  const diff = prev - curr; // positive = improved
  if (diff === 0) return '<span class="change neutral">—</span>';
  if (diff > 0) return `<span class="change up">▲${diff}</span>`;
  return `<span class="change down">▼${Math.abs(diff)}</span>`;
}

function kwMetrics(kw) {
  const r = kw.rankings || {};
  const pos = r.position || 0;
  const vol = r.searchVolume || 0;
  const cpc = r.cpc || 0;
  const traffic = r.monthlyTraffic || 0;
  const value = r.trafficValue || 0;
  // Opportunity score: keywords near page 1 with high volume = high opportunity
  let opp = 0;
  if (pos >= 4 && pos <= 20 && vol > 0) {
    opp = Math.round(vol * (21 - pos) / 20); // Higher for closer to #1 + higher volume
  }
  return { pos, vol, cpc, traffic, value, opp };
}

function clientMetrics(c) {
  const kws = c.keywords || [];
  let totalTraffic = 0, totalValue = 0, totalOpp = 0;
  let t3 = 0, t10 = 0, t20 = 0, ranked = 0, unranked = 0;
  let positions = [];
  let bestOpp = null;

  for (const kw of kws) {
    const m = kwMetrics(kw);
    totalTraffic += m.traffic;
    totalValue += m.value;
    totalOpp += m.opp;
    if (m.pos > 0) {
      ranked++;
      positions.push(m.pos);
      if (m.pos <= 3) t3++;
      if (m.pos <= 10) t10++;
      if (m.pos <= 20) t20++;
    } else {
      unranked++;
    }
    // Best opportunity: highest opportunity score
    if (m.opp > 0 && (!bestOpp || m.opp > kwMetrics(bestOpp).opp)) bestOpp = kw;
  }
  const avg = positions.length ? positions.reduce((a,b)=>a+b,0)/positions.length : 0;

  // Health score (0-100): weighted composite
  const audit = c.audit || {};
  const onpageScore = audit.onpage?.score || 0;
  const blRank = audit.backlinks?.rank || 0;
  const health = onpageScore > 0 ? Math.round((onpageScore * 0.6) + (Math.min(blRank, 100) * 0.4)) : 0;

  return { total: kws.length, ranked, unranked, t3, t10, t20, avg, totalTraffic, totalValue, totalOpp, health, bestOpp, onpageScore, blRank };
}

function portfolioMetrics(clients) {
  let kw=0,traffic=0,value=0,t10=0,opp=0;
  for(const c of clients){const m=clientMetrics(c);kw+=m.total;traffic+=m.totalTraffic;value+=m.totalValue;t10+=m.t10;opp+=m.totalOpp;}
  return{clients:clients.length,keywords:kw,traffic,value,top10:t10,opportunities:opp};
}

function distBar(m) {
  const t=m.total||1;
  const p=v=>((v/t)*100).toFixed(1);
  return`<div class="dist-bar"><span class="dist-t3" style="width:${p(m.t3)}%"></span><span class="dist-t10" style="width:${p(m.t10-m.t3)}%"></span><span class="dist-t20" style="width:${p(m.t20-m.t10)}%"></span><span class="dist-un" style="width:${p(m.unranked)}%"></span></div>`;
}

function sortClients(arr) {
  return [...arr].sort((a,b)=>{
    const ma=clientMetrics(a),mb=clientMetrics(b);
    switch(S.sort){
      case'value':return mb.totalValue-ma.totalValue;
      case'opportunity':return mb.totalOpp-ma.totalOpp;
      case'health':return mb.health-ma.health;
      case'worst':return ma.avg-mb.avg||ma.ranked-mb.ranked;
      case'alpha':return a.name.localeCompare(b.name);
      default:return mb.totalValue-ma.totalValue;
    }
  });
}

/* ── Toast ────────────────────────────────────────────────── */
function toast(msg,type='success'){const el=document.createElement('div');el.className=`toast ${type}`;el.textContent=msg;$('#toastRoot').appendChild(el);setTimeout(()=>{el.style.opacity='0';el.style.transform='translateY(8px)';setTimeout(()=>el.remove(),300);},3500);}

/* ── Modal ────────────────────────────────────────────────── */
function openModal(title,body,footer){
  $('#modalRoot').innerHTML=`<div class="modal-overlay" id="modalOverlay"><div class="modal"><div class="modal-header"><h2>${title}</h2><button class="modal-close" id="modalClose">×</button></div><div class="modal-body">${body}</div>${footer?`<div class="modal-footer">${footer}</div>`:''}</div></div>`;
  $('#modalOverlay').addEventListener('click',e=>{if(e.target.id==='modalOverlay')closeModal();});
  $('#modalClose').addEventListener('click',closeModal);
  document.addEventListener('keydown',_escModal);
}
function closeModal(){$('#modalRoot').innerHTML='';document.removeEventListener('keydown',_escModal);}
function _escModal(e){if(e.key==='Escape')closeModal();}

/* ── Navigation ───────────────────────────────────────────── */
function navigate(view,clientId){
  S.view=view;S.clientId=clientId||null;S.expandedKw=null;S.search='';
  document.querySelectorAll('.nav-item').forEach(n=>n.classList.toggle('active',n.dataset.view===view||(view==='detail'&&n.dataset.view==='clients')));
  const bc=$('#breadcrumb');
  if(view==='dashboard')bc.innerHTML='<span class="bc-item">Dashboard</span>';
  else if(view==='weekly')bc.innerHTML='<span class="bc-item">Weekly Ops</span>';
  else if(view==='rankings')bc.innerHTML='<span class="bc-item">Rankings</span>';
  else if(view==='connections')bc.innerHTML='<span class="bc-item">Connections</span>';
  else if(view==='detail'){const c=S.clients.find(x=>x.id===clientId);bc.innerHTML=`<a class="bc-item" href="#" onclick="navigate('dashboard');return false">Dashboard</a><span class="bc-sep">›</span><span class="bc-item">${c?h(c.name):''}</span>`;}
  render();
  if (view === 'weekly') loadWeekly();
}

/* ── Render Router ────────────────────────────────────────── */
function render(){
  const el=$('#content');
  switch(S.view){
    case'dashboard':el.innerHTML=renderDashboard();break;
    case'weekly':el.innerHTML=renderWeekly();break;
    case'rankings':el.innerHTML=renderRankings();break;
    case'connections':el.innerHTML=renderConnections();break;
    case'detail':el.innerHTML=renderDetail();break;
    default:el.innerHTML=renderDashboard();
  }
  bindEvents();
}

/* ── Dashboard ────────────────────────────────────────────── */
function renderDashboard(){
  const ps=portfolioMetrics(S.clients);
  const filtered=S.clients.filter(c=>!S.search||c.name.toLowerCase().includes(S.search.toLowerCase()));
  const sorted=sortClients(filtered);

  return`
    <div class="page-header">
      <div>
        <h1 class="page-title">SEO Command Center</h1>
        <p class="page-subtitle">Strategic ranking intelligence across ${ps.clients} clients.</p>
      </div>
      <div class="last-crawl-notice">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:14px;height:14px"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        <span>Last crawl: ${getLastCrawlTime()}</span>
      </div>
    </div>

    <div class="stats-row">
      <div class="stat-card highlight">
        <div class="stat-label">Monthly Traffic Value</div>
        <div class="stat-value">${fmtMoney(ps.value)}</div>
        <div class="stat-helper">Estimated organic value</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Keywords Tracked</div>
        <div class="stat-value">${ps.keywords}</div>
        <div class="stat-helper">Across all clients</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Est. Monthly Traffic</div>
        <div class="stat-value">${fmt(ps.traffic)}</div>
        <div class="stat-helper">From tracked keywords</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Page 1 Rankings</div>
        <div class="stat-value">${ps.top10}</div>
        <div class="stat-helper">${ps.keywords?Math.round(ps.top10/ps.keywords*100):0}% of tracked</div>
      </div>
    </div>

    <div class="section">
      <div class="section-header">
        <h2 class="section-title">Client Performance</h2>
      </div>
      <div class="table-card">
        <div class="table-toolbar">
          <div class="search-wrap">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input class="search-input" type="text" placeholder="Search clients…" value="${h(S.search)}" id="searchInput" />
          </div>
          <div class="table-actions">
            ${[['value','By Value'],['opportunity','Opportunities'],['alpha','A–Z']].map(([k,l])=>
              `<button class="btn btn-ghost${S.sort===k?' active':''}" onclick="S.sort='${k}';render()">${l}</button>`
            ).join('')}
          </div>
        </div>

        ${sorted.length===0?`<div class="empty-state"><div class="empty-state-icon">📡</div><h3>${S.search?'No matches':'No clients yet'}</h3><p>${S.search?'Try a different search.':'Add your first client to start tracking.'}</p></div>`:`
          <div class="table-scroll">
          <table class="data-table">
            <thead><tr>
              <th>Client</th>
              <th class="num">Keywords</th>
              <th class="num">Traffic Value</th>
              <th class="num">Page 1</th>
              <th class="num">Opportunities</th>
              <th>Distribution</th>
              <th class="num">Health</th>
              <th class="num">Checked</th>
            </tr></thead>
            <tbody>${sorted.map(c=>{
              const m=clientMetrics(c);
              const lastCheck=(c.keywords||[]).reduce((l,k)=>{const t=k.rankings?.checkedAt;return t&&t>(l||'')?t:l;},null);
              const healthClass=m.health>=80?'good':m.health>=50?'ok':m.health>0?'poor':'none';
              return`<tr onclick="navigate('detail','${c.id}')">
                <td><div class="client-name">${h(c.name)}</div><div class="client-location">${h(clientSubtitle(c))}</div></td>
                <td class="num">${m.total}</td>
                <td class="num" style="font-weight:600;color:var(--green)">${m.totalValue>0?fmtMoney(m.totalValue):'—'}</td>
                <td class="num"><span class="rank-badge t2">${m.t10}</span></td>
                <td class="num">${m.totalOpp>0?`<span class="opp-badge">${m.totalOpp}</span>`:'—'}</td>
                <td style="min-width:100px">${distBar(m)}</td>
                <td class="num">${m.health>0?`<span class="health-badge ${healthClass}">${m.health}</span>`:'—'}</td>
                <td class="num" style="white-space:nowrap">${timeAgo(lastCheck)}</td>
              </tr>`}).join('')}
            </tbody>
          </table>
          </div>
        `}
      </div>
    </div>`;
}

/* ── Weekly Ops View ──────────────────────────────────────── */
function weeklyRows() {
  return S.weekly?.clients || [];
}

function latestWeeklyRun() {
  return (S.weekly?.runs || [])[0] || null;
}

function pct(n, total) {
  if (!total) return 0;
  return Math.round((n / total) * 100);
}

function scoreClass(score) {
  if (!score && score !== 0) return 'none';
  if (score >= 85) return 'good';
  if (score >= 70) return 'ok';
  return 'poor';
}

function renderWeekly() {
  const rows = weeklyRows();
  const completed = rows.filter((row) => row.execution?.completed_seo_tasks).length;
  const blogs = rows.filter((row) => row.outputs?.blog_done).length;
  const reports = rows.reduce((sum, row) => sum + Number(row.outputs?.report_sent_count || 0), 0);
  const avgScore = rows.length
    ? Math.round(rows.reduce((sum, row) => sum + Number(row.health?.technical_seo_score || 0), 0) / rows.length)
    : 0;
  const run = latestWeeklyRun();

  return `
    <div class="page-header weekly-header">
      <div>
        <h1 class="page-title">Weekly SEO Command Center</h1>
        <p class="page-subtitle">Global view for Week ${S.selectedWeek}, ${S.selectedYear}. ${weekRange(S.selectedYear, S.selectedWeek)}</p>
      </div>
      <div class="weekly-controls">
        <label class="mini-field">
          <span>Year</span>
          <select id="weeklyYear" class="field-input compact">${[S.selectedYear - 1, S.selectedYear, S.selectedYear + 1].map((year) => `<option value="${year}" ${year === S.selectedYear ? 'selected' : ''}>${year}</option>`).join('')}</select>
        </label>
        <label class="mini-field">
          <span>Week</span>
          <select id="weeklyWeek" class="field-input compact">${Array.from({ length: 53 }, (_, i) => i + 1).map((week) => `<option value="${week}" ${week === S.selectedWeek ? 'selected' : ''}>Week ${week}</option>`).join('')}</select>
        </label>
        <button class="btn btn-primary" onclick="runWeeklyUpdate()" ${S.weeklyRunning ? 'disabled' : ''}>
          ${S.weeklyRunning ? '<span class="loading-spinner"></span> Running...' : 'Run Weekly Update'}
        </button>
      </div>
    </div>

    <div class="run-status ${run?.status || 'idle'}">
      <span class="status-dot"></span>
      <span>${run ? `Last run ${run.status} · ${run.clients_completed || 0}/${run.clients_total || 0} clients · ${timeAgo(run.finished_at || run.started_at)}` : 'No weekly update has been run for this week yet.'}</span>
    </div>

    <div class="stats-row">
      <div class="stat-card highlight">
        <div class="stat-label">SEO Execution</div>
        <div class="stat-value">${pct(completed, rows.length)}%</div>
        <div class="stat-helper">${completed}/${rows.length} clients complete</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Avg Technical Score</div>
        <div class="stat-value">${avgScore || '-'}</div>
        <div class="stat-helper">From selected week snapshots</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Blogs This Week</div>
        <div class="stat-value">${blogs}/${rows.length || 0}</div>
        <div class="stat-helper">Weekly blog production</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Reports Sent</div>
        <div class="stat-value">${reports}</div>
        <div class="stat-helper">Ad hoc reports logged</div>
      </div>
    </div>

    <div class="section">
      <div class="section-header">
        <h2 class="section-title">All SEO Clients</h2>
        <div style="font-size:13px;color:var(--text-muted)">Manual fields save per client for the selected week.</div>
      </div>
      <div class="table-card weekly-table-card">
        ${S.weeklyLoading ? `<div class="empty-state"><div class="loading-spinner"></div><h3>Loading weekly data</h3></div>` : rows.length === 0 ? `
          <div class="empty-state"><div class="empty-state-icon">▣</div><h3>No active clients found</h3><p>Run the schema and add active clients in Supabase first.</p></div>
        ` : `
        <div class="table-scroll">
          <table class="data-table weekly-table">
            <thead>
              <tr>
                <th>Client</th>
                <th>SEO Complete</th>
                <th class="num">Tech Score</th>
                <th class="num">Trend</th>
                <th>Blog</th>
                <th class="num">PRs</th>
                <th class="num">Reports</th>
              </tr>
            </thead>
            <tbody>
              ${rows.map((row) => {
                const exec = row.execution || {};
                const health = row.health || {};
                const trend = row.trend || {};
                const outputs = row.outputs || {};
                const score = health.technical_seo_score;
                return `<tr>
                  <td>
                    <div class="client-name">${h(row.client_name)}</div>
                    <div class="client-location">${h(row.domain || '')}</div>
                  </td>
                  <td>
                    <label class="check-row">
                      <input type="checkbox" ${exec.completed_seo_tasks ? 'checked' : ''} onchange="saveWeeklyClient('${row.id}', 'execution.completed_seo_tasks', this.checked)" />
                      <span>${exec.completed_seo_tasks ? 'Complete' : 'Incomplete'}</span>
                    </label>
                  </td>
                  <td class="num">${score || score === 0 ? `<span class="health-badge ${scoreClass(score)}">${Math.round(score)}</span>` : '-'}</td>
                  <td class="num">
                    <div class="trend-stack">
                      <strong>${trend.ranking_keywords || 0}</strong>
                      <span>${Number(trend.keyword_change || 0) >= 0 ? '+' : ''}${trend.keyword_change || 0} kw</span>
                    </div>
                  </td>
                  <td>
                    <label class="check-row">
                      <input type="checkbox" ${outputs.blog_done ? 'checked' : ''} onchange="saveWeeklyClient('${row.id}', 'outputs.blog_done', this.checked)" />
                      <span>${outputs.blog_done ? 'Done' : 'Open'}</span>
                    </label>
                  </td>
                  <td class="num">
                    <input class="mini-input" type="number" min="0" value="${outputs.prs_published_count || 0}" onchange="saveWeeklyClient('${row.id}', 'outputs.prs_published_count', this.value)" />
                  </td>
                  <td class="num">
                    <input class="mini-input" type="number" min="0" value="${outputs.report_sent_count || 0}" onchange="saveWeeklyClient('${row.id}', 'outputs.report_sent_count', this.value)" />
                  </td>
                </tr>`;
              }).join('')}
            </tbody>
          </table>
        </div>`}
      </div>
    </div>`;
}

async function loadWeekly() {
  S.weeklyLoading = true;
  render();
  try {
    S.weekly = await api.weekly(S.selectedYear, S.selectedWeek);
  } catch (e) {
    toast('Weekly data failed: ' + e.message, 'error');
  }
  S.weeklyLoading = false;
  render();
}

async function runWeeklyUpdate() {
  S.weeklyRunning = true;
  render();
  try {
    const result = await api.runWeekly(S.selectedYear, S.selectedWeek);
    toast(result.note || 'Weekly update saved');
    S.weekly = await api.weekly(S.selectedYear, S.selectedWeek);
  } catch (e) {
    toast('Weekly update failed: ' + e.message, 'error');
  }
  S.weeklyRunning = false;
  render();
}

async function saveWeeklyClient(clientId, path, value) {
  const body = {};
  const [group, field] = path.split('.');
  body[group] = { [field]: value };

  try {
    S.weekly = await api.saveWeekly(S.selectedYear, S.selectedWeek, { client_id: clientId, ...body });
    toast('Saved');
  } catch (e) {
    toast('Save failed: ' + e.message, 'error');
  }
  render();
}

/* ── Rankings View ────────────────────────────────────────── */
function renderRankings(){
  const all=[];
  for(const c of S.clients)for(const kw of(c.keywords||[]))all.push({client:c.name,clientId:c.id,domain:c.domain,...kw});
  const filtered=all.filter(k=>!S.search||k.keyword.toLowerCase().includes(S.search.toLowerCase())||k.client.toLowerCase().includes(S.search.toLowerCase()));
  const sorted=[...filtered].sort((a,b)=>{
    const ma=kwMetrics(a),mb=kwMetrics(b);
    return mb.value-ma.value||(ma.pos||999)-(mb.pos||999);
  });

  return`
    <div class="page-header"><div><h1 class="page-title">All Rankings</h1><p class="page-subtitle">Every keyword sorted by traffic value. Focus on what moves the needle.</p></div></div>
    <div class="table-card">
      <div class="table-toolbar">
        <div class="search-wrap">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input class="search-input" type="text" placeholder="Search keywords or clients…" value="${h(S.search)}" id="searchInput"/>
        </div>
        <div style="font-size:13px;color:var(--text-dim)">${sorted.length} keywords</div>
      </div>
      ${sorted.length===0?`<div class="empty-state"><div class="empty-state-icon">🔍</div><h3>No keywords</h3><p>Add clients and keywords first.</p></div>`:`
        <div class="table-scroll">
        <table class="data-table">
          <thead><tr>
            <th style="width:50px">Pos</th>
            <th>Keyword</th>
            <th>Client</th>
            <th class="num">Volume</th>
            <th class="num">Traffic</th>
            <th class="num">Value</th>
            <th class="num">Checked</th>
          </tr></thead>
          <tbody>${sorted.map(k=>{const m=kwMetrics(k);return`<tr onclick="navigate('detail','${k.clientId}')">
            <td><span class="rank-badge ${tier(m.pos)}">${tierLabel(m.pos)}</span></td>
            <td style="font-weight:500;color:var(--text)">${h(k.keyword)}</td>
            <td>${h(k.client)}</td>
            <td class="num">${m.vol?fmt(m.vol):'—'}</td>
            <td class="num">${m.traffic?fmt(m.traffic)+'/mo':'—'}</td>
            <td class="num" style="color:var(--green);font-weight:600">${m.value?fmtMoney(m.value)+'/mo':'—'}</td>
            <td class="num" style="white-space:nowrap">${timeAgo(k.rankings?.checkedAt)}</td>
          </tr>`}).join('')}
          </tbody>
        </table>
        </div>
      `}
    </div>`;
}

/* ── Client Detail ────────────────────────────────────────── */
function renderDetail(){
  const c=S.clients.find(x=>x.id===S.clientId);
  if(!c)return'<div class="empty-state"><h3>Client not found</h3></div>';
  const m=clientMetrics(c);
  const kws=[...(c.keywords||[])];
  const audit=c.audit||{};

  // Categorize keywords
  const wins=kws.filter(k=>(k.rankings?.position||0)>=1&&(k.rankings?.position||0)<=3).sort((a,b)=>(a.rankings.position)-(b.rankings.position));
  const page1=kws.filter(k=>(k.rankings?.position||0)>=4&&(k.rankings?.position||0)<=10).sort((a,b)=>kwMetrics(b).value-kwMetrics(a).value);
  const opportunities=kws.filter(k=>(k.rankings?.position||0)>=11&&(k.rankings?.position||0)<=20).sort((a,b)=>kwMetrics(b).opp-kwMetrics(a).opp);
  const deepRanked=kws.filter(k=>(k.rankings?.position||0)>20).sort((a,b)=>kwMetrics(b).vol-kwMetrics(a).vol);
  const notRanking=kws.filter(k=>!k.rankings?.position||k.rankings.position===0);

  return`
    <div class="detail-header">
      <div class="detail-info">
        <h1>${h(c.name)}</h1>
        <div class="detail-meta">
          <span>${h(c.city)}, ${h(c.state)}</span>
          ${c.website?`<a href="${h(c.website)}" target="_blank">${h(c.domain)}</a>`:''}
        </div>
      </div>
      <div class="detail-actions">
        <button class="btn btn-primary" onclick="checkRankings('${c.id}')" ${S.checking?'disabled':''}>
          ${S.checking?'<span class="loading-spinner"></span> Checking…':'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg> Check Rankings'}
        </button>
        <button class="btn btn-outline" onclick="runAudit('${c.id}')" ${S.auditing?'disabled':''}>
          ${S.auditing?'<span class="loading-spinner"></span> Auditing…':'Site Audit'}
        </button>
        <button class="btn btn-outline" onclick="showAddKeywordsModal('${c.id}')">Add Keywords</button>
        <a class="btn btn-ghost" href="https://groundcontrol.agency" target="_blank" style="font-size:12px">Manage in Ground Control ↗</a>
      </div>
    </div>

    <div class="stats-row">
      <div class="stat-card highlight">
        <div class="stat-label">Traffic Value</div>
        <div class="stat-value">${fmtMoney(m.totalValue)}<span style="font-size:14px;font-weight:400">/mo</span></div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Est. Traffic</div>
        <div class="stat-value">${fmt(m.totalTraffic)}<span style="font-size:14px;font-weight:400">/mo</span></div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Page 1</div>
        <div class="stat-value">${m.t10}<span style="font-size:14px;font-weight:400;color:var(--text-dim)"> / ${m.total}</span></div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Avg Position</div>
        <div class="stat-value">${m.avg?m.avg.toFixed(1):'—'}</div>
      </div>
      ${m.health>0?`<div class="stat-card">
        <div class="stat-label">Health Score</div>
        <div class="stat-value">${m.health}</div>
        <div class="stat-helper">On-page: ${m.onpageScore} · Authority: ${m.blRank}</div>
      </div>`:''}
    </div>

    ${audit.backlinks?`
    <div class="section">
      <div class="section-header"><h2 class="section-title">Site Intelligence</h2><div class="table-actions"><span style="font-size:12px;color:var(--text-dim)">Audited ${timeAgo(audit.auditedAt)}</span></div></div>
      <div class="intel-cards">
        <div class="intel-card">
          <div class="intel-label">Domain Authority</div>
          <div class="intel-value">${audit.backlinks.rank}</div>
        </div>
        <div class="intel-card">
          <div class="intel-label">Backlinks</div>
          <div class="intel-value">${audit.backlinks.total}</div>
        </div>
        <div class="intel-card">
          <div class="intel-label">Referring Domains</div>
          <div class="intel-value">${audit.backlinks.referringDomains}</div>
        </div>
        ${audit.onpage?`
        <div class="intel-card">
          <div class="intel-label">On-Page Score</div>
          <div class="intel-value">${Math.round(audit.onpage.score)}</div>
        </div>
        <div class="intel-card">
          <div class="intel-label">Pages Crawled</div>
          <div class="intel-value">${audit.onpage.pagesCrawled}</div>
        </div>
        <div class="intel-card">
          <div class="intel-label">Broken Links</div>
          <div class="intel-value">${audit.onpage.brokenLinks}</div>
        </div>`:''}
      </div>
    </div>`:''}

    ${opportunities.length>0?`
    <div class="section">
      <div class="section-header">
        <h2 class="section-title">🎯 Opportunities — Almost Page 1</h2>
        <div style="font-size:13px;color:var(--text-muted)">${opportunities.length} keywords ranking #11-20</div>
      </div>
      <div class="table-card">${renderKwTable(c, opportunities, true)}</div>
    </div>`:''}

    ${wins.length>0?`
    <div class="section">
      <div class="section-header">
        <h2 class="section-title">🏆 Wins — Top 3</h2>
        <div style="font-size:13px;color:var(--text-muted)">${wins.length} keywords dominating</div>
      </div>
      <div class="table-card">${renderKwTable(c, wins, false)}</div>
    </div>`:''}

    ${page1.length>0?`
    <div class="section">
      <div class="section-header">
        <h2 class="section-title">✅ Page 1 — Positions 4-10</h2>
        <div style="font-size:13px;color:var(--text-muted)">${page1.length} keywords on page 1</div>
      </div>
      <div class="table-card">${renderKwTable(c, page1, false)}</div>
    </div>`:''}

    ${deepRanked.length>0?`
    <div class="section">
      <div class="section-header">
        <h2 class="section-title">📉 Deep Rankings — Page 2+</h2>
        <div style="font-size:13px;color:var(--text-muted)">${deepRanked.length} keywords need work</div>
      </div>
      <div class="table-card">${renderKwTable(c, deepRanked, false)}</div>
    </div>`:''}

    ${notRanking.length>0?`
    <div class="section">
      <div class="section-header">
        <h2 class="section-title">⚫ Not Ranking</h2>
        <div style="font-size:13px;color:var(--text-muted)">${notRanking.length} keywords not found in top 100</div>
      </div>
      <div class="table-card">${renderKwTable(c, notRanking, false)}</div>
    </div>`:''}

    <div class="ai-panel">
      <div class="ai-panel-header"><span style="font-size:20px">⚡</span><h3>AI Recommendations</h3></div>
      <div class="ai-panel-placeholder">
        ${m.totalOpp>0?`<strong>${opportunities.length} opportunity keyword${opportunities.length===1?'':'s'}</strong> are ranking #11-20. These are your fastest path to more traffic. Focus content optimization and link building on these keywords first.`:'Weekly AI-generated recommendations will appear here. Run a ranking check to see opportunities.'}
      </div>
    </div>`;
}

function renderKwTable(c, kws, showOpp) {
  return`<div class="table-scroll"><table class="data-table"><thead><tr>
    <th style="width:55px">Pos</th>
    <th>Keyword</th>
    <th class="num">Volume</th>
    <th class="num">Traffic</th>
    <th class="num">Value</th>
    ${showOpp?'<th class="num">Opp Score</th>':''}
    <th style="width:30px"></th>
  </tr></thead><tbody>${kws.map(k=>{
    const km=kwMetrics(k);
    const expanded=S.expandedKw===k.id;
    const serp=k.rankings?.serp||[];
    return`<tr onclick="toggleSerp('${k.id}')" class="${expanded?'expanded':''}">
      <td><span class="rank-badge ${tier(km.pos)}">${tierLabel(km.pos)}</span> ${posChange(k.rankings?.position, k.rankings?.previousPosition)}</td>
      <td style="font-weight:500;color:var(--text)">${h(k.keyword)}</td>
      <td class="num">${km.vol?fmt(km.vol)+'/mo':'—'}</td>
      <td class="num">${km.traffic?fmt(km.traffic)+'/mo':'—'}</td>
      <td class="num" style="color:var(--green);font-weight:600">${km.value?fmtMoney(km.value)+'/mo':'—'}</td>
      ${showOpp?`<td class="num"><span class="opp-badge">${km.opp}</span></td>`:''}
      <td><button class="btn btn-ghost" onclick="event.stopPropagation();deleteKeyword('${c.id}','${k.id}')" style="padding:2px 6px;color:var(--text-dim);font-size:14px">×</button></td>
    </tr>${expanded&&serp.length>0?`<tr class="serp-row"><td colspan="${showOpp?7:6}">
      <div class="serp-content"><div class="serp-title">SERP Results — "${h(k.keyword)}"</div>
      <div class="serp-list">${serp.map(s=>`<div class="serp-item${s.domain&&c.domain&&s.domain.replace('www.','').includes(c.domain.replace('www.',''))?' is-client':''}">
        <div class="serp-rank">${s.rank}</div><div><div class="serp-domain">${h(s.domain)}</div><div class="serp-item-title">${h(s.title)}</div><div class="serp-desc">${h((s.description||'').substring(0,120))}</div></div>
      </div>`).join('')}</div></div></td></tr>`:''}`}).join('')}</tbody></table></div>`;
}

/* ── Actions ──────────────────────────────────────────────── */
function toggleSerp(id){S.expandedKw=S.expandedKw===id?null:id;render();}

async function checkRankings(id){
  S.checking=true;render();
  try{const d=await api.checkRankings(id);const i=S.clients.findIndex(c=>c.id===id);if(i>=0&&d.client)S.clients[i]=d.client;toast(d.note||'Rankings updated with traffic data!');}
  catch(e){toast('Failed: '+e.message,'error');}
  S.checking=false;render();
}

async function runAudit(id){
  S.auditing=true;render();
  try{const d=await api.runAudit(id);const i=S.clients.findIndex(c=>c.id===id);if(i>=0&&d.client)S.clients[i]=d.client;toast(d.note||'Site audit complete!');}
  catch(e){toast('Failed: '+e.message,'error');}
  S.auditing=false;render();
}

async function deleteClient(id){if(!confirm('Delete this client and all data?'))return;try{await api.deleteClient(id);S.clients=S.clients.filter(c=>c.id!==id);toast('Client deleted');navigate('dashboard');}catch(e){toast('Failed: '+e.message,'error');}}
async function deleteKeyword(cid,kid){if(!confirm('Remove this keyword?'))return;try{await api.deleteKeyword(cid,kid);const c=S.clients.find(x=>x.id===cid);if(c)c.keywords=c.keywords.filter(k=>k.id!==kid);toast('Keyword removed');render();}catch(e){toast('Failed: '+e.message,'error');}}

/* ── Modals ───────────────────────────────────────────────── */
const US_STATES='AL,AK,AZ,AR,CA,CO,CT,DE,FL,GA,HI,ID,IL,IN,IA,KS,KY,LA,ME,MD,MA,MI,MN,MS,MO,MT,NE,NV,NH,NJ,NM,NY,NC,ND,OH,OK,OR,PA,RI,SC,SD,TN,TX,UT,VT,VA,WA,WV,WI,WY,DC'.split(',');

function showAddClientModal(){
  openModal('Add Client',`
    <div class="field"><label class="field-label">Client Name</label><input class="field-input" id="acName" placeholder="e.g. Coastal Hardscapes"/></div>
    <div class="field"><label class="field-label">Website URL</label><input class="field-input" id="acWebsite" placeholder="e.g. https://coastalhardscapes.com"/></div>
    <div class="field-row">
      <div class="field"><label class="field-label">City</label><input class="field-input" id="acCity" placeholder="e.g. Clearwater"/></div>
      <div class="field"><label class="field-label">State</label><select class="field-input" id="acState"><option value="">Select…</option>${US_STATES.map(s=>`<option value="${s}">${s}</option>`).join('')}</select></div>
    </div>`,
    `<button class="btn btn-ghost" onclick="closeModal()">Cancel</button><button class="btn btn-primary" onclick="submitAddClient()">Create Client</button>`);
  setTimeout(()=>$('#acName')?.focus(),100);
}

async function submitAddClient(){
  const name=$('#acName')?.value?.trim(),website=$('#acWebsite')?.value?.trim(),city=$('#acCity')?.value?.trim(),state=$('#acState')?.value;
  if(!name||!city||!state){toast('Name, city, and state required','error');return;}
  try{const d=await api.createClient({name,website,city,state});S.clients.push(d.client||d);closeModal();toast(`${name} added!`);render();}catch(e){toast('Failed: '+e.message,'error');}
}

function showAddKeywordsModal(clientId){
  openModal('Add Keywords',`
    <p style="font-size:14px;color:var(--text-muted);margin-bottom:20px">Enter services and service areas — we auto-generate every combination.</p>
    <div class="field-row">
      <div class="field"><label class="field-label">Services (one per line)</label><textarea class="field-input" id="akServices" placeholder="lawn care&#10;landscaping&#10;tree trimming" oninput="previewKeywords()"></textarea></div>
      <div class="field"><label class="field-label">Service Areas (one per line)</label><textarea class="field-input" id="akAreas" placeholder="Tampa&#10;Clearwater&#10;St Petersburg" oninput="previewKeywords()"></textarea></div>
    </div>
    <div id="kwPreview"></div>`,
    `<button class="btn btn-ghost" onclick="closeModal()">Cancel</button><button class="btn btn-primary" id="akSubmit" onclick="submitAddKeywords('${clientId}')">Add Keywords</button>`);
}

function previewKeywords(){
  const svcs=($('#akServices')?.value||'').split('\n').map(s=>s.trim()).filter(Boolean);
  const areas=($('#akAreas')?.value||'').split('\n').map(s=>s.trim()).filter(Boolean);
  const combos=[];for(const s of svcs)for(const a of areas)combos.push(`${s} ${a}`);
  const el=$('#kwPreview');if(!el)return;
  if(!combos.length){el.innerHTML='';return;}
  el.innerHTML=`<div class="kw-preview"><div class="kw-preview-header">${combos.length} keyword${combos.length===1?'':'s'} will be generated</div><div class="kw-preview-tags">${combos.slice(0,30).map(k=>`<span class="kw-tag">${h(k)}</span>`).join('')}${combos.length>30?`<span class="kw-tag" style="opacity:0.5">+${combos.length-30} more</span>`:''}</div></div>`;
}

async function submitAddKeywords(clientId){
  const svcs=($('#akServices')?.value||'').split('\n').map(s=>s.trim()).filter(Boolean);
  const areas=($('#akAreas')?.value||'').split('\n').map(s=>s.trim()).filter(Boolean);
  if(!svcs.length||!areas.length){toast('Need at least one service and one area','error');return;}
  try{const d=await api.addKeywords(clientId,svcs,areas);const i=S.clients.findIndex(c=>c.id===clientId);if(i>=0&&d.client)S.clients[i]=d.client;closeModal();toast(`${svcs.length*areas.length} keywords added!`);render();}catch(e){toast('Failed: '+e.message,'error');}
}

/* ── Helper: Last Crawl Time ──────────────────────────────── */
function getLastCrawlTime() {
  let latest = null;
  for (const c of S.clients) {
    for (const kw of (c.keywords || [])) {
      const t = kw.rankings?.checkedAt;
      if (t && (!latest || t > latest)) latest = t;
    }
  }
  return latest ? timeAgo(latest) : 'Never';
}

/* ── Connections View ─────────────────────────────────────── */
function renderConnections() {
  var integrations = [
    { name:'DataForSEO', desc:'SERP rankings, keyword volume, backlinks, on-page audits', status:'connected', icon:'🔍', detail:'SERP API · Keywords API · Backlinks API · On-Page API', lastUsed:getLastCrawlTime(), cost:'$0.002/SERP query · $0.075/volume batch · $0.02/backlink check' },
    { name:'Ground Control', desc:'Client management — add/remove clients, manage client data', status:'connected', icon:'🎮', detail:'Clients sync from groundcontrol.agency', lastUsed:'—', cost:'Free (internal)' },
    { name:'Google Search Console', desc:'Real impressions, clicks, CTR, actual search queries, indexing status', status:'not_connected', icon:'📊', detail:'Would provide: real click data (not estimates), actual queries users search, index coverage, Core Web Vitals, crawl errors', requirements:'OAuth2 connection per client property, or API key with domain verification' },
    { name:'Google Analytics 4', desc:'Actual traffic, conversions, bounce rate, user behavior', status:'not_connected', icon:'📈', detail:'Would provide: real organic traffic numbers, conversion tracking, landing page performance, user flow, goal completions', requirements:'GA4 API access via service account or OAuth2 per client property' },
    { name:'Google Business Profile', desc:'Map Pack visibility, reviews, calls, direction requests', status:'not_connected', icon:'📍', detail:'Would provide: GBP views, search vs discovery queries, photo views, call clicks, direction requests, review monitoring, Map Pack position', requirements:'GBP API access (requires Google Business Profile API enablement + OAuth2)' },
    { name:'Google PageSpeed Insights', desc:'Core Web Vitals, performance scores, mobile usability', status:'available', icon:'⚡', detail:'Free API — no auth needed. Provides: performance score, LCP, FID, CLS, accessibility score, SEO score', requirements:'Just needs an API key (free tier: 25K queries/day)' },
    { name:'Screaming Frog / Sitebulb', desc:'Deep technical SEO crawl data', status:'not_connected', icon:'🕷️', detail:'Would provide: full site architecture, internal linking, redirect chains, canonical issues, thin content detection', requirements:'Desktop tool — would need export integration or API bridge' },
  ];

  var connected = integrations.filter(function(i){return i.status==='connected';});
  var available = integrations.filter(function(i){return i.status==='available';});
  var notConnected = integrations.filter(function(i){return i.status==='not_connected';});

  var html = '<div class="page-header"><div><h1 class="page-title">Connections</h1><p class="page-subtitle">Data sources powering the SEO Command Center.</p></div></div>';

  html += '<div class="section"><div class="section-header"><h2 class="section-title" style="color:var(--green)">✓ Active Connections</h2></div><div class="connections-grid">';
  connected.forEach(function(i){ html += cardHtml(i); });
  html += '</div></div>';

  if (available.length > 0) {
    html += '<div class="section"><div class="section-header"><h2 class="section-title" style="color:#60a5fa">⚡ Ready to Connect</h2></div><div class="connections-grid">';
    available.forEach(function(i){ html += cardHtml(i); });
    html += '</div></div>';
  }

  html += '<div class="section"><div class="section-header"><h2 class="section-title" style="color:var(--text-muted)">Planned Integrations</h2></div><div class="connections-grid">';
  notConnected.forEach(function(i){ html += cardHtml(i); });
  html += '</div></div>';

  html += '<div class="ai-panel"><div class="ai-panel-header"><span style="font-size:20px">💡</span><h3>Integration Roadmap</h3></div>';
  html += '<div class="ai-panel-placeholder" style="text-align:left">';
  html += '<strong>Highest Impact (connect first):</strong><br>';
  html += '1. <strong>Google Search Console</strong> — Gives us REAL click/impression data instead of estimates. Transforms the dashboard from best guess to actual performance.<br>';
  html += '2. <strong>Google Business Profile</strong> — For local businesses, Map Pack > organic. GBP data shows calls, directions, views — actual business outcomes.<br>';
  html += '3. <strong>PageSpeed Insights</strong> — Free, no auth, instant. Core Web Vitals affect rankings directly.<br><br>';
  html += '<strong>Already available:</strong> PageSpeed Insights API is free and requires no auth. Can add Core Web Vitals scoring immediately.';
  html += '</div></div>';

  return html;
}

/* ── Events ───────────────────────────────────────────────── */
function bindEvents(){
  const si=$('#searchInput');
  if(si){si.addEventListener('input',e=>{S.search=e.target.value;render();});const l=si.value.length;si.focus();si.setSelectionRange(l,l);}
  const wy=$('#weeklyYear');
  const ww=$('#weeklyWeek');
  if(wy)wy.addEventListener('change',e=>{S.selectedYear=Number(e.target.value);loadWeekly();});
  if(ww)ww.addEventListener('change',e=>{S.selectedWeek=Number(e.target.value);loadWeekly();});
}

/* ── Init ─────────────────────────────────────────────────── */
async function init(){
  document.querySelectorAll('.nav-item[data-view]').forEach(el=>{el.addEventListener('click',e=>{e.preventDefault();if(el.classList.contains('disabled'))return;navigate(el.dataset.view);});});
  $('#mobileMenuBtn')?.addEventListener('click',()=>$('#sidebar').classList.toggle('open'));
  $('#sidebarToggle')?.addEventListener('click',()=>{const sb=$('#sidebar'),mw=$('#mainWrapper');sb.style.transform='translateX(-100%)';mw.style.marginLeft='0';const btn=document.createElement('button');btn.className='btn btn-ghost';btn.style.cssText='position:fixed;left:12px;top:12px;z-index:150;background:var(--surface);border:1px solid var(--border);border-radius:var(--radius-sm)';btn.innerHTML='☰';btn.onclick=()=>{sb.style.transform='';mw.style.marginLeft='';btn.remove();};document.body.appendChild(btn);});
  try{const d=await api.clients();S.clients=d.clients||d||[];}catch(e){S.clients=[];console.error(e);}
  render();
  if (S.view === 'weekly') loadWeekly();
}

window.navigate=navigate;window.showAddClientModal=showAddClientModal;window.submitAddClient=submitAddClient;
window.showAddKeywordsModal=showAddKeywordsModal;window.submitAddKeywords=submitAddKeywords;window.previewKeywords=previewKeywords;
window.checkRankings=checkRankings;window.runAudit=runAudit;window.deleteClient=deleteClient;window.deleteKeyword=deleteKeyword;window.toggleSerp=toggleSerp;
window.runWeeklyUpdate=runWeeklyUpdate;window.saveWeeklyClient=saveWeeklyClient;
document.addEventListener('DOMContentLoaded',init);

'use strict';

/* ── State ───────────────────────────────────────────────── */
const S = {
  clients: [],
  view: 'dashboard',
  clientId: null,
  search: '',
  sort: 'value',
  kwSort: 'opportunity',
  expandedKw: null,
  loading: false,
  checking: false,
  auditing: false,
  auditingClientId: null,
  weekly: null,
  weeklyLoading: false,
  weeklyRunning: false,
  fulfillmentCategory: 'weekly',
  connections: null,
  connectionsLoading: false,
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
  connections(){return this.get('/api/connections');},
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

const FULFILLMENT_CATEGORIES = {
  oneTime: {
    label: 'One-Time Fulfillment',
    shortLabel: 'One-Time',
    cadence: 'Setup and launch hardening',
    description: 'Foundation tasks that should be completed once per client, then revisited only when the site or GBP setup changes.',
    tasks: [
      'Onsite Core Content Optimization',
      'SEO Images Optimization',
      'Clients Reviews Integration',
      'Clear NAP Listings',
      'Schema Implementation',
      'Sitemap',
      'Pre-Launch Website GBP Optimization',
      'Post-Launch Website GBP Optimization',
      'Citation Building',
      'Robots.txt File Management',
      'Media Room Configuration',
      'llms.txt configuration',
    ],
  },
  monthly: {
    label: 'Monthly Fulfillment',
    shortLabel: 'Monthly',
    cadence: 'Recurring monthly production',
    description: 'Monthly authority, reporting, indexing, performance, and site-health work.',
    tasks: [
      'Press Releases (2/Month)',
      'Backlink Acquisition',
      'Page Speed & Performance',
      'Website Security',
      'Monthly Report Tracking & Reporting',
      'GSC Indexing Audit',
    ],
  },
  weekly: {
    label: 'Weekly Fulfillment',
    shortLabel: 'Weekly',
    cadence: 'Recurring weekly execution',
    description: 'Weekly production and audit loop for content, GBP, rankings, technical health, and reviews.',
    tasks: [
      'Blog Content Creation (1/Week) Published + Audited',
      'GBP Audit and Image Post',
      'Technical SEO Audit',
      'SEO Ranking performance (local + search)',
      'Review Generation tracker',
    ],
  },
};

function techMetrics(c) {
  const health = c.weeklyHealth || {};
  const audit = c.audit?.onpage || {};
  const raw = health.raw_audit_json || {};
  const score = Number(health.technical_seo_score ?? audit.score ?? 0);
  const verified = Number(health.verified_seo_score ?? audit.verifiedSeoScore ?? 0);
  const healthScore = Number(health.health_score ?? 0);
  const pages = Number(health.pages_crawled ?? audit.pagesCrawled ?? 0);
  const clean = Number(health.clean_pages ?? audit.cleanPages ?? 0);
  const critical = Number(health.critical_error_count ?? audit.brokenLinks ?? 0);
  const metadata = raw.metadata_hygiene_score ?? audit.metadataHygieneScore ?? null;
  const speed = raw.speed_score ?? audit.speedScore ?? null;
  const sitemap = raw.sitemap_score ?? audit.sitemapScore ?? null;
  return { score, verified, healthScore, pages, clean, critical, metadata, speed, sitemap, crawledAt: health.last_crawled_at || c.audit?.auditedAt || health.created_at || null };
}

function portfolioTechMetrics(clients) {
  const rows = clients.map(techMetrics).filter((m) => m.score || m.pages);
  const sum = (field) => rows.reduce((total, row) => total + Number(row[field] || 0), 0);
  return {
    clients: clients.length,
    withSnapshots: rows.length,
    avgScore: rows.length ? Math.round(sum('score') / rows.length) : 0,
    pages: sum('pages'),
    clean: sum('clean'),
    critical: sum('critical'),
  };
}

function fmtScore(value) {
  return value || value === 0 ? Math.round(Number(value)) : '-';
}

function pctScore(value) {
  return value || value === 0 ? `${Math.round(Number(value))}%` : '-';
}

function issueSeverity(value, warningAt = 70, criticalAt = 50) {
  if (value === null || value === undefined || value === '') return 'unknown';
  const n = Number(value);
  if (n < criticalAt) return 'critical';
  if (n < warningAt) return 'warning';
  return 'good';
}

function buildClientIssues(c) {
  const m = techMetrics(c);
  const raw = c.weeklyHealth?.raw_audit_json || {};
  const dirtyPages = Math.max(0, Number(m.pages || 0) - Number(m.clean || 0));
  const issues = [];

  if (m.critical > 0) {
    issues.push({
      severity: 'critical',
      title: `${m.critical} critical technical issue${m.critical === 1 ? '' : 's'}`,
      metric: `${m.critical} open`,
      why: 'These are the highest-risk crawl findings in the latest technical snapshot.',
      fix: 'Review the flagged pages first, resolve broken links, missing indexable elements, bad redirects, or crawl-blocking problems, then rerun the weekly update.',
      scope: `${dirtyPages || m.critical} affected page${dirtyPages === 1 ? '' : 's'} indicated by the clean-page gap`,
    });
  }

  if (m.metadata !== null && m.metadata !== undefined && Number(m.metadata) < 70) {
    const sev = issueSeverity(m.metadata, 70, 50);
    issues.push({
      severity: sev,
      title: 'Metadata hygiene needs work',
      metric: pctScore(m.metadata),
      why: 'Low metadata hygiene usually means weak or missing title tags, meta descriptions, or page-level SEO structure.',
      fix: 'Audit titles and descriptions on service and service-area pages. Rewrite duplicates, add missing descriptions, and align titles to the target service plus city.',
      scope: `${m.pages || 0} crawled page${Number(m.pages) === 1 ? '' : 's'}`,
    });
  }

  if (raw.seo_quality_score !== null && raw.seo_quality_score !== undefined && Number(raw.seo_quality_score) < 85) {
    issues.push({
      severity: issueSeverity(raw.seo_quality_score, 85, 70),
      title: 'SEO quality below target',
      metric: pctScore(raw.seo_quality_score),
      why: 'The page set is passing the crawl, but the on-page SEO quality is not strong enough for a clean weekly pass.',
      fix: 'Tighten H1/H2 structure, add service-specific copy where pages are thin, improve internal links to money pages, and confirm each page has a clear local intent.',
      scope: `${m.pages || 0} crawled page${Number(m.pages) === 1 ? '' : 's'}`,
    });
  }

  if (m.speed !== null && m.speed !== undefined && Number(m.speed) < 80) {
    issues.push({
      severity: issueSeverity(m.speed, 80, 60),
      title: 'Speed score below target',
      metric: pctScore(m.speed),
      why: 'Slow pages weaken conversion and can drag organic performance, especially on mobile.',
      fix: 'Compress oversized images, defer non-critical scripts, reduce third-party embeds, and rerun PageSpeed after changes.',
      scope: c.domain || 'Client site',
    });
  }

  if (m.sitemap !== null && m.sitemap !== undefined && Number(m.sitemap) < 90) {
    issues.push({
      severity: issueSeverity(m.sitemap, 90, 70),
      title: 'Sitemap/indexing signal needs review',
      metric: pctScore(m.sitemap),
      why: 'Weak sitemap signals can mean important URLs are missing, stale, or harder for Google to discover.',
      fix: 'Check sitemap.xml, robots.txt, canonical tags, and whether priority service pages are indexable.',
      scope: c.domain || 'Client site',
    });
  }

  if (!issues.length) {
    issues.push({
      severity: 'good',
      title: 'No critical technical items in the latest snapshot',
      metric: 'Clean',
      why: 'The current crawl snapshot does not show urgent technical blockers.',
      fix: 'Keep this client in maintenance mode: verify weekly output completion, watch rankings, and only escalate if scores drop.',
      scope: `${m.clean || 0}/${m.pages || 0} clean pages`,
    });
  }

  return issues.sort((a, b) => {
    const order = { critical: 0, warning: 1, unknown: 2, good: 3 };
    return (order[a.severity] ?? 9) - (order[b.severity] ?? 9);
  });
}

function renderIssueCard(issue, index) {
  return `
    <div class="issue-card ${issue.severity}">
      <div class="issue-rank">${index + 1}</div>
      <div class="issue-body">
        <div class="issue-topline">
          <h3>${h(issue.title)}</h3>
          <span class="issue-pill ${issue.severity}">${h(issue.metric)}</span>
        </div>
        <p>${h(issue.why)}</p>
        <div class="issue-fix"><strong>Fix:</strong> ${h(issue.fix)}</div>
        <div class="issue-scope">${h(issue.scope)}</div>
      </div>
    </div>`;
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
  if (view === 'clients') view = 'dashboard';
  S.view=view;S.clientId=clientId||null;S.expandedKw=null;S.search='';
  document.querySelectorAll('.nav-item').forEach(n=>n.classList.toggle('active',n.dataset.view===view||(view==='detail'&&n.dataset.view==='dashboard')));
  const bc=$('#breadcrumb');
  if(view==='dashboard')bc.innerHTML='<span class="bc-item">Dashboard</span>';
  else if(view==='weekly')bc.innerHTML='<span class="bc-item">Fulfillment Ops</span>';
  else if(view==='rankings')bc.innerHTML='<span class="bc-item">Rankings</span>';
  else if(view==='connections')bc.innerHTML='<span class="bc-item">Connections</span>';
  else if(view==='detail'){const c=S.clients.find(x=>x.id===clientId);bc.innerHTML=`<a class="bc-item" href="#" onclick="navigate('dashboard');return false">Dashboard</a><span class="bc-sep">›</span><span class="bc-item">${c?h(c.name):''}</span>`;}
  render();
  if (view === 'weekly') loadWeekly();
  if (view === 'connections') loadConnections();
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
  const ts=portfolioTechMetrics(S.clients);
  const hasKeywordData = ps.keywords > 0;
  const filtered=S.clients.filter(c=>!S.search||c.name.toLowerCase().includes(S.search.toLowerCase()));
  const sorted=hasKeywordData ? sortClients(filtered) : [...filtered].sort((a,b)=>techMetrics(b).score-techMetrics(a).score||a.name.localeCompare(b.name));

  return`
    <div class="page-header">
      <div>
        <h1 class="page-title">SEO Command Center</h1>
        <p class="page-subtitle">Real technical SEO intelligence across ${ps.clients} active Lawn & Land clients.</p>
      </div>
      <div class="last-crawl-notice">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:14px;height:14px"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        <span>Last crawl: ${getLastCrawlTime()}</span>
      </div>
    </div>

    <div class="stats-row">
      <div class="stat-card highlight">
        <div class="stat-label">Avg Technical Score</div>
        <div class="stat-value">${ts.avgScore || '-'}</div>
        <div class="stat-helper">${ts.withSnapshots}/${ts.clients} clients with real snapshots</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Pages Crawled</div>
        <div class="stat-value">${fmt(ts.pages)}</div>
        <div class="stat-helper">Latest technical crawl set</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Clean Pages</div>
        <div class="stat-value">${fmt(ts.clean)}</div>
        <div class="stat-helper">${ts.pages ? pct(ts.clean, ts.pages) : 0}% of crawled pages</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Critical Issues</div>
        <div class="stat-value">${ts.critical}</div>
        <div class="stat-helper">Across current snapshots</div>
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
              <th class="num">Tech Score</th>
              <th class="num">Verified SEO</th>
              <th class="num">Pages</th>
              <th class="num">Clean</th>
              <th class="num">Critical</th>
              <th class="num">Metadata</th>
              <th class="num">Speed</th>
              <th class="num">Crawled</th>
            </tr></thead>
            <tbody>${sorted.map(c=>{
              const m=techMetrics(c);
              const healthClass=scoreClass(m.score);
              return`<tr onclick="navigate('detail','${c.id}')">
                <td><div class="client-name">${h(c.name)}</div><div class="client-location">${h(clientSubtitle(c))}</div></td>
                <td class="num">${m.score || m.score === 0 ? `<span class="health-badge ${healthClass}">${fmtScore(m.score)}</span>`:'-'}</td>
                <td class="num">${fmtScore(m.verified)}</td>
                <td class="num">${m.pages || '-'}</td>
                <td class="num">${m.clean || '-'}</td>
                <td class="num">${m.critical ? `<span class="issue-count">${m.critical}</span>` : '0'}</td>
                <td class="num">${m.metadata || m.metadata === 0 ? fmtScore(m.metadata) : '-'}</td>
                <td class="num">${m.speed || m.speed === 0 ? fmtScore(m.speed) : '-'}</td>
                <td class="num" style="white-space:nowrap">${timeAgo(m.crawledAt)}</td>
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

function fulfillmentStats(rows) {
  const completed = rows.filter((row) => row.execution?.completed_seo_tasks).length;
  const blogs = rows.filter((row) => row.outputs?.blog_done).length;
  const reports = rows.reduce((sum, row) => sum + Number(row.outputs?.report_sent_count || 0), 0);
  const prs = rows.reduce((sum, row) => sum + Number(row.outputs?.prs_published_count || 0), 0);
  const ranked = rows.filter((row) => {
    const source = row.trend?.raw_dataforseo_json?.source || '';
    return source === 'dataforseo_labs_ranked_keywords' && Number(row.trend?.ranking_keywords || 0) > 0;
  }).length;
  const critical = rows.reduce((sum, row) => sum + Number(row.health?.critical_error_count || 0), 0);
  const avgScore = rows.length
    ? Math.round(rows.reduce((sum, row) => sum + Number(row.health?.technical_seo_score || 0), 0) / rows.length)
    : 0;
  return { completed, blogs, reports, prs, ranked, critical, avgScore };
}

function renderFulfillmentTabs(rows) {
  const stats = fulfillmentStats(rows);
  const meta = {
    oneTime: `${FULFILLMENT_CATEGORIES.oneTime.tasks.length} setup tasks`,
    monthly: `${stats.prs} PRs logged · ${stats.reports} reports`,
    weekly: `${stats.blogs}/${rows.length || 0} blogs · ${stats.ranked}/${rows.length || 0} ranking pulls`,
  };
  return `<div class="fulfillment-tabs">
    ${Object.entries(FULFILLMENT_CATEGORIES).map(([key, category]) => `
      <button class="fulfillment-tab ${S.fulfillmentCategory === key ? 'active' : ''}" onclick="setFulfillmentCategory('${key}')">
        <span>${h(category.shortLabel)}</span>
        <strong>${h(category.label)}</strong>
        <small>${h(meta[key])}</small>
      </button>
    `).join('')}
  </div>`;
}

function renderFulfillmentTasks(category) {
  return `<div class="fulfillment-task-card">
    <div class="section-header">
      <div>
        <h2 class="section-title">${h(category.label)} Tasks</h2>
        <p class="section-note">${h(category.description)}</p>
      </div>
      <span class="cadence-pill">${h(category.cadence)}</span>
    </div>
    <div class="task-chip-grid">
      ${category.tasks.map((task, index) => `
        <div class="task-chip">
          <span>${index + 1}</span>
          <strong>${h(task)}</strong>
        </div>
      `).join('')}
    </div>
  </div>`;
}

function fulfillmentStatus(label, detail, tone = 'pending') {
  return `<div class="fulfillment-status ${tone}">
    <strong>${h(label)}</strong>
    <span>${h(detail)}</span>
  </div>`;
}

function renderOneTimeCells(row) {
  const health = row.health || {};
  const score = Number(health.technical_seo_score || 0);
  const hasCrawl = Boolean(health.crawl_status || health.pages_crawled);
  return `
    <td>${fulfillmentStatus(score >= 70 ? 'Audit Ready' : 'Needs Review', score ? `Tech score ${Math.round(score)}` : 'No score yet', score >= 70 ? 'done' : 'pending')}</td>
    <td>${fulfillmentStatus('NAP / Schema', 'Manual setup lane', 'pending')}</td>
    <td>${fulfillmentStatus(hasCrawl ? 'Site Files Review' : 'Needs Crawl', hasCrawl ? 'Sitemap, robots, llms.txt' : 'Run crawl first', hasCrawl ? 'active' : 'pending')}</td>
    <td>${fulfillmentStatus('GBP / Citations', 'Pre-launch, post-launch, citations', 'pending')}</td>
    <td><button class="btn btn-ghost" onclick="navigate('detail','${row.id}')">Open Client</button></td>`;
}

function renderMonthlyCells(row) {
  const outputs = row.outputs || {};
  const prs = Number(outputs.prs_published_count || 0);
  const reports = Number(outputs.report_sent_count || 0);
  return `
    <td class="num"><input class="mini-input" type="number" min="0" value="${prs}" onchange="saveWeeklyClient('${row.id}', 'outputs.prs_published_count', this.value)" /></td>
    <td>${fulfillmentStatus('Backlinks', 'Acquisition queue', 'pending')}</td>
    <td>${fulfillmentStatus('Performance / Security', 'Review monthly', 'pending')}</td>
    <td class="num"><input class="mini-input" type="number" min="0" value="${reports}" onchange="saveWeeklyClient('${row.id}', 'outputs.report_sent_count', this.value)" /></td>
    <td>${fulfillmentStatus('GSC Indexing', 'Audit required', 'pending')}</td>`;
}

function renderWeeklyCells(row) {
  const health = row.health || {};
  const trend = row.trend || {};
  const outputs = row.outputs || {};
  const trendConnected = trend.raw_dataforseo_json?.source === 'dataforseo_labs_ranked_keywords';
  const critical = Number(health.critical_error_count || 0);
  return `
    <td>
      <label class="check-row">
        <input type="checkbox" ${outputs.blog_done ? 'checked' : ''} onchange="saveWeeklyClient('${row.id}', 'outputs.blog_done', this.checked)" />
        <span>${outputs.blog_done ? 'Published + audited' : 'Open'}</span>
      </label>
    </td>
    <td>${fulfillmentStatus('GBP Post', 'Audit + image post', 'pending')}</td>
    <td>${fulfillmentStatus(critical ? `${critical} critical` : 'Clean', `${health.pages_crawled || 0} pages crawled`, critical ? 'risk' : 'done')}</td>
    <td>${fulfillmentStatus(trendConnected ? `${trend.ranking_keywords || 0} keywords` : 'Not connected', trendConnected ? `${Number(trend.keyword_change || 0) >= 0 ? '+' : ''}${trend.keyword_change || 0} change` : 'Run DataForSEO weekly update', trendConnected ? 'active' : 'pending')}</td>
    <td>${fulfillmentStatus('Reviews', 'Generation tracker', 'pending')}</td>`;
}

function renderFulfillmentTable(rows) {
  const categoryKey = S.fulfillmentCategory;
  const headers = {
    oneTime: ['Setup Audit', 'Listings', 'Site Files', 'Launch Items', 'Action'],
    monthly: ['PRs', 'Backlinks', 'Performance', 'Reports', 'Indexing'],
    weekly: ['Blog', 'GBP', 'Technical', 'Rankings', 'Reviews'],
  }[categoryKey];
  const cellRenderer = {
    oneTime: renderOneTimeCells,
    monthly: renderMonthlyCells,
    weekly: renderWeeklyCells,
  }[categoryKey];

  return `<div class="table-card weekly-table-card">
    ${S.weeklyLoading ? `<div class="empty-state"><div class="loading-spinner"></div><h3>Loading fulfillment data</h3></div>` : rows.length === 0 ? `
      <div class="empty-state"><div class="empty-state-icon">▣</div><h3>No active clients found</h3><p>Run the schema and add active clients in Supabase first.</p></div>
    ` : `
    <div class="table-scroll">
      <table class="data-table weekly-table fulfillment-table">
        <thead>
          <tr>
            <th>Client</th>
            ${headers.map((header) => `<th>${h(header)}</th>`).join('')}
          </tr>
        </thead>
        <tbody>
          ${rows.map((row) => `<tr>
            <td>
              <div class="client-name">${h(row.client_name)}</div>
              <div class="client-location">${h(row.domain || '')}</div>
            </td>
            ${cellRenderer(row)}
          </tr>`).join('')}
        </tbody>
      </table>
    </div>`}
  </div>`;
}

function renderWeekly() {
  const rows = weeklyRows();
  const stats = fulfillmentStats(rows);
  const run = latestWeeklyRun();
  const category = FULFILLMENT_CATEGORIES[S.fulfillmentCategory] || FULFILLMENT_CATEGORIES.weekly;

  return `
    <div class="page-header weekly-header">
      <div>
        <h1 class="page-title">Fulfillment Ops</h1>
        <p class="page-subtitle">One-time, monthly, and weekly SEO work for Week ${S.selectedWeek}, ${S.selectedYear}. ${weekRange(S.selectedYear, S.selectedWeek)}</p>
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
        <div class="stat-value">${pct(stats.completed, rows.length)}%</div>
        <div class="stat-helper">${stats.completed}/${rows.length} clients complete</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Avg Technical Score</div>
        <div class="stat-value">${stats.avgScore || '-'}</div>
        <div class="stat-helper">From selected week snapshots</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Monthly Output</div>
        <div class="stat-value">${stats.prs}</div>
        <div class="stat-helper">Press releases logged</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Critical Issues</div>
        <div class="stat-value">${stats.critical}</div>
        <div class="stat-helper">Across technical snapshots</div>
      </div>
    </div>

    <div class="section">
      ${renderFulfillmentTabs(rows)}
      ${renderFulfillmentTasks(category)}
      <div class="section-header fulfillment-table-header">
        <h2 class="section-title">${h(category.shortLabel)} Client Queue</h2>
        <div style="font-size:13px;color:var(--text-muted)">Tracked against the selected week. Editable fields save per client.</div>
      </div>
      ${renderFulfillmentTable(rows)}
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

function setFulfillmentCategory(category) {
  if (!FULFILLMENT_CATEGORIES[category]) return;
  S.fulfillmentCategory = category;
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
  const tech=techMetrics(c);
  const issues=buildClientIssues(c);
  const criticalIssues=issues.filter((issue)=>issue.severity==='critical').length;
  const warningIssues=issues.filter((issue)=>issue.severity==='warning').length;
  const kws=[...(c.keywords||[])];
  const audit=c.audit||{};
  const raw=c.weeklyHealth?.raw_audit_json||{};

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
          <span>${h(c.domain || clientSubtitle(c))}</span>
          ${c.website?`<a href="${h(c.website)}" target="_blank">${h(c.domain)}</a>`:''}
          <span>Last crawl: ${timeAgo(tech.crawledAt)}</span>
        </div>
      </div>
      <div class="detail-actions">
        <button class="btn btn-primary" onclick="runAudit('${c.id}')" ${S.auditingClientId===c.id ? 'disabled' : ''}>
          ${S.auditingClientId===c.id ? '<span class="loading-spinner"></span> Crawling...' : 'Run Technical Crawl'}
        </button>
        <a class="btn btn-primary" href="${h(c.website || `https://${c.domain}`)}" target="_blank">Open Site</a>
        <a class="btn btn-ghost" href="https://groundcontrol.agency" target="_blank" style="font-size:12px">Manage in Ground Control ↗</a>
      </div>
    </div>

    <div class="stats-row">
      <div class="stat-card highlight">
        <div class="stat-label">Technical Score</div>
        <div class="stat-value">${fmtScore(tech.score)}</div>
        <div class="stat-helper">Verified SEO: ${fmtScore(tech.verified)}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Critical Items</div>
        <div class="stat-value">${tech.critical}</div>
        <div class="stat-helper">${criticalIssues} critical groups · ${warningIssues} warning groups</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Pages Crawled</div>
        <div class="stat-value">${tech.pages || '-'}</div>
        <div class="stat-helper">${tech.clean || 0} clean · ${Math.max(0, (tech.pages || 0) - (tech.clean || 0))} need review</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Metadata Hygiene</div>
        <div class="stat-value">${pctScore(tech.metadata)}</div>
        <div class="stat-helper">Page titles, descriptions, headings</div>
      </div>
    </div>

    <div class="section">
      <div class="section-header">
        <h2 class="section-title">Critical Fix Queue</h2>
        <div style="font-size:13px;color:var(--text-muted)">Prioritized from the latest real technical snapshot.</div>
      </div>
      <div class="issue-list">
        ${issues.map(renderIssueCard).join('')}
      </div>
    </div>

    <div class="section">
      <div class="section-header"><h2 class="section-title">Technical Snapshot</h2><div class="table-actions"><span style="font-size:12px;color:var(--text-dim)">Source: ${h(raw.source || 'Supabase technical health')}</span></div></div>
      <div class="intel-cards">
        <div class="intel-card">
          <div class="intel-label">SEO Quality</div>
          <div class="intel-value">${pctScore(raw.seo_quality_score)}</div>
        </div>
        <div class="intel-card">
          <div class="intel-label">Speed</div>
          <div class="intel-value">${pctScore(tech.speed)}</div>
        </div>
        <div class="intel-card">
          <div class="intel-label">Sitemap</div>
          <div class="intel-value">${pctScore(tech.sitemap)}</div>
        </div>
        <div class="intel-card">
          <div class="intel-label">Clean Rate</div>
          <div class="intel-value">${tech.pages ? pctScore((tech.clean / tech.pages) * 100) : '-'}</div>
        </div>
        <div class="intel-card">
          <div class="intel-label">Crawl Status</div>
          <div class="intel-value small">${h(c.weeklyHealth?.crawl_status || 'unknown')}</div>
        </div>
        <div class="intel-card">
          <div class="intel-label">Imported</div>
          <div class="intel-value small">${timeAgo(raw.imported_at || c.weeklyHealth?.created_at)}</div>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="section-header">
        <h2 class="section-title">Work Plan</h2>
        <div style="font-size:13px;color:var(--text-muted)">Simple operating order for this client.</div>
      </div>
      <div class="work-plan">
        <div class="work-step"><span>1</span><div><strong>Fix critical technical blockers</strong><p>Start with the critical queue above before content or reporting work.</p></div></div>
        <div class="work-step"><span>2</span><div><strong>Clean metadata and on-page quality</strong><p>Rewrite missing or weak titles/descriptions and tighten local service intent.</p></div></div>
        <div class="work-step"><span>3</span><div><strong>Re-run the weekly update</strong><p>Confirm scores improve and the clean page count moves up.</p></div></div>
      </div>
    </div>

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
      <div class="ai-panel-header"><span style="font-size:20px">⚡</span><h3>Client Notes</h3></div>
      <div class="ai-panel-placeholder">
        URL-level affected-page details are not in this current seed yet. This page uses the real per-client technical snapshot we have now. The next upgrade is importing crawl exports or DataForSEO page-level items so each issue can show exact URLs.
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
  S.auditing=true;S.auditingClientId=id;render();
  try{const d=await api.runAudit(id);const i=S.clients.findIndex(c=>c.id===id);if(i>=0&&d.client)S.clients[i]={...S.clients[i],...d.client,weeklyTrend:S.clients[i].weeklyTrend};toast(d.note||'Technical crawl complete!');}
  catch(e){toast('Failed: '+e.message,'error');}
  S.auditing=false;S.auditingClientId=null;render();
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
    const trendTime = c.weeklyTrend?.raw_dataforseo_json?.fetched_at;
    const healthTime = c.weeklyHealth?.last_crawled_at || c.weeklyHealth?.created_at;
    if (trendTime && (!latest || trendTime > latest)) latest = trendTime;
    if (healthTime && (!latest || healthTime > latest)) latest = healthTime;
    for (const kw of (c.keywords || [])) {
      const t = kw.rankings?.checkedAt;
      if (t && (!latest || t > latest)) latest = t;
    }
  }
  return latest ? timeAgo(latest) : 'Never';
}

async function loadConnections(force) {
  if (S.connections && !force) return;
  S.connectionsLoading = true;
  if (S.view === 'connections') render();
  try {
    S.connections = await api.connections();
  } catch (e) {
    S.connections = { dataforseo: { connected: false, configured: false, status: 'error', message: e.message } };
  }
  S.connectionsLoading = false;
  if (S.view === 'connections') render();
}

function connectionStatus(status) {
  if (status === 'connected') return 'connected';
  if (status === 'available') return 'available';
  return 'not_connected';
}

function cardHtml(i) {
  const status = connectionStatus(i.status);
  const label = status === 'connected' ? 'Connected' : status === 'available' ? 'Available' : 'Not Connected';
  return `<div class="connection-card ${status}">
    <div class="conn-header">
      <div class="conn-icon">${i.icon}</div>
      <div>
        <div class="conn-name">${h(i.name)}</div>
        <div class="conn-desc">${h(i.desc)}</div>
      </div>
      <div class="conn-status ${status === 'not_connected' ? 'planned' : status}">${label}</div>
    </div>
    <div class="conn-detail">${h(i.detail || i.requirements || '')}</div>
    <div class="conn-meta">
      <span>${i.lastUsed ? `Last used: ${h(i.lastUsed)}` : h(i.requirements || '')}</span>
      <span>${h(i.cost || '')}</span>
    </div>
  </div>`;
}

/* ── Connections View ─────────────────────────────────────── */
function renderConnections() {
  const dfs = S.connections?.dataforseo || null;
  const dfsConnected = Boolean(dfs?.connected);
  const dfsConfigured = Boolean(dfs?.configured);
  const dfsDetail = dfsConnected
    ? 'Live API verified. Weekly Ops can pull ranked keywords, traffic estimates, and technical crawl data.'
    : dfsConfigured
      ? `Credentials found, but the live API check failed: ${dfs?.message || 'unknown error'}`
      : 'Add DATAFORSEO_USERNAME and DATAFORSEO_PASSWORD in Vercel to activate real SEO data.';

  var integrations = [
    { name:'DataForSEO', desc:'SERP rankings, keyword volume, backlinks, on-page audits', status:dfsConnected?'connected':'not_connected', icon:'🔍', detail:dfsDetail, lastUsed:getLastCrawlTime(), cost:'SERP · Labs · On-Page API' },
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

  var html = `<div class="page-header"><div><h1 class="page-title">Connections</h1><p class="page-subtitle">Data sources powering the SEO Command Center.</p></div><div class="page-actions"><button class="btn btn-ghost" onclick="loadConnections(true)" ${S.connectionsLoading?'disabled':''}>${S.connectionsLoading?'<span class="loading-spinner"></span> Checking...':'Check Connections'}</button></div></div>`;

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
window.runWeeklyUpdate=runWeeklyUpdate;window.saveWeeklyClient=saveWeeklyClient;window.setFulfillmentCategory=setFulfillmentCategory;window.loadConnections=loadConnections;
document.addEventListener('DOMContentLoaded',init);

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
  weeklyRunAction: null,
  fulfillmentCategory: 'weekly',
  connections: null,
  connectionsLoading: false,
  selectedYear: new Date().getFullYear(),
  selectedMonth: new Date().getMonth(),
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
  runWeekly(year, week, action = 'full'){return this.post('/api/weekly/run', { year, week_number: week, action });},
  connections(){return this.get('/api/connections');},
  sop(id){return this.get(`/api/sops/${id}`);},
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

function monthName(monthIndex) {
  return new Date(Date.UTC(S.selectedYear, monthIndex, 1)).toLocaleDateString(undefined, { month: 'long', timeZone: 'UTC' });
}

function weekForMonth(year, monthIndex) {
  return getIsoWeek(new Date(year, monthIndex, 1)).week;
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

function rankingSummary(c) {
  const model = c.rankingModel || c.weeklyTrend?.raw_dataforseo_json?.ranking_model || null;
  const alerts = c.rankingAlerts || c.weeklyTrend?.raw_dataforseo_json?.ranking_alerts || [];
  const hasRealRankingData = Boolean(model && (
    model.organic?.total ||
    model.local?.total ||
    model.score ||
    model.previous_score ||
    alerts.length
  ));
  if (hasRealRankingData) {
    return {
      score: Number(model?.score || 0),
      previous: Number(model?.previous_score || 0),
      change: Number(model?.score_change || 0),
      organic: model?.organic || {},
      local: model?.local || {},
      alerts,
      critical: alerts.filter((alert) => alert.severity === 'critical').length,
      warning: alerts.filter((alert) => alert.severity === 'warning').length,
      provisional: false,
      sourceLabel: 'Ranking snapshot',
    };
  }

  const tech = techMetrics(c);
  const fulfillment = clientFulfillmentProgress(c.id);
  const technicalScore = Number(tech.score || tech.verified || tech.healthScore || 0);
  const fulfillmentScore = fulfillment.available ? Number(fulfillment.pct || 0) : 0;
  const fallbackScore = Math.round((technicalScore * 0.7) + (fulfillmentScore * 0.3));
  return {
    score: fallbackScore,
    previous: 0,
    change: 0,
    organic: {},
    local: {},
    alerts,
    critical: alerts.filter((alert) => alert.severity === 'critical').length,
    warning: alerts.filter((alert) => alert.severity === 'warning').length,
    provisional: true,
    sourceLabel: fulfillment.available ? 'Provisional: technical + fulfillment' : 'Provisional: technical baseline',
  };
}

function portfolioRankingMetrics(clients) {
  const rows = clients.map(rankingSummary);
  const avgScore = rows.length ? Math.round(rows.reduce((sum, row) => sum + row.score, 0) / rows.length) : 0;
  return {
    avgScore,
    withData: rows.length,
    realData: rows.filter((row) => !row.provisional).length,
    provisional: rows.filter((row) => row.provisional).length,
    alertCount: rows.reduce((sum, row) => sum + row.alerts.length, 0),
    critical: rows.reduce((sum, row) => sum + row.critical, 0),
  };
}

function scoreDelta(value) {
  if (!value) return '<span class="change neutral">—</span>';
  return value > 0 ? `<span class="change up">▲${value}</span>` : `<span class="change down">▼${Math.abs(value)}</span>`;
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

const SEO_SYSTEM_CATEGORIES = [
  { key: 'on-page', label: 'On-Page SEO', count: 9, purpose: 'Build and improve the pages, content, keyword targeting, internal links, metadata, and competitive positioning that make each client rank.' },
  { key: 'off-page', label: 'Off-Page SEO', count: 10, purpose: 'Build trust signals outside the website through citations, press releases, directories, local links, and authority outreach.' },
  { key: 'technical', label: 'Technical SEO', count: 9, purpose: 'Keep the site crawlable, indexable, structured, fast, mobile-friendly, and clean enough for SEO work to compound.' },
  { key: 'gbp', label: 'GBP SEO', count: 8, purpose: 'Strengthen local visibility through Google Business Profile completeness, posts, reviews, photos, Q&A, and profile hygiene.' },
  { key: 'reporting', label: 'Reporting', count: 2, purpose: 'Turn SEO activity and performance data into internal prioritization and client-facing clarity.' },
];

const SEO_SYSTEM_ITEMS = [
  { id: 1, category: 'on-page', title: 'Keyword Research', score: 7, cadence: 'Onboarding + quarterly refresh', fulfillment: 'One-Time Fulfillment / Monthly review', source: 'deliverables/on-page/01-keyword-research/README.md; seo/automation/STEP_4_KEYWORD_CLUSTERING.md', sopStatus: 'SOP documented', summary: 'Build an approved keyword map that scores service x city demand, clusters search intent, maps targets to pages, and seeds rank tracking.', human: 'Confirm services and service areas, exclude bad-fit targets, approve top priorities, and sign off on the final keyword map.', ai: 'Pull DataForSEO, SE Ranking, and GSC data, score opportunities, cluster keywords, map them to URLs, and refresh the map quarterly.' },
  { id: 2, category: 'on-page', title: 'Service Pages', score: 7, cadence: 'Onboarding + as-needed updates', fulfillment: 'Onsite Core Content Optimization', source: 'deliverables/on-page/02-service-pages/README.md; seo/automation/STEP_5_SITE_ARCHITECTURE.md; seo/automation/STEP_6A_CONTENT_BRIEFS_P1.md', sopStatus: 'SOP documented', summary: 'Turn the approved keyword map into service pages with clear page roles, metadata, body copy, FAQs, internal links, image guidance, schema notes, approval, and live QA.', human: 'Confirm the service is real and actively sold, provide client-specific details, approve claims and final copy, and handle page-builder edits when needed.', ai: 'Map service keywords to URLs, audit existing pages, draft briefs and copy, generate metadata/FAQs/link recommendations, and build the publish QA packet.' },
  { id: 3, category: 'on-page', title: 'Service Area Pages', score: 7, cadence: 'Onboarding + expansion campaigns', fulfillment: 'Onsite Core Content Optimization', source: 'deliverables/on-page/03-service-area-pages/README.md; seo/automation/STEP_5_SITE_ARCHITECTURE.md; seo/automation/STEP_6A_CONTENT_BRIEFS_P1.md', sopStatus: 'SOP documented', summary: 'Mirror the Service Pages workflow for city and market pages, with extra controls for service coverage, local proof, nearby-area links, duplicate-city risk, and live QA.', human: 'Confirm the city is actually served, approve local proof and service availability, reject fake local claims, and approve final copy before publishing.', ai: 'Map city/service keywords to URLs, audit existing area pages, draft briefs and copy, generate metadata/FAQs/link recommendations, and flag thin or overlapping city pages.' },
  { id: 4, category: 'on-page', title: 'Blog Content', score: 9, cadence: 'Weekly or monthly by package', fulfillment: 'Blog Content Creation (1/Week) Published + Audited', source: 'deliverables/on-page/04-blog-content/README.md; BLOG-CREATION-PROCESS.md; OPTIMIZATION-PROTOCOL.md; seo/automation/STEP_6A_CONTENT_BRIEFS_P1.md', sopStatus: 'SOP documented', summary: 'Create, publish, optimize, and verify blog posts from keyword gaps, seasonal demand, service priorities, internal-link needs, and tracker QA rules.', human: 'Approve sensitive claims, provide missing client facts or photos, resolve access blockers, and decide duplicate/consolidation issues when they affect site structure.', ai: 'Crawl the site, build DataForSEO briefs, draft articles, generate images and metadata, add links/schema, publish with WP-CLI when authorized, and verify the live URL.' },
  { id: 5, category: 'on-page', title: 'Internal Linking', score: 8, cadence: 'Every publish + quarterly audit', fulfillment: 'Onsite Core Content Optimization', source: 'deliverables/on-page/05-internal-linking/README.md; BLOG-CREATION-PROCESS.md; OPTIMIZATION-PROTOCOL.md; seo/automation/STEP_5_SITE_ARCHITECTURE.md; seo/automation/STEP_6A_CONTENT_BRIEFS_P1.md', sopStatus: 'SOP documented', summary: 'Audit and improve the site link graph so blog, service, service-area, trust, and conversion pages support the right SEO targets without awkward link stuffing.', human: 'Approve page-builder or layout-sensitive edits, validate service-area claims, resolve consolidation decisions, and review large batches before publishing.', ai: 'Crawl sitemaps, classify page roles, detect orphan or weakly linked pages, check broken/redirecting links, and generate source-target-anchor recommendations.' },
  { id: 6, category: 'on-page', title: 'Alt Text on Images', score: 9, cadence: 'Every upload + retroactive audit', fulfillment: 'SEO Images Optimization', source: 'deliverables/on-page/06-alt-text/README.md', summary: 'Ensure new and existing images have useful, contextual alt text that supports accessibility and SEO.', human: 'Review edge cases where visual context or brand details matter.', ai: 'Discover images, analyze visuals, generate alt text, and flag missing or weak image metadata.' },
  { id: 7, category: 'on-page', title: 'Title Tags & Meta Descriptions', score: 7, cadence: 'Onboarding + monthly improvements', fulfillment: 'Onsite Core Content Optimization', source: 'deliverables/on-page/07-title-tags-meta/README.md; OPTIMIZATION-PROTOCOL.md', summary: 'Audit and rewrite metadata so key pages have clear keyword targeting and click-worthy search snippets.', human: 'Approve major messaging changes.', ai: 'Find weak or missing metadata, draft replacements, and prepare bulk update recommendations.' },
  { id: 8, category: 'on-page', title: 'H1 Optimization', score: 5, cadence: 'One-time audit + launch QA', fulfillment: 'Onsite Core Content Optimization', source: 'deliverables/on-page/08-h1-optimization/README.md', summary: 'Confirm each page has a clean H1 hierarchy that matches the page target and avoids page-builder heading clutter.', human: 'Fix builder-specific heading elements in WordPress when automation cannot safely edit.', ai: 'Crawl rendered pages, detect missing/multiple H1s, and produce a fix list by URL.' },
  { id: 9, category: 'on-page', title: 'Competitor Analysis', score: 8, cadence: 'Onboarding + quarterly', fulfillment: 'SEO Ranking performance (local + search)', source: 'deliverables/on-page/09-competitor-analysis/README.md; seo/automation/STEP_3_COMPETITOR_ANALYSIS.md', summary: 'Identify local competitors and compare keyword, content, and ranking gaps against each client.', human: 'Confirm real local competitors and decide which gaps are worth pursuing.', ai: 'Find competitors, compare rankings and content coverage, and feed gaps into blog and page priorities.' },
  { id: 10, category: 'off-page', title: 'Citation Building - Onboarding', score: 4, cadence: 'One-time setup', fulfillment: 'Citation Building', source: 'deliverables/off-page/10-citation-building-onboarding/README.md', summary: 'Submit consistent business data to core directories and correct major NAP issues at launch.', human: 'Verify business details and handle platform-specific manual submissions.', ai: 'Prepare NAP data, directory checklist, submission packets, and completion tracking.' },
  { id: 11, category: 'off-page', title: 'Citation Monitoring - Ongoing', score: 6, cadence: 'Quarterly', fulfillment: 'Clear NAP Listings / Monthly authority work', source: 'deliverables/off-page/11-citation-monitoring/README.md', summary: 'Monitor directories for NAP inconsistencies, duplicate listings, suppressed profiles, or missing listings.', human: 'Resolve platforms that require manual login or client verification.', ai: 'Run consistency scans, flag issues, prioritize fixes, and log recurring NAP problems.' },
  { id: 12, category: 'off-page', title: 'Press Releases', score: 7, cadence: 'Two per month', fulfillment: 'Press Releases (2/Month)', source: 'deliverables/off-page/12-press-releases/README.md; Press_Release_Creation_Process.md; PR-OPTIMIZATION-PROCESS.md', summary: 'Create, optimize, upload, and track monthly press releases that support homepage and blog authority.', human: 'Approve sensitive angles and confirm final delivery when required.', ai: 'Generate PR drafts, optimize anchor strategy, prepare Google Docs, and track published assets.' },
  { id: 13, category: 'off-page', title: 'Backlink - Business Directories', score: 4, cadence: 'Quarterly campaign', fulfillment: 'Backlink Acquisition', source: 'deliverables/off-page/13-backlink-business-directories/README.md', summary: 'Find and pursue relevant green-industry, local, and business directory backlink opportunities.', human: 'Submit when approvals, payments, or manual accounts are needed.', ai: 'Research opportunities, score relevance, prepare submissions, and verify live links.' },
  { id: 14, category: 'off-page', title: 'Backlink - Social Profiles', score: 5, cadence: 'One-time + audit', fulfillment: 'Backlink Acquisition / Clients Reviews Integration', source: 'deliverables/off-page/14-backlink-social-profiles/README.md', summary: 'Ensure major social profiles exist, link correctly to the website, and reinforce brand/entity consistency.', human: 'Create or access profiles when credentials are required.', ai: 'Audit profile presence, link correctness, and missing profile opportunities.' },
  { id: 15, category: 'off-page', title: 'Backlink - Vendor Testimonials', score: 3, cadence: 'Quarterly outreach', fulfillment: 'Backlink Acquisition', source: 'deliverables/off-page/15-backlink-vendor-testimonials/README.md', summary: 'Use vendor relationships to earn testimonial or partner links from suppliers and local partners.', human: 'Approve outreach targets and relationship-sensitive messaging.', ai: 'Draft testimonials, outreach emails, follow-up reminders, and link verification checks.' },
  { id: 16, category: 'off-page', title: 'Backlink - Chamber of Commerce', score: 2, cadence: 'One-time opportunity review', fulfillment: 'Backlink Acquisition', source: 'deliverables/off-page/16-backlink-chamber-of-commerce/README.md', summary: 'Document local chamber opportunities and membership links that may create strong local authority signals.', human: 'Decide if membership cost and client fit make sense.', ai: 'Find chamber options, pricing pages, requirements, and link examples.' },
  { id: 17, category: 'off-page', title: 'Backlink - Local Sponsorships', score: 2, cadence: 'Seasonal / quarterly', fulfillment: 'Backlink Acquisition', source: 'deliverables/off-page/17-backlink-local-sponsorships/README.md', summary: 'Identify community sponsorships that include local sponsor pages with business mentions or links.', human: 'Choose sponsorships and coordinate payment/client approval.', ai: 'Find events, draft outreach, track opportunities, and verify resulting links.' },
  { id: 18, category: 'off-page', title: 'Backlink - Local Press Pitches', score: 4, cadence: 'Seasonal / as-needed', fulfillment: 'Backlink Acquisition', source: 'deliverables/off-page/18-backlink-local-press/README.md', summary: 'Pitch local seasonal landscape stories that can produce mentions, citations, or backlinks.', human: 'Approve angles and manage reporter relationships.', ai: 'Generate seasonal angles, identify local media, draft pitches, and maintain placement logs.' },
  { id: 19, category: 'off-page', title: 'Backlink - HARO / Connectively', score: 6, cadence: 'Weekly monitoring', fulfillment: 'Backlink Acquisition', source: 'deliverables/off-page/19-backlink-haro/README.md', summary: 'Monitor journalist requests and respond when green-industry expertise fits the query.', human: 'Approve and submit final expert responses.', ai: 'Filter opportunities, score fit, draft responses, and track placement outcomes.' },
  { id: 20, category: 'technical', title: 'Rank Math Setup', score: 2, cadence: 'One-time setup + audit', fulfillment: 'Schema Implementation / Onsite Core Content Optimization', source: 'deliverables/technical/20-rank-math-setup/README.md', summary: 'Standardize Rank Math configuration across client sites so baseline SEO settings are consistent.', human: 'Apply settings inside WordPress and confirm site-specific requirements.', ai: 'Audit current settings against the standard and produce a per-site fix list.' },
  { id: 21, category: 'technical', title: 'Schema Markup', score: 6, cadence: 'Setup + page updates', fulfillment: 'Schema Implementation', source: 'deliverables/technical/21-schema-markup/README.md', summary: 'Use LocalBusiness, Service, FAQPage, and BreadcrumbList schema where appropriate.', human: 'Implement schema in Rank Math or page builders when manual setup is required.', ai: 'Detect schema gaps, generate schema recommendations, and verify output with testing tools.' },
  { id: 22, category: 'technical', title: 'Google Search Console', score: 8, cadence: 'Monthly review', fulfillment: 'GSC Indexing Audit', source: 'deliverables/technical/22-google-search-console/README.md', summary: 'Use GSC for real query, click, impression, indexing, and coverage data.', human: 'Resolve important issues and approve priorities driven by GSC data.', ai: 'Pull monthly data, identify positions 4-20, flag indexing issues, and feed opportunities into content planning.' },
  { id: 23, category: 'technical', title: 'XML Sitemap', score: 7, cadence: 'Setup + monthly monitoring', fulfillment: 'Sitemap', source: 'deliverables/technical/23-xml-sitemap/README.md', summary: 'Confirm sitemaps are generated, submitted, current, and free of major errors.', human: 'Fix CMS or plugin-level sitemap problems.', ai: 'Check sitemap URLs, compare sitemap pages to GSC indexing data, and flag missing or stale pages.' },
  { id: 24, category: 'technical', title: 'robots.txt', score: 1, cadence: 'Setup + launch QA', fulfillment: 'Robots.txt File Management', source: 'deliverables/technical/24-robots-txt/README.md', summary: 'Ensure robots.txt does not block critical pages or create crawl issues.', human: 'Approve changes that affect crawling rules.', ai: 'Fetch robots.txt, detect risky disallow rules, and alert when important paths are blocked.' },
  { id: 25, category: 'technical', title: '301 Redirects', score: 6, cadence: 'Launch + monthly audit', fulfillment: 'Technical SEO Audit', source: 'deliverables/technical/25-301-redirects/README.md', summary: 'Manage redirects for changed URLs, 404 fixes, site launches, and redirect-chain cleanup.', human: 'Implement redirects in Rank Math, hosting, or .htaccess when needed.', ai: 'Find 404s, detect chains, map old-to-new URLs, and prioritize redirect fixes.' },
  { id: 26, category: 'technical', title: 'Page Speed / Core Web Vitals', score: 8, cadence: 'Monthly', fulfillment: 'Page Speed & Performance', source: 'deliverables/technical/26-page-speed-core-web-vitals/README.md', summary: 'Monitor PageSpeed and Core Web Vitals so slow mobile pages do not drag down SEO performance.', human: 'Handle theme, plugin, image, caching, and code-level fixes.', ai: 'Run PageSpeed checks, track trends, flag low scores, and suggest likely fixes.' },
  { id: 27, category: 'technical', title: 'Mobile Optimization', score: 7, cadence: 'Monthly / launch QA', fulfillment: 'Technical SEO Audit', source: 'deliverables/technical/27-mobile-optimization/README.md', summary: 'Confirm key pages render cleanly on mobile and avoid usability issues that hurt search and conversions.', human: 'Fix layout/CSS/page-builder issues.', ai: 'Use GSC/mobile checks and screenshots to flag usability issues by page.' },
  { id: 28, category: 'technical', title: 'Duplicate Content / Canonicals', score: 6, cadence: 'Quarterly', fulfillment: 'Technical SEO Audit', source: 'deliverables/technical/28-duplicate-content-canonicals/README.md', summary: 'Find duplicate pages, weak canonical setups, and keyword cannibalization risks.', human: 'Decide whether to consolidate, rewrite, noindex, or canonicalize.', ai: 'Detect duplicates, compare title/content overlap, and draft canonical/consolidation recommendations.' },
  { id: 29, category: 'gbp', title: 'Profile Build & Completion', score: 2, cadence: 'One-time setup + quarterly audit', fulfillment: 'Pre-Launch Website GBP Optimization / Post-Launch Website GBP Optimization', source: 'deliverables/gbp/29-gbp-profile-build/README.md', summary: 'Complete every major GBP field, service, area, description, hours, phone, website, photos, and verification requirement.', human: 'Access GBP, confirm business facts, and handle verification or sensitive edits.', ai: 'Audit completeness, draft descriptions, service copy, and photo/file naming recommendations.' },
  { id: 30, category: 'gbp', title: 'GBP Categories', score: 3, cadence: 'Onboarding + quarterly audit', fulfillment: 'Pre-Launch Website GBP Optimization / Post-Launch Website GBP Optimization', source: 'deliverables/gbp/30-gbp-categories/README.md', summary: 'Choose primary and secondary categories that match the client services and local competitors.', human: 'Approve category choices to avoid misclassification.', ai: 'Compare competitors, recommend category changes, and document rationale.' },
  { id: 31, category: 'gbp', title: 'Weekly GBP Posts', score: 8, cadence: 'Weekly / annual scheduling', fulfillment: 'GBP Audit and Image Post', source: 'deliverables/gbp/31-gbp-weekly-posts/README.md', summary: 'Publish seasonal, promotional, and educational GBP posts to keep profiles active.', human: 'Approve unusual offers or client-specific promotions.', ai: 'Generate post copy, images, seasonal calendars, and scheduling queues.' },
  { id: 32, category: 'gbp', title: 'Automated Review Replies', score: 9, cadence: 'Ongoing', fulfillment: 'Review Generation tracker / Clients Reviews Integration', source: 'deliverables/gbp/32-gbp-review-replies/README.md', summary: 'Reply to new reviews quickly while routing sensitive negative reviews to a human before posting.', human: 'Review and approve negative or sensitive replies.', ai: 'Draft personalized replies, auto-post safe positive replies, and flag negative reviews.' },
  { id: 33, category: 'gbp', title: 'GBP Photo Management', score: 2, cadence: 'Monthly', fulfillment: 'GBP Audit and Image Post', source: 'deliverables/gbp/33-gbp-photo-management/README.md', summary: 'Collect, rename, optimize, and upload GBP photos that support local visibility and trust.', human: 'Collect real client photos and approve image quality.', ai: 'Rename files, organize batches, draft captions, and monitor photo freshness.' },
  { id: 34, category: 'gbp', title: 'Q&A Management', score: 6, cadence: 'Monthly', fulfillment: 'GBP Audit and Image Post', source: 'deliverables/gbp/34-gbp-qa-management/README.md', summary: 'Seed helpful GBP questions and monitor public Q&A for new or risky questions.', human: 'Approve public answers and handle inappropriate questions.', ai: 'Generate Q&A content, detect new questions, draft answers, and flag removal candidates.' },
  { id: 35, category: 'gbp', title: 'GBP Link on Website', score: 2, cadence: 'One-time setup + launch QA', fulfillment: 'Clients Reviews Integration / Post-Launch Website GBP Optimization', source: 'deliverables/gbp/35-gbp-link-on-website/README.md', summary: 'Make sure each client website links clearly to the correct Google Business Profile or review URL.', human: 'Edit WordPress/footer/contact areas and confirm the correct GBP URL.', ai: 'Crawl homepage/contact pages for GBP links and flag missing or incorrect links.' },
  { id: 36, category: 'gbp', title: 'GBP Attributes', score: 3, cadence: 'Quarterly', fulfillment: 'GBP Audit and Image Post', source: 'deliverables/gbp/36-gbp-attributes/README.md', summary: 'Review available GBP attributes and keep profile details aligned with services and business changes.', human: 'Apply attributes in the GBP dashboard.', ai: 'Maintain audit reminders and document attribute changes by client.' },
  { id: 37, category: 'reporting', title: 'Internal Monthly Scorecard', score: 9, cadence: 'Monthly', fulfillment: 'Monthly Report Tracking & Reporting', source: 'deliverables/reporting/37-internal-monthly-scorecard/README.md', summary: 'Create an internal view of which clients are improving, stalling, or need immediate SEO attention.', human: 'Review priorities and decide what gets escalated.', ai: 'Pull rankings, GSC, GBP, backlinks, output counts, and technical data into a clear scorecard.' },
  { id: 38, category: 'reporting', title: 'Client Monthly Report', score: 7, cadence: 'Monthly', fulfillment: 'Monthly Report Tracking & Reporting; seo/SEO_REPORT_PROTOCOL.md', source: 'deliverables/reporting/38-client-monthly-report/README.md', summary: 'Give clients a plain-English monthly report covering work completed, rankings, traffic signals, and next focus.', human: 'Personalize, approve, and send client-facing reports.', ai: 'Compile data, draft narrative, format summaries, and prepare client-ready report language.' },
];

const SEO_SYSTEM_MASTER_SOPS = [
  { title: 'Blog Creation Process', source: 'BLOG-CREATION-PROCESS.md', use: 'Source-of-truth workflow for creating, optimizing, publishing, and verifying blog posts.' },
  { title: 'Publishing Tracker Optimization Protocol', source: 'OPTIMIZATION-PROTOCOL.md', use: 'Required process for any article coming from the L&L Content Engine publishing tracker.' },
  { title: 'Press Release Creation Process', source: 'Press_Release_Creation_Process.md', use: 'Source-of-truth workflow for press release creation, optimization, upload, tracking, and delivery.' },
  { title: 'Press Release Optimization Process', source: 'PR-OPTIMIZATION-PROCESS.md', use: 'Supporting protocol for PR optimization and delivery quality checks.' },
  { title: 'SEO Report Protocol', source: 'seo/SEO_REPORT_PROTOCOL.md', use: 'Required process for client-facing SEO performance reports and report revisions.' },
  { title: 'Local SEO Report Process', source: 'seo/LOCAL_SEO_REPORT_PROCESS.md', use: 'Local ranking, heatmap, and performance reporting workflow.' },
  { title: 'SEO Onboarding Master', source: 'seo/ONBOARDING_MASTER.md', use: 'Client onboarding foundation for SEO strategy, data collection, and setup.' },
  { title: 'SEO Automation Pipeline', source: 'seo/automation/STEP_1...STEP_7', use: 'Client classification, info collection, competitor research, keyword clustering, site architecture, briefs, and monthly measurement.' },
  { title: 'Signal Genesis Media Room Setup', source: 'seo/sops/SIGNAL_GENESYS_MEDIA_ROOM_SETUP.md', use: 'Media room setup SOP for PR and authority infrastructure.' },
];

const SEO_SYSTEM_FULFILLMENT_MAP = [
  { label: 'One-Time Fulfillment', source: 'Dashboard sidebar', focus: 'Foundation and launch setup', tasks: ['Onsite core content', 'image optimization', 'reviews integration', 'NAP cleanup', 'schema', 'sitemap', 'GBP launch work', 'citations', 'robots.txt', 'media room', 'llms.txt'] },
  { label: 'Weekly Fulfillment', source: 'Dashboard sidebar', focus: 'Recurring production and monitoring', tasks: ['Blog publishing', 'GBP post/image work', 'technical audit', 'local + organic rankings', 'review generation tracking'] },
  { label: 'Monthly Fulfillment', source: 'Dashboard sidebar', focus: 'Authority, reporting, indexing, and health', tasks: ['Two press releases', 'backlink acquisition', 'page speed', 'security', 'monthly report tracking', 'GSC indexing audit'] },
];

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
function openModal(title,body,footer,modalClass=''){
  $('#modalRoot').innerHTML=`<div class="modal-overlay" id="modalOverlay"><div class="modal ${h(modalClass)}"><div class="modal-header"><h2>${title}</h2><button class="modal-close" id="modalClose">×</button></div><div class="modal-body">${body}</div>${footer?`<div class="modal-footer">${footer}</div>`:''}</div></div>`;
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
  document.querySelectorAll('.nav-item').forEach(n=>{
    const matchesView = n.dataset.view === view || (view === 'detail' && n.dataset.view === 'dashboard');
    const matchesFulfillment = view !== 'weekly' || !n.dataset.fulfillmentCategory || n.dataset.fulfillmentCategory === S.fulfillmentCategory;
    n.classList.toggle('active', matchesView && matchesFulfillment);
  });
  const bc=$('#breadcrumb');
  if(view==='dashboard')bc.innerHTML='<span class="bc-item">Dashboard</span>';
  else if(view==='weekly')bc.innerHTML=`<span class="bc-item">${h((FULFILLMENT_CATEGORIES[S.fulfillmentCategory] || FULFILLMENT_CATEGORIES.weekly).label)}</span>`;
  else if(view==='rankings')bc.innerHTML='<span class="bc-item">Rankings</span>';
  else if(view==='aiSeoSystem')bc.innerHTML='<span class="bc-item">AI-Driven SEO Fulfillment System</span>';
  else if(view==='connections')bc.innerHTML='<span class="bc-item">Connections</span>';
  else if(view==='documentation')bc.innerHTML='<span class="bc-item">Documentation</span>';
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
    case'aiSeoSystem':el.innerHTML=renderAiSeoSystem();break;
    case'connections':el.innerHTML=renderConnections();break;
    case'documentation':el.innerHTML=renderDocumentation();break;
    case'detail':el.innerHTML=renderDetail();break;
    default:el.innerHTML=renderDashboard();
  }
  bindEvents();
}

/* ── Dashboard ────────────────────────────────────────────── */
function renderDashboard(){
  const ps=portfolioMetrics(S.clients);
  const ts=portfolioTechMetrics(S.clients);
  const rs=portfolioRankingMetrics(S.clients);
  const hasKeywordData = ps.keywords > 0;
  const filtered=S.clients.filter(c=>!S.search||c.name.toLowerCase().includes(S.search.toLowerCase()));
  const sorted=hasKeywordData ? sortClients(filtered) : [...filtered].sort((a,b)=>techMetrics(b).score-techMetrics(a).score||a.name.localeCompare(b.name));

  return`
    <div class="page-header">
      <div>
        <h1 class="page-title">SEO Command Center</h1>
        <p class="page-subtitle">Real technical SEO intelligence across ${ps.clients} active Lawn & Land clients.</p>
      </div>
      <div class="dashboard-actions">
        ${renderUpdateActions()}
        <div class="last-crawl-notice">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:14px;height:14px"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          <span>Last crawl: ${getLastCrawlTime()}</span>
        </div>
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
      <div class="stat-card highlight">
        <div class="stat-label">Ranking Score</div>
        <div class="stat-value">${rs.avgScore || '-'}</div>
        <div class="stat-helper">${rs.realData} real ranking · ${rs.provisional} provisional</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Ranking Alerts</div>
        <div class="stat-value">${rs.alertCount}</div>
        <div class="stat-helper">${rs.critical} critical · ${rs.alertCount - rs.critical} warnings</div>
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
              <th class="num">Fulfillment</th>
              <th class="num">Ranking Score</th>
              <th class="num">Alerts</th>
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
              const r=rankingSummary(c);
              const healthClass=scoreClass(m.score);
              return`<tr onclick="navigate('detail','${c.id}')">
                <td><div class="client-name">${h(c.name)}</div><div class="client-location">${h(clientSubtitle(c))}</div></td>
                <td class="num">${renderClientFulfillmentIndicator(c.id, true)}</td>
                <td class="num"><span class="health-badge ${scoreClass(r.score)}${r.provisional ? ' provisional' : ''}" title="${h(r.sourceLabel)}">${r.score}</span> ${r.provisional ? '<span class="change neutral">P</span>' : scoreDelta(r.change)}</td>
                <td class="num">${r.alerts.length ? `<span class="issue-count">${r.alerts.length}</span>` : '0'}</td>
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

function taskId(task) {
  return String(task || '')
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
}

function parseFulfillmentNotes(row) {
  const notes = row.outputs?.notes;
  if (!notes) return {};
  try {
    const parsed = JSON.parse(notes);
    return parsed?.fulfillment && typeof parsed.fulfillment === 'object' ? parsed.fulfillment : {};
  } catch {
    return {};
  }
}

function taskDone(row, categoryKey, task) {
  return Boolean(parseFulfillmentNotes(row)?.[categoryKey]?.[taskId(task)]);
}

function fulfillmentProgress(rows, categoryKey = null) {
  const keys = categoryKey ? [categoryKey] : Object.keys(FULFILLMENT_CATEGORIES);
  const total = keys.reduce((sum, key) => sum + rows.length * FULFILLMENT_CATEGORIES[key].tasks.length, 0);
  const done = keys.reduce((sum, key) => {
    const tasks = FULFILLMENT_CATEGORIES[key].tasks;
    return sum + rows.reduce((rowSum, row) => rowSum + tasks.filter((task) => taskDone(row, key, task)).length, 0);
  }, 0);
  return { done, total, pct: pct(done, total) };
}

function totalFulfillmentTaskCount() {
  return Object.values(FULFILLMENT_CATEGORIES).reduce((sum, category) => sum + category.tasks.length, 0);
}

function clientFulfillmentRow(clientId) {
  return S.weekly?.clients?.find((row) => row.id === clientId) || null;
}

function clientFulfillmentProgress(clientId) {
  const row = clientFulfillmentRow(clientId);
  const total = totalFulfillmentTaskCount();
  if (!row) return { done: 0, total, pct: 0, available: false };

  const done = Object.entries(FULFILLMENT_CATEGORIES).reduce((sum, [key, category]) => (
    sum + category.tasks.filter((task) => taskDone(row, key, task)).length
  ), 0);

  return { done, total, pct: pct(done, total), available: true };
}

function renderProgressMeter(progress) {
  return `<div class="progress-meter" aria-label="${progress.pct}% complete">
    <span style="width:${Math.max(0, Math.min(100, progress.pct))}%"></span>
  </div>`;
}

function renderClientFulfillmentIndicator(clientId, compact = false) {
  const progress = clientFulfillmentProgress(clientId);
  const label = progress.available ? `${progress.done}/${progress.total} tasks` : (S.weeklyLoading ? 'Loading tasks' : 'No checklist');

  return `<div class="client-fulfillment${compact ? ' compact' : ''}${progress.available ? '' : ' muted'}">
    <strong>${progress.available ? `${progress.pct}%` : '-'}</strong>
    ${renderProgressMeter(progress)}
    <span>${label}</span>
  </div>`;
}

function updateButtonLabel(action, idleLabel) {
  return S.weeklyRunning && S.weeklyRunAction === action
    ? '<span class="loading-spinner"></span> Running...'
    : idleLabel;
}

function renderUpdateActions() {
  const disabled = S.weeklyRunning ? 'disabled' : '';
  return `<div class="update-actions">
    <button class="btn btn-outline" onclick="runWeeklyUpdate('technical')" ${disabled}>${updateButtonLabel('technical', 'Run Technical Update')}</button>
    <button class="btn btn-outline" onclick="runWeeklyUpdate('rankings')" ${disabled}>${updateButtonLabel('rankings', 'Run Local + Search')}</button>
  </div>`;
}

function taskShortLabel(task) {
  const labels = {
    'Onsite Core Content Optimization': 'Onsite Core',
    'SEO Images Optimization': 'Images',
    'Clients Reviews Integration': 'Reviews',
    'Clear NAP Listings': 'NAP',
    'Schema Implementation': 'Schema',
    'Sitemap': 'Sitemap',
    'Pre-Launch Website GBP Optimization': 'Pre-GBP',
    'Post-Launch Website GBP Optimization': 'Post-GBP',
    'Citation Building': 'Citations',
    'Robots.txt File Management': 'Robots',
    'Media Room Configuration': 'Media Room',
    'llms.txt configuration': 'llms.txt',
    'Press Releases (2/Month)': 'Press Releases',
    'Backlink Acquisition': 'Backlinks',
    'Page Speed & Performance': 'Speed',
    'Website Security': 'Security',
    'Monthly Report Tracking & Reporting': 'Reports',
    'GSC Indexing Audit': 'GSC Audit',
    'Blog Content Creation (1/Week) Published + Audited': 'Blog',
    'GBP Audit and Image Post': 'GBP Post',
    'Technical SEO Audit': 'Tech Audit',
    'SEO Ranking performance (local + search)': 'Rankings',
    'Review Generation tracker': 'Review Tracker',
  };
  return labels[task] || task;
}

function renderFulfillmentCheckbox(row, categoryKey, task) {
  const id = taskId(task);
  const checked = taskDone(row, categoryKey, task);
  return `<label class="matrix-check" title="${h(task)}">
    <input type="checkbox" ${checked ? 'checked' : ''} onchange="saveFulfillmentTask('${row.id}', '${categoryKey}', '${id}', this.checked)" />
    <span>${checked ? 'Done' : 'Open'}</span>
  </label>`;
}

function renderFulfillmentTable(rows, categoryKey) {
  const category = FULFILLMENT_CATEGORIES[categoryKey] || FULFILLMENT_CATEGORIES.weekly;
  const progress = fulfillmentProgress(rows, categoryKey);
  const filteredRows = rows
    .filter((row) => !S.search || `${row.client_name || ''} ${row.domain || ''}`.toLowerCase().includes(S.search.toLowerCase()))
    .sort((a, b) => String(a.client_name || '').localeCompare(String(b.client_name || '')));

  return `<div class="table-card fulfillment-matrix-card weekly-table-card">
    <div class="table-toolbar">
      <div class="search-wrap">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <input class="search-input" type="text" placeholder="Search clients…" value="${h(S.search)}" id="searchInput" />
      </div>
      <div class="table-actions">
        <div class="fulfillment-toolbar-progress">
        <strong>${progress.pct}%</strong>
        <span>${progress.done}/${progress.total || 0} tasks complete</span>
          ${renderProgressMeter(progress)}
        </div>
      </div>
    </div>
    ${S.weeklyLoading ? `<div class="empty-state"><div class="loading-spinner"></div><h3>Loading fulfillment data</h3></div>` : rows.length === 0 ? `
      <div class="empty-state"><div class="empty-state-icon">▣</div><h3>No active clients found</h3><p>Run the schema and add active clients in Supabase first.</p></div>
    ` : filteredRows.length === 0 ? `
      <div class="empty-state"><div class="empty-state-icon">▣</div><h3>No matching clients</h3><p>Try a different search.</p></div>
    ` : `
    <table class="data-table weekly-table fulfillment-table matrix-table">
        <colgroup>
          <col class="client-col" />
          ${category.tasks.map(() => '<col class="task-col" />').join('')}
          <col class="progress-col" />
        </colgroup>
        <thead>
          <tr>
            <th class="sticky-client">Client</th>
            ${category.tasks.map((task) => `<th title="${h(task)}"><span>${h(taskShortLabel(task))}</span></th>`).join('')}
            <th>Progress</th>
          </tr>
        </thead>
        <tbody>
          ${filteredRows.map((row) => {
            const done = category.tasks.filter((task) => taskDone(row, categoryKey, task)).length;
            const rowProgress = { done, total: category.tasks.length, pct: pct(done, category.tasks.length) };
            return `<tr>
              <td class="sticky-client">
                <button class="client-cell-button" onclick="navigate('detail','${row.id}')">
                  <span>${h(row.client_name)}</span>
                  <small>${h(row.domain || '')}</small>
                </button>
              </td>
              ${category.tasks.map((task) => `<td>${renderFulfillmentCheckbox(row, categoryKey, task)}</td>`).join('')}
              <td>
                <div class="row-progress">
                  <strong>${rowProgress.pct}%</strong>
                  ${renderProgressMeter(rowProgress)}
                </div>
              </td>
            </tr>`;
          }).join('')}
        </tbody>
    </table>`}
  </div>`;
}

function renderWeekly() {
  const rows = weeklyRows();
  const run = latestWeeklyRun();
  const category = FULFILLMENT_CATEGORIES[S.fulfillmentCategory] || FULFILLMENT_CATEGORIES.weekly;
  const isWeekly = S.fulfillmentCategory === 'weekly';
  const isMonthly = S.fulfillmentCategory === 'monthly';
  const oneTimeProgress = fulfillmentProgress(rows, 'oneTime');
  const monthlyProgress = fulfillmentProgress(rows, 'monthly');
  const weeklyProgress = fulfillmentProgress(rows, 'weekly');
  const overallProgress = fulfillmentProgress(rows);
  const subtitle = isWeekly
    ? `${category.description} Week ${S.selectedWeek}, ${S.selectedYear}. ${weekRange(S.selectedYear, S.selectedWeek)}`
    : isMonthly
      ? `${category.description} ${monthName(S.selectedMonth)}, ${S.selectedYear}.`
      : category.description;
  const controls = isWeekly ? `
      <div class="weekly-controls">
        <label class="mini-field">
          <span>Year</span>
          <select id="weeklyYear" class="field-input compact">${[S.selectedYear - 1, S.selectedYear, S.selectedYear + 1].map((year) => `<option value="${year}" ${year === S.selectedYear ? 'selected' : ''}>${year}</option>`).join('')}</select>
        </label>
        <label class="mini-field">
          <span>Week</span>
          <select id="weeklyWeek" class="field-input compact">${Array.from({ length: 53 }, (_, i) => i + 1).map((week) => `<option value="${week}" ${week === S.selectedWeek ? 'selected' : ''}>Week ${week}</option>`).join('')}</select>
        </label>
        <div class="weekly-run-actions">
          <button class="btn btn-primary" onclick="runWeeklyUpdate('full')" ${S.weeklyRunning ? 'disabled' : ''}>
            ${updateButtonLabel('full', 'Run Weekly Update')}
          </button>
          ${renderUpdateActions()}
        </div>
      </div>` : isMonthly ? `
      <div class="weekly-controls">
        <label class="mini-field">
          <span>Month</span>
          <select id="fulfillmentMonth" class="field-input compact">${Array.from({ length: 12 }, (_, month) => `<option value="${month}" ${month === S.selectedMonth ? 'selected' : ''}>${monthName(month)}</option>`).join('')}</select>
        </label>
      </div>` : '';

  return `
    <div class="page-header weekly-header">
      <div>
        <h1 class="page-title">${h(category.label)}</h1>
        <p class="page-subtitle">${h(subtitle)}</p>
      </div>
      ${controls}
    </div>

    ${isWeekly ? `<div class="run-status ${run?.status || 'idle'}">
      <span class="status-dot"></span>
      <span>${run ? `Last run ${run.status} · ${run.clients_completed || 0}/${run.clients_total || 0} clients · ${timeAgo(run.finished_at || run.started_at)}` : 'No weekly update has been run for this week yet.'}</span>
    </div>` : ''}

    <div class="stats-row">
      <div class="stat-card highlight">
        <div class="stat-label">Overall Progress</div>
        <div class="stat-value">${overallProgress.pct}%</div>
        <div class="stat-helper">${overallProgress.done}/${overallProgress.total || 0} tasks complete</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">One-Time</div>
        <div class="stat-value">${oneTimeProgress.pct}%</div>
        <div class="stat-helper">${oneTimeProgress.done}/${oneTimeProgress.total || 0} setup tasks</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Monthly</div>
        <div class="stat-value">${monthlyProgress.pct}%</div>
        <div class="stat-helper">${monthlyProgress.done}/${monthlyProgress.total || 0} monthly tasks</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Weekly</div>
        <div class="stat-value">${weeklyProgress.pct}%</div>
        <div class="stat-helper">${weeklyProgress.done}/${weeklyProgress.total || 0} weekly tasks</div>
      </div>
    </div>

    <div class="section">
      <div class="section-header fulfillment-table-header">
        <h2 class="section-title">${h(category.shortLabel)} Client Checklist</h2>
        <div style="font-size:13px;color:var(--text-muted)">Clients are rows. ${h(category.shortLabel)} tasks are columns. Every checkbox saves per client.</div>
      </div>
      ${renderFulfillmentTable(rows, S.fulfillmentCategory)}
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

async function refreshClients() {
  const data = await api.clients();
  S.clients = data.clients || data || [];
}

async function runWeeklyUpdate(action = 'full') {
  S.weeklyRunning = true;
  S.weeklyRunAction = action;
  render();
  try {
    const result = await api.runWeekly(S.selectedYear, S.selectedWeek, action);
    toast(result.note || 'Weekly update saved');
    const [weekly] = await Promise.all([
      api.weekly(S.selectedYear, S.selectedWeek),
      refreshClients(),
    ]);
    S.weekly = weekly;
  } catch (e) {
    toast('Weekly update failed: ' + e.message, 'error');
  }
  S.weeklyRunning = false;
  S.weeklyRunAction = null;
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

function updateLocalFulfillment(clientId, category, taskIdValue, done) {
  const row = S.weekly?.clients?.find((client) => client.id === clientId);
  if (!row) return;
  row.outputs = row.outputs || {};
  let payload = {};
  try {
    payload = row.outputs.notes ? JSON.parse(row.outputs.notes) : {};
  } catch {
    payload = {};
  }
  payload.fulfillment = payload.fulfillment || {};
  payload.fulfillment[category] = payload.fulfillment[category] || {};
  payload.fulfillment[category][taskIdValue] = Boolean(done);
  row.outputs.notes = JSON.stringify(payload);
}

async function saveFulfillmentTask(clientId, category, taskIdValue, done) {
  updateLocalFulfillment(clientId, category, taskIdValue, done);
  render();

  try {
    S.weekly = await api.saveWeekly(S.selectedYear, S.selectedWeek, {
      client_id: clientId,
      fulfillment: { category, task_id: taskIdValue, done },
    });
    toast('Saved');
  } catch (e) {
    toast('Save failed: ' + e.message, 'error');
    loadWeekly();
  }
}

function setFulfillmentCategory(category) {
  if (!FULFILLMENT_CATEGORIES[category]) return;
  S.fulfillmentCategory = category;
  render();
}

/* ── AI-Driven SEO Fulfillment System ─────────────────────── */
function seoCategoryMeta(key) {
  return SEO_SYSTEM_CATEGORIES.find((category) => category.key === key) || SEO_SYSTEM_CATEGORIES[0];
}

function readinessLabel(score) {
  if (score >= 9) return 'Near-full automation';
  if (score >= 7) return 'Highly automatable';
  if (score >= 5) return 'Partial automation';
  if (score >= 3) return 'Mostly human';
  return 'Manual heavy';
}

function readinessClass(score) {
  if (score >= 9) return 'excellent';
  if (score >= 7) return 'good';
  if (score >= 5) return 'partial';
  if (score >= 3) return 'low';
  return 'manual';
}

function inlineMarkdown(text) {
  return h(text)
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
}

function renderMarkdownTable(rows) {
  const parsedRows = rows
    .filter((row) => !/^\|\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?$/.test(row.trim()))
    .map((row) => row.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map((cell) => cell.trim()));
  if (!parsedRows.length) return '';
  const [head, ...body] = parsedRows;
  return `<div class="sop-table-wrap"><table class="sop-table">
    <thead><tr>${head.map((cell) => `<th>${inlineMarkdown(cell)}</th>`).join('')}</tr></thead>
    <tbody>${body.map((row) => `<tr>${row.map((cell) => `<td>${inlineMarkdown(cell)}</td>`).join('')}</tr>`).join('')}</tbody>
  </table></div>`;
}

function renderSopMarkdown(markdown) {
  const lines = String(markdown || '').replace(/\r\n/g, '\n').split('\n');
  let html = '';
  let list = null;
  const closeList = () => {
    if (!list) return;
    html += `</${list}>`;
    list = null;
  };
  const isBlockStart = (line) => /^(#{1,4})\s+/.test(line) || /^(-|\d+\.)\s+/.test(line) || /^-\s+\[[ x]\]\s+/i.test(line) || /^\*\*[^*]+:\*\*/.test(line) || line.trim() === '---' || /^\|.+\|$/.test(line.trim());

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    const trimmed = line.trim();

    if (!trimmed) {
      closeList();
      continue;
    }

    if (trimmed === '---') {
      closeList();
      html += '<hr>';
      continue;
    }

    if (/^\|.+\|$/.test(trimmed) && /^\|\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?$/.test((lines[i + 1] || '').trim())) {
      closeList();
      const rows = [trimmed, lines[i + 1].trim()];
      i += 2;
      while (i < lines.length && /^\|.+\|$/.test(lines[i].trim())) {
        rows.push(lines[i].trim());
        i += 1;
      }
      i -= 1;
      html += renderMarkdownTable(rows);
      continue;
    }

    const heading = trimmed.match(/^(#{1,4})\s+(.+)$/);
    if (heading) {
      closeList();
      const level = Math.min(heading[1].length + 1, 5);
      html += `<h${level}>${inlineMarkdown(heading[2])}</h${level}>`;
      continue;
    }

    const definition = trimmed.match(/^\*\*([^*]+):\*\*\s*(.*)$/);
    if (definition) {
      closeList();
      html += `<p class="sop-def"><strong>${inlineMarkdown(definition[1])}</strong><span>${inlineMarkdown(definition[2])}</span></p>`;
      continue;
    }

    const checklist = trimmed.match(/^-\s+\[([ x])\]\s+(.+)$/i);
    if (checklist) {
      if (list !== 'ul') {
        closeList();
        html += '<ul>';
        list = 'ul';
      }
      html += `<li class="sop-check-item"><input type="checkbox" disabled ${checklist[1].toLowerCase() === 'x' ? 'checked' : ''}> <span>${inlineMarkdown(checklist[2])}</span></li>`;
      continue;
    }

    const bullet = trimmed.match(/^-\s+(.+)$/);
    if (bullet) {
      if (list !== 'ul') {
        closeList();
        html += '<ul>';
        list = 'ul';
      }
      html += `<li>${inlineMarkdown(bullet[1])}</li>`;
      continue;
    }

    const numbered = trimmed.match(/^\d+\.\s+(.+)$/);
    if (numbered) {
      if (list !== 'ol') {
        closeList();
        html += '<ol>';
        list = 'ol';
      }
      html += `<li>${inlineMarkdown(numbered[1])}</li>`;
      continue;
    }

    closeList();
    const paragraph = [trimmed];
    while (i + 1 < lines.length && lines[i + 1].trim() && !isBlockStart(lines[i + 1].trim())) {
      paragraph.push(lines[i + 1].trim());
      i += 1;
    }
    html += `<p>${inlineMarkdown(paragraph.join(' '))}</p>`;
  }

  closeList();
  return html;
}

async function openSeoSop(id) {
  const item = SEO_SYSTEM_ITEMS.find((process) => process.id === id);
  if (!item?.sopStatus) {
    toast('This SOP has not been documented yet.', 'error');
    return;
  }

  openModal('Loading SOP', '<div class="loading-state"><span class="loading-spinner"></span> Loading SOP...</div>', '', 'sop-modal');

  try {
    const sop = await api.sop(id);
    const body = `
      <article class="sop-reader">
        <div class="sop-reader-meta">
          <span>Process ${String(sop.id).padStart(2, '0')}</span>
          <span>${h(sop.source)}</span>
        </div>
        ${renderSopMarkdown(sop.markdown)}
      </article>
    `;
    openModal(h(sop.title), body, '<button class="btn btn-primary" onclick="closeModal()">Done</button>', 'sop-modal');
  } catch (error) {
    openModal('SOP unavailable', `<p class="modal-error">${h(error.message || 'Could not load this SOP.')}</p>`, '<button class="btn btn-primary" onclick="closeModal()">Close</button>');
  }
}

function renderSeoSystemCard(item) {
  const category = seoCategoryMeta(item.category);
  const sopStatus = item.sopStatus ? `<span>${h(item.sopStatus)}</span>` : '';
  const sopAction = item.sopStatus ? `<button class="btn btn-primary sop-view-btn" type="button" onclick="openSeoSop(${item.id})">View SOP</button>` : '';
  return `<article class="seo-process-card">
    <div class="seo-process-topline">
      <span class="process-number">${String(item.id).padStart(2, '0')}</span>
      <span class="process-category">${h(category.label)}</span>
      <span class="readiness-badge ${readinessClass(item.score)}">${item.score}/10 · ${h(readinessLabel(item.score))}</span>
    </div>
    <h3>${h(item.title)}</h3>
    <p class="process-summary">${h(item.summary)}</p>
    <div class="process-detail-grid">
      <div><strong>Human role</strong><span>${h(item.human)}</span></div>
      <div><strong>Koga/Kai role</strong><span>${h(item.ai)}</span></div>
    </div>
    <div class="process-meta-row">
      ${sopStatus}
      <span>${h(item.cadence)}</span>
      <span>${h(item.fulfillment)}</span>
      <span>${h(item.source)}</span>
    </div>
    ${sopAction}
  </article>`;
}

function renderAiSeoSystem() {
  const filteredItems = SEO_SYSTEM_ITEMS.filter((item) => {
    if (!S.search) return true;
    const haystack = `${item.title} ${item.summary} ${item.fulfillment} ${item.source} ${seoCategoryMeta(item.category).label}`.toLowerCase();
    return haystack.includes(S.search.toLowerCase());
  });
  const averageScore = Math.round(SEO_SYSTEM_ITEMS.reduce((sum, item) => sum + item.score, 0) / SEO_SYSTEM_ITEMS.length);
  const highAutomation = SEO_SYSTEM_ITEMS.filter((item) => item.score >= 7).length;
  const masterSopCount = SEO_SYSTEM_MASTER_SOPS.length;

  return `
    <div class="page-header">
      <div>
        <h1 class="page-title">AI-Driven SEO Fulfillment System</h1>
        <p class="page-subtitle">Documentation-only operating map for how SEO fulfillment should be done by the team, Koga, and Kai.</p>
      </div>
    </div>

    <div class="seo-system-hero">
      <div>
        <span class="doc-kicker">Build & Implement</span>
        <h2>One place for the SEO playbook, fulfillment map, and process library.</h2>
        <p>This tab consolidates the LawnLab SEO Playbook, LawnLab SEO Checklist, and Koga's existing markdown SOPs into a scannable dashboard reference. No database. No task state. Just the operating system.</p>
      </div>
      <div class="seo-system-stats">
        <div><strong>${SEO_SYSTEM_ITEMS.length}</strong><span>documented process cards</span></div>
        <div><strong>${SEO_SYSTEM_CATEGORIES.length}</strong><span>fulfillment categories</span></div>
        <div><strong>${highAutomation}</strong><span>high automation candidates</span></div>
        <div><strong>${averageScore}/10</strong><span>avg automation readiness</span></div>
      </div>
    </div>

    <div class="stats-row">
      <div class="stat-card highlight">
        <div class="stat-label">Primary Goal</div>
        <div class="stat-value small">Documented</div>
        <div class="stat-helper">Short summaries and source locations first</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Source Model</div>
        <div class="stat-value small">LawnLab</div>
        <div class="stat-helper">Playbook + 38-item checklist</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Master SOPs</div>
        <div class="stat-value">${masterSopCount}</div>
        <div class="stat-helper">Existing Koga markdown docs referenced</div>
      </div>
    </div>

    <div class="section">
      <div class="section-header">
        <h2 class="section-title">Fulfillment Map</h2>
        <p class="section-subtitle">How the existing sidebar fulfillment tasks connect back to the process documentation.</p>
      </div>
      <div class="fulfillment-map-grid">
        ${SEO_SYSTEM_FULFILLMENT_MAP.map((group) => `
          <section class="fulfillment-map-card">
            <span class="doc-kicker">${h(group.source)}</span>
            <h3>${h(group.label)}</h3>
            <p>${h(group.focus)}</p>
            <div class="mini-chip-list">${group.tasks.map((task) => `<span>${h(task)}</span>`).join('')}</div>
          </section>
        `).join('')}
      </div>
    </div>

    <div class="section">
      <div class="section-header">
        <h2 class="section-title">Process Library</h2>
        <p class="section-subtitle">Short cards first. Each card names the human role, AI role, source SOP location, cadence, fulfillment task, and automation readiness.</p>
      </div>
      <div class="table-toolbar seo-system-toolbar">
        <div class="search-wrap">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input class="search-input" type="text" placeholder="Search processes, fulfillment tasks, or source docs..." value="${h(S.search)}" id="searchInput" />
        </div>
        <div style="font-size:13px;color:var(--text-dim)">${filteredItems.length}/${SEO_SYSTEM_ITEMS.length} processes</div>
      </div>
      ${SEO_SYSTEM_CATEGORIES.map((category) => {
        const items = filteredItems.filter((item) => item.category === category.key);
        if (!items.length) return '';
        return `<section class="seo-category-section">
          <div class="seo-category-header">
            <div>
              <span class="doc-kicker">${items.length} processes</span>
              <h3>${h(category.label)}</h3>
            </div>
            <p>${h(category.purpose)}</p>
          </div>
          <div class="seo-process-grid">${items.map(renderSeoSystemCard).join('')}</div>
        </section>`;
      }).join('')}
    </div>

    <div class="section">
      <div class="section-header">
        <h2 class="section-title">Master SOP References</h2>
        <p class="section-subtitle">These are the deeper process files Koga should follow when the work moves from documentation to execution.</p>
      </div>
      <div class="master-sop-grid">
        ${SEO_SYSTEM_MASTER_SOPS.map((sop) => `
          <article class="master-sop-card">
            <h3>${h(sop.title)}</h3>
            <p>${h(sop.use)}</p>
            <span>${h(sop.source)}</span>
          </article>
        `).join('')}
      </div>
    </div>

    <div class="section">
      <div class="section-header">
        <h2 class="section-title">Build Roadmap</h2>
        <p class="section-subtitle">The tab stays documentation-only now, but the process map makes future automation obvious.</p>
      </div>
      <div class="roadmap-strip">
        <div><strong>1. Document</strong><span>Summaries, source docs, categories, cadence, and fulfillment mapping.</span></div>
        <div><strong>2. Standardize</strong><span>Fill the placeholder markdown files with the approved SOP for each deliverable.</span></div>
        <div><strong>3. Assist</strong><span>Add prompts, scripts, and Koga/Kai instructions for repeatable AI-assisted work.</span></div>
        <div><strong>4. Automate</strong><span>Only after the SOP is stable, wire selected processes into APIs, runs, and dashboards.</span></div>
      </div>
    </div>
  `;
}

/* ── Documentation View ───────────────────────────────────── */
function renderDocumentation() {
  return `
    <div class="page-header">
      <div>
        <h1 class="page-title">Documentation</h1>
        <p class="page-subtitle">How to use the SEO Command Center for dashboard checks, fulfillment tracking, rankings, and updates.</p>
      </div>
    </div>

    <div class="documentation-grid">
      <section class="doc-panel doc-panel-wide">
        <div class="doc-panel-header">
          <span class="doc-kicker">Start Here</span>
          <h2>Daily Workflow</h2>
        </div>
        <ol class="doc-steps">
          <li><strong>Open Dashboard.</strong><span>Check technical score, fulfillment percentage, critical issues, last crawl date, and overall client health.</span></li>
          <li><strong>Run only the update you need.</strong><span>Use Technical Update for crawl and site-health data. Use Local + Search for DataForSEO ranking data. Use Weekly Update when both should refresh together.</span></li>
          <li><strong>Work the fulfillment tabs.</strong><span>Open One-Time, Monthly, or Weekly Fulfillment from the left menu and mark each client/task checkbox when the work is complete.</span></li>
          <li><strong>Review client details.</strong><span>Click any client row to inspect that client's health, fulfillment progress, critical fixes, rankings, and next work plan.</span></li>
        </ol>
      </section>

      <section class="doc-panel">
        <div class="doc-panel-header">
          <span class="doc-kicker">Dashboard</span>
          <h2>Client Overview</h2>
        </div>
        <ul class="doc-list">
          <li><strong>Technical Score</strong><span>Shows the current site-health score from the latest technical crawl data.</span></li>
          <li><strong>Fulfillment</strong><span>Shows the overall completion percentage for each client across One-Time, Monthly, and Weekly work.</span></li>
          <li><strong>Critical Issues</strong><span>Highlights urgent technical items that should be reviewed first.</span></li>
          <li><strong>Client Row</strong><span>Click a row to open the individual client page.</span></li>
        </ul>
      </section>

      <section class="doc-panel">
        <div class="doc-panel-header">
          <span class="doc-kicker">Fulfillment</span>
          <h2>Completion Tracking</h2>
        </div>
        <ul class="doc-list">
          <li><strong>One-Time Fulfillment</strong><span>Use this for setup and launch tasks that only need to be completed once.</span></li>
          <li><strong>Monthly Fulfillment</strong><span>Use the month selector, then mark each monthly deliverable complete for each client.</span></li>
          <li><strong>Weekly Fulfillment</strong><span>Use the week selector, then mark recurring weekly tasks complete for each client.</span></li>
          <li><strong>Progress Bars</strong><span>Percentages update from saved checkbox data for the selected view and client.</span></li>
        </ul>
      </section>

      <section class="doc-panel">
        <div class="doc-panel-header">
          <span class="doc-kicker">Updates</span>
          <h2>Run Buttons</h2>
        </div>
        <ul class="doc-list">
          <li><strong>Run Technical Update</strong><span>Refreshes technical crawl health only. Use it when you need updated site issues and scores.</span></li>
          <li><strong>Run Local + Search</strong><span>Refreshes ranking visibility through DataForSEO only. Use it when Rankings needs fresh data.</span></li>
          <li><strong>Run Weekly Update</strong><span>Runs the full weekly refresh, including technical and local/search updates.</span></li>
        </ul>
      </section>

      <section class="doc-panel">
        <div class="doc-panel-header">
          <span class="doc-kicker">Rankings</span>
          <h2>Search Visibility</h2>
        </div>
        <ul class="doc-list">
          <li><strong>Rankings Tab</strong><span>Shows keyword positions, search volume, estimated traffic, and value across clients.</span></li>
          <li><strong>Data Source</strong><span>Ranking data comes from DataForSEO after the Local + Search update runs successfully.</span></li>
          <li><strong>Empty Rankings</strong><span>If rankings are blank, confirm DataForSEO is connected, redeploy after env var changes, then run Local + Search.</span></li>
        </ul>
      </section>

      <section class="doc-panel doc-panel-wide">
        <div class="doc-panel-header">
          <span class="doc-kicker">Ranking Model</span>
          <h2>Scores and Alerts</h2>
        </div>
        <ul class="doc-list">
          <li><strong>Two Ranking Sets</strong><span>Organic SERP rankings and local/map rankings are pulled from DataForSEO and stored separately inside the weekly ranking snapshot.</span></li>
          <li><strong>Unified Score</strong><span>The dashboard score combines organic ranking strength at 60% and local ranking strength at 40% when both datasets are available.</span></li>
          <li><strong>Rank Weighting</strong><span>Top 3 positions carry the strongest score, positions 4-10 carry medium weight, 11-20 carry light weight, and unranked keywords count as zero.</span></li>
          <li><strong>Drop Alerts</strong><span>Warnings trigger when a tracked keyword drops 3+ positions. Critical alerts trigger when a keyword falls out of top 3, falls off page 1, disappears, or the unified score drops 10%+ week over week.</span></li>
        </ul>
      </section>

      <section class="doc-panel">
        <div class="doc-panel-header">
          <span class="doc-kicker">Connections</span>
          <h2>Configuration Checks</h2>
        </div>
        <ul class="doc-list">
          <li><strong>Connected</strong><span>The platform can reach that service with the current environment variables.</span></li>
          <li><strong>Not Configured</strong><span>The required Vercel environment variables are missing or the project needs a redeploy.</span></li>
          <li><strong>After Env Changes</strong><span>Redeploy Vercel before expecting the live dashboard to use new environment values.</span></li>
        </ul>
      </section>

      <section class="doc-panel">
        <div class="doc-panel-header">
          <span class="doc-kicker">Changes</span>
          <h2>Code vs. Data</h2>
        </div>
        <ul class="doc-list">
          <li><strong>GitHub PR Needed</strong><span>Required for app design, navigation, buttons, logic, API routes, and styling changes.</span></li>
          <li><strong>No PR Needed</strong><span>Saved fulfillment checkbox data can be updated directly through the live API/Supabase.</span></li>
          <li><strong>Deploy Needed</strong><span>Required after merged code changes or Vercel environment variable updates.</span></li>
        </ul>
      </section>
    </div>
  `;
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
            <th>Type</th>
            <th>Keyword</th>
            <th>Client</th>
            <th class="num">Change</th>
            <th class="num">Volume</th>
            <th class="num">Traffic</th>
            <th class="num">Value</th>
            <th class="num">Checked</th>
          </tr></thead>
          <tbody>${sorted.map(k=>{const m=kwMetrics(k);return`<tr onclick="navigate('detail','${k.clientId}')">
            <td><span class="rank-badge ${tier(m.pos)}">${tierLabel(m.pos)}</span></td>
            <td><span class="rank-type">${h(k.rankingType || 'organic')}</span></td>
            <td style="font-weight:500;color:var(--text)">${h(k.keyword)}</td>
            <td>${h(k.client)}</td>
            <td class="num">${posChange(k.rankings?.position, k.rankings?.previousPosition)}</td>
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
  const fulfillment = clientFulfillmentProgress(c.id);
  const ranking = rankingSummary(c);

  // Categorize keywords
  const wins=kws.filter(k=>(k.rankings?.position||0)>=1&&(k.rankings?.position||0)<=3).sort((a,b)=>(a.rankings.position)-(b.rankings.position));
  const page1=kws.filter(k=>(k.rankings?.position||0)>=4&&(k.rankings?.position||0)<=10).sort((a,b)=>kwMetrics(b).value-kwMetrics(a).value);
  const opportunities=kws.filter(k=>(k.rankings?.position||0)>=11&&(k.rankings?.position||0)<=20).sort((a,b)=>kwMetrics(b).opp-kwMetrics(a).opp);
  const deepRanked=kws.filter(k=>(k.rankings?.position||0)>20).sort((a,b)=>kwMetrics(b).vol-kwMetrics(a).vol);
  const notRanking=kws.filter(k=>!k.rankings?.position||k.rankings.position===0);
  const organicKws=kws.filter(k=>(k.rankingType || 'organic')==='organic');
  const localKws=kws.filter(k=>(k.rankingType || 'organic')==='local');

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
        <div class="stat-label">Fulfillment</div>
        <div class="stat-value">${fulfillment.available ? `${fulfillment.pct}%` : '-'}</div>
        <div class="stat-helper">${fulfillment.available ? `${fulfillment.done}/${fulfillment.total} tasks complete` : (S.weeklyLoading ? 'Loading current checklist' : 'No checklist data')}</div>
        ${renderProgressMeter(fulfillment)}
      </div>
      <div class="stat-card highlight">
        <div class="stat-label">Ranking Score</div>
        <div class="stat-value">${ranking.score}</div>
        <div class="stat-helper">${ranking.provisional ? `${h(ranking.sourceLabel)} until ranking snapshot exists` : `${scoreDelta(ranking.change)} week over week · ${ranking.alerts.length} alerts`}</div>
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
    </div>

    <div class="section">
      <div class="section-header">
        <h2 class="section-title">Ranking Alerts</h2>
        <div style="font-size:13px;color:var(--text-muted)">${ranking.critical} critical · ${ranking.warning} warning</div>
      </div>
      ${ranking.alerts.length ? `<div class="issue-list">${ranking.alerts.slice(0, 8).map((alert, index) => `
        <div class="issue-card ${alert.severity === 'critical' ? 'critical' : 'warning'}">
          <div class="issue-rank">${index + 1}</div>
          <div class="issue-body">
            <div class="issue-topline"><span class="issue-title">${h(alert.message)}</span><span class="issue-severity">${h(alert.severity)}</span></div>
            <div class="issue-meta">${h(alert.ranking_type || 'score')} · previous ${alert.previous_rank || alert.previous_score || '-'} · current ${alert.current_rank || alert.current_score || '-'}</div>
          </div>
        </div>`).join('')}</div>` : `<div class="empty-state"><h3>No ranking drops flagged</h3><p>Ranking alerts will appear here after at least two weekly Local + Search updates.</p></div>`}
    </div>

    <div class="section">
      <div class="section-header"><h2 class="section-title">Organic SERP Rankings</h2><div style="font-size:13px;color:var(--text-muted)">${organicKws.length} keywords</div></div>
      <div class="table-card">${renderKwTable(c, organicKws, false)}</div>
    </div>

    <div class="section">
      <div class="section-header"><h2 class="section-title">Local Rankings</h2><div style="font-size:13px;color:var(--text-muted)">${localKws.length} keywords</div></div>
      <div class="table-card">${renderKwTable(c, localKws, false)}</div>
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
  if (!kws.length) return '<div class="empty-state"><h3>No rankings in this set yet</h3><p>Run Local + Search after DataForSEO is connected.</p></div>';
  return`<div class="table-scroll"><table class="data-table"><thead><tr>
    <th style="width:55px">Pos</th>
    <th>Type</th>
    <th>Keyword</th>
    <th class="num">Change</th>
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
      <td><span class="rank-badge ${tier(km.pos)}">${tierLabel(km.pos)}</span></td>
      <td><span class="rank-type">${h(k.rankingType || 'organic')}</span></td>
      <td style="font-weight:500;color:var(--text)">${h(k.keyword)}</td>
      <td class="num">${posChange(k.rankings?.position, k.rankings?.previousPosition)}</td>
      <td class="num">${km.vol?fmt(km.vol)+'/mo':'—'}</td>
      <td class="num">${km.traffic?fmt(km.traffic)+'/mo':'—'}</td>
      <td class="num" style="color:var(--green);font-weight:600">${km.value?fmtMoney(km.value)+'/mo':'—'}</td>
      ${showOpp?`<td class="num"><span class="opp-badge">${km.opp}</span></td>`:''}
      <td><button class="btn btn-ghost" onclick="event.stopPropagation();deleteKeyword('${c.id}','${k.id}')" style="padding:2px 6px;color:var(--text-dim);font-size:14px">×</button></td>
    </tr>${expanded&&serp.length>0?`<tr class="serp-row"><td colspan="${showOpp?9:8}">
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
  const fm=$('#fulfillmentMonth');
  if(wy)wy.addEventListener('change',e=>{S.selectedYear=Number(e.target.value);loadWeekly();});
  if(ww)ww.addEventListener('change',e=>{S.selectedWeek=Number(e.target.value);loadWeekly();});
  if(fm)fm.addEventListener('change',e=>{S.selectedMonth=Number(e.target.value);S.selectedWeek=weekForMonth(S.selectedYear,S.selectedMonth);loadWeekly();});
}

/* ── Init ─────────────────────────────────────────────────── */
async function init(){
  document.querySelectorAll('.nav-item[data-view]').forEach(el=>{el.addEventListener('click',e=>{e.preventDefault();if(el.classList.contains('disabled'))return;if(el.dataset.fulfillmentCategory)S.fulfillmentCategory=el.dataset.fulfillmentCategory;navigate(el.dataset.view);});});
  $('#mobileMenuBtn')?.addEventListener('click',()=>$('#sidebar').classList.toggle('open'));
  $('#sidebarToggle')?.addEventListener('click',()=>{const sb=$('#sidebar'),mw=$('#mainWrapper');sb.style.transform='translateX(-100%)';mw.style.marginLeft='0';const btn=document.createElement('button');btn.className='btn btn-ghost';btn.style.cssText='position:fixed;left:12px;top:12px;z-index:150;background:var(--surface);border:1px solid var(--border);border-radius:var(--radius-sm)';btn.innerHTML='☰';btn.onclick=()=>{sb.style.transform='';mw.style.marginLeft='';btn.remove();};document.body.appendChild(btn);});
  try{await refreshClients();}catch(e){S.clients=[];console.error(e);}
  render();
  loadWeekly();
}

window.navigate=navigate;window.showAddClientModal=showAddClientModal;window.submitAddClient=submitAddClient;
window.showAddKeywordsModal=showAddKeywordsModal;window.submitAddKeywords=submitAddKeywords;window.previewKeywords=previewKeywords;
window.checkRankings=checkRankings;window.runAudit=runAudit;window.deleteClient=deleteClient;window.deleteKeyword=deleteKeyword;window.toggleSerp=toggleSerp;
window.runWeeklyUpdate=runWeeklyUpdate;window.saveWeeklyClient=saveWeeklyClient;window.saveFulfillmentTask=saveFulfillmentTask;window.setFulfillmentCategory=setFulfillmentCategory;window.loadConnections=loadConnections;
window.openSeoSop=openSeoSop;
document.addEventListener('DOMContentLoaded',init);

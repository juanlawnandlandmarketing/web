# SEO Command Center

**Internal SEO intelligence dashboard for Lawn & Land Marketing.**

Live: [ll-seo-command.vercel.app](https://ll-seo-command.vercel.app)

---

## What This Is

A centralized dashboard that gives the L&L team instant visibility into SEO performance across all 50+ clients. Instead of logging into 5 different tools per client, the team opens one dashboard and sees everything that matters — rankings, traffic value, opportunities, site health, and what to do next.

Built for **small local businesses** (lawn care & landscaping), where rankings aren't vanity metrics — they're the difference between a phone that rings and one that doesn't.

## Why It Exists

Before this dashboard:
- SEO data was scattered across DataForSEO, Google Search Console, Google Analytics, and spreadsheets
- Account managers couldn't quickly assess a client's SEO health
- Nobody knew which keywords were worth fighting for (no traffic value context)
- Rankings were just numbers without strategic meaning
- There was no automated way to flag opportunities or drops

After:
- One view per client: rankings categorized by strategic priority (Opportunities > Wins > Page 1 > Deep)
- Every keyword shows search volume, CPC, and estimated monthly traffic value
- Portfolio-level overview with traffic value as the lead metric
- Site health audits (on-page scores, backlink profiles)
- Integration hub connecting all data sources
- Foundation for AI-generated weekly action items (Phase 2)

## Architecture

```
├── public/               # Frontend (vanilla HTML/CSS/JS)
│   ├── index.html        # Shell — sidebar nav + content container
│   ├── styles.css         # L&L dark theme (brand guide compliant)
│   └── app.js            # SPA router, views, API calls
│
├── api/                  # Vercel serverless functions (Node.js)
│   ├── clients/
│   │   ├── index.js      # GET /api/clients — list all clients + demo seed
│   │   └── [id]/
│   │       ├── index.js  # GET /api/clients/:id — single client detail
│   │       ├── check.js  # POST /api/clients/:id/check — live SERP check via DataForSEO
│   │       ├── audit.js  # POST /api/clients/:id/audit — on-page audit + backlinks
│   │       ├── keywords.js  # Keyword management
│   │       └── serp/
│   │           └── [kid].js # Individual keyword SERP results
│   └── lib/
│       └── data.js       # Data layer (currently /tmp JSON, future: Vercel KV)
│
└── vercel.json           # Vercel config + CORS headers
```

**Stack:** Zero frameworks. Pure HTML/CSS/JS frontend + Vercel serverless Node.js backend. No React, no Next.js, no build step. Deploy is instant.

**Hosting:** Vercel (org: `lawn-and-land-marketing`, project: `ll-seo-command`)

**Data Storage:** Currently uses `/tmp` JSON files (ephemeral — resets on cold starts). Phase 2 will migrate to Vercel KV for persistence.

## Data Sources

| Source | Status | What It Provides | Cost |
|--------|--------|-------------------|------|
| **DataForSEO** | ✅ Connected | SERP rankings, keyword volume/CPC, backlink profiles, on-page audits | $0.002/SERP query |
| **Google Search Console** | ✅ Key configured | Real impressions, clicks, CTR, actual search queries, index coverage | Free |
| **Google Business Profile** | ⏳ Pending | Map Pack visibility, reviews, calls, direction requests | Free |
| **Google Analytics 4** | ⏳ Pending | Actual traffic, conversions, bounce rate, user behavior | Free |
| **PageSpeed Insights** | 🟢 Available | Core Web Vitals, performance scores, mobile usability | Free (no auth) |

### Google Service Account
All Google APIs use a single service account: `seo-command-center@llm-integrations-486619.iam.gserviceaccount.com`

GSC access requires per-property user permissions. Tracking spreadsheet: [GSC Access Tracker](https://docs.google.com/spreadsheets/d/18Eis5nNucegw0XDqjX3_6xTQbCtJl4glIBplXBrfXnQ/edit)

### DataForSEO Cost Analysis
- SERP query: $0.002 each
- Keyword volume batch: $0.075
- Backlink check: $0.02
- 50 clients × 10 keywords weekly = **~$4/month**
- Account balance: $111.59 (~28 months runway)

## Design System

Follows the [L&L Brand Guide](https://brand-guide-black.vercel.app/):

| Element | Value |
|---------|-------|
| Primary Green | `#ACE71D` |
| Secondary Green | `#5DCA49` |
| Background | `#000000` |
| Deep BG | `#040a04` |
| Surface | `#21202B` |
| Text | `#FFFFFF` |
| Muted | `#8a8a9a` |
| Heading Font | Rethink Sans ExtraBold 800 Italic |
| Body Font | Mulish Regular 400 |
| Label Font | Inter Medium 500 |

## Navigation

| View | Description | Status |
|------|-------------|--------|
| **Dashboard** | Portfolio overview — traffic value, client table, distribution bars | ✅ Live |
| **Clients** | Client list + click into detail view | ✅ Live |
| **Rankings** | All keywords across all clients | ✅ Live |
| **AI Actions** | Agent-generated weekly recommendations per client | 🔮 Phase 2 |
| **Connections** | Integration status + roadmap | ✅ Live |
| **Settings** | Configuration, API keys, preferences | 🔮 Future |

## Client Detail View

When you click into a client, keywords are categorized by **strategic priority** (not just position number):

| Category | Position Range | Why It Matters |
|----------|---------------|----------------|
| 🎯 **Opportunities** | #11-20 | Almost page 1 — highest ROI focus |
| 🏆 **Wins** | #1-3 | Top rankings — celebrate and protect |
| ✅ **Page 1** | #4-10 | Solid — maintain |
| 📉 **Deep Rankings** | #21-100 | Needs significant work |
| ⚫ **Not Ranking** | 100+ / none | Bottom priority |

Each keyword shows: **position** · **search volume** · **CPC** · **estimated monthly traffic value** · **ranking URL**

## Environment Variables

Set on Vercel (production):

| Variable | Purpose |
|----------|---------|
| `DATAFORSEO_USERNAME` | DataForSEO API auth |
| `DATAFORSEO_PASSWORD` | DataForSEO API auth |
| `GOOGLE_SERVICE_ACCOUNT_JSON` | Google APIs (GSC, GBP, GA4, Drive) |
| `SUPABASE_URL` | Supabase project URL for weekly dashboard storage |
| `NEXT_PUBLIC_SUPABASE_URL` | Same project URL when a client-side framework is added later |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-only Supabase key for Vercel API functions |

Never expose `SUPABASE_SERVICE_ROLE_KEY` in browser code or public screenshots. If it gets posted publicly, rotate it before launch.

## Weekly Ops Dashboard

The Weekly Ops screen is the current build path for Juan's weekly SEO command center.

It uses one global selector:
- Year
- Week number

Changing the selector updates the full dashboard for every active SEO client.

Tracked modules:
- SEO Execution: Friday checkbox for completed SEO tasks
- Technical Health: weekly technical score snapshots
- Trend: weekly DataForSEO trend snapshots
- Weekly Outputs: blog done, monthly PR count, ad hoc reports sent

Run the Supabase schema once before using the weekly API:

```sql
-- Copy and run the contents of:
-- supabase/migrations/20260603234000_weekly_command_center.sql
```

The first `Run Weekly Update` implementation creates weekly rows and placeholder technical/trend snapshots. The live technical crawler and DataForSEO trend pull should replace the placeholder hooks in `api/weekly/run.js`.

## Roadmap

### Phase 1 — Data Foundation (Current) ✅
- [x] Sidebar navigation + dashboard layout
- [x] Portfolio overview with traffic value as lead metric
- [x] Client detail with strategic keyword categorization
- [x] Live SERP checks via DataForSEO
- [x] Site health audits (on-page + backlinks)
- [x] Keyword volume + CPC enrichment
- [x] Connections page with integration status
- [x] Google service account configured
- [x] GSC access tracker spreadsheet for onboarding
- [ ] Wire up GSC API (awaiting per-property access grants)
- [ ] Add PageSpeed Insights (free, no auth needed)
- [ ] Migrate from /tmp JSON to Vercel KV for persistent storage

### Phase 2 — Intelligence Layer
- [ ] Automated weekly SERP checks (cron job)
- [ ] Historical ranking data + trend visualization
- [ ] AI-generated action items per client (Roshi + Kai agents)
- [ ] Rank change alerts (drops and gains)
- [ ] Connect Google Business Profile (Map Pack tracking)
- [ ] Connect Google Analytics 4 (real traffic data)

### Phase 3 — Team Workflow
- [ ] Department-specific views (SEO team vs account managers vs leadership)
- [ ] Client-facing reports (exportable/shareable)
- [ ] Competitor tracking per client
- [ ] Content gap analysis
- [ ] Integration with Ground Control for unified client view

## Client Management

**Clients are managed exclusively through [Ground Control](https://groundcontrol.agency).** The SEO Command Center reads client data but never adds or removes clients. This is a deliberate architectural decision — Ground Control is the single source of truth for client records.

## Development

```bash
# Clone
git clone git@github.com:LawnAndLandMarketing/seo-command-center.git
cd seo-command-center

# Run locally
vercel dev

# Deploy
vercel --prod
```

No build step. No `npm install`. Just HTML, CSS, JS, and serverless functions.

## Related Systems

| System | URL | Purpose |
|--------|-----|---------|
| Ground Control | groundcontrol.agency | Client management (source of truth) |
| Build Directory | ll-directory.vercel.app | Master project index |
| Brand Guide | brand-guide-black.vercel.app | Design system reference |
| n8n | lawnandlandmarketing.app.n8n.cloud | Workflow automation |

---

*Built by Roshi 🐢 for Lawn & Land Marketing — March 2026*

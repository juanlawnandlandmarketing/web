# Internal Monthly Scorecard

**Category:** Reporting
**Automation Readiness Score:** 9/10 - Near-full automation
**Status:** SOP documented

---

## Purpose

Process 37 creates the internal monthly SEO scorecard that tells the team which clients are improving, stalling, missing fulfillment, or need intervention before the client-facing report is written.

This is not the client report. It is the operator view. The scorecard should combine technical health, ranking movement, GSC performance, GBP/review signals, backlink/authority output, content/fulfillment completion, and known blockers into a short priority queue for Juan, the SEO team, Account Management, Koga, and Kai.

This process covers:

- Monthly internal portfolio review.
- Client risk and momentum scoring.
- Fulfillment completion checks.
- Technical, ranking, GSC, GBP, backlink, and content signal aggregation.
- Data freshness and source-quality checks.
- Exception handling for clients with incomplete tracking.
- Priority queue creation before client-facing reporting.
- Handoff to Process 38 - Client Monthly Report.

## Current State

Process 37 is represented in ClickUp by:

- `6. Monthly Report Tracking & Reporting`
- `Montlhy SEO Score`
- `Swydo Local SEO Monthly Report`
- `Building the report with Looker Studio`

Related ClickUp/reporting sources:

- `16. Generate SEO Reports for Clients`
- `Claude`
- `Ahrefs`
- `Vibeshare`
- `ClickUp`
- `SEO Reports` list/client tasks
- `DIRECTIONS - Monthly Fulfillment`
- `DIRECTIONS - Weekly Fulfillment`
- `DIRECTIONS - Quarterly Fulfillment`

The older ClickUp report-generation workflow says:

1. Export ranking data from Ahrefs Rank Tracker.
2. Generate a report in the Claude SEO Dashboard Generator project.
3. Publish the HTML report to VibeShare.
4. Update the client task in ClickUp with the report link and last-updated date.

Process 37 should preserve the useful data checks from that workflow, but it should not become the client-facing narrative step. Process 38 owns the client monthly report and must follow the SEO report protocol when drafting or revising client-facing output.

## Target State

Every monthly scorecard run should produce:

1. Active client roster for the reporting month.
2. Data freshness status by client and source.
3. Technical health snapshot.
4. Ranking movement and keyword visibility snapshot.
5. GSC clicks, impressions, CTR, average position, top movers, and index issues where available.
6. GBP/review/local visibility snapshot where available.
7. Fulfillment completion snapshot from ClickUp/dashboard work.
8. Output count and quality notes for blogs, PRs, backlinks, GBP posts, and technical fixes.
9. Risk/momentum tier for each client.
10. Internal priority queue with next actions.
11. Handoffs for missing data, urgent fixes, or client-facing report emphasis.

## Automation Score

**9/10 - Near-full automation**

Koga can automate most of this:

- Pull active clients and client metadata.
- Pull dashboard/weekly fulfillment completion.
- Pull DataForSEO ranking and SERP snapshots.
- Pull GSC Search Analytics and indexing data when access exists.
- Pull GBP/review/local signals when access exists.
- Pull Ahrefs/CSV ranking exports when provided.
- Pull ClickUp SEO report task fields and last-updated status.
- Calculate trend deltas, freshness flags, risk tiers, and action queues.
- Generate an internal scorecard summary.
- Flag clients that need Process 38 report emphasis or escalation.

Human review remains necessary because scoring priorities can be political, client-specific, package-specific, or affected by known context that raw data will miss.

## Training Video

The only reporting-specific training material found in ClickUp list `901111072650` belongs here or Process 38:

- `16. Generate SEO Reports for Clients`
- Tools: Claude, Ahrefs, VibeShare, ClickUp
- Workflow: Ahrefs rank export -> Claude report generation -> VibeShare publish -> ClickUp update

No separate Loom URL was found for Process 37 in ClickUp list `901111072650`.

Checked sources:

- `6. Monthly Report Tracking & Reporting`
- `Montlhy SEO Score`
- `Swydo Local SEO Monthly Report`
- `Building the report with Looker Studio`
- `16. Generate SEO Reports for Clients`
- `Claude`
- `Ahrefs`
- `Vibeshare`
- `ClickUp`
- `SEO Reports` list/client tasks
- Task comments
- Attachments
- Custom fields
- Checklists
- Rich embed payloads
- Full-list Loom/reporting sweep across ClickUp list `901111072650`

Decision: use the old report-generation workflow as historical source context, not as the final Process 37 output. Process 37 produces internal priority scoring; Process 38 produces client-facing report language.

## Source References

Use ClickUp for internal operating context, dashboard data for fulfillment/technical state, and source APIs for performance metrics.

| Source | Role in Process 37 |
|---|---|
| [`6. Monthly Report Tracking & Reporting`](https://app.clickup.com/t/868eegdz0) | Primary monthly reporting parent task. |
| [`Montlhy SEO Score`](https://app.clickup.com/t/868ehbgzm) | Internal SEO scoring source, typo preserved from ClickUp. |
| [`Swydo Local SEO Monthly Report`](https://app.clickup.com/t/868ehbghn) | Legacy/reporting-platform context. |
| [`Building the report with Looker Studio`](https://app.clickup.com/t/868g3rpdx) | Dashboard/report visualization source. |
| [`16. Generate SEO Reports for Clients`](https://app.clickup.com/t/868h2k6td) | Historical client report workflow: Ahrefs, Claude, VibeShare, ClickUp. |
| `SEO Reports` ClickUp list | Client report tracking fields, GBP/review links, fulfillment fields, and last-updated status. |
| [Google Search Console API: Search Analytics query](https://developers.google.com/webmaster-tools/v1/searchanalytics/query) | Clicks, impressions, CTR, average position, pages, queries, countries, devices. |
| [Google Search Console API reference](https://developers.google.com/webmaster-tools/v1/api_reference_index) | GSC Search Analytics, Sitemaps, Sites, and URL Inspection context. |
| [Looker Studio data sources](https://docs.cloud.google.com/data-studio/about-data-sources) | Report/dashboard data-source modeling context. |
| [Looker Studio documentation](https://docs.cloud.google.com/data-studio) | Visualization/reporting platform context. |
| [Ahrefs Rank Tracker](https://ahrefs.com/rank-tracker) | Legacy ranking export and rank-tracking source context. |
| [Ahrefs Looker Studio Rank Tracker fields](https://docs.ahrefs.com/en/looker-studio/docs/rank-tracker-fields) | Ranking field definitions for dashboards. |
| [DataForSEO APIs](https://dataforseo.com/apis) | Primary programmable SEO data source. |
| [DataForSEO rank tracking with SERP API](https://dataforseo.com/help-center/track-rankings-with-serp-api) | Rank-tracking implementation guidance. |
| `public/app.js` | Existing dashboard portfolio, client, ranking, fulfillment, and technical-health logic. |
| `api/weekly/index.js` / `api/weekly/run.js` | Weekly fulfillment and update API context. |
| Process 22 - Google Search Console | GSC data and indexing handoff. |
| Process 31-36 - GBP SEO | GBP work/status handoffs into reporting. |
| Process 38 - Client Monthly Report | Client-facing narrative handoff. |

## Scorecard Metrics

Use a consistent set of internal metrics. Not every client will have every source connected.

| Metric Group | Examples | Purpose |
|---|---|---|
| Data freshness | Last crawl, last rank pull, last GSC pull, last GBP/review check, last ClickUp update. | Prevent stale dashboards from driving decisions. |
| Technical health | Site health score, critical issues, clean pages, crawl errors, speed/Core Web Vitals, mobile issues. | Identify blockers before content/reporting. |
| Ranking visibility | Top 3/10/20 counts, average position, ranking deltas, new/lost keywords, local SERP movement. | Show momentum or decline. |
| Search performance | GSC clicks, impressions, CTR, average position, top queries/pages, declining pages. | Ground rankings in real search demand. |
| Local/GBP signals | Profile completeness, posts, photos, reviews, review replies, local rankings, GBP links. | Track local trust and map visibility. |
| Fulfillment completion | One-time, weekly, monthly, quarterly task completion. | Separate performance problems from execution problems. |
| Output volume | Blogs, PRs, backlinks, service pages, technical fixes, GBP posts/photos. | Show work shipped and spot under-production. |
| Authority signals | Backlink acquisition, citations, press releases, directory/social/vendor/chamber/sponsorship work. | Track off-page progress. |
| Risk flags | Missing access, stale tracking, negative reviews, index issues, ranking losses, critical technical blockers. | Build the action queue. |

## Risk Tiers

Use simple internal tiers:

| Tier | Meaning | Action |
|---|---|---|
| Green | Data fresh, fulfillment on pace, no serious decline or blockers. | Keep normal cadence. |
| Yellow | One or two warning signals: stale source, minor ranking decline, missed output, unresolved issue. | Assign owner and deadline. |
| Red | Critical technical issue, major ranking/traffic decline, missing core fulfillment, angry review pattern, broken access, or no reliable data. | Escalate immediately. |
| Gray | Not enough data to score fairly. | Fix tracking/access before judging performance. |

Do not hide gray clients by averaging missing data as zero. Missing data is its own problem.

## Workflow

### 1. Confirm Reporting Month and Roster

Record:

- Reporting month.
- Active client roster.
- Package/tier when available.
- SEO owner.
- Account Manager.
- Client status.
- Launch/onboarding status.
- Known exclusions or paused work.

Use the ClickUp `SEO Reports` list and current dashboard clients as the roster sources. Flag mismatches between systems.

### 2. Pull Data Sources

Pull only sources that are authorized and available:

- Dashboard technical crawl data.
- Dashboard fulfillment completion data.
- DataForSEO ranking/local SERP data.
- GSC performance and indexing data.
- GBP/review data when connected or manually tracked.
- Ahrefs Rank Tracker export when provided.
- ClickUp client/report task fields.
- Output trackers for blogs, PRs, backlinks, GBP posts, citations, and technical fixes.

For each source, record:

- Pulled date/time.
- Date range.
- Owner/account.
- Coverage gaps.
- Whether the source is live API, manual export, or legacy report artifact.

### 3. Validate Freshness

Before scoring, check:

- Is the client active?
- Is the domain correct?
- Is the date range correct?
- Is the latest crawl/rank pull recent enough?
- Is the GSC property correct?
- Is the GBP/profile link correct?
- Does the ClickUp task have current fields?
- Are there duplicate clients or stale reports?

If a source is stale, mark it stale. Do not blend stale numbers into a clean score.

### 4. Calculate Internal Scores

Suggested internal score components:

- Technical health: 20%.
- Ranking/search visibility: 25%.
- GSC performance: 15%.
- Local/GBP health: 15%.
- Fulfillment completion: 15%.
- Authority/output momentum: 10%.

Adjust only when the client package or missing authorized data requires it. Any weighting change must be documented.

### 5. Build Client Rows

Each client row should include:

- Client name.
- Owner.
- Tier.
- Data freshness.
- Technical score.
- Ranking score.
- GSC trend.
- GBP/local status.
- Fulfillment completion.
- Output count.
- Risk tier.
- Top issue.
- Recommended next action.
- Report emphasis for Process 38.

Keep internal notes blunt and useful. Client-facing polish comes later.

### 6. Create the Priority Queue

Sort the queue in this order:

1. Red clients with technical/indexing/access blockers.
2. Red clients with ranking or traffic decline.
3. Red clients with missed core fulfillment.
4. Yellow clients with quick wins.
5. Gray clients with missing data.
6. Green clients with growth opportunities.

Every non-green client needs an owner and next action.

### 7. Run Sanity Checks

Before sharing internally:

- Compare scorecard output against known client context.
- Check that recent launches are not judged like mature campaigns.
- Check that seasonal businesses are not misread.
- Check that missing data is labeled.
- Check that rankings and GSC trends use the same date window.
- Check that low volume clients are not over-interpreted.
- Check that client-facing language is not accidentally included in internal notes.

### 8. Share Internally

Share the internal scorecard with the SEO team and Account Management.

Include:

- Red/yellow/gray queue.
- Top portfolio risks.
- Data gaps.
- Owner assignments.
- Process 38 report-emphasis notes.
- Work that must be completed before reports go out.

Do not send the internal scorecard directly to clients.

### 9. Handoff to Process 38

For each client report:

- Provide the month, data window, and verified sources.
- Provide the main narrative direction.
- Provide wins, risks, completed work, and next focus.
- Flag sensitive topics that need AM review.
- Confirm whether the client report should mention, soften, or avoid an internal risk.

Process 38 must translate this into client-facing language using the SEO report protocol.

## Standard Output Format

Use this structure for the internal scorecard record:

```json
{
  "process": "37 - Internal Monthly Scorecard",
  "month": "2026-06",
  "client": "Client Name",
  "owner": "SEO Owner",
  "account_manager": "AM Name",
  "data_freshness": {
    "technical_crawl": "fresh",
    "rankings": "fresh",
    "gsc": "stale",
    "gbp": "missing",
    "clickup": "fresh"
  },
  "scores": {
    "technical": 82,
    "ranking_visibility": 71,
    "gsc_performance": null,
    "local_gbp": 64,
    "fulfillment": 89,
    "authority_output": 55,
    "internal_total": 73
  },
  "risk_tier": "Yellow",
  "top_issue": "GSC access missing and local ranking flat",
  "next_action": "Resolve GSC access and schedule GBP post/photo refresh",
  "process_38_report_emphasis": "Mention steady fulfillment; avoid making traffic claims until GSC is connected",
  "proof": "Dashboard URL, ClickUp task, or exported scorecard row",
  "training_video": "No standalone Process 37 Loom found; reporting workflow context from ClickUp task 868h2k6td"
}
```

## QA Checklist

- [ ] Reporting month confirmed.
- [ ] Active client roster confirmed.
- [ ] ClickUp `SEO Reports` list checked.
- [ ] `6. Monthly Report Tracking & Reporting` checked.
- [ ] Technical data freshness checked.
- [ ] Ranking data freshness checked.
- [ ] GSC availability/freshness checked.
- [ ] GBP/review/local data availability checked.
- [ ] Fulfillment completion pulled.
- [ ] Output counts reviewed.
- [ ] Missing data marked as missing/stale, not scored as clean.
- [ ] Red/yellow/gray/green tier assigned.
- [ ] Top issue and next action assigned for every non-green client.
- [ ] Known client context reviewed before escalation.
- [ ] Internal notes kept separate from client-facing copy.
- [ ] Process 38 report-emphasis notes created.
- [ ] Scorecard shared internally.

## Completion Criteria

Process 37 is complete only when:

- The active client roster is scored or explicitly marked unscorable.
- Source freshness is documented.
- Each client has a risk tier.
- Non-green clients have an owner and next action.
- Critical data/access gaps are assigned.
- The internal priority queue is shared with the team.
- Process 38 has enough verified context to draft client reports.
- ClickUp/dashboard/tracker contains the scorecard proof or final status.

## Common Mistakes

- Treating the internal scorecard as the client report.
- Averaging stale or missing data into a clean score.
- Reporting rankings without checking date range/location.
- Ignoring fulfillment misses when performance looks good.
- Ignoring technical blockers because content shipped.
- Letting old Ahrefs/VibeShare report links stand in for current data.
- Sending blunt internal notes to clients.
- Comparing new launches against mature campaigns without context.
- Failing to assign an owner for red/yellow clients.
- Creating a pretty dashboard that does not produce action.

## Internal Handoffs

| Finding | Handoff |
|---|---|
| GSC missing/stale | Process 22 - Google Search Console |
| Sitemap/indexing issue | Process 23 / Process 22 |
| Critical technical issue | Technical processes 20-28 |
| Ranking/content gap | Processes 01-09 |
| Missing monthly output | Relevant fulfillment process owner |
| GBP/local issue | Processes 29-36 |
| Backlink/authority weakness | Processes 10-19 |
| Report narrative needed | Process 38 - Client Monthly Report |
| Client-sensitive risk | Account Manager review |

## References

| Reference | Notes |
|---|---|
| ClickUp `6. Monthly Report Tracking & Reporting` | Primary monthly reporting parent task. |
| ClickUp `16. Generate SEO Reports for Clients` | Historical Ahrefs/Claude/VibeShare/ClickUp report workflow. |
| ClickUp `SEO Reports` list | Client tracking fields and report-update state. |
| Google Search Console API Search Analytics | Query clicks, impressions, CTR, average position, dimensions, and filters. |
| Google Search Console API reference | GSC services available for reporting workflows. |
| Looker Studio data sources | Data-source modeling for reporting dashboards. |
| Ahrefs Rank Tracker | Legacy rank-tracking/export source. |
| DataForSEO APIs | Programmable rank/SERP/local data source. |
| Process 38 | Client-facing monthly report handoff. |

---

*Part of the [SEO Command Center](../../README.md) - Lawn & Land Marketing*

# Client Monthly Report

**Category:** Reporting
**Automation Readiness Score:** 7/10 - Highly automatable with human approval
**Status:** SOP documented

---

## Purpose

Process 38 creates the client-facing monthly SEO report that turns verified SEO data, completed work, and internal scorecard context into a clear, positive, client-safe performance narrative.

The source of truth for every client-facing SEO report is:

- `/opt/koga/.openclaw/workspace/seo/SEO_REPORT_PROTOCOL.md`

If this SOP, an older ClickUp workflow, a template, a Claude prompt, a VibeShare report, a Looker Studio dashboard, or a prior report conflicts with the SEO Report Protocol, the protocol wins.

This process covers:

- Monthly client-facing SEO report preparation.
- Data collection and source validation.
- Positive-only client framing.
- Momentum-first keyword and visibility storytelling.
- Work-completed and next-focus narrative.
- Local SEO report handoffs where applicable.
- Account Manager review and approval.
- Delivery tracking in ClickUp or the reporting tracker.

## Current State

Process 38 is represented in ClickUp by:

- `6. Monthly Report Tracking & Reporting`
- `Swydo Local SEO Monthly Report`
- `Building the report with Looker Studio`
- `16. Generate SEO Reports for Clients`

Related ClickUp/reporting sources:

- `Montlhy SEO Score`
- `Claude`
- `Ahrefs`
- `Vibeshare`
- `ClickUp`
- `SEO Reports` list/client tasks
- Process 37 - Internal Monthly Scorecard

The older ClickUp report-generation workflow says:

1. Export data from Ahrefs Rank Tracker.
2. Generate the client report in Claude.
3. Publish the HTML through VibeShare.
4. Update the client task in ClickUp with the report link and last-updated date.

That workflow is historical source context. Process 38 should use the current SEO Report Protocol and current data sources first, then use legacy Ahrefs/Claude/VibeShare steps only when they are still the approved delivery path for that client or report batch.

## Target State

Every completed Process 38 should produce:

1. Confirmed client/reporting month.
2. Verified source data and date windows.
3. Process 37 internal scorecard context reviewed.
4. Strongest client-safe story angle selected.
5. Client-facing report drafted using positive-only framing.
6. Required disclaimer included when the report type requires it.
7. No weak Page 2+ rank reveals or client-question triggers.
8. Completed work and next focus written in plain English.
9. Account Manager/human approval before delivery.
10. Final hosted, exported, or shared report link.
11. ClickUp/reporting tracker updated with final status.

## Automation Score

**7/10 - Highly automatable with human approval**

Koga can automate much of the workflow:

- Pull current DataForSEO rankings and historical overview.
- Pull GSC performance data when access exists.
- Pull dashboard technical, fulfillment, and output data.
- Pull Process 37 scorecard handoffs.
- Select positive metrics and momentum examples.
- Draft executive summaries, wins, work-completed sections, and next-focus sections.
- Build HTML or document/report output.
- Run QA checks against the SEO Report Protocol.
- Prepare delivery links and ClickUp update notes.

The score is not higher because client-facing framing is sensitive. A human should approve the story angle, report emphasis, sensitive client context, final delivery, and any language that could create avoidable pushback.

## Training Video

The only reporting-specific training material found in ClickUp list `901111072650` belongs to the client report workflow:

- `16. Generate SEO Reports for Clients`
- Tools: Claude, Ahrefs, VibeShare, ClickUp
- Workflow: Ahrefs rank export -> Claude report generation -> VibeShare publish -> ClickUp update

No separate Loom URL was found for Process 38 in ClickUp list `901111072650`.

Checked sources:

- `6. Monthly Report Tracking & Reporting`
- `Swydo Local SEO Monthly Report`
- `Building the report with Looker Studio`
- `16. Generate SEO Reports for Clients`
- `Montlhy SEO Score`
- `Claude`
- `Ahrefs`
- `Vibeshare`
- `ClickUp`
- `SEO Reports` list/client tasks
- `seo/SEO_REPORT_PROTOCOL.md`
- `seo/LOCAL_SEO_REPORT_PROCESS.md`
- Task comments
- Attachments
- Custom fields
- Checklists
- Rich embed payloads
- Full-list Loom/reporting sweep across ClickUp list `901111072650`

Decision: use the ClickUp workflow as historical delivery context, but enforce the current SEO Report Protocol for all client-facing copy and report QA.

## Source References

Use the SEO Report Protocol for client-facing framing, ClickUp for operating context, and source APIs/exports for measured performance.

| Source | Role in Process 38 |
|---|---|
| `seo/SEO_REPORT_PROTOCOL.md` | Primary source of truth for client-facing report rules, framing, and QA. |
| `seo/LOCAL_SEO_REPORT_PROCESS.md` | Supplemental workflow for client-facing local SEO heatmap reports. |
| [`6. Monthly Report Tracking & Reporting`](https://app.clickup.com/t/868eegdz0) | Monthly reporting parent task. |
| [`Swydo Local SEO Monthly Report`](https://app.clickup.com/t/868ehbghn) | Legacy/reporting-platform context. |
| [`Building the report with Looker Studio`](https://app.clickup.com/t/868g3rpdx) | Dashboard/report visualization context. |
| [`16. Generate SEO Reports for Clients`](https://app.clickup.com/t/868h2k6td) | Historical Ahrefs -> Claude -> VibeShare -> ClickUp report workflow. |
| `SEO Reports` ClickUp list | Client report tracking, GBP/review links, fulfillment fields, and report-update state. |
| Process 37 - Internal Monthly Scorecard | Internal scorecard, risk context, and report-emphasis handoff. |
| [Google Search Console API: Search Analytics query](https://developers.google.com/webmaster-tools/v1/searchanalytics/query) | Clicks, impressions, CTR, average position, query/page/device data. |
| [DataForSEO APIs](https://dataforseo.com/apis) | Primary programmable SEO data source for rankings and SERP data. |
| [DataForSEO Labs ranked keywords](https://docs.dataforseo.com/v3/dataforseo_labs/google/ranked_keywords/live/) | Current ranking keyword source. |
| [DataForSEO historical rank overview](https://docs.dataforseo.com/v3/dataforseo_labs/google/historical_rank_overview/live/) | Historical momentum and visibility source. |
| [Ahrefs Rank Tracker](https://ahrefs.com/rank-tracker) | Legacy/manual ranking export context. |
| [Looker Studio documentation](https://docs.cloud.google.com/data-studio) | Visualization/reporting platform context. |

## Client-Facing Report Rules

These rules are mandatory:

- Reports are positive-only.
- Lead with momentum, not disappointing destination ranks.
- Do not show negative performance.
- Do not reveal weak Page 2+ rankings in client-facing language.
- Do not use holding language for low static ranks.
- Do not include metrics that make the client ask why they are not higher.
- Do not include internal notes, QA notes, or production comments.
- Do not use em dashes in client-facing reports.
- Use DataForSEO as the primary data source when generating SEO performance reports.
- If GSC or website data is unavailable, continue with available verified data and frame safely.
- If local SEO heatmaps are requested, follow `seo/LOCAL_SEO_REPORT_PROCESS.md`.

Mandatory disclaimer for Q1 SEO reports:

```text
SEO is a strategic long-term process. We evaluate performance through consistent quarter-over-quarter growth, tracking how your brand systematically scales towards top-tier authority.
```

For non-Q1 reports, include the disclaimer when the report template or Account Manager requests it, or when it helps set the right long-term frame.

## Approved Story Angles

Choose the strongest believable commercial story before drafting.

Common angles:

| Story Angle | Use When |
|---|---|
| Dominance story | Client has strong Top 1, Top 3, or Page 1 ownership. |
| Branded plus local story | Brand terms are strong and local buyer terms are improving. |
| Premium service story | A priority service line is gaining visibility. |
| Regional service story | A city, service area, or region has strong momentum. |
| Thin-footprint optimism story | Data is limited but there are honest wins or emerging movement. |
| Local map visibility story | Local grid or GBP signals support a positive client story. |
| Work-compounding story | Recent deliverables explain why momentum is building. |

The report should follow business priority, not just the largest available keyword cluster.

## Workflow

### 1. Confirm Scope

Record:

- Client name.
- Reporting month/quarter.
- Report type: standard monthly, Q1, local SEO heatmap, launch update, or custom.
- Account Manager.
- SEO owner.
- Delivery format: HTML, VibeShare, PDF, Looker Studio, hosted page, Google Doc, or ClickUp link.
- Required due date.
- Known client priorities or sensitivities.

If the report is a client-facing SEO performance report, read `seo/SEO_REPORT_PROTOCOL.md` before drafting.

### 2. Gather Internal Context

Review:

- Process 37 Internal Monthly Scorecard.
- Completed work for the reporting period.
- Open blockers.
- Account Manager notes.
- Client package/tier.
- Priority services and service areas.
- Previous report angle.
- Any sensitive issues that should be handled carefully or omitted.

Do not copy internal red/yellow/gray risk language into the client report.

### 3. Pull Performance Data

Primary sources:

- DataForSEO ranked keywords.
- DataForSEO historical rank overview.
- GSC Search Analytics where access exists.
- Dashboard rankings and technical data.
- Local SEO grid data when applicable.
- GBP/review/local data where connected or manually tracked.
- Ahrefs export only when it is the approved source for that report.

Record:

- Date range.
- Comparison range.
- Source freshness.
- Missing sources.
- Any alternate benchmark used.

If Q1 2025 or the ideal comparison period is unavailable, use the earliest available benchmark and state that in positive, client-safe language only when necessary.

### 4. Select Positive Evidence

Include only:

- Top 1 to Top 5 core wins.
- Page 1 buyer-intent terms.
- Strong branded terms.
- New visibility added.
- High-volume or high-intent terms with positive movement.
- Service-line momentum tied to client priorities.
- Local visibility wins.
- Completed work that supports future growth.

Exclude:

- Declines.
- Lost keywords.
- Static low ranks.
- Weak Page 2+ destination ranks.
- Metrics that invite a "why am I not higher" question.
- Low-value vanity terms that do not support the story.

### 5. Draft the Report

Recommended sections:

1. Executive Summary.
2. Results at a Glance.
3. Momentum or Visibility Wins.
4. Work Completed This Month.
5. What This Means.
6. Next Focus.
7. Optional local map/GBP section where relevant.
8. Clean client-facing footer.

Executive Summary must:

- Be optimistic.
- Lead with the strongest commercial story.
- Show value quickly.
- Avoid defensive technical explanation.
- Make the client feel progress is happening.

### 6. Apply Report Protocol QA

Before approval, run the protocol checks:

- No negative metrics shown.
- No weak Page 2+ rank reveals.
- No static low-rank holding language.
- Strongest commercial story is clear.
- Required disclaimer is present when required.
- Footer is client-clean.
- No em dashes.
- Service-area showcases are Page 1 only.
- Wins lead with momentum, not weak current rank.
- High-intent/high-volume improving terms are prioritized.
- Report feels like value, not explanation.

If a metric fails, reframe it or remove it.

### 7. Human Review

Send the draft to the appropriate reviewer before delivery.

Human review should confirm:

- Story angle matches client priorities.
- Claims are true and supportable.
- Client sensitivities are handled.
- No internal notes leaked.
- No report section creates avoidable pushback.
- Delivery format is correct.

### 8. Publish or Deliver

Approved delivery paths may include:

- VibeShare page.
- Hosted HTML page.
- PDF export.
- Google Doc.
- Looker Studio report.
- ClickUp report field.
- Account Manager delivery message.

When using the legacy ClickUp workflow:

1. Export Ahrefs ranking data if still required.
2. Generate with the approved current prompt/template.
3. Publish in the approved platform.
4. Share with the correct access setting.
5. Update the client task in ClickUp with the final link.
6. Update the last-updated date.

### 9. Track Completion

Update ClickUp/report tracker with:

- Report link.
- Reporting period.
- Data sources used.
- Date delivered.
- Reviewer/approval status.
- Account Manager notes.
- Any follow-up actions.

## Standard Output Format

Use this structure for ClickUp updates, trackers, or delivery notes:

```json
{
  "process": "38 - Client Monthly Report",
  "client": "Client Name",
  "reporting_period": "June 2026",
  "report_type": "Monthly SEO report",
  "primary_story_angle": "Irrigation visibility momentum",
  "data_sources": [
    "DataForSEO ranked keywords",
    "DataForSEO historical rank overview",
    "Process 37 scorecard",
    "GSC Search Analytics"
  ],
  "comparison_range": "Q1 2026 vs earliest available benchmark",
  "protocol_checks": {
    "positive_only": true,
    "no_weak_rank_reveals": true,
    "no_negative_metrics": true,
    "no_em_dashes": true,
    "client_clean_footer": true
  },
  "approval_status": "Approved by AM",
  "delivery_url": "https://example.com/report",
  "clickup_updated": true,
  "handoffs": [
    "Follow up on GSC access",
    "Use service-line momentum in next monthly strategy"
  ]
}
```

## QA Checklist

- [ ] `seo/SEO_REPORT_PROTOCOL.md` read before drafting.
- [ ] Reporting period confirmed.
- [ ] Client priorities confirmed.
- [ ] Process 37 internal scorecard reviewed.
- [ ] Data sources and date ranges documented.
- [ ] Strongest client-safe story angle selected.
- [ ] DataForSEO current and historical data checked when available.
- [ ] GSC data checked when available.
- [ ] Local SEO process followed if local heatmap report is requested.
- [ ] Only positive client-facing evidence included.
- [ ] Weak Page 2+ rankings hidden or reframed.
- [ ] No declines, lost keywords, or negative comparisons shown.
- [ ] No internal notes or QA comments included.
- [ ] Mandatory disclaimer included when required.
- [ ] No em dashes in client-facing copy.
- [ ] Footer is client-clean.
- [ ] Human/AM approval collected.
- [ ] Final report link created.
- [ ] ClickUp/report tracker updated.

## Completion Criteria

Process 38 is complete only when:

- The report follows the SEO Report Protocol.
- The story angle is client-safe and commercially relevant.
- Source data and date windows are documented.
- The report contains only approved client-facing metrics and language.
- Required disclaimer and clean footer are present when applicable.
- Human/AM review is complete.
- Final report is delivered or ready for delivery.
- ClickUp/report tracker contains the report link, period, approval status, and last-updated state.

## Common Mistakes

- Treating the internal scorecard as client-facing copy.
- Showing negative performance.
- Revealing weak Page 2+ ranks.
- Using low static ranks as "holding" wins.
- Leading with broad visibility when a priority service needs to be the story.
- Copying old Ahrefs/Claude/VibeShare output without protocol QA.
- Forgetting the mandatory disclaimer for Q1 reports.
- Leaving internal production notes in the footer.
- Using em dashes in the report.
- Sending the report before AM approval.

## Internal Handoffs

| Finding | Handoff |
|---|---|
| Missing or stale source data | Process 37 / data owner |
| GSC issue or access gap | Process 22 - Google Search Console |
| Local heatmap report needed | `seo/LOCAL_SEO_REPORT_PROCESS.md` |
| Technical blocker should be fixed before reporting | Processes 20-28 |
| Content or keyword opportunity should be next focus | Processes 01-09 |
| GBP/local issue should be highlighted or fixed | Processes 29-36 |
| Authority/backlink issue should be next focus | Processes 10-19 |
| Sensitive client situation | Account Manager review |

## References

| Reference | Notes |
|---|---|
| `seo/SEO_REPORT_PROTOCOL.md` | Primary report-generation and QA protocol. |
| `seo/LOCAL_SEO_REPORT_PROCESS.md` | Supplemental local SEO heatmap report workflow. |
| ClickUp `6. Monthly Report Tracking & Reporting` | Monthly reporting parent task. |
| ClickUp `16. Generate SEO Reports for Clients` | Historical Ahrefs/Claude/VibeShare/ClickUp workflow. |
| ClickUp `SEO Reports` list | Client report tracking and final-link state. |
| Process 37 | Internal scorecard and report-emphasis handoff. |
| Google Search Console API Search Analytics | GSC source for clicks, impressions, CTR, average position. |
| DataForSEO ranked keywords | Current keyword visibility source. |
| DataForSEO historical rank overview | Momentum and comparison source. |
| Ahrefs Rank Tracker | Legacy/manual ranking export context. |
| Looker Studio documentation | Dashboard/report visualization context. |

---

*Part of the [SEO Command Center](../../README.md) - Lawn & Land Marketing*

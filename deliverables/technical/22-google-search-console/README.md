# Google Search Console

**Category:** Technical SEO
**Automation Readiness Score:** 8/10 - Highly automatable
**Status:** SOP documented

---

## Purpose

Process 22 covers Google Search Console usage for indexing, sitemap comparison, URL inspection, performance review, and technical SEO opportunity routing. The goal is to use Google's own search data to identify which client URLs are discovered, indexed, performing, declining, or blocked before deciding what to fix next.

This process is not just "look at GSC." It is a monthly evidence workflow.

The goal is simple:

- Confirm the correct GSC property is available.
- Download or collect the client sitemap URL list.
- Download or collect the indexed URL list from GSC.
- Compare sitemap URLs against indexed URLs.
- Inspect missing or problematic URLs.
- Request indexing only after the page is actually ready.
- Pull Search performance data for clicks, impressions, CTR, and position.
- Route findings into sitemap, robots, canonical, content, internal linking, schema, or page-speed processes.
- Document the audit and update ClickUp.

## Current State

Process 22 is represented in ClickUp by:

- Parent task `7. GSC Indexing Audit`.
- Subtask `Download the post and page sitemap`.
- Subtask `Download the indexed list from GSC`.
- Subtask `Compare both listings using the custom GPT`.
- Subtask `Request the index for the not indexed URL`.

The ClickUp parent includes a `Custom GPT:` note. The comparison subtask exposes the custom GPT URL:

`https://chatgpt.com/g/g-6859869d99c48191874324f2af759edb-google-search-console-indexing-audit`

The sitemap subtask says to extract page and post URLs by going to the client's main domain and adding `sitemap.xml` at the end of the URL. In practice, Rank Math sites often expose `sitemap_index.xml`, and the final sitemap URL should be verified live instead of guessed.

## Target State

Every GSC indexing audit should produce an actionable URL status report.

The ideal system:

1. Confirms the client has a verified GSC property and the correct domain/property selected.
2. Collects sitemap URLs from the live sitemap source.
3. Exports or queries indexed URLs and page indexing status from GSC.
4. Compares sitemap URLs against indexed URLs.
5. Classifies missing URLs by cause and priority.
6. Uses URL Inspection for priority URLs where access/API quota allows.
7. Requests indexing only for clean, canonical, indexable, useful URLs.
8. Pulls performance data for query/page opportunities.
9. Routes each issue to the right SOP.
10. Updates ClickUp with the true completion state.

## Automation Score

**8/10 - Highly automatable**

Koga can automate most of this workflow when GSC access is available:

- Pull sitemap URLs.
- Query Search Console Search Analytics API.
- Use URL Inspection API for priority URLs.
- Compare sitemap URLs with indexed/GSC page lists.
- Classify URLs as indexed, missing, excluded, redirected, noindex, canonicalized, blocked, or unknown.
- Find pages with impressions but weak CTR.
- Find URLs ranking in positions 4-20.
- Find pages with declining clicks/impressions.
- Prepare indexing request queues and fix logs.

The score is not 10/10 because GSC property access, verification, account permissions, quota, manual Request Indexing clicks, live URL inspection, and final prioritization often need human handling.

## Training Video

No applicable Loom video for Process 22 was found in ClickUp list `901111072650`.

Checked sources:

- `7. GSC Indexing Audit`
- `Download the post and page sitemap`
- `Download the indexed list from GSC`
- `Compare both listings using the custom GPT`
- `Request the index for the not indexed URL`
- Related `9. Sitemap` and `Sitemap generation and submit to GSC` tasks
- Related sitemap, indexing, URL Inspection, Search Console, GSC, performance, coverage, and request-indexing task names/descriptions
- Task comments
- Attachments
- Custom fields
- Checklists
- Rich embed payloads

Decision: do not include unrelated reporting, Looker Studio, Imagify, citation, Whitespark, Signal GeNeSYS, backlink, Rank Math, schema, or press videos in this SOP. Add a video only if a real Google Search Console / indexing audit Loom is supplied or later appears in the ClickUp SOP list.

## Source References

Use ClickUp for internal task flow and Google documentation for the current GSC/API behavior.

| Source | Role in Process 22 |
|---|---|
| [`7. GSC Indexing Audit`](https://app.clickup.com/t/868eege0q) | Parent monthly fulfillment task. |
| [`Download the post and page sitemap`](https://app.clickup.com/t/868efwb1z) | Sitemap URL extraction step. |
| [`Download the indexed list from GSC`](https://app.clickup.com/t/868efwbd3) | GSC indexed/page list export step. |
| [`Compare both listings using the custom GPT`](https://app.clickup.com/t/868efwbnd) | Comparison step using the GSC indexing audit GPT. |
| [`Request the index for the not indexed URL`](https://app.clickup.com/t/868efwbw9) | Manual indexing-request step after QA. |
| [`9. Sitemap`](https://app.clickup.com/t/868eeg0x1) | Related sitemap setup workflow. |
| [`Sitemap generation and submit to GSC`](https://app.clickup.com/t/868eh5g9x) | Related sitemap submission task. |
| [Search Console overview](https://search.google.com/search-console/about) | Current GSC product context. |
| [Search Console API overview](https://developers.google.com/webmaster-tools) | API access to Search Analytics, sites, sitemaps, and URL Inspection. |
| [Search Console API reference](https://developers.google.com/webmaster-tools/v1/api_reference_index) | API services and methods. |
| [URL Inspection API](https://developers.google.com/webmaster-tools/v1/urlInspection.index/inspect) | Indexed/indexable status checks for submitted URLs. |
| [URL Inspection tool help](https://support.google.com/webmasters/answer/9012289) | Manual URL inspection behavior and live test context. |
| [Performance report help](https://support.google.com/webmasters/answer/7576553) | Query/page performance metrics and usage. |
| [Sitemaps report help](https://support.google.com/webmasters/answer/7451001) | Sitemap submission status and error review. |
| [Build and submit a sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap) | Sitemap rules and size limits. |
| `deliverables/technical/20-rank-math-setup/README.md` | Rank Math baseline and sitemap source. |
| `deliverables/technical/23-xml-sitemap/README.md` | Deeper sitemap generation and monitoring workflow. |
| `deliverables/technical/24-robots-txt/README.md` | robots.txt blockers. |
| `deliverables/technical/28-duplicate-content-canonicals/README.md` | Canonical/duplicate issues found in GSC. |
| `deliverables/on-page/05-internal-linking/README.md` | Internal linking fixes for discovered-but-weak URLs. |
| `deliverables/on-page/07-title-tags-meta/README.md` | CTR and search snippet improvement work. |

## Current GSC Rules to Respect

- Search Console data is property-specific. Always confirm the correct domain or URL-prefix property.
- GSC Performance data can be delayed and sampled/filtered in ways that require careful interpretation.
- The URL Inspection API shows indexed or indexable status for the provided URL; it does not replace the manual live URL test in the UI.
- Request Indexing should be used after the page is clean, indexable, canonical, useful, and linked.
- Sitemap submission helps discovery; it does not force indexing.
- Google can choose a different canonical than the submitted URL.
- Indexing issues should be diagnosed before repeatedly requesting indexing.
- API access requires property permission and correct OAuth/service-account authorization.

## When This Process Runs

| Trigger | What Happens |
|---|---|
| Monthly GSC indexing audit | Compare sitemap URLs and GSC indexed/page lists, then classify gaps. |
| New site launch | Submit/verify sitemap and inspect key pages. |
| New pages or posts published | Confirm priority URLs are discoverable, indexable, and eventually indexed. |
| Ranking or traffic drop | Use performance and indexing data to detect affected URLs. |
| Sitemap update | Confirm GSC sees the submitted sitemap and parsing status is clean. |
| Technical issue found | Inspect URLs for noindex, canonical, robots, crawl, mobile, or structured data issues. |
| Reporting prep | Pull real query/page data to support performance explanations and priorities. |

## Required Inputs

| Input | Used For |
|---|---|
| Client domain | Correct property and sitemap discovery. |
| GSC property URL | Exact property selection. |
| GSC access level | Determines whether data can be exported, queried, or inspected. |
| Sitemap URL(s) | Source list of intended indexable URLs. |
| Important URL list | Prioritizes service pages, service-area pages, blogs, homepage, contact, and conversion pages. |
| Published page/post list | Helps compare CMS reality to sitemap/GSC data. |
| Rank Math sitemap settings | Confirms sitemap source. |
| robots.txt | Detects crawl blocks. |
| Canonical/noindex state | Explains indexing gaps. |
| Date range | Performance analysis period. |
| Custom GPT output | Optional comparison support from ClickUp workflow. |

## Workflow

### 1. Confirm Access and Property

Start from `7. GSC Indexing Audit`.

Confirm:

- Correct client domain.
- Correct GSC property.
- Property type: Domain or URL-prefix.
- Permission level.
- Whether GSC data is available in the UI.
- Whether API access is available.
- Whether a service account has been granted access, if automation is used.
- Whether the site recently launched, migrated, or changed URLs.

If access is missing, mark the task blocked and document the exact account/property needed.

### 2. Collect Sitemap URLs

Use `Download the post and page sitemap`.

Check likely sitemap paths:

- `/sitemap.xml`
- `/sitemap_index.xml`
- Rank Math sitemap index.
- Child page/post sitemaps.
- Custom sitemap location if the site uses another plugin or static generator.

Collect:

- Sitemap index URL.
- Child sitemap URLs.
- Page sitemap URLs.
- Post sitemap URLs.
- Service/custom post type sitemap URLs.
- Last modified dates if present.
- HTTP status for each sitemap.

Do not assume `sitemap.xml` is correct if Rank Math exposes `sitemap_index.xml`.

### 3. Clean the Sitemap URL List

Normalize:

- Remove duplicates.
- Remove non-200 URLs.
- Remove URLs blocked from indexing.
- Remove paginated/internal/attachment URLs unless intentionally indexed.
- Keep canonical URL format consistent.
- Separate pages, posts, service pages, service-area pages, and low-priority URLs.

If the sitemap includes junk or missing priority pages, route to Process 23.

### 4. Download or Query GSC Indexed/Page Data

Use `Download the indexed list from GSC`.

Depending on available access, collect from:

- GSC Pages / indexing reports.
- URL Inspection exports where available.
- Search Console API.
- URL Inspection API for priority URLs.
- Manual exports from the UI.

Capture:

- Indexed URLs.
- Not indexed URLs.
- Reason/status.
- Last crawl if available.
- Google-selected canonical if available.
- User-declared canonical if available.
- Sitemap presence.
- Discovery/crawl state.

### 5. Compare Sitemap vs GSC

Use `Compare both listings using the custom GPT` when helpful, but verify the logic.

Classify each sitemap URL:

| Classification | Meaning | Next Step |
|---|---|---|
| Indexed | URL appears indexed and clean | Monitor performance. |
| Submitted, not indexed | In sitemap but not indexed | Inspect and diagnose. |
| Discovered, not indexed | Google knows the URL but has not indexed it | Check quality, internal links, canonicals, crawl demand. |
| Crawled, not indexed | Google crawled but did not index | Review content quality, duplication, canonicals, page value. |
| Alternate canonical | Google chose a different canonical | Route to Process 28. |
| Blocked by robots | Crawling blocked | Route to Process 24. |
| noindex | Page tells Google not to index | Confirm intent or fix. |
| Redirected | Submitted URL redirects | Update sitemap/canonicals. |
| Soft 404 / 404 | Page is missing or weak | Fix page or remove from sitemap. |
| Unknown | Status unclear | Inspect manually or queue for follow-up. |

### 6. Inspect Priority URLs

Prioritize:

- Homepage.
- Main service pages.
- Main service-area pages.
- New or optimized blog posts.
- Conversion pages.
- Pages with ranking potential.
- URLs missing from GSC but present in sitemap.
- URLs with impressions but no clicks.

Use URL Inspection UI or API where available.

Check:

- URL is on Google.
- Indexing allowed.
- Page fetch status.
- User-declared canonical.
- Google-selected canonical.
- Referring page/discovery.
- Sitemap presence.
- Enhancement/schema warnings.
- Mobile usability or page experience notes where visible.

### 7. Fix Before Requesting Indexing

Before using `Request the index for the not indexed URL`, confirm:

- Page returns 200.
- Page is canonical to itself unless intentionally canonicalized elsewhere.
- Page is not noindex.
- robots.txt does not block it.
- Page is in the correct sitemap.
- Page has enough unique, useful content.
- Page has internal links.
- Metadata is not blank/duplicate.
- Schema does not conflict with page content.
- The URL is the final HTTPS canonical.

Do not request indexing for broken, thin, blocked, duplicate, redirected, or non-canonical URLs. Fix first.

### 8. Request Indexing

Request indexing only for high-priority clean URLs.

Track:

- URL.
- Reason for request.
- Date requested.
- Request owner.
- Pre-check result.
- Follow-up date.
- Final status.

Humans usually handle manual Request Indexing in the GSC UI unless API/authorized automation is explicitly configured.

### 9. Pull Performance Opportunities

Use GSC Performance data to find SEO opportunities.

Review:

- Queries with high impressions and low CTR.
- Pages ranking positions 4-20.
- Pages with declining clicks or impressions.
- Service/service-area queries.
- Branded vs non-branded query split.
- Page/query combinations that need metadata, content, internal links, or new pages.
- Device or location patterns where relevant.
- Generative AI feature visibility reports when available and useful.

Route findings:

| Finding | Route |
|---|---|
| Position 4-20 query | Keyword Research, metadata, content refresh, internal links. |
| High impressions / low CTR | Title Tags & Meta Descriptions. |
| Important URL missing from index | GSC Indexing Audit, Sitemap, robots, canonical, content quality. |
| Duplicate/canonical issue | Duplicate Content / Canonicals. |
| Page not in sitemap | XML Sitemap. |
| robots block | robots.txt. |
| Weak internal discovery | Internal Linking. |
| Schema enhancement warning | Schema Markup. |
| Slow/mobile issue | Page Speed / Mobile Optimization. |

### 10. Close Out ClickUp

Update ClickUp with:

- Sitemap source used.
- Indexed list source used.
- Comparison result.
- Number of indexed, missing, excluded, blocked, and unknown URLs.
- Priority URL fixes.
- Indexing requests submitted.
- Follow-up dates.
- Handoffs to other processes.
- Any GSC access blockers.

## What Gets Automated

Koga can:

- Pull sitemap URLs.
- Query Search Analytics data when API access exists.
- Run URL Inspection API for priority URLs when authorized.
- Compare sitemap and indexed/page lists.
- Classify indexing status.
- Draft issue logs and fix queues.
- Identify CTR/ranking opportunities.
- Prepare ClickUp completion notes.

## What Stays Human

Humans handle:

- Granting GSC access.
- Verifying GSC properties.
- Manual URL Inspection live tests where needed.
- Manual Request Indexing when not automated.
- Deciding whether a page deserves indexing.
- Approving fixes that affect content, canonical, noindex, robots, sitemap, or redirects.
- Client-facing interpretation of major traffic/indexing changes.

## QA Checklist

- [ ] Correct GSC property is selected.
- [ ] GSC access is available or blocker is documented.
- [ ] Sitemap URL(s) are live and correct.
- [ ] Page/post sitemap URLs are collected.
- [ ] GSC indexed/page list is collected.
- [ ] Sitemap vs GSC comparison is complete.
- [ ] Missing URLs are classified by likely cause.
- [ ] Priority URLs are inspected.
- [ ] No broken, blocked, redirected, noindex, duplicate, or non-canonical URL is sent for indexing.
- [ ] Indexing requests are tracked with dates.
- [ ] Performance opportunities are reviewed.
- [ ] Findings are routed to the correct SOP.
- [ ] ClickUp status reflects the real completion state.

## Output Format

For each GSC audit, produce:

```json
{
  "client": "Client Name",
  "run_type": "gsc_indexing_audit",
  "clickup_source": "7. GSC Indexing Audit",
  "gsc_property": "sc-domain:client.example",
  "sitemap_source": "https://client.example/sitemap_index.xml",
  "summary": {
    "sitemap_urls": 145,
    "indexed_urls": 128,
    "missing_urls": 17,
    "priority_issues": 6,
    "indexing_requests_submitted": 4
  },
  "issues": [
    {
      "url": "https://client.example/service-area/example-city/",
      "classification": "submitted_not_indexed",
      "suspected_cause": "thin local content and weak internal links",
      "recommended_route": ["Process 03 Service Area Pages", "Process 05 Internal Linking"],
      "request_indexing": false
    }
  ],
  "training_video": "No applicable Loom found in ClickUp list 901111072650"
}
```

## Completion Criteria

The process is complete when:

- Correct GSC property/access is confirmed or blocker is logged.
- Sitemap URLs are collected and cleaned.
- GSC indexed/page data is collected.
- Sitemap vs GSC comparison is complete.
- Missing or excluded priority URLs are classified.
- Priority URLs are inspected.
- Clean high-priority URLs are requested for indexing where appropriate.
- Performance opportunities are reviewed.
- Issues are routed to the correct SOP.
- ClickUp reflects the true status.

## Common Mistakes

- Assuming `sitemap.xml` is always the right sitemap URL.
- Comparing dirty sitemap exports with GSC without normalizing URLs.
- Requesting indexing before fixing noindex, robots, canonical, redirect, or content problems.
- Treating sitemap submission as guaranteed indexing.
- Ignoring Google-selected canonical differences.
- Pulling data from the wrong GSC property.
- Mixing staging and production URLs.
- Treating GSC Performance position as a perfect rank tracker.
- Forgetting that GSC data can lag.
- Using unrelated Loom videos in this SOP.

---

*Part of the [SEO Command Center](../../README.md) - Lawn & Land Marketing*

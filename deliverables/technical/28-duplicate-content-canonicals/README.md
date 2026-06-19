# Duplicate Content / Canonicals

**Category:** Technical SEO
**Automation Readiness Score:** 6/10 - Partial automation
**Status:** SOP documented

---

## Purpose

Process 28 finds duplicate, near-duplicate, parameterized, competing, or incorrectly canonicalized URLs and decides the right fix: leave as-is, self-canonicalize, canonicalize to another URL, redirect, noindex, consolidate, rewrite, update internal links, remove from sitemap, or rebuild the page.

The goal is to make sure Google receives clear signals about which URL should rank for each page/topic without accidentally hiding useful pages, canonicalizing to weak targets, or using noindex/robots.txt as a lazy substitute for a real consolidation decision.

This process covers:

- Duplicate content and near-duplicate content.
- Google-selected vs user-declared canonical mismatches.
- Self-referencing canonical checks.
- HTTP/HTTPS, www/non-www, trailing slash, uppercase/lowercase, and parameter variants.
- Print, tag, author, archive, pagination, category, search, attachment, and feed URLs.
- Similar service or service-area pages.
- Blog cannibalization and overlapping content.
- Sitemap/canonical conflicts.
- Internal links pointing to non-canonical URLs.
- Canonical tags that point to redirected, noindexed, blocked, broken, or irrelevant URLs.

## Current State

Process 28 does not have a dedicated ClickUp task named `Duplicate Content / Canonicals`.

The process is assembled from related ClickUp tasks:

- `7. GSC Indexing Audit`
- `Compare both listings using the custom GPT`
- `Download the indexed list from GSC`
- `Download the post and page sitemap`
- `2. SEO Audit Ahrefs`
- `Introduction to Ahrefs Health Score and Site Audit`
- `1. Rank Math & SEO Plugin Initial Setup`
- `2. Onsite Core Content Optimization`
- `Open the sitemap`
- `9. Sitemap`
- `Sitemap generation and submit to GSC`

Those tasks expose the raw signals: indexed URL lists, sitemap URL lists, Ahrefs audit issues, Rank Math/WordPress settings, and onsite content workflows. This SOP turns those signals into one decision process for canonicalization and duplicate-content cleanup.

## Target State

Every duplicate/canonical review should produce:

1. URL inventory from sitemap, crawl, GSC, and audit tools.
2. Canonical inventory for priority URLs.
3. Duplicate or near-duplicate clusters.
4. User-declared canonical vs Google-selected canonical comparison when GSC data is available.
5. Sitemap vs canonical consistency check.
6. Internal-link canonical consistency check.
7. Decision for each issue: keep, canonicalize, redirect, noindex, rewrite, consolidate, or remove.
8. Human approval for content consolidation and risky indexing changes.
9. Implementation path by platform: Rank Math, WordPress, server/hosting, repo, sitemap, internal links, or content edit.
10. Post-fix verification in live HTML, crawl output, sitemap, and GSC when applicable.

The final state should be a smaller, cleaner set of indexable pages where each canonical URL has a clear purpose and supporting internal signals.

## Automation Score

**6/10 - Partial automation**

Koga can automate a lot of detection:

- Crawl page/post/service-area URLs.
- Extract canonical tags, robots directives, status codes, titles, H1s, word counts, hashes, and internal links.
- Compare sitemap URLs against canonical URLs.
- Detect canonical chains, canonicals to redirects, canonicals to 404s, canonicals to noindexed pages, and missing canonicals.
- Compare duplicate titles/meta/H1s.
- Find near-duplicate body content.
- Compare indexed URLs from GSC against intended sitemap URLs.
- Group likely cannibalization or overlap clusters.
- Prepare decision packets and fix recommendations.

The score stays at 6/10 because canonical decisions are strategic. Humans must approve when pages may need consolidation, rewrite, noindex, redirect, service-area pruning, URL removal, or ranking tradeoffs. A technically valid canonical can still be the wrong business decision.

## Training Video

No applicable Loom video for Process 28 was found in ClickUp list `901111072650`.

Checked sources:

- `7. GSC Indexing Audit`
- `Compare both listings using the custom GPT`
- `Download the indexed list from GSC`
- `Download the post and page sitemap`
- `2. SEO Audit Ahrefs`
- `Introduction to Ahrefs Health Score and Site Audit`
- `1. Rank Math & SEO Plugin Initial Setup`
- `2. Onsite Core Content Optimization`
- `Open the sitemap`
- `9. Sitemap`
- `Sitemap generation and submit to GSC`
- Related duplicate, canonical, cannibalization, similar content, noindex, sitemap, GSC, Ahrefs, Rank Math, onsite, service page, service-area page, and technical audit task names/descriptions
- Task comments for the matching and adjacent tasks
- Attachments
- Custom fields
- Checklists
- Rich embed payloads
- Full-list Loom sweep across ClickUp list `901111072650`

Decision: do not include unrelated reporting, Looker Studio, citation, Whitespark, Signal GeNeSYS, backlink, mobile, PageSpeed, GBP image, or old Imagify videos in this SOP. The only Loom surfaced in this sweep was tied to `16. Generate SEO Reports for Clients`, so it does not apply to Process 28.

## Source References

Use ClickUp for internal workflow context and Google documentation for canonicalization behavior.

| Source | Role in Process 28 |
|---|---|
| [`7. GSC Indexing Audit`](https://app.clickup.com/t/868eege0q) | Indexed URL, sitemap comparison, and URL Inspection source. |
| [`Compare both listings using the custom GPT`](https://app.clickup.com/t/868efwbnd) | Existing sitemap-vs-indexed comparison workflow. |
| [`Download the indexed list from GSC`](https://app.clickup.com/t/868efwbd3) | Indexed URL export source. |
| [`Download the post and page sitemap`](https://app.clickup.com/t/868efwb1z) | Sitemap URL export source. |
| [`2. SEO Audit Ahrefs`](https://app.clickup.com/t/868eh43am) | Technical duplicate/canonical issue source. |
| [`Introduction to Ahrefs Health Score and Site Audit`](https://app.clickup.com/t/868eh9mxh) | Ahrefs audit context. |
| [`1. Rank Math & SEO Plugin Initial Setup`](https://app.clickup.com/t/868eefzy8) | WordPress SEO plugin/canonical source of truth. |
| [`2. Onsite Core Content Optimization`](https://app.clickup.com/t/868eeg00j) | Content rewrite/consolidation workflow source. |
| [`Open the sitemap`](https://app.clickup.com/t/868egxctv) | Sitemap inspection support task. |
| [`9. Sitemap`](https://app.clickup.com/t/868eeg0x1) | Sitemap source-of-truth workflow. |
| [`Sitemap generation and submit to GSC`](https://app.clickup.com/t/868eh5g9x) | Sitemap submission/cleanup support task. |
| [Google: What is URL canonicalization](https://developers.google.com/search/docs/crawling-indexing/canonicalization) | Canonicalization concepts and duplicate URL examples. |
| [Google: Specify a canonical URL](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls) | Canonical methods, signal strength, and best practices. |
| [Google: Block indexing with noindex](https://developers.google.com/search/docs/crawling-indexing/block-indexing) | When to use noindex and why crawlers must access the page to see it. |
| [Google: Fix duplicate content](https://developers.google.com/search/docs/fundamentals/seo-starter-guide#duplicate-content) | Starter guidance for duplicate-page consolidation. |
| `deliverables/technical/22-google-search-console/README.md` | GSC URL Inspection and indexing workflow. |
| `deliverables/technical/23-xml-sitemap/README.md` | Sitemap cleanup and canonical URL inclusion rules. |
| `deliverables/technical/24-robots-txt/README.md` | Robots/resource-blocking rules. |
| `deliverables/technical/25-301-redirects/README.md` | Redirect decision and implementation workflow. |
| `deliverables/on-page/02-service-pages/README.md` | Service page uniqueness/content source. |
| `deliverables/on-page/03-service-area-pages/README.md` | Service-area uniqueness/content source. |
| `deliverables/on-page/04-blog-content/README.md` | Blog overlap/cannibalization source. |

## Canonical Rules to Respect

Google canonicalization rules that matter for this process:

- A canonical URL is the representative URL Google chooses from duplicate or near-duplicate pages.
- `rel="canonical"` is a hint, not an absolute command.
- Redirects, canonical tags, sitemap inclusion, HTTPS preference, internal links, and content similarity all influence canonicalization.
- Redirects are stronger signals than canonical tags for URL variants that should never be accessed separately.
- Sitemaps should include canonical URLs, not duplicate/non-canonical variants.
- Do not use robots.txt for canonicalization.
- Do not use `noindex` as the main way to force a canonical URL selection.
- Do not canonicalize a page to an unrelated page.
- Do not canonicalize an indexable page to a URL that is blocked, noindexed, redirected, broken, or poor quality.
- A page with `noindex` must be crawlable for Google to see the noindex directive.
- Internal links should generally point to the canonical URL.
- Self-referencing canonical tags are useful on normal indexable pages.

## When This Process Runs

| Trigger | What Happens |
|---|---|
| Quarterly technical audit | Run full duplicate/canonical scan. |
| GSC indexing audit | Compare indexed URLs, sitemap URLs, and Google-selected canonicals. |
| Ahrefs/Site Audit flags duplicate/canonical issues | Validate and classify each issue. |
| New service/service-area pages published | Check uniqueness, canonicals, and internal links. |
| Blog optimization/consolidation | Review overlap, cannibalization, and canonical decisions. |
| Site launch or migration | Verify URL variants, redirects, canonicals, sitemap, and internal links. |
| URL structure change | Decide redirect vs canonical vs noindex vs rewrite. |
| WordPress/Rank Math changes | Verify canonical output and indexing defaults. |
| Thin/duplicate city pages found | Decide rewrite, consolidate, noindex, redirect, or remove. |

## Required Inputs

| Input | Used For |
|---|---|
| Client domain | Crawl and canonical extraction. |
| XML sitemap URLs | Intended canonical URL set. |
| GSC indexed URL export | Google-visible URL set. |
| GSC URL Inspection results | Google-selected canonical and indexing state. |
| Ahrefs/Screaming Frog crawl | Duplicate/canonical/status/internal-link issue detection. |
| Rank Math/WordPress settings | Canonical/indexing source-of-truth for WP sites. |
| Priority keyword/page map | Helps decide which page should rank. |
| Service and service-area list | Validates whether overlapping pages should exist. |
| Blog/topic inventory | Detects article overlap and cannibalization. |
| Redirect map | Prevents canonical/redirect conflicts. |
| Human business context | Required for consolidation and page removal decisions. |

## URL Inventory

Build a merged URL list from:

- XML sitemap.
- WordPress posts/pages if available.
- Crawl output.
- GSC indexed/exported URLs.
- Ahrefs Site Audit issue URLs.
- Internal links.
- Known URL variants.

For each URL, capture:

| Field | Why It Matters |
|---|---|
| URL | The tested address. |
| Status code | Canonicals should not point to broken or redirected targets unless that is intentional and corrected. |
| Indexability | Determines whether the URL is eligible for indexing. |
| Canonical tag | User-declared canonical. |
| Google-selected canonical | Confirms whether Google agrees when GSC data exists. |
| Robots meta / X-Robots-Tag | Detects noindex conflicts. |
| Sitemap inclusion | Should usually include only canonical, indexable URLs. |
| Title / H1 / meta description | Helps detect duplication and overlap. |
| Word count / content hash | Helps cluster duplicates. |
| Internal inlinks | Shows whether internal links support the canonical. |
| Template/type | Page, post, service, service-area, category, tag, media, archive, etc. |

## Duplicate Types

Classify the duplicate before choosing a fix.

| Type | Examples | Typical Fix |
|---|---|---|
| Technical URL variant | HTTP/HTTPS, www/non-www, trailing slash, uppercase, query parameters | Redirect or canonical, plus internal-link cleanup. |
| Parameter duplicate | `?utm=`, tracking, filters, sort/order, session IDs | Canonical to clean URL or block/filter handling if appropriate. |
| WordPress system page | Tags, author archives, date archives, attachment pages, feeds, search pages | Noindex, disable, redirect, or remove from sitemap depending on value. |
| Thin duplicate location page | City pages with near-identical copy and no local proof | Rewrite, consolidate, noindex, redirect, or remove. |
| Service overlap | Multiple pages targeting the same service intent | Consolidate, rewrite, or choose one canonical target. |
| Blog cannibalization | Multiple posts answer the same query with similar intent | Merge, redirect, rewrite, or internal-link hierarchy. |
| Pagination/archive duplicate | Category/page archives repeating excerpts | Ensure canonical/pagination/indexing strategy is correct. |
| Media/image attachment duplicate | WordPress attachment URLs | Redirect attachment pages or noindex/remove from sitemap. |
| Cross-domain duplicate | Syndicated PR, copied profile, duplicate staging/live content | Canonical/redirect/noindex/staging block depending on context. |

## Decision Rules

Use the least risky fix that matches the real problem.

| Situation | Preferred Action |
|---|---|
| URL variant should never exist separately | 301 redirect to canonical URL. |
| Duplicate URL must remain accessible but should not rank | Canonical to the preferred URL. |
| Page has no search value and should not appear in Google | `noindex`, if crawlable. |
| Page is obsolete and has a strong replacement | 301 redirect to the replacement. |
| Page is obsolete with no replacement | 404/410 may be acceptable after approval. |
| Two pages compete for same intent but both have useful content | Consolidate or rewrite, then redirect/internal-link update. |
| Similar service-area pages serve real separate cities | Rewrite for unique local proof; do not canonicalize all city pages blindly. |
| Duplicate is caused by internal links using wrong variant | Update internal links to canonical URL. |
| Sitemap contains non-canonical URLs | Remove non-canonical URLs from sitemap. |
| Google chose a different canonical than user-declared | Strengthen signals or reconsider the declared canonical. |
| Canonical target is redirected/noindexed/broken/blocked | Fix target or change canonical immediately. |

## Workflow

### 1. Confirm Scope

Record:

- Client domain.
- Trigger.
- Source task, usually `7. GSC Indexing Audit` or `2. SEO Audit Ahrefs`.
- Tools available.
- URL types in scope.
- Whether this is audit-only or implementation-ready.
- Human approver for indexing/content decisions.

### 2. Pull Sitemap and Indexed URL Sources

Start with:

- `Download the post and page sitemap`
- `Download the indexed list from GSC`
- `Compare both listings using the custom GPT`

Compare:

- Sitemap URLs not indexed.
- Indexed URLs not in sitemap.
- Sitemap URLs that canonicalize elsewhere.
- Indexed parameter/archive/attachment/tag/search URLs.
- URLs excluded as alternate with proper canonical.
- URLs where Google chose a different canonical.

Do not assume "alternate page with proper canonical tag" is automatically bad. It may be correct if the canonical target is intentional.

### 3. Crawl and Extract Canonicals

For each priority URL and suspect URL:

1. Fetch the URL.
2. Record status code.
3. Extract canonical tag.
4. Extract robots meta and X-Robots-Tag.
5. Record final URL after redirects.
6. Record title, H1, meta description, word count, and key body text.
7. Check sitemap inclusion.
8. Check internal inlinks.
9. Check whether the canonical target is indexable and returns 200.

Flag immediately:

- Missing canonical on normal indexable pages.
- Multiple canonical tags.
- Canonical to non-200 URL.
- Canonical to redirected URL.
- Canonical to noindexed URL.
- Canonical to blocked URL.
- Canonical to unrelated page.
- Canonical chain.
- Sitemap includes non-canonical URL.
- Internal links point to non-canonical URL.

### 4. Cluster Duplicate and Near-Duplicate Pages

Group pages by:

- Exact title match.
- Exact H1 match.
- Similar title/meta/H1.
- Body content hash.
- Similar service/city keyword target.
- Same template with low unique content.
- Same query intent.
- Same canonical target.

For each cluster, identify:

- Best canonical candidate.
- Search intent.
- Current ranking/traffic if known.
- Backlinks if known.
- Internal links.
- Conversion value.
- Content uniqueness.
- Business reason for keeping separate pages.

### 5. Choose the Preferred URL

Pick the canonical target based on:

- Approved keyword/page map.
- Strongest business relevance.
- Best content quality.
- Cleanest URL.
- Existing rankings/clicks/impressions.
- Internal links.
- Backlinks.
- Conversion value.
- Sitemap status.
- Whether the page is the real current destination.

Do not pick the canonical URL only because it has the shortest URL. Pick the URL that should actually represent the topic.

### 6. Decide the Fix

Use the decision rules table.

Common fixes:

- Add/repair self-referencing canonical.
- Add canonical to preferred duplicate target.
- 301 redirect obsolete duplicate to preferred URL.
- Update Rank Math canonical field.
- Update WordPress archive/indexing settings.
- Disable or redirect attachment URLs.
- Noindex low-value archives/search/tag pages.
- Remove non-canonical URLs from sitemap.
- Update internal links to canonical URLs.
- Rewrite similar pages to make them meaningfully unique.
- Merge duplicate posts/pages and redirect the weaker URL.
- Remove stale generated pages after approval.

### 7. Human Approval Gate

Require human approval before:

- Noindexing pages.
- Removing URLs from sitemap when they may still have value.
- Redirecting pages with traffic, links, conversions, or rankings.
- Consolidating service pages, service-area pages, or blogs.
- Deleting pages.
- Canonicalizing city pages to broader pages.
- Changing Rank Math global indexing/archive settings.
- Resolving cannibalization when multiple pages have strategic value.

Approval packet should include:

- URL cluster.
- Evidence.
- Current canonical/indexing state.
- Preferred target.
- Recommended action.
- Expected SEO/user impact.
- Risk.
- Rollback path.

### 8. Implement

Implementation depends on source of truth:

| Platform/Area | Implementation |
|---|---|
| Rank Math page/post | Advanced tab canonical URL or robots settings. |
| Rank Math global settings | Archives, attachments, taxonomies, sitemap/indexing behavior. |
| WordPress content | Rewrite, merge, remove, update links, update slug. |
| Redirect plugin/Rank Math redirects | Add 301 after approval. |
| Hosting/server/repo | Add redirects or canonical logic where appropriate. |
| Static site | Update `<link rel="canonical">`, sitemap, redirects, and links in repo. |
| Sitemap | Include only intended canonical/indexable URLs. |
| Internal links | Point navigation/body/footer links to canonical URLs. |

### 9. Verify

After implementation:

1. Fetch source URL.
2. Fetch canonical target.
3. Confirm status codes.
4. Confirm canonical tag.
5. Confirm robots/indexability.
6. Confirm sitemap inclusion/removal.
7. Confirm internal links point to canonical URL where appropriate.
8. Confirm redirect behavior if used.
9. Run a small recrawl.
10. Use GSC URL Inspection for priority URLs when access exists.

Do not mark complete because the setting was changed. Mark complete after live verification.

### 10. Monitor

For important clusters:

- Recheck GSC after recrawl.
- Watch "Google chose different canonical than user" and "Duplicate without user-selected canonical" states.
- Watch clicks/impressions for consolidated URLs.
- Watch ranking movement for affected keywords.
- Confirm old URLs drop out or route correctly.
- Confirm no new non-canonical URLs enter the sitemap.

## Standard Output Format

Use this structure for ClickUp updates or handoff docs:

```json
{
  "process": "28 - Duplicate Content / Canonicals",
  "client": "Client Name",
  "domain": "https://example.com",
  "trigger": "Quarterly technical audit",
  "clickup_source": "7. GSC Indexing Audit",
  "clusters": [
    {
      "cluster": "Lawn care service duplicates",
      "urls": [
        "https://example.com/lawn-care/",
        "https://example.com/lawn-maintenance/"
      ],
      "current_state": "Two pages target same intent with similar copy.",
      "preferred_url": "https://example.com/lawn-care/",
      "recommended_action": "Merge useful content into /lawn-care/, 301 /lawn-maintenance/ after approval, update internal links.",
      "approval_required": true,
      "related_process": "Process 25 - 301 Redirects"
    }
  ],
  "canonical_issues": [
    {
      "url": "https://example.com/blog/post/?utm_source=test",
      "declared_canonical": "https://example.com/blog/post/",
      "status": "Valid",
      "action": "No change needed."
    }
  ],
  "training_video": "No applicable Loom found in ClickUp list 901111072650",
  "status": "Needs human approval"
}
```

## QA Checklist

- [ ] ClickUp `7. GSC Indexing Audit` checked when GSC data is available.
- [ ] ClickUp `2. SEO Audit Ahrefs` checked when audit data is available.
- [ ] Rank Math / SEO plugin context checked for WordPress sites.
- [ ] Sitemap source checked.
- [ ] No unrelated Loom/video added.
- [ ] Sitemap URLs collected.
- [ ] Indexed URL list collected when available.
- [ ] Canonical tags extracted.
- [ ] Status codes checked.
- [ ] Robots meta / X-Robots-Tag checked.
- [ ] Google-selected canonical checked for priority issues when GSC access exists.
- [ ] Sitemap URLs compared against canonical URLs.
- [ ] Internal links checked for non-canonical variants.
- [ ] Duplicate titles/H1/meta descriptions checked.
- [ ] Near-duplicate body content checked.
- [ ] Service/service-area/blog overlap checked when relevant.
- [ ] Canonical targets are 200, indexable, crawlable, and relevant.
- [ ] Canonical chains checked.
- [ ] Canonicals to redirects checked.
- [ ] Canonicals to noindexed URLs checked.
- [ ] Canonicals to blocked URLs checked.
- [ ] Canonicals to broken URLs checked.
- [ ] Parameter/UTM/session variants checked.
- [ ] Tag/archive/author/date/search/attachment URLs checked for WordPress sites.
- [ ] Decision made for each cluster: keep, canonicalize, redirect, noindex, rewrite, consolidate, remove, or monitor.
- [ ] Human approval collected for risky decisions.
- [ ] Sitemap cleanup completed where needed.
- [ ] Internal-link cleanup completed where needed.
- [ ] Redirect handoff completed where needed.
- [ ] Post-fix live verification completed.
- [ ] ClickUp reflects the real final status.

## Completion Criteria

Process 28 is complete only when:

- Duplicate/canonical issue sources have been reviewed.
- Each issue has a clear classification and decision.
- Canonical targets are valid and relevant.
- Sitemap and internal-link signals support the intended canonical URLs.
- Risky changes have human approval.
- Redirect, noindex, rewrite, consolidation, or sitemap handoffs are documented.
- Live verification confirms implemented canonical/indexing changes.
- GSC follow-up is queued for priority URLs when needed.
- ClickUp reflects the real final status.

## Common Mistakes

- Treating every duplicate as a problem.
- Treating "alternate page with proper canonical tag" as automatically bad.
- Canonicalizing city/service pages that should be rewritten instead.
- Canonicalizing to redirected, noindexed, blocked, broken, or unrelated URLs.
- Using robots.txt to solve duplicate content.
- Using noindex to force canonicalization.
- Leaving non-canonical URLs in the sitemap.
- Leaving internal links pointed at non-canonical URLs.
- Adding canonicals without checking live output.
- Redirecting pages with traffic/rankings without approval.
- Consolidating blog posts without preserving useful sections and internal links.
- Forgetting WordPress tag, author, attachment, and archive URLs.
- Assuming Google will immediately select the declared canonical after a fix.

## Internal Handoffs

| Finding | Handoff |
|---|---|
| Redirect needed | Process 25 - 301 Redirects |
| Sitemap includes non-canonical URLs | Process 23 - XML Sitemap |
| Google-selected canonical or indexing mismatch | Process 22 - Google Search Console |
| Robots.txt blocks a page that needs noindex/canonical processing | Process 24 - robots.txt |
| Duplicate service page needs rewrite/consolidation | Process 02 - Service Pages |
| Duplicate service-area page needs rewrite/consolidation | Process 03 - Service Area Pages |
| Blog cannibalization or duplicate article | Process 04 - Blog Content |
| Internal links point to wrong URL variant | Process 05 - Internal Linking |
| Metadata/H1 duplication | Process 07 / Process 08 |
| Rank Math canonical/indexing setting issue | Process 20 - Rank Math Setup |

## References

| Reference | Notes |
|---|---|
| Google canonicalization overview | Defines canonical URL selection and duplicate URL examples. |
| Google consolidate duplicate URLs | Methods and best practices for declaring canonical preferences. |
| Google noindex documentation | Use for pages that should not appear in Search, not as a canonical shortcut. |
| Google SEO starter guide duplicate content section | Basic consolidation guidance for duplicate pages. |
| ClickUp `7. GSC Indexing Audit` | Indexed URL and sitemap comparison source. |
| ClickUp `2. SEO Audit Ahrefs` | Technical audit issue source. |
| Process 23 | Sitemap cleanup. |
| Process 25 | Redirect implementation. |

---

*Part of the [SEO Command Center](../../README.md) - Lawn & Land Marketing*

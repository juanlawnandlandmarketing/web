# 301 Redirects

**Category:** Technical SEO
**Automation Readiness Score:** 6/10 - Partial automation possible
**Status:** SOP documented

---

## Purpose

Process 25 covers redirect planning, implementation support, verification, and cleanup. The goal is to make sure changed, removed, migrated, or broken URLs send users and Google to the best available destination without creating redirect chains, loops, wrong destinations, or stale sitemap/internal-link issues.

This process is not just "add a 301." It is a URL-change control process.

The goal is simple:

- Find broken, changed, duplicate, or old URLs that need redirect decisions.
- Map each old URL to the most relevant live destination.
- Use permanent redirects for permanent moves.
- Avoid redirecting everything to the homepage.
- Avoid chains and loops.
- Update internal links and sitemaps to the final URL.
- Verify live HTTP status and destination.
- Document every redirect source, target, reason, owner, and status.

## Current State

Process 25 is represented in the dashboard as `301 Redirects` with fulfillment tied to `Technical SEO Audit`.

The ClickUp list does not currently expose a dedicated `301 Redirects` task. The working sources for this SOP are related technical workflows:

- `2. SEO Audit Ahrefs`
- `Introduction to Ahrefs Health Score and Site Audit`
- `Issues definition`
- `7. GSC Indexing Audit`
- `1. Rank Math & SEO Plugin Initial Setup`
- `2. Onsite Core Content Optimization`
- `9. Sitemap`
- `13. Robots.txt File Managment`

That means redirect work usually starts from a crawl/audit finding, GSC indexing issue, sitemap cleanup, launch/migration task, broken link, or Rank Math/WordPress implementation need rather than from a standalone ClickUp redirect task.

## Target State

Every redirect task should produce a redirect map that explains:

1. The old/source URL.
2. The final target URL.
3. Redirect type.
4. Reason for redirect.
5. Source of the issue.
6. Implementation location.
7. Live test result.
8. Sitemap/internal-link cleanup status.
9. Owner and next action.

The finished redirect setup should send users and search engines directly from old URLs to the most relevant live URLs with one hop.

## Automation Score

**6/10 - Partial automation possible**

Koga can automate a lot of the audit and QA work:

- Crawl URLs and detect 3xx, 4xx, 5xx, chains, loops, and mixed protocol/host redirects.
- Pull sitemap URLs and flag redirected URLs in the sitemap.
- Compare old URL inventories against live URLs.
- Detect broken internal links.
- Detect common HTTP to HTTPS and non-www to www issues.
- Suggest redirect targets based on slug/title/content similarity.
- Prepare redirect maps.
- Verify live redirects after implementation.
- Detect if internal links still point through redirects.

The score is not higher because redirect implementation can live in WordPress plugins, Rank Math, hosting, `.htaccess`, Nginx, Vercel, CMS routing, or legacy server config. Humans need to approve mapping decisions and apply changes where logged-in or server-level access is required.

## Training Video

No applicable Loom video for Process 25 was found in ClickUp list `901111072650`.

Checked sources:

- `2. SEO Audit Ahrefs`
- `Introduction to Ahrefs Health Score and Site Audit`
- `Issues definition`
- `7. GSC Indexing Audit`
- `1. Rank Math & SEO Plugin Initial Setup`
- `2. Onsite Core Content Optimization`
- `9. Sitemap`
- `13. Robots.txt File Managment`
- Related redirect, 301, 302, 404, broken link, URL change, migration, technical SEO audit, Rank Math, sitemap, and GSC task names/descriptions
- Task comments
- Attachments
- Custom fields
- Checklists
- Rich embed payloads
- Full-list Loom sweep across ClickUp list `901111072650`

Decision: do not include unrelated reporting, Looker Studio, Imagify, citation, Whitespark, Signal GeNeSYS, backlink, sitemap, GSC, Rank Math setup, schema, robots.txt, or press videos in this SOP. Add a video only if a real redirects / broken links / site migration Loom is supplied or later appears in the ClickUp SOP list.

## Source References

Use ClickUp for internal workflow context and Google documentation for current redirect/search behavior.

| Source | Role in Process 25 |
|---|---|
| [`2. SEO Audit Ahrefs`](https://app.clickup.com/t/868eh43am) | Weekly technical audit source for broken URLs and redirect issues. |
| [`Introduction to Ahrefs Health Score and Site Audit`](https://app.clickup.com/t/868eh9mxh) | Related site-audit workflow context. |
| [`Issues definition`](https://app.clickup.com/t/868eh9n4h) | Related technical issue classification context. |
| [`7. GSC Indexing Audit`](https://app.clickup.com/t/868eege0q) | GSC source for indexed, excluded, redirected, or not-found URL issues. |
| [`1. Rank Math & SEO Plugin Initial Setup`](https://app.clickup.com/t/868eefzy8) | WordPress/Rank Math redirect manager context. |
| [`2. Onsite Core Content Optimization`](https://app.clickup.com/t/868eeg00j) | Content/page edits that can create URL changes. |
| [`9. Sitemap`](https://app.clickup.com/t/868eeg0x1) | Sitemap cleanup after redirects. |
| [`13. Robots.txt File Managment`](https://app.clickup.com/t/868eeg13a) | Crawl access context when diagnosing URL issues. |
| [Google: Redirects and Google Search](https://developers.google.com/search/docs/crawling-indexing/301-redirects) | Current redirect types and how Google interprets permanent vs temporary redirects. |
| [Google: Site moves with URL changes](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes) | URL migration planning and validation guidance. |
| [Google Search Console Change of Address tool](https://support.google.com/webmasters/answer/9370220) | Domain/subdomain move context after redirects are in place. |
| `deliverables/technical/20-rank-math-setup/README.md` | Rank Math redirect module/source-of-truth context. |
| `deliverables/technical/22-google-search-console/README.md` | URL Inspection and GSC issue validation. |
| `deliverables/technical/23-xml-sitemap/README.md` | Sitemap cleanup after redirects. |
| `deliverables/technical/24-robots-txt/README.md` | robots.txt blockers that may mask redirect/indexing issues. |
| `deliverables/technical/28-duplicate-content-canonicals/README.md` | Canonical vs redirect consolidation decisions. |
| `deliverables/on-page/05-internal-linking/README.md` | Internal-link cleanup after redirect implementation. |

## Current Redirect Rules to Respect

- Permanent redirects tell Google to show the new target in search results.
- Temporary redirects tell Google to keep the source URL as the search result target when the move is temporary.
- Use permanent redirects for permanent URL changes, content moves, domain changes, HTTP-to-HTTPS, and canonical host cleanup.
- Use temporary redirects only for temporary moves, maintenance, campaigns, or tests.
- Server-side redirects are preferred when available.
- Avoid redirect chains. Source URLs should redirect directly to the final destination.
- Avoid redirect loops.
- Do not redirect every removed URL to the homepage.
- Do not redirect unrelated old URLs to weak or irrelevant pages just to avoid a 404.
- Update internal links and sitemap URLs to the final destination after redirect implementation.
- A redirect does not fix thin content, duplicate content, wrong canonicals, or robots/noindex mistakes by itself.

## When This Process Runs

| Trigger | What Happens |
|---|---|
| New site launch | Map old URLs to new URLs before launch and verify after launch. |
| URL slug changes | Redirect the old URL to the new canonical URL. |
| Deleted page | Decide whether to redirect, 410, 404, consolidate, or rebuild. |
| Site/domain migration | Build and test a full old-to-new redirect map. |
| GSC 404/not found issue | Classify whether the old URL needs a redirect. |
| Ahrefs/Site Audit issue | Review broken internal/external URLs, redirect chains, and redirected pages. |
| Sitemap cleanup | Remove redirected URLs from sitemap and ensure final URLs are listed. |
| Internal linking audit | Replace internal links that point through redirects. |
| Duplicate/canonical cleanup | Decide when redirect consolidation is better than canonical tags. |

## Required Inputs

| Input | Used For |
|---|---|
| Old URL list | Source URLs that need redirect decisions. |
| New URL inventory | Candidate destinations. |
| Sitemap URL list | Detect redirected sitemap URLs and destination availability. |
| Crawl export | Finds 3xx, 4xx, chains, loops, and broken internal links. |
| GSC data | Shows indexed, excluded, redirected, and not-found URLs. |
| Ahrefs/Site Audit data | Surfaces broken links, redirected URLs, and health issues. |
| WordPress/Rank Math/hosting/repo access | Implementation path. |
| Redirect source of truth | Prevents duplicate redirect systems. |
| Content/page intent | Helps map old URLs to relevant live destinations. |
| Launch/migration notes | Explains why URLs changed. |

## Redirect Source of Truth

Choose one primary redirect system per site.

| Source | Use When | Risk |
|---|---|---|
| Rank Math Redirections | WordPress site uses Rank Math as approved redirect manager | Plugin dependency and UI-only visibility. |
| Hosting redirect rules | Host controls domain/protocol or server-level redirects | Requires hosting access and careful testing. |
| `.htaccess` | Apache/SiteGround WordPress sites with file access | Syntax mistakes can break site access. |
| Nginx config | Server-managed sites | Requires server access and reload discipline. |
| Vercel/static config | Static or app-based sites | Must update repo/deploy source, not just live behavior. |
| CMS/router rules | Platform-managed URL routing | Platform-specific behavior and export limits. |

Do not split redirects across multiple systems without a reason. Duplicate redirect systems create hard-to-debug chains and loops.

## Redirect Decision Rules

| Situation | Preferred Decision |
|---|---|
| Old page has a clear replacement | 301/308 to the replacement page. |
| Old service page maps to a current service page | 301/308 to the current service page. |
| Old city page maps to a current service-area page | 301/308 to the closest matching city/service-area page. |
| Old blog post has an updated version | 301/308 to the updated post. |
| Old blog post has no relevant replacement | Consider 404/410 or a highly relevant category/resource page. |
| HTTP/non-www/www variation | Permanent redirect to canonical protocol/host. |
| Short-term campaign/test | 302/307 only while temporary. |
| Duplicate URL format | Redirect or canonicalize based on site structure and risk. |
| Deleted thin/spam/irrelevant URL | 404/410 may be better than a weak redirect. |
| Broken URL has backlinks | Prioritize a relevant redirect target. |

## Workflow

### 1. Confirm Scope and Source

Start with the issue source:

- Ahrefs/Site Audit issue.
- GSC indexing issue.
- Launch/migration task.
- Broken internal link.
- Sitemap redirected URL.
- Manual URL change request.
- Rank Math/WordPress redirect need.

Record:

- Client domain.
- Site platform.
- Redirect source of truth.
- Access available.
- Whether this is one URL, a batch, or a migration.
- Whether the change is permanent or temporary.

### 2. Build the URL Inventory

Collect old/source URLs from:

- Previous sitemap.
- Current crawl.
- GSC pages/indexing reports.
- Ahrefs/Site Audit.
- Backlink reports.
- Old site export.
- WordPress page/post list.
- Internal links.
- Client-provided URL list.

Normalize:

- Protocol.
- Host.
- Trailing slash.
- Case.
- Query parameters.
- Index files like `/index.html`.

Keep the original URL in the map, but compare normalized versions to find duplicates.

### 3. Select the Best Destination

For each old URL, choose the most relevant live target.

Match by:

- Same service.
- Same city/service area.
- Same blog topic.
- Same intent.
- Same or stronger conversion value.
- Similar title/H1/body content.
- Existing backlinks or traffic.

Bad target choices:

- Homepage by default.
- Contact page by default.
- Unrelated service page.
- A noindex page.
- A URL that redirects again.
- A blocked URL.
- A thin placeholder page.

### 4. Choose Redirect Type

Use:

- `301` or `308` for permanent moves.
- `302` or `307` for temporary moves.

Prefer the implementation type that the platform supports cleanly. For SEO migration work, permanent server-side redirects are usually the right fit.

Do not use meta refresh or JavaScript redirects for normal SEO redirect work unless there is no server/CMS alternative and the risk is documented.

### 5. Prepare the Redirect Map

Use this format:

| Source URL | Target URL | Type | Reason | Source | Priority | Status |
|---|---|---|---|---|---|---|
| `https://example.com/old-service/` | `https://example.com/new-service/` | 301 | Service URL changed | Crawl/GSC | High | Pending |

Include notes for:

- Backlinks.
- Traffic.
- Matching confidence.
- Content gaps.
- Human approval needs.
- Implementation location.
- Expected sitemap/internal-link cleanup.

### 6. Human Approval Gate

Human approval is required when:

- The target is not an obvious one-to-one match.
- The source has backlinks or rankings.
- The redirect affects a service, service-area, homepage, or conversion URL.
- A batch touches many URLs.
- A domain/host/protocol migration is involved.
- The destination changes client positioning or claims.
- A URL should maybe be rebuilt instead of redirected.

### 7. Implement Redirects

Implement in the approved source of truth:

- Rank Math Redirections.
- Hosting redirect rules.
- `.htaccess`.
- Nginx config.
- Vercel/static config.
- CMS/router rules.

Do not implement the same redirect in multiple systems unless the stack requires it and the chain is tested.

### 8. Verify Live Behavior

For every redirect, test:

- Source URL returns the expected redirect status.
- `Location` header points to the intended target.
- Final target returns HTTP 200.
- Redirect path is one hop when possible.
- No loop.
- No redirect to blocked/noindex/canonicalized-away target.
- Mobile and desktop behavior match.
- HTTP/HTTPS and www/non-www variants resolve cleanly.

### 9. Clean Up Internal Links and Sitemaps

After redirects work:

- Replace internal links that point to old URLs.
- Remove redirected URLs from XML sitemaps.
- Add final target URLs to sitemap if needed.
- Update navigation, buttons, footers, blog links, and schema URLs.
- Update canonical tags if needed.
- Update GSC inspection/indexing notes.

Redirects are safety nets. Internal links and sitemaps should point directly to final URLs.

### 10. Monitor

After implementation, monitor:

- GSC Page with redirect / Not found patterns.
- Ahrefs/Site Audit redirect-chain and broken-link issues.
- Organic traffic to moved pages.
- Crawl errors.
- Backlink target behavior.
- Site speed impact from chains.
- New 404s created by missed URLs.

## What Gets Automated

Koga can:

- Crawl and classify redirects, 404s, chains, loops, and final statuses.
- Compare sitemap URLs against redirect behavior.
- Compare internal links against final URLs.
- Suggest target URLs from title/slug/content similarity.
- Build redirect maps.
- Validate implementation after changes.
- Prepare Ahrefs/GSC issue summaries.
- Create internal-link cleanup lists.

## What Stays Human

Humans handle:

- Approving final mappings.
- Implementing redirects in logged-in/admin/server systems.
- Deciding when to rebuild a page instead of redirecting it.
- Deciding when 404/410 is better than a weak redirect.
- Handling domain migrations and launch timing.
- Managing client communication for major URL changes.
- Approving changes that affect services, markets, offers, or conversion paths.

## QA Checklist

Before marking Process 25 complete:

- [ ] Redirect source of truth identified.
- [ ] Old/source URL list collected.
- [ ] Target URLs selected and approved.
- [ ] Redirect type matches permanent or temporary intent.
- [ ] No homepage catch-all used without a clear reason.
- [ ] High-value backlink/ranking URLs prioritized.
- [ ] Redirects implemented in the approved system.
- [ ] Each source URL returns expected status.
- [ ] Each redirect points to the intended target.
- [ ] Final target returns HTTP 200.
- [ ] No redirect chains beyond required canonical host/protocol behavior.
- [ ] No redirect loops.
- [ ] Final target is crawlable, indexable when intended, and canonical.
- [ ] Redirected URLs removed from sitemap.
- [ ] Internal links updated to final URLs.
- [ ] GSC or crawl validation completed when access exists.
- [ ] ClickUp updated with redirect map, verification, issues, and next action.

## Output Format

Use this structure in ClickUp or the redirect audit log:

```md
## Redirect Review - [Client]

Source of issue:
Redirect source of truth:
Implementation system:
Date checked:

Redirect map:
| Source URL | Target URL | Type | Reason | Priority | Status |
|---|---|---|---|---|---|

Verification:
- Source status:
- Final target status:
- Chain/loop check:
- Sitemap cleanup:
- Internal-link cleanup:

Issues found:
- [URL] - [Issue] - [Recommended route]

Next actions:
- None.
```

## Completion Criteria

Process 25 is complete when:

- A redirect map exists for all source URLs in scope.
- Human approval is documented for non-obvious or high-impact mappings.
- Redirects are implemented in the approved source of truth.
- Live tests confirm the expected status, target, and final 200 response.
- Chains, loops, bad destinations, and weak homepage redirects are resolved or documented.
- Sitemaps and internal links point to final URLs.
- GSC/Ahrefs/crawl issues are updated or queued for follow-up.
- ClickUp contains the final redirect status and next action.

## Common Mistakes

- Redirecting everything to the homepage.
- Creating chains by redirecting old URLs to URLs that redirect again.
- Creating loops between similar URLs.
- Using 302 for a permanent move.
- Using 301 for a temporary campaign/test.
- Redirecting to a noindex, blocked, broken, or unrelated target.
- Leaving redirected URLs in the sitemap.
- Leaving internal links pointed at old URLs.
- Implementing redirects in multiple systems and accidentally creating conflicts.
- Changing URL slugs without a redirect plan.
- Removing old redirects too quickly after a migration.

---

*Part of the [SEO Command Center](../../README.md) - Lawn & Land Marketing*

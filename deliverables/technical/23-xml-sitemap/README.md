# XML Sitemap

**Category:** Technical SEO
**Automation Readiness Score:** 10/10 - Fully automated
**Status:** Fully automated

---

## Purpose

Process 23 covers XML sitemap generation, validation, submission, and monitoring. The Content Engine pipeline uses the target URL set, the defined SEO strategy, platform routing, and live site checks to make sure each client site gives Google a clean list of the URLs we actually want discovered and indexed.

This process sits between Rank Math setup and Google Search Console work:

- Rank Math Setup is Process 20.
- Google Search Console is Process 22.
- XML Sitemap is Process 23.
- robots.txt is Process 24.
- Duplicate Content / Canonicals is Process 28.

The goal is simple:

- Find the real live sitemap source.
- Confirm sitemap files return clean HTTP responses.
- Confirm submitted URLs are canonical, indexable, and useful.
- Remove junk, duplicate, noindex, redirected, blocked, or low-value URLs from sitemap output.
- Submit or verify the sitemap in Google Search Console.
- Add the sitemap directive to robots.txt when appropriate.
- Monitor GSC sitemap parsing, discovered URLs, and errors.
- Route fixes to the correct technical/on-page process.

## Current State

Process 23 is represented in ClickUp by:

- Parent task `9. Sitemap`.
- Subtask `Sitemap generation and submit to GSC`.

Related Process 22 tasks also feed this workflow:

- `7. GSC Indexing Audit`.
- `Download the post and page sitemap`.
- `Download the indexed list from GSC`.
- `Compare both listings using the custom GPT`.
- `Request the index for the not indexed URL`.

The Content Engine pipeline now owns the full standard sitemap workflow. It discovers the live sitemap source, validates sitemap files, compares included URLs against the target URL set and SEO strategy, routes platform-specific updates, submits or verifies sitemap status when access exists, and records follow-up issues.

The ClickUp sitemap extraction note says to add `sitemap.xml` to the client domain. That is useful as a starting guess, but it is not enough for the SOP. Rank Math and other WordPress SEO plugins often expose a sitemap index at `/sitemap_index.xml`, with child sitemaps for pages, posts, categories, services, or other post types.

The live sitemap URL must be verified, not guessed. For Vercel + GitHub stacks, sitemap execution is generated and validated from the target URLs and defined SEO strategy in the deployable codebase. For WordPress sites, sitemap execution is fully automated by integrating with and leveraging Rank Math after Process 20 establishes the plugin baseline.

## Target State

Every client should have a sitemap record that explains:

1. The sitemap source of truth.
2. The sitemap index URL and child sitemap URLs.
3. Which post types or URL groups belong in the sitemap.
4. Which URL groups should stay out.
5. Whether the sitemap has been submitted to GSC.
6. Whether GSC can fetch and parse it.
7. Whether priority URLs in the sitemap are indexable, canonical, and internally linked.
8. What issues need follow-up through Rank Math, GSC, robots.txt, redirects, canonicals, or content QA.

## Automation Score

**10/10 - Fully automated**

Process 23 is fully automated in the Content Engine pipeline. Platform-specific routing controls how the sitemap is generated, updated, validated, and monitored:

- Vercel + GitHub stacks: the pipeline uses the target URL inventory and defined SEO strategy to generate or update sitemap output in the repo, validate the resulting XML, and verify the deployed sitemap after merge/deploy.
- WordPress sites: the pipeline integrates with Rank Math, uses the approved post-type/taxonomy settings, verifies `/sitemap_index.xml` and child sitemaps, and routes needed setting updates through the Rank Math-controlled sitemap module.

The pipeline automates:

- Discovering common sitemap URLs.
- Parsing sitemap index files and child sitemap files.
- Counting URLs by sitemap type.
- Validating HTTP status codes.
- Detecting redirects, 404s, soft errors, noindex URLs, canonical mismatches, robots blocks, duplicate URLs, and stale URLs.
- Comparing sitemap URLs against the target URL set, generated content inventory, site strategy, CMS/page inventories, and GSC indexing data when available.
- Applying platform routing for Vercel + GitHub or WordPress + Rank Math.
- Preparing GSC submission and issue reports.
- Monitoring sitemap status over time.
- Routing exceptions to Rank Math, GitHub, GSC, robots.txt, redirects, canonicals, or content QA.

No routine human gate is required for standard sitemap production. Human review is exception-only for access blockers, conflicting indexing strategy, launch/staging uncertainty, or URL-inclusion decisions that cannot be resolved from the approved SEO strategy.

## Platform Routing

| Platform | Automated Execution Path | Notes |
|---|---|---|
| Vercel + GitHub stack | Use the target URL inventory and defined SEO strategy to generate or update sitemap XML in the codebase, validate XML locally, push through GitHub, and verify the deployed sitemap after Vercel deployment. | Fully automated from source files, generated routes, redirects, canonicals, and indexability rules. |
| WordPress with Rank Math | Use Rank Math as the sitemap source of truth, verify `/sitemap_index.xml` and child sitemaps, apply approved post-type/taxonomy inclusion rules, and validate output after cache/plugin refresh. | Fully automated by integrating with and leveraging Rank Math after Process 20 baseline setup. |
| Other WordPress SEO plugin | Use only when explicitly approved as the sitemap source of truth. | Route plugin conflicts to Process 20. |
| Legacy/custom site | Generate or update XML from the approved URL inventory when no reliable CMS/plugin generator exists. | Treat as an exception path and document source-of-truth logic. |

## Training Video

No applicable Loom video for Process 23 was found in ClickUp list `901111072650`.

Checked sources:

- `9. Sitemap`
- `Sitemap generation and submit to GSC`
- `7. GSC Indexing Audit`
- `Download the post and page sitemap`
- `Download the indexed list from GSC`
- `Compare both listings using the custom GPT`
- `Request the index for the not indexed URL`
- Related sitemap, XML sitemap, GSC, indexing, Rank Math, robots, canonical, and crawl task names/descriptions
- Task comments
- Attachments
- Custom fields
- Checklists
- Rich embed payloads

Decision: do not include unrelated reporting, Looker Studio, Imagify, citation, Whitespark, Signal GeNeSYS, backlink, Rank Math setup, schema, or press videos in this SOP. Add a video only if a real XML sitemap / sitemap submission Loom is supplied or later appears in the ClickUp SOP list.

## Source References

Use ClickUp for the internal task flow and Google documentation for current sitemap behavior.

| Source | Role in Process 23 |
|---|---|
| [`9. Sitemap`](https://app.clickup.com/t/868eeg0x1) | Parent sitemap fulfillment task. |
| [`Sitemap generation and submit to GSC`](https://app.clickup.com/t/868eh5g9x) | Sitemap generation and Search Console submission step. |
| [`7. GSC Indexing Audit`](https://app.clickup.com/t/868eege0q) | Related monthly GSC audit workflow. |
| [`Download the post and page sitemap`](https://app.clickup.com/t/868efwb1z) | Sitemap URL extraction step used by the GSC audit. |
| [`Download the indexed list from GSC`](https://app.clickup.com/t/868efwbd3) | Indexed URL comparison source. |
| [`Compare both listings using the custom GPT`](https://app.clickup.com/t/868efwbnd) | Sitemap-vs-indexed comparison support. |
| [`Request the index for the not indexed URL`](https://app.clickup.com/t/868efwbw9) | Manual indexing-request follow-up after sitemap/indexability QA. |
| [Google: Learn about sitemaps](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview) | Current sitemap purpose and discovery guidance. |
| [Google: Build and submit a sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap) | Sitemap formats, limits, URL rules, and submission methods. |
| [Google Search Console Sitemaps report](https://support.google.com/webmasters/answer/7451001) | GSC sitemap submission and status review. |
| [Google robots.txt sitemap directive](https://developers.google.com/crawling/docs/robots-txt/robots-txt-spec#sitemap) | robots.txt `Sitemap:` declaration behavior. |
| `deliverables/technical/20-rank-math-setup/README.md` | Rank Math sitemap source and plugin baseline. |
| `deliverables/technical/22-google-search-console/README.md` | GSC indexing comparison and sitemap status workflow. |
| `deliverables/technical/24-robots-txt/README.md` | robots.txt blockers and sitemap directive handoff. |
| `deliverables/technical/28-duplicate-content-canonicals/README.md` | Canonical/duplicate cleanup for sitemap URL quality. |
| `deliverables/on-page/05-internal-linking/README.md` | Internal-link fixes for important but poorly discovered URLs. |

## Current Sitemap Rules to Respect

- A sitemap helps Google discover URLs; it does not guarantee crawling or indexing.
- Only include canonical URLs that should appear in search results.
- Do not include noindex, blocked, redirected, broken, duplicate, parameter-only, staging, thin, private, or low-value URLs unless there is a specific approved reason.
- Each sitemap file can contain up to 50,000 URLs or 50 MB uncompressed. Larger sites need multiple sitemaps and usually a sitemap index.
- `lastmod` should be accurate if used. Do not fake update dates.
- Do not rely on `priority` or `changefreq` as meaningful Google ranking/indexing controls.
- Sitemap location matters. A sitemap can only affect URLs at the same directory level or below unless submitted directly in GSC for a verified property.
- robots.txt can point crawlers to sitemap URLs with a `Sitemap:` directive.
- A clean sitemap still needs strong internal links, useful content, correct canonicals, and crawlable pages.

## When This Process Runs

| Trigger | What Happens |
|---|---|
| New site launch | Generate or verify sitemap, submit to GSC, and confirm priority pages are included. |
| Rank Math setup | Confirm sitemap module output and child sitemap settings. |
| Monthly technical monitoring | Fetch sitemap, check GSC status, and flag changes/errors. |
| New pages/posts published | Confirm priority URLs appear in the correct sitemap. |
| Site migration or URL changes | Remove old URLs, submit updated sitemap, and route redirects/canonicals. |
| GSC indexing issue | Compare sitemap URLs against GSC indexed/page status. |
| robots.txt update | Confirm sitemap directive exists and no important sitemap URLs are blocked. |

## Required Inputs

| Input | Used For |
|---|---|
| Client domain | Sitemap discovery and property matching. |
| CMS/platform | Determines whether sitemap is generated by Rank Math, another plugin, CMS, static build, or custom file. |
| WordPress admin or WP-CLI access | Confirm plugin settings and included post types when needed. |
| GitHub repo access for Vercel stacks | Generate, update, validate, and ship sitemap files or sitemap-generation logic. |
| Vercel deployment state | Confirms deployed sitemap output after merge/deploy for Vercel + GitHub stacks. |
| GSC property access | Submit sitemap and review parsing/status. |
| Approved indexable URL groups | Defines which pages/posts/services belong in the sitemap. |
| Target URL inventory and SEO strategy | Drives automated sitemap inclusion for Vercel + GitHub stacks. |
| Current page/post inventory | Compares CMS output to sitemap output. |
| robots.txt URL | Checks sitemap directive and crawl blockers. |
| Canonical/noindex output | Explains why URLs should be included or excluded. |
| Redirect map | Keeps old or redirected URLs out of sitemap output. |
| Launch/migration notes | Prevents staging, old-domain, or temporary URLs from entering Google-facing output. |

## Sitemap Source of Truth

Choose one sitemap source per site.

| Site Type | Preferred Source | Notes |
|---|---|---|
| WordPress with Rank Math | Rank Math sitemap module | Default source for most L&L WordPress clients after Process 20. |
| WordPress with another approved SEO plugin | Approved plugin sitemap | Do not run duplicate sitemap plugins. |
| Vercel + GitHub static/custom site | Generated XML sitemap in the deploy/build pipeline | Target URLs and SEO strategy drive the generated sitemap. |
| Ecommerce or large catalog | Platform sitemap index | Child sitemaps may be needed for products/categories. |
| Legacy/custom site | Manually generated XML sitemap | Use only when no reliable CMS/plugin generator exists. |

If multiple sitemap systems are active, pick the approved source and disable or ignore duplicates only when the platform route and source-of-truth rule are clear. If they are not clear, create an exception packet.

## Workflow

### 1. Confirm the Sitemap Task Scope

Start from `9. Sitemap` and `Sitemap generation and submit to GSC`.

Record:

- Client domain.
- Site platform.
- Expected sitemap source.
- Platform route: Vercel + GitHub, WordPress + Rank Math, other approved plugin, or exception path.
- Target URL inventory and defined SEO strategy.
- Whether this is launch setup, monthly monitoring, migration cleanup, or issue investigation.
- Whether GSC access is available.
- Whether Rank Math or another SEO plugin controls sitemap output.

### 2. Discover the Live Sitemap

Check common sitemap paths:

- `/sitemap.xml`
- `/sitemap_index.xml`
- `/wp-sitemap.xml`
- `/page-sitemap.xml`
- `/post-sitemap.xml`
- Platform-specific sitemap index URLs.

Also check:

- robots.txt for `Sitemap:` directives.
- Rank Math sitemap settings when WordPress access exists.
- GSC Sitemaps report for already submitted URLs.

Do not stop at the first guessed URL. Confirm the sitemap index and every child sitemap that matters.

### 2A. Route by Platform

For Vercel + GitHub stacks:

- Pull the target URL inventory from generated routes, static route files, sitemap-generation code, redirects, canonical rules, and the defined SEO strategy.
- Generate or update sitemap XML in the codebase or sitemap generation script.
- Validate the generated sitemap locally before push.
- After merge/deploy, fetch the live Vercel output and confirm the sitemap matches the intended target URLs.

For WordPress sites:

- Confirm Rank Math owns sitemap output after Process 20.
- Use Rank Math post-type and taxonomy sitemap settings as the sitemap source of truth.
- Verify `/sitemap_index.xml` and child sitemaps.
- Apply approved inclusion/exclusion rules through Rank Math rather than manual XML edits.
- Refresh cache/plugin output and validate the live sitemap.

If the platform route is unclear, stop and create an exception packet instead of changing sitemap output.

### 3. Validate Sitemap HTTP and XML

For the sitemap index and each child sitemap, confirm:

- HTTP 200.
- Correct XML format.
- Not blocked by authentication, maintenance mode, or firewall rules.
- Not redirected through unnecessary chains.
- Not returning HTML, 404, 500, or plugin errors.
- URL count is reasonable for the site.
- File size and URL count stay below Google limits.
- Child sitemap URLs are crawlable.

If the sitemap cannot be fetched, route the fix to Rank Math, hosting, CMS, or the static build pipeline before submitting to GSC.

### 4. Classify Sitemap Contents

Export or parse all sitemap URLs.

Group URLs by:

- Homepage.
- Service pages.
- Service-area pages.
- Blog posts.
- Core conversion pages.
- Categories/tags/taxonomies.
- Media/attachment pages.
- Author/date archives.
- Utility pages.
- Old URLs or redirected URLs.
- Low-value or duplicate pages.

The sitemap should represent URLs we want Google to discover and index. It is not a dump of every URL the CMS can generate.

### 5. Run URL Quality Checks

For each URL group, check:

- HTTP status.
- Canonical target.
- Robots meta / X-Robots-Tag.
- robots.txt blocks.
- Redirects or chains.
- Internal link presence.
- Title/meta basics.
- Duplicate or near-duplicate patterns.
- Staging/dev/test domains.
- Parameter URLs.
- Thin archive, tag, author, or attachment pages.

Route issues:

| Issue | Route To |
|---|---|
| Rank Math sitemap settings wrong | Process 20 |
| GSC sitemap status/error review | Process 22 |
| robots.txt blocking URLs | Process 24 |
| Redirected URLs in sitemap | Process 25 |
| Missing internal links | Process 05 |
| Canonical/duplicate conflict | Process 28 |
| Thin or weak page quality | Process 02, 03, or 04 |
| Metadata/snippet issue | Process 07 |

### 6. Confirm Inclusion Rules

Use these defaults unless the client/site strategy says otherwise:

| URL Type | Default Sitemap Decision |
|---|---|
| Homepage | Include. |
| Service pages | Include if canonical and indexable. |
| Service-area pages | Include if real, approved, canonical, and indexable. |
| Blog posts | Include if useful, published, canonical, and indexable. |
| Contact/About core pages | Include when they are public and useful. |
| Landing pages | Include only when meant for organic search. |
| Thank-you pages | Exclude. |
| Internal search pages | Exclude. |
| Tag/date/author archives | Usually exclude unless intentionally optimized. |
| Attachment/media pages | Usually exclude. |
| Staging/dev URLs | Exclude. |
| Redirected URLs | Exclude and replace with final canonical URL if appropriate. |
| noindex URLs | Exclude unless the noindex is temporary and intentionally pending. |

### 7. Update Sitemap Source

Depending on the site:

- For Vercel + GitHub stacks, update the sitemap source file, generation script, route inventory, or build output based on the target URLs and SEO strategy.
- For WordPress sites, adjust Rank Math sitemap post-type/taxonomy settings.
- Exclude low-value archives or attachments.
- Regenerate the static sitemap.
- Correct domain/protocol inconsistencies.
- Remove old or redirected URLs.
- Add missing priority URLs by fixing CMS publish/index settings.
- Confirm sitemap cache/plugin cache has refreshed.

Do not make live sitemap changes unless the automated route can tie the inclusion or exclusion to the target URL inventory, Rank Math configuration, or approved SEO strategy.

### 8. Submit or Verify in GSC

In Google Search Console:

- Confirm the correct property.
- Open the Sitemaps report.
- Submit the sitemap index URL or main sitemap URL.
- Verify status after Google fetches it.
- Record discovered URL count.
- Record fetch/parsing errors.
- Compare GSC-discovered sitemap counts against the parsed count.

If the sitemap is already submitted, do not repeatedly resubmit unless the URL changed or there is a real issue. Review status and fix the underlying problem.

### 9. Add or Verify robots.txt Sitemap Directive

Fetch `/robots.txt`.

Confirm it includes the correct sitemap directive when appropriate:

```txt
Sitemap: https://example.com/sitemap_index.xml
```

The directive should point to the canonical sitemap URL for the live domain. If robots.txt has old domains, staging URLs, duplicate sitemap directives, or contradictory crawl blocks, route to Process 24.

### 10. Compare Against GSC and Indexing Data

Use Process 22 when GSC access exists.

Compare:

- Sitemap URL list.
- GSC submitted sitemap status.
- GSC indexed/page lists.
- URL Inspection results for priority missing URLs.
- Google-selected canonical vs user-declared canonical.

The sitemap is healthy only when it is fetchable, clean, and aligned with the URLs we actually want indexed.

### 11. Document the Result

Update ClickUp with:

- Sitemap URL.
- Child sitemap URLs reviewed.
- URL counts by group.
- GSC submission status.
- GSC errors or warnings.
- Exclusions made or recommended.
- Issues routed to other processes.
- Date checked.
- Owner/next action.

## What Gets Automated

The Content Engine pipeline automates:

- Discover sitemap URLs.
- Parse sitemap index and child sitemap files.
- Export URL inventory.
- Check HTTP status and redirects.
- Detect duplicate, non-canonical, noindex, blocked, missing, or stale URLs.
- Compare sitemap URLs against target URL inventory, SEO strategy, crawl/page inventories, and generated content data.
- Compare sitemap URLs against GSC data when access exists.
- Detect robots.txt sitemap directives.
- Update sitemap source files or generation logic for Vercel + GitHub stacks.
- Update or verify Rank Math sitemap configuration for WordPress sites.
- Prepare GSC submission instructions.
- Generate ClickUp update summaries and issue logs.

## Exception Handling

Human review is limited to exceptions:

- Missing platform access.
- Conflicting target URL inventory or SEO strategy.
- Launch/staging uncertainty.
- Rank Math/plugin conflicts the pipeline cannot safely resolve.
- GSC access blockers.
- URL-inclusion decisions that require a business or campaign decision outside the approved strategy.
- Client-facing explanation of major indexing or visibility changes.

## QA Checklist

Before marking Process 23 complete:

- [ ] Correct client domain and canonical protocol confirmed.
- [ ] Sitemap source of truth identified.
- [ ] Platform route confirmed: Vercel + GitHub, WordPress + Rank Math, other approved plugin, or exception path.
- [ ] Target URL inventory and SEO strategy checked.
- [ ] Sitemap index URL confirmed.
- [ ] Child sitemap URLs reviewed.
- [ ] Sitemap files return HTTP 200.
- [ ] XML format is valid and fetchable.
- [ ] URL counts look reasonable.
- [ ] No staging/dev URLs are present.
- [ ] No obvious noindex URLs are present.
- [ ] No redirected or broken URLs are present.
- [ ] Canonical URL format is consistent.
- [ ] Priority service, service-area, blog, and conversion pages are included.
- [ ] Low-value archives/attachments/internal pages are excluded unless approved.
- [ ] robots.txt sitemap directive is correct or routed to Process 24.
- [ ] GSC sitemap submission/status checked when access exists.
- [ ] GSC errors/warnings documented.
- [ ] Follow-up issues routed to the right SOP.
- [ ] ClickUp updated with sitemap URL, status, findings, and next action.

## Output Format

Use this structure in ClickUp or the sitemap audit log:

```md
## XML Sitemap Review - [Client]

Sitemap source:
Platform route:
Sitemap index URL:
Child sitemaps reviewed:
Total URLs:
Target URL strategy:
GSC submitted: Yes/No
GSC status:

URL groups:
- Pages:
- Posts:
- Services:
- Service areas:
- Other:

Issues found:
- [URL] - [Issue] - [Recommended route]

Changes made:
- None.

Automation status:
- Fully automated.

Next actions:
- None.
```

## Completion Criteria

Process 23 is complete when:

- The correct sitemap URL is confirmed.
- The platform route is confirmed.
- Sitemap files are fetchable and parseable.
- Sitemap contents are aligned with intended indexable URLs.
- Obvious junk, blocked, redirected, duplicate, noindex, or stale URLs are removed or routed.
- GSC sitemap submission/status is confirmed when access exists.
- robots.txt sitemap directive is checked or routed.
- Related issues are assigned to the right follow-up process.
- ClickUp has the final sitemap URL, status, findings, and next action.

## Common Mistakes

- Assuming `/sitemap.xml` is correct without checking `/sitemap_index.xml`.
- Submitting a sitemap before checking URL quality.
- Leaving noindex, redirected, 404, staging, or canonicalized-away URLs in the sitemap.
- Letting multiple SEO plugins generate duplicate sitemaps.
- Including tag/date/author/archive pages without a strategy.
- Treating sitemap submission as indexing.
- Repeatedly requesting indexing before fixing quality/canonical/internal-link issues.
- Forgetting robots.txt sitemap directives or leaving old-domain directives in place.
- Faking `lastmod` dates to make pages look updated.
- Ignoring GSC sitemap errors after submission.

---

*Part of the [SEO Command Center](../../README.md) - Lawn & Land Marketing*

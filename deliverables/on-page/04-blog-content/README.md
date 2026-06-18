# Blog Content

**Process ID:** 04
**Category:** On-Page SEO
**Fulfillment Connection:** Blog Content Creation (1/Week) Published + Audited
**Cadence:** Weekly or monthly by client package, plus seasonal campaigns and tracker optimization passes
**Automation Readiness Score:** 9/10 - Near-full automation
**Status:** Documented

---

## Purpose

Blog Content turns keyword gaps, seasonal demand, service priorities, and local search intent into supporting articles that can rank, strengthen money pages, feed internal links, and give the client useful assets for email, GBP, press releases, and reporting.

This is one of the most automatable SEO processes because Lawn & Land already has a detailed creation workflow, a live-page optimization protocol, repeatable WordPress publishing steps, and a clear QA standard.

This process receives input from:

- Keyword Research
- Service Pages
- Service Area Pages
- Competitor Analysis
- Google Search Console
- Internal Linking
- Client priorities
- Seasonal service demand

This process feeds:

- Internal Linking
- Title Tags and Meta Descriptions
- Alt Text on Images
- Schema Markup
- Google Search Console review
- Press Releases
- GBP Posts
- Email Newsletter
- Internal Monthly Scorecard
- Client Monthly Report

## Current State

The existing production workflow is strong, but the dashboard placeholder did not explain how the moving parts connect. The real workflow already includes client/site crawling, DataForSEO keyword research, SERP review, article drafting, featured image generation, internal links, WordPress HTML, metadata, FAQs, JSON-LD schema, publishing, cache clearing, live verification, and optional Phase 3 optimization from the publishing tracker.

The risk is not that the process is hard to automate. The risk is skipping the source-of-truth workflows and publishing content that is technically present but weak, duplicated, over-optimized, missing images, missing metadata, assigned to the wrong category, or not verified live.

## Target State

Every blog article should be created or optimized from a documented brief, tied to a real keyword/topic opportunity, linked back into the site's service architecture, published with clean metadata and media, and verified from the live URL.

The final blog packet must include:

- Client and site context
- Page and post sitemap context
- DataForSEO keyword brief
- SERP/content gap notes
- Seasonal and local context
- Approved topic and angle
- Article draft
- Featured image and alt text
- 5-8 strategic internal links when creating a new article
- Clickable phone links when phone numbers appear
- Clean WordPress-ready HTML
- Rank Math title and meta description
- Excerpt
- Slug
- Category
- FAQs
- JSON-LD schema recommendations or script
- Publishing or optimization status
- Live verification notes

## Required Inputs

Before creating or optimizing blog content, collect these inputs:

| Input | Owner | Notes |
|---|---|---|
| Client domain | Human or Koga | Required for crawling, internal links, and publishing. |
| Client name and primary market | Human or Koga | Needed for local and brand context. |
| Services and priority services | Human or Koga | Blog topics should support money services. |
| Service areas | Human or Koga | City/state context for keyword and local relevance. |
| Current sitemap | Koga/Kai | Used for internal links and duplicate checks. |
| Current blog sitemap | Koga/Kai | Used to avoid duplicate or near-duplicate topics. |
| Keyword map or topic brief | Koga/Kai | Use approved opportunities when available. |
| DataForSEO location code | Koga/Kai | Required for real local keyword data. |
| Seasonal context | Koga/Kai | Current month, weather, lawn/landscape timing, local conditions. |
| Client proof or details | Human or Koga | Services, process, guarantees, exclusions, photos, reviews. |
| WordPress access | Human or Koga | SSH/WP-CLI preferred for publishing and optimization. |
| Publishing tracker row | Koga/Kai | Required when article comes from the L&L Content Engine tracker. |

## Source-of-Truth Workflows

Use the correct source workflow before touching content.

| Source | When To Use |
|---|---|
| `BLOG-CREATION-PROCESS.md` | Required before drafting or publishing a new blog post. |
| `OPTIMIZATION-PROTOCOL.md` | Required before optimizing any article from the L&L Content Engine Publishing Tracker. |
| `seo/automation/STEP_6A_CONTENT_BRIEFS_P1.md` | Used for automated blog brief generation and annual content planning. |
| Keyword Research SOP | Used to select approved service/topic opportunities. |
| Internal Linking SOP | Used when adding or auditing links across the site. |
| SEO Report Protocol | Used when blog performance is included in client-facing reporting. |

Do not rely on memory when a source workflow applies.

## Workflow

### 1. Classify the Blog Task

Start by identifying the work type.

Common task types:

- New blog post
- Monthly blog batch
- Weekly blog fulfillment
- Seasonal content campaign
- Existing blog optimization
- Publishing tracker Phase 3 optimization
- Duplicate or consolidation review
- Blog-to-press-release support
- Blog-to-GBP/email support

If the task is a new blog post, read and follow `BLOG-CREATION-PROCESS.md`.

If the task comes from the publishing tracker, read and follow `OPTIMIZATION-PROTOCOL.md`.

### 2. Crawl the Site and Existing Blog

Before selecting or drafting content, crawl:

- Service pages
- Service area pages
- About/trust pages
- Contact page
- Existing blog index and post sitemap
- Relevant category archives when available

Use the crawl to:

- Find internal link targets
- Identify missing service support content
- Avoid duplicate topics
- Find old posts that can be linked or refreshed
- Confirm category structure
- Confirm the site's live URL patterns

Do not write a blog post in isolation from the site architecture.

### 3. Build or Validate the Keyword Brief

Use DataForSEO and the approved keyword map when available.

The keyword brief should include:

| Field | Description |
|---|---|
| Primary keyword | Main target topic. |
| Secondary keywords | Supporting variations. |
| Long-tail questions | FAQ and H2 candidates. |
| Search volume | Local demand signal. |
| Competition/CPC | Difficulty and commercial value signals. |
| Search intent | Informational, commercial, transactional, or mixed. |
| Funnel stage | TOFU, MOFU, or BOFU support. |
| Related service page | Money page the blog should support. |
| Related service area | Local page the blog should support when relevant. |
| Competing URLs | Top ranking examples and gaps. |
| Angle recommendation | Why this article should exist and how it can outperform. |

If DataForSEO is unavailable, document the fallback and avoid pretending the brief is data-backed.

### 4. Check for Duplicate or Near-Duplicate Content

Before writing or optimizing, compare the proposed topic against:

- Existing blog posts
- Recently published posts
- Pending tracker rows
- Service pages
- Service area pages
- Similar posts with WordPress suffixes like `-2` or `-3`

Hard stop cases:

- Same site, same topic, same city
- Same or near-identical title/H1
- Same or near-identical body angle
- Duplicate permalink or collision suffix
- Blog topic that should be a service page instead

If a duplicate exists, recommend consolidation, redirect, rewrite angle, or park the topic.

### 5. Build the Blog Brief

Create a brief before drafting.

Required brief fields:

| Field | Description |
|---|---|
| Client | Client name/domain. |
| Process ID | `04`. |
| Work Type | New post, batch, optimization, tracker optimization, or refresh. |
| Target Topic | Article topic. |
| Target URL/Slug | Proposed or existing URL. |
| Primary Keyword | Main target keyword. |
| Secondary Keywords | Supporting terms. |
| Search Intent | Informational, commercial, transactional, or mixed. |
| Funnel Stage | TOFU, MOFU, or BOFU support. |
| Target Service Page | Service page to support with internal links. |
| Target Service Area | Local page to support when relevant. |
| Seasonal/Local Context | Month, market, weather, timing, or service conditions. |
| Reader Problem | What the homeowner is trying to solve. |
| Article Angle | Why this article is useful and different. |
| Internal Link Plan | Service, blog, trust, and contact links. |
| Image Plan | Featured image direction and alt text. |
| SEO Package | Metadata, excerpt, FAQs, slug, schema notes. |
| Human Notes | Client-specific claims, exclusions, or approval notes. |

### 6. Draft the Article

Use `BLOG-CREATION-PROCESS.md` for new posts.

Content standards:

- Usually target 1,200-1,500 words unless the brief says otherwise.
- Match the reader's intent quickly.
- Use primary and secondary keywords naturally.
- Include useful seasonal and local context.
- Support service and city pages with links.
- Use readable H2/H3 structure.
- Use lists, tables, or steps only when they help.
- Avoid generic SEO filler.
- Avoid fake local specificity.
- Avoid unsupported prices, guarantees, certifications, or project claims.
- End with a useful next step or soft CTA.

Do not label the final section "Conclusion" unless the client style specifically calls for it.

### 7. Generate or Select the Featured Image

For new posts, create or select a featured image that matches the actual article topic.

Image standards:

- 1200 x 628 px when generating for blog/OG use.
- Finished result over work-in-progress when appropriate.
- No fake logos, fake text, fake trucks, distorted equipment, or unrealistic service visuals.
- No people when the source process calls for no people.
- Local and seasonal visual context when useful.
- Alt text describes the image naturally and supports accessibility.

For optimization work, verify the existing featured image is present, relevant, and not visibly flawed.

### 8. Add Internal Links

For new blog posts, add 5-8 strategic internal links when the site has enough targets.

Priority order:

1. Core service pages
2. Individual service pages
3. Service area pages
4. Related blog posts
5. About/reviews/trust pages
6. Contact/estimate page

Anchor text should be descriptive and natural. Do not overuse exact-match anchors. Do not link the same page repeatedly with the same anchor.

### 9. Prepare WordPress HTML

Format the article for WordPress.

Requirements:

- Use clean HTML tags.
- Use H2/H3 hierarchy correctly.
- Use paragraph tags.
- Use ordered/unordered lists where helpful.
- Make phone numbers clickable.
- Avoid unnecessary inline CSS except table borders when required.
- Do not leave workflow notes, status text, prompt instructions, or AI self-checks in the body.

### 10. Prepare SEO Elements

Every blog packet should include:

- Rank Math title or SEO title
- Meta description
- Focus keyword when the site uses Rank Math
- Excerpt
- Slug
- Category
- FAQs
- JSON-LD schema when appropriate
- Featured image alt text

Metadata should be click-worthy and natural. It is not a keyword-stuffing container.

### 11. Publish or Optimize in WordPress

Use SSH/WP-CLI when available.

For publishing:

- Create or update the post.
- Assign intentional category.
- Set author when needed.
- Upload and assign featured image.
- Add alt text.
- Update Rank Math metadata.
- Add excerpt.
- Add schema if required.
- Set publish date/status.
- Purge cache.

For tracker optimization:

- Start from the live URL.
- Audit the live article.
- Fix safely fixable issues.
- Publish improvements.
- Purge cache.
- Verify live page.
- Only then update the tracker.

### 12. Live QA

After publishing or optimizing, verify the live URL.

Minimum checks:

- Live URL returns HTTP 200.
- Title tag is present.
- Meta description is present.
- H1 is present and human-readable.
- Canonical is correct.
- Featured image exists.
- Category is intentional and not only `Uncategorized`.
- Excerpt is customer-facing and not cut off mid-sentence.
- Body contains no visible workflow text, schema dump, AI notes, or `STATUS: APPROVED`.
- Body has no special-character artifacts like `\/`, `\"`, `/n`, or broken apostrophes.
- Body has no em dashes if the active blog protocol forbids them.
- Internal links work.
- Phone links work.
- JSON-LD does not appear visibly in the article body.
- Mobile render is readable.
- Cache has been cleared when needed.

### 13. Tracker Close-Out When Applicable

For articles from the L&L Content Engine Publishing Tracker:

- Do not update the sheet until live verification passes.
- Update Phase 3 status only after verification.
- Add the actual completion timestamp.
- Leave duplicate, broken, or blocked rows pending.
- Report blockers in the required channel.

Do not mark a tracker row complete because the post merely exists.

## Automation Plan

### Koga/Kai Can Automate

- Crawl service pages and blog sitemap.
- Pull DataForSEO keyword ideas, related queries, and SERP data.
- Build blog briefs and topic calendars.
- Detect duplicate or near-duplicate topics.
- Draft articles.
- Generate featured image prompts and alt text.
- Generate internal link plans.
- Convert articles to WordPress-ready HTML.
- Draft Rank Math title, meta description, focus keyword, excerpt, slug, FAQs, and JSON-LD.
- Publish or update posts through WP-CLI when authorized.
- Purge cache.
- Verify live URLs.
- Run Phase 3 optimization checks.
- Prepare GBP/email/press-release support assets from the published article.

### Human Must Handle

- Approve sensitive topics, claims, pricing, guarantees, or client-specific positioning.
- Provide missing client/service facts.
- Approve unusual offers or promotions.
- Provide real project photos when needed.
- Resolve access, verification, or page-builder blockers.
- Decide whether to consolidate or remove duplicates when the decision affects site structure.
- Review negative or legally sensitive content before publishing.

## Output Format

The completed blog content packet should contain at minimum:

| Field | Description |
|---|---|
| Client | Client name/domain. |
| Process ID | `04`. |
| Work Type | Creation, batch, optimization, tracker optimization, or refresh. |
| Topic | Article topic. |
| Target URL | Proposed or live URL. |
| Primary Keyword | Main target keyword. |
| Secondary Keywords | Supporting terms. |
| Search Intent | Informational, commercial, transactional, or mixed. |
| Funnel Stage | TOFU, MOFU, or BOFU support. |
| Keyword Brief | DataForSEO or documented fallback. |
| Content Angle | Recommended angle and gap. |
| Draft HTML | WordPress-ready body content. |
| Featured Image | File name, source, and alt text. |
| Internal Links | Links and anchors included. |
| SEO Title | Rank Math or SEO title. |
| Meta Description | Search snippet. |
| Excerpt | Customer-facing teaser. |
| Slug | Final permalink slug. |
| Category | Intentional blog category. |
| FAQs | Questions and answers. |
| Schema Notes | JSON-LD or schema recommendation. |
| Human Approval | Approved, revise, rejected, or pending. |
| Publish Status | Drafted, staged, published, verified, optimized, blocked, or parked. |
| QA Notes | Live checks and issues. |

## Quality Checklist

Before marking this process complete, verify:

- [ ] Correct source workflow was read and followed.
- [ ] Site pages were crawled.
- [ ] Existing blog posts were checked.
- [ ] Duplicate or near-duplicate topics were checked.
- [ ] Keyword brief exists or fallback is documented.
- [ ] Seasonal/local context is accurate.
- [ ] Article answers the reader intent.
- [ ] Service and city claims are accurate.
- [ ] Internal links support money pages.
- [ ] Featured image exists and fits the topic.
- [ ] Alt text is present.
- [ ] WordPress HTML is clean.
- [ ] Metadata is present and useful.
- [ ] Excerpt is customer-facing.
- [ ] Category is intentional.
- [ ] FAQs are useful and visible if schema is used.
- [ ] Schema is not visible in the body.
- [ ] No workflow artifacts or AI self-checks are visible.
- [ ] No special-character artifacts are visible.
- [ ] Cache was cleared when needed.
- [ ] Live URL returns HTTP 200.
- [ ] Live page was verified after publishing or optimization.
- [ ] Tracker was updated only after live verification when applicable.

## Completion Criteria

This process is complete when:

1. The blog brief exists.
2. The article is drafted, optimized, or intentionally parked.
3. Featured image, metadata, excerpt, category, internal links, FAQs, and schema notes are complete.
4. Human approval is documented when required.
5. The post is published or the publish-ready update packet is staged.
6. Live QA confirms the page works and is clean.
7. Tracker status is updated only when the tracker protocol applies and live verification passed.
8. The article can feed internal linking, GBP, email, press release, GSC, and reporting workflows without rework.

## Common Mistakes

- Writing before crawling the client's site.
- Writing before checking existing blog topics.
- Using generic keyword guesses instead of DataForSEO when available.
- Publishing duplicate service + city topics.
- Leaving `STATUS: APPROVED`, prompt notes, schema text, or AI artifacts visible.
- Using a featured image that does not match the service.
- Assigning only `Uncategorized`.
- Forgetting Rank Math metadata.
- Skipping internal links to service pages.
- Stuffing city names into every heading.
- Inventing local details.
- Updating the publishing tracker before live verification.
- Verifying only the WordPress editor and not the live page.
- Forgetting to purge cache on Avada/SiteGround sites.

## Source References

- `/opt/koga/.openclaw/workspace/BLOG-CREATION-PROCESS.md`
- `/opt/koga/.openclaw/workspace/OPTIMIZATION-PROTOCOL.md`
- `/opt/koga/.openclaw/workspace/seo/automation/STEP_4_KEYWORD_CLUSTERING.md`
- `/opt/koga/.openclaw/workspace/seo/automation/STEP_6A_CONTENT_BRIEFS_P1.md`
- `/opt/koga/.openclaw/workspace/seo/automation/STEP_6B_CONTENT_BRIEFS_P2.md`
- `/opt/koga/.openclaw/workspace/seo/ONBOARDING_MASTER.md`
- `/opt/koga/.openclaw/workspace/seo/SEO_MASTER_STRATEGY.md`

---

*Part of the [SEO Command Center](../../README.md) - Lawn & Land Marketing*

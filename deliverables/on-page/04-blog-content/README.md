# Blog Content Factory Engine

**Process ID:** 04
**Category:** On-Page SEO
**Fulfillment Connection:** Blog Content Creation (1/Week) Published + Audited / Content Engine / Publishing Tracker Optimization
**Cadence:** Weekly or monthly by client package, plus seasonal campaigns, n8n runs, and tracker optimization passes
**Automation Readiness Score:** 9/10 - 90% automated
**Status:** 90% automated

---

## Purpose

The Blog Content Factory Engine turns keyword gaps, seasonal demand, service priorities, client preferences, and local search intent into supporting articles that can rank, strengthen money pages, feed internal links, and give the client useful assets for email, GBP, press releases, and reporting.

This is a 90% automated process. The AI agent and n8n workflow handle research, topic selection, brief creation, draft generation, media planning, publishing support, and post-optimization QA. Human work is reserved for exception review: sensitive claims, missing client facts, access blockers, final publishing decisions when needed, and brand-sensitive creative calls.

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

The existing production workflow is strong and is now executed through the Blog Content Factory Engine. The real workflow includes client/site crawling, DataForSEO keyword research, SERP review, AI/n8n topic selection, article drafting, brand-compliant featured image generation, internal links, WordPress HTML, metadata, FAQs, JSON-LD schema, publishing, cache clearing, live verification, and post-optimization under the Optimization Protocol.

The risk is not that the process is hard to automate. The risk is skipping the source-of-truth workflows and publishing content that is technically present but weak, duplicated, over-optimized, missing images, missing metadata, assigned to the wrong category, or not verified live.

## Target State

Every blog article should be created or optimized from a documented Blog Content Factory brief, tied to a real DataForSEO-backed keyword/topic opportunity, aligned with client preferences and SEO performance, linked back into the site's service architecture, published with clean metadata and brand-compliant media, and verified from the live URL.

The final blog packet must include:

- Client and site context
- Page and post sitemap context
- DataForSEO keyword brief
- n8n/AI research run notes
- SERP/content gap notes
- Seasonal and local context
- Client preference and brand guidance notes
- Approved topic and angle
- Article draft
- Featured image, source/generation prompt, and alt text
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
| n8n workflow run context | Koga/Kai | Used for automated research, topic selection, and handoff traceability. |
| Seasonal context | Koga/Kai | Current month, weather, lawn/landscape timing, local conditions. |
| Client proof or details | Human or Koga | Services, process, guarantees, exclusions, photos, reviews. |
| Client preferences | Human or Koga | Topics, tone, services to emphasize, services to avoid, and approval constraints. |
| Client brand guidelines | Koga/Kai | Required for image generation and creative direction when available. |
| Ground Control image references | Koga/Kai | Required source for visual reference and generated-image constraints when available. |
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
| Ground Control brand references | Required when generating or selecting blog visuals. |

Do not rely on memory when a source workflow applies.

## Phased Execution Model

The Blog Content Factory Engine runs through four required phases.

| Phase | Name | Automation Owner | Required Output |
|---|---|---|---|
| Phase 1 | Research | AI Agent + n8n workflow | DataForSEO-backed topic/keyword selection, SERP gap notes, internal-link targets, duplicate check, and client-preference fit. |
| Phase 2 | Creation | Blog Content Factory Engine | Article brief, full draft, metadata, FAQs, schema notes, internal links, brand-compliant image prompt, and alt text. |
| Phase 3 | Publication | AI Agent / WP-CLI / CMS workflow | Published or staged article, category, featured image, metadata, cache clear, and live URL verification. |
| Phase 4 | Optimization | AI Agent following `OPTIMIZATION-PROTOCOL.md` | Live-page audit, post-optimization updates, verification, and tracker close-out when applicable. |

Do not skip phases. If a phase is blocked, document the blocker and stop the workflow at that phase instead of marking the article complete.

### Phase 1: Research - Keyword and Topic Selection

The research phase is managed by the AI agent and n8n workflow.

Required actions:

- Crawl the client site, page sitemap, and blog sitemap.
- Pull DataForSEO keyword ideas, search volume, CPC, competition, SERP examples, related questions, and local intent signals.
- Compare against Process 1 keyword research, service priorities, GSC opportunities, and existing content.
- Check client preferences, services to emphasize, services to avoid, and local/seasonal relevance.
- Identify internal-link targets before the topic is approved.
- Reject duplicate, near-duplicate, thin, or wrong-page-type topics.
- Produce a topic recommendation with the target service/page, target market when applicable, and reason the article should exist.

The output of Phase 1 is the approved research packet.

### Phase 2: Creation - Full Content Generation

The creation phase turns the approved research packet into the publish-ready blog packet.

Required actions:

- Build the blog brief.
- Draft the full article.
- Prepare title tag, meta description, slug, excerpt, category, FAQs, and schema notes.
- Add 5-8 strategic internal links when the site has enough link targets.
- Prepare WordPress-ready HTML.
- Generate or select a featured image.
- Write accessible alt text.
- Run a pre-publication QA pass for duplicate claims, unsupported local details, visible AI artifacts, weak metadata, and broken formatting.

Image generation must strictly follow client brand guidelines. When Ground Control brand references or uploaded image references exist, they are mandatory inputs. Do not generate generic stock-style images, fake logos, fake uniforms, fake trucks, fake project proof, or visuals that conflict with the client’s approved brand direction.

### Phase 3: Publication - Content Publishing

The publication phase moves the approved packet into the CMS or staging environment.

Required actions:

- Create or update the post.
- Assign intentional category.
- Upload and assign the featured image.
- Add alt text.
- Add Rank Math or CMS metadata.
- Add excerpt.
- Add schema if required.
- Set publish date/status.
- Purge cache when needed.
- Verify the live URL or staged URL.

Publishing may be automated through WP-CLI when access is available. If access, credentials, page-builder behavior, or cache controls are blocked, mark Phase 3 blocked and report the blocker.

### Phase 4: Optimization - Post-Optimization Protocol

The optimization phase applies after publication or when the article comes from the Publishing Tracker.

Required actions:

- Read and follow `OPTIMIZATION-PROTOCOL.md`.
- Audit the live article, not just the editor.
- Improve metadata, headings, internal links, image/alt text, schema, formatting, and content gaps where safe.
- Confirm the live page still returns HTTP 200 and renders cleanly.
- Update the tracker only after live verification passes.
- Leave duplicate, broken, or blocked rows pending with notes.

Phase 4 must adhere strictly to the optimization protocol. No shortcut version counts.

## Detailed SOP

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
| Client preference fit | Why the topic matches client priorities, tone, and service focus. |
| n8n run note | Workflow run identifier or notes when available. |

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
| Image Plan | Featured image direction, client brand guidance, Ground Control references, generation prompt, and alt text. |
| SEO Package | Metadata, excerpt, FAQs, slug, schema notes. |
| Exception Notes | Client-specific claims, exclusions, approval notes, or manual-review flags. |

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
- Strictly follow client brand guidelines.
- Use Ground Control brand references and uploaded image references when available.
- Finished result over work-in-progress when appropriate.
- No fake logos, fake text, fake trucks, distorted equipment, or unrealistic service visuals.
- No people when the source process calls for no people.
- Local and seasonal visual context when useful.
- Alt text describes the image naturally and supports accessibility.

Generated image prompts must include the client name, article topic, service context, target market when relevant, required style based on approved references, what to include, and what to avoid.

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

### Koga/Kai Automates

- Crawl service pages and blog sitemap.
- Run AI/n8n research workflow for keyword and topic selection.
- Pull DataForSEO keyword ideas, related queries, SERP data, volume, CPC, competition, and local intent.
- Build blog briefs and topic calendars.
- Detect duplicate or near-duplicate topics.
- Draft articles.
- Apply client preferences and brand guidelines to content direction.
- Generate featured image prompts and alt text from Ground Control/client brand references.
- Generate internal link plans.
- Convert articles to WordPress-ready HTML.
- Draft Rank Math title, meta description, focus keyword, excerpt, slug, FAQs, and JSON-LD.
- Publish or update posts through WP-CLI when authorized.
- Purge cache.
- Verify live URLs.
- Run Phase 4 optimization checks under `OPTIMIZATION-PROTOCOL.md`.
- Prepare GBP/email/press-release support assets from the published article.

### Human Exception Handling

- Approve sensitive topics, claims, pricing, guarantees, or client-specific positioning.
- Provide missing client/service facts.
- Approve unusual offers or promotions.
- Provide or approve real project photos when generated imagery would be inaccurate.
- Approve brand-sensitive visuals when Ground Control references are incomplete or ambiguous.
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
| Workflow Phase | Phase 1 Research, Phase 2 Creation, Phase 3 Publication, or Phase 4 Optimization. |
| n8n/AI Research Notes | Workflow run notes, topic-selection rationale, or documented fallback. |
| Content Angle | Recommended angle and gap. |
| Draft HTML | WordPress-ready body content. |
| Featured Image | File name, source, client brand references used, generation prompt, and alt text. |
| Internal Links | Links and anchors included. |
| SEO Title | Rank Math or SEO title. |
| Meta Description | Search snippet. |
| Excerpt | Customer-facing teaser. |
| Slug | Final permalink slug. |
| Category | Intentional blog category. |
| FAQs | Questions and answers. |
| Schema Notes | JSON-LD or schema recommendation. |
| Automation Status | Research ready, content-engine ready, staged, published, verified, optimized, exception review, blocked, or parked. |
| Publish Status | Drafted, staged, published, verified, optimized, blocked, or parked. |
| QA Notes | Live checks and issues. |

## Quality Checklist

Before marking this process complete, verify:

- [ ] Correct source workflow was read and followed.
- [ ] Phase 1 research packet exists.
- [ ] Site pages were crawled.
- [ ] Existing blog posts were checked.
- [ ] Duplicate or near-duplicate topics were checked.
- [ ] Keyword brief exists or fallback is documented.
- [ ] DataForSEO research or fallback is documented.
- [ ] Client preferences are reflected in the topic and angle.
- [ ] Seasonal/local context is accurate.
- [ ] Article answers the reader intent.
- [ ] Service and city claims are accurate.
- [ ] Internal links support money pages.
- [ ] Featured image exists and fits the topic.
- [ ] Image follows client brand guidelines.
- [ ] Ground Control references were checked when available.
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
- [ ] Phase 4 optimization followed `OPTIMIZATION-PROTOCOL.md` when applicable.
- [ ] Tracker was updated only after live verification when applicable.

## Completion Criteria

This process is complete when:

1. The blog brief exists.
2. The article is drafted, optimized, or intentionally parked.
3. Phase 1 research, Phase 2 creation, Phase 3 publication, and Phase 4 optimization status are documented.
4. Featured image, metadata, excerpt, category, internal links, FAQs, and schema notes are complete.
5. Brand-compliant image guidance is documented.
6. Exception-review notes are documented when required.
7. The post is published or the publish-ready update packet is staged.
8. Live QA confirms the page works and is clean.
9. Tracker status is updated only when the tracker protocol applies and live verification passed.
10. The article can feed internal linking, GBP, email, press release, GSC, and reporting workflows without rework.

## Common Mistakes

- Writing before crawling the client's site.
- Writing before checking existing blog topics.
- Using generic keyword guesses instead of DataForSEO when available.
- Skipping the n8n/AI research phase and calling the topic approved.
- Publishing duplicate service + city topics.
- Leaving `STATUS: APPROVED`, prompt notes, schema text, or AI artifacts visible.
- Using a featured image that does not match the service.
- Generating images that ignore client brand guidelines or Ground Control references.
- Assigning only `Uncategorized`.
- Forgetting Rank Math metadata.
- Skipping internal links to service pages.
- Stuffing city names into every heading.
- Inventing local details.
- Updating the publishing tracker before live verification.
- Treating Phase 4 as optional when the Optimization Protocol applies.
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
- DataForSEO API
- n8n Blog Content Factory workflow
- Ground Control client brand references and uploaded image references

---

*Part of the [SEO Command Center](../../README.md) - Lawn & Land Marketing*

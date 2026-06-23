# Internal Linking

**Process ID:** 05
**Category:** On-Page SEO
**Fulfillment Connection:** Content Factory Engine / Onsite Core Content Optimization / Blog Content Creation / Service Pages / Service Area Pages
**Cadence:** Every content-engine run, every publish, every optimization pass, and quarterly sitewide crawl
**Automation Readiness Score:** 10/10 - Fully automated
**Status:** Fully automated

---

## Purpose

Internal linking connects the site's money pages, service-area pages, blog posts, trust pages, and contact paths so users and search engines understand what matters most.

The goal is not to add random links. The goal is to build a clean link graph where:

- Core service and high-value pages receive support from related content.
- Blog posts push authority toward relevant service, city, and supporting pages.
- Service pages connect to parent, child, city, and conversion paths.
- Service-area pages link naturally to the services offered in that market.
- Orphaned or underlinked pages are discovered and corrected.
- Anchor text is descriptive, varied, contextual, and useful.

Process 05 is executed completely by the Content Factory Engine. It crawls the site, classifies URLs by SEO role, applies the defined SEO silo structure, generates source-target-anchor recommendations, inserts or queues safe link placements, and verifies the live result without a routine human gate.

## Current State

Internal linking is already required inside related workflows:

- Blog creation requires 5-8 strategic internal links using crawled page and post sitemaps.
- Blog optimization requires useful contextual links, especially to primary money pages.
- Service page and service-area briefs include recommended outbound and inbound internal links.
- Site architecture planning defines how BOFU, MOFU, and TOFU content should reinforce each other.

The standalone process is now the Content Factory Engine's internal-linking layer. It turns those rules into a fully automated audit, recommendation, implementation, and verification workflow for the whole site.

## Target State

Every active SEO client should have an internal link map that is refreshed during publishing, monthly optimization, quarterly audits, and every Content Factory Engine run.

The ideal system:

1. Crawls all indexable pages and posts.
2. Extracts internal links, anchors, link locations, status codes, canonicals, and page types.
3. Maps each URL to its SEO role: homepage, services hub, core service, individual service, service-area page, blog post, trust page, contact page, or utility page.
4. Identifies orphan pages, weakly linked pages, overlinked pages, broken internal links, redirecting links, duplicate anchors, and missing conversion paths.
5. Recommends source URL, target URL, anchor text, placement context, priority, and reason.
6. Implements or queues links according to the content-engine update path.
7. Verifies the live page after implementation.
8. Logs any access or page-builder blocker as an execution blocker, not a manual approval step.

## Automation Score

**10/10 — Fully automated**

The process is deterministic enough for full automation:

- Sitemaps can be crawled.
- Internal links can be extracted.
- Page types can be classified from URL patterns and title/content signals.
- Orphan and underlinked pages can be calculated.
- Link opportunities can be matched from keyword map, service map, and content similarity.
- Broken links and redirecting internal links can be checked programmatically.
- The SEO silo structure defines which page roles should interconnect.
- The Content Factory Engine can generate contextual source-target-anchor placements during content creation and optimization.
- Live-page verification can confirm that links were added, remain canonical, and do not create broken or redirecting paths.

If access, page-builder behavior, reusable blocks, menus, or locked CMS areas prevent implementation, the engine logs the blocker and queues the exact update packet. That does not change the automation status of the process.

## When This Process Runs

| Trigger | What Happens |
|---|---|
| New blog post | Add 5-8 contextual internal links before publishing and confirm the post links to relevant service pages. |
| Blog optimization | Review whether the article has 2-5 useful contextual internal links and a natural path to a money page. |
| New service page | Link to parent services, relevant service areas, related services, contact path, and supporting blog content. |
| New service-area page | Link to the services actually offered in that area, nearby areas when useful, contact path, and supporting local/trust content. |
| Content Factory Engine run | Generate silo-aware internal links across Service Area Pages, Core Services, individual Service Pages, supporting blogs, and conversion paths. |
| Quarterly audit | Crawl the site, find orphan/underlinked/broken/redirecting links, and produce a prioritized fix list. |
| Consolidation or URL cleanup | Update old internal links to the surviving canonical page and remove links to retired URLs. |

## Inputs

| Input | Used For |
|---|---|
| Page sitemap | Build the active page inventory. |
| Post sitemap | Build the active blog inventory. |
| Keyword map | Determine which pages are priority targets. |
| Site architecture output | Understand parent/child service relationships and funnel stage. |
| Existing page copy | Find natural link insertion points. |
| GSC and ranking data | Prioritize pages that need support or are close to improving. |
| WordPress/page-builder access | Implement or queue internal link edits through the available update path. |
| Current redirects and canonicals | Avoid linking to redirected, duplicate, or non-canonical URLs. |
| Content Factory Engine output | Apply links during creation, publication, optimization, and verification phases. |

## SEO Silo Structure

The Content Factory Engine generates links according to the defined SEO silo structure.

| Silo Layer | Link Rules |
|---|---|
| Core Services | Link to individual Service Pages, relevant Service Area Pages, supporting blogs, proof pages, and conversion paths. |
| Individual Service Pages | Link back to the parent Core Service, related individual services, relevant Service Area Pages, supporting blogs, and conversion paths. |
| Service Area Pages | Link to the Core Services and individual Service Pages actually available in that market, nearby Service Area Pages when useful, local proof/trust pages, and conversion paths. |
| Blog Content | Link to the money pages it supports: Core Services first, then individual Service Pages, Service Area Pages, related posts, trust pages, and conversion paths. |
| Trust/Proof Pages | Link back into relevant Core Services, Service Pages, Service Area Pages, and conversion paths when context supports it. |

Required interconnections:

- Service Area Pages must link to the Core Services and individual Service Pages available in that market.
- Core Services must link to the individual Service Pages that belong under that service silo.
- Individual Service Pages must link back to their Core Service and to relevant Service Area Pages.
- Blog posts must reinforce the relevant silo instead of linking randomly.
- Every priority SEO page must have a clean path to contact, quote, or estimate conversion.

## Page Role Classification

Each URL should be classified before recommendations are generated.

| Page Role | Examples | Internal Linking Job |
|---|---|---|
| Homepage | `/` | Route users to core services, service areas, trust, and conversion paths. |
| Services hub | `/services/` | Link down to core and individual service pages. |
| Core service page | `/lawn-care/` | Link to child services, supporting blogs, service areas, and contact path. |
| Individual service page | `/lawn-care/aeration/` | Link to parent service, related services, relevant areas, and contact path. |
| Service-area page | `/service-areas/city-st/` | Link to available services, nearby service areas when useful, and contact path. |
| Blog post | `/blog/topic/` | Link to money pages, related posts, and trust/contact paths where natural. |
| Trust page | `/about/`, `/reviews/`, `/gallery/` | Support credibility links from articles, service pages, and CTAs. |
| Contact path | `/contact/`, quote pages | Receive links where the user intent is ready for action. |

## Workflow

### 1. Define the Run Type

Classify the request before crawling.

| Run Type | Primary Goal |
|---|---|
| Publish support | Add internal links to a new article or page before it goes live. |
| Existing page optimization | Improve one page's link quality and money-page support. |
| Sitewide audit | Find weak, broken, missing, or inefficient internal links across the site. |
| Orphan recovery | Push internal links toward pages that have little or no internal support. |
| Architecture support | Build links that reinforce approved service, city, and blog silos. |
| Migration cleanup | Update internal links after URL changes, redirects, or content consolidation. |

### 2. Crawl the Site Inventory

Use the page sitemap and post sitemap as the default source of truth, then supplement with a crawler when needed.

Capture:

- URL
- Title
- H1
- Status code
- Canonical URL
- Indexability
- Page type
- Internal links out
- Internal links in
- Anchor text
- Link location when detectable
- Redirect target, if any
- Last modified date when available

Do not recommend links to URLs that are noindexed, non-canonical, 404, blocked, or intentionally retired.

### 3. Build the Link Graph

For each URL, calculate:

- Number of internal links pointing to it.
- Number of internal links leaving it.
- Which high-value pages link to it.
- Which high-value pages it links to.
- Whether it has a conversion path.
- Whether it links to redirected, broken, or duplicate URLs.
- Whether its anchors are repetitive, generic, or misleading.

Flag:

- Orphan pages.
- Pages with only nav/footer links.
- Money pages with weak contextual support.
- Blog posts with no service-page link.
- Service-area pages with no service links.
- Service pages with no parent/child relationships.
- Internal links pointing at redirects or non-canonical URLs.
- Repeated exact-match anchors from the same page to the same target.

### 4. Prioritize Target Pages

Score targets before recommending new links.

High-priority targets:

- Core service pages.
- Individual service pages tied to revenue.
- Service-area pages for approved markets.
- Pages ranking in positions 4-20 that could improve with better support.
- Pages with strong conversion value and weak internal links.
- Newly published pages that need discovery and authority.

Lower-priority targets:

- Thin utility pages.
- Old blog posts with no strategic role.
- Duplicate or near-duplicate pages pending consolidation.
- Pages that do not represent services the client actively sells.

### 5. Match Source Pages to Target Pages

Use topic relevance first, then authority.

Strong source pages usually include:

- Blog posts that already mention the target service or problem.
- Parent service pages linking to child services.
- Child service pages linking back to parent services.
- Service-area pages linking to services offered in that market.
- Service pages linking to related posts that answer buyer objections.
- High-traffic posts that can support money pages without forcing the link.
- Trust pages that naturally support credibility claims.

Avoid recommendations where the source page topic is unrelated, the anchor would feel forced, or the link only exists because an SEO checklist demanded it.

### 6. Generate and Apply Link Recommendations

Each recommendation/update should include:

| Field | Requirement |
|---|---|
| Source URL | Page where the link should be added or updated. |
| Target URL | Final canonical destination, not a redirecting URL. |
| Suggested anchor | Natural, descriptive anchor text. |
| Placement context | Section, paragraph, CTA, related-service block, or content module. |
| Priority | High, medium, or low. |
| Reason | Why the link helps users and site structure. |
| Implementation type | Direct content edit, page-builder edit, menu/block update, or review only. |
| Automation status | Applied, queued, skipped, blocked, or verified. |

## Placement Rules

Internal links should be placed where they help the reader take the next useful step.

Good placements:

- Contextual body copy.
- Service descriptions that mention a related service.
- Blog sections that answer a problem solved by a money page.
- City pages where the linked service is actually offered.
- FAQ answers when the link genuinely clarifies the next step.
- CTAs that point to a quote, contact, or service page.
- Related service or related article modules when the module already exists.

Bad placements:

- Link dumps at the bottom of the page.
- Repeated links to the same page with the same anchor.
- Generic "click here" or "learn more" anchors with no context.
- Links to pages that are not live, canonical, or relevant.
- Links inserted into every paragraph.
- Internal links appended by automation with visible scars such as `Related service:`.
- Links that make a local claim the client cannot support.

## Anchor Text Rules

Anchor text should be useful, descriptive, and varied.

Use:

- `professional lawn care services`
- `landscape design services`
- `paver patio installation`
- `lawn aeration service`
- `service areas`
- `our landscaping team`
- Natural brand or service mentions when the sentence calls for them.

Avoid:

- `click here`
- `read more`
- `this page`
- Repeating the exact same commercial anchor across many pages.
- Anchors that promise something the target page does not cover.
- City/service anchors on pages where the city or service claim is not supported.

Exact-match anchors are acceptable when they are natural, but the system should vary anchors across source pages.

## Recommended Patterns

| Pattern | Recommendation |
|---|---|
| Blog to service | Every strategic blog post should link to 2-4 relevant service or money pages when context supports it. |
| Blog to blog | Link to 1-3 related posts when they deepen the reader's understanding. |
| Blog to trust/contact | Add a trust or contact link only where credibility or conversion context is natural. |
| Core service to child service | Core pages should link to relevant individual service pages. |
| Child service to core service | Individual service pages should link back to the parent service page. |
| Service to service area | Link to service-area hub or relevant city pages when geography matters. |
| Service area to service | City pages should link to the services actually offered in that city. |
| Nearby service areas | Link between nearby cities only when it helps navigation and does not create doorway-page clutter. |
| Conversion path | Important SEO pages should have a clear route to contact, quote, or consultation. |

## What Gets Automated

The Content Factory Engine automates:

- Crawl page and post sitemaps.
- Extract internal links and anchor text.
- Classify URLs by page role.
- Detect orphan and underlinked pages.
- Detect broken, redirecting, non-canonical, or noindexed internal links.
- Compare link support against keyword map and site architecture.
- Apply the SEO silo structure across Service Area Pages, Core Services, and individual Service Pages.
- Find likely link insertion points inside page copy.
- Generate source-target-anchor recommendations.
- Score recommendations by priority and risk.
- Draft WordPress-ready HTML snippets when authorized.
- Apply safe content-body links during content creation, publication, and optimization.
- Produce QA checklists and implementation logs.
- Verify live links after publish or update.

## Blocker Handling

No routine human approval gate remains in Process 05.

The engine logs and queues blockers when:

- CMS access is unavailable.
- A page-builder, theme, menu, or reusable block cannot be safely edited by automation.
- A requested link would require a service-area claim not supported by the source data.
- A consolidation decision belongs to another process before links should be updated.

Those are blocker states, not standing manual steps.

## Implementation Rules

When editing in WordPress or static files:

1. Preserve the page's existing voice and structure.
2. Add links inside natural sentences whenever possible.
3. Use final canonical URLs.
4. Avoid raw naked URLs in body copy.
5. Do not change unrelated content while adding links.
6. Do not add links into headings unless the design already uses linked headings.
7. Do not break shortcodes, page-builder blocks, accordions, buttons, schema, or reusable elements.
8. Keep phone numbers clickable when the workflow requires them.
9. Document every URL changed.

## QA Checklist

- [ ] Page and post sitemaps were crawled or otherwise verified.
- [ ] Each recommendation has a source URL, target URL, anchor, placement context, and reason.
- [ ] Target URLs are live, canonical, indexable, and not redirecting.
- [ ] Priority money pages receive contextual support where available.
- [ ] New blog posts include the required strategic internal links.
- [ ] Service pages link to parent, child, related, area, and conversion paths where useful.
- [ ] Service-area pages link only to services and nearby areas that make sense.
- [ ] Anchor text is descriptive, varied, and natural.
- [ ] No generic anchors, raw URLs, or automation scars remain.
- [ ] No page is overlinked or made awkward for users.
- [ ] Live edited pages have been checked after implementation.

## Output Format

For each run, produce:

```json
{
  "client": "Client Name",
  "run_type": "quarterly_internal_link_audit",
  "crawl_date": "YYYY-MM-DD",
  "summary": {
    "pages_crawled": 0,
    "orphan_pages": 0,
    "broken_internal_links": 0,
    "redirecting_internal_links": 0,
    "recommendations": 0
  },
  "recommendations": [
    {
      "priority": "high",
      "source_url": "https://example.com/blog/topic/",
      "target_url": "https://example.com/service-page/",
      "anchor_text": "professional service page anchor",
      "placement_context": "Add inside the section discussing the related service.",
      "reason": "The post already explains this problem and should support the relevant money page.",
      "implementation_type": "content_edit",
      "automation_status": "verified"
    }
  ],
  "completed_edits": [
    {
      "url": "https://example.com/blog/topic/",
      "links_added": 3,
      "verified_live": true
    }
  ]
}
```

## Completion Criteria

The process is complete when:

- The site inventory and internal link graph have been reviewed.
- Priority link issues are documented.
- Safe internal link edits have been implemented, queued, skipped, or blocked with a reason.
- Live edited pages have been verified.
- Broken or redirecting internal links have been corrected or logged.
- The client/task record includes what changed, what remains, and what should be reviewed next.

## Common Mistakes

- Treating internal links as a word-count quota instead of a user/navigation system.
- Adding service links to unrelated blog content.
- Linking to redirected URLs instead of final destinations.
- Linking to city pages where the client does not actually serve that city.
- Repeating exact-match anchors in a way that looks unnatural.
- Leaving a new blog post with only a contact link and no service-page support.
- Failing to interconnect Service Area Pages, Core Services, and individual Service Pages according to the silo structure.
- Updating visible page-builder sections without checking mobile layout.
- Closing the task without live verification.

## Source References

| Source | Relevant Rules |
|---|---|
| `BLOG-CREATION-PROCESS.md` | Requires page/post sitemap crawl and 5-8 strategic links in new blog posts. |
| `OPTIMIZATION-PROTOCOL.md` | Requires useful contextual links, money-page support, natural anchors, and no link leakage. |
| `seo/automation/STEP_5_SITE_ARCHITECTURE.md` | Defines BOFU/MOFU/TOFU link strategy and topical silo support. |
| `seo/automation/STEP_6A_CONTENT_BRIEFS_P1.md` | Defines service, service-area, and blog brief internal-linking fields. |

---

*Part of the [SEO Command Center](../../README.md) · Lawn & Land Marketing*

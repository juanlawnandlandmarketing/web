# Title Tags & Meta Descriptions

**Category:** On-Page SEO
**Automation Readiness Score:** 10/10 — ✅ Fully automated inside the Content Engine Factory
**Status:** Fully automated

---

## Purpose

Title tags and meta descriptions control how an SEO page introduces itself in search results. They do not rank a page by themselves, but they strongly affect intent clarity, click-through rate, quality control, and whether the page looks professionally managed.

For Lawn & Land clients, metadata should make the page target obvious without sounding stuffed, fake, or templated.

The goal is simple:

- Every indexable priority page has a useful title tag and meta description.
- Metadata matches the page intent, keyword map, service, location, and real client offer.
- Title tags are readable, not bloated or robotic.
- Meta descriptions sell the click instead of acting like keyword containers.
- Duplicate, missing, truncated, generic, or prompt-leaked metadata is fixed.
- Updates are verified from the live HTML, not just the CMS field.

## Current State

Metadata appears inside several production workflows already:

- Blog creation requires a Rank Math title and meta description.
- Blog optimization requires reviewing and fixing weak title tags and meta descriptions.
- Service page and service-area SOPs require page briefs with metadata before publishing.
- Rank Math setup and schema work depend on clean page-level SEO fields.

The missing piece was a standalone process for auditing, rewriting, applying, and verifying metadata across a client site.

That work now belongs inside the Content Engine Factory. The factory creates or optimizes page packets with DataForSEO keyword and SERP data, approved keyword-map context, live page metadata, page copy, GSC signals when available, and the publish target. Title tags and meta descriptions are generated as a normal factory output, not as an afterthought at the end of publishing.

## Target State

Every active SEO client should have a repeatable metadata process that runs during onboarding, publishing, monthly optimization, and quarterly audits.

The ideal system:

1. Receives a Content Engine Factory job, publishing tracker row, page-build request, or metadata audit request.
2. Crawls all indexable pages and posts in scope.
3. Extracts live title tags, meta descriptions, canonicals, H1s, status codes, page types, and target keywords.
4. Pulls DataForSEO keyword, SERP, and competitor-snippet context for the page intent and market.
5. Flags missing, duplicated, truncated, bloated, vague, stuffed, irrelevant, or prompt-leaked metadata.
6. Drafts replacement title tags and meta descriptions using page intent, DataForSEO context, keyword map, SERP patterns, page copy, and brand/service facts.
7. Separates safe updates from changes needing human approval.
8. Updates the correct CMS, Rank Math, page-builder, or static-site field.
9. Verifies the live HTML after publishing or deployment.

## Automation Score

**10/10 — Fully automated inside the Content Engine Factory**

The dashboard should show this process as 100% automated because the full operational loop can be handled by Koga/Kai when credentials and publishing access exist:

- Crawling pages and extracting live metadata.
- Comparing metadata against titles, H1s, slugs, canonicals, and keyword targets.
- Pulling DataForSEO keyword ideas, SERP examples, related queries, and competitor snippet patterns.
- Detecting missing, duplicate, too-long, too-short, stuffed, generic, or leaked metadata.
- Drafting metadata variants by page type from DataForSEO-backed intent and page context.
- Producing bulk update sheets, WP-CLI commands, or static-file patches.
- Applying safe approved updates through Rank Math, WordPress, CMS fields, or static metadata files.
- Verifying live output after updates.

Fully automated does not mean human-free. It means the system can run the process end to end and route only the right exceptions for review. Humans still review major positioning changes, sensitive claims, broad sitewide templates, service-area uncertainty, and anything that could overpromise a service or location.

## When This Process Runs

| Trigger | What Happens |
|---|---|
| New service page | Draft and publish title and description before the page goes live. |
| New service-area page | Include service and city intent naturally without fake local proof. |
| New blog post | Add Rank Math title and meta description during publishing. |
| Blog optimization | Fix weak metadata as part of the live-page optimization pass. |
| Monthly SEO improvement | Review priority pages, ranking opportunities, and CTR issues. |
| Quarterly site audit | Crawl the full site for missing, duplicate, bloated, or stale metadata. |
| Rebrand or offer change | Update titles/descriptions that mention old positioning, phone numbers, service areas, or offers. |
| Page consolidation or redirect cleanup | Update metadata on the surviving canonical page and verify retired URLs are not still being optimized. |

## Inputs

| Input | Used For |
|---|---|
| Page and post sitemaps | Build the active URL inventory. |
| Live HTML | Confirm actual title tag, meta description, canonical, H1, and rendered output. |
| Content Engine Factory job | Connect metadata generation to the article, service page, service-area page, or optimization packet being produced. |
| Keyword map | Align metadata with approved primary and secondary targets. |
| Page type classification | Apply different rules for homepage, service pages, city pages, blogs, and trust pages. |
| Existing page copy | Make metadata truthful to what the page actually says. |
| GSC data | Find pages with impressions but weak CTR or stale snippets. |
| DataForSEO ranking data | Prioritize pages close to movement or tied to revenue keywords. |
| DataForSEO SERP review | Understand competitor snippet patterns, local intent expectations, and result-page language. |
| Rank Math or CMS fields | Apply approved SEO title and description updates. |
| Client brand/service facts | Avoid fake claims, unsupported guarantees, and wrong service areas. |

## Page Type Rules

Metadata should fit the page's job.

| Page Type | Title Tag Job | Meta Description Job |
|---|---|---|
| Homepage | Establish brand, main service category, and primary market. | Explain what the company does, where it works, and why the visitor should click. |
| Services hub | Summarize the service family and route users deeper. | Highlight available services and conversion path. |
| Core service page | Match the main revenue service and target market. | Explain the service benefit and invite a quote or consultation. |
| Individual service page | Match the specific service intent without over-broad wording. | Clarify the service, outcome, and next step. |
| Service-area page | Pair city/market intent with actual service coverage. | Confirm local availability without inventing local proof. |
| Blog post | Match the informational or seasonal topic. | Promise the answer or useful takeaway, then route toward the service when natural. |
| Trust page | Make the credibility purpose clear. | Reinforce reviews, gallery, about, financing, or other trust context. |
| Contact page | Keep the action obvious. | Make the quote/contact path clear and concise. |

## Workflow

### 1. Define the Run Type

Classify the request before changing anything.

| Run Type | Primary Goal |
|---|---|
| Publish support | Add metadata for a new article or page before it goes live. |
| Existing page optimization | Improve metadata for one URL or a small batch. |
| Sitewide audit | Find missing, duplicate, weak, stale, or risky metadata across the site. |
| CTR improvement | Use GSC impressions, CTR, and query data to improve snippets. |
| Keyword remap | Update metadata after keyword research or page-role changes. |
| Brand/service cleanup | Remove stale offers, wrong locations, or unsupported claims. |

If the request comes from the Content Engine Factory, keep the factory job as the parent record. The metadata output should travel with the page packet, article packet, or optimization packet from brief to publish QA.

### 2. Crawl Metadata Inventory

Use sitemaps as the default inventory, then supplement with a crawler when needed.

Capture:

- URL
- Status code
- Indexability
- Canonical URL
- Page type
- Live title tag
- Title length
- Live meta description
- Description length
- H1
- Slug
- Primary target keyword
- Secondary keyword or modifier
- GSC impressions, clicks, CTR, and top queries when available
- Current Rank Math or CMS SEO fields when available

Do not optimize noindex, non-canonical, broken, redirected, duplicate, or intentionally retired URLs unless the task is specifically to clean them up.

### 3. Pull DataForSEO Intent Context

For each priority page or page packet, pull DataForSEO context before drafting metadata.

Capture:

- Primary keyword and close variants.
- Local modifiers and service/category language.
- SERP titles and descriptions for the target market.
- Related queries and People Also Ask style intent when available.
- Competitor patterns worth matching or avoiding.
- Search volume, CPC, and competition where useful for prioritization.

If DataForSEO is unavailable, document the fallback and do not label the output as data-backed.

### 4. Audit Current Title Tags

Flag title tags that are:

- Missing.
- Duplicated across different pages.
- Too vague to identify the page topic.
- Too long or bloated.
- Too short to communicate intent.
- Keyword-stuffed.
- Missing the core service, topic, brand, or location when those belong naturally.
- Misaligned with the page H1 or body copy.
- Repeating the same template on every service or city page.
- Using fake, unsupported, or outdated claims.
- Carrying WordPress collision suffixes, internal labels, prompt text, or workflow notes.

Typical title length is around 50 to 65 characters when practical. That is guidance, not a hard rule. A strong readable title wins over character-count obedience.

### 5. Audit Current Meta Descriptions

Flag meta descriptions that are:

- Missing.
- Duplicated.
- Generic filler.
- Cut off awkwardly.
- Written like a keyword list.
- Too flat to earn a click.
- Misaligned with the page topic or search intent.
- Making claims the page cannot support.
- Repeating the title without adding value.
- Stale after a service, market, offer, phone, or brand change.
- Containing prompt instructions, AI self-checks, internal workflow language, or keyword-count notes.

Typical meta description length is around 140 to 160 characters when practical. That is guidance, not a hard rule. The description should be a click-through pitch, not a keyword container.

### 6. Prioritize URLs

Fix obvious errors immediately when safe, then prioritize by business value.

High priority:

- Homepage.
- Core service pages.
- Individual service pages tied to revenue.
- Service-area pages for approved markets.
- Pages ranking in positions 4-20.
- Pages with high impressions and weak CTR.
- New pages published without strong metadata.
- Pages with duplicate or missing metadata.

Lower priority:

- Thin utility pages.
- Old posts with no strategic role.
- Archive, tag, or author pages that should not be active SEO targets.
- Pages pending consolidation, redirect, or rewrite.

### 7. Draft Replacement Metadata

Use page intent first, then DataForSEO context and keywords.

Good title tag formula:

```text
[Primary service/topic] + [city/market when natural] + [brand or differentiator when useful]
```

Good meta description formula:

```text
[Clear service/topic promise] + [local or benefit context] + [soft CTA or reason to click]
```

Examples:

| Page Context | Strong Title Tag | Strong Meta Description |
|---|---|---|
| Lawn care service page | Lawn Care in Columbia, SC | Keep your yard healthier with lawn care services in Columbia, SC. Get mowing, fertilization, and seasonal turf support from a local team. |
| Paver patio service page | Paver Patio Installation in Tampa Bay | Plan a better outdoor living space with custom paver patio installation, layout guidance, drainage planning, and clean finishing details. |
| Service-area page | Landscaping Services in Collegeville, PA | See landscaping, hardscaping, lighting, and outdoor living services available for homeowners in Collegeville and nearby communities. |
| Seasonal blog post | April Landscape Planning Tips for Pennsylvania | Use early spring to plan beds, patios, drainage, and planting updates before the busy Pennsylvania landscape season hits full speed. |

Weak metadata:

- `Home`
- `Services`
- `Best Lawn Care Lawn Care Lawn Care Near Me`
- `Learn more about our services.`
- `AI-approved SEO title for focus keyword`
- `Professional landscaping services in every city we serve`

For Content Engine Factory runs, generate the metadata alongside the page brief or article packet:

- SEO title.
- Meta description.
- Focus keyword or primary target.
- Slug recommendation when the URL is not already fixed.
- Reason for the title/description choice.
- Human-review flag when the metadata changes positioning, service areas, offers, pricing, guarantees, or sensitive claims.

## Metadata Rules

Title tags should:

- Be readable for humans first.
- Match the page's real search intent.
- Include the primary service or topic naturally.
- Include city or state context when the page is local and the wording stays natural.
- Use the brand when it helps distinguish or fit the page type.
- Avoid stuffing, repetition, and overlong templates.
- Stay distinct across similar service and city pages.

Meta descriptions should:

- Explain why the page is worth clicking.
- Support the keyword and page topic without stuffing.
- Use local context only when truthful.
- Include a benefit, answer, service scope, or next step.
- Sound intentionally written.
- Stay distinct from the title tag and from other descriptions.
- Avoid fake guarantees, unsupported claims, and generic filler.

Metadata should not:

- Invent services, service areas, awards, certifications, discounts, or guarantees.
- Mention a city that the client does not serve.
- Use "near me" awkwardly unless the site's style already supports it.
- Repeat the exact same phrase across every page.
- Include prompt text, workflow status, AI reasoning, or internal notes.
- Change the page's targeting without checking the keyword map and site architecture.

## WordPress and Rank Math Implementation

For WordPress sites:

1. Identify the post or page ID.
2. Read the current rendered title and meta description from the live page.
3. Check Rank Math title and description fields when Rank Math is active.
4. Check native title, excerpt, theme settings, or page-builder fields when Rank Math is not controlling output.
5. Update the approved SEO title and description fields.
6. Preserve strong existing metadata when it already works.
7. Purge cache when needed.
8. Verify the live HTML after publishing.

Typical WP-CLI checks:

```bash
wp post get <post_id> --field=post_title
wp post meta get <post_id> rank_math_title
wp post meta get <post_id> rank_math_description
wp post meta update <post_id> rank_math_title "SEO title"
wp post meta update <post_id> rank_math_description "Meta description"
```

Rank Math fields are common, but do not assume every site uses the same meta keys or output path. Confirm the live HTML before and after edits.

## Static Site Implementation

For static sites or app-based sites:

1. Identify the route, metadata object, layout, or page template controlling the title and description.
2. Update the route-level metadata, not just visible page copy.
3. Avoid changing unrelated Open Graph or schema fields unless the process calls for it.
4. Run syntax/build checks.
5. Deploy when authorized.
6. Verify the live HTML title and meta description after deployment.

## What Gets Automated

Koga can:

- Crawl site metadata at scale.
- Pull title, description, H1, canonical, indexability, and page-type data.
- Detect missing, duplicate, weak, bloated, stuffed, stale, or leaked metadata.
- Compare metadata against keyword maps, H1s, URLs, and page copy.
- Pull DataForSEO keyword, SERP, related-query, and competitor-snippet context.
- Pull GSC CTR and query data when access exists.
- Draft replacement title tags and meta descriptions inside the Content Engine Factory packet.
- Prepare bulk update sheets, WP-CLI commands, CMS recommendations, or code patches.
- Apply approved updates when authorized.
- Verify live output after changes.

## What Stays Human

Humans approve or handle:

- Major positioning changes.
- Sensitive offer, pricing, guarantee, licensing, legal, or credential claims.
- Service-area wording where coverage is uncertain.
- Brand voice decisions for homepage and high-visibility pages.
- Large sitewide template rewrites before publishing.
- Cannibalization decisions when two pages target similar terms.
- Page-builder or CMS fields that cannot be safely updated in bulk.

## QA Checklist

- [ ] Target URLs were crawled from the sitemap or verified URL list.
- [ ] Non-indexable, redirected, broken, or non-canonical URLs were excluded or handled intentionally.
- [ ] Live title tags were reviewed, not just CMS fields.
- [ ] Live meta descriptions were reviewed, not just CMS fields.
- [ ] Priority pages have distinct, readable title tags.
- [ ] Priority pages have compelling, distinct meta descriptions.
- [ ] Metadata matches the approved keyword map and page intent.
- [ ] Service and location claims are truthful.
- [ ] No metadata is keyword-stuffed, generic, duplicated, or awkwardly truncated.
- [ ] No prompt text, workflow notes, AI reasoning, or internal status text appears in metadata.
- [ ] Rank Math, CMS, builder, or static metadata fields were updated in the correct place.
- [ ] Live HTML was verified after publishing or deployment.

## Output Format

For each run, produce:

```json
{
  "client": "Client Name",
  "run_type": "metadata_audit",
  "crawl_date": "YYYY-MM-DD",
  "summary": {
    "urls_checked": 0,
    "missing_titles": 0,
    "missing_descriptions": 0,
    "duplicate_titles": 0,
    "duplicate_descriptions": 0,
    "updates_recommended": 0,
    "updates_completed": 0
  },
  "recommendations": [
    {
      "url": "https://example.com/service/",
      "page_type": "service_page",
      "primary_keyword": "lawn care columbia sc",
      "current_title": "Services",
      "recommended_title": "Lawn Care in Columbia, SC",
      "current_meta_description": "",
      "recommended_meta_description": "Keep your yard healthier with lawn care services in Columbia, SC. Get mowing, fertilization, and seasonal turf support from a local team.",
      "reason": "Current metadata is too vague for the service intent.",
      "implementation_type": "rank_math_meta",
      "priority": "high",
      "human_gate": false
    }
  ],
  "completed_updates": [
    {
      "url": "https://example.com/service/",
      "new_title": "Lawn Care in Columbia, SC",
      "new_meta_description": "Keep your yard healthier with lawn care services in Columbia, SC. Get mowing, fertilization, and seasonal turf support from a local team.",
      "verified_live": true
    }
  ]
}
```

## Completion Criteria

The process is complete when:

- The target URL set has been crawled or otherwise verified.
- Priority pages have reviewed title tags and meta descriptions.
- Missing, duplicate, generic, stuffed, stale, risky, or leaked metadata has been corrected or logged.
- Human-review items are clearly separated.
- Updated metadata has been applied in the correct source field.
- Live HTML confirms the expected title and meta description after edits.
- The task record includes what changed, what remains, and what should be reviewed next.

## Common Mistakes

- Optimizing the CMS field without checking the live HTML.
- Treating character counts like laws instead of guidance.
- Stuffing service, city, state, and brand into every title.
- Reusing one template across every service-area page.
- Writing a meta description that only repeats the title.
- Adding "near me" in a way no human would write.
- Inventing local coverage, awards, guarantees, or pricing.
- Changing title intent without checking the keyword map.
- Ignoring canonical or noindex problems while polishing metadata.
- Closing the task without verifying the live page.

## Source References

| Source | Relevant Rules |
|---|---|
| `OPTIMIZATION-PROTOCOL.md` | Requires live title and meta description review, readable title tags, click-focused descriptions, no keyword stuffing, and live verification after updates. |
| `BLOG-CREATION-PROCESS.md` | Requires blog deliverables to include a 150-160 character meta description and SEO metadata during publishing. |
| `deliverables/on-page/01-keyword-research/README.md` | Supplies approved keyword map and page targeting context. |
| `deliverables/on-page/02-service-pages/README.md` | Requires metadata for service pages and routes deeper metadata audits to this process. |
| `deliverables/on-page/03-service-area-pages/README.md` | Requires truthful city/service metadata and routes deeper metadata audits to this process. |
| `deliverables/on-page/04-blog-content/README.md` | Requires blog publishing and optimization metadata. |

---

*Part of the [SEO Command Center](../../README.md) · Lawn & Land Marketing*

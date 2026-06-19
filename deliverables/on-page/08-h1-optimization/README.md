# H1 Optimization

**Category:** On-Page SEO
**Automation Readiness Score:** 5/10 — 🟢 Partial automation possible
**Status:** ✅ Documented

---

## Purpose

The H1 is the visible page headline that tells users and search engines what the page is about. It should confirm the searcher's intent, match the page's actual topic, and sit cleanly inside the page's visual hierarchy.

For Lawn & Land clients, the H1 should be clear enough for a homeowner or property manager to understand in one glance. It should not be a vague slogan, a stuffed keyword string, a hidden technical artifact, or one of several competing hero headings.

The goal is simple:

- Every indexable priority page has one clear, visible H1.
- The H1 matches the page target and user intent.
- The H1 aligns with the title tag without duplicating it awkwardly.
- Page-builder heading clutter is identified and corrected.
- Hero design and page hierarchy remain intact after edits.
- Live rendered pages are verified, not just source HTML.

## Current State

H1 review already appears inside related workflows:

- Blog optimization requires checking the visible title experience.
- Service page and service-area SOPs require clear H1s before publishing.
- Metadata optimization compares title tags against H1s and page intent.
- Blog creation uses H2/H3 structures, but the visible title still needs post-publish verification.

The missing piece is a standalone H1 process for auditing rendered pages, distinguishing true H1 problems from theme/page-builder quirks, and deciding what is safe to automate.

## Target State

Every active SEO client should have a repeatable H1 audit and correction workflow that runs during launch QA, publishing, optimization, and sitewide audits.

The ideal system:

1. Crawls all indexable pages and posts.
2. Extracts rendered H1s, title tags, meta descriptions, H2/H3 headings, canonicals, status codes, page type, and target keywords.
3. Flags missing, duplicated, hidden, multiple, vague, stuffed, template-generated, or mismatched H1s.
4. Separates safe content-level fixes from page-builder, theme, template, or design-sensitive changes.
5. Drafts improved H1s that match page intent without turning visible headlines into SEO mush.
6. Applies approved fixes in the correct CMS, builder, template, or static route.
7. Verifies the rendered page after publishing or deployment.

## Automation Score

**5/10 — Partial automation possible**

Discovery is highly automatable:

- Crawl pages.
- Render pages.
- Count H1 tags.
- Extract text, visibility, and heading order.
- Compare H1s to title tags, page targets, URLs, and body copy.
- Flag missing, multiple, hidden, duplicated, stuffed, or vague headings.
- Draft replacement H1 recommendations.

Implementation is only partially automatable because H1s are visible design elements. Fixes can require Avada, Elementor, Gutenberg, theme templates, reusable blocks, hero modules, archive templates, custom React components, or layout decisions. A bad automated fix can break the page's first impression faster than a weak meta description ever could.

## When This Process Runs

| Trigger | What Happens |
|---|---|
| Website launch QA | Confirm all indexable priority pages have one clear H1 before handoff. |
| New service page | Verify the H1 matches the service page target and visible offer. |
| New service-area page | Verify the H1 includes truthful market context without city stuffing. |
| New blog post | Confirm the visible post title renders as a clean H1. |
| Blog optimization | Fix missing, weak, stuffed, or duplicated visible titles. |
| Metadata optimization | Check that the H1 and title tag align without awkward duplication. |
| Sitewide audit | Crawl the site for missing, multiple, hidden, duplicated, or template-generated H1 issues. |
| Theme or builder change | Re-check H1 output after template, hero, or page-builder changes. |

## Inputs

| Input | Used For |
|---|---|
| Page and post sitemaps | Build the URL inventory. |
| Rendered HTML | Detect actual H1 output after JavaScript, theme, and builder rendering. |
| Source HTML | Compare server output against rendered output when needed. |
| Page screenshots | Confirm visual hierarchy and whether the H1 is actually visible. |
| Keyword map | Align H1 with approved page target. |
| Title tag and meta description | Check intent alignment and avoid awkward duplication. |
| Page body copy | Confirm the H1 reflects what the page actually covers. |
| Page type classification | Apply different rules for service, city, blog, homepage, and trust pages. |
| WordPress/page-builder data | Identify where the H1 is stored and how safely it can be edited. |
| Theme/template files | Fix repeated H1 issues caused by global templates. |

## Page Type Rules

H1 standards change by page type.

| Page Type | H1 Job | Common Failure |
|---|---|---|
| Homepage | State the main offer, market, or brand positioning clearly. | Decorative slogan with no service/category clarity. |
| Services hub | Introduce the service family. | Generic `Services` with no industry or buyer context. |
| Core service page | Name the main revenue service. | Overstuffed service + city + brand + CTA string. |
| Individual service page | Match the specific service intent. | Vague benefit headline that never names the service. |
| Service-area page | Pair service/category with real city or market context. | Fake-local or repeated city stuffing. |
| Blog post | Render the article title as a readable H1. | Theme outputs archive/page title plus post title as multiple H1s. |
| Trust page | Clarify the page purpose: reviews, gallery, about, financing, careers. | Hero headline uses a slogan and hides the actual page topic. |
| Contact page | Make the action obvious. | Multiple H1s from form widgets, map modules, or theme title bars. |

## Workflow

### 1. Define the Run Type

Classify the request before crawling.

| Run Type | Primary Goal |
|---|---|
| Launch QA | Confirm core pages have clean H1 output before launch. |
| New page support | Validate one new service, city, blog, or trust page. |
| Existing page optimization | Improve the visible page title during a content pass. |
| Sitewide audit | Find all missing, multiple, hidden, duplicated, or weak H1s. |
| Template debugging | Identify whether a global theme or page-builder template is creating the issue. |
| Migration cleanup | Check H1 output after redesign, platform migration, or URL consolidation. |

### 2. Crawl Rendered H1 Inventory

Use a rendered crawler when possible. Static HTML alone can miss JavaScript, theme, or builder output.

Capture:

- URL
- Status code
- Indexability
- Canonical URL
- Page type
- Title tag
- Meta description
- All H1 text
- H1 count
- H1 visibility
- H1 location when detectable
- H2/H3 sequence
- Hero text
- Primary target keyword
- Whether the H1 appears above the fold
- Whether the same H1 appears on several different URLs

Do not optimize H1s on noindex, broken, redirected, non-canonical, duplicate, or intentionally retired pages unless the task is specifically cleanup.

### 3. Audit H1 Problems

Flag pages where the H1 is:

- Missing.
- Empty.
- Hidden from users.
- Duplicated on the same page.
- Duplicated across unrelated pages.
- Split across multiple H1 elements.
- Too vague to identify the page topic.
- Stuffed with keywords, cities, or service variants.
- Misaligned with the title tag, URL, or body copy.
- A theme artifact like `Archives`, `Blog`, `Home`, or `Untitled`.
- A form/module/widget heading that should not be the page H1.
- A design slogan that does not explain the page.
- Obvious generated SEO mush.
- Carrying prompt text, workflow notes, or internal labels.

Also flag heading structure issues when they affect the H1 decision:

- H2 appears before the H1.
- Hero text is visually the headline but marked as H2/div/span.
- Multiple visual headlines compete above the fold.
- Reusable blocks create repeated H1s.
- Hidden mobile/desktop variants both render as H1.

### 4. Diagnose the Source of the Issue

Before editing, identify where the H1 comes from.

Common sources:

| Source | Typical Fix |
|---|---|
| WordPress post/page title | Update the page title or theme title display carefully. |
| Gutenberg content | Change heading level or text in post content. |
| Elementor widget | Edit the heading widget text or HTML tag. |
| Avada/Fusion Builder title bar | Adjust the container/title bar or page option. |
| Theme template | Fix the template so it outputs one H1 correctly. |
| Archive template | Decide whether the archive should be indexable before optimizing. |
| Static route metadata/content | Patch the route/component and verify render. |
| Reusable block/global section | Fix once, then check every page that uses it. |

Do not assume the first visible large text is the H1. Inspect the rendered DOM.

### 5. Draft the Correct H1

Use the page's job first, then keywords.

Good H1 formula:

```text
[Specific page topic] + [market or service context when natural]
```

Examples:

| Page Context | Strong H1 |
|---|---|
| Core lawn care page | Lawn Care Services in Columbia, SC |
| Paver patio service page | Paver Patio Installation for Tampa Bay Homes |
| Service-area page | Landscaping Services in Collegeville, PA |
| Blog post | April Landscape Planning Tips for Pennsylvania Homeowners |
| Reviews page | Customer Reviews |
| Contact page | Request a Landscaping Quote |

Weak H1s:

- `Services`
- `Home`
- `Welcome`
- `Quality You Can Trust`
- `Best Lawn Care Lawn Care Near Me Columbia SC`
- `SEO optimized headline approved`
- `Landscaping in every city we serve`

## H1 Rules

H1s should:

- Be visible.
- Be human-readable.
- Match the page's search intent.
- Usually be the only H1 on the page.
- Name the service, topic, page purpose, or local market when natural.
- Align with the title tag without copying it mechanically.
- Fit the page design without awkward wrapping or visual clutter.
- Be distinct enough across similar service and city pages.

H1s should not:

- Exist only for search engines while hidden from users.
- Stuff multiple cities or every service into one line.
- Replace clear page meaning with a generic brand slogan.
- Invent services, cities, guarantees, or credentials.
- Use page-builder widget headings as accidental H1s.
- Repeat across many unrelated pages.
- Include prompt text, workflow status, AI reasoning, or internal notes.

## WordPress and Page-Builder Implementation

For WordPress sites:

1. Identify the post/page ID and template.
2. Crawl the live rendered page first.
3. Check whether the H1 comes from the post title, content body, theme title bar, page builder, archive template, or reusable block.
4. Change the smallest source that fixes the issue.
5. Avoid changing visible hero copy without checking page design and client messaging.
6. If multiple pages share the same template issue, fix the template and verify every affected page.
7. Purge cache when needed.
8. Verify the live rendered page after publishing.

Typical checks:

```bash
wp post get <post_id> --field=post_title
wp post get <post_id> --field=post_content
```

Use browser or DOM inspection for rendered output. WP-CLI source checks are not enough because builders and themes can change heading tags at render time.

## Static Site Implementation

For static sites or app-based sites:

1. Identify the route component, page template, or content source controlling the visible heading.
2. Update the H1 text or semantic tag in the component.
3. Confirm there is not another layout-level H1 wrapping the route.
4. Run syntax/build checks.
5. Deploy when authorized.
6. Verify the rendered live page after deployment.

## What Gets Automated

Koga can:

- Crawl rendered pages.
- Extract H1s, title tags, canonicals, and heading structures.
- Detect missing, multiple, hidden, duplicated, vague, stuffed, or mismatched H1s.
- Compare H1s against keyword maps, title tags, URLs, and body copy.
- Identify likely template-level patterns.
- Draft recommended H1 replacements.
- Prepare page-by-page fix lists.
- Patch static-site routes when safe.
- Verify rendered output after changes.

## What Stays Human

Humans approve or handle:

- Visible hero copy changes on high-value pages.
- Brand positioning decisions on homepage and primary service pages.
- Service-area wording when coverage is uncertain.
- Page-builder edits that affect layout, spacing, responsive behavior, or design hierarchy.
- Template-level changes that affect many URLs.
- Cases where the SEO-correct H1 would make the page read worse.
- Any heading that includes sensitive claims, pricing, guarantees, credentials, awards, or local proof.

## QA Checklist

- [ ] Target URLs were crawled from the sitemap or verified URL list.
- [ ] Non-indexable, redirected, broken, or non-canonical URLs were excluded or handled intentionally.
- [ ] Rendered H1 output was checked, not just source HTML.
- [ ] Each priority page has one clear visible H1 unless a deliberate exception is documented.
- [ ] H1 matches the page topic, target keyword, and search intent.
- [ ] H1 aligns with the title tag without awkward duplication.
- [ ] H1 is not generic, stuffed, duplicated, hidden, or generated-sounding.
- [ ] Service and location claims are truthful.
- [ ] Page-builder or template source was identified before implementation.
- [ ] No prompt text, workflow notes, AI reasoning, or internal status text appears in headings.
- [ ] H2/H3 structure still supports scanning after any H1 change.
- [ ] Live rendered page was verified after publishing or deployment.

## Output Format

For each run, produce:

```json
{
  "client": "Client Name",
  "run_type": "h1_audit",
  "crawl_date": "YYYY-MM-DD",
  "summary": {
    "urls_checked": 0,
    "missing_h1": 0,
    "multiple_h1": 0,
    "weak_h1": 0,
    "template_level_issues": 0,
    "updates_recommended": 0,
    "updates_completed": 0
  },
  "recommendations": [
    {
      "url": "https://example.com/service/",
      "page_type": "service_page",
      "primary_keyword": "lawn care columbia sc",
      "current_h1s": ["Services"],
      "recommended_h1": "Lawn Care Services in Columbia, SC",
      "issue_type": "generic_h1",
      "source_guess": "page_builder_heading_widget",
      "reason": "Current H1 does not identify the service or market.",
      "implementation_type": "page_builder_review",
      "priority": "high",
      "human_gate": true
    }
  ],
  "completed_updates": [
    {
      "url": "https://example.com/service/",
      "new_h1": "Lawn Care Services in Columbia, SC",
      "verified_live": true
    }
  ]
}
```

## Completion Criteria

The process is complete when:

- The target URL set has been crawled or otherwise verified.
- Priority pages have reviewed rendered H1 output.
- Missing, multiple, hidden, duplicated, generic, stuffed, risky, or leaked H1s have been corrected or logged.
- Page-builder, template, or design-sensitive items are clearly separated for human review.
- Approved fixes have been applied in the correct source field or template.
- Live rendered pages confirm the expected H1 after edits.
- The task record includes what changed, what remains, and what should be reviewed next.

## Common Mistakes

- Checking source HTML but not the rendered DOM.
- Treating every multiple-H1 warning as equal without checking visibility and template context.
- Changing the post title when the real issue is a theme title bar or builder widget.
- Fixing desktop H1 output while leaving a mobile duplicate.
- Turning a strong human headline into a stuffed SEO phrase.
- Using the same H1 across every city page.
- Ignoring an H1 problem because the page title tag is strong.
- Updating visible hero copy without checking layout.
- Closing the task without verifying the live rendered page.

## Source References

| Source | Relevant Rules |
|---|---|
| `OPTIMIZATION-PROTOCOL.md` | Requires one clear H1, strong visible title experience, title/H1 alignment, and clean H2/H3 structure. |
| `BLOG-CREATION-PROCESS.md` | Requires clear article headings and competitor heading-structure review during blog creation. |
| `deliverables/on-page/02-service-pages/README.md` | Requires clear service-page H1s and routes deeper H1 auditing to this process. |
| `deliverables/on-page/03-service-area-pages/README.md` | Requires clear local page H1s with truthful city/service context. |
| `deliverables/on-page/04-blog-content/README.md` | Requires blog post H1 verification during publishing and optimization. |
| `deliverables/on-page/07-title-tags-meta/README.md` | Requires metadata and H1 alignment without awkward duplication. |

---

*Part of the [SEO Command Center](../../README.md) · Lawn & Land Marketing*

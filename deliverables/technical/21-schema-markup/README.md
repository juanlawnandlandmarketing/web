# Schema Markup

**Category:** Technical SEO
**Automation Readiness Score:** 10/10 - Fully automated
**Status:** Fully automated

---

## Purpose

Process 21 covers structured data/schema markup for client websites. The Content Engine pipeline uses generated content data, approved business/entity facts, page-type classification, and live DataForSEO API metrics to help search engines understand each page's business entity, page type, breadcrumbs, services, articles, questions, and local context without creating misleading, duplicated, hidden, or invalid markup.

This process starts after the Rank Math baseline is installed or verified in Process 20.

The goal is simple:

- Add only schema that represents visible, truthful page content.
- Use JSON-LD where practical.
- Use Rank Math defaults for baseline schema when safe.
- Add page-specific schema only where it matches the page.
- Avoid duplicate schema from plugins, themes, builders, and manual code.
- Validate markup with Google tools and schema validators.
- Route page-level content or plugin setup issues to the right process instead of forcing schema to cover the gap.

Schema is not a magic ranking button. It is a clarity layer. If the page content is thin, inaccurate, or missing, fix the page first.

## Current State

Process 21 is represented in ClickUp by:

- Parent task `8. Schema Implementation`.
- Subtask `Local Business Schema`.
- Subtask `FAQ Schema for blog post`.
- Subtask `Service Schema for service page`.

The Content Engine pipeline now owns the full standard schema workflow. It combines generated page content, metadata, FAQ content, service and service-area context, Rank Math/plugin state, crawl output, and live DataForSEO API metrics to select schema types, generate JSON-LD or Rank Math field packets, validate output, and prevent duplicate or misleading markup.

Human review is exception-only: missing approved business identity, contradictory NAP/service-area facts, sensitive claims, plugin/page-builder access blockers, or schema conflicts the pipeline cannot safely resolve.

## Target State

Every schema implementation should have a page-by-page record.

The ideal system:

1. Confirms Rank Math baseline is active or another schema source is approved.
2. Inventories current schema output on the site.
3. Classifies each important URL by page type.
4. Selects only schema types that match visible page content.
5. Uses the most specific valid schema type available without overcomplicating the page.
6. Adds or configures schema through the approved source of truth.
7. Validates structured data with Google Rich Results Test, URL Inspection where available, and schema validators.
8. Fixes duplicate, stale, hidden, or misleading markup.
9. Documents live output, warnings, errors, and handoffs.

## Automation Score

**10/10 - Fully automated**

Process 21 is executed completely within the Content Engine pipeline. Workflow execution is programmatically driven by combining generated content data with live metrics pulled from the DataForSEO API.

The pipeline automates:

- Crawling pages and extracting JSON-LD, Microdata, and RDFa.
- Pulling DataForSEO keyword, SERP, local intent, competitor, and page-context metrics.
- Combining generated page copy, metadata, FAQs, image data, service facts, service-area facts, and content-type data into a schema-ready source packet.
- Detecting missing, duplicate, invalid, or conflicting schema.
- Comparing schema content against visible page text and generated content records.
- Selecting the appropriate schema types for each page role.
- Generating JSON-LD or Rank Math field/update packets.
- Validating markup against Google-supported structured data rules.
- Producing page-by-page issue logs, QA notes, and exception routes.

No routine human approval gate is required for standard schema production. Human intervention is limited to exception cases where approved entity facts, access, claims, or plugin/source-of-truth conflicts are missing or contradictory.

## Training Video

No applicable Loom video for Process 21 was found in ClickUp list `901111072650`.

Checked sources:

- `8. Schema Implementation`
- `Local Business Schema`
- `FAQ Schema for blog post`
- `Service Schema for service page`
- Related `Rank Math & SEO Plugin Initial Setup` task
- Related sitemap, robots, Rank Math, plugin, and technical SEO task names/descriptions
- Task comments
- Attachments
- Custom fields
- Checklists
- Rich embed payloads

Decision: do not include unrelated reporting, Looker Studio, Imagify, citation, Whitespark, Signal GeNeSYS, backlink, Rank Math setup, or press videos in this SOP. Add a video only if a real schema implementation Loom is supplied or later appears in the ClickUp SOP list.

## Source References

Use the ClickUp task family as the internal workflow source and official Google, Schema.org, and Rank Math docs for current structured data rules.

| Source | Role in Process 21 |
|---|---|
| [`8. Schema Implementation`](https://app.clickup.com/t/868eeg0wj) | Parent one-time fulfillment task for schema work. |
| [`Local Business Schema`](https://app.clickup.com/t/868eh0ufj) | Subtask for local business/entity markup. |
| [`FAQ Schema for blog post`](https://app.clickup.com/t/868eh11pb) | Subtask for FAQ/Q&A markup where still appropriate. |
| [`Service Schema for service page`](https://app.clickup.com/t/868eh3vdq) | Subtask for service-page structured data. |
| [Google structured data guidelines](https://developers.google.com/search/docs/appearance/structured-data/sd-policies) | General technical and quality rules. |
| [Google structured data gallery](https://developers.google.com/search/docs/appearance/structured-data/search-gallery) | Current Google-supported rich result features. |
| [Google Local Business structured data](https://developers.google.com/search/docs/appearance/structured-data/local-business) | LocalBusiness rules and recommended properties. |
| [Google Breadcrumb structured data](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb) | BreadcrumbList rules and validation path. |
| [Schema.org](https://schema.org/) | Canonical schema vocabulary. |
| [Schema.org LocalBusiness](https://schema.org/LocalBusiness) | LocalBusiness type reference. |
| [Schema.org Service](https://schema.org/Service) | Service type reference. |
| [Schema.org FAQPage](https://schema.org/FAQPage) | FAQPage type reference. |
| [Rank Math schema documentation](https://rankmath.com/kb/rich-snippets/) | Rank Math schema configuration workflow. |
| [Rank Math custom schema generator](https://rankmath.com/kb/schema-generator/) | Rank Math custom schema builder workflow. |
| `deliverables/technical/20-rank-math-setup/README.md` | Required plugin baseline before schema work. |
| `deliverables/on-page/02-service-pages/README.md` | Service-page content requirements before Service schema. |
| `deliverables/on-page/03-service-area-pages/README.md` | Service-area content requirements before local/service schema. |
| `deliverables/on-page/04-blog-content/README.md` | Blog content and FAQ source context. |
| `deliverables/technical/23-xml-sitemap/README.md` | Sitemap/indexability context for schema-bearing URLs. |

## Current Google Rules to Respect

Google's structured data docs make several rules non-negotiable:

- Correct markup does not guarantee a rich result.
- JSON-LD is the preferred format when practical.
- Structured data must represent the visible page content.
- Do not mark up hidden, fake, irrelevant, misleading, or stale content.
- Required properties matter.
- Googlebot must be able to access the page and related assets.
- Duplicate or conflicting schema can confuse validation and search output.
- Google support for specific rich result types changes over time.

As of this SOP update, Google's FAQ structured data documentation redirects to a removal notice for FAQ rich results. FAQPage schema can still describe real FAQ content, but do not prioritize FAQ schema only for old SERP-expansion tactics. Use it only when the page genuinely contains visible FAQs and the markup serves clarity.

## When This Process Runs

| Trigger | What Happens |
|---|---|
| New WordPress SEO client onboarding | Configure baseline LocalBusiness, organization, breadcrumb, article/blog, and service schema as applicable. |
| New service or service-area page | Add or verify Service and local context schema only if content supports it. |
| New or optimized blog post | Verify article/blog schema and add FAQPage only when visible FAQ content exists and strategy supports it. |
| Technical SEO audit | Detect invalid, duplicated, missing, or misleading structured data. |
| Rank Math setup completion | Move from plugin baseline to page-specific schema decisions. |
| Launch QA | Confirm schema validates and does not conflict with noindex, robots, or sitemap state. |
| Structured data warning/error | Fix validation errors, warnings, duplicates, or unsupported markup. |

## Required Inputs

| Input | Used For |
|---|---|
| Site URL and priority URL list | Crawl and page classification. |
| Rank Math/plugin state | Confirms schema source of truth. |
| Approved NAP | LocalBusiness data. |
| Approved business name and logo | Organization/local identity. |
| Approved GBP URL and social profiles | sameAs/entity reference where appropriate. |
| Services and service areas | Service schema and local relevance. |
| Generated content packet | Page copy, metadata, FAQs, images, headings, and page role from the Content Engine pipeline. |
| DataForSEO API metrics | Keyword intent, live SERP context, competitor patterns, local intent, and page/topic validation. |
| Page type and intent | Determines schema type. |
| Visible page content | Schema must match it. |
| Blog author/publisher data | BlogPosting/Article schema. |
| FAQs visible on page | FAQPage schema only when real and visible. |
| Sitemap/indexing status | Schema should not be the focus for pages blocked from indexing. |
| Existing schema output | Duplicate/conflict audit. |

## Schema Source of Truth

Only one source should own each schema layer.

| Source | Use When | Watch For |
|---|---|---|
| Rank Math default schema | Standard WordPress pages/posts and baseline LocalBusiness/Breadcrumbs | Wrong defaults, missing local facts, duplicate builder schema. |
| Rank Math page schema | Page-specific Service, Article, FAQ, or custom schema | Fields that do not match visible content. |
| Rank Math custom schema generator | More specific JSON-LD is needed and Rank Math supports it | Overbuilt schema or unsupported properties. |
| Page-builder/theme schema | Theme already outputs useful breadcrumbs/article/schema | Duplicates with Rank Math. |
| Manual JSON-LD | Static/non-WordPress site or special case | Harder maintenance and stale data. |
| Third-party plugin | Existing setup is approved and working | Conflicts, outdated schema, plugin bloat. |

Do not let multiple plugins output the same LocalBusiness, Organization, BreadcrumbList, Article, FAQPage, or Service schema unless the duplicate items are intentional and validated.

## Page Type Schema Map

| Page Type | Primary Schema | Optional Schema | Notes |
|---|---|---|---|
| Homepage | LocalBusiness or Organization, WebSite | BreadcrumbList, SearchAction only if appropriate | Use approved NAP/entity data. |
| Service page | Service, WebPage | BreadcrumbList, FAQPage if visible FAQs exist | Service must match a real service sold by the client. |
| Service-area page | Service, WebPage | BreadcrumbList, LocalBusiness reference | Do not fake a physical location in each city. |
| Blog post | BlogPosting or Article | FAQPage if visible FAQs exist, BreadcrumbList | Use accurate author/publisher/date data. |
| Contact page | ContactPage, LocalBusiness reference | BreadcrumbList | NAP must match approved source. |
| About page | AboutPage, Organization/LocalBusiness reference | BreadcrumbList | Do not invent awards or credentials. |
| Gallery/project page | ImageObject or CreativeWork only when useful | BreadcrumbList | Use approved image/content metadata. |
| Location page | LocalBusiness if it is a real location | BreadcrumbList | Only for real branches/locations. |
| Archive/tag page | Usually none or CollectionPage | BreadcrumbList | Often noindex or low priority. |

## Core Schema Types

### LocalBusiness

Use for the real business entity.

Include when approved and visible or otherwise entity-consistent:

- Business name.
- URL.
- Logo/image.
- Phone.
- Address or service-area behavior.
- Opening hours.
- Price range only if approved.
- Service area.
- sameAs profiles.
- GBP or map reference where appropriate.

Do not:

- Mark a service-area business as if it has fake branch locations.
- Invent hours, awards, coordinates, reviews, or ratings.
- Use client review ratings unless they are visible, crawlable, and compliant.

### Service

Use for pages that describe a real service.

Include:

- Service name.
- Provider reference.
- Area served where accurate.
- Service type/category.
- URL.
- Description based on visible page copy.

Do not:

- Add Service schema to thin pages with no real service copy.
- Add services the client does not sell.
- Stuff all services into every page.
- Use exact-match city/service spam.

### BreadcrumbList

Use when the site has a clear hierarchy or breadcrumb trail.

Confirm:

- Breadcrumb order matches the page structure.
- URLs are canonical.
- Names are concise and accurate.
- Output validates in Google's breadcrumb test.

### BlogPosting / Article

Use for blog posts and articles.

Confirm:

- Headline matches the page.
- Author/publisher are accurate.
- Published and modified dates are correct.
- Image URL is crawlable.
- Article body/topic matches visible content.

### FAQPage

Use only when the page has visible FAQ content.

Current policy note:

- Do not prioritize FAQ schema for old rich-result expansion tactics.
- Do not add hidden FAQs only for schema.
- Do not mark up Q&A that is not visible to users.
- Use FAQPage only when it genuinely describes a helpful FAQ section.

## Workflow

### 1. Confirm Rank Math Baseline

Start from `8. Schema Implementation`, but confirm Process 20 first.

Check:

- Rank Math is installed and active, or another schema source is approved.
- Schema module is enabled if Rank Math owns schema.
- Local SEO / Knowledge Graph settings are not blank when applicable.
- Existing schema plugins/themes/builders are identified.
- No duplicate schema source is already causing conflicts.

If plugin setup is incomplete, route back to Process 20.

### 2. Crawl Existing Schema

For each priority URL, collect:

- JSON-LD blocks.
- Microdata/RDFa if present.
- Schema types.
- Required fields.
- Warnings/errors.
- Duplicate item types.
- Source of output, if identifiable.
- Whether the page is indexable.
- Whether the page appears in sitemap.

Flag:

- Missing schema on important pages.
- Invalid JSON-LD.
- Duplicate LocalBusiness/Organization/Breadcrumb/Article/FAQ/Service output.
- Schema that describes hidden or missing content.
- Stale business facts.
- Wrong URLs, phone numbers, addresses, images, or social profiles.

### 3. Classify Page Roles

Assign each URL a schema role:

- Homepage/entity page.
- Service page.
- Service-area page.
- Blog/article.
- Contact page.
- About/trust page.
- Gallery/project page.
- Location page.
- Low-value archive/internal page.

Do not use the same schema package on every page. Schema should match the page.

### 4. Choose Schema Types

For each page, choose:

- Required schema.
- Optional schema.
- Schema source of truth.
- Fields needed.
- Fields blocked by missing facts.
- Automated policy gate result or exception route.

Use the most specific type that remains accurate. Do not use exotic or unsupported types just because they exist in Schema.org.

### 5. Draft Schema Packet

For each page, prepare:

- Page URL.
- Page role.
- Current schema output.
- Recommended schema type(s).
- Recommended source: Rank Math default, Rank Math page schema, custom schema, page-builder, manual JSON-LD, or no change.
- JSON-LD draft or Rank Math field instructions.
- Required facts.
- Approval blockers.
- Validation plan.

### 6. Automated Policy Gate

The Content Engine pipeline runs a policy and fact-consistency gate before schema is staged or applied.

The gate checks:

- Approved LocalBusiness or Organization identity data.
- NAP consistency.
- sameAs/entity reference consistency.
- Ratings/reviews visibility and compliance.
- Awards, certifications, licensing, pricing, or service-area claims.
- Schema source-of-truth conflicts.
- Rank Math template/default safety.
- Manual JSON-LD/template update safety.

If the pipeline lacks approved facts or detects a conflict, it routes an exception packet instead of publishing unsupported schema.

### 7. Implement Schema

Use the approved source of truth.

Implementation options:

- Rank Math Titles & Meta defaults.
- Rank Math Schema tab for a post/page.
- Rank Math custom schema generator.
- Theme/page-builder schema settings.
- Manual JSON-LD in a template or static site.

After implementation:

- Clear relevant cache if needed.
- View page source or rendered DOM.
- Confirm only expected schema output appears.
- Confirm no broken JSON or escaping issues.

### 8. Validate

Validate with:

- Google Rich Results Test for Google-supported features.
- Schema Markup Validator for broader Schema.org syntax.
- Google URL Inspection when GSC access exists.
- Page source/rendered DOM inspection.
- Crawl comparison across priority pages.

Record:

- Passed.
- Warnings.
- Errors.
- Unsupported but valid schema.
- Duplicates.
- Fix owner.

Warnings are not always blockers. Critical errors, misleading markup, missing required fields, and duplicates need review.

### 9. Verify Live Search Hygiene

Confirm schema-bearing pages:

- Are not blocked by robots.txt.
- Are not noindex unless intentionally excluded.
- Have canonical URLs that match the schema URL.
- Are included in the sitemap when indexable.
- Use current business facts.
- Match visible content.
- Do not contain stale or hidden claims.

Route indexing/sitemap issues to Processes 22, 23, or 24.

### 10. Close Out ClickUp

Update ClickUp with:

- Pages reviewed.
- Schema added/changed.
- Schema source of truth.
- Validation results.
- Errors/warnings remaining.
- Automated policy gate status and any exception packets.
- Handoffs to Process 20, 22, 23, 24, or content/page processes.

## What Gets Automated

The Content Engine pipeline automates:

- Crawl and extract structured data.
- Detect duplicates and missing schema.
- Pull live DataForSEO API metrics for keyword, SERP, local intent, competitor, and page-topic validation.
- Combine generated content data with visible page text.
- Compare schema values against generated content records and live page output.
- Select schema types by page role.
- Generate JSON-LD or Rank Math field recommendations.
- Validate output through available tools.
- Prepare page-by-page issue logs.
- Generate ClickUp completion summaries.

## Exception Handling

Human review is limited to exceptions:

- Missing or contradictory approved business identity.
- NAP, service-area, award, certification, review, or pricing claims that are not supported by source data.
- WordPress/page-builder access blockers.
- Rank Math template/default conflicts the pipeline cannot safely change.
- Plugin/theme/template conflicts.
- Cases where schema should be skipped because the page content is not strong enough.

## QA Checklist

- [ ] Rank Math/plugin baseline is confirmed.
- [ ] Current schema output is inventoried.
- [ ] Schema source of truth is documented.
- [ ] Page roles are classified.
- [ ] Recommended schema matches visible page content.
- [ ] LocalBusiness data uses approved NAP/entity facts.
- [ ] Service schema matches real services and page content.
- [ ] FAQPage is used only for visible FAQ content.
- [ ] BreadcrumbList matches the canonical site hierarchy.
- [ ] Blog/article schema uses accurate author, publisher, dates, and images.
- [ ] Duplicate schema output is removed or flagged.
- [ ] Required properties are present.
- [ ] JSON-LD is valid.
- [ ] Google Rich Results Test or equivalent validation is recorded.
- [ ] Schema does not conflict with robots, noindex, canonical, or sitemap state.
- [ ] Automated policy gate passed or an exception packet was created.
- [ ] ClickUp status reflects the real completion state.

## Output Format

For each schema run, produce:

```json
{
  "client": "Client Name",
  "run_type": "schema_markup",
  "automation_status": "fully_automated",
  "execution_system": "Content Engine pipeline",
  "data_sources": ["generated_content_data", "DataForSEO API", "live_page_crawl"],
  "clickup_source": "8. Schema Implementation",
  "site": "https://client.example",
  "pages": [
    {
      "url": "https://client.example/lawn-care/",
      "page_role": "service_page",
      "current_schema": ["WebPage", "BreadcrumbList"],
      "recommended_schema": ["Service", "BreadcrumbList"],
      "source_of_truth": "Rank Math page schema",
      "status": "implemented",
      "validation": "passed_with_warnings",
      "warnings": ["Recommended property missing: image"],
      "policy_gate": "passed",
      "exception_route": null
    }
  ],
  "training_video": "No applicable Loom found in ClickUp list 901111072650"
}
```

## Completion Criteria

The process is complete when:

- Priority pages were reviewed.
- Schema source of truth is clear.
- Missing or weak schema has been added where appropriate.
- Duplicate or misleading schema is removed or flagged.
- LocalBusiness, Service, Breadcrumb, Article, and FAQ decisions are documented.
- Validation results are recorded.
- Remaining warnings/errors have owners or reasons.
- Related sitemap, robots, indexing, Rank Math, or content issues are routed.
- ClickUp reflects the true status.

## Common Mistakes

- Adding schema to hide weak page content.
- Marking up content that is not visible on the page.
- Duplicating schema through Rank Math, theme, builder, and manual JSON-LD.
- Using fake branch locations for service-area businesses.
- Adding reviews or ratings that are not visible and compliant.
- Treating FAQ schema as a guaranteed rich-result tactic.
- Putting Service schema for every service on every page.
- Forgetting that schema URL/canonical/sitemap/indexing state must agree.
- Leaving stale phone numbers, addresses, logos, hours, or sameAs profiles.
- Treating validation warnings as irrelevant without review.
- Using unrelated Loom videos in this SOP.

---

*Part of the [SEO Command Center](../../README.md) - Lawn & Land Marketing*

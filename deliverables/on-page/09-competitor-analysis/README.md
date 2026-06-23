# Competitor Analysis

**Category:** On-Page SEO
**Automation Readiness Score:** 10/10 — 🤖 Fully automated inside the Content Engine Factory
**Status:** ✅ Documented

---

## Purpose

Competitor analysis shows what the client is really up against in local organic search and the map-adjacent SERP. It turns ranking data, local SERPs, competitor pages, and content gaps into practical decisions for keyword research, service pages, service-area pages, blogs, internal links, metadata, and reporting.

For Lawn & Land clients, the point is not to copy another landscaper's website. The point is to understand which local competitors are earning visibility, why they are winning, and what the client can do better without faking services, locations, reviews, credentials, or project proof.

The goal is simple:

- Identify true local SEO competitors, not just business rivals.
- Compare rankings, keywords, content coverage, page structure, local proof, and authority signals.
- Find gaps that can feed the SEO fulfillment system.
- Separate useful competitor patterns from junk worth ignoring.
- Produce clear next actions for pages, blogs, links, metadata, GBP, citations, and reporting.

## Current State

Competitor review already appears inside related workflows:

- Keyword Research uses competitor keyword gaps and competitor ranking data.
- Service Pages and Service Area Pages use SERP competitors to understand page structure and content gaps.
- Blog Content uses SERP analysis to identify article formats, questions, and competing content angles.
- Internal Linking and metadata work use ranking opportunities and SERP expectations to prioritize fixes.
- Monthly reporting needs a clean explanation of why certain content or page work matters.

The missing piece was a standalone competitor-analysis workflow that defines how to choose competitors, collect evidence, score gaps, and turn findings into fulfillment tasks.

That work now runs inside the Content Engine Factory production pipeline. Competitor analysis is triggered from the same factory packet that handles keyword research, service-page briefs, service-area pages, blog/content planning, metadata, H1s, internal links, and reporting handoffs. Workflow execution is systematically driven by pulling live SERP metrics directly from the DataForSEO API, then routing validated gaps into the correct next process.

## Target State

Every active SEO client should have a competitor-analysis packet at onboarding and a lighter refresh quarterly.

The ideal system:

1. Receives a Content Engine Factory job, onboarding packet, keyword-map refresh, page-build request, content plan, optimization packet, or ranking-drop investigation.
2. Pulls live DataForSEO SERP metrics for approved keywords, services, cities, and local search settings.
3. Collects known competitors from the client/team when available.
4. Discovers actual local organic competitors from target keywords, city searches, ranking URLs, local/map-adjacent SERP features, and repeated domain patterns.
5. Separates direct local competitors from directories, aggregators, national brands, lead-gen sites, and unrelated businesses.
6. Compares ranking coverage, page coverage, content depth, metadata, headings, internal links, local proof, schema, reviews, GBP signals, citations, and backlink signals.
7. Identifies keyword, service, city, blog, metadata, H1, internal-link, and authority gaps.
8. Scores each gap by relevance, business value, difficulty, and confidence.
9. Feeds approved opportunities into the next SEO processes.

## Automation Score

**10/10 — Fully automated inside the Content Engine Factory**

The dashboard should show Process 09 as 100% automated because the production pipeline can run competitor discovery, evidence capture, scoring, and routing end to end when DataForSEO access exists:

- Pulling live DataForSEO SERP metrics by keyword, service, city, device, and location.
- Capturing ranking URLs, domains, page types, snippets, SERP features, and local/map-adjacent results.
- Finding repeated competitor domains across target searches.
- Comparing keyword coverage and ranking positions.
- Crawling competitor pages for titles, H1s, headings, content length, FAQs, schema, links, and page types.
- Clustering competitor topics and service/city coverage.
- Flagging missing client pages, weak content, and content gap opportunities.
- Summarizing competitor patterns and producing a prioritized action list.
- Routing scored findings into the right Content Engine Factory output: service page, service-area page, blog, metadata, H1, internal linking, schema, GBP/local proof, citations, backlinks, or reporting.

Fully automated does not mean every SERP signal becomes a task. It means Koga/Kai can execute the workflow, reject obvious noise, score opportunities, and route clear findings automatically. Humans review exception cases: uncertain competitors, new service/market decisions, sensitive claims, package-scope conflicts, or anything that would change client strategy.

## When This Process Runs

| Trigger | What Happens |
|---|---|
| Onboarding | Identify real local SEO competitors and feed keyword/page strategy. |
| Keyword research | Use competitor rankings and gaps to strengthen the keyword map. |
| New service page | Review ranking competitor pages before drafting structure and proof needs. |
| New service-area page | Review local SERP competitors and city-page patterns. |
| Blog planning | Find content formats, questions, and topics competitors rank for. |
| Monthly optimization | Compare close-ranking pages and decide what to improve next. |
| Quarterly refresh | Re-run competitor discovery and update opportunity priorities. |
| Ranking drop | Check whether competitors gained content, links, reviews, GBP strength, or technical advantages. |

## Inputs

| Input | Used For |
|---|---|
| Content Engine Factory job | Connect competitor analysis to the keyword, page, content, metadata, H1, link, or reporting packet being produced. |
| Live DataForSEO SERP metrics | Pull ranking URLs, domains, positions, snippets, SERP features, local intent, and repeated competitor patterns. |
| Client services and service areas | Define which competitors and gaps are relevant. |
| Known competitors | Seed list from client/team for validation. |
| Approved keyword map | Target terms and page roles to compare. |
| DataForSEO SERP API | Local organic SERP competitor discovery and result capture. |
| DataForSEO Labs or comparable keyword data | Competitor ranked keywords and gap discovery. |
| SE Ranking or rank tracker data | Current rankings, tracked competitors, and visibility trends. |
| GSC data | Client query/page opportunities and missed visibility. |
| Client sitemap | Current page/post inventory and page-role coverage. |
| Competitor sitemaps/crawls | Competitor service, city, blog, and trust-page coverage. |
| GBP/review snapshots | Local proof and reputation context when relevant. |
| Citation/backlink data | Authority and entity comparison when available. |

## Competitor Types

Classify competitors before making recommendations.

| Competitor Type | Examples | How To Use |
|---|---|---|
| Direct local operator | Lawn care or landscaping company in the client's market | Primary benchmark for service pages, local proof, reviews, and conversion paths. |
| Service specialist | Hardscaper, irrigation company, tree service, lighting company | Useful for specific service gaps only. |
| Regional brand | Multi-location green-industry company | Useful for structure and authority patterns, but not always copyable. |
| Directory/aggregator | Yelp, Angi, Thumbtack, HomeAdvisor | Track as SERP competition, but do not copy content strategy blindly. |
| Lead-gen site | Thin local lead capture pages | Usually a warning sign, not a model. |
| National publisher | Big informational site ranking for blog topics | Useful for topic coverage, not local service-page strategy. |
| Unrelated business | Wrong service, wrong market, or wrong intent | Exclude from analysis. |

## Workflow

### 1. Define the Analysis Scope

Classify the request first.

| Run Type | Primary Goal |
|---|---|
| Onboarding analysis | Build the competitor set and feed keyword/page strategy. |
| Keyword gap analysis | Find terms competitors rank for and the client does not. |
| Service-page analysis | Compare competitor service page structure, proof, and content depth. |
| Service-area analysis | Compare city/market coverage and local proof. |
| Blog/content gap analysis | Find topics, questions, and article formats competitors own. |
| Ranking drop investigation | Identify competitor gains or client weaknesses behind visibility loss. |
| Quarterly refresh | Update competitors, ranking gaps, and next-priority actions. |

If the request comes from the Content Engine Factory, keep the factory job as the parent record. Competitor evidence, scored gaps, rejected signals, and routed tasks should travel with the same page packet, article packet, keyword map, or optimization packet from brief to publish QA.

### 2. Build the Candidate Competitor List

Start with:

- Known competitors from the client or team.
- Domains ranking repeatedly in live DataForSEO SERP metrics for approved keywords.
- Domains ranking in target cities and service-area searches.
- Domains visible in local pack/map-adjacent SERP features when DataForSEO returns them.
- Competitors already present in rank tracking tools.

For each candidate, capture:

- Domain
- Business name
- Market served
- Services offered
- Search queries where it appears
- Organic positions
- Local pack/map presence when available
- DataForSEO task/date/location/device context
- Whether it is a direct competitor, specialist, directory, lead-gen site, or irrelevant result
- Confidence score

Do not treat every ranking domain as a strategic competitor. Directories and lead-gen pages can explain SERP pressure, but they should not automatically shape the client's content plan.

### 3. Validate True Competitors

Review each candidate against client reality.

Validation questions:

- Do they sell the same or overlapping services?
- Do they serve the same market?
- Are they ranking for keywords the client actually wants?
- Are they a real local operator or an aggregator?
- Are they ranking because of authority, content, reviews, local proof, or just directory strength?
- Would beating them matter commercially?

Automation can approve obvious direct competitors and reject obvious noise when the evidence is strong. Human review is reserved for edge cases where commercial relevance, service overlap, market coverage, or strategic response is unclear.

### 4. Capture SERP Evidence

For priority keywords and markets, pull live DataForSEO SERP metrics and capture:

- Keyword
- Location setting
- DataForSEO location code when available
- Device and language settings
- Date
- Top organic results
- Local pack/map observations when available
- SERP features
- Repeated competitor domains
- Ranking URL, not only root domain
- Position and previous-position context when available
- Page type ranking: homepage, service page, city page, blog, directory, or aggregator
- Content angle or intent shape
- Notable title/H1/snippet patterns

Use the correct local geography. A competitor set for `landscaping Collegeville PA` is not the same as a competitor set for a statewide landscaping topic.

### 5. Compare Page and Content Coverage

For approved competitors, compare:

| Area | What To Check |
|---|---|
| Services | Which service pages exist, how specific they are, and which services the client is missing. |
| Service areas | City/market pages, depth, local proof, and duplicate-page risk. |
| Blog topics | Seasonal, service, problem, comparison, pricing, and maintenance topics. |
| Metadata | Title/H1/snippet clarity and keyword alignment. |
| Page structure | Hero, intro, service details, proof, FAQs, process, reviews, CTAs, images. |
| Internal links | How pages connect to services, city pages, blogs, contact paths, and trust pages. |
| Schema | LocalBusiness, Service, FAQPage, BreadcrumbList, Article, and review-related markup where relevant. |
| Local proof | Project photos, reviews, service-area evidence, team/truck photos, awards, licenses, and community signals. |
| Conversion path | Quote buttons, phone links, forms, CTAs, and trust cues. |

Competitor review is for gap detection. Do not copy wording, layout, fake proof, city claims, or offers.

### 6. Compare Keyword and Ranking Coverage

Use keyword tools and rank data to compare:

- Keywords the client ranks for and competitors do not.
- Keywords competitors rank for and the client does not.
- Keywords where the client ranks in positions 4-20.
- Keywords where the wrong client page is ranking.
- Keywords where multiple competitors have dedicated pages and the client has none.
- Keywords where directories dominate and a realistic organic path may require stronger local authority.
- Blog topics competitors rank for that support service pages.

Group gaps by fulfillment path:

| Gap Type | Feeds Into |
|---|---|
| Missing service page | Process 02, Service Pages |
| Missing service-area page | Process 03, Service Area Pages |
| Blog topic gap | Process 04, Blog Content |
| Weak internal support | Process 05, Internal Linking |
| Metadata mismatch | Process 07, Title Tags & Meta Descriptions |
| H1/heading mismatch | Process 08, H1 Optimization |
| Schema gap | Process 21, Schema Markup |
| GBP/review/local proof gap | GBP and reporting workflows |
| Citation/link authority gap | Off-page workflows |

### 7. Score Opportunities

Score each opportunity before recommending work.

| Factor | What It Means |
|---|---|
| Relevance | The service, city, or topic matches what the client actually sells. |
| Business value | The opportunity can lead to meaningful leads or local visibility. |
| SERP evidence | Competitors are ranking with pages/topics the client lacks or underuses. |
| Current position | The client is close enough to improve or absent from an important result. |
| Difficulty | Competitors may have strong authority, reviews, links, or content depth. |
| Implementation effort | The fix may be a metadata update, page rewrite, new page, blog, or authority campaign. |
| Confidence | Data quality and competitor relevance are strong enough to act. |

Recommended priority labels:

- **High:** Relevant, commercially valuable, strong SERP evidence, realistic path.
- **Medium:** Useful, but needs more proof, content, or link support.
- **Low:** Interesting but low value, weak confidence, or not urgent.
- **Reject:** Not a real service, not the right market, directory-only noise, or bad-fit competitor signal.

### 8. Turn Findings Into Actions

Every finding should become one of:

- New page recommendation.
- Existing page optimization.
- Blog topic recommendation.
- Internal-link recommendation.
- Metadata/H1 update.
- Schema recommendation.
- GBP/review/local proof recommendation.
- Citation/backlink recommendation.
- Reporting note.
- Reject/no action.

Do not deliver competitor analysis as a wall of observations. The output should tell the team what to do next and why.

## What Gets Automated

Koga can:

- Run competitor analysis from the Content Engine Factory job.
- Pull live DataForSEO SERP metrics for approved keywords, services, cities, devices, and locations.
- Capture ranking URLs, positions, snippets, SERP features, and repeated domain patterns.
- Identify repeated competitor domains.
- Classify likely competitor type.
- Crawl competitor pages and extract titles, H1s, headings, word count, schema, links, FAQs, CTAs, and page types.
- Compare competitor page coverage against the client's sitemap.
- Pull keyword gap data when tool access exists.
- Compare rankings, close opportunities, and missing pages.
- Summarize SERP patterns and content gaps.
- Score opportunities and route them into SEO processes.
- Produce a competitor-analysis packet and quarterly refresh notes.

## What Stays Human

Humans approve or handle exception cases:

- Unclear competitor-set decisions.
- Whether an edge-case competitor is commercially relevant.
- Sensitive strategic choices, such as entering a new service or market.
- Deciding whether a competitor's claim, offer, proof, or page model is worth responding to.
- Rejecting spam, directories, lead-gen noise, or unrealistic targets.
- Confirming the client actually offers the service or serves the city.
- Prioritizing work against package scope, budget, and client capacity.

## QA Checklist

- [ ] Analysis scope and target market were defined.
- [ ] Known competitors were collected when available.
- [ ] Live DataForSEO SERP metrics were pulled for approved keywords and locations.
- [ ] Local SERP competitors were discovered from live ranking URLs, domains, positions, snippets, and SERP features.
- [ ] Direct competitors were separated from directories, lead-gen sites, publishers, and irrelevant domains.
- [ ] Competitor URLs, not just root domains, were captured.
- [ ] Page type was identified for ranking URLs.
- [ ] Keyword and content gaps were tied to client services and service areas.
- [ ] Recommendations do not copy competitor wording, claims, layouts, or fake proof.
- [ ] Service, location, licensing, guarantee, award, review, and pricing claims were not invented.
- [ ] Opportunities were scored by relevance, business value, difficulty, effort, and confidence.
- [ ] Each approved finding routes to a specific SEO process or is explicitly rejected.
- [ ] Human-review decisions are clearly marked.

## Output Format

For each run, produce:

```json
{
  "client": "Client Name",
  "run_type": "quarterly_competitor_refresh",
  "market": "Collegeville, PA",
  "analysis_date": "YYYY-MM-DD",
  "dataforseo_context": {
    "source": "DataForSEO SERP API",
    "location": "Collegeville, Pennsylvania, United States",
    "device": "desktop",
    "language": "English",
    "live_serp_metrics_used": true
  },
  "summary": {
    "keywords_checked": 0,
    "candidate_domains_found": 0,
    "approved_competitors": 0,
    "high_priority_gaps": 0,
    "medium_priority_gaps": 0,
    "rejected_signals": 0
  },
  "approved_competitors": [
    {
      "domain": "competitor.com",
      "business_name": "Competitor Name",
      "competitor_type": "direct_local_operator",
      "services_overlap": ["landscaping", "hardscaping"],
      "markets_overlap": ["Collegeville", "Phoenixville"],
      "confidence": "high",
      "reason": "Ranks repeatedly for approved service and city keywords."
    }
  ],
  "serp_evidence": [
    {
      "keyword": "landscaping collegeville pa",
      "location": "Collegeville, Pennsylvania, United States",
      "ranking_url": "https://competitor.com/landscaping-collegeville-pa/",
      "position": 3,
      "page_type": "service_area_page",
      "observed_gap": "Competitor has a dedicated city page with service links and local proof."
    }
  ],
  "opportunities": [
    {
      "gap_type": "service_area_page",
      "priority": "high",
      "recommended_process": "Process 03 - Service Area Pages",
      "target": "Collegeville landscaping service-area page",
      "reason": "Multiple direct competitors rank with dedicated Collegeville pages while the client has no matching URL.",
      "human_gate": true
    }
  ],
  "rejected_signals": [
    {
      "domain": "directory.example",
      "reason": "Directory result, useful as SERP pressure but not a content model."
    }
  ]
}
```

## Completion Criteria

The process is complete when:

- The market, service scope, and run type are clear.
- Live SERP metrics have been pulled directly from the DataForSEO API or the fallback is documented.
- Candidate competitors have been collected from known competitors and DataForSEO local SERP data.
- True competitors have been separated from directories, lead-gen sites, publishers, and irrelevant domains.
- Priority keywords and ranking URLs have been reviewed.
- Keyword, page, content, local proof, metadata, link, schema, GBP, or authority gaps have been identified.
- Each recommendation is tied to a client-relevant service, city, or business goal.
- Human-review items are clearly separated.
- Approved findings are routed into the correct next SEO processes.
- The Content Engine Factory record includes SERP evidence, competitor classification, opportunity scores, routed tasks, and rejected signals.
- The task record includes what changed, what remains, and what should be reviewed next quarter.

## Common Mistakes

- Treating business competitors and SEO competitors as the same list.
- Copying competitor page structure without checking search intent.
- Chasing directories or national publishers as if they were local operators.
- Recommending pages for services the client does not sell.
- Recommending city pages for markets the client does not serve.
- Using one broad SERP to make decisions for every service and city.
- Reporting observations without next actions.
- Ignoring competitor gaps because they are "off-page" or GBP-related.
- Treating competitor analysis as a one-time onboarding task instead of a quarterly input.
- Letting automation decide the final competitor set without human review.

## Source References

| Source | Relevant Rules |
|---|---|
| DataForSEO SERP API | Supplies live SERP metrics, ranking URLs, positions, snippets, SERP features, location/device settings, and repeated competitor patterns that drive the workflow. |
| `deliverables/on-page/01-keyword-research/README.md` | Uses competitor keyword gaps, DataForSEO SERP data, and approved keyword maps as inputs. |
| `deliverables/on-page/02-service-pages/README.md` | Requires competitor examples and SERP review to identify service-page gaps without copying. |
| `deliverables/on-page/03-service-area-pages/README.md` | Requires local SERP review and competitor validation for city-page opportunities. |
| `deliverables/on-page/04-blog-content/README.md` | Uses SERP/content gaps to define blog topics, angles, and competing URLs. |
| `deliverables/on-page/05-internal-linking/README.md` | Uses ranking and content opportunities to prioritize internal link support. |
| `deliverables/on-page/07-title-tags-meta/README.md` | Uses SERP competitor patterns to shape title and snippet improvements. |
| `BLOG-CREATION-PROCESS.md` | Requires DataForSEO keyword research and SERP analysis for competing content before drafting blogs. |
| `OPTIMIZATION-PROTOCOL.md` | Requires avoiding competitor links, reviewing SERP support, and turning weak ranking assets into better live pages. |

---

*Part of the [SEO Command Center](../../README.md) · Lawn & Land Marketing*

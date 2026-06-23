# Keyword Research

**Process ID:** 01
**Category:** On-Page SEO
**Fulfillment Connection:** One-Time Fulfillment / Onsite Core Content Optimization / Blog Content Creation / Press Releases / SEO Ranking Performance
**Cadence:** Automated on onboarding, every content-engine run, quarterly refresh, and any time a new service or service area is added
**Automation Readiness Score:** 10/10 - Fully automated for content generation
**Status:** Fully automated

---

## Purpose

Keyword research turns a client's services and service areas into a prioritized search map. It tells the team which keywords matter, which pages should target them, what content should be created next, and which rankings should be tracked.

Process 1 is now fully automated for the content engine. Koga pulls keyword, SERP, competitor, and opportunity data through the DataForSEO API and uses that research to generate aligned web content, blog posts, and press releases without a manual keyword-research build step.

This process feeds:

- Service Pages
- Service Area Pages
- Blog Content
- Press Releases
- Internal Linking
- Title Tags and Meta Descriptions
- Competitor Analysis
- Google Search Console review
- Internal Monthly Scorecard
- Client Monthly Report

## Current State

The old baseline process used Merge Words to combine a service list with city and state modifiers. That raw-list step has been replaced for content-generation work.

Koga now actively pulls keyword data from DataForSEO, expands service and city opportunities, clusters intent, scores priorities, and routes the results into the established content engine. The automated output supports web content, blog posts, and press releases with current search-demand data instead of static keyword lists.

## Target State

Koga/Kai should keep Process 1 running as a fully automated research layer. DataForSEO remains the primary source for keyword volume, competition, CPC, ranked keywords, SERP composition, competitor discovery, and local search opportunity. SE Ranking and GSC can supplement the run when available.

The output is a prioritized keyword map and content brief foundation that can be used immediately by the web content, blog, and press release workflows. Human review is an exception path for missing inputs, unsupported service claims, unusual client positioning, or sensitive content decisions.

The final map must show:

- Primary target keywords by service
- Service x city keyword opportunities
- Supporting secondary keywords
- Informational blog opportunities
- Press release angles and local authority topics
- Existing URL or new page recommendation
- Search intent and funnel stage
- Priority tier for fulfillment
- Ranking tracker seed keywords
- Automation notes and exception-review flags

## Required Inputs

Before running keyword research, collect these inputs:

| Input | Owner | Notes |
|---|---|---|
| Client domain | Human or Koga | Use the live website when available. |
| Client services | Koga, with human fallback | Pull from website, onboarding notes, GBP services, and known client data. |
| Service areas | Koga, with human fallback | Cities and states only. Do not use counties as primary targets unless approved. |
| Priority services | Koga, with human fallback | Infer from package, site structure, onboarding notes, and content priorities. |
| Known competitors | Koga, with human fallback | Use DataForSEO SERPs and client-provided competitors when available. |
| Current sitemap or indexed URLs | Koga/Kai | Used to map keywords to existing pages. |
| Google Search Console access | Koga/Kai | Use if available for current impressions, clicks, and position data. |
| GBP categories and services | Human or Koga | Helps validate local terminology. |
| Brand/client notes | Koga, with human fallback | Exclude services the client does not want, cannot staff, or does not offer. |

## Data Sources and Tools

| Source | Used For |
|---|---|
| DataForSEO SERP API | Primary source for local SERP simulation, competitor discovery, ranking context, SERP features, and local pack checks. |
| DataForSEO Labs | Primary source for keyword ideas, search volume, competition, CPC, competitor ranked keywords, and keyword gap data. |
| SE Ranking | Keyword research, rank tracking seed list, competitive data when available. |
| Google Search Console | Existing query data, positions 4-20 opportunities, page-level impressions and clicks. |
| Client onboarding notes | Services, locations, exclusions, local terminology, business priorities. |
| Website sitemap | Existing URL mapping and cannibalization checks. |
| Google Business Profile | Category and service validation. |
| LawnLab SEO Playbook | Fulfillment context and process alignment. |
| LawnLab SEO Checklist | Automation target and human approval gate. |

## Workflow

### 1. Confirm the Business Inputs Automatically

Start with the client facts, not the keyword tool. Koga compiles:

- Business name and domain
- Core services
- Individual services
- Main service areas
- Priority services
- Services to exclude
- Known competitors
- Current GBP category and service list

If any input is missing, document the assumption and mark the field as an exception-review item. Do not block the standard content-engine run unless the missing input creates a real risk.

### 2. Build Seed Keywords

Create initial seeds from the client service and service area list.

Minimum seed pattern:

- `[service] [city] [state]`
- `[service] [city]`
- `[service] in [city]`
- `[service] near [city]`

Also include natural green-industry synonyms.

Examples:

- lawn mowing = grass cutting = lawn cutting
- fertilization = fertilizing = lawn fertilization
- landscaping = landscape design = landscaping services

Seed keyword distribution should be roughly:

- 70% or more transactional keywords
- 30% or less informational keywords
- 25-35% high priority
- 45-55% medium priority
- 15-25% low priority

### 3. Pull Keyword Metrics With DataForSEO

Use DataForSEO as the default enrichment layer for:

- Monthly search volume
- Competition or keyword difficulty
- CPC
- SERP result type
- Local pack presence when available
- Current client ranking when available
- Competitors ranking for the same term

Use the correct local geography for DataForSEO. Prefer a city-level location name such as `Princeton, New Jersey, United States` when the process is evaluating a city-specific keyword.

Use SE Ranking or GSC as supplemental context when available, not as the primary automation dependency for content-generation work.

### 4. Expand With Competitor Gaps

Use competitor analysis to discover keywords competitors rank for and the client does not.

Include:

- Competitor ranked keywords
- Keywords where multiple competitors rank
- Service terms missing from the client's site
- City/service combinations competitors cover
- Keywords where the client is already close to page-one movement

Remove unrelated terms, services the client does not offer, and keywords outside the client's real service area.

### 5. Clean and Normalize the Keyword List

Before scoring, normalize the list:

- Remove duplicates
- Merge obvious spelling/casing variations
- Standardize city and state names
- Remove irrelevant services
- Remove unsupported locations
- Flag ambiguous keywords for human review
- Keep synonyms when they represent real search behavior

Do not over-clean away useful customer language. If homeowners search for "grass cutting," keep it even if the client says "lawn mowing."

### 6. Cluster by Service, Geography, and Intent

Use the keyword clustering automation flow:

1. Classify each keyword by base service.
2. Separate unrelated or unsupported terms into `other`.
3. Cluster semantically similar keywords.
4. Keep different cities in different clusters.
5. Separate transactional, informational, commercial, and navigational intent.
6. Assign a suggested content type.

Cluster examples:

| Cluster Type | Example Primary Keyword | Likely Content Type |
|---|---|---|
| Service + city | lawn mowing Princeton | Local service page |
| Service only | lawn mowing service | Service page |
| How-to | how to fertilize lawn | Blog guide |
| Best/reviews | best lawn care company near me | Comparison or trust-focused content |
| Pricing | lawn mowing cost | Pricing/supporting content |

### 7. Score Opportunity

Score every keyword or cluster using the following factors:

| Factor | Why It Matters |
|---|---|
| Search intent | Transactional local searches usually matter first. |
| Service priority | High-value client services should outrank low-margin services. |
| Search volume | Higher demand can justify earlier content work. |
| Competition/difficulty | Lower competition can create faster wins. |
| CPC | Higher CPC often signals commercial value. |
| Existing ranking | Positions 4-20 are strong improvement opportunities. |
| Existing page fit | A keyword mapped to an existing page may be faster to improve. |
| Local relevance | Keywords must match real cities and service areas. |
| Content gap | Missing page/content opportunities feed fulfillment. |

Use a simple priority label:

- **Tier 1:** High intent, high business value, clear page target or quick win.
- **Tier 2:** Good opportunity, but lower urgency or more competitive.
- **Tier 3:** Useful supporting topic, low volume, or future expansion.
- **Reject:** Irrelevant, unsupported, outside service area, or wrong intent.

### 8. Map Keywords to URLs

Every approved keyword cluster must map to one of these outcomes:

- Existing service page to optimize
- Existing service area page to optimize
- New service page needed
- New service area page needed
- Blog/supporting content needed
- GBP post or GBP service support
- Ranking tracker only
- Rejected or parked

Avoid mapping the same primary keyword to multiple pages. If two pages could target the same primary term, flag it as a cannibalization risk.

### 9. Select Rank Tracking and Content-Engine Keywords

Choose a practical tracking set from the approved map.

Include:

- Primary service keywords
- Priority city/service combinations
- High-value existing rankings in positions 4-20
- A few informational/blog keywords tied to active content
- Press release support terms tied to local authority, service expansion, seasonal topics, or company news
- Brand/entity terms only when they matter for reporting

Do not overload the tracker with every keyword in the universe. The tracker should reflect decisions, not raw research.

### 10. Automated QA and Exception Review

For standard web content, blog posts, and press releases, Process 1 no longer requires a manual keyword-research gate. Koga validates the keyword map against services, locations, intent, SERP relevance, and existing URLs before handing it to the content engine.

Human review is only required when the automation flags:

- Missing or conflicting service-area data
- Services the client may not actually offer
- Sensitive claims, regulated language, or legal/reputation risk
- A major page-structure decision that could create cannibalization
- A press release angle that needs client confirmation
- Any confidence score below the acceptable threshold

If no exception is present, the keyword research packet is considered automation-approved for content generation.

### 11. Handoff to Fulfillment

After automated QA, send the keyword map into the next process:

| Destination Process | What It Receives |
|---|---|
| Service Pages | Primary service keywords, secondary terms, page intent, and current URL/new URL recommendation. |
| Service Area Pages | Approved city/service opportunities and local page priorities. |
| Blog Content | Informational and commercial topics tied to service gaps. |
| Press Releases | Local authority angles, service-expansion topics, seasonal topics, entity terms, and anchor/context recommendations. |
| Title Tags and Meta Descriptions | Primary keywords and search intent by URL. |
| Internal Linking | Page priority, related service clusters, and anchor language. |
| Reporting | Ranking tracker seed terms and strategic context. |

### 12. Automated Refresh

Refresh automatically during quarterly reviews and content-engine runs:

- Search volume and competition
- Current rankings
- Positions 4-20 opportunities
- Competitor keyword gaps
- New service areas
- New client priorities
- Keywords that no longer matter
- Content/page opportunities created since the last review

Quarterly refresh output should include:

- New opportunities
- Keywords to keep
- Keywords to remove or park
- Pages that need optimization
- New content recommendations
- Changes to the rank tracking set

## Automation Plan

### Koga/Kai Automates the Full Process

- Generate seed keywords from services and locations
- Pull DataForSEO metrics, SERP data, and competitor keyword data
- Pull SE Ranking and GSC support data when available
- Pull GSC query opportunities
- Find competitor keyword gaps
- Normalize and deduplicate keyword data
- Classify keywords by service
- Cluster by semantics, geography, and intent
- Score opportunity
- Map clusters to existing URLs
- Recommend new pages and blog topics
- Recommend press release angles
- Build the content-engine research packet
- Flag exceptions instead of forcing every run through manual review
- Refresh the map quarterly

### Human Exception Handling Only

- Resolve missing or conflicting services and service areas
- Confirm unusual or sensitive client claims
- Reject bad-fit or low-margin targets when automation confidence is low
- Approve major site-architecture changes when cannibalization risk is high
- Approve client-sensitive press release angles

## Output Format

The completed keyword map should contain at minimum:

| Field | Description |
|---|---|
| Client | Client name/domain. |
| Cluster ID | Stable ID for each keyword cluster. |
| Base Service | Service the keyword belongs to. |
| Geography | City, state, generic, or multiple. |
| Primary Keyword | Main target keyword. |
| Secondary Keywords | Supporting variations. |
| Search Volume | Primary and/or cluster volume. |
| Competition/Difficulty | Tool-provided metric. |
| CPC | Commercial value signal. |
| Search Intent | Transactional, informational, commercial, or navigational. |
| Funnel Stage | BOFU, MOFU, or TOFU. |
| Current Ranking | Client's current position when available. |
| Existing URL | Current page if one exists. |
| Recommended URL/Page | Existing optimization or new page recommendation. |
| Content Engine Use | Service page, service area page, blog, press release, metadata, internal linking, tracker only, or reject. |
| Priority Tier | Tier 1, Tier 2, Tier 3, Reject. |
| Automation Status | Automation-approved, exception review, revised, rejected, or pending. |
| Notes | Assumptions, exclusions, or next steps. |

## Quality Checklist

Before marking this process complete, verify:

- [ ] Core services are represented.
- [ ] Individual services are represented.
- [ ] Main service areas are represented.
- [ ] DataForSEO keyword and SERP pulls completed for the active geography.
- [ ] Unsupported services are removed.
- [ ] Unsupported cities are removed.
- [ ] Synonyms are preserved when customers actually search that way.
- [ ] Search volume, competition, and CPC are included where available.
- [ ] Keywords are clustered by service, geography, and intent.
- [ ] Every approved cluster has a page/content outcome.
- [ ] No two pages are assigned the same primary keyword without a cannibalization note.
- [ ] Positions 4-20 opportunities are flagged when GSC/ranking data is available.
- [ ] Top 5-10 first targets are identified.
- [ ] Blog and press release opportunities are routed into the content engine.
- [ ] Rank tracking seed terms are selected.
- [ ] Automation-approved rows have no unresolved exception flags.
- [ ] Any exception-review rows have clear human action notes.

## Completion Criteria

This process is complete when:

1. The approved keyword map exists for the client.
2. The priority targets are ranked by opportunity.
3. Each approved cluster has a fulfillment destination.
4. The first 5-10 targets are clear.
5. Rank tracking seed keywords are selected.
6. Web content, blog, and press release opportunities are ready for the content engine.
7. Exception-review items are either resolved or clearly isolated from the automated content run.
8. The next process owner can start Service Pages, Service Area Pages, Blog Content, Press Releases, or metadata optimization without redoing the research.

## Common Mistakes

- Using only Merge Words and stopping at a raw list instead of DataForSEO-backed automation.
- Chasing high-volume generic keywords that will not convert locally.
- Ignoring the client's most profitable services.
- Targeting counties as primary local pages without approval.
- Mapping one primary keyword to several pages.
- Throwing every keyword into rank tracking.
- Sending exception-flagged claims into content without review.
- Treating keyword research as a one-time onboarding task instead of refreshing through the automated content engine.

## Source References

- `https://lawnlab.dev/seo-playbook`
- `https://lawnlab.dev/seo-checklist/`
- `/opt/koga/.openclaw/workspace/seo/automation/STEP_2_INFO_COLLECTION.md`
- `/opt/koga/.openclaw/workspace/seo/automation/STEP_3_COMPETITOR_ANALYSIS.md`
- `/opt/koga/.openclaw/workspace/seo/automation/STEP_4_KEYWORD_CLUSTERING.md`
- `/opt/koga/.openclaw/workspace/seo/automation/STEP_5_SITE_ARCHITECTURE.md`
- `/opt/koga/.openclaw/workspace/seo/ONBOARDING_MASTER.md`
- `/opt/koga/.openclaw/workspace/seo/SEO_MASTER_STRATEGY.md`
- `/opt/koga/.openclaw/workspace/repos/web-process-30/lib/dataforseo.js`

---

*Part of the [SEO Command Center](../../README.md) - Lawn & Land Marketing*

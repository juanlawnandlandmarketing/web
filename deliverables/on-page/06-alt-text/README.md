# AI Generation

**Process ID:** 06
**Category:** On-Page SEO
**Fulfillment Connection:** Content Factory Engine / Blog Content Creation / Service Pages / Service Area Pages / Press Releases
**Cadence:** Every content creation and production pipeline run
**Automation Readiness Score:** 10/10 - Fully automated
**Status:** Fully automated

---

## Purpose

AI Generation is the content-production layer that turns approved keyword research, client preferences, page intent, and SEO performance data into publish-ready content assets.

Process 06 is executed completely by the AI Agent during the content creation and production pipeline. The agent generates drafts, rewrites, metadata, FAQs, schema notes, summaries, excerpts, calls to action, supporting image prompts, and optimization recommendations while actively targeting the defined keywords for the page or asset.

This process feeds:

- Service Pages
- Service Area Pages
- Blog Content Factory Engine
- Internal Linking
- Title Tags and Meta Descriptions
- Press Releases
- GBP Posts
- Email Newsletter
- Client Monthly Report

## Current State

AI generation is already embedded throughout the Content Factory Engine. The agent uses Process 1 keyword data, DataForSEO-backed topic research, client preference notes, live-page context, and source-of-truth workflows to create or improve content.

The SOP now treats Process 06 as a fully automated production process, not a manual drafting assist. Human review only appears as an exception path for missing facts, sensitive claims, access blockers, or client-risk decisions.

## Target State

Every generated asset should be tied to a defined keyword target, a known page role, and a clear production destination. The output should be useful to a homeowner or operator first, then aligned to search intent and SEO structure.

The final AI generation packet must include:

- Client and domain context
- Target asset type
- Target URL or destination
- Primary target keyword
- Secondary target keywords
- Search intent and funnel stage
- Source workflow used
- Client preference notes
- Required service, location, and offer facts
- Draft or rewritten content
- Metadata and excerpt when applicable
- FAQ candidates when applicable
- Schema notes when applicable
- Internal link targets
- Image or creative prompt when applicable
- Keyword integration notes
- Automation status
- QA notes

## Required Inputs

Before generating content, collect or derive these inputs:

| Input | Owner | Notes |
|---|---|---|
| Approved keyword target | AI Agent / Koga | Required. Do not generate production content without a defined target keyword. |
| Secondary keywords | AI Agent / Koga | Used naturally in headings, body copy, FAQs, metadata, and supporting sections. |
| Client domain | AI Agent / Koga | Required for crawl context and internal links. |
| Asset type | AI Agent / Koga | Blog, service page, service area page, PR, GBP post, metadata, FAQ, or report copy. |
| Search intent | AI Agent / Koga | Informational, commercial, transactional, local, or mixed. |
| Client preferences | Human or AI Agent | Tone, topics to prioritize, services to emphasize, services to avoid, and approval constraints. |
| Service and market facts | Human or AI Agent | Required for service, location, price, warranty, and local claims. |
| Existing site content | AI Agent / Koga | Prevents duplicate content and supports internal links. |
| Source workflow | AI Agent / Koga | Blog process, optimization protocol, PR process, service page SOP, or service area SOP. |
| Brand guidelines | AI Agent / Koga | Required for style, creative direction, and visual prompts. |

## Data Sources and Tools

| Source | Used For |
|---|---|
| Process 1 Keyword Research | Primary and secondary keyword targets. |
| DataForSEO API | Keyword demand, SERP context, related queries, competitor angles, CPC, and competition. |
| Content Factory Engine | Production orchestration and content packet assembly. |
| n8n workflows | Automated research, routing, and production handoff where configured. |
| Google Search Console | Existing page/query opportunities when available. |
| Client onboarding notes | Client services, service areas, exclusions, and preferences. |
| Website crawl | Existing content, internal links, duplication checks, and page context. |
| Ground Control brand references | Brand and visual constraints for generated creative prompts. |
| Source-of-truth SOPs | Process-specific rules for blogs, service pages, service area pages, PRs, reports, and optimization. |

## Workflow

### 1. Identify the Production Asset

Classify what the AI Agent is generating:

- Blog article
- Service page
- Service area page
- Press release
- GBP post
- Email/newsletter copy
- Metadata
- FAQ block
- Schema-support copy
- Optimization rewrite
- Report narrative

Each asset must have a destination, owner process, and expected output format before generation begins.

### 2. Load the Source Workflow

Use the controlling SOP before generation:

| Asset | Required Workflow |
|---|---|
| Blog article | `BLOG-CREATION-PROCESS.md` and Process 04. |
| Blog optimization | `OPTIMIZATION-PROTOCOL.md`. |
| Service page | Process 02. |
| Service area page | Process 03. |
| Internal links | Process 05. |
| Press release | `Press_Release_Creation_Process.md` and PR support files. |
| SEO report copy | `seo/SEO_REPORT_PROTOCOL.md`. |

Do not generate from memory when a source workflow applies.

### 3. Confirm Keyword Targets

Every AI-generated content asset must actively target and integrate the defined keywords.

At minimum, identify:

- Primary keyword
- Secondary keywords
- Related questions
- Search intent
- Funnel stage
- Target page or asset destination
- Service or market being supported

Keyword integration rules:

- Use the primary keyword naturally in the title/H1 or opening when the asset type supports it.
- Use secondary keywords only where they fit the reader's intent.
- Include related questions in FAQ or supporting sections when useful.
- Match keywords to the asset's page role.
- Do not stuff keywords into every heading.
- Do not add city/service terms the client cannot truthfully support.
- Do not generate content for a keyword that belongs to a different page type.

### 4. Gather Context

Before drafting, the AI Agent gathers:

- Client services and service areas
- Existing page and blog context
- Internal link targets
- Competitor/SERP context when useful
- Client preference notes
- Brand and voice constraints
- Claims to avoid
- Required CTA or conversion path

If required facts are missing, the agent marks the item as an exception and either uses a documented assumption or stops generation when the risk is too high.

### 5. Generate the Content

The AI Agent produces the content in the required format for the destination process.

Generation standards:

- Lead with the answer or useful framing.
- Match the search intent quickly.
- Use natural keyword integration.
- Preserve client voice and service accuracy.
- Support the site's SEO silo structure.
- Add internal-link opportunities where the destination process requires them.
- Avoid generic filler.
- Avoid unsupported guarantees, prices, certifications, awards, locations, or project claims.
- Avoid visible prompt language, AI self-reference, workflow notes, or status labels.

### 6. Generate Metadata and Supporting Elements

When applicable, the AI Agent generates:

- SEO title
- Meta description
- Slug
- Excerpt
- FAQ block
- Schema notes
- Internal link plan
- CTA
- Image prompt
- Alt text
- Social/GBP/email repurposing notes

Metadata and supporting elements must reinforce the same keyword target as the main content.

### 7. Run Automated QA

Before a generated asset moves forward, verify:

- Primary keyword appears naturally in the correct places.
- Secondary keywords are integrated without stuffing.
- Content matches the assigned search intent.
- Service and location claims are accurate.
- Client preferences are reflected.
- Internal links support the correct silo.
- No duplicate or near-duplicate content issue is obvious.
- No prompt text, AI notes, or internal workflow language remains.
- CTA and next step are clear.
- Output format matches the destination process.

### 8. Handoff to Production

After QA, route the generated asset to the correct next step:

- Draft packet
- Staging packet
- CMS publishing packet
- Optimization packet
- PR upload packet
- GBP/email repurposing packet
- Exception queue

The handoff must include the target keywords and any exception notes.

## Automation Plan

### AI Agent Automates

- Pull keyword targets and search intent.
- Pull DataForSEO context when relevant.
- Crawl or summarize existing content context.
- Generate page, blog, PR, GBP, metadata, FAQ, and report copy.
- Integrate target keywords into titles, headings, body copy, FAQs, metadata, and supporting elements.
- Generate internal-link recommendations.
- Generate image prompts and alt text.
- Run duplicate, keyword, formatting, and workflow-artifact checks.
- Package the output for the production pipeline.

### Human Exception Handling

No routine human drafting gate remains in Process 06.

Humans handle only:

- Missing client facts the agent cannot safely infer.
- Sensitive legal, pricing, guarantee, certification, or reputation claims.
- Client-specific positioning that requires approval.
- Access or publishing blockers.
- Content that should not proceed because the keyword target or page type is wrong.

## Output Format

The AI generation packet should contain:

| Field | Description |
|---|---|
| Client | Client name/domain. |
| Process ID | `06`. |
| Asset Type | Blog, service page, service area page, PR, metadata, FAQ, GBP, email, or report copy. |
| Destination Process | Process receiving the generated asset. |
| Primary Keyword | Required main target. |
| Secondary Keywords | Supporting terms. |
| Search Intent | Informational, commercial, transactional, local, or mixed. |
| Funnel Stage | TOFU, MOFU, BOFU, or reporting/support. |
| Source Workflow | SOP or protocol followed. |
| Generated Content | Draft, rewrite, metadata, FAQ, or production-ready content. |
| Keyword Integration Notes | Where target keywords were used and why. |
| Internal Links | Suggested or applied internal links. |
| Image/Creative Notes | Prompt, alt text, and brand constraints when applicable. |
| Automation Status | Generated, QA passed, staged, published, optimized, exception review, blocked, or parked. |
| QA Notes | Checks passed, assumptions, or blockers. |

## Quality Checklist

- [ ] Source workflow was identified.
- [ ] Primary target keyword is defined.
- [ ] Secondary keywords are defined or intentionally omitted.
- [ ] Search intent is documented.
- [ ] Generated content matches the assigned asset type.
- [ ] Primary keyword is integrated naturally.
- [ ] Secondary keywords are used only where relevant.
- [ ] Client service and location claims are accurate.
- [ ] Client preferences are reflected.
- [ ] Internal links support the correct silo.
- [ ] Metadata/FAQ/schema support the same keyword target when applicable.
- [ ] No prompt text, AI notes, or workflow artifacts remain.
- [ ] Unsupported claims are removed or flagged.
- [ ] Output is routed to the correct production step.

## Completion Criteria

Process 06 is complete when:

1. The generated asset has a defined keyword target.
2. The output follows the controlling source workflow.
3. Target keywords are naturally integrated.
4. Automated QA has passed or blockers are documented.
5. The output is handed to the correct production pipeline step.
6. Any exception-review items are clearly isolated.

## Common Mistakes

- Generating content without a defined primary keyword.
- Mentioning keywords without matching search intent.
- Stuffing keywords into headings or metadata.
- Generating city/service claims the client cannot support.
- Creating content for the wrong page type.
- Ignoring the source workflow.
- Leaving prompt notes, AI self-reference, or internal status text in the output.
- Treating AI generation as complete before keyword integration QA passes.

## Source References

| Source | Relevant Rules |
|---|---|
| `BLOG-CREATION-PROCESS.md` | New blog generation, publication, image, metadata, and QA rules. |
| `OPTIMIZATION-PROTOCOL.md` | Post-optimization protocol and live-page verification. |
| `deliverables/on-page/01-keyword-research/README.md` | Required keyword targets and search intent. |
| `deliverables/on-page/02-service-pages/README.md` | Service page content generation rules. |
| `deliverables/on-page/03-service-area-pages/README.md` | Service area page generation and local-claim safeguards. |
| `deliverables/on-page/04-blog-content/README.md` | Blog Content Factory Engine phases. |
| `deliverables/on-page/05-internal-linking/README.md` | SEO silo and internal link rules. |
| DataForSEO API | Keyword, SERP, CPC, competition, and topic context. |

---

*Part of the [SEO Command Center](../../README.md) - Lawn & Land Marketing*

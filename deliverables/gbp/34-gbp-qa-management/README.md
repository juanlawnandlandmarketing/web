# Q&A Management

**Category:** GBP SEO
**Automation Readiness Score:** 6/10 - Partial automation possible
**Status:** SOP documented

---

## Purpose

Process 34 manages Google Business Profile and Google Maps question-and-answer content so prospects can find accurate, approved answers to common service, scheduling, service-area, pricing, and business-policy questions.

This process has changed. Google discontinued the My Business Q&A API on November 3, 2025, so this SOP does not treat Q&A as an API-publishable automation workflow anymore. Koga can still research, draft, audit, and track Q&A content, but live posting, answering, reporting, and correction must be verified manually in the current Google Maps / Business Profile experience.

This process covers:

- Candidate Q&A research.
- Client-approved seeded Q&A content.
- Public Q&A monitoring where the feature is visible.
- Manual answer posting when available and approved.
- Question/answer policy checks.
- Risk escalation for inaccurate, sensitive, or policy-violating public questions.
- Handoffs to services, products, weekly posts, reviews, website FAQ/schema, and client communication.

## Current State

Process 34 is represented in ClickUp by:

- `Q&As Submitted`
- `1. GBP Audit and Image Post`

Related ClickUp and SOP sources:

- `10. Pre Launch Website GBP Optimization`
- `11. Post Launch Website GBP Optimization`
- `Add "Services"`
- `Add "Products"`
- `FAQ Schema for blog post`
- Process 29 - GBP Profile Build & Completion
- Process 30 - GBP Categories
- Process 31 - Weekly GBP Posts
- Process 32 - Automated Review Replies
- Process 35 - GBP Link on Website
- Process 36 - GBP Attributes
- Process 02 - Service Pages
- Process 04 - Blog Content

ClickUp `Q&As Submitted` gives the legacy workflow:

- Publish 10 client-approved Q&As.
- Research Google People Also Ask.
- Use Gemini/AI prompts for additional question ideas.
- Generate answers in 3 sentences max.
- Send to Account Manager for client review.
- Ask each question via GBP interface.
- Immediately answer each one.

ClickUp also links this Custom GPT:

- `https://chatgpt.com/g/g-68674ec66cfc81918fe81b1deca58274-gbp-q-a-generator-assistant`

Use the Custom GPT as a drafting aid only. The final Q&A must be checked against the client's real services, Google policy, and the current Google UI state.

## Target State

Every Q&A workflow should produce:

1. Current Q&A feature availability status for the client/profile.
2. Existing visible public Q&A inventory when available.
3. Candidate Q&A list based on real services, customers, and search questions.
4. Client-approved final Q&A set.
5. Manual posting/answering status or documented platform blocker.
6. Screenshot or tracker proof of visible/pending/blocked state.
7. Escalation notes for inaccurate, sensitive, spammy, or policy-risk questions.
8. Handoffs to website FAQ, service pages, blog, posts, reviews, products, or services when the Q&A exposes content gaps.

## Automation Score

**6/10 - Partial automation possible**

Koga can automate useful prep:

- Research People Also Ask and common service questions.
- Generate candidate Q&A lists.
- Compare questions against service pages, products, services, reviews, and blogs.
- Draft concise answers in the approved voice.
- Flag risky claims, pricing promises, warranty language, licensing claims, private details, or unsupported service-area statements.
- Build approval packets and tracking sheets.
- Monitor known profile surfaces manually with screenshots when browser access exists.
- Route repeated Q&A themes into website FAQs, blog content, GBP posts, and service-page updates.

The score is no higher because the Q&A API was discontinued, the Q&A experience is changing, and availability varies by country, region, device, and surface. Live posting/answering and final verification require human or browser-based manual confirmation.

## Training Video

No applicable Loom video for Process 34 was found in ClickUp list `901111072650`.

Checked sources:

- `Q&As Submitted`
- `1. GBP Audit and Image Post`
- `FAQ Schema for blog post`
- `Add "Services"`
- `Add "Products"`
- Related Q&A, QA, question, answer, FAQ, People Also Ask, Gemini, GBP, profile, and audit task names/descriptions
- Task comments
- Attachments
- Custom fields
- Checklists
- Rich embed payloads
- Full-list Loom sweep across ClickUp list `901111072650`

Decision: include the Custom GPT link from ClickUp as a drafting tool, not as a training video. Do not include unrelated reporting, Looker Studio, citation-only, Whitespark-only, blog, PageSpeed, Rank Math, schema, mobile, robots, canonical, backlink, Signal GeNeSYS, GBP post, review, or image-compression videos in this SOP.

## Source References

Use ClickUp for internal operating context and Google documentation for current platform constraints.

| Source | Role in Process 34 |
|---|---|
| [`Q&As Submitted`](https://app.clickup.com/t/868ehbhzm) | Primary legacy Q&A workflow: research, draft, approve, post, answer. |
| [`1. GBP Audit and Image Post`](https://app.clickup.com/t/868eegeb8) | Recurring GBP audit surface for checking public Q&A availability/issues. |
| [`FAQ Schema for blog post`](https://app.clickup.com/t/868eh11pb) | Website FAQ/schema handoff when Q&A themes should be reused on-site. |
| [`Add "Services"`](https://app.clickup.com/t/868ehbhz7) | Service source-of-truth for accurate Q&A answers. |
| [`Add "Products"`](https://app.clickup.com/t/868ehbhz3) | Product/service content source for Q&A ideas and consistency. |
| [GBP Q&A Generator Assistant](https://chatgpt.com/g/g-68674ec66cfc81918fe81b1deca58274-gbp-q-a-generator-assistant) | ClickUp-linked drafting aid for candidate questions and answers. |
| [Google: Q&A API change log](https://developers.google.com/my-business/content/qanda/change-log) | Official confirmation that the My Business Q&A API was discontinued on November 3, 2025. |
| [Google: My Business Q&A API reference](https://developers.google.com/my-business/reference/qanda/rest) | Historical API context; do not use for live automation after discontinuation. |
| [Google Maps: Answer questions about a place](https://support.google.com/maps/answer/7421661) | Current Maps help for answering questions where available. |
| [Google Maps user-generated content policy](https://support.google.com/contributionpolicy/answer/7422880) | Policy rules for questions, answers, and other Maps contributions. |
| [Google Business Profile APIs overview](https://support.google.com/business/answer/6333473) | API context and high-level business-profile use cases. |
| `deliverables/gbp/29-gbp-profile-build/README.md` | GBP access, ownership, and sensitive profile guardrails. |
| `deliverables/gbp/30-gbp-categories/README.md` | Category/service fit rules for Q&A accuracy. |
| `deliverables/gbp/31-gbp-weekly-posts/README.md` | Repurpose useful Q&A into posts. |
| `deliverables/gbp/32-gbp-review-replies/README.md` | Review-derived customer concerns and escalation pattern. |

## Platform Reality Check

Before doing Q&A work, confirm the current state:

- Is Q&A visible for this profile in Google Search, Google Maps, mobile, desktop, or none?
- Can the account currently ask or answer questions from the available interface?
- Are existing Q&As visible?
- Are questions/answers editable or removable from the current account?
- Is the work a one-time seeded Q&A setup, a monitoring check, or a content handoff because direct Q&A is unavailable?

Do not promise API posting. The Q&A API was discontinued on November 3, 2025.

## Q&A Rules to Respect

Important rules:

- Q&A content is public and should be client-approved.
- Answers must be truthful and match the client's actual services.
- Do not invent service areas, pricing, warranties, licensing, emergency availability, financing, or guarantees.
- Do not answer legal, safety, complaint, employee, refund, insurance, or damage questions without human approval.
- Do not include private customer details.
- Do not keyword-stuff city/service phrases.
- Do not post questions that look fake, spammy, promotional, or manipulative.
- Do not use Q&A to hide or bypass profile limitations.
- Do not post duplicate Q&As across every client.
- Do not rely on discontinued API workflows.
- If the Q&A feature is unavailable, route the content to website FAQ/schema, service pages, posts, or client support materials.

## Question Types

Use this mix for candidate Q&A.

| Question Type | Good Use | Example Direction |
|---|---|---|
| Service availability | Clarifies whether the client offers a core service. | "Do you offer weekly lawn mowing?" |
| Service area | Clarifies cities/areas served. | "Do you provide landscaping in [city]?" |
| Scheduling | Sets realistic expectations. | "How far ahead should I schedule spring cleanup?" |
| Estimates | Explains process without promising pricing. | "Do you provide estimates for hardscape projects?" |
| Seasonal work | Matches current demand. | "When should I schedule fall cleanup?" |
| Materials/process | Educates customers. | "What type of mulch do you install?" |
| Residential/commercial | Clarifies customer fit. | "Do you work with commercial properties?" |
| Maintenance plans | Explains recurring service options. | "Do you offer recurring lawn care plans?" |

Avoid Q&As about:

- Exact pricing unless approved.
- Discounts or promotions unless active and approved.
- Licensing/insurance unless verified.
- Emergency availability unless verified.
- Claims like "best," "#1," or guaranteed results.
- Sensitive disputes, refunds, complaints, or personnel.

## Workflow

### 1. Confirm Scope

Start from `Q&As Submitted` or `1. GBP Audit and Image Post`.

Record:

- Client name.
- GBP profile/location.
- Current Q&A availability state.
- Whether this is setup, refresh, monitoring, or content repurposing.
- Required number of questions.
- Approval owner.
- Posting owner if manual posting is possible.
- Source documents used.

If Q&A is not available on the current profile/surface, document the blocker and route content to on-site FAQ/schema or posts instead.

### 2. Gather Business Facts

Collect:

- Approved service list.
- Service-area list.
- Primary and secondary categories.
- GBP services/products.
- Website service pages.
- Existing blogs/FAQs.
- Recent reviews and customer questions.
- Client onboarding notes.
- Known scheduling, estimate, warranty, and pricing policies.

Do not draft answers from search demand alone. The answer must match the client.

### 3. Research Questions

Use:

- Google People Also Ask.
- Client service pages.
- Blog topics.
- Recent review themes.
- Sales/support FAQs.
- Competitor/service-page FAQs.
- ClickUp-linked Custom GPT as a drafting aid.

Build a raw question list, then remove:

- Duplicates.
- Questions about services the client does not sell.
- Legal/insurance/licensing questions without verified facts.
- Overly promotional questions.
- Questions that are better handled as website FAQs or posts.

### 4. Draft Answers

Answer rules from ClickUp:

- Keep answers to 3 sentences max.
- Use plain language.
- Be direct.
- Match client-approved services.
- Keep tone professional and helpful.

Additional rules:

- Mention the business naturally only when helpful.
- Use "contact us" or "request an estimate" only if that action is available.
- Avoid exact prices unless approved.
- Avoid guaranteeing timelines or outcomes.
- Avoid repeating the same sentence structure in every answer.

### 5. Build Approval Packet

Send to Account Manager/client for review before posting.

Approval packet should include:

| Field | Notes |
|---|---|
| Question | Final public wording. |
| Answer | Final proposed public answer. |
| Source | PAA, service page, review, client FAQ, or AI draft. |
| Service/category supported | Which real service supports the answer. |
| Risk notes | Pricing, availability, legal, service-area, or policy risk. |
| Publish recommendation | Post manually, hold, revise, or use on website instead. |

Do not post unapproved Q&As.

### 6. Manual Post/Answer Path

If Q&A is available and approved:

1. Open the correct Google Business Profile or Google Maps place.
2. Confirm the profile/location is correct.
3. Ask the approved question using the available interface.
4. Immediately answer it with the approved answer where the interface allows.
5. Verify the Q&A appears or is pending.
6. Screenshot or document proof.
7. Update ClickUp/tracker.

If the interface blocks posting, changes the feature, or hides Q&A:

- Stop.
- Document the blocker.
- Do not keep trying from random accounts.
- Route the approved content to website FAQ/schema, GBP posts, or service content.

### 7. Monitor Public Q&A

During recurring `GBP Audit and Image Post`:

Check:

- New public questions.
- Incorrect public answers.
- Spam, abuse, or policy-violating Q&As.
- Customer questions that should be answered by the business.
- Questions that expose service/content gaps.

For each new/risky item:

- Screenshot or copy the question/answer.
- Classify risk.
- Draft a recommended answer or report action.
- Get approval before public response.

### 8. Handle Risky Q&A

Escalate when Q&A includes:

- Complaints or accusations.
- Employee names or private details.
- Refund, warranty, insurance, injury, legal, or damage topics.
- Incorrect pricing or service claims.
- Spam, profanity, harassment, discrimination, or fake content.
- Questions about services the client does not provide.

Use Google's report path for content that appears to violate Maps UGC policy. Do not engage in public arguments.

### 9. Repurpose When Direct Q&A Is Unavailable

If Google Q&A is unavailable or unstable, preserve the value:

- Add approved Q&As to website FAQ sections.
- Add FAQ schema where appropriate.
- Turn Q&A themes into GBP posts.
- Use them in service-page updates.
- Use them for blog briefs.
- Feed repeated questions into client support/sales materials.

The goal is still useful customer answers, even if the old Q&A surface is gone.

## Standard Output Format

Use this structure for ClickUp updates, approval packets, or trackers:

```json
{
  "process": "34 - Q&A Management",
  "client": "Client Name",
  "clickup_source": "Q&As Submitted",
  "profile": "Google Business Profile location",
  "qa_availability": "Visible on Google Maps mobile; no API available",
  "question": "Do you offer weekly lawn mowing?",
  "answer": "Yes. Client Name offers recurring lawn mowing for homeowners in approved service areas. Request an estimate to confirm availability for your property.",
  "source": "People Also Ask + service page",
  "approval_status": "Approved by Account Manager",
  "publish_status": "Posted manually / pending / blocked / routed to website FAQ",
  "proof": "Screenshot or tracker note",
  "training_video": "No applicable Loom found in ClickUp list 901111072650",
  "handoffs": [
    "Add to website FAQ",
    "Use as future GBP post topic"
  ]
}
```

## QA Checklist

- [ ] ClickUp `Q&As Submitted` checked.
- [ ] `1. GBP Audit and Image Post` checked when this is recurring monitoring.
- [ ] Current Q&A availability verified on live Google surface.
- [ ] Q&A API discontinuation accounted for; no API publishing assumed.
- [ ] Approved service list reviewed.
- [ ] Service areas reviewed.
- [ ] GBP categories/services/products reviewed.
- [ ] People Also Ask or customer-question research completed.
- [ ] Custom GPT output reviewed as draft only.
- [ ] Duplicate or bad-fit questions removed.
- [ ] Answers are 3 sentences max.
- [ ] Answers avoid unsupported pricing, warranty, legal, or service-area claims.
- [ ] Human approval collected before public posting.
- [ ] Correct profile/location confirmed before manual posting.
- [ ] Public/pending/blocked state documented.
- [ ] Risky public Q&A escalated.
- [ ] Inappropriate content routed to Google report path when needed.
- [ ] Approved Q&A content handed to website FAQ/schema or posts if direct Q&A is unavailable.
- [ ] ClickUp/tracker updated with proof and final status.

## Completion Criteria

Process 34 is complete only when:

- Q&A feature availability is checked and documented.
- Candidate Q&As are based on real client facts.
- Final Q&As are approved by the Account Manager/client.
- Manual posting/answering is completed where available, or the platform blocker is documented.
- New/risky public Q&A is answered, escalated, or reported appropriately.
- Approved Q&A content is repurposed to website FAQ/schema/posts when direct Q&A is unavailable.
- ClickUp or the tracker contains proof and final status.

## Common Mistakes

- Assuming the discontinued Q&A API still works.
- Posting Q&As without client approval.
- Asking fake-looking promotional questions.
- Writing answers longer than needed.
- Making pricing, warranty, licensing, or service-area claims without verification.
- Posting to the wrong profile.
- Ignoring that Q&A visibility varies by region/device/surface.
- Treating AI-generated questions as final.
- Failing to repurpose approved Q&A content when the Google Q&A surface is unavailable.

## Internal Handoffs

| Finding | Handoff |
|---|---|
| GBP access/profile issue | Process 29 - GBP Profile Build & Completion |
| Q&A conflicts with services/categories | Process 30 - GBP Categories / services audit |
| Q&A theme fits weekly profile update | Process 31 - Weekly GBP Posts |
| Q&A comes from review theme | Process 32 - Automated Review Replies |
| Need correct GBP/review/profile link | Process 35 - GBP Link on Website |
| Attributes/service details look outdated | Process 36 - GBP Attributes |
| FAQ should live on service page | Process 02 - Service Pages |
| FAQ should become blog/support content | Process 04 - Blog Content |
| FAQ schema needed | `FAQ Schema for blog post` / schema workflow |

## References

| Reference | Notes |
|---|---|
| Google Q&A API change log | Official discontinuation notice: Q&A API discontinued November 3, 2025. |
| Google My Business Q&A API reference | Historical API context only; do not use for current automation. |
| Google Maps answer questions help | Current Maps help for answering place questions where available. |
| Google Maps UGC policy | Policy context for public questions and answers. |
| Google Business Profile API overview | High-level API context; Q&A requires special caution due discontinuation. |
| ClickUp `Q&As Submitted` | Internal Q&A generation and approval workflow. |
| ClickUp Custom GPT | Drafting aid for candidate Q&As. |
| Process 29 | GBP access and profile guardrails. |
| Process 31 | GBP post repurposing. |

---

*Part of the [SEO Command Center](../../README.md) - Lawn & Land Marketing*

# Weekly GBP Posts

**Category:** GBP SEO
**Automation Readiness Score:** 8/10 - Highly automatable
**Status:** SOP documented

---

## Purpose

Process 31 creates, schedules, publishes, and verifies Google Business Profile posts so each active SEO client has timely profile updates that support trust, seasonal demand, service awareness, and conversion paths.

This process covers:

- Weekly GBP update posts.
- Seasonal and service-focused post calendars.
- Offer and event posts when approved.
- Post images or videos.
- Call-to-action links.
- Post scheduling and recurrence.
- Post approval, publishing, and status checks.
- Rejection cleanup and human escalation.
- Handoffs to GBP photos, services, products, Q&A, blog, press release, and review workflows.

## Current State

Process 31 is represented in ClickUp by:

- `1. GBP Audit and Image Post`

Related ClickUp and SOP sources:

- `10. Pre Launch Website GBP Optimization`
- `11. Post Launch Website GBP Optimization`
- `Additional Images`
- `Cover Photo`
- `Add "Services"`
- `Add "Products"`
- `Services audit`
- `Updating Service Descriptions`
- `Q&As Submitted`
- Process 29 - GBP Profile Build & Completion
- Process 30 - GBP Categories
- Process 33 - GBP Photo Management
- Process 34 - Q&A Management
- Process 35 - GBP Link on Website
- Process 36 - GBP Attributes
- Process 04 - Blog Content
- Process 12 - Press Releases

ClickUp currently exposes the task name but no detailed description, comments, checklists, attachments, or Loom for this exact process. This SOP turns the weekly GBP post task into a repeatable workflow with source checks, content rules, approval gates, publishing QA, and automation boundaries.

## Target State

Every weekly GBP post run should produce:

1. Client/post calendar source.
2. Selected post theme and post type.
3. Approved service, season, offer, event, or update angle.
4. Post copy with no phone stuffing or unsupported claims.
5. Approved image/video asset or documented asset blocker.
6. CTA type and URL when used.
7. Scheduled or published post record.
8. Live/pending/not-approved status check.
9. Screenshot, post URL, or dashboard note proving completion.
10. Rejection/blocker log and handoff when needed.

## Automation Score

**8/10 - Highly automatable**

Koga can automate most of the process:

- Build monthly/seasonal GBP post calendars.
- Draft weekly post copy from approved services, blogs, press releases, service pages, and seasonal demand.
- Generate structured post queues with topic type, copy, media, CTA, target URL, and schedule.
- Check for phone numbers, prohibited content patterns, unsupported offers, duplicate posts, missing URLs, and weak CTAs.
- Prepare image prompts or select approved client images when a source library exists.
- Use the Business Profile API to create, schedule, list, patch, delete, and inspect post state when approved OAuth access exists.
- Verify whether posts are live, pending, or not approved.
- Summarize results back into ClickUp.

The score is not 10/10 because humans must approve unusual offers, discounts, sensitive claims, client-specific promotions, legal/compliance language, and any content that could misrepresent services. GBP access, OAuth setup, image rights, post rejection, and profile verification state can also require manual handling.

## Training Video

No applicable Loom video for Process 31 was found in ClickUp list `901111072650`.

Checked sources:

- `1. GBP Audit and Image Post`
- `10. Pre Launch Website GBP Optimization`
- `11. Post Launch Website GBP Optimization`
- `Additional Images`
- `Cover Photo`
- `Add "Services"`
- `Add "Products"`
- `Services audit`
- `Updating Service Descriptions`
- `Q&As Submitted`
- Related GBP, post, image, profile, service, update, offer, event, photo, and audit task names/descriptions
- Task comments
- Attachments
- Custom fields
- Checklists
- Rich embed payloads
- Full-list Loom sweep across ClickUp list `901111072650`

Decision: do not include unrelated reporting, Looker Studio, citation-only, Whitespark-only, blog, PageSpeed, Rank Math, schema, mobile, robots, canonical, backlink, Signal GeNeSYS, or old Imagify videos in this SOP.

## Source References

Use ClickUp for internal operating context and Google Business Profile documentation for post rules.

| Source | Role in Process 31 |
|---|---|
| [`1. GBP Audit and Image Post`](https://app.clickup.com/t/868eegeb8) | Primary weekly fulfillment task. |
| [`Additional Images`](https://app.clickup.com/t/868ehbhy8) | Client image source and image rejection context. |
| [`Cover Photo`](https://app.clickup.com/t/868ehbhy2) | Photo quality/source guardrails. |
| [`Add "Services"`](https://app.clickup.com/t/868ehbhz7) | Service list source for post themes. |
| [`Add "Products"`](https://app.clickup.com/t/868ehbhz3) | Product/service-style GBP content source. |
| [`Q&As Submitted`](https://app.clickup.com/t/868ehbhzm) | FAQ and customer-question angle source. |
| [`Services audit`](https://app.clickup.com/t/868eha50a) | Ongoing service accuracy check. |
| [`Updating Service Descriptions`](https://app.clickup.com/t/868ehagx2) | Service copy source and handoff. |
| [Google: Create & manage posts on your Business Profile](https://support.google.com/business/answer/7342169) | Official post types, scheduling, recurrence, display locations, and status guidance. |
| [Google: Business Profile photos & videos policy and posts content policy](https://support.google.com/business/answer/7213077) | Post and media policy, including phone-number restrictions. |
| [Google: Manage your Business Profile photos & videos](https://support.google.com/business/answer/6103862) | Photo/video requirements and upload context. |
| [Google Business Profile API: LocalPost resource](https://developers.google.com/my-business/reference/rest/v4/accounts.locations.localPosts) | API fields for summary, CTA, schedule, media, topic type, and state. |
| [Google Business Profile API: Create local post](https://developers.google.com/my-business/reference/rest/v4/accounts.locations.localPosts/create) | API create endpoint and OAuth scope requirements. |
| [Google Business Profile API: Create Posts on Google](https://developers.google.com/my-business/content/posts-data) | API examples for event, CTA, offer, edit, and delete flows. |
| `deliverables/gbp/29-gbp-profile-build/README.md` | GBP access, profile completion, and sensitive edit guardrails. |
| `deliverables/gbp/30-gbp-categories/README.md` | Category/service fit rules for post themes. |
| `deliverables/gbp/33-gbp-photo-management/README.md` | Media sourcing, upload, and rejection handoff. |
| `deliverables/on-page/04-blog-content/README.md` | Blog-to-GBP post repurposing. |
| `deliverables/off-page/12-press-releases/README.md` | Press-release-to-GBP post repurposing. |

## Post Rules to Respect

Important rules:

- Posts may be updates, offers, or events.
- Updates can include a description, photo/video, and an action button.
- Offers require a title and date/time range and may include description, photo/video, coupon code, link, and terms.
- Events require a title and start/end dates and may include a description, photo/video, and action button.
- Posts older than 6 months are archived unless a date range is set.
- Posts can be scheduled and can be set to repeat from the Business Profile UI.
- The API supports scheduled posts through `scheduledTime`.
- The API supports `STANDARD`, `EVENT`, `OFFER`, and limited `ALERT` topic types.
- Product posts cannot be created through the Business Profile API.
- Post descriptions must not include phone numbers. Use the profile phone or an approved CTA instead.
- Posted text, images, and videos must comply with Google policies and applicable law.
- Hotel profiles have extra restrictions around offers, deals, promotions, discounts, and related links.
- Post status must be checked after publishing: live, pending, or not approved.

## Content Strategy

Weekly posts should be useful and specific. Do not publish filler just to keep the profile active.

Recommended post themes:

| Theme | Use When | Example Direction |
|---|---|---|
| Seasonal service | Demand is tied to the current month or weather. | Spring cleanup, summer mowing, fall leaf cleanup, winter planning. |
| Core service education | A priority service needs visibility. | Explain when to schedule mulch, lawn care, irrigation, pruning, hardscape repair. |
| Recent blog repurpose | A blog was recently published. | Summarize the blog and link to it with `Learn more`. |
| Press release repurpose | A PR was recently published. | Turn the PR angle into a short local update. |
| Project/photo proof | Approved real client images exist. | Show completed lawn, landscape, bed, hardscape, or cleanup work. |
| Offer | A real approved promotion exists. | Include dates, terms, and approved offer language. |
| Event | The client has a real event, open house, or community activity. | Include title, dates, and CTA. |
| FAQ/objection | Common customer question keeps coming up. | Answer one question in plain language. |

Avoid:

- Generic "we do landscaping" posts.
- Keyword stuffing.
- City stuffing.
- Phone numbers in the post copy.
- Unsupported discounts or urgency.
- Claims the client has not approved.
- Stock-looking imagery when real client photos are available.
- Repeating the same post across every client without local/service context.

## Workflow

### 1. Confirm Weekly Scope

Start from `1. GBP Audit and Image Post`.

Record:

- Client name.
- GBP profile/location.
- Week or scheduled publish date.
- Package/cadence.
- Whether the post is draft-only, scheduled, or live-publish approved.
- Who approves offers, promotions, or unusual claims.
- Whether API publishing is authorized or manual publishing is required.

If GBP access or OAuth is missing, prepare the post packet and mark publishing blocked.

### 2. Gather Inputs

Collect:

- Approved service list.
- Current priority services.
- Client service-area focus.
- Current season/month.
- Recent blog posts.
- Recent press releases.
- Approved photos/videos.
- Current GBP category and services.
- Current live or recently published GBP posts.
- Website URLs for CTAs.
- Any client promotion, event, or announcement.

Use Process 30 categories and Process 29 profile data to avoid posting about services the client does not actually sell or want more of.

### 3. Choose Post Type

Default to `Update` / API `STANDARD` unless the content truly fits another type.

| Post Type | Use For | Human Approval Needed |
|---|---|---|
| Update / `STANDARD` | Weekly service, seasonal, education, blog, PR, or photo update. | Needed for unusual claims or client-specific details. |
| Offer / `OFFER` | Real discount, promotion, coupon, or limited deal. | Always required before publishing. |
| Event / `EVENT` | Real event with clear dates. | Required if public event details or client commitments are involved. |
| Alert / `ALERT` | High-priority timely announcement where available. | Always required; do not use casually. |

Do not use `OFFER` to make normal services look promotional.

### 4. Draft Copy

Write concise, local, customer-facing copy.

Copy requirements:

- Lead with the service, season, problem, or result.
- Tie the post to one real customer need.
- Mention the client naturally.
- Use clear action language.
- Keep claims specific but supportable.
- Avoid phone numbers in the description.
- Avoid exaggerated urgency.
- Avoid saying the company is "best," "#1," "guaranteed," or similar unless approved and supportable.
- Avoid boilerplate copied across clients.

Good structure:

1. Timely hook.
2. Useful detail.
3. Service/result connection.
4. CTA.

### 5. Select CTA and URL

Use the CTA that matches the post intent.

| CTA | Use When |
|---|---|
| `LEARN_MORE` | Blog, service education, press release, project story, or general update. |
| `BOOK` | Appointment/scheduling pages. |
| `SIGN_UP` | Newsletter, event registration, or approved sign-up action. |
| `GET_OFFER` | Approved offer pages. |
| `CALL` | When the intended action is a call and the post/platform supports it. |

URL rules:

- Use the most relevant live page, not always the homepage.
- Prefer service page, blog post, PR/media-room page, contact page, or offer page.
- Confirm the URL loads and is not a staging/404/redirect mess.
- Use UTM tracking when the tracking standard exists for the client.
- Do not paste phone numbers into URLs or post descriptions.

### 6. Select Media

Preferred media order:

1. Approved real client photo.
2. Approved recent project photo.
3. Approved service/team/equipment photo.
4. Generated or stock-style image only when explicitly allowed and clearly appropriate.

Media rules:

- Avoid photos with phone numbers embedded.
- Avoid watermarks, stretched logos, tiny text, or heavy graphic overlays.
- Avoid low-quality, blurry, irrelevant, or misleading images.
- Match the image to the service/theme.
- If an image is rejected, document the rejection and hand off to Process 33.

### 7. QA Before Publish

Check:

- Post type matches content.
- No phone number in post description.
- Offer/event dates are present when required.
- Offer terms are clear enough when an offer is used.
- CTA URL works.
- Image/video is approved and policy-safe.
- Service/category fit is accurate.
- No unsupported claims.
- No duplicate of recent GBP post.
- Client name, city, and service references are correct.
- Human approval exists where required.

### 8. Publish or Schedule

If using the Business Profile UI:

1. Open the client's Business Profile.
2. Select Posts / Add post.
3. Choose Update, Offer, or Event.
4. Add copy, media, CTA, link, and dates.
5. Schedule or publish.
6. Save proof of scheduled/live status.

If using the API:

1. Confirm OAuth access and location ID.
2. Build the `LocalPost` payload.
3. Use `scheduledTime` when scheduling ahead.
4. Use `topicType` of `STANDARD`, `EVENT`, or `OFFER`.
5. Include `media.sourceUrl` only for accessible media URLs.
6. Create the post.
7. Store returned post ID, `state`, and `searchUrl` when available.

### 9. Verify Status

After publishing or scheduling, verify:

- Post appears as scheduled, pending, live, or not approved.
- The post content matches the approved packet.
- CTA button points to the right URL.
- Media displays or is pending processing.
- No policy rejection is shown.
- ClickUp has the post proof and status.

If status is `pending`, note the pending state and recheck later.

If status is `not approved`:

- Do not keep retrying blindly.
- Review Google policy reason if visible.
- Remove phone numbers, risky claims, prohibited wording, rejected media, or unsupported offer language.
- Escalate if the rejection reason is unclear.
- Document the final resolution.

### 10. Track and Reuse

Maintain a simple post log:

| Field | Notes |
|---|---|
| Client | Client/profile name. |
| Week | Publish week. |
| Post type | Update, offer, event, alert. |
| Theme | Service, season, blog, PR, project, FAQ, offer, event. |
| Copy | Final approved text. |
| Media | File/link/source. |
| CTA | CTA type and URL. |
| Schedule/live date | Date and time. |
| Status | Scheduled, live, pending, rejected, blocked. |
| Proof | Screenshot, post ID, or search URL. |
| Handoff | Image, service, product, Q&A, blog, PR, or GBP issue. |

Reuse the strategy, not the exact words. If a theme repeats, rewrite it around the current season, client service mix, and latest proof.

## Standard Output Format

Use this structure for ClickUp updates, post queues, or handoff docs:

```json
{
  "process": "31 - Weekly GBP Posts",
  "client": "Client Name",
  "week": "2026-06-22",
  "clickup_source": "1. GBP Audit and Image Post",
  "post_type": "STANDARD",
  "theme": "Seasonal service education",
  "summary": "Summer lawn stress can show up fast. If your grass is thinning, browning, or growing unevenly, a maintenance check can help catch watering, mowing, and soil issues before they spread.",
  "media": {
    "source": "Approved client photo",
    "url_or_file": "client-photo.jpg"
  },
  "call_to_action": {
    "type": "LEARN_MORE",
    "url": "https://example.com/lawn-care/"
  },
  "scheduled_time": "2026-06-24T14:00:00Z",
  "approval_required": false,
  "status": "Scheduled",
  "proof": "Screenshot or API post ID",
  "training_video": "No applicable Loom found in ClickUp list 901111072650",
  "handoffs": []
}
```

## QA Checklist

- [ ] ClickUp `1. GBP Audit and Image Post` checked.
- [ ] Process 29 profile/access context checked.
- [ ] Process 30 category/service fit checked.
- [ ] Approved service list reviewed.
- [ ] Current season/month considered.
- [ ] Recent blog/PR content checked for reuse.
- [ ] Approved image/video source checked.
- [ ] Recent GBP posts checked for duplicates.
- [ ] Post type selected correctly.
- [ ] Copy contains no phone number.
- [ ] Copy avoids unsupported claims.
- [ ] Offer/event has required title/date fields if used.
- [ ] CTA type matches user action.
- [ ] CTA URL loads and is relevant.
- [ ] Media follows Google policy and client approval rules.
- [ ] Human approval collected for offers, discounts, sensitive claims, or unusual promotions.
- [ ] Post is scheduled or published.
- [ ] Status checked after publish/schedule.
- [ ] Pending/rejected posts are documented and rechecked/escalated.
- [ ] ClickUp contains proof, final copy, URL, media note, and status.
- [ ] Handoffs are routed to photos, services, products, Q&A, blog, PR, or profile cleanup as needed.

## Completion Criteria

Process 31 is complete only when:

- A weekly GBP post is drafted from approved client/service context.
- The post type, copy, media, CTA, and URL pass QA.
- Required human approvals are documented.
- The post is scheduled, published, or clearly blocked by access/media/approval.
- The final post state is verified as scheduled, live, pending, rejected, or blocked.
- Rejections or blockers have a next action and owner.
- ClickUp has proof and final status.

## Common Mistakes

- Adding a phone number inside the post description.
- Publishing the same generic post for every client.
- Using an offer post for a normal service with no real promotion.
- Forgetting required dates for offers or events.
- Linking every post to the homepage instead of the relevant page.
- Using stock-looking or unrelated images when approved client images exist.
- Posting about services that are not in the approved service list.
- Ignoring current category/service fit.
- Closing the task while the post is still pending or rejected.
- Forgetting to document the post URL, screenshot, or API ID.

## Internal Handoffs

| Finding | Handoff |
|---|---|
| GBP access or profile issue | Process 29 - GBP Profile Build & Completion |
| Post theme conflicts with categories/services | Process 30 - GBP Categories |
| No approved media or media rejected | Process 33 - GBP Photo Management |
| Public questions should become future posts | Process 34 - Q&A Management |
| CTA needs correct GBP/review/profile link | Process 35 - GBP Link on Website |
| Attributes or service facts look outdated | Process 36 - GBP Attributes |
| Blog can be repurposed into GBP post | Process 04 - Blog Content |
| Press release can be repurposed into GBP post | Process 12 - Press Releases |
| Service page missing or weak | Process 02 - Service Pages |
| Service-area claim needs support | Process 03 - Service Area Pages |

## References

| Reference | Notes |
|---|---|
| Google create/manage posts docs | Official post type, scheduling, recurrence, and status guidance. |
| Google posts content policy | Phone stuffing and content/media compliance rules. |
| Google Business Profile LocalPost API | Fields for summary, CTA, schedule, media, topic type, and state. |
| Google create local post API | Create endpoint and OAuth scope requirements. |
| ClickUp `1. GBP Audit and Image Post` | Weekly fulfillment source. |
| Process 29 | Profile access and sensitive GBP guardrails. |
| Process 30 | Category and service fit rules. |
| Process 33 | Media sourcing and photo rejection workflow. |

---

*Part of the [SEO Command Center](../../README.md) - Lawn & Land Marketing*

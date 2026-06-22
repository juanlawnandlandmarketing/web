# Automated Review Replies

**Category:** GBP SEO
**Automation Readiness Score:** 9/10 - Near-full automation
**Status:** SOP documented

---

## Purpose

Process 32 monitors Google Business Profile reviews, drafts useful owner replies, publishes low-risk approved replies, and routes sensitive reviews to a human before anything public is posted.

The goal is not to spray templated "thanks for the review" responses. The goal is fast, professional, client-specific review management that protects the client's reputation, avoids policy problems, and creates a clean record of which reviews were answered, escalated, or intentionally left pending.

This process covers:

- Review monitoring.
- Review classification by rating, sentiment, and risk.
- Positive review reply generation.
- Neutral or negative review escalation.
- Owner reply publishing through GBP UI or API when authorized.
- Reply editing and deletion when needed.
- Review reply status tracking.
- Sensitive review handling.
- Review-generation handoffs.
- Client/account-manager escalation notes.

## Current State

Process 32 is represented in ClickUp by:

- `Review check`
- `3. Review Generation Strategy`

Related ClickUp and SOP sources:

- `4. Clients Reviews Integration`
- `Review Generation tracker`
- `1. GBP Audit and Image Post`
- `10. Pre Launch Website GBP Optimization`
- `11. Post Launch Website GBP Optimization`
- `Q&As Submitted`
- Process 29 - GBP Profile Build & Completion
- Process 31 - Weekly GBP Posts
- Process 34 - Q&A Management
- Process 35 - GBP Link on Website

ClickUp currently exposes the review task names but no detailed task body, checklist, attachments, or Loom for this exact process. The `Review check` task includes a Google Sheet bookmark:

- `https://docs.google.com/spreadsheets/d/103LbRhqq1MWh6JWT5DpZv-3KnZT4v6nTySc_ujSCQEQ/edit`

Use that sheet as the tracker when available, but do not assume it replaces live GBP verification. The review reply must match the real current review state.

## Target State

Every active SEO client should have a review reply workflow that produces:

1. Current review inventory.
2. New/unanswered review list.
3. Rating and sentiment classification.
4. Risk classification.
5. Draft owner reply.
6. Human approval status when required.
7. Published or blocked reply status.
8. API reply ID/status or GBP screenshot proof.
9. Escalation notes for sensitive reviews.
10. Tracker update with final status.

## Automation Score

**9/10 - Near-full automation**

Koga can automate most of the process:

- Pull reviews through the Business Profile API when authorized.
- Detect unanswered reviews.
- Classify star rating, sentiment, urgency, and risk.
- Draft personalized replies from the review text, client name, service context, and response rules.
- Auto-approve or auto-publish low-risk positive replies when the client/workflow allows it.
- Route 1-3 star reviews, complaints, legal threats, refund requests, employee callouts, safety issues, spam, fake-review claims, and profanity to a human.
- Track review reply status and reply timestamps.
- Delete or replace an owner reply when approved and needed.
- Update ClickUp or the review tracker with final state.

The score stays below 10/10 because public replies can affect reputation, disputes, legal exposure, and client relationships. Human approval is required for negative, sensitive, ambiguous, or policy-risk reviews, and OAuth/GBP access must exist before any API publishing can happen.

## Training Video

No applicable Loom video for Process 32 was found in ClickUp list `901111072650`.

Checked sources:

- `Review check`
- `3. Review Generation Strategy`
- `4. Clients Reviews Integration`
- `Review Generation tracker`
- `1. GBP Audit and Image Post`
- `10. Pre Launch Website GBP Optimization`
- `11. Post Launch Website GBP Optimization`
- `Q&As Submitted`
- Related review, reply, replies, generation, client reviews, GBP, profile, and integration task names/descriptions
- Task comments
- Attachments
- Custom fields
- Checklists
- Rich embed payloads
- Full-list Loom sweep across ClickUp list `901111072650`

Decision: do not include unrelated reporting, Looker Studio, citation-only, Whitespark-only, blog, PageSpeed, Rank Math, schema, mobile, robots, canonical, backlink, Signal GeNeSYS, GBP post, or old Imagify videos in this SOP.

## Source References

Use ClickUp and the review tracker for internal operating context. Use Google documentation for review API behavior and content policy.

| Source | Role in Process 32 |
|---|---|
| [`Review check`](https://app.clickup.com/t/868exrphu) | Weekly review monitoring task. |
| [`3. Review Generation Strategy`](https://app.clickup.com/t/868eh43qp) | Review growth and review-request context. |
| [Review tracker sheet](https://docs.google.com/spreadsheets/d/103LbRhqq1MWh6JWT5DpZv-3KnZT4v6nTySc_ujSCQEQ/edit) | Internal review tracking source linked from ClickUp. |
| [Google: Manage customer reviews](https://support.google.com/business/answer/3474050) | Official GBP help for reading and replying to customer reviews. |
| [Google: Work with review data](https://developers.google.com/my-business/content/review-data) | API guide for listing reviews, getting reviews, replying, and deleting replies. |
| [Google Business Profile API: Reviews resource](https://developers.google.com/my-business/reference/rest/v4/accounts.locations.reviews) | Review fields, star ratings, reply object, and review methods. |
| [Google Business Profile API: updateReply](https://developers.google.com/my-business/reference/rest/v4/accounts.locations.reviews/updateReply) | API endpoint for creating or updating an owner reply. |
| [Google Business Profile API: deleteReply](https://developers.google.com/my-business/reference/rest/v4/accounts.locations.reviews/deleteReply) | API endpoint for deleting an owner reply. |
| [Google Maps user-generated content policy](https://support.google.com/contributionpolicy/answer/7422880) | Policy context for inappropriate, fake, restricted, or risky review content. |
| `deliverables/gbp/29-gbp-profile-build/README.md` | GBP access, verification, and profile ownership guardrails. |
| `deliverables/gbp/31-gbp-weekly-posts/README.md` | Reputation content handoff for positive review themes. |
| `deliverables/gbp/34-gbp-qa-management/README.md` | FAQ and public-answer handoff from repeated review questions. |
| `deliverables/gbp/35-gbp-link-on-website/README.md` | Review link placement and review acquisition handoff. |

## Review Reply Rules to Respect

Important rules:

- Public replies represent the business, not Lawn & Land.
- Replies should be polite, concise, specific, and calm.
- Do not argue publicly.
- Do not disclose private customer details.
- Do not confirm private job details beyond what the reviewer already made public unless approved.
- Do not offer refunds, discounts, legal admissions, or service guarantees unless approved.
- Do not accuse a reviewer of lying in public.
- Do not mention internal systems, staff blame, or behind-the-scenes account notes.
- Do not keyword-stuff services or cities into replies.
- Do not use the same canned response for every review.
- Do not auto-publish replies to negative or sensitive reviews.
- A reply can be created or updated through the API only for verified locations with proper OAuth access.
- If a reply must be removed, use the approved delete path and document why.

## Review Risk Classification

Classify every unanswered review before drafting or publishing.

| Risk Level | Review Type | Default Action |
|---|---|---|
| Low | 4-5 stars, positive, no complaint, no private details, no unusual claims. | Draft and publish automatically only if auto-publish is approved. |
| Medium | 3 stars, mixed sentiment, service complaint, vague dissatisfaction, pricing concern, employee mention, or operational detail. | Draft but require human approval. |
| High | 1-2 stars, refund request, legal threat, safety issue, harassment, discrimination claim, damage claim, fake-review claim, spam, profanity, competitor attack, or personal data. | Do not publish. Escalate to human with response packet. |
| Policy Review | Review appears fake, abusive, off-topic, conflict-of-interest, incentivized, or otherwise policy-risk. | Flag for human review and possible report path. |

## Reply Strategy

### Positive Reviews

Positive replies should:

- Thank the reviewer by name when available.
- Mention one detail from the review.
- Reinforce the client's service quality or team care.
- Invite them back or thank them for choosing the business.
- Stay short.

Avoid:

- Generic duplicate replies.
- Keyword stuffing.
- Long sales pitches.
- Asking for another review.
- Adding unapproved promotions.

### Neutral Reviews

Neutral replies should:

- Thank the reviewer.
- Acknowledge the mixed experience.
- Avoid defensiveness.
- Offer a calm next step when appropriate.
- Route to human approval before posting.

### Negative Reviews

Negative replies should:

- Be drafted only as a recommendation.
- Acknowledge the concern without admitting fault.
- Avoid arguing point-by-point.
- Move the conversation offline through an approved contact path when needed.
- Be approved by the account manager/client before posting.

Do not auto-post negative replies. One bad public reply can do more damage than the review.

### No-Text Reviews

No-text reviews should:

- Get a short thanks for positive 4-5 star ratings.
- Be reviewed before replying if rating is 1-3 stars.
- Avoid pretending to know details that were not provided.

## Workflow

### 1. Confirm Scope

Start from `Review check`.

Record:

- Client name.
- GBP profile/location.
- Review tracker row or sheet source.
- Review monitoring period.
- Whether API access is authorized.
- Whether auto-publishing is allowed.
- Who approves medium/high-risk replies.

If GBP access or OAuth is missing, prepare drafts and mark publishing blocked.

### 2. Pull Current Reviews

Use the best available source:

1. Business Profile API reviews list.
2. GBP UI if API access is unavailable.
3. Review tracker sheet as a secondary internal record.

For each review, record:

- Review ID or URL.
- Reviewer display name.
- Star rating.
- Review text.
- Review media if present.
- Create time.
- Update time.
- Current owner reply, if any.
- Reply status, if available.
- Location/profile.

Do not rely on stale tracker rows when the live GBP profile shows a newer state.

### 3. Identify Unanswered or Needs-Revision Reviews

Flag reviews where:

- No owner reply exists.
- Reply is stale, wrong, duplicated, or off-brand.
- Review was updated after the owner reply.
- Reply status indicates an issue.
- A negative review needs escalation.
- A review has media or details that need human context.

Do not rewrite old replies just for style unless there is a clear quality, accuracy, or reputation reason.

### 4. Classify Risk

Classify by:

- Star rating.
- Sentiment.
- Complaint severity.
- Legal/refund/safety language.
- Personal/private details.
- Employee names.
- Fake-review or spam signals.
- Competitor/harassment signals.
- Whether the review mentions a specific job, date, crew, price, damage, or dispute.

The risk classification decides whether the reply can be published automatically or must be approved.

### 5. Draft Reply

Draft one reply per review.

Reply requirements:

- Use the client's business voice.
- Be specific enough to show it is not generic.
- Keep it concise.
- Match the rating and sentiment.
- Do not reveal private details.
- Do not use salesy SEO phrasing.
- Do not use emojis unless the client's public voice already does.
- Do not include links unless approved.
- Do not include internal notes.

### 6. Approval Gate

Human approval is required for:

- Any 1-3 star review.
- Any review with a complaint.
- Any refund, damage, safety, legal, discrimination, or harassment language.
- Any review naming an employee negatively.
- Any review that may be fake or spam.
- Any reply that includes an offline resolution path.
- Any reply that changes a previously published response.
- Any deleteReply action.

Approval packet:

- Review text and rating.
- Reviewer name.
- Proposed reply.
- Risk classification.
- Why approval is required.
- Recommended next action.

### 7. Publish Reply

If using the GBP UI:

1. Open the correct profile/location.
2. Open reviews.
3. Find the target review.
4. Paste the approved reply.
5. Publish.
6. Confirm the reply appears under the correct review.

If using the API:

1. Confirm location is verified.
2. Confirm OAuth scope is valid.
3. Use the review resource name.
4. Send the approved `ReviewReply` through `accounts.locations.reviews.updateReply`.
5. Store returned reply data.
6. Re-fetch the review to confirm owner reply state.

Do not publish if the review, location, or approval status is uncertain.

### 8. Verify Reply Status

After publishing, verify:

- Reply appears on the intended review.
- Reply text matches the approved version.
- Reply is attached to the correct client/location.
- Reply status is not failed, rejected, or otherwise blocked.
- Tracker and ClickUp contain the final status.

If status is unclear, mark it pending and recheck.

### 9. Delete or Replace Replies

Only delete or replace a reply when:

- The existing reply was posted to the wrong review.
- The reply contains inaccurate information.
- The client/account manager approves a revision.
- A sensitive issue requires removing public language.

Use `deleteReply` only with approval and document:

- Original reply.
- Reason for deletion.
- Approver.
- New action.

### 10. Update Tracker

Update the review tracker or ClickUp with:

- Review ID/link.
- Rating.
- Risk level.
- Draft reply.
- Approval status.
- Published status.
- Published date.
- Reply proof.
- Escalation owner.
- Next action.

## Standard Output Format

Use this structure for ClickUp updates, approval packets, or tracker records:

```json
{
  "process": "32 - Automated Review Replies",
  "client": "Client Name",
  "clickup_source": "Review check",
  "tracker": "https://docs.google.com/spreadsheets/d/103LbRhqq1MWh6JWT5DpZv-3KnZT4v6nTySc_ujSCQEQ/edit",
  "review": {
    "id": "accounts/123/locations/456/reviews/789",
    "rating": "FIVE",
    "reviewer": "Reviewer Name",
    "text": "Great job on our lawn cleanup."
  },
  "risk_level": "Low",
  "recommended_reply": "Thank you for the kind words, Reviewer Name. We are glad the lawn cleanup turned out well and appreciate you choosing Client Name.",
  "approval_required": false,
  "publish_method": "API updateReply",
  "status": "Published",
  "proof": "Review reply returned by API or screenshot",
  "training_video": "No applicable Loom found in ClickUp list 901111072650",
  "handoffs": []
}
```

## QA Checklist

- [ ] ClickUp `Review check` checked.
- [ ] Review tracker sheet checked when available.
- [ ] Live GBP review state checked.
- [ ] Process 29 profile/access context checked.
- [ ] Correct client/location confirmed.
- [ ] API/OAuth access confirmed if using automation.
- [ ] Review ID or URL recorded.
- [ ] Star rating recorded.
- [ ] Review text and media reviewed.
- [ ] Existing owner reply checked.
- [ ] Risk level assigned.
- [ ] Reply drafted from the actual review.
- [ ] No private customer details added.
- [ ] No legal, refund, fault, or guarantee language added without approval.
- [ ] No keyword stuffing.
- [ ] No duplicate canned response.
- [ ] Human approval collected where required.
- [ ] Reply published only to the correct review.
- [ ] Reply status verified after publishing.
- [ ] Tracker/ClickUp updated with status and proof.
- [ ] Sensitive reviews escalated with owner and next action.
- [ ] Delete or replacement actions documented with approval.

## Completion Criteria

Process 32 is complete only when:

- New/unanswered reviews have been identified.
- Every review has a risk classification.
- Low-risk approved replies are published or scheduled through the accepted workflow.
- Medium/high-risk replies are escalated and not auto-published.
- Published replies are verified on the correct review.
- Pending, blocked, or rejected replies have a next action.
- The review tracker or ClickUp contains final status and proof.

## Common Mistakes

- Auto-posting a negative review reply.
- Arguing with the customer publicly.
- Disclosing private job or customer details.
- Posting the same reply across many reviews.
- Adding SEO keywords awkwardly into owner replies.
- Replying from the wrong client/location.
- Trusting the tracker without checking live GBP.
- Ignoring updated reviews after a reply was already posted.
- Deleting a reply without approval.
- Marking the task complete while replies are pending or blocked.

## Internal Handoffs

| Finding | Handoff |
|---|---|
| GBP access, verification, or ownership issue | Process 29 - GBP Profile Build & Completion |
| Positive review can support a future post | Process 31 - Weekly GBP Posts |
| Review mentions recurring customer question | Process 34 - Q&A Management |
| Website needs stronger review/profile link | Process 35 - GBP Link on Website |
| Review points to outdated service info | Process 29 / Process 30 / service audit |
| Review-generation campaign needed | `3. Review Generation Strategy` / Clients Reviews Integration |
| Fake/spam/inappropriate review suspected | Human review and Google policy/report path |
| Service failure or client complaint | Account manager/client success escalation |

## References

| Reference | Notes |
|---|---|
| Google manage customer reviews docs | Official GBP help for reading and replying to reviews. |
| Google work with review data docs | API operations for list, get, batch get, reply, and delete reply. |
| Google Reviews resource docs | Review fields, star rating, review reply, and methods. |
| Google updateReply docs | API endpoint for creating or updating owner replies on verified locations. |
| Google deleteReply docs | API endpoint for deleting owner replies. |
| Google Maps UGC policy | Review content and policy-risk context. |
| ClickUp `Review check` | Weekly review monitoring source. |
| ClickUp `3. Review Generation Strategy` | Review growth and review-request context. |
| Review tracker sheet | Internal tracking source linked from ClickUp. |
| Process 29 | GBP access and profile guardrails. |

---

*Part of the [SEO Command Center](../../README.md) - Lawn & Land Marketing*

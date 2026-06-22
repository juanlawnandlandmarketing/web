# GBP Link on Website

**Category:** GBP SEO
**Automation Readiness Score:** 2/10 - Manual with audit assistance
**Status:** SOP documented

---

## Purpose

Process 35 makes sure each client website links to the correct Google Business Profile, Google Maps place, and/or review request URL in the right conversion locations.

This is not just a footer-link task. A wrong GBP link can send customers to the wrong location, split review demand, weaken trust signals, or push users into a dead Google surface. The goal is to give visitors a clean path to verify the business on Google, read reviews, request directions, or leave a review without stuffing the site with awkward badges or risky review language.

This process covers:

- Selecting the correct GBP, Maps, or review URL.
- Verifying the URL belongs to the exact client/location.
- Adding website links in appropriate site areas.
- Auditing homepage, footer, contact, reviews, and location pages.
- Confirming NAP consistency between the site and GBP.
- Avoiding incentives, review gating, wrong-location links, or broken redirects.
- Handoff to GBP profile, review, schema, and launch QA workflows.

## Current State

Process 35 is represented in ClickUp by:

- `4. Clients Reviews Integration`
- `11. Post Launch Website GBP Optimization`

Related ClickUp and SOP sources:

- `Website`
- `Verify NAP in website and GBP`
- `3. Review Generation Strategy`
- `Review check`
- `10. Pre Launch Website GBP Optimization`
- `1. GBP Audit and Image Post`
- Process 29 - GBP Profile Build & Completion
- Process 31 - Weekly GBP Posts
- Process 32 - Automated Review Replies
- Process 34 - Q&A Management
- Process 36 - GBP Attributes
- Process 21 - Schema Markup

ClickUp `Website` gives one side of the link relationship: copy the correct homepage URL from Client Directory Info into GBP and ensure the link works before submission.

Process 35 covers the reverse side: make sure the website links back to the correct Google entity or review surface after launch.

## Target State

Every completed Process 35 should produce:

1. Confirmed client website URL.
2. Confirmed Google Business Profile / Maps place URL.
3. Confirmed review request URL when review generation is in scope.
4. Live website placement list.
5. NAP consistency check between website and GBP.
6. Broken-link / redirect check.
7. Desktop and mobile QA.
8. Screenshot or tracker proof.
9. Notes for any withheld, risky, or unresolved link.

## Automation Score

**2/10 - Manual with audit assistance**

Koga can automate useful checks:

- Crawl website pages for Google Maps, GBP, `g.page`, `search.google.com/local/writereview`, and `google.com/maps` links.
- Detect missing, broken, redirected, or duplicate Google links.
- Compare visible NAP against the approved client facts.
- Flag suspicious links to a different business, different city, or wrong location.
- Check whether review CTAs use risky language.
- Build a placement and QA report.

The score stays low because the correct GBP/review URL often must be confirmed from inside the current Google Business Profile dashboard, WordPress placement is client/theme-specific, review language carries policy risk, and final approval should come from a human before publishing or changing conversion paths.

## Training Video

No applicable Loom video for Process 35 was found in ClickUp list `901111072650`.

Checked sources:

- `4. Clients Reviews Integration`
- `How it works`
- `11. Post Launch Website GBP Optimization`
- `Link Products`
- `Website`
- `Verify NAP in website and GBP`
- `3. Review Generation Strategy`
- `Review check`
- Related GBP, Google, review, website, link, profile, footer, contact, map, launch, and NAP task names/descriptions
- Task comments
- Attachments
- Custom fields
- Checklists
- Rich embed payloads
- Full-list Loom sweep across ClickUp list `901111072650`

Decision: document the SOP from ClickUp task intent, existing GBP SOPs, Google help docs, and website launch QA patterns. Do not include unrelated reporting, Looker Studio, citation, Whitespark, blog, PageSpeed, Rank Math, schema-only, mobile-only, robots, canonical, backlink, Signal GeNeSYS, GBP post, review-reply, or image-compression videos in this SOP.

## Source References

Use ClickUp for internal operating context and Google documentation for current link/review rules.

| Source | Role in Process 35 |
|---|---|
| [`4. Clients Reviews Integration`](https://app.clickup.com/t/868eeg0mj) | Primary source for website review/GBP link integration scope. |
| [`How it works`](https://app.clickup.com/t/868eht02n) | Subtask under client review integration. |
| [`11. Post Launch Website GBP Optimization`](https://app.clickup.com/t/868eeg11q) | Post-launch GBP optimization source. |
| [`Website`](https://app.clickup.com/t/868ehbhuv) | Confirms the site-to-GBP relationship: GBP should use the correct homepage URL from Client Directory Info. |
| [`Verify NAP in website and GBP`](https://app.clickup.com/t/868egz6r4) | NAP consistency check between website and GBP. |
| [`3. Review Generation Strategy`](https://app.clickup.com/t/868eh43qp) | Review acquisition context for review link placement. |
| [`Review check`](https://app.clickup.com/t/868exrphu) | Recurring review monitoring context. |
| [Google Business Profile: Ask for reviews](https://support.google.com/business/answer/7035772) | Official review request/link guidance and review policy cautions. |
| [Google Business Profile: Edit your Business Profile](https://support.google.com/business/answer/3039617) | Official context for website/profile fields in GBP. |
| [Google Business Profile: Business representation guidelines](https://support.google.com/business/answer/3038177) | Official accuracy and representation rules for profile facts. |
| [Google Maps URLs](https://developers.google.com/maps/documentation/urls/get-started) | Official URL format for Maps actions and place links. |
| [Google Maps Platform: Place IDs](https://developers.google.com/maps/documentation/places/web-service/place-id) | Place ID guidance when building stable Maps URLs. |
| [Google Maps user-generated content policy](https://support.google.com/contributionpolicy/answer/7422880) | Review/Q&A contribution policy context, including deceptive engagement concerns. |
| `deliverables/gbp/29-gbp-profile-build/README.md` | GBP ownership, profile identity, website field, and NAP guardrails. |
| `deliverables/gbp/32-gbp-review-replies/README.md` | Review monitoring and response handoff. |
| `deliverables/technical/21-schema-markup/README.md` | LocalBusiness/review/schema consistency handoff. |

## Link Types

Use the link type that matches the site area and goal.

| Link Type | Best Use | Notes |
|---|---|---|
| GBP / Maps profile link | Footer, contact page, location page, trust section. | Sends users to the public business entity for directions, photos, reviews, and profile facts. |
| Review request link | Review page, thank-you page, email/SMS follow-up, client-approved CTA. | Use only with neutral language. Never gate, reward, or pressure reviews. |
| Directions link | Contact/location page. | Useful for storefronts and showrooms; less useful for hidden-address service-area businesses. |
| Maps embed | Contact/location page. | Only use when address display is appropriate and matches GBP. Avoid exposing hidden service-area addresses. |
| Website URL inside GBP | GBP profile field. | Covered mostly by Process 29, but Process 35 checks the relationship both ways. |

## Review Link Rules

Review CTAs must be clean.

Allowed:

- "Leave us a review on Google"
- "Review us on Google"
- "Share your experience"
- "Read our Google reviews"

Avoid:

- "Leave a 5-star review"
- "Get a discount for reviewing us"
- "Only leave a review if you had a great experience"
- Any language that screens unhappy customers away from Google.
- Any prize, giveaway, payment, discount, or incentive.
- Any employee/family review push.
- Any duplicate review link for the wrong location.

When in doubt, use neutral language and ask the Account Manager for approval.

## Placement Rules

Recommended website placements:

- Footer trust/social area.
- Contact page.
- Reviews/testimonials page.
- Location page for multi-location businesses.
- Post-service thank-you page when available.
- Service-area pages only when the CTA is useful and not repetitive.

Do not place review/profile links:

- In every paragraph or button row.
- In schema without matching visible content.
- On pages for a different location.
- On hidden-address service-area pages as a physical-location claim.
- With fake review widgets or manually invented star ratings.
- In a way that competes with primary lead CTAs on service pages.

## Workflow

### 1. Confirm Scope

Start from `4. Clients Reviews Integration`, `11. Post Launch Website GBP Optimization`, or launch QA.

Record:

- Client name.
- Website domain.
- WordPress/theme owner.
- GBP account/profile owner.
- Single-location or multi-location structure.
- Whether address is public, hidden, or service-area only.
- Whether the task needs a profile link, review link, directions link, map embed, or all of them.
- Approval owner.

If the client has more than one location, do not guess. Confirm which GBP location maps to which website page.

### 2. Gather Approved URLs

Collect:

- Website homepage URL from Client Directory Info.
- Public GBP / Google Maps profile URL.
- Review request URL from the GBP dashboard when available.
- Place ID or CID when available.
- Contact page URL.
- Reviews/testimonials page URL.
- Location page URLs.
- Approved NAP from the client source of truth.

Prefer the current Google Business Profile dashboard for review request links. If building a Maps URL, use official Google Maps URL formats and include a Place ID when possible.

### 3. Validate the Google Entity

Before adding anything to the website:

- Open the GBP/Maps link in a clean browser.
- Confirm business name.
- Confirm address or service-area display.
- Confirm phone number.
- Confirm website button points to the correct client domain.
- Confirm category/service fit.
- Confirm reviews belong to the right client/location.
- Confirm the link does not redirect to a competitor, old brand, duplicate listing, or closed listing.

If the GBP website field is wrong, route to Process 29 before adding the website link.

### 4. Audit Existing Website Links

Crawl or manually inspect:

- Homepage.
- Header/footer.
- Contact page.
- Reviews/testimonials page.
- Location pages.
- Thank-you or review request page, if present.
- Social/trust icon areas.
- Schema output when visible review/profile data appears on-page.

Flag:

- Missing GBP/review link.
- Broken Google links.
- Redirect chains.
- Old `g.page` or short links that resolve incorrectly.
- Links to the wrong business or location.
- Duplicate review CTAs with different destinations.
- Hardcoded review badges using stale rating/count values.
- Map embeds showing the wrong address.
- Hidden-address clients exposing a physical address.

### 5. Choose Placement and Copy

Use simple, neutral labels:

- `Google Business Profile`
- `Find us on Google`
- `Read our Google reviews`
- `Review us on Google`
- `Get directions`

For service pages, keep the primary CTA focused on leads. GBP/review links should support trust, not steal attention from the contact form or phone CTA.

### 6. Implement in WordPress

Common implementation locations:

- Footer builder.
- Contact page content block.
- Reviews/testimonials page.
- Location page module.
- Theme options/social links.
- Button/link module.
- Review plugin/widget setting.

Implementation rules:

- Use the approved final URL.
- Use `target="_blank"` only when it matches site convention.
- Use descriptive anchor text.
- Do not use phone-number-stuffed labels.
- Do not add exact star counts unless they are live/dynamic and approved.
- Do not add fake review schema.
- Do not edit GBP profile fields unless Process 29 scope includes it.

### 7. QA After Publishing

Check desktop and mobile:

- Link is visible in the approved location.
- Link opens the correct Google profile/review/directions surface.
- Link does not 404, loop, or require account-only access.
- Link belongs to the correct client/location.
- Contact page and footer still render cleanly.
- Primary lead CTAs still work.
- NAP on site still matches GBP.
- Review CTA language is neutral.
- No duplicate/wrong Google links remain.

Save screenshot proof or tracker notes.

### 8. Multi-Location Handling

For multi-location clients:

- Each location page should link to the matching GBP location.
- The global footer may link to a locations page instead of one GBP profile.
- Review CTAs should route to the correct location when the user came from a location-specific flow.
- Do not mix review links across branches.
- If a location lacks GBP access or has a duplicate/suspended listing, document the blocker and route to Process 29.

### 9. Review Generation Handoff

When review generation is in scope:

- Confirm the review link is current.
- Confirm the CTA is neutral.
- Confirm no incentives or gating are used.
- Confirm Account Manager/client approval.
- Hand off unanswered reviews or reply strategy to Process 32.
- Track final link location for future review campaigns.

## Standard Output Format

Use this structure for ClickUp updates, QA notes, or trackers:

```json
{
  "process": "35 - GBP Link on Website",
  "client": "Client Name",
  "website": "https://example.com",
  "clickup_source": "4. Clients Reviews Integration",
  "gbp_profile_url": "https://www.google.com/maps?cid=...",
  "review_url": "https://search.google.com/local/writereview?placeid=...",
  "link_type": "Profile link + review request link",
  "placements": [
    "Footer",
    "Contact page",
    "Reviews page"
  ],
  "nap_match": "Pass",
  "mobile_qa": "Pass",
  "desktop_qa": "Pass",
  "risk_notes": "No incentives; neutral review CTA used",
  "proof": "Screenshot or tracker URL",
  "training_video": "No applicable Loom found in ClickUp list 901111072650",
  "handoffs": [
    "Process 29 if GBP website field is wrong",
    "Process 32 for review replies"
  ]
}
```

## QA Checklist

- [ ] `4. Clients Reviews Integration` checked when review link placement is in scope.
- [ ] `11. Post Launch Website GBP Optimization` checked when this is launch/post-launch work.
- [ ] `Website` task checked for approved homepage URL context.
- [ ] `Verify NAP in website and GBP` considered.
- [ ] Client website domain confirmed.
- [ ] Correct GBP/Maps profile URL confirmed.
- [ ] Review request URL confirmed from GBP dashboard where available.
- [ ] Place/location confirmed for multi-location clients.
- [ ] Existing website Google links audited.
- [ ] Wrong, stale, duplicate, or broken links removed/replaced.
- [ ] Hidden-address/service-area rules respected.
- [ ] Footer/contact/reviews/location placement selected.
- [ ] Review CTA language is neutral.
- [ ] No review incentives, gating, or "5-star" pressure used.
- [ ] WordPress/theme placement published.
- [ ] Desktop QA completed.
- [ ] Mobile QA completed.
- [ ] Link opens the correct public Google surface.
- [ ] NAP still matches between website and GBP.
- [ ] Screenshot/tracker proof saved.
- [ ] ClickUp updated with final placement and proof.

## Completion Criteria

Process 35 is complete only when:

- The correct GBP/Maps/review URL is verified.
- The website links to the correct Google entity in approved locations.
- Review language is neutral and policy-safe.
- Multi-location mapping is correct when applicable.
- Website and GBP NAP are consistent or the mismatch is routed.
- Desktop and mobile QA pass.
- Broken/stale/wrong Google links are fixed or documented.
- ClickUp/tracker contains final URL, placement, proof, and any handoffs.

## Common Mistakes

- Linking to the wrong GBP location.
- Using a review URL copied from a different client.
- Linking to Google search results instead of a stable profile/review surface.
- Adding "leave us a 5-star review" language.
- Offering incentives for reviews.
- Exposing a hidden service-area address with a map embed.
- Forgetting mobile QA.
- Updating the site but not confirming the GBP website field points back correctly.
- Adding fake/stale review stars to the website.
- Letting an old footer link survive after a brand/domain/location change.

## Internal Handoffs

| Finding | Handoff |
|---|---|
| GBP website field wrong | Process 29 - GBP Profile Build & Completion |
| NAP mismatch between site and GBP | Process 29 / citation cleanup |
| Review link exists but replies are missing | Process 32 - Automated Review Replies |
| Review themes suggest new Q&A/FAQ | Process 34 - Q&A Management |
| Profile services/products are inconsistent | Process 30 / Process 36 |
| LocalBusiness schema references wrong URL/profile | Process 21 - Schema Markup |
| Contact/location page layout breaks after link placement | Web dev launch QA |
| Multi-location mapping unclear | Account Manager / client approval |

## References

| Reference | Notes |
|---|---|
| Google Business Profile ask-for-reviews help | Official guidance for sharing review links and review request cautions. |
| Google Business Profile edit profile help | Website/profile field context. |
| Google Business Profile guidelines | Business accuracy and representation rules. |
| Google Maps URLs | Official Maps URL syntax for profile, directions, and search links. |
| Google Place IDs | Stable place identifier guidance. |
| Google Maps UGC policy | Review and contribution policy context. |
| ClickUp `4. Clients Reviews Integration` | Internal source for review link integration. |
| ClickUp `11. Post Launch Website GBP Optimization` | Internal post-launch source. |
| ClickUp `Website` | Confirms correct website URL relationship with GBP. |
| ClickUp `Verify NAP in website and GBP` | NAP consistency source. |
| Process 29 | GBP identity and profile-field guardrails. |
| Process 32 | Review monitoring and reply handling. |

---

*Part of the [SEO Command Center](../../README.md) - Lawn & Land Marketing*

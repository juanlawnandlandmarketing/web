# GBP Attributes

**Category:** GBP SEO
**Automation Readiness Score:** 3/10 - Low automation, human approval required
**Status:** SOP documented

---

## Purpose

Process 36 audits, selects, updates, and verifies Google Business Profile attributes so each profile accurately reflects the real business details Google exposes for that category, country, and location.

GBP attributes are not a fixed universal checklist. Google determines available attributes based on profile properties such as primary category, country, lodging status, and other business settings. Attributes can appear, disappear, or change without a visible code or SOP change, so the operator must verify the live profile before making updates.

This process covers:

- Attribute availability checks.
- Category-dependent attribute review.
- Accessibility, amenities, service options, highlights, payments, planning, and identity attributes where available.
- Services/products/profile fact consistency.
- Risk review before public claims are added.
- Manual or API-assisted updates when authorized.
- Verification after Google accepts, rejects, or edits profile details.
- Handoffs to categories, services, products, hours, address, NAP, website links, schema, and reviews.

## Current State

Process 36 is represented indirectly in ClickUp by:

- `1. GBP Audit and Image Post`
- `Initial Audit`
- `Services audit`
- `10. Pre Launch Website GBP Optimization`
- `11. Post Launch Website GBP Optimization`

Related ClickUp subtasks:

- `Primary Category`
- `Secondary Categories`
- `Add "Services"`
- `Add "Products"`
- `Business Hours`
- `Service Area`
- `Location / Address`
- `Social Profile`
- `Website`
- `Verify NAP in website and GBP`

There is no standalone ClickUp task named `GBP Attributes` in list `901111072650`. This SOP documents the operating layer that sits between category setup, profile completion, services/products, and ongoing GBP audits.

## Target State

Every Process 36 run should produce:

1. Current category and country/location context.
2. Available attribute categories visible in GBP or returned by the API.
3. Recommended attributes with source-of-truth evidence.
4. Human-approved changes before public claims are saved.
5. Updated attributes or documented blocker.
6. Verification after save/acceptance.
7. Notes for rejected, unavailable, or Google-edited attributes.
8. Handoffs for category, service, address, hours, schema, website, or review issues.

## Automation Score

**3/10 - Low automation, human approval required**

Koga can automate useful prep and QA:

- Pull current attributes from the Business Profile API when OAuth access exists.
- List available attributes by category/country where the API supports it.
- Compare attributes against website content, onboarding notes, services, products, reviews, and client facts.
- Flag risky, unsupported, or missing attribute claims.
- Build an approval packet.
- Track before/after states and verification notes.

The score stays low because many attributes must be confirmed from the live GBP interface, availability changes by category/country, some claims can create legal/accessibility/reputation risk, and final edits may trigger Google review, rejection, or profile changes that require human judgment.

## Training Video

No applicable Loom video for Process 36 was found in ClickUp list `901111072650`.

Checked sources:

- `1. GBP Audit and Image Post`
- `Initial Audit`
- `Services audit`
- `10. Pre Launch Website GBP Optimization`
- `11. Post Launch Website GBP Optimization`
- `Primary Category`
- `Secondary Categories`
- `Add "Services"`
- `Add "Products"`
- `Business Hours`
- `Service Area`
- `Location / Address`
- `Verify NAP in website and GBP`
- Related attribute, amenity, accessibility, service option, category, GBP, Google Business Profile, audit, profile, service, product, hours, location, and NAP task names/descriptions
- Task comments
- Attachments
- Custom fields
- Checklists
- Rich embed payloads
- Full-list Loom sweep across ClickUp list `901111072650`

Decision: document the SOP from ClickUp GBP audit/profile context, existing GBP SOPs, and Google Business Profile attribute documentation. Do not include unrelated reporting, Looker Studio, citation, Whitespark, blog, PageSpeed, Rank Math, schema-only, mobile-only, robots, canonical, backlink, Signal GeNeSYS, GBP post, review-reply, Q&A, website-link, or image-compression videos in this SOP.

## Source References

Use ClickUp for internal operating context and Google documentation for attribute rules and API behavior.

| Source | Role in Process 36 |
|---|---|
| [`1. GBP Audit and Image Post`](https://app.clickup.com/t/868eegeb8) | Recurring audit surface for checking whether visible profile details and attributes are stale or missing. |
| [`Initial Audit`](https://app.clickup.com/t/868eha18k) | Starting point for profile completeness review. |
| [`Services audit`](https://app.clickup.com/t/868eha50a) | Confirms service facts that may affect attributes and profile details. |
| [`10. Pre Launch Website GBP Optimization`](https://app.clickup.com/t/868eeg0zv) | Pre-launch profile setup source. |
| [`11. Post Launch Website GBP Optimization`](https://app.clickup.com/t/868eeg11q) | Post-launch profile cleanup source. |
| [`Primary Category`](https://app.clickup.com/t/868ehbhtk) | Primary category determines many available profile features and attributes. |
| [`Secondary Categories`](https://app.clickup.com/t/868ehbhtw) | Secondary categories can affect profile relevance and downstream review needs. |
| [`Add "Services"`](https://app.clickup.com/t/868ehbhz7) | Service truth source for service-related profile details. |
| [`Add "Products"`](https://app.clickup.com/t/868ehbhz3) | Product/service offering context. |
| [`Business Hours`](https://app.clickup.com/t/868ehbhwy) | Hours consistency source. |
| [`Service Area`](https://app.clickup.com/t/868ehbhw5) | Service-area consistency source. |
| [`Location / Address`](https://app.clickup.com/t/868ehbhvv) | Address visibility and verification risk context. |
| [`Verify NAP in website and GBP`](https://app.clickup.com/t/868egz6r4) | NAP consistency check. |
| [Google Business Profile: Manage your business attributes](https://support.google.com/business/answer/9049526) | Official UI guidance for adding/editing attributes. |
| [Google Business Profile: Edit your Business Profile](https://support.google.com/business/answer/3039617) | General profile edit path. |
| [Google Business Profile: Guidelines for representing your business](https://support.google.com/business/answer/3038177) | Official accuracy and representation rules. |
| [Google Business Profile: Manage your business category](https://support.google.com/business/answer/7249669) | Category-specific feature context. |
| [Google Business Profile API: Attributes resource](https://developers.google.com/my-business/reference/businessinformation/rest/v1/Attributes) | Attribute object and availability behavior. |
| [Google Business Profile API: Add attributes](https://developers.google.com/my-business/content/attributes) | API attribute workflow and notes about Place Actions/Lodging APIs. |
| [Google Business Profile API: locations.getAttributes](https://developers.google.com/my-business/reference/businessinformation/rest/v1/locations/getAttributes) | API lookup for current location attributes. |
| [Google Business Profile API: locations.updateAttributes](https://developers.google.com/my-business/reference/businessinformation/rest/v1/locations/updateAttributes) | API update path and OAuth scope. |
| [Google Business Profile API: attributes.list](https://developers.google.com/my-business/reference/rest/v4/attributes/list) | API list of attributes available by category and country. |
| `deliverables/gbp/29-gbp-profile-build/README.md` | Profile identity and verification guardrails. |
| `deliverables/gbp/30-gbp-categories/README.md` | Category review and downstream attribute handoff. |
| `deliverables/gbp/35-gbp-link-on-website/README.md` | Website/profile consistency handoff. |

## Attribute Types

Examples vary by category, market, and profile state. Common attribute families include:

| Attribute Family | Examples | Review Notes |
|---|---|---|
| Accessibility | Wheelchair accessible entrance, parking, seating, restroom. | Confirm physical reality. Do not guess. |
| Amenities | Wi-Fi, restroom, appointment availability, onsite services. | Use only if the customer can actually expect it. |
| Service options | Online estimates, onsite services, delivery, pickup, virtual appointments. | Category-dependent. Confirm workflow exists. |
| Planning | Appointment required, appointments recommended. | Must match scheduling operations. |
| Payments | Cash, checks, credit cards, mobile payments. | Confirm payment acceptance with client. |
| Identity/highlights | Women-owned, veteran-owned, Latino-owned, Black-owned, LGBTQ+ friendly, similar highlights where available. | Sensitive. Must be client-approved and truthful. |
| Lodging/hospitality | Amenities, sustainability practices, hotel details. | Use lodging-specific docs/API where relevant. Usually not for L&L green-industry clients. |

Do not treat these as guaranteed options. Start from what the live profile or API says is available.

## Attribute Rules

Important rules:

- Attributes must match the real business.
- Available attributes depend on category, country, and profile properties.
- Google can add or remove attributes without SOP changes.
- Some attributes are customer-facing trust claims.
- Accessibility attributes must be verified before saving.
- Identity attributes are sensitive and require explicit client approval.
- Do not add "onsite services," "online estimates," or similar claims unless the client actually provides them.
- Do not use attributes to imply a storefront if the profile is service-area only or address-hidden.
- Do not change categories just to unlock attributes.
- Do not use attributes as a replacement for services, products, posts, Q&A, or schema.
- If an attribute is unavailable, document the blocker instead of forcing a workaround.

## Workflow

### 1. Confirm Scope

Start from:

- `1. GBP Audit and Image Post`
- `Initial Audit`
- `Services audit`
- `10. Pre Launch Website GBP Optimization`
- `11. Post Launch Website GBP Optimization`

Record:

- Client name.
- GBP location/profile.
- Country.
- Primary category.
- Secondary categories.
- Public address vs hidden address/service-area status.
- Current services/products state.
- Approval owner.
- Whether access is manual UI, API, or audit-only.

### 2. Pull Current Attribute State

Use whichever source is available:

- Google Business Profile UI: Edit profile -> More / attribute categories.
- Google Maps mobile Business tab where applicable.
- Business Profile API `locations.getAttributes` when OAuth access exists.
- Manual screenshot or profile export where access is limited.

Record:

- Current active attributes.
- Current false/unselected attributes where visible.
- Attributes Google shows but does not allow editing.
- Attributes unavailable for the current profile.
- Any pending, rejected, or Google-updated profile edits.

### 3. List Available Attributes

Attributes available for a profile may depend on category and country.

If using API:

- Use the available attributes/list endpoint with category and country when appropriate.
- Compare available attributes against current attributes.
- Do not assume the API list equals the UI exactly in every case.

If using the UI:

- Open each visible attribute category.
- Screenshot or list available options.
- Note unavailable or missing categories.

### 4. Validate Business Facts

Use approved sources:

- Client Directory Info.
- Website contact/service pages.
- Client onboarding answers.
- Approved service list.
- GBP services/products.
- Business hours.
- Service-area list.
- Account Manager/client confirmation.
- Recent reviews or customer questions as evidence only, not as final proof.

Risky claims need direct confirmation:

- Accessibility features.
- Ownership/identity highlights.
- Emergency/after-hours availability.
- Online estimates or virtual appointments.
- Onsite service availability.
- Payments accepted.
- In-store/studio/showroom features.
- Public address or location-based amenities.

### 5. Build Recommendation Packet

Prepare an approval packet before changing public profile details.

| Field | Notes |
|---|---|
| Attribute | Exact visible/API attribute name. |
| Recommended value | Yes, No, unset, selected option, or URL where applicable. |
| Evidence | Client fact, website page, onboarding note, photo, or AM/client confirmation. |
| Risk | Accessibility, identity, service-area, category, legal, verification, or reputation risk. |
| Update path | Manual UI, API, defer, or route to another process. |

Do not save sensitive or uncertain attributes without approval.

### 6. Apply Updates

Manual UI path:

1. Open the correct Business Profile.
2. Select Edit profile.
3. Go to More or the relevant attribute category.
4. Set approved attributes to Yes/No or the approved option.
5. Leave uncertain attributes unset.
6. Save.
7. Watch for pending/rejected changes.

API path when authorized:

1. Pull current attributes.
2. Confirm available attributes.
3. Prepare the update payload.
4. Use `locations.updateAttributes` with the correct `attributeMask`.
5. Use the `business.manage` OAuth scope.
6. Verify the response and live/public state.

Do not update place action links through the general attributes flow. Google notes that place action links belong in the Place Actions API. Lodging-specific details may require lodging-specific workflows.

### 7. Verify Public/Accepted State

After saving:

- Reopen the profile in Google Search/Maps.
- Confirm attributes appear as expected where Google displays them.
- Confirm no wrong service/location implication was created.
- Confirm there are no pending/rejected updates.
- Screenshot or log before/after state.
- Update ClickUp/tracker with final status.

If Google does not display an approved attribute publicly, document that separately. Some attributes may be stored but not shown consistently.

### 8. Ongoing Audit

During recurring `GBP Audit and Image Post`:

Check whether:

- Categories changed and exposed new attributes.
- Services/products changed and require attribute review.
- Hours/service area/address changed.
- Reviews or Q&A suggest wrong expectations.
- Google added or removed available attributes.
- A competitor/profile audit suggests a useful but truthful attribute is missing.
- Existing attributes are stale, unsupported, or risky.

Do not refresh attributes on autopilot. Treat each change as a public claim.

## Standard Output Format

Use this structure for ClickUp updates, approval packets, or trackers:

```json
{
  "process": "36 - GBP Attributes",
  "client": "Client Name",
  "clickup_source": "1. GBP Audit and Image Post",
  "profile": "Google Business Profile location",
  "primary_category": "Lawn care service",
  "country": "US",
  "access_method": "Manual UI / API / audit-only",
  "attribute": "Online estimates",
  "recommended_value": "Yes",
  "evidence": "Client confirmed online estimate workflow",
  "risk_notes": "No pricing promise added",
  "approval_status": "Approved by Account Manager",
  "update_status": "Saved / pending / rejected / unavailable / deferred",
  "proof": "Screenshot or tracker URL",
  "training_video": "No applicable Loom found in ClickUp list 901111072650",
  "handoffs": [
    "Process 30 if category limits expected attributes",
    "Process 29 if profile facts conflict"
  ]
}
```

## QA Checklist

- [ ] `1. GBP Audit and Image Post` checked when this is recurring work.
- [ ] `Initial Audit` or pre-launch/post-launch source checked when applicable.
- [ ] Current primary category reviewed.
- [ ] Secondary categories reviewed.
- [ ] Country/location context recorded.
- [ ] Current attribute state captured.
- [ ] Available attribute options checked in live UI or API.
- [ ] Services/products reviewed for consistency.
- [ ] Hours reviewed if relevant.
- [ ] Service area/address visibility reviewed if relevant.
- [ ] Accessibility attributes verified directly before saving.
- [ ] Identity/highlight attributes explicitly client-approved.
- [ ] Service-option attributes confirmed against real operations.
- [ ] Payment/planning attributes confirmed with client or AM.
- [ ] Recommendation packet prepared for approval.
- [ ] Human approval collected for public claims.
- [ ] Updates applied manually or via authorized API.
- [ ] Pending/rejected/Google-updated state checked.
- [ ] Public profile reviewed after update.
- [ ] ClickUp/tracker updated with proof and final status.

## Completion Criteria

Process 36 is complete only when:

- Current and available attributes are checked for the real profile/category/country.
- Recommendations are based on approved business facts.
- Risky attributes are approved by a human before saving.
- Updates are applied only through the appropriate UI/API path.
- Pending, rejected, unavailable, or hidden attributes are documented.
- Public/profile state is verified after the update.
- Related category, service, address, NAP, website, schema, review, or Q&A issues are routed.
- ClickUp or the tracker contains final status and proof.

## Common Mistakes

- Assuming every profile has the same attributes.
- Changing categories just to unlock attributes.
- Marking accessibility features without verification.
- Adding "online estimates" or "onsite services" when the client does not offer them.
- Using identity attributes without explicit client approval.
- Treating services/products as attributes.
- Updating attributes while ignoring NAP, address, hours, or service-area conflicts.
- Assuming API availability means the attribute will display publicly.
- Forgetting that Google can reject or alter profile changes.
- Not checking attributes after a category change.

## Internal Handoffs

| Finding | Handoff |
|---|---|
| Attribute unavailable because category is wrong | Process 30 - GBP Categories |
| Profile facts or verification risk | Process 29 - GBP Profile Build & Completion |
| Service details conflict with attributes | `Services audit` / Process 30 |
| Product/service offering mismatch | Add Products / Add Services |
| Address or service-area issue | Process 29 / citation cleanup |
| Website profile facts conflict | Process 35 - GBP Link on Website |
| Attribute should be reflected in schema | Process 21 - Schema Markup |
| Attribute implies FAQ/customer expectation | Process 34 - Q&A Management |
| Reviews mention repeated mismatch | Process 32 - Automated Review Replies |

## References

| Reference | Notes |
|---|---|
| Google Business Profile manage attributes help | Official UI path and examples for attributes. |
| Google Business Profile edit profile help | General profile edit workflow. |
| Google Business Profile guidelines | Accuracy and representation rules. |
| Google Business Profile category help | Category-specific feature context. |
| Google Business Profile API Attributes resource | Attribute object and availability behavior. |
| Google Business Profile API add attributes guide | API workflow and caveats for place actions/lodging. |
| Google Business Profile API get/update attributes | Current-state and update endpoints. |
| Google Business Profile API attributes.list | Available-attributes lookup by category/country. |
| ClickUp `1. GBP Audit and Image Post` | Recurring audit source. |
| ClickUp `10. Pre Launch Website GBP Optimization` | Setup source for profile details. |
| Process 29 | Profile fact and verification guardrails. |
| Process 30 | Category-dependent attribute availability. |

---

*Part of the [SEO Command Center](../../README.md) - Lawn & Land Marketing*

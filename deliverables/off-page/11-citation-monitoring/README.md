# Citation Monitoring - Ongoing

**Category:** Off-Page SEO
**Automation Readiness Score:** 6/10 - Partial automation possible
**Status:** SOP documented

---

## Purpose

Citation monitoring keeps the client's business identity consistent after citation onboarding is complete. The onboarding process builds the baseline; this ongoing process checks whether major profiles, Whitespark-managed listings, and priority directories still match the approved name, address, phone, website, GBP, and service-area details.

For Lawn & Land clients, citation monitoring is not a random directory sweep. It is a controlled recurring check for NAP drift, duplicate listings, broken URLs, ownership issues, pending Whitespark items, and directory profiles that need human follow-up.

The goal is simple:

- Keep the approved NAP source of truth consistent across important listings.
- Catch old phone numbers, old addresses, old domains, and duplicate profiles.
- Monitor Whitespark-managed directory work and support requests.
- Verify priority profiles such as Bing Places, Yelp, Facebook, and other business directory listings.
- Route cleanup work to the right human owner when a platform requires login, verification, payment, or support escalation.
- Keep the citation baseline ready for reporting and future onboarding/reference work.

## Current State

Citation monitoring is represented across several ClickUp tasks instead of one unified SOP:

- ClickUp task `1. Business Directory Management (Whitespark)` is the main ongoing Whitespark/directory management workflow.
- ClickUp task `5. Clear NAP Listings` is the NAP cleanup workflow that supports citation consistency.
- ClickUp subtask `Verify NAP in Whitespark for SAE Clients` defines the Whitespark-specific NAP check.
- ClickUp subtask `Verify NAP in website and GBP` defines the website/GBP consistency check.
- ClickUp subtasks `Bing places`, `Yelp`, and `Facebook Profile` are priority directory/profile checks under Whitespark management.
- ClickUp subtask `Comunicate with Whitespark Support` is the support escalation path for stuck listings, Whitespark questions, or cleanup issues.
- Process 10, `Citation Building - Onboarding`, creates the baseline that this process monitors.

The missing piece is a recurring citation monitoring SOP that turns those tasks into a repeatable quarterly workflow with clear inputs, issue types, QA rules, video-reference decisions, and handoff expectations.

## Target State

Every active SEO client should have a recurring citation monitoring record.

The ideal system:

1. Starts from the approved NAP source of truth and the Process 10 citation baseline.
2. Checks the website, GBP, Whitespark, and priority directories for consistency.
3. Reviews key profiles and listings for old NAP, duplicate profiles, missing links, broken links, or incorrect status.
4. Separates issues Koga can detect from issues humans must fix inside third-party platforms.
5. Creates a clean issue list with priority, platform, evidence, owner, next action, and due date.
6. Escalates stuck Whitespark or listing issues through the support workflow.
7. Tracks resolved, pending, blocked, and recurring problems over time.

## Automation Score

**6/10 - Partial automation possible**

Koga can automate much of the audit and evidence capture:

- Compare approved NAP against website and GBP data.
- Pull the Process 10 citation baseline.
- Search for likely client listings and duplicate profiles.
- Check public listing URLs for live status, NAP text, website URL, and redirect behavior.
- Flag mismatched business names, old phone numbers, old addresses, wrong URLs, and missing profile links.
- Prepare Whitespark/support notes for human review.
- Create monitoring summaries and recurring issue logs.

The score stays at 6/10 because fixes often require platform access, client or business-owner verification, Whitespark coordination, manual duplicate suppression, payment decisions, or logged-in profile edits. Detection is more automatable than resolution.

## When This Process Runs

| Trigger | What Happens |
|---|---|
| Quarterly fulfillment | Review Whitespark and priority directory listings for NAP consistency. |
| After Process 10 onboarding | Confirm the onboarding baseline is stable and ready for recurring monitoring. |
| After website launch or domain change | Confirm listings point to the correct canonical website URL. |
| After GBP changes | Check that citations still match the approved GBP identity. |
| After phone/address/name changes | Identify old NAP variants and update/suppress priority listings. |
| Ranking or local visibility issue | Check whether entity confusion, duplicates, or old listings may be contributing. |
| Whitespark support issue | Document status, contacts, blocker, and follow-up date. |

## Inputs

| Input | Used For |
|---|---|
| Approved NAP source of truth | The baseline for every consistency check. |
| Process 10 citation baseline | Starting list of submitted, live, pending, blocked, and duplicate listings. |
| Website URL and live site NAP | Website consistency check. |
| GBP profile URL and GBP fields | Entity consistency check against the public profile. |
| Whitespark account/order status | Managed listing status and support follow-up. |
| Priority directory list | Platforms to check first. |
| Old NAP variants | Duplicate and old-record detection. |
| Client notes or ownership changes | Explains name/address/phone/domain updates. |
| Prior monitoring log | Recurring issue detection and resolution history. |

## ClickUp Source Tasks and Video Audit

Use these ClickUp tasks as the operational source for Process 11.

| Source | Role in Process 11 |
|---|---|
| [`1. Business Directory Management (Whitespark)`](https://app.clickup.com/t/868eegcgc) | Parent quarterly workflow for Whitespark and business directory monitoring. |
| [`Introduction`](https://app.clickup.com/t/868eh6fbd) | Starting point/context for the Whitespark directory workflow. |
| [`Bing places`](https://app.clickup.com/t/868eh6fpa) | Priority map/search profile to verify for NAP and website consistency. |
| [`Yelp`](https://app.clickup.com/t/868eh6k8g) | Priority directory/review profile to verify for NAP and website consistency. |
| [`Facebook Profile`](https://app.clickup.com/t/868eh6je5) | Social/entity profile to verify for business identity and website link consistency. |
| [`Comunicate with Whitespark Support`](https://app.clickup.com/t/868eh6p21) | Escalation path for Whitespark support, stuck listings, or unresolved listing cleanup. |
| [`5. Clear NAP Listings`](https://app.clickup.com/t/868eeg0qb) | NAP cleanup workflow that supports citation monitoring. |
| [`Verify NAP in Whitespark for SAE Clients`](https://app.clickup.com/t/868egzacu) | Whitespark-specific NAP verification task. |
| [`Verify NAP in website and GBP`](https://app.clickup.com/t/868egz6r4) | Website and GBP consistency check. |
| [`12. Citation Building`](https://app.clickup.com/t/868eeg12f) | Process 10 onboarding source that creates the baseline for ongoing monitoring. |

SOP video audit:

| Video Found | Related to Process 11? | Decision |
|---|---|---|
| Loom for creating SEO reports | No | Do not include in Process 11. It belongs with reporting. |
| Loom for Looker Studio report building | No | Do not include in Process 11. It belongs with reporting. |
| Loom for Imagify image compression | No | Do not include in Process 11. It is outdated and unrelated to citation monitoring. |
| `10. Pre Launch Website GBP Optimization` task says "Video explaining all the process" but no Loom URL was exposed in ClickUp API data | Possibly GBP setup, not citation monitoring | Do not include unless a real URL is supplied and the video covers citation/NAP monitoring. |

No citation-monitoring, NAP-monitoring, Whitespark-monitoring, Bing Places, Yelp, or Facebook profile Loom was found in the ClickUp task bodies, comments, attachments, checklists, custom fields, or rich embed payloads. For now, Process 11 should not include a video reference. If a true Whitespark/citation-monitoring Loom is supplied later, add it to this section and reference the specific workflow step it supports.

## Monitored Source Types

| Source Type | What To Check |
|---|---|
| Website | Business name, phone, address/service-area behavior, footer/contact/schema consistency. |
| GBP | Business name, phone, website URL, address/service-area behavior, categories, hours. |
| Whitespark | Order/listing status, NAP values, pending items, support issues, duplicate cleanup. |
| Bing Places | Business identity, website link, phone, address/service-area data, profile status. |
| Yelp | Business identity, phone, address/service-area behavior, website link, category fit. |
| Facebook Profile | Business name, phone, website link, address/service-area details, profile ownership signals. |
| Other priority directories | NAP, website URL, duplicate risk, old values, live/pending/blocked status. |
| Old listings and duplicates | Old phones, old addresses, old domains, wrong names, moved/closed profiles. |

## Workflow

### 1. Load the Approved Baseline

Start with:

- Approved business name.
- Approved address or service-area status.
- Approved phone.
- Approved website URL.
- Approved GBP URL.
- Approved hours, categories, services, and service areas.
- Process 10 citation baseline.
- Prior Process 11 monitoring log.
- Known old names, old phones, old addresses, old domains, and prior duplicate issues.

If the baseline is missing or conflicts with the website/GBP, pause monitoring and resolve the source of truth first.

### 2. Verify Website and GBP NAP

Use the ClickUp task `Verify NAP in website and GBP`.

Check:

- Homepage footer and header.
- Contact page.
- Service-area/service pages when they show NAP details.
- LocalBusiness schema when visible or crawlable.
- GBP public profile.
- GBP website link.
- GBP phone and address/service-area behavior.

If the website and GBP do not match the approved baseline, log the mismatch before checking third-party directories. The site and GBP must be the reference point.

### 3. Verify Whitespark NAP and Status

Use the ClickUp task `Verify NAP in Whitespark for SAE Clients`.

Check:

- Client/order status.
- Business name.
- Address/service-area treatment.
- Phone.
- Website URL.
- Pending listing items.
- Failed or rejected listing items.
- Duplicate cleanup requests.
- Support notes or open questions.

If Whitespark needs support follow-up, route it through `Comunicate with Whitespark Support` and log the support contact, question, date sent, and follow-up date.

### 4. Check Priority Profiles

Review the directory/profile tasks under `1. Business Directory Management (Whitespark)`:

- Bing Places.
- Yelp.
- Facebook Profile.
- Any additional priority listings from the Process 10 baseline.

For each profile, capture:

- Platform name.
- Listing URL.
- Current business name.
- Current phone.
- Current address or service-area behavior.
- Current website URL.
- Listing status: live, pending, blocked, duplicate, suppressed, incorrect, inaccessible.
- Evidence URL or screenshot note.
- Recommended action.

### 5. Search for Drift and Duplicates

Search for old or conflicting records:

- Old phone number + business name.
- Old address + business name.
- Old domain + business name.
- Business name variants.
- GBP name + city.
- Phone number only.
- Address only.

Flag:

- Duplicates.
- Old vendor-created profiles.
- Wrong domains.
- Tracking numbers used without an approved tracking decision.
- Closed/moved statuses that are wrong.
- Profiles for old DBAs or previous entities.

### 6. Classify Issues

Use consistent issue types.

| Issue Type | Meaning |
|---|---|
| Correct | Listing matches the approved baseline. |
| Minor mismatch | Small formatting/category issue that does not create NAP confusion. |
| NAP mismatch | Name, address, phone, or website conflicts with the approved baseline. |
| Duplicate | More than one listing exists for the same business/location/profile type. |
| Old entity | Listing reflects an old name, address, phone, or domain. |
| Access required | Fix requires login, ownership claim, email, phone, postcard, or client access. |
| Whitespark support | Fix needs Whitespark coordination. |
| Payment approval | Platform requires paid action or membership decision. |
| Blocked | Cannot move without client, platform, or ownership action. |

### 7. Assign the Next Action

For every issue, define the owner and next step:

- Koga can recheck public listing data.
- Koga can prepare support notes.
- Koga can draft correction instructions.
- Human must perform logged-in changes.
- Human must request client verification.
- Human must decide on payments or memberships.
- Whitespark support must resolve platform/listing issues.

Do not mark an issue fixed until the public listing or support response confirms it.

### 8. Update the Monitoring Log

Each run should produce:

- Summary counts.
- Correct listings.
- Listings with issues.
- Duplicate/old-entity findings.
- Whitespark support items.
- Human-owned actions.
- Blocked items.
- Follow-up dates.
- Recurring issues from prior runs.

The monitoring log becomes the evidence trail for future checks and client-facing summaries.

## What Gets Automated

Koga can:

- Load the Process 10 citation baseline.
- Compare approved NAP against website and GBP.
- Fetch public listing pages where accessible.
- Search for old NAP variants and duplicates.
- Detect mismatched names, phones, addresses, and URLs.
- Check live URLs and redirect behavior.
- Prepare Whitespark support notes.
- Create monitoring summaries, issue tables, and follow-up lists.
- Highlight recurring issues across monitoring cycles.

## What Stays Human

Humans approve or handle:

- Final NAP source-of-truth changes.
- Logged-in directory edits.
- GBP edits and verification.
- Whitespark account/order actions.
- Support emails that require account context or client approval.
- Duplicate suppression where ownership must be proven.
- Phone/email/postcard verification.
- Paid directory or membership decisions.
- Client-facing explanation of sensitive listing issues.

## QA Checklist

- [ ] Approved NAP baseline was loaded before monitoring.
- [ ] Process 10 citation baseline was reviewed.
- [ ] Website and GBP were checked before third-party directories.
- [ ] Whitespark NAP and status were checked.
- [ ] Bing Places, Yelp, and Facebook Profile were reviewed when applicable.
- [ ] Old NAP variants were searched.
- [ ] Duplicate listings were flagged.
- [ ] Every issue has an issue type, evidence, owner, and next action.
- [ ] Whitespark support items have a contact path and follow-up date.
- [ ] Paid or access-required actions are assigned to a human.
- [ ] Video references were only included if directly relevant to citation monitoring.
- [ ] The final output is ready for the next quarterly monitoring cycle.

## Output Format

For each monitoring run, produce:

```json
{
  "client": "Client Name",
  "run_type": "citation_monitoring_ongoing",
  "run_date": "YYYY-MM-DD",
  "baseline": {
    "business_name": "Client Business Name",
    "address": "123 Main St, City, ST 12345",
    "phone": "(555) 555-5555",
    "website": "https://example.com/",
    "gbp_url": "https://maps.google.com/..."
  },
  "summary": {
    "listings_checked": 0,
    "correct": 0,
    "nap_mismatches": 0,
    "duplicates": 0,
    "old_entities": 0,
    "whitespark_support_items": 0,
    "blocked": 0
  },
  "listings": [
    {
      "platform": "Example Directory",
      "listing_url": "https://example.com/profile/client",
      "status": "nap_mismatch",
      "evidence": "Phone number on listing shows old number.",
      "recommended_action": "Update phone to approved baseline.",
      "owner": "Human",
      "follow_up_date": "YYYY-MM-DD"
    }
  ],
  "whitespark": {
    "status": "needs_support",
    "support_contact": "support@whitespark.ca",
    "question": "Example issue to resolve.",
    "follow_up_date": "YYYY-MM-DD"
  },
  "video_references": {
    "included": false,
    "reason": "No directly relevant citation-monitoring Loom found."
  }
}
```

## Completion Criteria

The process is complete when:

- Website and GBP NAP have been checked against the approved baseline.
- Whitespark NAP and listing status have been reviewed.
- Priority profiles/directories have been checked.
- Old NAP variants and duplicates have been searched.
- Every issue has evidence, owner, next action, and follow-up date.
- Whitespark support issues are logged with contact path and next follow-up.
- Irrelevant SOP videos are excluded from the process.
- The monitoring log is ready for the next recurring cycle.

## Common Mistakes

- Treating citation monitoring like new citation building.
- Checking directories before confirming website and GBP source-of-truth data.
- Marking a listing fixed before the public profile reflects the change.
- Ignoring duplicate listings because the main listing is correct.
- Forgetting old phone numbers, old addresses, and old domains.
- Including unrelated SOP videos just because they exist in ClickUp.
- Sending Whitespark support questions without the client/order context.
- Leaving blocked items without an owner or follow-up date.

## Source References

| Source | Relevant Rules |
|---|---|
| ClickUp `1. Business Directory Management (Whitespark)` | Primary ongoing directory monitoring workflow. |
| ClickUp `Bing places` | Priority profile check under Whitespark directory management. |
| ClickUp `Yelp` | Priority profile check under Whitespark directory management. |
| ClickUp `Facebook Profile` | Priority profile check under Whitespark directory management. |
| ClickUp `Comunicate with Whitespark Support` | Support escalation path for stuck Whitespark/listing issues. |
| ClickUp `5. Clear NAP Listings` | NAP cleanup workflow that supports monitoring. |
| ClickUp `Verify NAP in Whitespark for SAE Clients` | Whitespark-specific NAP verification task. |
| ClickUp `Verify NAP in website and GBP` | Website/GBP consistency check. |
| `deliverables/off-page/10-citation-building-onboarding/README.md` | Onboarding baseline that Process 11 monitors. |
| `deliverables/off-page/13-backlink-business-directories/README.md` | Related directory work when monitoring reveals authority opportunities. |
| `deliverables/gbp/29-gbp-profile-build/README.md` | GBP business identity should align with monitored citations. |
| `deliverables/gbp/35-gbp-link-on-website/README.md` | Website-to-GBP consistency supports NAP/entity trust. |

---

*Part of the [SEO Command Center](../../README.md) - Lawn & Land Marketing*

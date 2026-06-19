# Press Releases

**Category:** Off-Page SEO
**Automation Readiness Score:** 7/10 - Highly automatable
**Status:** SOP documented

---

## Purpose

Process 12 covers the monthly press-release workflow for Lawn & Land SEO clients, with special focus on uploading finalized press releases into Signal GeNeSYS so they can publish through the client Media Room workflow.

This process is not just "write a press release." A press release is only complete when it has been created or optimized, validated against the Signal GeNeSYS template, uploaded to the correct storage location, logged in the tracker, uploaded or scheduled in Signal GeNeSYS, and verified against the client Media Room workflow.

The goal is simple:

- Produce two press releases per SEO client each month.
- Follow the Signal GeNeSYS press release template and PR optimization protocol.
- Upload finalized press releases into Signal GeNeSYS using the approved process.
- Keep Drive storage, tracker rows, Signal GeNeSYS publishing, and Media Room visibility aligned.
- Prevent incomplete, unoptimized, duplicate, off-season, or incorrectly linked press releases from being marked done.

## Current State

Process 12 connects several source workflows:

- ClickUp task `2. Press Releases (2/Month)` is the recurring monthly fulfillment task.
- ClickUp subtask `Upload the press releases` is the direct Signal GeNeSYS upload step.
- ClickUp subtask `Press Releases updated` is the follow-up/status task after upload.
- `/opt/koga/.openclaw/workspace/Press_Release_Creation_Process.md` defines the overall PR workflow.
- `/opt/koga/.openclaw/workspace/PR-OPTIMIZATION-PROCESS.md` defines optimization, storage, sharing, tracker, and validation rules.
- `/opt/koga/.openclaw/workspace/Signal-GeNeSYS-Press-Release-Template.md` defines the required Signal GeNeSYS content format.
- The applicable training video is the Loom tutorial for adding press releases to Signal GeNeSYS.

The missing piece was a Process 12 dashboard SOP that treats Signal GeNeSYS upload as part of the core completion gate, not an optional afterthought.

## Target State

Every monthly PR run should end with two properly uploaded and trackable press releases per active SEO client.

The ideal system:

1. Uses approved client profile data and current SEO priorities.
2. Creates or optimizes two monthly press releases.
3. Validates each PR against the Signal GeNeSYS template.
4. Saves each finalized PR in the correct Drive folder.
5. Shares each folder and Google Doc with link writer access.
6. Logs every PR in the PRs optimization tracker.
7. Uploads each finalized PR into Signal GeNeSYS.
8. Verifies the PR is tied to the correct client brand and Media Room workflow.
9. Marks the ClickUp task complete only after storage, tracker, upload, and validation gates pass.

## Automation Score

**7/10 - Highly automatable**

Koga can automate a large part of this process:

- Pull client profile data, URLs, GBP links, phone numbers, service areas, and sitemap context.
- Generate or optimize press release copy against the Signal GeNeSYS template.
- Validate word count, link count, headlines, summaries, body structure, phone links, and banned-language rules.
- Prepare Google Docs, Drive folders, sharing, tracker updates, and upload-ready fields.
- Produce a Signal GeNeSYS upload packet with title, subheadline, summary, body, links, image notes, and client context.
- Verify public Media Room output when accessible.

The score stays at 7/10 because final Signal GeNeSYS upload can involve logged-in UI actions, brand/channel selection, image choices, publish/schedule decisions, and human review of sensitive or weak news angles.

## Training Video

Use this Loom for the Signal GeNeSYS upload portion of Process 12.

::loom https://www.loom.com/share/ffe67b8932da4f7997034fb024b78a2f?sid=07a03c81-33ea-49d5-bb3e-db292a1e6b2b

| Video | Applies To | Notes |
|---|---|---|
| [Tutorial: Adding Press Releases to Signal Genesys](https://www.loom.com/share/ffe67b8932da4f7997034fb024b78a2f?sid=07a03c81-33ea-49d5-bb3e-db292a1e6b2b) | Signal GeNeSYS press-release upload | User-supplied applicable Loom for Process 12. It demonstrates adding two press releases to Signal GeNeSYS and covers headline, content length, links, images, and posting workflow. |

ClickUp list `901111072650` was also checked for Process 12 Looms. The matching tasks did not expose a Loom in task descriptions, comments, attachments, custom fields, checklists, or rich embed payloads, so the user-supplied Loom above is the applicable video reference.

## ClickUp Source Tasks

Use these ClickUp tasks as the operational source for this SOP.

| Source | Role in Process 12 |
|---|---|
| [`2. Press Releases (2/Month)`](https://app.clickup.com/t/868eegdeh) | Parent monthly fulfillment task for two press releases per client. |
| [`Upload the press releases`](https://app.clickup.com/t/868ehv42x) | Signal GeNeSYS upload step. |
| [`Press Releases updated`](https://app.clickup.com/t/868em5b3q) | Follow-up/status task after upload. |
| [`14. Media Room Configuration`](https://app.clickup.com/t/868eh45tf) | Related setup task that ensures Signal GeNeSYS output can appear on the client website Media Room. |
| [`Media Room Configuration`](https://app.clickup.com/t/868eh45wu) | Client-specific Media Room configuration step. |

## When This Process Runs

| Trigger | What Happens |
|---|---|
| Monthly SEO fulfillment | Create or optimize two client press releases and upload them to Signal GeNeSYS. |
| New client post-launch | Confirm Signal GeNeSYS and Media Room setup before recurring uploads begin. |
| Existing PR optimization batch | Optimize drafts, upload Docs, update tracker, and prepare Signal GeNeSYS upload. |
| Media Room launch or repair | Confirm press releases are flowing through the correct Signal GeNeSYS Media Room integration. |
| Client PR backlog cleanup | Validate, upload, and track missing PRs in the correct order. |

## Required Inputs

| Input | Used For |
|---|---|
| Client name | Folder path, tracker row, Signal GeNeSYS brand selection, and PR metadata. |
| Client profile | Company facts, owner name, phone, service area, approved services, homepage, and GBP URL. |
| Current month and PR number | Scheduling, naming, tracker row, and publishing sequence. |
| Approved website URLs | Four required body links and Media Room verification. |
| Relevant service page | Section 2 body link. |
| Relevant blog post | Section 3 body link and blog summary. |
| GBP URL | Section 4 body link when required. |
| Final optimized PR document | Source content for Signal GeNeSYS upload. |
| Image or media asset | Signal GeNeSYS upload image where applicable. |
| Signal GeNeSYS client brand | Correct publishing destination. |
| PRs optimization tracker row | Final storage, upload, and completion tracking. |

## Workflow

### 1. Confirm Client and Monthly PR Scope

Start with the ClickUp task `2. Press Releases (2/Month)`.

Confirm:

- Client name.
- Target month.
- PR number, usually PR 1 and PR 2.
- Whether the PR is net-new or an optimization of an existing draft.
- Whether Signal GeNeSYS and the client Media Room are already configured.
- Whether the PR should be published immediately or prepared for scheduling.

Scheduling rule:

- PR 1 should use the 15th of the target month.
- PR 2 should use the 30th of the target month.
- Do not default to the creation date unless the source workflow explicitly says to.

### 2. Read the Required PR Source Workflows

Before drafting, optimizing, uploading, or closing out a PR, read and follow:

- `/opt/koga/.openclaw/workspace/Press_Release_Creation_Process.md`
- `/opt/koga/.openclaw/workspace/PR-OPTIMIZATION-PROCESS.md`
- `/opt/koga/.openclaw/workspace/Signal-GeNeSYS-Press-Release-Template.md`

The Signal GeNeSYS template wins when older local guidance conflicts with it.

### 3. Create or Optimize the PR

Build each PR using the approved format:

- Required output block.
- Main headline.
- Subheadline.
- Short press release summary.
- Blog summary.
- FOR IMMEDIATE RELEASE.
- Body headline.
- Dateline and four body sections.
- About section.
- Media contact block.

Core Signal GeNeSYS requirements:

- Body target is 1,000 to 1,100 words, excluding About and media contact.
- Third person, neutral, factual news style.
- No questions or exclamation points.
- No em dashes or en dashes.
- No promotional or sales-heavy language.
- Exactly four body links.
- Clickable HTML phone link.
- Real company names, real URLs, and no placeholders.

### 4. Validate Before Upload

Do not upload to Signal GeNeSYS until validation passes or issues are explicitly assigned.

Check:

- Required output block exists and is in the correct order.
- Headline, subheadline, short PR summary, and blog summary fit required lengths.
- Body word count is 1,000 to 1,100 words.
- Exactly four body links exist.
- Links point to the homepage, service page, blog post, and GBP/company profile as required.
- Phone number is clickable.
- Seasonal hook matches the dateline month and client region.
- Service claims match approved client services.
- No AI reasoning, prompt leakage, placeholders, internal notes, or duplicated sections remain.
- Fresh-chat or manual quality score is acceptable before final submission.

### 5. Save and Track the Final PR

Before final completion:

1. Save the optimized PR locally for audit/history when applicable.
2. Upload it as a Google Doc to:
   `PRs Optimized / Client Name / Month_PRNumber`
3. Share the client folder and Google Doc with link writer access.
4. Update the `PRs optimization` tracker with:
   - Client.
   - Month.
   - PR number/file/title.
   - Optimization status.
   - Upload status.
   - Notes.
   - Google Doc link.

Do not mark the tracker row complete until upload, sharing, tracker update, and validation all pass.

### 6. Upload the PR to Signal GeNeSYS

Use the ClickUp task `Upload the press releases` and the Loom tutorial above.

Upload rules:

- Log into the approved Signal GeNeSYS account.
- Open the correct client brand.
- Confirm the brand matches the client, not another Lawn & Land client.
- Select the correct press release or Media Room publishing channel.
- Add the PR title/headline fields exactly from the optimized PR.
- Add the subheadline and summaries where the platform requires them.
- Paste the final PR body from the optimized Google Doc.
- Preserve required formatting and links.
- Add the approved image or media asset when required.
- Confirm the company name appears correctly in the main headline.
- Confirm content length fits the Signal GeNeSYS upload requirements.
- Confirm all links remain clickable after paste.
- Save, schedule, or publish according to the monthly fulfillment instruction.

Never reuse another client's Signal GeNeSYS brand, Media Room integration, image, or publishing destination.

### 7. Verify Signal GeNeSYS and Media Room Output

After upload, verify what is available:

- Signal GeNeSYS entry exists under the correct client brand.
- Title/headline matches the optimized PR.
- Summary/subheadline fields did not truncate incorrectly.
- Body formatting survived the paste.
- Four body links are still present and clickable.
- Image or media asset displays correctly when applicable.
- Publish/schedule status is correct.
- Client Media Room receives the PR if the integration is live.
- Any pending review, schedule, or publish blocker is logged.

### 8. Close Out ClickUp and Tracker

Only close the workflow when:

- The Google Doc exists in the correct Drive folder.
- Sharing is verified.
- Tracker row is updated.
- Signal GeNeSYS upload is complete or clearly scheduled.
- Live or scheduled status is documented.
- Any blocker has an owner and next action.

Update `Press Releases updated` after the upload/status is confirmed.

## What Gets Automated

Koga can:

- Pull client facts, website URLs, GBP URLs, and page/post sitemap context.
- Draft or optimize PRs against the Signal GeNeSYS template.
- Validate word count, link count, structure, summaries, phone links, and banned content.
- Prepare Google Doc upload and tracker rows.
- Create Signal GeNeSYS upload packets.
- Compare pasted output against the optimized source when screenshots or HTML are available.
- Prepare completion notes and follow-up lists.

## What Stays Human

Humans approve or handle:

- Weak, sensitive, or repetitive news angles.
- Final client-sensitive claims.
- Signal GeNeSYS login, brand selection, and publish/schedule action when direct automation is not authorized.
- Image choices where the platform requires judgment.
- Any failed or low-score validation issue.
- Final client-facing delivery or escalation.

## QA Checklist

- [ ] The correct ClickUp parent task and upload subtask were checked.
- [ ] The applicable Loom was reviewed for Signal GeNeSYS upload steps.
- [ ] Press Release Creation Process was followed.
- [ ] PR Optimization Process was followed.
- [ ] Signal GeNeSYS template was followed.
- [ ] PR 1 and PR 2 dates follow the 15th/30th scheduling rule when applicable.
- [ ] Required output block appears first.
- [ ] Body is 1,000 to 1,100 words.
- [ ] Exactly four body links are present.
- [ ] Phone number is clickable.
- [ ] No AI leakage, placeholders, or internal notes remain.
- [ ] Google Doc is uploaded to the correct client folder.
- [ ] Folder and Doc sharing are verified.
- [ ] Tracker row is updated with the final Google Doc link.
- [ ] Signal GeNeSYS brand/client selection is correct.
- [ ] Signal GeNeSYS entry is uploaded, scheduled, or published.
- [ ] Media Room output is verified when the integration is live.
- [ ] ClickUp status reflects the real completion state.

## Output Format

For each monthly PR run, produce:

```json
{
  "client": "Client Name",
  "run_type": "press_release_signal_genesys_upload",
  "month": "YYYY-MM",
  "press_releases": [
    {
      "pr_number": 1,
      "target_date": "YYYY-MM-15",
      "headline": "Press release headline",
      "google_doc_url": "https://docs.google.com/document/d/example",
      "drive_folder": "PRs Optimized / Client Name / Month_PR1",
      "tracker_status": "updated",
      "validation_status": "passed",
      "signal_genesys_status": "uploaded",
      "media_room_status": "verified",
      "notes": "No blockers."
    }
  ],
  "training_video": "https://www.loom.com/share/ffe67b8932da4f7997034fb024b78a2f?sid=07a03c81-33ea-49d5-bb3e-db292a1e6b2b"
}
```

## Completion Criteria

The process is complete when:

- Both monthly PRs are created or optimized.
- Each PR passes the Signal GeNeSYS template and PR optimization validation gates.
- Each PR is uploaded to the correct Drive folder as a Google Doc.
- Folder and Doc sharing are verified.
- Tracker rows are updated with final links and status.
- Each PR is uploaded, scheduled, or published in Signal GeNeSYS under the correct client brand.
- Media Room output is verified when available.
- ClickUp reflects the real final status.

## Common Mistakes

- Treating this as a writing-only task and skipping Signal GeNeSYS upload.
- Uploading to the wrong client brand in Signal GeNeSYS.
- Using a PR before template validation passes.
- Forgetting to update the PRs optimization tracker.
- Forgetting Drive sharing.
- Losing links or formatting during paste into Signal GeNeSYS.
- Using the wrong client Media Room integration.
- Marking ClickUp complete while the PR is only drafted, not uploaded.

## Source References

| Source | Relevant Rules |
|---|---|
| ClickUp `2. Press Releases (2/Month)` | Parent monthly fulfillment task for Process 12. |
| ClickUp `Upload the press releases` | Signal GeNeSYS upload action. |
| ClickUp `Press Releases updated` | Follow-up/status after upload. |
| Loom `Tutorial: Adding Press Releases to Signal Genesys` | Applicable training video for adding PRs to Signal GeNeSYS. |
| `/opt/koga/.openclaw/workspace/Press_Release_Creation_Process.md` | Overall PR creation, storage, tracking, and completion workflow. |
| `/opt/koga/.openclaw/workspace/PR-OPTIMIZATION-PROCESS.md` | Optimization, validation, Drive, sharing, and tracker rules. |
| `/opt/koga/.openclaw/workspace/Signal-GeNeSYS-Press-Release-Template.md` | Required Signal GeNeSYS content template and QA rules. |
| `deliverables/off-page/10-citation-building-onboarding/README.md` | Related off-page onboarding context. |

---

*Part of the [SEO Command Center](../../README.md) - Lawn & Land Marketing*

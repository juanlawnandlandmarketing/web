# GBP Photo Management

**Category:** GBP SEO
**Automation Readiness Score:** 2/10 - Manual-heavy
**Status:** SOP documented

---

## Purpose

Process 33 manages Google Business Profile photos and videos so each client profile shows real, clean, policy-safe visuals that represent the business accurately and support trust.

The goal is not to dump random images into GBP. The goal is to maintain a healthy profile gallery with approved client photos, a clean logo, a strong cover photo, and enough current service/project imagery to show customers what the company actually does.

This process covers:

- Logo upload and QA.
- Cover photo selection.
- Additional GBP photo uploads.
- Monthly photo freshness checks.
- Client-provided image review.
- Image quality and policy checks.
- File naming and organization.
- Image compression and prep.
- Rejection monitoring.
- Human escalation for rejected, missing, low-quality, stock, or risky media.
- Handoffs to GBP posts, products, services, website images, and client photo collection.

## Current State

Process 33 is represented in ClickUp by:

- `Logo`
- `Cover Photo`
- `Additional Images`
- `Uploading an image`
- `1. GBP Audit and Image Post`

Related ClickUp and SOP sources:

- `10. Pre Launch Website GBP Optimization`
- `11. Post Launch Website GBP Optimization`
- `Generate the images`
- `Optimice images using smush`
- `Add "Products"`
- `Add "Services"`
- Process 29 - GBP Profile Build & Completion
- Process 30 - GBP Categories
- Process 31 - Weekly GBP Posts
- Process 06 - Alt Text on Images

ClickUp gives useful field-level guidance:

- `Logo`: upload a clean square-format logo, keep negative space, avoid phone numbers or clutter.
- `Cover Photo`: select the best high-quality client-provided image; no stock images.
- `Additional Images`: upload 5-10 unique client-provided images, avoid stock images and images with phone numbers, then recheck after 10 minutes for rejections.

ClickUp also mentions flipping rejected images in Canva and reuploading. Treat that as a human-reviewed troubleshooting option only, not an automatic rule. If Google rejects an image, first diagnose why it was rejected and confirm the image is accurate, policy-safe, and worth resubmitting.

## Target State

Every active GBP client should have:

1. Clean logo uploaded and verified.
2. Strong cover photo selected from approved client media.
3. 5-10 useful additional photos uploaded during setup or refresh.
4. Monthly or recurring photo freshness check.
5. Photo inventory by source, type, and status.
6. Rejection/pending/live status verification.
7. Image quality and policy notes.
8. Handoffs for missing real client photos, rejected media, outdated services, or website/GBP mismatch.

## Automation Score

**2/10 - Manual-heavy**

Koga can support the process:

- Inventory client photo folders and current GBP media when access exists.
- Rename and organize media files.
- Flag obvious issues: stock-looking images, phone-number overlays, low resolution, duplicates, wrong business, irrelevant services, watermarks, blurry files, or screenshots.
- Compress images and prepare upload packets.
- Generate image prompts only when generated media is explicitly allowed.
- Use the Business Profile API to upload media from URL or bytes when approved OAuth access exists.
- Verify uploaded/pending/rejected state when API or profile access exists.
- Prepare monthly photo freshness notes and client photo request lists.

The score stays low because the hardest parts are human: getting real client photos, confirming image rights, choosing representative visuals, accessing GBP, handling Google rejections, and deciding whether a photo accurately represents the business. Client photos beat automation here.

## Training Video

Supporting image-prep Loom found in ClickUp:

::loom https://www.loom.com/share/8d620b5b4ba248f5934bae8e3cf0a99b?sid=8c9c6007-06a6-4b6d-b623-e439e41c044d

| Video | Applies To | Notes |
|---|---|---|
| [How to Compress Images Using Imagify](https://www.loom.com/share/8d620b5b4ba248f5934bae8e3cf0a99b?sid=8c9c6007-06a6-4b6d-b623-e439e41c044d) | Image compression/prep only | Useful for reducing file size before upload. It does not replace GBP photo selection, policy review, upload, or rejection QA. |

No GBP-photo-specific Loom for Process 33 was found in ClickUp list `901111072650`.

Checked sources:

- `Logo`
- `Cover Photo`
- `Additional Images`
- `Uploading an image`
- `1. GBP Audit and Image Post`
- `Generate the images`
- `Optimice images using smush`
- Related image, photo, media, logo, cover, upload, GBP, profile, Imagify, and Smush task names/descriptions
- Task comments
- Attachments
- Custom fields
- Checklists
- Rich embed payloads
- Full-list Loom sweep across ClickUp list `901111072650`

Decision: include the Imagify Loom as a supporting image-prep reference only. Do not treat unrelated reporting, Looker Studio, citation-only, Whitespark-only, blog, PageSpeed, Rank Math, schema, mobile, robots, canonical, backlink, Signal GeNeSYS, GBP post, or review videos as Process 33 training.

## Source References

Use ClickUp for internal operating context and Google documentation for photo/video rules and API behavior.

| Source | Role in Process 33 |
|---|---|
| [`Logo`](https://app.clickup.com/t/868ehbj2h) | Logo upload requirements: square, clean, negative space, no phone numbers/clutter. |
| [`Cover Photo`](https://app.clickup.com/t/868ehbhy2) | Cover photo selection: best high-quality client-provided image, no stock. |
| [`Additional Images`](https://app.clickup.com/t/868ehbhy8) | 5-10 unique client-provided photos, no stock, no phone numbers, rejection check. |
| [`Uploading an image`](https://app.clickup.com/t/868eha1yt) | Related image upload task. |
| [`1. GBP Audit and Image Post`](https://app.clickup.com/t/868eegeb8) | Recurring GBP audit and image/post fulfillment source. |
| [`Generate the images`](https://app.clickup.com/t/868ehuqh8) | Image generation/compression context and Imagify Loom. |
| [`Optimice images using smush`](https://app.clickup.com/t/868ejb8un) | Image compression context. |
| [Google: Manage your Business Profile photos & videos](https://support.google.com/business/answer/6103862) | Official photo/video upload and guideline context. |
| [Google: Business Profile photos & videos policy and posts content policy](https://support.google.com/business/answer/7213077) | Official media policy and additional criteria. |
| [Google Business Profile API: Upload media](https://developers.google.com/my-business/content/upload-photos) | API upload from URL and bytes; local posts require URL media. |
| [Google Business Profile API: accounts.locations.media](https://developers.google.com/my-business/reference/rest/v4/accounts.locations.media) | Media item resource and media upload methods. |
| `deliverables/gbp/29-gbp-profile-build/README.md` | GBP access, verification, and sensitive profile guardrails. |
| `deliverables/gbp/30-gbp-categories/README.md` | Service/category fit for photo selection. |
| `deliverables/gbp/31-gbp-weekly-posts/README.md` | GBP post media handoff. |
| `deliverables/on-page/06-alt-text/README.md` | Website image naming/alt-text handoff. |

## Photo Rules to Respect

Important rules:

- Use real client-provided photos whenever possible.
- Cover photo must be client-provided; no stock.
- Additional GBP photos should be unique and client-approved.
- Avoid stock images unless the specific workflow explicitly allows them.
- Avoid photos with phone numbers, large text overlays, watermarks, cluttered graphics, or misleading claims.
- Avoid fake, misleading, irrelevant, low-quality, blurry, or off-brand media.
- Do not upload photos that show private customer information without approval.
- Do not upload license plates, addresses, faces, minors, or private property details when there is a privacy concern.
- Do not upload images unrelated to the business location, services, team, equipment, or real project work.
- Do not reupload rejected photos blindly.
- Photos and videos must comply with Google policy and applicable law.

## Photo Types

Use this inventory model.

| Type | Purpose | Rules |
|---|---|---|
| Logo | Brand recognition. | Square format, negative space, no phone numbers, no clutter. |
| Cover photo | First visual impression. | Best real client photo; no stock; strong service/business representation. |
| Exterior/location | Shows storefront, shop, yard, vehicles, or recognizable business presence. | Avoid showing private info or unrelated neighboring businesses. |
| Team | Builds trust. | Use approved team photos only. |
| Equipment/fleet | Shows capability. | Keep vehicles/equipment clean and relevant. |
| Project/result | Shows service quality. | Prefer before/after only when both images are clear and approved. |
| Service action | Shows crews doing real work. | Avoid unsafe work practices or unclear context. |
| Product/service image | Supports GBP products/services. | Must match real services and categories. |
| Seasonal | Keeps profile current. | Match current service demand and weather/season. |

## Workflow

### 1. Confirm Scope

Start from `Logo`, `Cover Photo`, `Additional Images`, or `1. GBP Audit and Image Post`.

Record:

- Client name.
- GBP profile/location.
- Setup, refresh, or monthly audit.
- Target photo count.
- Photo types needed.
- Source folder or client media source.
- Whether GBP/API access is available.
- Who approves questionable images.

If no approved media exists, create a client photo request instead of uploading filler.

### 2. Collect and Inventory Media

Gather:

- Client-provided photos.
- Existing GBP photos.
- Website photos.
- Recent job/project photos.
- Team and fleet photos.
- Logo files.
- Cover photo candidates.
- Product/service images.
- Any image folders in Drive, ClickUp, website media library, or client onboarding assets.

Record for each image:

- File name.
- Source.
- Date/source context if known.
- Photo type.
- Service/category represented.
- Approval status.
- Quality status.
- Upload status.

### 3. Reject Bad Candidates Early

Do not upload:

- Stock images for cover/additional photos.
- Images with phone numbers or heavy promo text.
- Blurry or low-resolution images.
- Duplicate or near-duplicate photos.
- Photos from the wrong client.
- Screenshots.
- Images with unrelated people/property.
- Photos showing unsafe work or poor-quality results.
- Images that contradict client services or category choices.
- Images that may violate privacy, copyright, or Google policy.

When unsure, route to a human instead of guessing.

### 4. Choose Logo

Logo requirements from ClickUp:

- Clean square format.
- Negative space around the logo.
- No phone numbers.
- No clutter.

If the client does not provide a usable logo:

- Check approved brand assets.
- Create an internal logo option only if that is part of the client workflow.
- Get approval before uploading a newly created or modified logo.

### 5. Choose Cover Photo

Cover photo requirements from ClickUp:

- High quality.
- Client-provided.
- No stock images.
- Strongly represents the business.

Good cover candidates:

- Finished landscape/lawn/hardscape work.
- Clean crew/equipment photo.
- Strong exterior/project photo.
- Seasonal service result when relevant.

Avoid:

- Logos as cover photos.
- Text-heavy graphics.
- Collages.
- Stock images.
- Poorly cropped images.

### 6. Choose Additional Images

ClickUp target: upload 5-10 unique approved images.

Choose a balanced mix:

- 1-2 project/result photos.
- 1-2 service action photos.
- 1 team/fleet/equipment photo if available.
- 1 seasonal or current-service photo.
- 1 location/exterior photo when relevant.

For service-area businesses without storefronts, prioritize real work, crew, fleet, equipment, and service-result photos.

### 7. Prepare Files

Prepare the image set:

- Rename files clearly.
- Remove duplicates.
- Compress large files.
- Keep image quality intact.
- Keep original source files available.
- Record source/approval notes.

File naming pattern:

```txt
client-service-photo-type-YYYYMMDD.jpg
```

Examples:

```txt
acme-lawn-care-mowing-result-20260622.jpg
acme-landscaping-mulch-install-20260622.jpg
acme-logo-square-20260622.png
```

Use the Imagify Loom only for image compression/prep guidance. Compression should not create visible artifacts.

### 8. Upload Media

If using the GBP UI:

1. Open the correct profile/location.
2. Open photos/media.
3. Upload logo, cover photo, and additional images as applicable.
4. Confirm each image lands under the intended role/category when the UI supports it.
5. Save screenshots or notes.

If using the API:

1. Confirm OAuth access and location ID.
2. Choose upload from URL or bytes.
3. For URL uploads, call media create with `sourceUrl`.
4. For byte uploads, call `media:startUpload`, upload bytes, then call media create with the data ref.
5. Use the correct `locationAssociation.category` such as `LOGO`, `COVER`, or other supported categories.
6. Re-fetch media to verify status.

Do not use API upload when media source URLs are temporary, private, blocked, or not approved.

### 9. Recheck After Upload

ClickUp says to recheck after 10 minutes for rejections. Use that as the minimum near-term check.

Verify:

- Image is visible, pending, or rejected.
- Logo displays correctly.
- Cover photo is accepted.
- Additional photos are accepted.
- No image uploaded to the wrong profile.
- No image was cropped into a misleading or ugly presentation.
- No policy warning appears.

If rejected:

- Document which image was rejected.
- Capture reason if visible.
- Check for policy, quality, text overlay, phone number, stock, copyright, privacy, or relevance issue.
- Route to human review before resubmitting.
- Do not automatically flip/edit/reupload just to bypass rejection.

### 10. Monthly Photo Freshness Audit

For recurring `GBP Audit and Image Post`, check:

- Last photo upload date.
- Current cover/logo state.
- Whether new seasonal/service photos are needed.
- Whether customer-uploaded photos are inaccurate or inappropriate.
- Whether old or bad client photos should be flagged for removal/replacement.
- Whether the photo gallery reflects current services and categories.
- Whether GBP posts need media from the same pool.

## Standard Output Format

Use this structure for ClickUp updates, upload packets, or audit logs:

```json
{
  "process": "33 - GBP Photo Management",
  "client": "Client Name",
  "clickup_source": "Additional Images",
  "profile": "Google Business Profile location",
  "scope": "Monthly refresh",
  "media": [
    {
      "file": "client-landscape-install-result-20260622.jpg",
      "type": "Project/result",
      "source": "Client-provided",
      "approved": true,
      "upload_status": "Live"
    }
  ],
  "logo_status": "Live",
  "cover_status": "Live",
  "additional_images_uploaded": 8,
  "rejection_check": "Checked after 10 minutes; no rejection visible",
  "training_video": "Imagify compression Loom used for image prep only",
  "handoffs": []
}
```

## QA Checklist

- [ ] ClickUp `Logo` checked when logo work is in scope.
- [ ] ClickUp `Cover Photo` checked when cover work is in scope.
- [ ] ClickUp `Additional Images` checked when gallery work is in scope.
- [ ] `1. GBP Audit and Image Post` checked for recurring refresh.
- [ ] Process 29 profile/access context checked.
- [ ] Process 30 category/service fit checked.
- [ ] Client media source identified.
- [ ] Image rights/approval confirmed.
- [ ] Stock images excluded unless explicitly approved for a non-cover use case.
- [ ] Phone numbers/text-heavy overlays excluded.
- [ ] Blurry/low-quality/duplicate images removed.
- [ ] Wrong-client images removed.
- [ ] Privacy/copyright risks checked.
- [ ] Logo is square, clean, and uncluttered.
- [ ] Cover photo is real, high quality, and client-provided.
- [ ] 5-10 additional approved images selected when available.
- [ ] Files renamed and compressed without visible quality loss.
- [ ] Uploaded to the correct GBP profile/location.
- [ ] Upload status checked after publish.
- [ ] Rejection check performed after at least 10 minutes.
- [ ] Rejected media documented and escalated before resubmission.
- [ ] ClickUp has final status, proof, and blockers.

## Completion Criteria

Process 33 is complete only when:

- The required media scope is clear: logo, cover, additional photos, or monthly audit.
- Images are sourced from approved client media or an approved internal source.
- Bad/risky image candidates are excluded.
- Logo and cover photo meet ClickUp requirements when in scope.
- Additional images are uploaded or a missing-photo blocker is documented.
- Upload status is verified after upload.
- Rejections are documented and routed to a human before retry.
- ClickUp or the upload log contains proof and final status.

## Common Mistakes

- Uploading stock photos as cover or general profile proof.
- Uploading images with phone numbers or promo text.
- Reusing the same generic images across clients.
- Uploading blurry, cluttered, or wrong-client images.
- Treating generated images as real client project photos.
- Ignoring Google rejection status.
- Automatically reuploading rejected photos without diagnosing the issue.
- Forgetting logo/cover require different quality decisions than gallery photos.
- Marking the task complete without proof of live/pending/rejected status.

## Internal Handoffs

| Finding | Handoff |
|---|---|
| GBP access or profile ownership issue | Process 29 - GBP Profile Build & Completion |
| Photos do not match services/categories | Process 30 - GBP Categories / services audit |
| Photo should support a weekly post | Process 31 - Weekly GBP Posts |
| Website image alt text/naming needs work | Process 06 - Alt Text on Images |
| Product/service photo needed | `Add "Products"` / `Add "Services"` |
| Client lacks approved real photos | Account manager/client photo request |
| Rejected or inappropriate media | Human review and Google policy path |

## References

| Reference | Notes |
|---|---|
| Google manage Business Profile photos & videos docs | Official upload and guideline context. |
| Google Business Profile photos/videos policy | Media policy and additional criteria. |
| Google Business Profile upload media docs | API upload from URL or bytes. |
| Google Business Profile media resource docs | MediaItem and media upload methods. |
| ClickUp `Logo` | Internal logo rules. |
| ClickUp `Cover Photo` | Internal cover photo rules. |
| ClickUp `Additional Images` | Internal gallery/photo upload rules. |
| Imagify Loom | Supporting compression/prep reference only. |
| Process 29 | GBP access and profile guardrails. |
| Process 31 | GBP post media handoff. |

---

*Part of the [SEO Command Center](../../README.md) - Lawn & Land Marketing*

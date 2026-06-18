# Alt Text on Images

**Category:** On-Page SEO
**Automation Readiness Score:** 9/10 — 🚀 Near-full automation
**Status:** ✅ Documented

---

## Purpose

Alt text helps screen readers, image fallback states, and search engines understand meaningful images on a page.

For Lawn & Land clients, alt text should describe the actual visual while naturally supporting the page topic, service, and location when that context is truthful. It is not a place to stuff keywords, invent local proof, describe the filename, or leak AI prompt language.

The goal is simple:

- Every meaningful image has useful alternative text.
- Featured images and inline body images are reviewed before close-out.
- Alt text describes what is actually visible.
- SEO context is included only when it fits naturally.
- Decorative images are handled intentionally instead of accidentally left blank.
- Prompt instructions, workflow notes, filenames, and generic labels never appear in public metadata.

## Current State

Alt text already appears inside several production workflows:

- Blog creation requires featured image alt text at image generation and upload.
- Blog optimization requires every assigned or inserted image to have appropriate alt text.
- Service page and service-area SOPs require image notes and alt text guidance.
- WordPress publishing work usually touches featured images, inline images, Media Library fields, and sometimes page-builder image widgets.

The missing piece is a standalone process for auditing, generating, applying, and verifying alt text across a site.

## Target State

Every active SEO client should have a repeatable image-alt process that can run during publishing, launch QA, and retroactive audits.

The ideal system:

1. Crawls all indexable pages and posts.
2. Extracts meaningful image URLs, attachment IDs when available, current alt text, captions, surrounding copy, and page context.
3. Flags missing, generic, duplicated, stuffed, irrelevant, or prompt-leaked alt text.
4. Uses the actual image and page context to generate concise replacement alt text.
5. Separates safe bulk updates from human-review images.
6. Updates the correct field: HTML `alt`, WordPress attachment alt, page-builder image alt, or manifest metadata depending on the site.
7. Verifies the live page and WordPress source after edits.

## Automation Score

**9/10 — Near-full automation**

Most of the process can be automated:

- Crawling pages for image tags.
- Finding missing or weak `alt` attributes.
- Pulling WordPress attachment metadata with WP-CLI.
- Matching images to pages, posts, featured image IDs, and inline placements.
- Using image understanding to describe visible content.
- Checking for keyword stuffing, duplicate alt text, filenames, and AI prompt leakage.
- Producing bulk update commands or page-edit recommendations.

It is not a 10/10 because some image meaning depends on human context: real client photos, brand identity, service accuracy, local claims, decorative images, logos, awards, before/after galleries, and page-builder-specific fields.

## When This Process Runs

| Trigger | What Happens |
|---|---|
| New blog post | Generate/upload a featured image with descriptive alt text before publishing. |
| Blog optimization | Verify featured and inline images have useful, relevant alt text before closing the row. |
| Service page build | Add alt text guidance for hero, service, process, gallery, and trust images. |
| Service-area page build | Add truthful local/service context only when the image and page support it. |
| Image upload | Add Media Library alt text at upload time instead of leaving cleanup for later. |
| Retroactive audit | Crawl the site and fix missing, generic, duplicated, stuffed, or irrelevant alt text. |
| Image replacement | Re-check alt text whenever an image asset changes. |

## Inputs

| Input | Used For |
|---|---|
| Page and post URLs | Locate images on live pages. |
| WordPress media library | Find attachment IDs, current alt text, captions, and featured image assignments. |
| Page HTML | Extract image tags, current alt attributes, lazy-loaded sources, and surrounding context. |
| Image files or URLs | Understand what is actually visible. |
| Page title, H1, URL, and body copy | Add truthful service/page context. |
| Keyword map | Use keywords naturally when they match the image and page. |
| Client brand references | Confirm real logos, uniforms, trucks, and project photos. |
| Image manifest files | Update managed static-site image metadata where used. |

## Image Classification

Classify each image before writing alt text.

| Image Type | Examples | Alt Text Rule |
|---|---|---|
| Featured image | Blog or page featured image | Must have descriptive alt text in the attachment metadata. |
| Hero image | Top page banner or service visual | Usually meaningful; describe the service/result/location if truthful. |
| Inline body image | Image inserted into article content | Must describe the visible content and match the surrounding topic. |
| Service card image | Image for a service tile or page section | Describe the service/result shown, not just the card title. |
| Gallery/project image | Portfolio, before/after, project photo | Describe the visible project accurately; avoid invented details. |
| Logo | Company logo or partner logo | Use brand/logo alt when meaningful; decorative logos may need empty alt depending on implementation. |
| Icon | Decorative UI icon | Usually decorative; do not force SEO alt text. |
| Background image | CSS background or decorative hero layer | Add accessible text elsewhere when the image carries meaning. |
| Tracking/spacer image | Pixel, preload, placeholder | Should not receive SEO alt text. |

## Workflow

### 1. Define the Run Type

Classify the request first.

| Run Type | Primary Goal |
|---|---|
| Publish support | Ensure new featured and inline images have alt text before publishing. |
| Existing post optimization | Fix image alt text as part of the content optimization pass. |
| Service/page build | Add image notes and alt text guidance before final QA. |
| Sitewide audit | Find and prioritize all missing or weak alt text across the site. |
| Image replacement | Update alt text to match the new asset, not the old one. |
| Static-site image pass | Update HTML attributes and image manifests together. |

### 2. Crawl Image Inventory

Collect the live image inventory from each target URL.

Capture:

- Page URL
- Page title and H1
- Image source URL
- Responsive/lazy source if different
- Current `alt` attribute
- Attachment ID if WordPress exposes it
- Featured image status if applicable
- Caption text
- Surrounding heading or paragraph
- Image dimensions
- Whether the image appears visible or decorative
- Whether the same image is reused on multiple pages

Do not assume an image is the featured image because the filename looks similar. For WordPress posts, verify `_thumbnail_id` when featured image assignment matters.

### 3. Audit Current Alt Text

Flag any image where alt text is:

- Missing on a meaningful image.
- Empty when the image is not decorative.
- Generic, such as `image`, `blog image`, `lawn care`, `photo`, `landscaping`, or the filename.
- Keyword-stuffed.
- Duplicated across several different images.
- Describing the page topic instead of the actual visual.
- Describing a previous asset after the image was replaced.
- Irrelevant to the image.
- Making fake local, brand, certification, or service claims.
- Containing prompt instructions, workflow/status text, AI self-checks, or internal notes.
- Broken by escaped punctuation or special-character artifacts.

### 4. Generate Replacement Alt Text

Use the image first, then the page context.

Good alt text formula:

```text
[Specific visible subject] + [service/result context] + [truthful location or brand context when supported]
```

Examples:

| Image Context | Good Alt Text |
|---|---|
| Blog featured image for paver sealing | Freshly sealed paver driveway beside a landscaped Florida home. |
| Service page hero for lawn aeration | Lawn aeration plugs across a healthy residential turf area. |
| Service-area landscaping card | Finished front yard landscaping for a residential property in Fairfield County. |
| Client truck project photo | Branded landscape truck parked beside a completed planting bed. |
| Blog body image for outdoor lighting | Low-voltage landscape lights illuminating a stone walkway at dusk. |

Weak alt text:

- `lawn care`
- `IMG_2045.jpg`
- `best lawn care company near me`
- `click here`
- `AI-generated image showing approved final result`
- `professional landscaping service in every city we serve`

## Alt Text Rules

Alt text should:

- Describe the actual image accurately.
- Be concise, usually under 125 characters unless more detail is needed.
- Use natural language.
- Support the page topic when truthful.
- Include the service or location only when the image and page context support it.
- Be distinct when multiple images appear on the same page.
- Prioritize accessibility first and SEO second.
- Avoid repeating the same phrase across a gallery or service grid.

Alt text should not:

- Stuff keywords.
- Invent services, cities, credentials, awards, equipment, logos, or project details.
- Describe invisible intent, such as "high-converting SEO image."
- Use the filename as the alt text.
- Say "image of" or "picture of" unless it is needed for clarity.
- Include prompt text, workflow status, model names, or internal reasoning.
- Repeat page titles mechanically on every image.

## WordPress Implementation

For WordPress sites:

1. Use WP-CLI to identify posts/pages and image attachment IDs when possible.
2. Check featured image assignment with `_thumbnail_id`.
3. Update attachment alt text with the correct `_wp_attachment_image_alt` value.
4. Check inline/body image tags for hardcoded `alt` attributes.
5. Check page-builder image widgets where the alt text is stored outside post content.
6. Re-render or purge cache when needed.
7. Verify the live HTML and the Media Library/attachment metadata when possible.

Typical WP-CLI checks:

```bash
wp post meta get <post_id> _thumbnail_id
wp post meta get <attachment_id> _wp_attachment_image_alt
wp post meta update <attachment_id> _wp_attachment_image_alt "Descriptive alt text"
```

Do not close a blog optimization row if the featured image exists visually but the WordPress `_thumbnail_id` is empty or the assigned attachment has missing/generic alt text.

## Static Site Implementation

For static sites or managed image systems:

1. Update the `alt` or `aria-label` text in the page/template.
2. Update image manifest metadata when the repo uses one.
3. Keep managed filenames intact unless the image system explicitly allows renaming.
4. Verify that the live HTML uses the new text.
5. Re-check that the visible image matches the alt text after deployment.

## What Gets Automated

Koga can:

- Crawl pages and extract image inventory.
- Detect missing, empty, generic, duplicated, stuffed, or leaked alt text.
- Pull WordPress attachment IDs and metadata.
- Use visual/image understanding to draft accurate alt text.
- Compare image topic against page/service topic.
- Generate bulk update commands or patch static files.
- Update metadata when authorized.
- Verify live HTML after edits.
- Produce a before/after audit log.

## What Stays Human

Humans approve or handle:

- Ambiguous project photos.
- Real client photos where identity, property, or brand details matter.
- Images involving people, crews, vehicles, logos, signage, certifications, or awards.
- Decorative-vs-meaningful decisions in complex layouts.
- Page-builder widgets that cannot be safely edited programmatically.
- Any alt text that could imply a service, location, or result the client cannot truthfully claim.
- Large retroactive batches before live publishing.

## QA Checklist

- [ ] Target pages or posts were crawled.
- [ ] Featured image assignment was checked when working on blog posts.
- [ ] Meaningful images have non-empty alt text.
- [ ] Decorative images are intentionally handled.
- [ ] Alt text describes the actual image, not just the keyword.
- [ ] Service and location context is truthful.
- [ ] Alt text is concise, natural, and not keyword-stuffed.
- [ ] Multiple images on the same page have distinct alt text.
- [ ] No filenames, prompt text, workflow notes, AI reasoning, or internal status text appear in alt text.
- [ ] WordPress attachment metadata was updated when applicable.
- [ ] Inline/body image attributes were checked when applicable.
- [ ] Page-builder or manifest metadata was checked when applicable.
- [ ] Live HTML was verified after implementation.

## Output Format

For each run, produce:

```json
{
  "client": "Client Name",
  "run_type": "sitewide_alt_text_audit",
  "crawl_date": "YYYY-MM-DD",
  "summary": {
    "pages_checked": 0,
    "images_checked": 0,
    "missing_alt": 0,
    "weak_alt": 0,
    "updates_recommended": 0,
    "updates_completed": 0
  },
  "recommendations": [
    {
      "page_url": "https://example.com/blog/topic/",
      "image_url": "https://example.com/wp-content/uploads/image.jpg",
      "attachment_id": 123,
      "current_alt": "",
      "recommended_alt": "Freshly sealed paver driveway beside a landscaped Florida home.",
      "reason": "Featured image is meaningful and currently missing alt text.",
      "implementation_type": "wordpress_attachment_meta",
      "human_gate": false
    }
  ],
  "completed_updates": [
    {
      "page_url": "https://example.com/blog/topic/",
      "image_url": "https://example.com/wp-content/uploads/image.jpg",
      "new_alt": "Freshly sealed paver driveway beside a landscaped Florida home.",
      "verified_live": true
    }
  ]
}
```

## Completion Criteria

The process is complete when:

- The target image inventory has been reviewed.
- Every meaningful featured and inline image has appropriate alt text.
- Decorative images have been intentionally handled.
- Weak, generic, duplicated, stuffed, irrelevant, or leaked alt text has been corrected or logged.
- Human-review items are clearly separated.
- Live pages or WordPress metadata have been verified after edits.
- The task record includes what changed, what remains, and what should be reviewed next.

## Common Mistakes

- Writing alt text for the keyword instead of the image.
- Leaving the featured image visually present but missing its WordPress attachment alt.
- Guessing the featured image asset by filename instead of checking `_thumbnail_id`.
- Reusing the same alt text across every image in a gallery.
- Adding fake city names because the page is a service-area page.
- Describing AI prompt intent instead of visible image content.
- Leaving old alt text after replacing an image.
- Treating decorative icons like SEO image targets.
- Closing the task without checking the live HTML.

## Source References

| Source | Relevant Rules |
|---|---|
| `BLOG-CREATION-PROCESS.md` | Requires featured image generation with descriptive, naturally keyword-relevant alt text entered in the Media Library. |
| `OPTIMIZATION-PROTOCOL.md` | Requires featured and inline image alt text, service-to-image accuracy, no generic/stuffed alt, and no prompt leakage. |
| `deliverables/on-page/02-service-pages/README.md` | Requires service page image planning and non-stuffed alt text guidance. |
| `deliverables/on-page/03-service-area-pages/README.md` | Requires service-area image planning with truthful local context. |
| `deliverables/on-page/04-blog-content/README.md` | Requires featured image generation/upload, alt text, and live verification during blog publishing. |

---

*Part of the [SEO Command Center](../../README.md) · Lawn & Land Marketing*

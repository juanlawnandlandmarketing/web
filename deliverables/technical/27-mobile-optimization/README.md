# Mobile Optimization

**Category:** Technical SEO
**Automation Readiness Score:** 7/10 - Highly automatable
**Status:** SOP documented

---

## Purpose

Process 27 verifies that priority pages work cleanly for mobile users and for Google's mobile-first crawling/indexing model. The goal is not just "the page fits on a phone." The page must preserve the same important content, links, schema context, media, calls to action, and conversion paths users and Google can access on desktop.

This process is a mobile-first QA workflow:

- Test priority URLs at mobile viewports.
- Confirm mobile content parity with desktop.
- Check navigation, CTAs, phone links, forms, maps, galleries, accordions, and sticky elements.
- Catch horizontal overflow, overlapping content, hidden content, unreadable text, poor spacing, and broken layout sections.
- Verify tap targets and spacing.
- Confirm CSS, JavaScript, and image resources are crawlable/renderable.
- Document screenshots and issue locations.
- Route performance findings to Process 26 and indexing/canonical findings to the right technical SOP.

## Current State

Process 27 is represented in ClickUp by:

- Parent task `2. Mobile Usability`.
- Subtask `Mobile test`.

Related tasks that inform this SOP:

- `4. Page Speed & Performance`
- `Page Speed & Performance Verification`
- `2. SEO Audit Ahrefs`
- `Introduction to Ahrefs Health Score and Site Audit`
- `7. GSC Indexing Audit`
- `3. SEO Images Optimization`
- `Optimice images using smush`

The ClickUp mobile task does not currently expose detailed operating notes or a process video. This SOP turns the task into a repeatable workflow that reflects current Google behavior: mobile-first indexing is complete, the old Search Console Mobile Usability report and Mobile-Friendly Test are retired, and mobile QA now needs a mix of rendered testing, Lighthouse/PageSpeed checks, Search Console context, real-device spot checks, and human layout judgment.

## Target State

Every mobile optimization review should produce:

1. Priority URL list and reason for selection.
2. Mobile viewport screenshots for each tested URL.
3. Desktop-vs-mobile content parity notes.
4. Mobile layout issue list by URL and viewport.
5. Tap target, font/readability, CTA, form, navigation, and sticky element checks.
6. Resource access notes for CSS, JavaScript, images, fonts, and embedded content.
7. Performance issues routed to Process 26.
8. Indexing, canonical, sitemap, robots.txt, or redirect issues routed to the matching technical process.
9. Human/dev implementation packet when fixes are needed.
10. Post-fix screenshots and verification notes.

The final output should make it obvious whether the client site is usable on mobile, whether the mobile version preserves SEO-critical content, and what needs to be fixed before the task can be closed.

## Automation Score

**7/10 - Highly automatable**

Koga can automate most discovery and evidence capture:

- Crawl priority URLs.
- Render pages at mobile viewport sizes.
- Capture screenshots.
- Detect horizontal overflow.
- Compare mobile and desktop text/link counts.
- Extract headings, metadata, canonical tags, schema, images, forms, phone links, and CTAs.
- Run PageSpeed Insights/Lighthouse mobile audits.
- Flag tap target, viewport, font-size, and crawl/resource problems exposed by available tooling.
- Group issues by page template.
- Prepare annotated fix packets and post-fix checks.

The score is not higher because final remediation often requires page-builder, theme, CSS, JavaScript, menu, form, map, tracking, and conversion judgment. Some issues only show on real devices or in client-specific conversion flows. Humans should approve layout changes that affect brand presentation, conversion elements, or visible copy.

## Training Video

No applicable Loom video for Process 27 was found in ClickUp list `901111072650`.

Checked sources:

- `2. Mobile Usability`
- `Mobile test`
- `4. Page Speed & Performance`
- `Page Speed & Performance Verification`
- `2. SEO Audit Ahrefs`
- `Introduction to Ahrefs Health Score and Site Audit`
- `7. GSC Indexing Audit`
- `3. SEO Images Optimization`
- `Optimice images using smush`
- Related mobile, usability, responsive, viewport, tap target, font size, PageSpeed, Core Web Vitals, Lighthouse, GSC, Ahrefs, Smush, image, and technical audit task names/descriptions
- Task comments for the matching mobile, speed, Ahrefs, and GSC tasks
- Attachments
- Custom fields
- Checklists
- Rich embed payloads
- Full-list Loom sweep across ClickUp list `901111072650`

Decision: do not include unrelated reporting, Looker Studio, citation, Whitespark, Signal GeNeSYS, backlink, sitemap, GSC-only, Rank Math setup, schema, robots.txt, redirects, GBP image, or old Imagify videos in this SOP. Add a video only if a real current mobile usability / mobile QA / responsive testing Loom is supplied or later appears in the ClickUp SOP list.

## Source References

Use ClickUp for internal workflow context and current Google/Chrome documentation for mobile-first and rendered mobile testing behavior.

| Source | Role in Process 27 |
|---|---|
| [`2. Mobile Usability`](https://app.clickup.com/t/868eegd5q) | Parent quarterly mobile usability task. |
| [`Mobile test`](https://app.clickup.com/t/868eh6qmn) | Mobile review subtask. |
| [`4. Page Speed & Performance`](https://app.clickup.com/t/868eegdv7) | Related monthly performance workflow. |
| [`Page Speed & Performance Verification`](https://app.clickup.com/t/868ehtkkn) | Performance verification subtask. |
| [`2. SEO Audit Ahrefs`](https://app.clickup.com/t/868eh43am) | Related technical audit source for mobile/technical issues. |
| [`7. GSC Indexing Audit`](https://app.clickup.com/t/868eege0q) | Related indexing source for mobile-rendered/indexed URL issues. |
| [`3. SEO Images Optimization`](https://app.clickup.com/t/868eeg057) | Related image workflow for mobile media problems. |
| [`Optimice images using smush`](https://app.clickup.com/t/868ejb8un) | Current image-compression support task. |
| [Google: Mobile-first indexing best practices](https://developers.google.com/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing) | Mobile content, metadata, resource, image, and structured data parity guidance. |
| [Google Search Central: Mobile-first indexing has landed](https://developers.google.com/search/blog/2023/10/mobile-first-is-here) | Confirms mobile-first indexing completion and common mobile failure types. |
| [Google Search Central: Page experience in Search](https://developers.google.com/search/blog/2023/04/page-experience-in-search) | Notes the retirement of Mobile Usability report/Mobile-Friendly Test and points toward broader page experience evaluation. |
| [Chrome DevTools: Simulate mobile devices with Device Mode](https://developer.chrome.com/docs/devtools/device-mode) | Viewport, throttling, device, screenshot, and remote-debugging guidance. |
| [Chrome Lighthouse: Tap targets are not sized appropriately](https://developer.chrome.com/docs/lighthouse/seo/tap-targets) | Tap target sizing and spacing rules. |
| [Google: Page experience in Search](https://developers.google.com/search/docs/appearance/page-experience) | User-experience context for mobile, HTTPS, intrusive interstitials, and Core Web Vitals. |
| [Google: About PageSpeed Insights](https://developers.google.com/speed/docs/insights/v5/about) | Mobile lab/field performance context when mobile issues overlap with speed. |
| `deliverables/technical/26-page-speed-core-web-vitals/README.md` | Performance workflow for speed-related mobile findings. |
| `deliverables/technical/22-google-search-console/README.md` | GSC workflow for indexing and URL Inspection follow-up. |
| `deliverables/technical/24-robots-txt/README.md` | Resource-blocking and crawl-rule follow-up. |
| `deliverables/technical/28-duplicate-content-canonicals/README.md` | Mobile/desktop duplicate or canonical issue follow-up. |

## Current Mobile Rules to Respect

As of this SOP:

- Google primarily crawls and indexes sites with its mobile crawler.
- The mobile version should contain the same important content as desktop.
- Mobile pages should expose the same meaningful titles, meta descriptions, headings, canonical signals, robots directives, structured data, internal links, images, videos, and primary conversion paths.
- CSS, JavaScript, images, and fonts needed for rendering should not be blocked by robots.txt.
- The old Search Console Mobile Usability report, Mobile-Friendly Test tool, and Mobile-Friendly Test API are retired.
- Use current tools: rendered browser checks, Chrome DevTools Device Mode, Lighthouse/PageSpeed mobile diagnostics, Search Console URL Inspection/Core Web Vitals context, Ahrefs/Screaming Frog/other audit data when available, and real-device checks when a high-value issue is uncertain.
- DevTools device mode is an approximation. Confirm high-risk findings on a real mobile device when the fix affects layout, forms, menus, maps, galleries, sticky bars, or conversion paths.
- Mobile optimization and Core Web Vitals overlap, but they are not the same process. Layout/usability issues stay here; speed/metric issues route to Process 26.

## When This Process Runs

| Trigger | What Happens |
|---|---|
| Quarterly fulfillment | Run standard mobile usability checks across priority pages. |
| New site launch | Verify mobile rendering before/after launch. |
| New template or page-builder update | Test affected page types and breakpoints. |
| New service/service-area/blog page | Confirm mobile readability, CTAs, links, images, and forms. |
| Theme/plugin/menu/form/gallery/map change | Check mobile regressions. |
| GSC/PageSpeed/Ahrefs mobile issue | Confirm the issue with rendered evidence and route fixes. |
| Client reports mobile problem | Reproduce on mobile viewport and real device if needed. |
| Conversion drop on mobile traffic | Audit mobile CTA, phone, form, map, page speed, and sticky behavior. |

## Required Inputs

| Input | Used For |
|---|---|
| Client domain | Mobile rendering and crawl checks. |
| Priority URL list | Homepage, service pages, service-area pages, blog index/posts, contact page, conversion pages. |
| Device/viewport set | Standard mobile breakpoints and any client-reported devices. |
| Desktop baseline screenshots | Content/layout comparison. |
| GSC access | URL Inspection, indexing, Core Web Vitals, and performance context. |
| PageSpeed/Lighthouse access | Mobile diagnostics and tap target hints. |
| Ahrefs/Screaming Frog audit data | Existing mobile/technical issue queue. |
| WordPress/admin/page-builder access | Needed for implementation when authorized. |
| Theme/plugin/form/map context | Helps diagnose layout and conversion issues. |
| Client conversion requirements | Protects phone calls, forms, booking widgets, maps, reviews, and tracking. |

## URL Selection

Test a representative set. Do not only test the homepage.

| URL Type | Why It Matters |
|---|---|
| Homepage | Most common first impression, menu, hero, CTA, and local trust layout. |
| Main service page | Core organic/conversion page. |
| Main service-area page | Local landing page template and city copy. |
| Blog index | Content navigation and card layout. |
| Recent or high-traffic blog post | Long-form content, tables, images, CTAs, and FAQs. |
| Contact page | Forms, phone links, maps, address, and conversion details. |
| Gallery/portfolio page | Image grids and lazy loading often break mobile layouts. |
| GBP/review page or landing page | Trust widgets, review embeds, and buttons. |
| Known issue URL | Client, Ahrefs, GSC, or PageSpeed reported issue. |

If many URLs use the same template, test representative examples and document template-level findings.

## Viewport Set

Use at least these viewport widths unless the client issue points to a specific device:

| Viewport | Purpose |
|---|---|
| 320px | Small-phone stress test. |
| 375px | Common iPhone-sized layout. |
| 390px / 393px | Modern common mobile width. |
| 414px / 430px | Large-phone layout. |
| 768px | Tablet/small breakpoint sanity check. |

Capture portrait screenshots by default. Use landscape only when the issue affects maps, galleries, forms, or reported device behavior.

## Workflow

### 1. Confirm Scope

Start from `2. Mobile Usability` and `Mobile test`.

Record:

- Client domain.
- Task trigger.
- Priority URL list.
- Viewports/devices to test.
- Known issue sources.
- Whether this is audit-only or implementation-ready.
- Who owns page-builder/theme/CSS fixes.

### 2. Collect Existing Issue Signals

Review available sources:

- ClickUp mobile task notes.
- PageSpeed mobile diagnostics.
- Ahrefs Site Audit mobile/HTML/CSS/JS issues.
- GSC URL Inspection and indexing notes.
- Core Web Vitals/mobile field issues.
- Client/user reports.
- Recent site changes.

Classify each signal:

| Signal Type | Route |
|---|---|
| Layout, readability, nav, sticky, form, CTA, tap target | Process 27 |
| LCP, INP, CLS, TTFB, render blocking, JS/CSS weight | Process 26 |
| Blocked CSS/JS/image resources | Process 24 plus Process 27 verification |
| Indexed/canonical/mobile alternate issue | Process 22 / 28 |
| Redirect chain or mobile URL redirect issue | Process 25 |
| Image compression/alt/image sizing | Process 06 / 26 as appropriate |

### 3. Render Mobile Screenshots

For each priority URL:

1. Open the page at the agreed mobile viewport.
2. Wait for layout, fonts, lazy images, embeds, and sticky elements to settle.
3. Capture the visible viewport.
4. Capture a full-page screenshot when possible.
5. Repeat at the small-phone viewport for high-value pages.
6. Save or attach screenshots to the issue packet.

Record:

- URL.
- Viewport width/height.
- Browser/tool.
- Date checked.
- Screenshot filename or attachment.
- Initial visual pass/fail.

### 4. Check Content Parity

Compare mobile against desktop for SEO-critical elements.

Confirm mobile includes:

- Primary H1 and main body content.
- Service descriptions.
- Service-area/local proof.
- FAQs when present.
- Internal links to important service, service-area, blog, contact, and trust pages.
- Images or galleries that support the page.
- Phone number, CTA buttons, contact form, booking widget, or map.
- Reviews/testimonials if they are part of the desktop page's trust proof.
- Schema source content when schema depends on visible page content.

Flag:

- Desktop content hidden or removed on mobile.
- "Read more" accordions that fail to open or are not crawlable/renderable.
- Mobile menus missing important links.
- Mobile footer missing NAP or GBP/review links.
- Mobile-only content that conflicts with desktop.
- Separate mobile URLs that do not match desktop content/canonicals.

### 5. Check Layout and Responsive Behavior

For each tested viewport, inspect:

- Horizontal scrolling.
- Text clipped or overflowing containers.
- Headings too large for cards/heroes.
- Buttons wrapping awkwardly or leaving the viewport.
- Cards stacking in the wrong order.
- Images stretched, cropped, distorted, or too tall.
- Gallery grids with tiny thumbnails or broken columns.
- Sticky headers covering anchors or form fields.
- Sticky call bars covering content or buttons.
- Popups, chat widgets, cookie bars, and promo bars blocking the page.
- Maps or embeds causing overflow.
- Tables or comparison blocks not scrollable or stacked.
- Accordions/tabs/carousels usable by touch.
- Mobile menu open/close behavior.

Treat any overlap, clipped CTA, unusable form, hidden phone number, or broken mobile menu as a high-priority issue.

### 6. Check Tap Targets and Readability

Use Lighthouse/PageSpeed diagnostics plus manual review.

Check:

- Buttons and links are large enough to tap.
- Adjacent tap targets have enough spacing.
- Body text is readable without zooming.
- CTA labels are visible and not truncated.
- Inline links in body copy do not cluster too tightly.
- Header menu, dropdown, hamburger, close, carousel, and form controls are usable.
- Phone numbers use `tel:` links where appropriate.
- Form inputs are large enough and not hidden by sticky elements or mobile keyboards.

Use Lighthouse tap target findings as evidence, but manually verify important conversion elements. A passing audit does not automatically mean the mobile page is comfortable to use.

### 7. Check Navigation and Conversion Paths

Run common mobile user paths:

| Path | Checks |
|---|---|
| Homepage to service page | Menu opens, service link exists, page loads, CTA visible. |
| Service page to contact | CTA/phone/form path works. |
| Service-area page to service | Local page links to relevant services and contact path. |
| Blog post to service | Internal links and CTA sections are usable. |
| Contact page form | Fields, dropdowns, submit button, validation, and success behavior are usable. |
| Phone CTA | Visible phone label and `tel:` href match approved number. |
| Map/directions | Map does not break layout; directions link works if present. |

Document conversion blockers separately from minor layout polish. Conversion blockers get higher priority.

### 8. Check Rendered SEO Elements

Extract rendered mobile output where possible:

- Title tag.
- Meta description.
- Canonical.
- Robots meta.
- H1.
- Major headings.
- Internal links.
- Structured data.
- Images and alt text.
- Lazy-loaded content.

Compare against desktop if there is any risk of content parity issues. If the rendered mobile page shows different canonical, robots directives, structured data, or missing content, route the issue to the matching technical SOP.

### 9. Check Resource Access

Confirm important rendering resources are not blocked or failing:

- CSS files.
- JavaScript files.
- Images.
- Fonts.
- Logo.
- Form assets.
- Map/embed scripts.
- Review widgets.

If robots.txt blocks theme, plugin, CSS, JS, image, or font paths needed to render the mobile page, route to Process 24 and document the mobile evidence here.

### 10. Separate Mobile UX From Performance

Mobile optimization often exposes speed issues. Route them cleanly:

| Finding | Process 27 Action | Process 26 Action |
|---|---|---|
| Sticky bar covers form button | Document/fix layout issue | Not primary |
| LCP hero image too large | Note mobile impact | Diagnose/fix in Process 26 |
| CLS from late-loading image | Capture screenshot/behavior | Diagnose/fix in Process 26 |
| Menu unusable because JS is blocked | Document mobile failure | Check resource/performance cause |
| Tap targets too close | Document/fix mobile UI | Not primary |
| Page feels slow due third-party scripts | Note user impact | Diagnose/fix in Process 26 |

Do not duplicate the full Core Web Vitals workflow in this SOP. Use Process 26 for metric diagnosis and remediation.

### 11. Build the Issue Packet

For each issue, include:

- URL.
- Viewport/device.
- Screenshot.
- Short issue label.
- Severity.
- Evidence.
- User/SEO impact.
- Suspected cause.
- Recommended fix.
- Owner.
- Related process route, if applicable.

Severity guide:

| Severity | Definition |
|---|---|
| Critical | Mobile page cannot be used, content is inaccessible, form/phone/menu broken, or Google cannot render important content. |
| High | Conversion path impaired, important content hidden, sticky elements block CTAs, or mobile content differs materially from desktop. |
| Medium | Layout/readability issue affects trust or comfort but does not block the user. |
| Low | Cosmetic issue with limited SEO/conversion impact. |

### 12. Human Approval and Implementation

Koga may prepare fixes when the repo/theme path is clear and authorized. Human review is required for:

- Page-builder layout changes.
- Theme/CSS changes with broad template impact.
- Menu restructuring.
- Sticky header/call bar changes.
- Form, booking, map, chat, or tracking changes.
- Copy edits that affect visible claims.
- Any change that could reduce conversion tracking, phone calls, lead capture, or client-approved design.

For WordPress/page-builder sites, prepare a clear implementation packet instead of guessing inside the builder:

- Page/template.
- Section/module.
- Current issue.
- Recommended adjustment.
- Screenshot.
- QA step after fix.

### 13. Post-Fix Verification

After fixes:

1. Re-test the exact URL and viewport.
2. Capture new screenshots.
3. Confirm the original issue is gone.
4. Confirm no new overlap, overflow, hidden content, or broken CTA was introduced.
5. Re-check the common conversion path.
6. Re-run Lighthouse/PageSpeed mobile only when the issue involved tap targets, viewport, fonts, or performance.
7. Update ClickUp with before/after evidence.

## Standard Output Format

Use this structure for ClickUp updates or handoff docs:

```json
{
  "process": "27 - Mobile Optimization",
  "client": "Client Name",
  "domain": "https://example.com",
  "trigger": "Quarterly mobile usability review",
  "clickup_source": "2. Mobile Usability",
  "urls_tested": [
    {
      "url": "https://example.com/",
      "viewports": ["320x812", "390x844", "430x932"],
      "status": "pass",
      "notes": "No mobile layout or conversion blockers found."
    }
  ],
  "issues": [
    {
      "url": "https://example.com/contact/",
      "viewport": "320px",
      "severity": "High",
      "issue": "Sticky call bar overlaps form submit button",
      "impact": "Mobile users may not be able to submit the form.",
      "recommended_fix": "Add bottom padding to form section or adjust sticky bar behavior.",
      "owner": "Human / web dev",
      "related_process": "Process 27"
    }
  ],
  "routed_items": [
    {
      "finding": "Hero image causes poor mobile LCP",
      "route": "Process 26 - Page Speed / Core Web Vitals"
    }
  ],
  "training_video": "No applicable Loom found in ClickUp list 901111072650",
  "status": "Needs fixes"
}
```

## QA Checklist

- [ ] Correct ClickUp task checked: `2. Mobile Usability`.
- [ ] `Mobile test` subtask checked.
- [ ] Related PageSpeed/Ahrefs/GSC signals reviewed.
- [ ] No unrelated Loom/video added.
- [ ] Priority URL list includes more than the homepage.
- [ ] Homepage tested on mobile.
- [ ] Main service page tested on mobile.
- [ ] Main service-area page tested on mobile when applicable.
- [ ] Blog/index/content page tested when applicable.
- [ ] Contact/conversion page tested on mobile.
- [ ] Small-phone viewport tested for priority pages.
- [ ] Screenshots captured.
- [ ] Horizontal overflow checked.
- [ ] Headings and body text are readable.
- [ ] Buttons and CTAs fit within viewport.
- [ ] Tap targets and spacing checked.
- [ ] Mobile menu opens, closes, and exposes important links.
- [ ] Phone CTAs are visible and use correct `tel:` links.
- [ ] Forms are usable and not blocked by sticky elements.
- [ ] Maps/embeds do not break layout.
- [ ] Sticky headers/bars do not cover content or controls.
- [ ] Popups/chat/cookie banners do not block the primary task.
- [ ] Mobile content parity checked against desktop.
- [ ] Mobile links and footer links checked.
- [ ] Rendered canonical, robots, H1, schema, and major content checked when parity risk exists.
- [ ] CSS/JS/image/font resource blocking checked when rendering looks broken.
- [ ] Speed/Core Web Vitals findings routed to Process 26.
- [ ] Robots/resource-blocking findings routed to Process 24.
- [ ] Canonical/indexing findings routed to Process 22 or 28.
- [ ] Redirect/mobile URL findings routed to Process 25.
- [ ] Issue packet includes URL, viewport, screenshot, severity, impact, fix, and owner.
- [ ] Post-fix screenshots captured before closing.
- [ ] ClickUp update reflects final status and remaining blockers.

## Completion Criteria

Process 27 is complete only when:

- Priority URLs have been tested at mobile viewports.
- Mobile screenshots are captured or attached.
- No critical mobile layout, nav, CTA, form, or content-access issue remains unresolved.
- Desktop-vs-mobile content parity has been checked for important content.
- Any resource blocking, indexing, canonical, redirect, image, or speed issue has been routed to the right process.
- Human/dev implementation packet exists for fixes that cannot be safely handled by Koga.
- Post-fix verification confirms the issue is resolved.
- ClickUp reflects the real final status.

## Common Mistakes

- Testing only the homepage.
- Treating a desktop screenshot resized in the browser as enough evidence.
- Forgetting 320px small-phone checks.
- Ignoring sticky headers, sticky call bars, chat widgets, and cookie banners.
- Checking PageSpeed score but not whether users can actually navigate, call, or submit a form.
- Assuming Mobile-Friendly Test or Search Console Mobile Usability report still exists.
- Hiding important SEO content on mobile to make the design cleaner.
- Letting the mobile menu omit service or contact links found on desktop.
- Blocking CSS/JS/image resources and then blaming the layout.
- Closing the task without screenshots.
- Mixing performance fixes into this SOP instead of routing them to Process 26.
- Ignoring real-device confirmation for high-risk conversion or layout bugs.

## Internal Handoffs

| Finding | Handoff |
|---|---|
| Mobile LCP, INP, CLS, heavy assets, third-party scripts | Process 26 - Page Speed / Core Web Vitals |
| Missing/weak image alt text | Process 06 - Alt Text on Images |
| Blocked CSS/JS/images/fonts | Process 24 - robots.txt |
| Indexed-vs-submitted or URL Inspection issue | Process 22 - Google Search Console |
| Bad redirects or mobile URL redirect issue | Process 25 - 301 Redirects |
| Duplicate/canonical/mobile alternate problem | Process 28 - Duplicate Content / Canonicals |
| Missing mobile internal links | Process 05 - Internal Linking |
| Broken title/meta/H1 on mobile-rendered output | Process 07 / Process 08 |

## References

| Reference | Notes |
|---|---|
| Google mobile-first indexing best practices | Use for mobile content, metadata, structured data, image/video, and resource parity. |
| Google mobile-first indexing completion announcement | Mobile crawler is the default reality for sites that work on mobile. |
| Google page experience update | Old mobile usability tools retired; mobile UX still matters. |
| Chrome DevTools Device Mode | Use for viewport simulation, screenshots, throttling, and limits of simulation. |
| Chrome Lighthouse tap target audit | Use for tap target evidence and spacing guidance. |
| Process 26 | Use for speed and Core Web Vitals findings. |
| ClickUp `2. Mobile Usability` | Internal task source for this process. |
| ClickUp `Mobile test` | Internal mobile test subtask. |

---

*Part of the [SEO Command Center](../../README.md) - Lawn & Land Marketing*

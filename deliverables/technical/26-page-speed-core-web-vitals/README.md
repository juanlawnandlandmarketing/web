# Page Speed / Core Web Vitals

**Category:** Technical SEO
**Automation Readiness Score:** 8/10 - Highly automatable
**Status:** SOP documented

---

## Purpose

Process 26 covers page speed and Core Web Vitals monitoring, diagnosis, prioritization, and fix handoff. The goal is to make sure client sites stay fast enough for users and search performance without chasing vanity scores or making risky theme/plugin changes blindly.

This process is a monthly evidence workflow:

- Measure real-user Core Web Vitals where available.
- Run lab diagnostics on priority URLs.
- Separate field data from lab data.
- Identify whether the issue is LCP, INP, CLS, server response, render blocking, images, JavaScript, CSS, fonts, cache, third-party scripts, or theme/plugin bloat.
- Prioritize fixes by SEO/conversion impact.
- Route implementation to the right human or technical owner.
- Verify after fixes and monitor trends.

## Current State

Process 26 is represented in ClickUp by:

- Parent task `4. Page Speed & Performance`.
- Subtask `Page Speed & Performance Verification`.

Related tasks that inform this SOP:

- `2. Mobile Usability`
- `Mobile test`
- `3. SEO Images Optimization`
- `Optimice images using smush`
- `2. SEO Audit Ahrefs`
- `Introduction to Ahrefs Health Score and Site Audit`
- `Issues definition`
- `7. GSC Indexing Audit`

The ClickUp speed task does not currently include detailed operating notes, tool instructions, or a video. This SOP turns that task into a repeatable workflow for PageSpeed Insights, Core Web Vitals, Lighthouse diagnostics, GSC/Core Web Vitals context, and practical implementation handoffs.

## Target State

Every monthly page-speed review should produce:

1. Priority URLs tested.
2. Mobile and desktop PageSpeed Insights results.
3. Field Core Web Vitals status when CrUX data exists.
4. Lab Lighthouse score and diagnostics.
5. Main bottleneck classification.
6. Recommended fixes ordered by impact and effort.
7. Human/dev/plugin/hosting owner assignment.
8. Post-fix verification.
9. ClickUp update with status and next action.

The system should focus on useful improvements, not chasing a perfect Lighthouse score at the expense of design, tracking, conversion, or site stability.

## Automation Score

**8/10 - Highly automatable**

Koga can automate most monitoring and diagnosis:

- Run PageSpeed Insights API checks.
- Pull Lighthouse lab metrics.
- Collect CrUX field metrics where available.
- Track LCP, INP, CLS, FCP, TTFB, TBT, and performance score over time.
- Compare mobile vs desktop.
- Detect slow templates, heavy images, render-blocking assets, oversized JS/CSS, third-party scripts, cache issues, and layout shifts.
- Build trend reports and issue queues.
- Re-test after fixes.

The score is not 10/10 because implementing fixes usually touches WordPress themes, Avada/page builders, plugins, hosting/cache/CDN, image pipelines, scripts, tracking tags, design/layout, or client-facing functionality. Those changes require human judgment and regression testing.

## Training Video

No applicable Loom video for Process 26 was found in ClickUp list `901111072650`.

Checked sources:

- `4. Page Speed & Performance`
- `Page Speed & Performance Verification`
- `2. Mobile Usability`
- `Mobile test`
- `3. SEO Images Optimization`
- `Optimice images using smush`
- `2. SEO Audit Ahrefs`
- `Introduction to Ahrefs Health Score and Site Audit`
- `Issues definition`
- Related speed, performance, PageSpeed, Core Web Vitals, Lighthouse, CrUX, LCP, INP, CLS, cache, image, Smush, mobile, and technical audit task names/descriptions
- Task comments
- Attachments
- Custom fields
- Checklists
- Rich embed payloads
- Full-list Loom sweep across ClickUp list `901111072650`

Decision: do not include unrelated reporting, Looker Studio, citation, Whitespark, Signal GeNeSYS, backlink, sitemap, GSC, Rank Math setup, schema, robots.txt, redirects, or press videos in this SOP. Also do not include the old Imagify image-compression Loom because Juan clarified Imagify is no longer used. Add a video only if a real current PageSpeed / Core Web Vitals / Smush / performance Loom is supplied or later appears in the ClickUp SOP list.

## Source References

Use ClickUp for internal workflow context and Google/web.dev documentation for current performance behavior.

| Source | Role in Process 26 |
|---|---|
| [`4. Page Speed & Performance`](https://app.clickup.com/t/868eegdv7) | Parent monthly fulfillment task. |
| [`Page Speed & Performance Verification`](https://app.clickup.com/t/868ehtkkn) | Verification subtask. |
| [`2. Mobile Usability`](https://app.clickup.com/t/868eegd5q) | Related quarterly mobile UX task. |
| [`Mobile test`](https://app.clickup.com/t/868eh6qmn) | Related mobile test subtask. |
| [`3. SEO Images Optimization`](https://app.clickup.com/t/868eeg057) | Related image optimization workflow. |
| [`Optimice images using smush`](https://app.clickup.com/t/868ejb8un) | Current image compression/support task. |
| [`2. SEO Audit Ahrefs`](https://app.clickup.com/t/868eh43am) | Related technical audit workflow. |
| [`7. GSC Indexing Audit`](https://app.clickup.com/t/868eege0q) | Related GSC URL prioritization context. |
| [web.dev: Web Vitals](https://web.dev/articles/vitals) | Current Core Web Vitals definitions, thresholds, and measurement guidance. |
| [Google: Page experience in Search](https://developers.google.com/search/docs/appearance/page-experience) | Search context for page experience and Core Web Vitals. |
| [Google: About PageSpeed Insights](https://developers.google.com/speed/docs/insights/v5/about) | Field data, lab data, PSI scoring, thresholds, and API context. |
| [Chrome UX Report overview](https://developer.chrome.com/docs/crux) | CrUX real-user dataset context. |
| [Optimize Largest Contentful Paint](https://web.dev/articles/optimize-lcp) | LCP diagnosis and optimization guidance. |
| [Optimize Interaction to Next Paint](https://web.dev/articles/optimize-inp) | INP diagnosis and optimization guidance. |
| [Optimize Cumulative Layout Shift](https://web.dev/articles/optimize-cls) | CLS diagnosis and optimization guidance. |
| `deliverables/on-page/06-alt-text/README.md` | Image inventory context. |
| `deliverables/technical/27-mobile-optimization/README.md` | Mobile UX follow-up process. |

## Current Core Web Vitals Rules to Respect

As of this SOP:

| Metric | Measures | Good Threshold |
|---|---|---|
| LCP | Loading performance | 2.5 seconds or less |
| INP | Interaction responsiveness | 200 milliseconds or less |
| CLS | Visual stability | 0.1 or less |

Use the 75th percentile of page loads, segmented across mobile and desktop, when evaluating real-user Core Web Vitals.

Important rules:

- Core Web Vitals are field metrics first.
- Lighthouse lab data is useful for debugging, but it is not a substitute for real-user field data.
- PageSpeed Insights can show URL-level field data, origin-level field data, or no field data depending on CrUX sample availability.
- A green Lighthouse score does not guarantee good real-user experience.
- A low Lighthouse score does not always mean the site is failing Core Web Vitals.
- Mobile performance usually matters most for local SEO workflows.
- INP replaced FID as a stable Core Web Vital in 2024.
- Total Blocking Time is a lab proxy for interactivity, not a field replacement for INP.
- Do not break tracking, forms, booking, calls, maps, galleries, or conversion elements just to gain points.

## When This Process Runs

| Trigger | What Happens |
|---|---|
| Monthly fulfillment | Run the standard speed/performance check and update ClickUp. |
| New site launch | Baseline homepage and priority page performance. |
| Template/theme update | Re-test affected page types. |
| Plugin/theme change | Check for new JS/CSS/rendering bloat. |
| Image-heavy page published | Verify images are compressed, sized, lazy-loaded, and not hurting LCP/CLS. |
| GSC/Core Web Vitals issue | Diagnose affected URL group and route fixes. |
| Ranking/traffic/conversion drop | Check if performance regression is part of the issue. |
| Mobile optimization process | Share mobile speed findings with Process 27. |

## Required Inputs

| Input | Used For |
|---|---|
| Client domain | PageSpeed and CrUX checks. |
| Priority URL list | Homepage, top service pages, top service-area pages, blog index, key posts, contact page. |
| Device focus | Usually mobile first, desktop secondary. |
| GSC access | Core Web Vitals report and URL grouping when available. |
| PageSpeed Insights access/API | Field and lab metrics. |
| WordPress/admin/hosting access | Needed for implementation, cache, plugin, or image fixes. |
| Theme/page builder context | Avada, Elementor, custom static build, etc. |
| Plugin inventory | Detects heavy/cache/image/script plugins. |
| Recent change history | Helps identify regressions. |
| Client conversion requirements | Protects forms, calls, booking widgets, maps, and tracking. |

## URL Selection

Test a representative sample, not only the homepage.

| URL Type | Why It Matters |
|---|---|
| Homepage | Brand/local entry point and common LCP template. |
| Main service page | Core organic/conversion page. |
| Main service-area page | Local landing template. |
| Blog index or recent post | Content template and image/inline asset behavior. |
| Contact page | Conversion page with forms/maps/scripts. |
| Slow page from GSC/Ahrefs | Known issue validation. |
| New or recently edited page | Regression check. |

If a template is shared across many URLs, document the template-level issue instead of testing 50 near-identical pages.

## Workflow

### 1. Confirm Scope

Start from `4. Page Speed & Performance` and `Page Speed & Performance Verification`.

Record:

- Client domain.
- Priority URL list.
- Whether this is monthly monitoring, launch QA, regression check, or issue diagnosis.
- Tools available.
- Recent site changes.
- Who owns implementation if fixes are needed.

### 2. Collect Field Data

Use PageSpeed Insights, CrUX, and GSC where available.

Capture for mobile and desktop:

- LCP.
- INP.
- CLS.
- FCP.
- TTFB when available.
- Field status: Good / Needs Improvement / Poor.
- Whether data is URL-level or origin-level.
- Whether field data is unavailable.
- Whether the page passes Core Web Vitals assessment.

If no field data exists, use lab diagnostics but label the finding as lab-only.

### 3. Run Lab Diagnostics

Use PageSpeed Insights / Lighthouse for each priority URL.

Capture:

- Performance score.
- LCP element.
- Render-blocking resources.
- Largest images.
- Unused CSS/JS.
- Third-party impact.
- Main-thread work.
- Total Blocking Time.
- Layout shift elements.
- Font/display issues.
- Server response time.
- Cache policy issues.
- Image format/size issues.

Run mobile first. Desktop is useful, but mobile is usually where client sites struggle.

### 4. Classify the Bottleneck

Assign each issue to a primary class:

| Class | Examples |
|---|---|
| Server/hosting | Slow TTFB, overloaded hosting, no cache, slow PHP/database. |
| Cache/CDN | Missing page cache, bad browser cache, CDN off or misconfigured. |
| Image/LCP | Oversized hero, wrong dimensions, no compression, lazy-loaded LCP image. |
| JavaScript/INP | Heavy page builder scripts, third-party tags, long tasks, blocking main thread. |
| CSS/render blocking | Large CSS, unused theme CSS, render-blocking stylesheets. |
| CLS/layout | Images without dimensions, font swap, late banners, embeds, dynamic content. |
| Third-party scripts | Chat widgets, maps, tracking tags, review widgets, video embeds. |
| Theme/page builder | Avada/Elementor/template bloat, duplicate sliders, animation-heavy sections. |
| Mobile UX overlap | Viewport, tap targets, sticky bars, interstitials, layout issues. |

### 5. Prioritize Fixes

Score recommendations by:

- Page importance.
- Metric severity.
- Impact on Core Web Vitals.
- Conversion risk.
- Implementation effort.
- Regression risk.
- Whether the issue affects one page or a template.
- Whether the issue is visible to users.

Prioritize fixes like:

- Compress/resize/replace LCP image.
- Preload critical hero image when appropriate.
- Stop lazy-loading above-the-fold hero images.
- Enable/repair page cache.
- Remove unnecessary third-party scripts.
- Delay non-critical JS.
- Reduce page-builder bloat where safe.
- Add image/video dimensions.
- Optimize fonts.
- Fix layout-shifting banners, sliders, embeds, or maps.
- Improve hosting/caching if TTFB is consistently poor.

### 6. Human Approval and Implementation Handoff

Humans approve or implement:

- Theme/page-builder changes.
- Plugin changes.
- Cache/CDN settings.
- Hosting changes.
- Script removal/defer/delay.
- Design/layout changes.
- Form, phone, booking, map, review widget, or tracking changes.
- Image replacement when client visuals or brand are affected.

Koga should provide a clear fix packet, not silently change risky performance settings.

### 7. Verify After Fixes

After fixes:

- Clear cache/CDN.
- Re-run PageSpeed Insights.
- Re-test affected URLs.
- Compare before/after lab metrics.
- Check visual rendering on mobile and desktop.
- Confirm forms, calls, maps, booking, tracking, galleries, and menus still work.
- Monitor field data later because CrUX/GSC updates lag.

Do not call a Core Web Vitals field issue resolved based only on one immediate lab run.

### 8. Update ClickUp

Update the `Page Speed & Performance Verification` task with:

- URLs tested.
- Mobile/desktop summary.
- Field data status.
- Lab score summary.
- Main issue classes.
- Recommended fixes.
- Owner.
- Blockers.
- Re-test date.
- Completion decision.

## What Gets Automated

Koga can:

- Run PageSpeed Insights checks.
- Pull CrUX/field data where available.
- Compare mobile and desktop results.
- Track monthly trends.
- Detect likely LCP/INP/CLS causes.
- Group problems by template.
- Prepare prioritized fix queues.
- Re-test after changes.
- Prepare before/after summaries.
- Flag when old image compression or plugin workflows no longer apply.

## What Stays Human

Humans handle:

- WordPress/page-builder/theme edits.
- Cache/CDN/hosting settings.
- Plugin install/remove/configuration.
- Script/tag removal or delay decisions.
- Design/layout changes that affect brand or conversion.
- Client-photo replacement decisions.
- Any change that might break forms, calls, maps, booking, tracking, reviews, or analytics.
- Final prioritization when speed conflicts with UX, reporting, ads, or client requirements.

## QA Checklist

Before marking Process 26 complete:

- [ ] Priority URL list selected.
- [ ] Mobile PageSpeed run completed.
- [ ] Desktop PageSpeed run completed when needed.
- [ ] Field data status captured or marked unavailable.
- [ ] URL-level vs origin-level field data noted.
- [ ] LCP, INP, and CLS status captured.
- [ ] Lab diagnostics captured.
- [ ] Main bottleneck class assigned.
- [ ] Recommendations are prioritized by impact and effort.
- [ ] Risky implementation items assigned to a human.
- [ ] Image optimization notes use current tools, not retired Imagify workflow.
- [ ] Related mobile issues routed to Process 27.
- [ ] Related image issues routed to Process 06 or image optimization task.
- [ ] Related hosting/cache/plugin issues assigned to the correct owner.
- [ ] Post-fix verification plan documented.
- [ ] ClickUp updated with results, owner, blockers, and next action.

## Output Format

Use this structure in ClickUp or the performance audit log:

```md
## Page Speed / Core Web Vitals Review - [Client]

Date:
URLs tested:
Device focus:

Field data:
- URL/origin level:
- LCP:
- INP:
- CLS:
- CWV assessment:

Lab data:
- Mobile score:
- Desktop score:
- Main diagnostics:

Issue classes:
- None.

Recommended fixes:
- [Priority] [Fix] [Owner] [Risk] [Expected impact]

Verification:
- Before:
- After:
- Follow-up field data date:

Next actions:
- None.
```

## Completion Criteria

Process 26 is complete when:

- Priority URLs have been tested.
- Mobile-first performance data is documented.
- Field vs lab data is clearly separated.
- Core Web Vitals status is captured or marked unavailable.
- Main bottlenecks are classified.
- Fixes are prioritized and assigned.
- Risky changes have a human owner.
- Post-fix re-test requirements are documented.
- ClickUp has the final performance summary and next action.

## Common Mistakes

- Treating Lighthouse score as the same thing as Core Web Vitals.
- Ignoring field data because a lab score looks good.
- Calling a field issue fixed immediately after one lab re-test.
- Testing only the homepage.
- Ignoring mobile.
- Lazy-loading the LCP hero image.
- Compressing images but leaving them oversized in layout.
- Removing scripts without checking forms, calls, maps, booking, tracking, or analytics.
- Chasing a perfect score when the real issue is user experience or conversion.
- Using retired Imagify instructions instead of current image optimization tooling.
- Forgetting that CrUX and GSC field data lag behind implementation.

---

*Part of the [SEO Command Center](../../README.md) - Lawn & Land Marketing*

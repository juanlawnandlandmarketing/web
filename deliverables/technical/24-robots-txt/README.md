# robots.txt

**Category:** Technical SEO
**Automation Readiness Score:** 10/10 - Fully automated
**Status:** Fully automated

---

## Purpose

Process 24 covers robots.txt review, configuration, deployment, validation, and monitoring. The Content Engine pipeline uses the target URL set, defined SEO strategy, platform routing, sitemap source, and live crawl checks to make sure each client site gives crawlers the right crawl instructions without accidentally blocking important pages, assets, sitemaps, or rendering resources.

This process is high-risk because a small text-file mistake can hide a large part of a site from crawling.

The goal is simple:

- Fetch the live robots.txt file.
- Confirm it exists at the correct host root.
- Confirm it is plain text and crawlable.
- Confirm important URLs are not blocked.
- Confirm resources needed for rendering are not blocked.
- Confirm the sitemap directive points to the live sitemap.
- Confirm robots.txt is not being used as a fake noindex tool.
- Route indexing, sitemap, canonical, and redirect issues to the right SOP.

## Current State

Process 24 is represented in ClickUp by:

- Parent task `13. Robots.txt File Managment`.
- Subtask `Robots.txt configuration`.

The `Robots.txt configuration` task contains a sample WordPress-oriented robots.txt comment:

```txt
User-agent: *
Disallow: /wp-admin/
Disallow: /wp-includes/
Disallow: /wp-content/plugins/
Disallow: /wp-content/cache/
Disallow: /wp-content/themes/
Disallow: /trackback/
Disallow: /comments/
Disallow: /xmlrpc.php
Disallow: /?s=

Allow: /wp-content/uploads/
Allow: /wp-admin/admin-ajax.php

# Sitemap location
Sitemap:
www.yourwebsite.com/sitemap_index.xml
```

Use that ClickUp comment as workflow context, not as a blind paste template. The final file must use the live client domain, the correct sitemap URL, and crawl rules that do not block files Google needs to render the site.

The Content Engine pipeline now owns the full standard robots.txt workflow. It selects the deployment path by platform, generates or updates the robots.txt file, validates the rules against the target URL set and SEO strategy, deploys through the approved technical route, verifies the live file, and routes exceptions when access or crawl-policy conflicts are detected.

## Target State

Every client should have a robots.txt record that explains:

1. The live robots.txt URL.
2. Whether robots.txt is served from the correct host root.
3. Whether the file is accessible and valid.
4. Which crawl blocks are intentional.
5. Which important pages or resources were tested against the rules.
6. Which sitemap URL is declared.
7. Whether GSC robots.txt testing/reporting shows issues.
8. Which follow-up SOP owns each issue.

## Automation Score

**10/10 - Fully automated**

Process 24 is fully automated in the Content Engine pipeline. Platform-specific routing controls how the robots.txt file is generated, deployed, validated, and monitored:

- Vercel + GitHub stacks: the pipeline uses the target URL inventory and defined SEO strategy to generate or update the repo-owned robots.txt file, validate the plaintext output, ship through GitHub/Vercel, and verify the deployed `/robots.txt` file.
- WordPress sites: the pipeline programmatically loads the generated plaintext `robots.txt` file directly into the SiteGround HTML root folder of the website using FTP, then verifies the live file from the production host.

The pipeline automates:

- Fetching `/robots.txt`.
- Parsing `User-agent`, `Allow`, `Disallow`, and `Sitemap` lines.
- Detecting sitewide blocks like `Disallow: /`.
- Detecting missing, malformed, old-domain, or placeholder sitemap directives.
- Testing whether priority URLs match disallow rules.
- Comparing robots blocks against sitemap URLs.
- Flagging blocked CSS, JS, image, upload, service, blog, or conversion paths.
- Generating the deployment-ready robots.txt file.
- Deploying through Vercel + GitHub or WordPress + SiteGround FTP routing.
- Verifying the live plaintext file after deployment.
- Preparing ClickUp summaries and exception packets.

No routine human gate is required for standard robots.txt production. Human review is exception-only for missing platform access, conflicting crawl strategy, staging/privacy uncertainty, emergency bot-control decisions, or rules that cannot be resolved from the approved SEO strategy.

## Platform Routing

| Platform | Automated Execution Path | Notes |
|---|---|---|
| Vercel + GitHub stack | Generate or update the repo-owned robots.txt file from the target URL inventory and defined SEO strategy, validate the plaintext file locally, push through GitHub, and verify `/robots.txt` after Vercel deployment. | Correct route for headless/static web deployments. |
| WordPress on SiteGround | Generate the plaintext robots.txt file and programmatically load it by FTP into the website's HTML root folder on SiteGround, then fetch the live file to verify output. | Correct route for WordPress sites when the physical root file is the source of truth. |
| WordPress plugin-managed robots.txt | Use only when the plugin is explicitly the approved source of truth. | If a root file and plugin conflict, route an exception before deployment. |
| Legacy/custom hosting | Deploy to the approved public web root or server-managed source of truth. | Treat as an exception path and document the deployment target. |

## Standard WordPress robots.txt Structure

For WordPress sites that use the standard SiteGround HTML-root deployment path, generate this plaintext structure and replace `https://clientdomain/sitemap.xml` with the client's approved sitemap URL:

```txt
User-agent: *
Disallow: /wp-admin/
Disallow: /wp-includes/
Disallow: /wp-content/plugins/
Disallow: /wp-content/cache/
Disallow: /wp-content/themes/
Disallow: /trackback/
Disallow: /comments/
Disallow: /xmlrpc.php
Disallow: /?s=

Allow: /wp-content/uploads/
Allow: /wp-admin/admin-ajax.php

# Sitemap location
Sitemap: https://clientdomain/sitemap.xml
```

After deployment, the pipeline must verify that the live robots.txt file is plaintext, uses the real client sitemap URL, and does not block the target URLs required by the approved SEO strategy.

## Training Video

No applicable Loom video for Process 24 was found in ClickUp list `901111072650`.

Checked sources:

- `13. Robots.txt File Managment`
- `Robots.txt configuration`
- Related `9. Sitemap` and `Sitemap generation and submit to GSC` tasks
- Related `7. GSC Indexing Audit` tasks
- Related robots, crawl, crawler, disallow, allow, sitemap, indexing, noindex, and technical SEO task names/descriptions
- Task comments
- Attachments
- Custom fields
- Checklists
- Rich embed payloads
- Full-list Loom sweep across ClickUp list `901111072650`

Decision: do not include unrelated reporting, Looker Studio, Imagify, citation, Whitespark, Signal GeNeSYS, backlink, sitemap, GSC, Rank Math setup, schema, or press videos in this SOP. Add a video only if a real robots.txt / crawl management Loom is supplied or later appears in the ClickUp SOP list.

## Source References

Use ClickUp for the internal task flow and Google documentation for current robots.txt behavior.

| Source | Role in Process 24 |
|---|---|
| [`13. Robots.txt File Managment`](https://app.clickup.com/t/868eeg13a) | Parent one-time fulfillment task. |
| [`Robots.txt configuration`](https://app.clickup.com/t/868eh476p) | Subtask containing the working sample robots.txt comment. |
| [`9. Sitemap`](https://app.clickup.com/t/868eeg0x1) | Related sitemap source. |
| [`Sitemap generation and submit to GSC`](https://app.clickup.com/t/868eh5g9x) | Related sitemap URL handoff. |
| [`7. GSC Indexing Audit`](https://app.clickup.com/t/868eege0q) | Related indexing audit context. |
| [Google: Introduction to robots.txt](https://developers.google.com/search/docs/crawling-indexing/robots/intro) | Current crawl-vs-indexing limitations and use cases. |
| [Google: Create and submit a robots.txt file](https://developers.google.com/crawling/docs/robots-txt/create-robots-txt) | File location, format, rule basics, testing, and submission behavior. |
| [Google: robots.txt specification interpretation](https://developers.google.com/crawling/docs/robots-txt/robots-txt-spec) | Rule matching, groups, `Allow`, `Disallow`, and `Sitemap` behavior. |
| [Google: Block indexing with noindex](https://developers.google.com/search/docs/crawling-indexing/block-indexing) | Why noindex needs crawl access and is not a robots.txt rule. |
| [Google Search Console robots.txt report](https://support.google.com/webmasters/answer/6062598) | Robots.txt validation and cached file refresh workflow. |
| `deliverables/technical/20-rank-math-setup/README.md` | WordPress/Rank Math baseline context. |
| `deliverables/technical/22-google-search-console/README.md` | GSC issue review and URL Inspection handoff. |
| `deliverables/technical/23-xml-sitemap/README.md` | Sitemap directive and sitemap URL validation. |
| `deliverables/technical/25-301-redirects/README.md` | Redirect issues found during robots testing. |
| `deliverables/technical/28-duplicate-content-canonicals/README.md` | Canonical/noindex decisions that robots.txt should not fake. |

## Current robots.txt Rules to Respect

- robots.txt tells crawlers which URLs they may crawl. It is not a reliable way to keep a page out of search results.
- A blocked URL can still appear in Google if other pages link to it.
- To keep an HTML page out of Google, use `noindex` or password protection instead of robots.txt.
- For `noindex` to work, Google must be allowed to crawl the page and see the tag or header.
- The file must be named `robots.txt` and live at the root of the host it controls.
- Rules apply only to the protocol, host, and port where the file is posted.
- The file should be UTF-8 plain text.
- If no rule blocks a URL, crawling is allowed by default.
- Rules are case-sensitive.
- Google supports `User-agent`, `Allow`, `Disallow`, and `Sitemap` fields.
- `Sitemap:` must use a fully qualified URL with protocol and host.
- Blocking CSS, JavaScript, theme, plugin, image, or upload paths can make it harder for Google to render and understand pages.

## When This Process Runs

| Trigger | What Happens |
|---|---|
| New site launch | Confirm robots.txt does not block production pages and points to the live sitemap. |
| Staging-to-live transition | Remove staging/no-crawl rules before launch. |
| Rank Math setup | Confirm sitemap output and robots.txt handoff. |
| Sitemap update | Confirm `Sitemap:` directive points to the live sitemap index. |
| GSC indexing issue | Test whether priority URLs are blocked by robots.txt. |
| Site migration | Remove old-domain sitemap directives and stale crawl blocks. |
| Technical SEO audit | Review crawl rules, risky directives, and blocked resources. |
| Emergency bot-control issue | Prepare a human-approved crawler management change. |

## Required Inputs

| Input | Used For |
|---|---|
| Client domain and canonical host | Determines the exact `/robots.txt` URL to fetch. |
| Sitemap URL | Required for the `Sitemap:` directive. |
| CMS/platform | Determines whether robots.txt is file-based, virtual, plugin-managed, or hosting-managed. |
| WordPress admin, WP-CLI, hosting, or repo access | Needed when the approved source of truth uses CMS, hosting, server, or repo-managed robots.txt output. |
| GitHub repo access for Vercel stacks | Generates, updates, validates, and ships repo-owned robots.txt files. |
| Vercel deployment state | Confirms deployed robots.txt output after merge/deploy for Vercel + GitHub stacks. |
| SiteGround FTP access for WordPress sites | Loads the generated plaintext robots.txt file into the website HTML root folder. |
| HTML root folder path | Confirms the public directory where WordPress robots.txt must be stored. |
| Important URL list | Tests whether priority pages are blocked. |
| Important asset paths | Tests whether CSS, JS, images, uploads, and rendering resources are blocked. |
| GSC access | Validates robots.txt report, URL Inspection, and crawling status. |
| Launch/staging status | Prevents accidental no-crawl rules from going live. |
| Approved crawl-block goals | Confirms what should actually be blocked. |

## robots.txt Source of Truth

Identify where robots.txt is controlled before changing anything.

| Site Type | Likely Source | Notes |
|---|---|---|
| WordPress with Rank Math | WordPress virtual/file editor or server file | Confirm whether Rank Math edits the file or only exposes a helper UI. |
| WordPress without direct file access | SEO plugin, CMS settings, or hosting panel | Do not assume a physical file exists. |
| Vercel + GitHub static/custom site | Repo file or build/deploy output | Update the repo source from target URLs and SEO strategy, not only the deployed artifact. |
| WordPress on SiteGround | Physical `robots.txt` in the website HTML root folder | Deploy programmatically by FTP when this is the approved source of truth. |
| Server-managed site | Hosting, Nginx/Apache config, or root file | Requires careful deployment/rollback path. |
| Staging site | Hosting/CMS noindex/no-crawl controls | Make sure staging rules do not leak to production. |

## Recommended Baseline

For Vercel + GitHub stacks, generate robots.txt from the target URL inventory and defined SEO strategy. The file should declare the live sitemap URL and avoid crawl blocks that conflict with the approved indexable URL set.

For WordPress production sites using the SiteGround HTML-root deployment path, use the standard WordPress structure in this SOP unless the approved SEO strategy requires a narrower rule set.

For conservative WordPress exceptions, the minimum fallback is:

```txt
User-agent: *
Disallow: /wp-admin/
Allow: /wp-admin/admin-ajax.php

Sitemap: https://www.example.com/sitemap_index.xml
```

Add more disallow rules only when there is a clear crawl-management reason and the affected URLs/resources have been tested.

Do not blindly add broad blocks for `/wp-includes/`, `/wp-content/plugins/`, `/wp-content/themes/`, or `/wp-content/cache/` without verifying that Google does not need those resources to render important pages.

## Workflow

### 1. Confirm the Task Scope

Start from `13. Robots.txt File Managment` and `Robots.txt configuration`.

Record:

- Client domain.
- Canonical host and protocol.
- Site platform.
- robots.txt source of truth.
- Platform route: Vercel + GitHub, WordPress + SiteGround FTP, plugin-managed WordPress, or exception path.
- Target URL inventory and defined SEO strategy.
- HTML root folder path when using SiteGround FTP.
- Sitemap URL from Process 23.
- Whether this is launch setup, audit, issue investigation, or emergency bot-control work.
- Exception owner for access, crawl-policy, or source-of-truth conflicts.

### 2. Fetch the Live robots.txt File

Fetch the exact file:

```txt
https://clientdomain.com/robots.txt
```

Check:

- HTTP status.
- Redirects.
- Content type.
- Plain-text output.
- Whether it is accessible publicly.
- Whether it is production or staging.
- Whether the file contains old domains, placeholders, or copied template values.

If the file is missing, remember that default crawl behavior is allow. Missing robots.txt is not automatically an error.

### 2A. Route by Platform

For Vercel + GitHub stacks:

- Pull the target URL inventory from generated routes, static route files, redirects, canonical rules, sitemap output, and the defined SEO strategy.
- Generate or update the repo-owned robots.txt file.
- Validate the plaintext file locally before push.
- After merge/deploy, fetch the live Vercel output at `/robots.txt` and confirm it matches the intended rules.

For WordPress sites on SiteGround:

- Generate the approved plaintext robots.txt file.
- Replace the sitemap placeholder with the client's real sitemap URL.
- Upload the file by FTP directly into the website's HTML root folder.
- Fetch the live production `/robots.txt` file and confirm the FTP-loaded file is active.

If the platform route or source of truth is unclear, stop and create an exception packet instead of changing crawler rules.

### 3. Parse the Rules

Inventory:

- `User-agent` groups.
- `Allow` rules.
- `Disallow` rules.
- `Sitemap` directives.
- Comments.
- Unknown or unsupported directives.
- Blank `Disallow:` lines.
- Duplicate or conflicting groups.

Flag immediately:

- `User-agent: *` with `Disallow: /` on a production site.
- Staging/dev URLs in sitemap directives.
- Missing protocol in sitemap URL.
- Placeholder domains like `yourwebsite.com`.
- Blocks on service, service-area, blog, contact, or homepage paths.
- Blocks on assets needed to render pages.
- Old-domain, non-canonical, or HTTP sitemap URLs.

### 4. Test Priority URLs

Test these URL groups against the rules:

- Homepage.
- Top service pages.
- Top service-area pages.
- Blog index and recent posts.
- Contact/about/conversion pages.
- Sitemap URL.
- CSS/JS/theme/plugin resources loaded by the homepage and key pages.
- Images/uploads used by key pages.
- Admin-only paths that should stay blocked.

Do not mark the file safe just because the homepage is allowed. Important assets and templates matter too.

### 5. Compare Against Sitemap and GSC

Use Process 23 and Process 22 context.

Check whether:

- Any sitemap URL is blocked by robots.txt.
- The `Sitemap:` directive points to the approved sitemap.
- GSC reports robots.txt fetch or parsing issues.
- URL Inspection says a priority URL is blocked by robots.txt.
- GSC indexed pages include URLs that robots.txt is supposed to block.

If a page should be removed from the index, route to noindex/removal/canonical guidance instead of trying to solve it with robots.txt alone.

### 6. Decide What Should Be Blocked

Common acceptable blocks:

| Path Type | Typical Decision | Notes |
|---|---|---|
| `/wp-admin/` | Block | Keep `admin-ajax.php` allowed for front-end functionality. |
| Internal search URLs | Usually block crawl | Example: `Disallow: /?s=` or site-specific search path. |
| Login/admin paths | Block | Avoid crawl waste. |
| Cart/account/checkout paths | Usually block or noindex depending on platform | Ecommerce/client portals need case-by-case review. |
| Staging/dev paths | Block and/or password protect | Production should not rely on robots only for privacy. |
| Uploads/images | Usually allow | Images may support image search and page rendering. |
| CSS/JS/theme/plugin resources | Usually allow | Blocking can hurt rendering. |
| Published pages/posts/services | Allow | Use noindex/canonicals/redirects for indexing decisions. |

### 7. Prepare the Deployment Packet

Before the pipeline deploys robots.txt, prepare:

- Current live file.
- Recommended replacement or diff.
- Reason for each rule.
- URLs tested.
- Resources tested.
- Sitemap directive.
- Platform route and deployment target.
- GitHub/Vercel target file or SiteGround FTP HTML-root path.
- Risk notes.
- Rollback instructions.

If the deployment packet conflicts with the target URL inventory or approved SEO strategy, create an exception packet instead of deploying.

### 8. Implement Carefully

Depending on the source of truth:

- For Vercel + GitHub stacks, update the repo file and deploy through the GitHub/Vercel flow.
- For WordPress on SiteGround, upload the plaintext file by FTP into the website HTML root folder.
- Update the server root file when the host uses a different approved root path.
- Update the WordPress/plugin robots editor.
- Update the hosting-level setting.
- Clear cache/CDN if needed.

After implementation, fetch the live file again from a private/incognito context or curl. Do not rely only on the admin editor.

### 9. Validate After Changes

Confirm:

- File returns HTTP 200 or expected status.
- Rules are live.
- Sitemap URL is fully qualified and correct.
- Priority URLs are crawl-allowed.
- Important resources are crawl-allowed.
- Intended blocked paths are blocked.
- GSC robots.txt report is clean when available.
- URL Inspection no longer reports unintended robots blocks.

## What Gets Automated

The Content Engine pipeline automates:

- Fetch robots.txt.
- Parse supported directives.
- Detect risky blocks and placeholders.
- Compare `Sitemap:` directives against Process 23.
- Test priority URL paths against rules.
- Check if sitemap URLs are blocked.
- Detect likely blocked rendering assets.
- Generate the platform-specific robots.txt file.
- Deploy through Vercel + GitHub or WordPress + SiteGround FTP routing.
- Verify the live plaintext output after deployment.
- Prepare recommended diffs and ClickUp summaries.
- Monitor for changed robots.txt output over time.

## Exception Handling

Human review is limited to exceptions:

- Missing GitHub/Vercel, FTP, hosting, or CMS access.
- Conflicting target URL inventory or SEO strategy.
- Unclear robots.txt source of truth.
- Plugin/root-file conflicts.
- Emergency bot-control decisions.
- Staging/privacy decisions.
- Cases where specific URLs should be crawled, noindexed, canonicalized, redirected, password-protected, or removed but the approved strategy does not settle the decision.
- Client-facing explanation of major crawl/indexing changes.

## QA Checklist

Before marking Process 24 complete:

- [ ] Correct production domain and canonical host confirmed.
- [ ] `/robots.txt` fetched live.
- [ ] robots.txt source of truth identified.
- [ ] Platform route confirmed: Vercel + GitHub, WordPress + SiteGround FTP, plugin-managed WordPress, or exception path.
- [ ] Target URL inventory and SEO strategy checked.
- [ ] SiteGround HTML root folder confirmed when FTP deployment is used.
- [ ] File is public plain text or intentionally absent.
- [ ] No production-wide accidental `Disallow: /`.
- [ ] No placeholder sitemap URL remains.
- [ ] `Sitemap:` directive uses the approved fully qualified sitemap URL.
- [ ] Priority pages are not blocked.
- [ ] Sitemap URLs are not blocked.
- [ ] CSS/JS/theme/plugin resources needed for rendering are not blocked.
- [ ] Uploads/images are not blocked unless intentionally approved.
- [ ] Admin/login/internal-search crawl blocks are intentional.
- [ ] robots.txt is not being used as a noindex replacement.
- [ ] GSC robots.txt report or URL Inspection checked when access exists.
- [ ] Any fixes routed to sitemap, GSC, redirects, canonicals, noindex, or content processes.
- [ ] ClickUp updated with live file, tested URLs, decisions, and next action.

## Output Format

Use this structure in ClickUp or the robots.txt audit log:

```md
## robots.txt Review - [Client]

Live robots.txt URL:
Source of truth:
Platform route:
Deployment target:
Sitemap directive:
Status:

Rules reviewed:
- User-agent:
- Disallow:
- Allow:
- Sitemap:

Priority URL tests:
- [URL] - Allowed/Blocked - Notes

Resource tests:
- [Path] - Allowed/Blocked - Notes

Issues found:
- [Issue] - [Risk] - [Recommended route]

Recommended changes:
- None.

Automation status:
- Fully automated.

Next actions:
- None.
```

## Completion Criteria

Process 24 is complete when:

- The live robots.txt file is fetched and reviewed.
- The source of truth is known.
- The platform route is confirmed.
- The deployment target is known.
- The sitemap directive is correct or routed to Process 23.
- Important pages and sitemap URLs are not blocked.
- Important rendering assets are not blocked.
- Intentional blocks are documented.
- Any indexing/removal/canonical issues are routed outside robots.txt.
- GSC robots.txt or URL Inspection checks are completed when access exists.
- ClickUp records the final status, tested URLs, findings, and next actions.

## Common Mistakes

- Using robots.txt to hide pages from Google instead of using `noindex` or password protection.
- Blocking a page with robots.txt and then expecting Google to see a `noindex` tag.
- Leaving `Disallow: /` live after launch.
- Copying the ClickUp sample without replacing the sitemap placeholder.
- Blocking `/wp-content/themes/`, `/wp-content/plugins/`, or JavaScript/CSS resources without testing rendering.
- Blocking sitemap URLs.
- Using a relative sitemap URL instead of a fully qualified URL.
- Editing the live file without knowing whether WordPress, hosting, or the repo owns robots.txt.
- Assuming missing robots.txt is a failure when default crawling is allowed.
- Forgetting that robots.txt rules are host/protocol-specific.

---

*Part of the [SEO Command Center](../../README.md) - Lawn & Land Marketing*

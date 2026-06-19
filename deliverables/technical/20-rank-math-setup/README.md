# Rank Math Setup

**Category:** Technical SEO
**Automation Readiness Score:** 2/10 - Manual heavy
**Status:** SOP documented

---

## Purpose

Process 20 covers the initial Rank Math SEO plugin setup and verification path for WordPress client sites. The goal is to make sure every applicable WordPress site has a clean, consistent SEO plugin baseline before deeper technical, schema, sitemap, metadata, redirect, and on-page work begins.

This process is a foundation step.

- Rank Math setup creates the baseline plugin configuration.
- Schema Markup is Process 21.
- Google Search Console connection and data usage is Process 22.
- XML Sitemap management is Process 23.
- robots.txt rules are Process 24.
- Redirect management is Process 25.
- Page-level title/meta writing is Process 07.

The goal is simple:

- Confirm whether the site needs Rank Math.
- Check whether another SEO plugin is already active.
- Install or verify Rank Math on the WordPress site.
- Run the setup wizard only with approved site facts.
- Import existing SEO data when migrating from another plugin.
- Configure the baseline modules and settings.
- Confirm sitemap, schema, metadata, social, and indexing defaults are sane.
- Verify no critical SEO data was lost or duplicated.
- Document blockers, access gaps, and completion status in ClickUp.

## Current State

Process 20 is represented in ClickUp by:

- Parent task `1. Rank Math & SEO Plugin Initial Setup`.
- Subtask `Verify the plugin is installed for old clients`.

The ClickUp task bodies do not currently include detailed operating notes. The parent task and subtask establish the workflow scope: Rank Math / SEO plugin initial setup and verification for existing clients.

The missing piece was a dashboard SOP that turns that basic ClickUp task into a controlled implementation workflow with access checks, migration rules, module standards, QA, and handoffs to the later technical SEO processes.

## Target State

Every WordPress client site should have a clear Rank Math setup record.

The ideal system:

1. Confirms the site is WordPress and Rank Math is the approved SEO plugin.
2. Checks whether Rank Math is installed, active, connected, and current.
3. Identifies any existing SEO plugin data before changing plugins.
4. Imports existing metadata/settings when migration is required.
5. Runs the Rank Math setup wizard with approved client/site facts.
6. Enables only the modules needed for L&L fulfillment.
7. Confirms sitemap, schema, title/meta, social, indexing, and redirect settings.
8. Verifies front-end output and sitemap URLs after setup.
9. Documents the final state, blockers, and handoffs.

## Automation Score

**2/10 - Manual heavy**

Koga can automate useful audit and QA steps:

- Detect whether a site is WordPress.
- Check whether Rank Math or other SEO plugins are active when WP-CLI access exists.
- Inspect sitemap URLs and front-end metadata.
- Compare active plugin output against expected SEO basics.
- Prepare setup checklists and issue logs.
- Verify public sitemap, robots, schema, canonical, title, and meta output after setup.

The score stays at 2/10 because plugin installation, account connection, setup wizard choices, data import, module toggles, WordPress admin work, and site-specific decisions can change indexing, metadata, schema, and redirects. Humans need to control logged-in setup and approve anything that can alter live SEO output.

## Training Video

No applicable Loom video for Process 20 was found in ClickUp list `901111072650`.

Checked sources:

- `1. Rank Math & SEO Plugin Initial Setup`
- `Verify the plugin is installed for old clients`
- Related `8. Schema Implementation` tasks
- Related `9. Sitemap` tasks
- Related `13. Robots.txt File Managment` tasks
- Related sitemap, schema, redirect, plugin, and SEO-plugin task names/descriptions
- Task comments
- Attachments
- Custom fields
- Checklists
- Rich embed payloads

Decision: do not include unrelated reporting, Looker Studio, Imagify, citation, Whitespark, Signal GeNeSYS, backlink, or press videos in this SOP. Add a video only if a real Rank Math setup / SEO plugin setup Loom is supplied or later appears in the ClickUp SOP list.

## Source References

Use the ClickUp task as the internal workflow source and Rank Math's official docs for the current product flow.

| Source | Role in Process 20 |
|---|---|
| [`1. Rank Math & SEO Plugin Initial Setup`](https://app.clickup.com/t/868eefzy8) | Parent one-time fulfillment task for Rank Math setup. |
| [`Verify the plugin is installed for old clients`](https://app.clickup.com/t/868egw0kr) | Verification task for existing client sites. |
| [Rank Math setup guide](https://rankmath.com/kb/how-to-setup/) | Official setup wizard flow, import, sitemap, optimization, advanced settings, role manager, redirects, and schema context. |
| [Rank Math knowledge base](https://rankmath.com/kb/) | Current documentation hub for sitemaps, schema, analytics, redirects, troubleshooting, and settings. |
| [Rank Math product page](https://rankmath.com/) | Current public product context for setup wizard, Search Console integration, schema, and module capabilities. |
| `deliverables/on-page/07-title-tags-meta/README.md` | Page-level title and meta description workflow after plugin setup. |
| `deliverables/technical/21-schema-markup/README.md` | Schema workflow after baseline Rank Math configuration. |
| `deliverables/technical/22-google-search-console/README.md` | GSC workflow after account/property access is available. |
| `deliverables/technical/23-xml-sitemap/README.md` | Sitemap monitoring after Rank Math sitemap generation is configured. |
| `deliverables/technical/24-robots-txt/README.md` | robots.txt checks that must not conflict with Rank Math sitemap output. |
| `deliverables/technical/25-301-redirects/README.md` | Redirect workflow if Rank Math Redirections module is used. |

## When This Process Runs

| Trigger | What Happens |
|---|---|
| New WordPress SEO client onboarding | Install or verify Rank Math and configure baseline settings. |
| Existing client audit | Confirm Rank Math is installed, active, configured, and not conflicting with old SEO plugins. |
| Plugin migration | Import settings/data from prior SEO plugin before deactivating old output. |
| Website launch QA | Confirm sitemap, metadata, schema, canonicals, and social output are active before launch. |
| Technical SEO issue | Check Rank Math settings when sitemap, schema, robots, canonical, indexing, or redirect output looks wrong. |
| Old-client cleanup | Use the ClickUp verification subtask to confirm old clients have the expected SEO plugin baseline. |

## Required Inputs

| Input | Used For |
|---|---|
| WordPress admin or WP-CLI access | Install, activate, inspect, or configure plugins. |
| Approved SEO plugin decision | Confirms Rank Math is the correct plugin for the site. |
| Current plugin inventory | Detects Yoast, All in One SEO, Redirection, schema plugins, sitemap plugins, or conflicts. |
| Approved business name and website type | Rank Math setup wizard site identity. |
| Approved logo and social profiles | Organization/social metadata where needed. |
| Approved NAP and GBP URL | Local SEO / Knowledge Graph settings when applicable. |
| Existing title/meta/schema data | Prevents data loss during migration. |
| GSC/GA4 access decision | Determines whether Rank Math analytics/webmaster integrations are configured now or deferred. |
| Sitemap/indexing requirements | Confirms which post types and taxonomies should be public. |
| Launch or audit checklist | Defines completion and handoff needs. |

## Preflight Rules

Before changing anything:

- Confirm the site is WordPress.
- Confirm the site is not a staging environment unless setup is intended for staging.
- Confirm backups or rollback path exist for plugin changes.
- Confirm Rank Math is approved for the site.
- Check active SEO, schema, sitemap, redirect, and analytics plugins.
- Check whether existing SEO metadata must be imported.
- Confirm noindex settings before launch.
- Confirm the site is crawlable unless it is intentionally private.
- Confirm the client facts used in the wizard are approved.

Do not install, deactivate, migrate, or overwrite SEO plugin data if the source plugin/data state is unclear.

## Plugin Conflict Review

Check for plugins that may duplicate Rank Math output:

| Plugin Type | Risk | Decision |
|---|---|---|
| Existing SEO plugin | Duplicate titles, meta, canonicals, schema, sitemaps | Import data first, then deactivate only when safe. |
| Dedicated sitemap plugin | Duplicate or conflicting sitemap URLs | Keep only one sitemap source unless there is a specific reason. |
| Schema plugin | Duplicate LocalBusiness, Article, FAQ, or Service schema | Route to Process 21 before removing or changing. |
| Redirect plugin | Split redirect management | Decide whether redirects live in Rank Math, hosting, or another tool. |
| Social/Open Graph plugin | Duplicate social metadata | Confirm one source of truth. |
| Analytics plugin | Duplicate tracking or admin bloat | Confirm whether Rank Math analytics is needed or deferred. |

## Baseline Module Standard

Enable only what the site needs.

| Module | Default Decision | Notes |
|---|---|---|
| Sitemap | Enable | Required for Process 23 unless another approved sitemap source exists. |
| Schema | Enable | Required for Process 21 workflow. |
| Local SEO / Knowledge Graph | Enable for local clients | Use approved NAP and business data only. |
| Redirections | Optional | Use only when Rank Math is the chosen redirect manager. |
| 404 Monitor | Temporary / optional | Useful for audits, but do not leave noisy logging enabled without a reason. |
| Image SEO | Optional | Do not let automatic alt/title behavior override the Process 06 alt-text workflow. |
| Analytics | Optional / usually defer | Prefer GSC/GA4 source-of-truth unless Rank Math analytics is explicitly part of the setup. |
| WooCommerce | Site-specific | Enable only for ecommerce sites. |
| News Sitemap | Site-specific | Enable only for eligible news publishers. |
| Video Sitemap | Site-specific | Enable only when video SEO is part of the site strategy. |

## Workflow

### 1. Confirm Site and Access

Start from `1. Rank Math & SEO Plugin Initial Setup`.

Confirm:

- Site domain.
- WordPress admin URL.
- Whether the work is for production or staging.
- Admin/WP-CLI access.
- Current SEO plugin.
- Whether Rank Math is already installed.
- Whether the setup is a new install, migration, old-client verification, or launch QA.

If access is missing, mark the ClickUp task blocked and list the exact missing access.

### 2. Audit Current SEO Plugin State

Inspect:

- Active plugins.
- Existing SEO titles and meta descriptions.
- Existing schema output.
- Existing sitemap URL.
- Existing robots.txt sitemap reference.
- Existing redirect manager.
- Existing noindex/canonical behavior.
- Existing social metadata.

If another SEO plugin is active, document:

- Plugin name.
- Whether metadata exists.
- Whether settings can be imported.
- Whether schema/sitemap/redirect output is duplicated.
- Recommended migration path.

### 3. Install or Verify Rank Math

For new installs:

- Install Rank Math through WordPress admin or approved WP-CLI path.
- Activate Rank Math.
- Confirm no fatal errors or plugin conflicts appear.
- Confirm old SEO plugin data is ready to import if needed.

For existing clients:

- Confirm Rank Math is installed.
- Confirm Rank Math is active.
- Confirm it is updated or update is routed to the right owner.
- Confirm no duplicate SEO plugin is producing output.
- Confirm the setup wizard was completed or settings are manually configured.

### 4. Run Setup Wizard

Use Rank Math's official setup wizard path:

- Connect account only when approved.
- Choose the correct setup mode.
- Review compatibility checks.
- Import old SEO plugin data when needed.
- Set website type and organization/local business details from approved facts.
- Configure Google services only when access and policy allow it.
- Configure sitemap options.
- Configure optimization defaults.
- Review advanced settings.

Do not guess the business type, logo, social profiles, NAP, or service-area behavior.

### 5. Configure Indexing Defaults

Review titles/meta settings for:

- Pages.
- Posts.
- Categories.
- Tags.
- Author archives.
- Date archives.
- Media attachment pages.
- Service custom post types if present.
- Any builder-generated or theme-specific post types.

Default rule:

- Important pages/posts should be indexable.
- Thin archives, tags, duplicate archives, attachment pages, and internal-only post types should usually be noindex or disabled, depending on the site.
- Do not noindex a page type unless the impact is understood.

Route page-level title/meta writing to Process 07.

### 6. Configure Sitemap Baseline

Confirm:

- Sitemap module is enabled.
- Sitemap index loads.
- Public pages/posts that should rank are included.
- Noindex/hidden/internal content is excluded.
- Media or attachment URLs are not creating junk sitemap entries.
- Sitemap URL is documented for Process 23.
- robots.txt references the correct sitemap where applicable.

Route deeper sitemap monitoring to Process 23.

### 7. Configure Schema Baseline

Confirm:

- Schema module is enabled.
- Organization/local business data is not blank when applicable.
- Sitewide schema does not conflict with another plugin.
- Page/post schema defaults are reasonable.
- Service, FAQ, LocalBusiness, BreadcrumbList, Article, and other schema decisions are routed to Process 21.

Do not create detailed page schema inside this setup task unless Process 21 is being performed at the same time.

### 8. Configure Social Metadata

Confirm:

- Default Open Graph image exists if needed.
- Facebook/Twitter/X social previews are not blank.
- Social URLs are approved.
- Page-level social metadata is handled only where required.

Do not invent social profile URLs.

### 9. Configure Redirects and 404s

Decide whether Rank Math will manage redirects.

If yes:

- Enable Redirections module.
- Confirm existing redirects are imported or preserved.
- Confirm redirect method/status standards.
- Confirm 404 Monitor is used intentionally.

If no:

- Document the redirect source of truth.
- Disable duplicate redirect workflows in Rank Math if needed.

Route redirect mapping and cleanup to Process 25.

### 10. Verify Front-End Output

After setup, verify:

- Homepage title tag exists.
- Homepage meta description exists or is intentionally deferred.
- Canonical tag is present and correct.
- robots meta is not accidentally noindex.
- Open Graph tags render.
- Schema output is valid enough for baseline.
- Sitemap index loads.
- Important page/post URLs appear in sitemap.
- robots.txt does not block critical paths.
- No duplicate SEO plugin output appears.

### 11. Document Completion

Update ClickUp with:

- Rank Math installed/verified.
- Setup wizard completed or manually configured.
- Import completed or not needed.
- Active module list.
- Sitemap URL.
- Any disabled/conflicting plugins.
- Any blockers.
- Handoffs to Process 21, 22, 23, 24, or 25.

## What Gets Automated

Koga can:

- Detect WordPress and plugin state when access exists.
- Identify active SEO/schema/sitemap/redirect plugins.
- Fetch public titles, descriptions, canonicals, robots meta, schema, sitemap, and robots.txt.
- Compare output against the baseline checklist.
- Prepare setup, migration, and QA notes.
- Produce ClickUp completion summaries.

## What Stays Human

Humans handle:

- WordPress admin access.
- Plugin installation and activation when not explicitly authorized for automation.
- Rank Math account connection.
- Migration/import decisions.
- Module toggles that can change site output.
- Noindex/canonical decisions.
- Schema identity decisions.
- Redirect manager decisions.
- Client fact approval.
- Any action that could affect indexing, metadata, schema, redirects, or live search output.

## QA Checklist

- [ ] WordPress site confirmed.
- [ ] Rank Math is approved for this site.
- [ ] Existing SEO plugin state is documented.
- [ ] Existing SEO data migration need is reviewed.
- [ ] Rank Math is installed and active.
- [ ] Duplicate SEO output is removed or flagged.
- [ ] Setup wizard or equivalent manual setup is complete.
- [ ] Approved business/site facts were used.
- [ ] Sitemap module is configured.
- [ ] Schema module is configured at baseline.
- [ ] Indexing defaults are checked.
- [ ] Social metadata baseline is checked.
- [ ] Redirect/404 source of truth is documented.
- [ ] Homepage title/meta/canonical/noindex output is verified.
- [ ] Sitemap URL loads.
- [ ] robots.txt does not block critical pages.
- [ ] Handoffs to later technical processes are logged.
- [ ] ClickUp status reflects the real completion state.

## Output Format

For each setup or audit, produce:

```json
{
  "client": "Client Name",
  "run_type": "rank_math_setup",
  "clickup_source": "1. Rank Math & SEO Plugin Initial Setup",
  "site": "https://client.example",
  "wordpress_confirmed": true,
  "rank_math_status": "installed_active_configured",
  "existing_seo_plugin": "none",
  "migration_status": "not_needed",
  "enabled_modules": ["Sitemap", "Schema", "Local SEO"],
  "sitemap_url": "https://client.example/sitemap_index.xml",
  "issues": [
    {
      "type": "handoff",
      "process": "Process 21 Schema Markup",
      "note": "Service schema needs page-level review."
    }
  ],
  "training_video": "No applicable Loom found in ClickUp list 901111072650"
}
```

## Completion Criteria

The process is complete when:

- Rank Math is installed/active or verified as already configured.
- Any old SEO plugin migration decision is documented.
- Baseline modules are enabled or intentionally deferred.
- Sitemap output is working or blocker is logged.
- Indexing defaults are reviewed.
- Schema baseline is present or routed to Process 21.
- Front-end metadata/canonical/noindex output is checked.
- Duplicate plugin output is resolved or flagged.
- ClickUp reflects the true status.

## Common Mistakes

- Installing Rank Math without checking existing SEO plugin data.
- Leaving two SEO plugins active and producing duplicate metadata.
- Forgetting to import old title/meta data before deactivating another SEO plugin.
- Guessing business details in the setup wizard.
- Accidentally noindexing important content.
- Letting attachment pages or tag archives create index bloat.
- Enabling every module just because it exists.
- Leaving noisy analytics, 404, or link-counter features enabled without a reason.
- Treating plugin setup as a replacement for Process 07 metadata, Process 21 schema, or Process 23 sitemap QA.
- Using unrelated Loom videos in this SOP.

---

*Part of the [SEO Command Center](../../README.md) - Lawn & Land Marketing*

'use strict';

const fs = require('fs/promises');
const path = require('path');

const SOP_FILES = {
  '1': { title: 'Keyword Research', source: 'deliverables/on-page/01-keyword-research/README.md' },
  '2': { title: 'Service Pages', source: 'deliverables/on-page/02-service-pages/README.md' },
  '3': { title: 'Service Area Pages', source: 'deliverables/on-page/03-service-area-pages/README.md' },
  '4': { title: 'Blog Content', source: 'deliverables/on-page/04-blog-content/README.md' },
  '5': { title: 'Internal Linking', source: 'deliverables/on-page/05-internal-linking/README.md' },
  '6': { title: 'AI Generation', source: 'deliverables/on-page/06-alt-text/README.md' },
  '7': { title: 'Title Tags & Meta Descriptions', source: 'deliverables/on-page/07-title-tags-meta/README.md' },
  '8': { title: 'H1 Optimization', source: 'deliverables/on-page/08-h1-optimization/README.md' },
  '9': { title: 'Competitor Analysis', source: 'deliverables/on-page/09-competitor-analysis/README.md' },
  '10': { title: 'Citation Building - Onboarding', source: 'deliverables/off-page/10-citation-building-onboarding/README.md' },
  '11': { title: 'Citation Monitoring - Ongoing', source: 'deliverables/off-page/11-citation-monitoring/README.md' },
  '12': { title: 'Press Releases', source: 'deliverables/off-page/12-press-releases/README.md' },
  '13': { title: 'Backlink - Business Directories', source: 'deliverables/off-page/13-backlink-business-directories/README.md' },
  '14': { title: 'Backlink - Social Profiles', source: 'deliverables/off-page/14-backlink-social-profiles/README.md' },
  '15': { title: 'Backlink - Vendor Testimonials', source: 'deliverables/off-page/15-backlink-vendor-testimonials/README.md' },
  '16': { title: 'Backlink - Chamber of Commerce', source: 'deliverables/off-page/16-backlink-chamber-of-commerce/README.md' },
  '17': { title: 'Backlink - Local Sponsorships', source: 'deliverables/off-page/17-backlink-local-sponsorships/README.md' },
  '18': { title: 'Backlink - Local Press Pitches', source: 'deliverables/off-page/18-backlink-local-press/README.md' },
  '19': { title: 'Backlink - HARO / Connectively', source: 'deliverables/off-page/19-backlink-haro/README.md' },
  '20': { title: 'Rank Math Setup', source: 'deliverables/technical/20-rank-math-setup/README.md' },
  '21': { title: 'Schema Markup', source: 'deliverables/technical/21-schema-markup/README.md' },
  '22': { title: 'Google Search Console', source: 'deliverables/technical/22-google-search-console/README.md' },
  '23': { title: 'XML Sitemap', source: 'deliverables/technical/23-xml-sitemap/README.md' },
  '24': { title: 'robots.txt', source: 'deliverables/technical/24-robots-txt/README.md' },
  '25': { title: '301 Redirects', source: 'deliverables/technical/25-301-redirects/README.md' },
  '26': { title: 'Page Speed / Core Web Vitals', source: 'deliverables/technical/26-page-speed-core-web-vitals/README.md' },
  '27': { title: 'Mobile Optimization', source: 'deliverables/technical/27-mobile-optimization/README.md' },
  '28': { title: 'Duplicate Content / Canonicals', source: 'deliverables/technical/28-duplicate-content-canonicals/README.md' },
  '29': { title: 'Profile Build & Completion', source: 'deliverables/gbp/29-gbp-profile-build/README.md' },
  '30': { title: 'GBP Categories', source: 'deliverables/gbp/30-gbp-categories/README.md' },
  '31': { title: 'Weekly GBP Posts', source: 'deliverables/gbp/31-gbp-weekly-posts/README.md' },
  '32': { title: 'Automated Review Replies', source: 'deliverables/gbp/32-gbp-review-replies/README.md' },
  '33': { title: 'GBP Photo Management', source: 'deliverables/gbp/33-gbp-photo-management/README.md' },
  '34': { title: 'Q&A Management', source: 'deliverables/gbp/34-gbp-qa-management/README.md' },
  '35': { title: 'GBP Link on Website', source: 'deliverables/gbp/35-gbp-link-on-website/README.md' },
  '36': { title: 'GBP Attributes', source: 'deliverables/gbp/36-gbp-attributes/README.md' },
  '37': { title: 'Internal Monthly Scorecard', source: 'deliverables/reporting/37-internal-monthly-scorecard/README.md' },
  '38': { title: 'Client Monthly Report', source: 'deliverables/reporting/38-client-monthly-report/README.md' },
};

module.exports = async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET, OPTIONS');
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const id = String(req.query.id || '');
  const sop = SOP_FILES[id];

  if (!sop) {
    res.status(404).json({ error: 'SOP not found' });
    return;
  }

  const root = process.cwd();
  const filePath = path.join(root, sop.source);
  const normalized = path.relative(root, filePath);

  if (normalized.startsWith('..') || path.isAbsolute(normalized)) {
    res.status(400).json({ error: 'Invalid SOP path' });
    return;
  }

  try {
    const markdown = await fs.readFile(filePath, 'utf8');
    res.status(200).json({ id: Number(id), title: sop.title, source: sop.source, markdown });
  } catch (error) {
    res.status(404).json({ error: 'SOP file is not available yet' });
  }
};

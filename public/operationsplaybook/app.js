'use strict';

const PLAYBOOK = window.OPERATIONS_PLAYBOOK_DATA || { areas: [] };
const SEO_SYSTEM_CATEGORIES = window.SEO_SYSTEM_CATEGORIES || [];
const SEO_SYSTEM_ITEMS = window.SEO_SYSTEM_ITEMS || [];
const SEO_SYSTEM_MASTER_SOPS = window.SEO_SYSTEM_MASTER_SOPS || [];
const SEO_SYSTEM_FULFILLMENT_MAP = window.SEO_SYSTEM_FULFILLMENT_MAP || [];

const S = {
  areaKey: PLAYBOOK.areas?.[0]?.key || '',
  search: '',
};

const $ = (selector) => document.querySelector(selector);
const h = (value) => String(value || '').replace(/[&<>"']/g, (char) => ({
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
}[char]));

const api = {
  async sop(id) {
    const response = await fetch(`/api/sops/${id}`);
    if (!response.ok) throw new Error(await response.text());
    return response.json();
  },
};

function currentArea() {
  return PLAYBOOK.areas.find((area) => area.key === S.areaKey) || PLAYBOOK.areas[0] || { processes: [] };
}

function readinessLabel(score) {
  if (score <= 0) return '100% manual';
  if (score >= 10) return 'Fully automated';
  if (score >= 9) return 'Near-full automation';
  if (score >= 7) return 'Highly automatable';
  if (score >= 5) return 'Partial automation';
  if (score >= 3) return 'Mostly human';
  return 'Manual heavy';
}

function readinessClass(score) {
  if (score >= 9) return 'excellent';
  if (score >= 7) return 'good';
  if (score >= 5) return 'partial';
  if (score >= 3) return 'low';
  return 'manual';
}

function areaIcon(key) {
  const icons = {
    onboarding: '<path d="M8 2v4"/><path d="M16 2v4"/><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M3 10h18"/><path d="m9 16 2 2 4-5"/>',
    'google-ads': '<path d="M3 3v18h18"/><path d="M7 15l4-4 3 3 5-6"/><path d="M18 8h1v1"/>',
    webdev: '<path d="M4 5h16v14H4z"/><path d="M4 9h16"/><path d="m9 15 2 2 4-5"/>',
    facebook: '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>',
    seo: '<path d="M12 2v4"/><path d="M12 18v4"/><path d="M2 12h4"/><path d="M18 12h4"/><circle cx="12" cy="12" r="4"/>',
    'service-area-expert': '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',
  };
  return `<svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">${icons[key] || icons.onboarding}</svg>`;
}

function inlineMarkdown(text) {
  return h(text)
    .replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
}

function renderLoomEmbed(url) {
  const match = String(url || '').match(/^https:\/\/www\.loom\.com\/share\/([A-Za-z0-9]+)(\?[^ ]*)?$/);
  if (!match) return '';
  const embedUrl = `https://www.loom.com/embed/${match[1]}${match[2] || ''}`;
  return `<div class="sop-video-embed"><iframe src="${h(embedUrl)}" allowfullscreen title="Loom training video"></iframe></div>`;
}

function renderMarkdownTable(rows) {
  const parsedRows = rows
    .filter((row) => !/^\|\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?$/.test(row.trim()))
    .map((row) => row.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map((cell) => cell.trim()));
  if (!parsedRows.length) return '';
  const [head, ...body] = parsedRows;
  return `<div class="sop-table-wrap"><table class="sop-table">
    <thead><tr>${head.map((cell) => `<th>${inlineMarkdown(cell)}</th>`).join('')}</tr></thead>
    <tbody>${body.map((row) => `<tr>${row.map((cell) => `<td>${inlineMarkdown(cell)}</td>`).join('')}</tr>`).join('')}</tbody>
  </table></div>`;
}

function renderSopMarkdown(markdown) {
  const lines = String(markdown || '').replace(/\r\n/g, '\n').split('\n');
  let html = '';
  let list = null;
  const closeList = () => {
    if (!list) return;
    html += `</${list}>`;
    list = null;
  };
  const isBlockStart = (line) => /^(#{1,4})\s+/.test(line) || /^::loom\s+https:\/\/www\.loom\.com\/share\//.test(line) || /^(-|\d+\.)\s+/.test(line) || /^-\s+\[[ x]\]\s+/i.test(line) || /^\*\*[^*]+:\*\*/.test(line) || line.trim() === '---' || /^\|.+\|$/.test(line.trim());

  for (let i = 0; i < lines.length; i += 1) {
    const trimmed = lines[i].trim();
    if (!trimmed) {
      closeList();
      continue;
    }

    if (trimmed === '---') {
      closeList();
      html += '<hr>';
      continue;
    }

    const loom = trimmed.match(/^::loom\s+(https:\/\/www\.loom\.com\/share\/\S+)$/);
    if (loom) {
      closeList();
      html += renderLoomEmbed(loom[1]);
      continue;
    }

    if (/^\|.+\|$/.test(trimmed) && /^\|\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?$/.test((lines[i + 1] || '').trim())) {
      closeList();
      const rows = [trimmed, lines[i + 1].trim()];
      i += 2;
      while (i < lines.length && /^\|.+\|$/.test(lines[i].trim())) {
        rows.push(lines[i].trim());
        i += 1;
      }
      i -= 1;
      html += renderMarkdownTable(rows);
      continue;
    }

    const heading = trimmed.match(/^(#{1,4})\s+(.+)$/);
    if (heading) {
      closeList();
      const level = Math.min(heading[1].length + 1, 5);
      html += `<h${level}>${inlineMarkdown(heading[2])}</h${level}>`;
      continue;
    }

    const definition = trimmed.match(/^\*\*([^*]+):\*\*\s*(.*)$/);
    if (definition) {
      closeList();
      html += `<p class="sop-def"><strong>${inlineMarkdown(definition[1])}</strong><span>${inlineMarkdown(definition[2])}</span></p>`;
      continue;
    }

    const checklist = trimmed.match(/^-\s+\[([ x])\]\s+(.+)$/i);
    if (checklist) {
      if (list !== 'ul') {
        closeList();
        html += '<ul>';
        list = 'ul';
      }
      html += `<li class="sop-check-item"><input type="checkbox" disabled ${checklist[1].toLowerCase() === 'x' ? 'checked' : ''}> <span>${inlineMarkdown(checklist[2])}</span></li>`;
      continue;
    }

    const bullet = trimmed.match(/^-\s+(.+)$/);
    if (bullet) {
      if (list !== 'ul') {
        closeList();
        html += '<ul>';
        list = 'ul';
      }
      html += `<li>${inlineMarkdown(bullet[1])}</li>`;
      continue;
    }

    const numbered = trimmed.match(/^\d+\.\s+(.+)$/);
    if (numbered) {
      if (list !== 'ol') {
        closeList();
        html += '<ol>';
        list = 'ol';
      }
      html += `<li>${inlineMarkdown(numbered[1])}</li>`;
      continue;
    }

    closeList();
    const paragraph = [trimmed];
    while (i + 1 < lines.length && lines[i + 1].trim() && !isBlockStart(lines[i + 1].trim())) {
      paragraph.push(lines[i + 1].trim());
      i += 1;
    }
    html += `<p>${inlineMarkdown(paragraph.join(' '))}</p>`;
  }

  closeList();
  return html;
}

function firstSopUrl(process) {
  const haystack = [process.sopUrl, process.sopMarkdown, process.summary, process.title]
    .filter(Boolean)
    .join('\n');
  const match = haystack.match(/https?:\/\/[^\s)"'<]+/i);
  return match ? match[0] : '';
}

function isVideoUrl(url) {
  return /(?:loom\.com\/share|youtube\.com|youtu\.be|vimeo\.com)/i.test(url || '');
}

function openModal(title, body, footer, modalClass = '') {
  $('#modalRoot').innerHTML = `<div class="modal-overlay" id="modalOverlay"><div class="modal ${h(modalClass)}"><div class="modal-header"><h2>${title}</h2><button class="modal-close" id="modalClose">×</button></div><div class="modal-body">${body}</div>${footer ? `<div class="modal-footer">${footer}</div>` : ''}</div></div>`;
  $('#modalOverlay').addEventListener('click', (event) => {
    if (event.target.id === 'modalOverlay') closeModal();
  });
  $('#modalClose').addEventListener('click', closeModal);
  document.addEventListener('keydown', escModal);
}

function closeModal() {
  $('#modalRoot').innerHTML = '';
  document.removeEventListener('keydown', escModal);
}

function escModal(event) {
  if (event.key === 'Escape') closeModal();
}

function toast(message, type = 'success') {
  const el = document.createElement('div');
  el.className = `toast ${type}`;
  el.textContent = message;
  $('#toastRoot').appendChild(el);
  setTimeout(() => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(8px)';
    setTimeout(() => el.remove(), 300);
  }, 3500);
}

function openOperationsSop(processId) {
  const process = PLAYBOOK.areas.flatMap((area) => area.processes).find((item) => item.id === processId);
  if (!process) {
    toast('SOP not found.', 'error');
    return;
  }

  const body = `
    <article class="sop-reader">
      <div class="sop-reader-meta">
        <span>${h(process.number)}</span>
        <span>${h(process.source)}</span>
        <span>${h(process.category)}</span>
      </div>
      ${renderSopMarkdown(process.sopMarkdown)}
    </article>
  `;
  const external = process.externalUrl ? `<a class="btn btn-ghost" href="${h(process.externalUrl)}" target="_blank" rel="noopener noreferrer">Open Linked System</a>` : '';
  openModal(h(process.title), body, `${external}<button class="btn btn-primary" onclick="closeModal()">Done</button>`, 'sop-modal');
}

function navigateArea(areaKey) {
  if (!PLAYBOOK.areas.some((area) => area.key === areaKey)) return;
  S.areaKey = areaKey;
  S.search = '';
  window.history.replaceState(null, '', `#${areaKey}`);
  render();
}

function filteredProcesses(area) {
  const query = S.search.trim().toLowerCase();
  if (!query) return area.processes;
  return area.processes.filter((process) => {
    const haystack = [
      process.title,
      process.summary,
      process.human,
      process.ai,
      process.category,
      process.cadence,
      process.fulfillment,
      process.source,
      process.sopMarkdown,
    ].join(' ').toLowerCase();
    return haystack.includes(query);
  });
}

function renderSidebar() {
  $('#sidebarNav').innerHTML = PLAYBOOK.areas.map((area) => `
    <a class="nav-item ${area.key === S.areaKey ? 'active' : ''}" href="#${h(area.key)}" onclick="navigateArea('${h(area.key)}');return false">
      ${areaIcon(area.key)}
      ${h(area.label)}
      <span class="ops-area-nav-count">${area.key === 'seo' && SEO_SYSTEM_ITEMS.length ? SEO_SYSTEM_ITEMS.length : area.count}</span>
    </a>
  `).join('');
}

function renderProcessCard(process) {
  const external = process.externalUrl ? `<a class="btn btn-ghost sop-view-btn" href="${h(process.externalUrl)}" target="_blank" rel="noopener noreferrer">Open System</a>` : '';
  const sopUrl = firstSopUrl(process);
  const sopButton = sopUrl && isVideoUrl(sopUrl)
    ? `<a class="btn btn-primary sop-view-btn" href="${h(sopUrl)}" target="_blank" rel="noopener noreferrer">Watch SOP</a>`
    : `<button class="btn btn-primary sop-view-btn" type="button" onclick="openOperationsSop('${h(process.id)}')">View SOP</button>`;
  return `<article class="seo-process-card">
    <div class="seo-process-topline">
      <span class="process-number">${h(process.number)}</span>
      <span class="process-category">${h(process.category)}</span>
      <span class="readiness-badge ${readinessClass(process.score)}">${process.score}/10 · ${h(readinessLabel(process.score))}</span>
    </div>
    <h3>${h(process.title)}</h3>
    <p class="process-summary">${h(process.summary)}</p>
    <div class="process-detail-grid">
      <div><strong>Human role</strong><span>${h(process.human)}</span></div>
      <div><strong>Koga/Kai role</strong><span>${h(process.ai)}</span></div>
    </div>
    <div class="process-meta-row">
      <span>${h(process.sopStatus)}</span>
      <span>${h(process.cadence)}</span>
      <span>${h(process.fulfillment)}</span>
      <span>${h(process.source)}</span>
    </div>
    <div class="ops-card-actions">
      ${sopButton}
      ${external}
    </div>
  </article>`;
}

function seoCategoryMeta(key) {
  return SEO_SYSTEM_CATEGORIES.find((category) => category.key === key) || SEO_SYSTEM_CATEGORIES[0] || { key, label: key, purpose: '' };
}

async function openSeoSop(id) {
  const item = SEO_SYSTEM_ITEMS.find((process) => process.id === id);
  if (!item?.sopStatus) {
    toast('This SOP has not been documented yet.', 'error');
    return;
  }

  openModal('Loading SOP', '<div class="loading-state"><span class="loading-spinner"></span> Loading SOP...</div>', '', 'sop-modal');

  try {
    const sop = await api.sop(id);
    const body = `
      <article class="sop-reader">
        <div class="sop-reader-meta">
          <span>Process ${String(sop.id).padStart(2, '0')}</span>
          <span>${h(sop.source)}</span>
        </div>
        ${renderSopMarkdown(sop.markdown)}
      </article>
    `;
    openModal(h(sop.title), body, '<button class="btn btn-primary" onclick="closeModal()">Done</button>', 'sop-modal');
  } catch (error) {
    openModal('SOP unavailable', `<p class="modal-error">${h(error.message || 'Could not load this SOP.')}</p>`, '<button class="btn btn-primary" onclick="closeModal()">Close</button>');
  }
}

function renderSeoSystemCard(item) {
  const category = seoCategoryMeta(item.category);
  const sopStatus = item.sopStatus ? `<span>${h(item.sopStatus)}</span>` : '';
  const sopAction = item.sopStatus ? `<button class="btn btn-primary sop-view-btn" type="button" onclick="openSeoSop(${item.id})">View SOP</button>` : '';
  return `<article class="seo-process-card">
    <div class="seo-process-topline">
      <span class="process-number">${String(item.id).padStart(2, '0')}</span>
      <span class="process-category">${h(category.label)}</span>
      <span class="readiness-badge ${readinessClass(item.score)}">${item.score}/10 · ${h(readinessLabel(item.score))}</span>
    </div>
    <h3>${h(item.title)}</h3>
    <p class="process-summary">${h(item.summary)}</p>
    <div class="process-detail-grid">
      <div><strong>Human role</strong><span>${h(item.human)}</span></div>
      <div><strong>Koga/Kai role</strong><span>${h(item.ai)}</span></div>
    </div>
    <div class="process-meta-row">
      ${sopStatus}
      <span>${h(item.cadence)}</span>
      <span>${h(item.fulfillment)}</span>
      <span>${h(item.source)}</span>
    </div>
    ${sopAction}
  </article>`;
}

function renderSeoTabContent() {
  const filteredItems = SEO_SYSTEM_ITEMS.filter((item) => {
    if (!S.search) return true;
    const haystack = `${item.title} ${item.summary} ${item.fulfillment} ${item.source} ${seoCategoryMeta(item.category).label}`.toLowerCase();
    return haystack.includes(S.search.toLowerCase());
  });
  const averageScore = Math.round(SEO_SYSTEM_ITEMS.reduce((sum, item) => sum + item.score, 0) / SEO_SYSTEM_ITEMS.length);
  const highAutomation = SEO_SYSTEM_ITEMS.filter((item) => item.score >= 7).length;
  const masterSopCount = SEO_SYSTEM_MASTER_SOPS.length;

  $('#breadcrumb').innerHTML = '<span class="bc-item">Operations Playbook</span><span class="bc-sep">›</span><span class="bc-item">AI-Driven SEO Fulfillment System</span>';

  return `
    <div class="page-header">
      <div>
        <h1 class="page-title">AI-Driven SEO Fulfillment System</h1>
        <p class="page-subtitle">Documentation-only operating map for how SEO fulfillment should be done by the team, Koga, and Kai.</p>
      </div>
    </div>

    <div class="seo-system-hero">
      <div>
        <span class="doc-kicker">Build & Implement</span>
        <h2>One place for the SEO playbook, fulfillment map, and process library.</h2>
        <p>This tab consolidates the LawnLab SEO Playbook, LawnLab SEO Checklist, and Koga's existing markdown SOPs into a scannable dashboard reference. No database. No task state. Just the operating system.</p>
      </div>
      <div class="seo-system-stats">
        <div><strong>${SEO_SYSTEM_ITEMS.length}</strong><span>documented process cards</span></div>
        <div><strong>${SEO_SYSTEM_CATEGORIES.length}</strong><span>fulfillment categories</span></div>
        <div><strong>${highAutomation}</strong><span>high automation candidates</span></div>
        <div><strong>${averageScore}/10</strong><span>avg automation readiness</span></div>
      </div>
    </div>

    <div class="stats-row">
      <div class="stat-card highlight">
        <div class="stat-label">Primary Goal</div>
        <div class="stat-value small">Documented</div>
        <div class="stat-helper">Short summaries and source locations first</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Master SOPs</div>
        <div class="stat-value">${masterSopCount}</div>
        <div class="stat-helper">Existing Koga markdown docs referenced</div>
      </div>
    </div>

    <div class="section">
      <div class="section-header">
        <h2 class="section-title">Fulfillment Map</h2>
        <p class="section-subtitle">How the existing sidebar fulfillment tasks connect back to the process documentation.</p>
      </div>
      <div class="fulfillment-map-grid">
        ${SEO_SYSTEM_FULFILLMENT_MAP.map((group) => `
          <section class="fulfillment-map-card">
            <span class="doc-kicker">${h(group.source)}</span>
            <h3>${h(group.label)}</h3>
            <p>${h(group.focus)}</p>
            <div class="mini-chip-list">${group.tasks.map((task) => `<span>${h(task)}</span>`).join('')}</div>
          </section>
        `).join('')}
      </div>
    </div>

    <div class="section">
      <div class="section-header">
        <h2 class="section-title">Process Library</h2>
        <p class="section-subtitle">Short cards first. Each card names the human role, AI role, source SOP location, cadence, fulfillment task, and automation readiness.</p>
      </div>
      <div class="table-toolbar seo-system-toolbar">
        <div class="search-wrap">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input class="search-input" type="text" placeholder="Search processes, fulfillment tasks, or source docs..." value="${h(S.search)}" id="searchInput" />
        </div>
        <div style="font-size:13px;color:var(--text-dim)">${filteredItems.length}/${SEO_SYSTEM_ITEMS.length} processes</div>
      </div>
      ${SEO_SYSTEM_CATEGORIES.map((category) => {
        const items = filteredItems.filter((item) => item.category === category.key);
        if (!items.length) return '';
        return `<section class="seo-category-section">
          <div class="seo-category-header">
            <div>
              <span class="doc-kicker">${items.length} processes</span>
              <h3>${h(category.label)}</h3>
            </div>
            <p>${h(category.purpose)}</p>
          </div>
          <div class="seo-process-grid">${items.map(renderSeoSystemCard).join('')}</div>
        </section>`;
      }).join('')}
    </div>

    <div class="section">
      <div class="section-header">
        <h2 class="section-title">Master SOP References</h2>
        <p class="section-subtitle">These are the deeper process files Koga should follow when the work moves from documentation to execution.</p>
      </div>
      <div class="master-sop-grid">
        ${SEO_SYSTEM_MASTER_SOPS.map((sop) => `
          <article class="master-sop-card">
            <h3>${h(sop.title)}</h3>
            <p>${h(sop.use)}</p>
            <span>${h(sop.source)}</span>
          </article>
        `).join('')}
      </div>
    </div>

    <div class="section">
      <div class="section-header">
        <h2 class="section-title">Build Roadmap</h2>
        <p class="section-subtitle">The tab stays documentation-only now, but the process map makes future automation obvious.</p>
      </div>
      <div class="roadmap-strip">
        <div><strong>1. Document</strong><span>Summaries, source docs, categories, cadence, and fulfillment mapping.</span></div>
        <div><strong>2. Standardize</strong><span>Fill the placeholder markdown files with the approved SOP for each deliverable.</span></div>
        <div><strong>3. Assist</strong><span>Add prompts, scripts, and Koga/Kai instructions for repeatable AI-assisted work.</span></div>
        <div><strong>4. Automate</strong><span>Only after the SOP is stable, wire selected processes into APIs, runs, and dashboards.</span></div>
      </div>
    </div>
  `;
}

function renderContent() {
  const area = currentArea();
  if (area.key === 'seo' && SEO_SYSTEM_ITEMS.length) return renderSeoTabContent();

  const rows = filteredProcesses(area);
  const highAutomation = area.processes.filter((process) => process.score >= 7).length;
  $('#breadcrumb').innerHTML = `<span class="bc-item">Operations Playbook</span><span class="bc-sep">›</span><span class="bc-item">${h(area.label)}</span>`;

  return `
    <div class="page-header">
      <div>
        <h1 class="page-title">AI-Powered Operations Playbook</h1>
        <p class="page-subtitle">Interactive process library built from the operations spreadsheet, including onboarding, ads, web, SEO, Facebook, and SAE documentation.</p>
      </div>
    </div>

    <div class="seo-system-hero">
      <div>
        <span class="doc-kicker">Build & Implement</span>
        <h2>${h(area.label)} operating system, mapped into process cards.</h2>
        <p>${h(area.description)}</p>
      </div>
      <div class="seo-system-stats">
        <div><strong>${area.count}</strong><span>process cards in this tab</span></div>
        <div><strong>${PLAYBOOK.totalAreas}</strong><span>operations areas</span></div>
        <div><strong>${highAutomation}</strong><span>automation candidates</span></div>
        <div><strong>${area.averageScore}/10</strong><span>avg automation readiness</span></div>
      </div>
    </div>

    <div class="stats-row">
      <div class="stat-card highlight">
        <div class="stat-label">Total Processes</div>
        <div class="stat-value">${PLAYBOOK.totalProcesses}</div>
        <div class="stat-helper">Parsed from the source spreadsheet</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Active Tab</div>
        <div class="stat-value small">${h(area.label)}</div>
        <div class="stat-helper">${rows.length}/${area.count} currently visible</div>
      </div>
    </div>

    <div class="section">
      <div class="section-header">
        <h2 class="section-title">Process Library</h2>
        <p class="section-subtitle">Same card logic as the SEO fulfillment system: summary, human role, Koga/Kai role, cadence, source, readiness, and a dedicated SOP button.</p>
      </div>
      <div class="ops-area-panel">
        <div>
          <span class="doc-kicker">${rows.length} visible</span>
          <h2>${h(area.label)}</h2>
        </div>
        <p>${h(area.description)}</p>
      </div>
      <div class="table-toolbar seo-system-toolbar">
        <div class="search-wrap">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input class="search-input" type="text" placeholder="Search ${h(area.label)} processes, SOP text, owners, cadence, or source..." value="${h(S.search)}" id="searchInput" />
        </div>
        <div style="font-size:13px;color:var(--text-dim)">${rows.length}/${area.count} processes</div>
      </div>
      ${rows.length ? `<div class="seo-process-grid">${rows.map(renderProcessCard).join('')}</div>` : '<div class="ops-empty-state">No processes match that search.</div>'}
    </div>
  `;
}

function bindEvents() {
  $('#searchInput')?.addEventListener('input', (event) => {
    S.search = event.target.value;
    $('#content').innerHTML = renderContent();
    bindEvents();
  });
}

function render() {
  renderSidebar();
  $('#content').innerHTML = renderContent();
  bindEvents();
}

function init() {
  const hash = window.location.hash.replace('#', '');
  if (hash && PLAYBOOK.areas.some((area) => area.key === hash)) S.areaKey = hash;

  $('#sidebarToggle')?.addEventListener('click', () => {
    $('#sidebar').classList.toggle('collapsed');
  });
  $('#mobileMenuBtn')?.addEventListener('click', () => {
    $('#sidebar').classList.toggle('open');
  });
  render();
}

init();

'use strict';

const PLAYBOOK = window.OPERATIONS_PLAYBOOK_DATA || { areas: [] };

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

function renderSopMarkdown(markdown) {
  const lines = String(markdown || '').replace(/\r\n/g, '\n').split('\n');
  let html = '';
  let list = null;
  const closeList = () => {
    if (!list) return;
    html += `</${list}>`;
    list = null;
  };
  const isBlockStart = (line) => /^(#{1,4})\s+/.test(line) || /^(-|\d+\.)\s+/.test(line) || /^-\s+\[[ x]\]\s+/i.test(line);

  for (let i = 0; i < lines.length; i += 1) {
    const trimmed = lines[i].trim();
    if (!trimmed) {
      closeList();
      continue;
    }

    const heading = trimmed.match(/^(#{1,4})\s+(.+)$/);
    if (heading) {
      closeList();
      const level = Math.min(heading[1].length + 1, 5);
      html += `<h${level}>${inlineMarkdown(heading[2])}</h${level}>`;
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
      <span class="ops-area-nav-count">${area.count}</span>
    </a>
  `).join('');
}

function renderProcessCard(process) {
  const external = process.externalUrl ? `<a class="btn btn-ghost sop-view-btn" href="${h(process.externalUrl)}" target="_blank" rel="noopener noreferrer">Open System</a>` : '';
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
      <button class="btn btn-primary sop-view-btn" type="button" onclick="openOperationsSop('${h(process.id)}')">View SOP</button>
      ${external}
    </div>
  </article>`;
}

function renderContent() {
  const area = currentArea();
  const rows = filteredProcesses(area);
  const highAutomation = area.processes.filter((process) => process.score >= 7).length;
  $('#breadcrumb').innerHTML = `<span class="bc-item">Operations Playbook</span><span class="bc-sep">›</span><span class="bc-item">${h(area.label)}</span>`;

  return `
    <div class="page-header">
      <div>
        <h1 class="page-title">AI-Powered Operations Playbook</h1>
        <p class="page-subtitle">Interactive process library built from the operations spreadsheet, including onboarding, ads, web, SEO, Facebook, and SAE documentation.</p>
        <div class="ops-redaction-note">${h(PLAYBOOK.redactionNote)}</div>
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
      <div class="stat-card">
        <div class="stat-label">Source</div>
        <div class="stat-value small">Sheet</div>
        <div class="stat-helper">${h(PLAYBOOK.generatedFrom)}</div>
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

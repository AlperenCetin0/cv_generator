/* ============================================
   CLASSIC TEMPLATE RENDERER
   ============================================ */

import { currentState } from '../config/state.js';
import { escapeHtml, trUpperCase } from '../utils/helpers.js';
import { renderCommonSections } from './commonSections.js';
import { cvPreview } from '../dom/elements.js';

export function renderClassicTemplate(data) {
    const fullName = `${data.firstName} ${data.lastName}`.trim();
    let html = '';

    // Header - Classic
    html += `<div class="cv-header classic-header" style="text-align: left; border-bottom: 3px double var(--accent-color); padding-bottom: 20px;">`;

    // Photo in corner for classic
    if (currentState.profilePhoto) {
        html += `<div class="cv-photo-container"><img src="${currentState.profilePhoto}" class="cv-photo" alt="Profile"></div>`;
    }

    html += `<div class="cv-header-info">`;
    if (fullName) html += `<h1 class="cv-name" style="font-size: 28px; margin-bottom: 8px;">${escapeHtml(trUpperCase(fullName))}</h1>`;
    if (data.title) html += `<p class="cv-title" style="font-style: italic; font-weight: 600; font-size: 14px; color: var(--color-dark-700)">${escapeHtml(data.title)}</p>`;
    html += `</div></div>`;

    html += renderCommonSections(data, true); // true for classic style

    cvPreview.innerHTML = html;
}

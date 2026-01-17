/* ============================================
   MODERN TEMPLATE RENDERER
   ============================================ */

import { currentState } from '../config/state.js';
import { escapeHtml, trUpperCase } from '../utils/helpers.js';
import { renderCommonSections } from './commonSections.js';
import { cvPreview } from '../dom/elements.js';

export function renderModernTemplate(data) {
    const fullName = `${data.firstName} ${data.lastName}`.trim();
    let html = '';

    // Header - Modern
    html += `<div class="cv-header modern-header" style="border-bottom-color: var(--accent-color)">`;

    // Photo in corner for modern
    if (currentState.profilePhoto) {
        html += `<div class="cv-photo-container"><img src="${currentState.profilePhoto}" class="cv-photo" alt="Profile"></div>`;
    }

    html += `<div class="cv-header-info">`;
    if (fullName) html += `<h1 class="cv-name" style="color: var(--accent-color)">${escapeHtml(trUpperCase(fullName))}</h1>`;
    if (data.title) html += `<p class="cv-title">${escapeHtml(data.title)}</p>`;
    html += `</div></div>`;

    // Rest of the modern template sections
    html += renderCommonSections(data);

    cvPreview.innerHTML = html;
}

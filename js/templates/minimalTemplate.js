/* ============================================
   MINIMAL TEMPLATE RENDERER
   ============================================ */

import { currentState } from '../config/state.js';
import { escapeHtml, trUpperCase } from '../utils/helpers.js';
import { renderCommonSections } from './commonSections.js';
import { cvPreview } from '../dom/elements.js';

export function renderMinimalTemplate(data) {
    const fullName = `${data.firstName} ${data.lastName}`.trim();
    let html = '';

    // Header - Minimal
    html += `<div class="cv-header minimal-header" style="text-align: left; border-bottom: none; margin-bottom: 40px; padding-bottom: 0;">`;

    // Photo for minimal
    if (currentState.profilePhoto) {
        html += `<div class="cv-photo-container"><img src="${currentState.profilePhoto}" class="cv-photo" alt="Profile"></div>`;
    }

    html += `<div class="cv-header-info">`;
    if (fullName) html += `<h1 class="cv-name" style="font-size: 32px; letter-spacing: -1px; margin-bottom: 0;">${escapeHtml(trUpperCase(fullName))}</h1>`;
    if (data.title) html += `<p class="cv-title" style="color: var(--accent-color); font-weight: 500; font-size: 16px;">${escapeHtml(data.title)}</p>`;
    html += `</div></div>`;

    html += renderCommonSections(data);

    cvPreview.innerHTML = html;
}

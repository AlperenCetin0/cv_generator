/* ============================================
   CREATIVE TEMPLATE RENDERER
   ============================================ */

import { currentState } from '../config/state.js';
import { escapeHtml, trUpperCase } from '../utils/helpers.js';
import { renderCommonSections } from './commonSections.js';
import { cvPreview } from '../dom/elements.js';

export function renderCreativeTemplate(data) {
    const fullName = `${data.firstName} ${data.lastName}`.trim();
    let html = '';

    // Creative Layout Header
    html += `<div class="cv-header creative-header" style="background: var(--accent-color); color: white; padding: 40px; border-radius: 8px; margin-bottom: 30px; border-bottom: none;">`;

    // Photo inside header for creative
    if (currentState.profilePhoto) {
        html += `<div class="cv-photo-container"><img src="${currentState.profilePhoto}" class="cv-photo" alt="Profile"></div>`;
    }

    html += `<div class="cv-header-info">`;
    if (fullName) html += `<h1 class="cv-name" style="color: white; font-size: 30px; margin-bottom: 5px;">${escapeHtml(trUpperCase(fullName))}</h1>`;
    if (data.title) html += `<p class="cv-title" style="color: rgba(255,255,255,0.8); font-size: 14px;">${escapeHtml(data.title)}</p>`;
    html += `</div></div>`;

    html += renderCommonSections(data);

    cvPreview.innerHTML = html;
}

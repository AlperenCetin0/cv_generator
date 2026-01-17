/* ============================================
   MODERN TEMPLATE RENDERER
   Clean, minimal, single column, accent highlights
   ============================================ */

import { currentState } from '../config/state.js';
import { translations } from '../config/translations.js';
import { escapeHtml, formatDescription, trUpperCase } from '../utils/helpers.js';
import { formatBirthDate } from '../data/formatters.js';
import { getIcon } from './icons.js';
import { cvPreview } from '../dom/elements.js';

export function renderModernTemplate(data) {
    const fullName = `${data.firstName} ${data.lastName}`.trim();
    const t = translations[currentState.language];
    let html = '';

    // Modern Header - Clean with accent underline
    html += `<div class="cv-header" style="border-bottom: 3px solid var(--accent-color); padding-bottom: 20px; margin-bottom: 20px;">`;

    if (currentState.profilePhoto) {
        html += `<div style="float: right; margin-left: 20px;">
            <img src="${currentState.profilePhoto}" style="width: 90px; height: 90px; border-radius: 8px; object-fit: cover; border: 2px solid var(--accent-color);" alt="Profile">
        </div>`;
    }

    if (fullName) html += `<h1 style="font-size: 28px; font-weight: 700; color: var(--accent-color); margin: 0 0 4px 0; letter-spacing: -0.5px;">${escapeHtml(trUpperCase(fullName))}</h1>`;
    if (data.title) html += `<p style="font-size: 14px; color: #666; margin: 0 0 12px 0;">${escapeHtml(data.title)}</p>`;

    // Contact row - inline
    const contacts = [];
    if (data.email) contacts.push(`${getIcon('email')} ${escapeHtml(data.email)}`);
    if (data.phone) contacts.push(`${getIcon('phone')} ${escapeHtml(data.phone)}`);
    if (data.city) contacts.push(`${getIcon('location')} ${escapeHtml(data.city)}`);
    if (data.linkedin) contacts.push(`${getIcon('linkedin')} ${escapeHtml(data.linkedin)}`);

    if (contacts.length > 0) {
        html += `<div style="display: flex; flex-wrap: wrap; gap: 16px; font-size: 10px; color: #444;">${contacts.join('')}</div>`;
    }
    html += `<div style="clear: both;"></div></div>`;

    // Summary
    if (data.summary) {
        html += `<div style="margin-bottom: 18px;">
            <h2 style="font-size: 11px; font-weight: 700; color: var(--accent-color); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 6px; border-bottom: 1px solid #e5e5e5; padding-bottom: 4px;">${t.professionalSummary}</h2>
            <p style="font-size: 10px; color: #333; line-height: 1.5; text-align: justify;">${escapeHtml(data.summary)}</p>
        </div>`;
    }

    // Experience
    if (data.experiences.length > 0) {
        html += `<div style="margin-bottom: 18px;">
            <h2 style="font-size: 11px; font-weight: 700; color: var(--accent-color); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px; border-bottom: 1px solid #e5e5e5; padding-bottom: 4px;">${t.workExperience}</h2>`;
        data.experiences.forEach(exp => {
            html += `<div style="margin-bottom: 10px;">
                <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                    <div>
                        <div style="font-size: 11px; font-weight: 600; color: #111;">${escapeHtml(exp.position)}</div>
                        <div style="font-size: 10px; color: #666;">${escapeHtml(exp.company)}${exp.location ? ` • ${escapeHtml(exp.location)}` : ''}</div>
                    </div>
                    <span style="font-size: 9px; color: #888; white-space: nowrap;">${exp.startDate}${exp.isCurrent ? ` - ${t.present}` : (exp.endDate ? ` - ${exp.endDate}` : '')}</span>
                </div>
                ${exp.description ? `<div style="font-size: 9px; color: #444; margin-top: 4px; line-height: 1.4;">${formatDescription(exp.description)}</div>` : ''}
            </div>`;
        });
        html += `</div>`;
    }

    // Education
    if (data.education.length > 0) {
        html += `<div style="margin-bottom: 18px;">
            <h2 style="font-size: 11px; font-weight: 700; color: var(--accent-color); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px; border-bottom: 1px solid #e5e5e5; padding-bottom: 4px;">${t.education}</h2>`;
        data.education.forEach(edu => {
            html += `<div style="margin-bottom: 8px;">
                <div style="display: flex; justify-content: space-between;">
                    <div>
                        <div style="font-size: 11px; font-weight: 600; color: #111;">${escapeHtml(edu.school)}</div>
                        <div style="font-size: 10px; color: #666;">${escapeHtml(edu.field)}${edu.degree ? ` - ${escapeHtml(edu.degree)}` : ''}</div>
                    </div>
                    <span style="font-size: 9px; color: #888;">${edu.startYear}${edu.endYear ? ` - ${edu.endYear}` : ''}</span>
                </div>
            </div>`;
        });
        html += `</div>`;
    }

    // Skills - Tag style
    if (data.technicalSkills) {
        const skills = data.technicalSkills.split(',').map(s => s.trim()).filter(s => s);
        if (skills.length > 0) {
            html += `<div style="margin-bottom: 18px;">
                <h2 style="font-size: 11px; font-weight: 700; color: var(--accent-color); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px; border-bottom: 1px solid #e5e5e5; padding-bottom: 4px;">${t.technicalSkills}</h2>
                <div style="display: flex; flex-wrap: wrap; gap: 6px;">
                    ${skills.map(s => `<span style="background: var(--accent-color); color: white; padding: 3px 10px; border-radius: 4px; font-size: 9px; font-weight: 500;">${escapeHtml(s)}</span>`).join('')}
                </div>
            </div>`;
        }
    }

    // Languages - Inline
    if (data.languages.length > 0) {
        html += `<div style="margin-bottom: 18px;">
            <h2 style="font-size: 11px; font-weight: 700; color: var(--accent-color); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px; border-bottom: 1px solid #e5e5e5; padding-bottom: 4px;">${t.languages}</h2>
            <div style="display: flex; flex-wrap: wrap; gap: 16px;">
                ${data.languages.map(l => `<span style="font-size: 10px;"><strong>${escapeHtml(l.name)}</strong>: ${escapeHtml(l.level)}</span>`).join('')}
            </div>
        </div>`;
    }

    cvPreview.innerHTML = html;
}

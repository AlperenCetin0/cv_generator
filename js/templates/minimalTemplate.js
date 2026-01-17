/* ============================================
   MINIMAL TEMPLATE RENDERER
   Ultra clean, just text, maximum whitespace
   ============================================ */

import { currentState } from '../config/state.js';
import { translations } from '../config/translations.js';
import { escapeHtml, formatDescription, trUpperCase } from '../utils/helpers.js';
import { cvPreview } from '../dom/elements.js';

export function renderMinimalTemplate(data) {
    const fullName = `${data.firstName} ${data.lastName}`.trim();
    const t = translations[currentState.language];
    let html = '';

    // Minimal Header - Just text, lots of space
    html += `<div style="margin-bottom: 30px;">`;

    if (fullName) html += `<h1 style="font-size: 32px; font-weight: 300; color: #111; margin: 0 0 2px 0; letter-spacing: -1px;">${escapeHtml(fullName)}</h1>`;
    if (data.title) html += `<p style="font-size: 13px; color: #666; margin: 0 0 15px 0; font-weight: 400;">${escapeHtml(data.title)}</p>`;

    // Contact - simple line
    const contacts = [];
    if (data.email) contacts.push(escapeHtml(data.email));
    if (data.phone) contacts.push(escapeHtml(data.phone));
    if (data.city) contacts.push(escapeHtml(data.city));
    if (data.linkedin) contacts.push(escapeHtml(data.linkedin));

    if (contacts.length > 0) {
        html += `<p style="font-size: 10px; color: #888;">${contacts.join('  •  ')}</p>`;
    }

    // Photo - small, right-aligned if exists (optional for minimal)
    if (currentState.profilePhoto) {
        html += `<img src="${currentState.profilePhoto}" style="float: right; width: 60px; height: 60px; border-radius: 50%; object-fit: cover; margin-top: -70px;" alt="">`;
    }

    html += `</div>`;

    // Summary - No header, just text
    if (data.summary) {
        html += `<p style="font-size: 11px; color: #444; line-height: 1.7; margin-bottom: 25px; max-width: 90%;">${escapeHtml(data.summary)}</p>`;
    }

    // Experience - Minimal headers
    if (data.experiences.length > 0) {
        html += `<div style="margin-bottom: 25px;">
            <h2 style="font-size: 10px; font-weight: 600; color: #999; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 15px;">${t.workExperience}</h2>`;
        data.experiences.forEach(exp => {
            html += `<div style="margin-bottom: 15px;">
                <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px;">
                    <span style="font-size: 12px; font-weight: 500; color: #111;">${escapeHtml(exp.position)}</span>
                    <span style="font-size: 9px; color: #aaa;">${exp.startDate} — ${exp.isCurrent ? t.present : exp.endDate || ''}</span>
                </div>
                <div style="font-size: 10px; color: #666; margin-bottom: 4px;">${escapeHtml(exp.company)}</div>
                ${exp.description ? `<div style="font-size: 10px; color: #555; line-height: 1.5;">${formatDescription(exp.description)}</div>` : ''}
            </div>`;
        });
        html += `</div>`;
    }

    // Education
    if (data.education.length > 0) {
        html += `<div style="margin-bottom: 25px;">
            <h2 style="font-size: 10px; font-weight: 600; color: #999; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 15px;">${t.education}</h2>`;
        data.education.forEach(edu => {
            html += `<div style="margin-bottom: 10px;">
                <div style="display: flex; justify-content: space-between; align-items: baseline;">
                    <span style="font-size: 11px; font-weight: 500; color: #111;">${escapeHtml(edu.school)}</span>
                    <span style="font-size: 9px; color: #aaa;">${edu.startYear} — ${edu.endYear || ''}</span>
                </div>
                <div style="font-size: 10px; color: #666;">${escapeHtml(edu.field)}</div>
            </div>`;
        });
        html += `</div>`;
    }

    // Skills - Just comma separated
    if (data.technicalSkills) {
        html += `<div style="margin-bottom: 25px;">
            <h2 style="font-size: 10px; font-weight: 600; color: #999; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 10px;">${t.technicalSkills}</h2>
            <p style="font-size: 10px; color: #444; line-height: 1.6;">${escapeHtml(data.technicalSkills)}</p>
        </div>`;
    }

    // Languages - Simple
    if (data.languages.length > 0) {
        html += `<div style="margin-bottom: 25px;">
            <h2 style="font-size: 10px; font-weight: 600; color: #999; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 10px;">${t.languages}</h2>
            <p style="font-size: 10px; color: #444;">${data.languages.map(l => `${escapeHtml(l.name)} (${escapeHtml(l.level)})`).join('  •  ')}</p>
        </div>`;
    }

    cvPreview.innerHTML = html;
}

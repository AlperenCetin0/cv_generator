/* ============================================
   CLASSIC TEMPLATE RENDERER
   Traditional, formal, serif fonts, double borders
   ============================================ */

import { currentState } from '../config/state.js';
import { translations } from '../config/translations.js';
import { escapeHtml, formatDescription, trUpperCase } from '../utils/helpers.js';
import { formatBirthDate } from '../data/formatters.js';
import { cvPreview } from '../dom/elements.js';

export function renderClassicTemplate(data) {
    const fullName = `${data.firstName} ${data.lastName}`.trim();
    const t = translations[currentState.language];
    let html = '';

    // Classic Header - Centered, serif, double border
    html += `<div style="text-align: center; border-top: 3px double #333; border-bottom: 3px double #333; padding: 20px 0; margin-bottom: 20px;">`;

    if (currentState.profilePhoto) {
        html += `<img src="${currentState.profilePhoto}" style="width: 100px; height: 120px; object-fit: cover; margin-bottom: 12px; border: 1px solid #333;" alt="Profile">`;
    }

    if (fullName) html += `<h1 style="font-family: 'Playfair Display', Georgia, serif; font-size: 26px; font-weight: 400; color: #111; margin: 0 0 4px 0; letter-spacing: 3px;">${escapeHtml(trUpperCase(fullName))}</h1>`;
    if (data.title) html += `<p style="font-family: 'Playfair Display', Georgia, serif; font-size: 13px; color: #555; font-style: italic; margin: 0;">${escapeHtml(data.title)}</p>`;

    // Contact - formal style
    const contacts = [];
    if (data.email) contacts.push(escapeHtml(data.email));
    if (data.phone) contacts.push(escapeHtml(data.phone));
    if (data.city) contacts.push(escapeHtml(data.city));

    if (contacts.length > 0) {
        html += `<p style="font-size: 10px; color: #666; margin-top: 10px; letter-spacing: 1px;">${contacts.join(' | ')}</p>`;
    }
    html += `</div>`;

    // Summary - Italic intro
    if (data.summary) {
        html += `<div style="margin-bottom: 20px; padding: 0 20px;">
            <p style="font-family: 'Playfair Display', Georgia, serif; font-size: 11px; color: #333; line-height: 1.6; text-align: center; font-style: italic;">"${escapeHtml(data.summary)}"</p>
        </div>`;
    }

    // Experience - Traditional layout
    if (data.experiences.length > 0) {
        html += `<div style="margin-bottom: 18px;">
            <h2 style="font-family: 'Playfair Display', Georgia, serif; font-size: 13px; font-weight: 400; color: #111; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 10px; border-bottom: 1px solid #ccc; padding-bottom: 5px;">${t.workExperience}</h2>`;
        data.experiences.forEach(exp => {
            html += `<div style="margin-bottom: 12px; padding-left: 15px; border-left: 2px solid #ddd;">
                <div style="font-family: 'Playfair Display', Georgia, serif; font-size: 11px; font-weight: 600; color: #111;">${escapeHtml(exp.position)}</div>
                <div style="font-size: 10px; color: #666; margin-bottom: 3px;">${escapeHtml(exp.company)} | ${exp.startDate}${exp.isCurrent ? ` - ${t.present}` : (exp.endDate ? ` - ${exp.endDate}` : '')}</div>
                ${exp.description ? `<div style="font-size: 9px; color: #444; line-height: 1.5;">${formatDescription(exp.description)}</div>` : ''}
            </div>`;
        });
        html += `</div>`;
    }

    // Education
    if (data.education.length > 0) {
        html += `<div style="margin-bottom: 18px;">
            <h2 style="font-family: 'Playfair Display', Georgia, serif; font-size: 13px; font-weight: 400; color: #111; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 10px; border-bottom: 1px solid #ccc; padding-bottom: 5px;">${t.education}</h2>`;
        data.education.forEach(edu => {
            html += `<div style="margin-bottom: 8px; padding-left: 15px; border-left: 2px solid #ddd;">
                <div style="font-family: 'Playfair Display', Georgia, serif; font-size: 11px; font-weight: 600;">${escapeHtml(edu.school)}</div>
                <div style="font-size: 10px; color: #666;">${escapeHtml(edu.field)} ${edu.degree ? `(${escapeHtml(edu.degree)})` : ''} | ${edu.startYear} - ${edu.endYear || ''}</div>
            </div>`;
        });
        html += `</div>`;
    }

    // Skills - Simple list
    if (data.technicalSkills) {
        html += `<div style="margin-bottom: 18px;">
            <h2 style="font-family: 'Playfair Display', Georgia, serif; font-size: 13px; font-weight: 400; color: #111; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 10px; border-bottom: 1px solid #ccc; padding-bottom: 5px;">${t.technicalSkills}</h2>
            <p style="font-size: 10px; color: #333; line-height: 1.6;">${escapeHtml(data.technicalSkills)}</p>
        </div>`;
    }

    // Languages - Table style
    if (data.languages.length > 0) {
        html += `<div style="margin-bottom: 18px;">
            <h2 style="font-family: 'Playfair Display', Georgia, serif; font-size: 13px; font-weight: 400; color: #111; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 10px; border-bottom: 1px solid #ccc; padding-bottom: 5px;">${t.languages}</h2>
            <table style="width: 100%; font-size: 10px; border-collapse: collapse;">
                ${data.languages.map(l => `<tr><td style="padding: 4px 0; border-bottom: 1px dotted #ddd;">${escapeHtml(l.name)}</td><td style="text-align: right; padding: 4px 0; border-bottom: 1px dotted #ddd; color: #666;">${escapeHtml(l.level)}</td></tr>`).join('')}
            </table>
        </div>`;
    }

    cvPreview.innerHTML = html;
}

/* ============================================
   CREATIVE TEMPLATE RENDERER
   Premium two-column layout, full-height sidebar
   ============================================ */

import { currentState } from '../config/state.js';
import { translations } from '../config/translations.js';
import { escapeHtml, formatDescription, trUpperCase } from '../utils/helpers.js';
import { cvPreview } from '../dom/elements.js';

export function renderCreativeTemplate(data) {
    const fullName = `${data.firstName} ${data.lastName}`.trim();
    const t = translations[currentState.language];
    const accentColor = currentState.themeColor || '#2563eb';

    // Full page wrapper with grid - ensures full height
    let html = `<div style="
        display: grid;
        grid-template-columns: 210px 1fr;
        min-height: 842px;
        margin: -32px -36px;
        background: white;
    ">`;

    // ═══════════════════════════════════════════════
    // LEFT SIDEBAR - Full height, elegant dark panel
    // ═══════════════════════════════════════════════
    html += `<div style="
        background: linear-gradient(180deg, ${accentColor} 0%, ${adjustColor(accentColor, -30)} 100%);
        color: white;
        padding: 32px 18px;
        display: flex;
        flex-direction: column;
    ">`;

    // Profile Photo - Elegant circular with ring
    if (currentState.profilePhoto) {
        html += `<div style="text-align: center; margin-bottom: 24px;">
            <div style="
                width: 100px;
                height: 100px;
                margin: 0 auto;
                border-radius: 50%;
                padding: 4px;
                background: rgba(255,255,255,0.2);
            ">
                <img src="${currentState.profilePhoto}" style="
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                    object-fit: cover;
                " alt="Profile">
            </div>
        </div>`;
    }

    // Name & Title - Centered, elegant
    if (fullName) {
        html += `<h1 style="
            font-size: 15px;
            font-weight: 700;
            text-align: center;
            margin: 0 0 4px 0;
            letter-spacing: 0.5px;
            line-height: 1.3;
        ">${escapeHtml(trUpperCase(fullName))}</h1>`;
    }
    if (data.title) {
        html += `<p style="
            font-size: 10px;
            text-align: center;
            opacity: 0.85;
            margin: 0 0 28px 0;
            font-weight: 300;
        ">${escapeHtml(data.title)}</p>`;
    }

    // ─────────────────────────────────────────────
    // CONTACT SECTION
    // ─────────────────────────────────────────────
    const hasContact = data.email || data.phone || data.city || data.linkedin;
    if (hasContact) {
        html += sidebarSection(t.contactInfo, `
            ${data.email ? sidebarItem('✉', data.email) : ''}
            ${data.phone ? sidebarItem('☎', data.phone) : ''}
            ${data.city ? sidebarItem('◎', data.city) : ''}
            ${data.linkedin ? sidebarItem('in', data.linkedin, true) : ''}
        `);
    }

    // ─────────────────────────────────────────────
    // SKILLS - Compact pills
    // ─────────────────────────────────────────────
    if (data.technicalSkills) {
        const skills = data.technicalSkills.split(',').map(s => s.trim()).filter(s => s).slice(0, 10);
        if (skills.length > 0) {
            html += sidebarSection(t.technicalSkills, `
                <div style="display: flex; flex-wrap: wrap; gap: 5px;">
                    ${skills.map(s => `<span style="
                        background: rgba(255,255,255,0.15);
                        backdrop-filter: blur(4px);
                        padding: 4px 10px;
                        border-radius: 12px;
                        font-size: 8px;
                        font-weight: 500;
                    ">${escapeHtml(s)}</span>`).join('')}
                </div>
            `);
        }
    }

    // ─────────────────────────────────────────────
    // LANGUAGES - Elegant bars
    // ─────────────────────────────────────────────
    if (data.languages.length > 0) {
        html += sidebarSection(t.languages, data.languages.slice(0, 4).map(l => {
            const width = getLevelWidth(l.level);
            return `<div style="margin-bottom: 10px;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                    <span style="font-size: 9px; font-weight: 500;">${escapeHtml(l.name)}</span>
                    <span style="font-size: 8px; opacity: 0.7;">${escapeHtml(l.level)}</span>
                </div>
                <div style="height: 3px; background: rgba(255,255,255,0.15); border-radius: 2px;">
                    <div style="height: 100%; width: ${width}; background: rgba(255,255,255,0.9); border-radius: 2px;"></div>
                </div>
            </div>`;
        }).join(''));
    }

    // ─────────────────────────────────────────────
    // INTERESTS (fills remaining space)
    // ─────────────────────────────────────────────
    if (data.hobbies) {
        html += `<div style="flex: 1;"></div>`; // Spacer
        html += sidebarSection(t.interests, `
            <p style="font-size: 9px; line-height: 1.6; opacity: 0.9;">${escapeHtml(data.hobbies)}</p>
        `);
    }

    html += `</div>`; // End sidebar

    // ═══════════════════════════════════════════════
    // RIGHT MAIN CONTENT
    // ═══════════════════════════════════════════════
    html += `<div style="padding: 32px 28px; background: #fafafa;">`;

    // Summary - Card style
    if (data.summary) {
        html += mainSection(t.professionalSummary, `
            <p style="font-size: 10px; color: #444; line-height: 1.7;">${escapeHtml(data.summary)}</p>
        `, accentColor);
    }

    // Experience - Timeline with dots
    if (data.experiences.length > 0) {
        html += mainSection(t.workExperience, data.experiences.map((exp, i) => `
            <div style="
                position: relative;
                padding-left: 20px;
                padding-bottom: ${i === data.experiences.length - 1 ? '0' : '16px'};
                border-left: 2px solid ${i === 0 ? accentColor : '#e0e0e0'};
            ">
                <div style="
                    position: absolute;
                    left: -6px;
                    top: 0;
                    width: 10px;
                    height: 10px;
                    background: ${i === 0 ? accentColor : '#ccc'};
                    border-radius: 50%;
                    border: 2px solid white;
                    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
                "></div>
                <div style="font-size: 11px; font-weight: 600; color: #111;">${escapeHtml(exp.position)}</div>
                <div style="font-size: 10px; color: ${accentColor}; font-weight: 500;">${escapeHtml(exp.company)}</div>
                <div style="font-size: 9px; color: #999; margin: 4px 0 6px;">${exp.startDate} — ${exp.isCurrent ? t.present : exp.endDate || ''}</div>
                ${exp.description ? `<div style="font-size: 9px; color: #555; line-height: 1.5;">${formatDescription(exp.description)}</div>` : ''}
            </div>
        `).join(''), accentColor);
    }

    // Education - Same timeline style
    if (data.education.length > 0) {
        html += mainSection(t.education, data.education.map((edu, i) => `
            <div style="
                position: relative;
                padding-left: 20px;
                padding-bottom: ${i === data.education.length - 1 ? '0' : '12px'};
                border-left: 2px solid ${i === 0 ? accentColor : '#e0e0e0'};
            ">
                <div style="
                    position: absolute;
                    left: -6px;
                    top: 0;
                    width: 10px;
                    height: 10px;
                    background: ${i === 0 ? accentColor : '#ccc'};
                    border-radius: 50%;
                    border: 2px solid white;
                "></div>
                <div style="font-size: 11px; font-weight: 600; color: #111;">${escapeHtml(edu.school)}</div>
                <div style="font-size: 10px; color: #666;">${escapeHtml(edu.field)}${edu.degree ? ` • ${escapeHtml(edu.degree)}` : ''}</div>
                <div style="font-size: 9px; color: #999;">${edu.startYear} — ${edu.endYear || t.present}</div>
            </div>
        `).join(''), accentColor);
    }

    // Certificates - Badge style
    if (data.certificates && data.certificates.length > 0) {
        html += mainSection(t.certificates, `
            <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                ${data.certificates.map(cert => `
                    <div style="
                        background: white;
                        padding: 10px 14px;
                        border-radius: 8px;
                        border-left: 3px solid ${accentColor};
                        box-shadow: 0 1px 3px rgba(0,0,0,0.06);
                    ">
                        <div style="font-size: 10px; font-weight: 600; color: #111;">${escapeHtml(cert.name)}</div>
                        <div style="font-size: 9px; color: #666;">${escapeHtml(cert.issuer)}${cert.date ? ` • ${cert.date}` : ''}</div>
                    </div>
                `).join('')}
            </div>
        `, accentColor);
    }

    // Projects
    if (data.projects && data.projects.length > 0) {
        html += mainSection(t.projects, data.projects.map(proj => `
            <div style="margin-bottom: 12px; padding: 12px; background: white; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
                <div style="font-size: 11px; font-weight: 600; color: #111;">${escapeHtml(proj.name)}</div>
                ${proj.role ? `<div style="font-size: 10px; color: ${accentColor};">${escapeHtml(proj.role)}</div>` : ''}
                ${proj.description ? `<div style="font-size: 9px; color: #555; margin-top: 4px; line-height: 1.5;">${escapeHtml(proj.description)}</div>` : ''}
                ${proj.tech ? `<div style="font-size: 8px; color: #888; margin-top: 6px;">🛠 ${escapeHtml(proj.tech)}</div>` : ''}
            </div>
        `).join(''), accentColor);
    }

    // Awards
    if (data.awards && data.awards.length > 0) {
        html += mainSection(t.awards, `
            <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                ${data.awards.map(award => `
                    <div style="background: white; padding: 8px 12px; border-radius: 6px; border-left: 3px solid gold; box-shadow: 0 1px 2px rgba(0,0,0,0.05);">
                        <div style="font-size: 10px; font-weight: 600; color: #111;">🏆 ${escapeHtml(award.name)}</div>
                        <div style="font-size: 9px; color: #666;">${escapeHtml(award.issuer)}${award.date ? ` • ${award.date}` : ''}</div>
                    </div>
                `).join('')}
            </div>
        `, accentColor);
    }

    // Publications
    if (data.publications && data.publications.length > 0) {
        html += mainSection(t.publications, data.publications.map(pub => `
            <div style="margin-bottom: 10px;">
                <div style="font-size: 10px; font-weight: 600; color: #111;">${escapeHtml(pub.title)}</div>
                <div style="font-size: 9px; color: #666;">${escapeHtml(pub.authors)} • ${escapeHtml(pub.venue)}${pub.date ? ` (${pub.date})` : ''}</div>
            </div>
        `).join(''), accentColor);
    }

    // Memberships
    if (data.memberships && data.memberships.length > 0) {
        html += mainSection(t.memberships, `
            <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                ${data.memberships.map(m => `
                    <span style="background: white; padding: 6px 12px; border-radius: 16px; font-size: 9px; box-shadow: 0 1px 2px rgba(0,0,0,0.05);">
                        ${escapeHtml(m.org)}${m.role ? ` - ${escapeHtml(m.role)}` : ''}
                    </span>
                `).join('')}
            </div>
        `, accentColor);
    }

    // Volunteer Experience
    if (data.volunteers && data.volunteers.length > 0) {
        html += mainSection(t.volunteers, data.volunteers.map(vol => `
            <div style="margin-bottom: 10px;">
                <div style="display: flex; justify-content: space-between;">
                    <div style="font-size: 10px; font-weight: 600; color: #111;">${escapeHtml(vol.org)}</div>
                    <div style="font-size: 9px; color: #999;">${vol.startDate} — ${vol.endDate || t.present}</div>
                </div>
                ${vol.role ? `<div style="font-size: 9px; color: ${accentColor};">${escapeHtml(vol.role)}</div>` : ''}
                ${vol.description ? `<div style="font-size: 9px; color: #555; margin-top: 3px;">${escapeHtml(vol.description)}</div>` : ''}
            </div>
        `).join(''), accentColor);
    }

    // References
    if (data.references && data.references.length > 0) {
        html += mainSection(t.references, `
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                ${data.references.map(ref => `
                    <div style="background: white; padding: 10px; border-radius: 8px; box-shadow: 0 1px 2px rgba(0,0,0,0.05);">
                        <div style="font-size: 10px; font-weight: 600; color: #111;">${escapeHtml(ref.name)}</div>
                        <div style="font-size: 9px; color: #666;">${escapeHtml(ref.position)}</div>
                        <div style="font-size: 9px; color: #888;">${escapeHtml(ref.company)}</div>
                        ${ref.email ? `<div style="font-size: 8px; color: ${accentColor}; margin-top: 4px;">${escapeHtml(ref.email)}</div>` : ''}
                    </div>
                `).join('')}
            </div>
        `, accentColor);
    }

    // Reference on request
    if (data.referenceOnRequest) {
        html += `<div style="font-size: 9px; color: #888; font-style: italic; margin-top: 16px;">${currentState.language === 'tr' ? 'Referanslar istek üzerine sunulabilir.' : 'References available upon request.'}</div>`;
    }

    html += `</div>`; // End main content
    html += `</div>`; // End grid

    cvPreview.innerHTML = html;
}

// ─────────────────────────────────────────────────────
// HELPER FUNCTIONS
// ─────────────────────────────────────────────────────

function sidebarSection(title, content) {
    return `<div style="margin-bottom: 24px;">
        <h3 style="
            font-size: 8px;
            text-transform: uppercase;
            letter-spacing: 1.5px;
            opacity: 0.5;
            margin-bottom: 12px;
            padding-bottom: 6px;
            border-bottom: 1px solid rgba(255,255,255,0.1);
        ">${title}</h3>
        ${content}
    </div>`;
}

function sidebarItem(icon, text, small = false) {
    return `<p style="
        font-size: ${small ? '8px' : '9px'};
        margin: 8px 0;
        display: flex;
        align-items: flex-start;
        gap: 8px;
        word-break: break-word;
        line-height: 1.4;
    ">
        <span style="opacity: 0.7; flex-shrink: 0;">${icon}</span>
        <span>${escapeHtml(text)}</span>
    </p>`;
}

function mainSection(title, content, accentColor) {
    return `<div style="margin-bottom: 24px;">
        <h2 style="
            font-size: 11px;
            font-weight: 700;
            color: ${accentColor};
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 14px;
            display: flex;
            align-items: center;
            gap: 10px;
        ">
            <span style="width: 24px; height: 2px; background: ${accentColor};"></span>
            ${title}
        </h2>
        ${content}
    </div>`;
}

function getLevelWidth(level) {
    const l = level.toLowerCase();
    if (l.includes('c2') || l.includes('ana') || l.includes('native')) return '100%';
    if (l.includes('c1') || l.includes('ileri') || l.includes('fluent')) return '85%';
    if (l.includes('b2') || l.includes('üstü')) return '70%';
    if (l.includes('b1') || l.includes('orta')) return '55%';
    if (l.includes('a2') || l.includes('temel')) return '35%';
    return '20%';
}

function adjustColor(hex, amount) {
    // Darken or lighten color
    let r = parseInt(hex.slice(1, 3), 16);
    let g = parseInt(hex.slice(3, 5), 16);
    let b = parseInt(hex.slice(5, 7), 16);
    r = Math.max(0, Math.min(255, r + amount));
    g = Math.max(0, Math.min(255, g + amount));
    b = Math.max(0, Math.min(255, b + amount));
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

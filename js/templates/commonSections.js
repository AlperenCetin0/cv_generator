/* ============================================
   COMMON SECTIONS RENDERER
   ============================================ */

import { currentState } from '../config/state.js';
import { translations } from '../config/translations.js';
import { escapeHtml, formatDescription } from '../utils/helpers.js';
import { formatBirthDate } from '../data/formatters.js';
import { getIcon } from './icons.js';

export function renderCommonSections(data, isClassic = false) {
    let html = '';
    const t = translations[currentState.language];
    const sectionTitleStyle = isClassic ? `border-bottom: 2px solid var(--accent-color); color: var(--accent-color);` : `border-bottom-color: var(--accent-color);`;

    // Contact Information
    const hasContact = data.email || data.phone || data.address || data.city || data.linkedin || data.website || data.github;
    if (hasContact) {
        html += `<div class="cv-section"><h2 class="cv-section-title" style="${sectionTitleStyle}">${t.contactInfo}</h2><div class="cv-contact-grid">`;
        if (data.email) html += `<div class="cv-contact-row"><span class="cv-contact-label">${getIcon('email')} ${t.emailLabel}:</span><span class="cv-contact-value">${escapeHtml(data.email)}</span></div>`;
        if (data.phone) html += `<div class="cv-contact-row"><span class="cv-contact-label">${getIcon('phone')} ${t.phoneLabel}:</span><span class="cv-contact-value">${escapeHtml(data.phone)}</span></div>`;
        let addr = [data.address, data.postalCode, data.city].filter(x => x).join(', ');
        if (addr) html += `<div class="cv-contact-row"><span class="cv-contact-label">${getIcon('location')} ${t.addressLabel}:</span><span class="cv-contact-value">${escapeHtml(addr)}</span></div>`;
        if (data.linkedin) html += `<div class="cv-contact-row"><span class="cv-contact-label">${getIcon('linkedin')} LinkedIn:</span><span class="cv-contact-value">${escapeHtml(data.linkedin)}</span></div>`;
        if (data.website) html += `<div class="cv-contact-row"><span class="cv-contact-label">${getIcon('website')} ${t.websiteLabel}:</span><span class="cv-contact-value">${escapeHtml(data.website)}</span></div>`;
        if (data.github) html += `<div class="cv-contact-row"><span class="cv-contact-label">${getIcon('github')} GitHub:</span><span class="cv-contact-value">${escapeHtml(data.github)}</span></div>`;
        html += `</div></div>`;
    }

    // Personal Information
    const hasPersonal = data.birthDate || data.birthPlace || data.nationality || data.maritalStatus || data.militaryStatus || data.drivingLicense;
    if (hasPersonal) {
        html += `<div class="cv-section"><h2 class="cv-section-title" style="${sectionTitleStyle}">${t.personalInfo}</h2><div class="cv-contact-grid">`;
        if (data.birthDate) html += `<div class="cv-contact-row"><span class="cv-contact-label">${currentState.language === 'tr' ? 'Doğum Tarihi' : 'Date of Birth'}:</span><span class="cv-contact-value">${formatBirthDate(data.birthDate)}</span></div>`;
        if (data.birthPlace) html += `<div class="cv-contact-row"><span class="cv-contact-label">${currentState.language === 'tr' ? 'Doğum Yeri' : 'Place of Birth'}:</span><span class="cv-contact-value">${escapeHtml(data.birthPlace)}</span></div>`;
        if (data.nationality) html += `<div class="cv-contact-row"><span class="cv-contact-label">${currentState.language === 'tr' ? 'Uyruk' : 'Nationality'}:</span><span class="cv-contact-value">${escapeHtml(data.nationality)}</span></div>`;
        if (data.maritalStatus) html += `<div class="cv-contact-row"><span class="cv-contact-label">${currentState.language === 'tr' ? 'Medeni Durum' : 'Marital Status'}:</span><span class="cv-contact-value">${escapeHtml(data.maritalStatus)}</span></div>`;
        if (data.militaryStatus) {
            let statusText = escapeHtml(data.militaryStatus);
            if (data.militaryStatus === 'Tecilli' && data.militaryPostponedDate) {
                statusText += ` (${formatBirthDate(data.militaryPostponedDate)})`;
            }
            html += `<div class="cv-contact-row"><span class="cv-contact-label">${currentState.language === 'tr' ? 'Askerlik' : 'Military Status'}:</span><span class="cv-contact-value">${statusText}</span></div>`;
        }
        if (data.drivingLicense) html += `<div class="cv-contact-row"><span class="cv-contact-label">${currentState.language === 'tr' ? 'Ehliyet' : 'Driving License'}:</span><span class="cv-contact-value">${escapeHtml(data.drivingLicense)}</span></div>`;
        html += `</div></div>`;
    }

    // Summary
    if (data.summary) {
        html += `<div class="cv-section"><h2 class="cv-section-title" style="${sectionTitleStyle}">${t.professionalSummary}</h2><p class="cv-summary">${escapeHtml(data.summary)}</p></div>`;
    }

    // Experience
    if (data.experiences.length > 0) {
        html += `<div class="cv-section"><h2 class="cv-section-title" style="${sectionTitleStyle}">${t.workExperience}</h2>`;
        data.experiences.forEach(exp => {
            html += `<div class="cv-item">
                <div class="cv-item-header">
                    <div><div class="cv-item-title" style="${isClassic ? 'color: var(--accent-color)' : ''}">${escapeHtml(exp.position)}${exp.type ? ` (${escapeHtml(exp.type)})` : ''}</div>
                    <div class="cv-item-subtitle">${escapeHtml(exp.company)}${exp.location ? `, ${escapeHtml(exp.location)}` : ''}</div></div>
                    <span class="cv-item-date">${exp.startDate}${exp.isCurrent ? ` - ${t.present}` : (exp.endDate ? ` - ${exp.endDate}` : '')}</span>
                </div>
                ${exp.description ? `<div class="cv-item-description">${formatDescription(exp.description)}</div>` : ''}
            </div>`;
        });
        html += `</div>`;
    }

    // Education
    if (data.education.length > 0) {
        html += `<div class="cv-section"><h2 class="cv-section-title" style="${sectionTitleStyle}">${t.education}</h2>`;
        data.education.forEach(edu => {
            html += `<div class="cv-item">
                <div class="cv-item-header">
                    <div><div class="cv-item-title" style="${isClassic ? 'color: var(--accent-color)' : ''}">${escapeHtml(edu.school)}</div>
                    <div class="cv-item-subtitle">${escapeHtml(edu.field)}${edu.degree ? ` - ${escapeHtml(edu.degree)}` : ''}${edu.location ? `, ${escapeHtml(edu.location)}` : ''}</div></div>
                    <span class="cv-item-date">${edu.startYear}${edu.endYear ? ` - ${edu.endYear}` : ''}</span>
                </div>
                ${edu.gpa ? `<div class="cv-item-description">Okul Ortalaması: ${escapeHtml(edu.gpa)}</div>` : ''}
            </div>`;
        });
        html += `</div>`;
    }

    // Certificates
    if (data.certificates.length > 0) {
        html += `<div class="cv-section"><h2 class="cv-section-title" style="${sectionTitleStyle}">${t.certificates}</h2>`;
        data.certificates.forEach(cert => {
            html += `<div class="cv-item">
                <div class="cv-item-header">
                    <div><div class="cv-item-title" style="${isClassic ? 'color: var(--accent-color)' : ''}">${escapeHtml(cert.name)}</div>
                    <div class="cv-item-subtitle">${escapeHtml(cert.issuer)}</div></div>
                    <span class="cv-item-date">${cert.date}</span>
                </div>
            </div>`;
        });
        html += `</div>`;
    }

    // Technical Skills
    if (data.technicalSkills) {
        const skillsText = data.technicalSkills.trim();
        const isCategorized = skillsText.includes(':') && skillsText.split('\n').some(line => line.trim().endsWith(':'));

        if (isCategorized) {
            const categories = [];
            const lines = skillsText.split('\n');
            let currentCategory = null;

            lines.forEach(line => {
                const trimmedLine = line.trim();
                if (!trimmedLine) return;

                if (trimmedLine.endsWith(':')) {
                    if (currentCategory && currentCategory.skills.length > 0) {
                        categories.push(currentCategory);
                    }
                    currentCategory = { title: trimmedLine.slice(0, -1).trim(), skills: [] };
                } else if (currentCategory) {
                    const skillsInLine = trimmedLine.split(',').map(s => s.trim()).filter(s => s);
                    currentCategory.skills.push(...skillsInLine);
                }
            });

            if (currentCategory && currentCategory.skills.length > 0) {
                categories.push(currentCategory);
            }

            if (categories.length > 0) {
                html += `<div class="cv-section"><h2 class="cv-section-title" style="${sectionTitleStyle}">${t.technicalSkills}</h2>`;
                categories.forEach(category => {
                    html += `<div class="cv-skill-category">`;
                    html += `<div class="cv-skill-category-title">${escapeHtml(category.title)}</div>`;
                    html += `<div class="cv-skill-category-content">`;
                    html += category.skills.map(s => `<span class="cv-skill-tag" style="${isClassic ? 'border-color: var(--accent-color); border-radius: 0; background: transparent; color: inherit; padding: 2px 8px;' : ''}">${escapeHtml(s)}</span>`).join('');
                    html += `</div></div>`;
                });
                html += `</div>`;
            }
        } else {
            const skills = skillsText.split(',').map(s => s.trim()).filter(s => s);
            if (skills.length > 0) {
                html += `<div class="cv-section"><h2 class="cv-section-title" style="${sectionTitleStyle}">${t.technicalSkills}</h2>`;
                if (skills.length === 1 && !skillsText.includes(',')) {
                    html += `<div class="cv-summary">${escapeHtml(skillsText)}</div>`;
                } else {
                    html += `<div class="cv-skills-container">${skills.map(s => `<span class="cv-skill-tag" style="${isClassic ? 'border-color: var(--accent-color); border-radius: 0; background: transparent; color: inherit; padding: 2px 8px;' : ''}">${escapeHtml(s)}</span>`).join('')}</div>`;
                }
                html += `</div>`;
            }
        }
    }

    // Soft Skills
    if (data.softSkills) {
        const skills = data.softSkills.split(',').map(s => s.trim()).filter(s => s);
        if (skills.length > 0) {
            html += `<div class="cv-section"><h2 class="cv-section-title" style="${sectionTitleStyle}">${t.softSkills}</h2>`;
            if (skills.length === 1 && !data.softSkills.includes(',')) {
                html += `<div class="cv-summary">${escapeHtml(data.softSkills)}</div>`;
            } else {
                html += `<div class="cv-skills-container">${skills.map(s => `<span class="cv-skill-tag" style="${isClassic ? 'border-color: var(--accent-color); border-radius: 0; background: transparent; color: inherit; padding: 2px 8px;' : ''}">${escapeHtml(s)}</span>`).join('')}</div>`;
            }
            html += `</div>`;
        }
    }

    // Computer Skills
    if (data.computerSkills.length > 0) {
        html += `<div class="cv-section"><h2 class="cv-section-title" style="${sectionTitleStyle}">${t.computerSkills}</h2><div class="cv-languages-grid">`;
        data.computerSkills.forEach(cs => {
            html += `<div class="cv-language-item"><span class="cv-language-name">${escapeHtml(cs.name)}</span><span class="cv-language-level">${escapeHtml(cs.level)}</span></div>`;
        });
        html += `</div></div>`;
    }

    // Projects
    if (data.projects.length > 0) {
        html += `<div class="cv-section"><h2 class="cv-section-title" style="${sectionTitleStyle}">${t.projects}</h2>`;
        data.projects.forEach(proj => {
            html += `<div class="cv-item">
                <div class="cv-item-header">
                    <div><div class="cv-item-title" style="${isClassic ? 'color: var(--accent-color)' : ''}">${escapeHtml(proj.name)}</div>
                    ${proj.role ? `<div class="cv-item-subtitle">${escapeHtml(proj.role)}</div>` : ''}</div>
                    <span class="cv-item-date">${proj.startDate}${proj.endDate ? ` - ${proj.endDate}` : ''}</span>
                </div>
                ${proj.description ? `<div class="cv-item-description">${escapeHtml(proj.description)}</div>` : ''}
                ${proj.tech ? `<div class="cv-item-description"><strong>${t.technologies}:</strong> ${escapeHtml(proj.tech)}</div>` : ''}
            </div>`;
        });
        html += `</div>`;
    }

    // Publications
    if (data.publications.length > 0) {
        html += `<div class="cv-section"><h2 class="cv-section-title" style="${sectionTitleStyle}">${t.publications}</h2>`;
        data.publications.forEach(pub => {
            html += `<div class="cv-item">
                <div class="cv-item-header">
                    <div><div class="cv-item-title" style="${isClassic ? 'color: var(--accent-color)' : ''}">${escapeHtml(pub.title)}</div>
                    <div class="cv-item-subtitle">${escapeHtml(pub.authors)}${pub.venue ? `, ${escapeHtml(pub.venue)}` : ''}</div></div>
                    <span class="cv-item-date">${pub.date}</span>
                </div>
            </div>`;
        });
        html += `</div>`;
    }

    // Awards
    if (data.awards.length > 0) {
        html += `<div class="cv-section"><h2 class="cv-section-title" style="${sectionTitleStyle}">${t.awards}</h2>`;
        data.awards.forEach(award => {
            html += `<div class="cv-item">
                <div class="cv-item-header">
                    <div><div class="cv-item-title" style="${isClassic ? 'color: var(--accent-color)' : ''}">${escapeHtml(award.name)}</div>
                    <div class="cv-item-subtitle">${escapeHtml(award.issuer)}</div></div>
                    <span class="cv-item-date">${award.date}</span>
                </div>
            </div>`;
        });
        html += `</div>`;
    }

    // Memberships
    if (data.memberships.length > 0) {
        html += `<div class="cv-section"><h2 class="cv-section-title" style="${sectionTitleStyle}">${t.memberships}</h2>`;
        data.memberships.forEach(m => {
            html += `<div class="cv-item">
                <div class="cv-item-header">
                    <div><div class="cv-item-title" style="${isClassic ? 'color: var(--accent-color)' : ''}">${escapeHtml(m.org)}</div>
                    <div class="cv-item-subtitle">${escapeHtml(m.role)}</div></div>
                    <span class="cv-item-date">${m.startDate}${m.endDate ? ` - ${m.endDate}` : ''}</span>
                </div>
            </div>`;
        });
        html += `</div>`;
    }

    // Languages
    if (data.languages.length > 0) {
        html += `<div class="cv-section"><h2 class="cv-section-title" style="${sectionTitleStyle}">${t.languages}</h2><div class="cv-languages-grid">`;
        data.languages.forEach(lang => {
            html += `<div class="cv-language-item"><span class="cv-language-name">${escapeHtml(lang.name)}</span><span class="cv-language-level">${escapeHtml(lang.level)}</span></div>`;
        });
        html += `</div></div>`;
    }

    // Volunteers
    if (data.volunteers.length > 0) {
        html += `<div class="cv-section"><h2 class="cv-section-title" style="${sectionTitleStyle}">${t.volunteers}</h2>`;
        data.volunteers.forEach(v => {
            html += `<div class="cv-item">
                <div class="cv-item-header">
                    <div><div class="cv-item-title" style="${isClassic ? 'color: var(--accent-color)' : ''}">${escapeHtml(v.role)}</div>
                    <div class="cv-item-subtitle">${escapeHtml(v.org)}</div></div>
                    <span class="cv-item-date">${v.startDate}${v.endDate ? ` - ${v.endDate}` : ''}</span>
                </div>
                ${v.description ? `<div class="cv-item-description">${escapeHtml(v.description)}</div>` : ''}
            </div>`;
        });
        html += `</div>`;
    }

    // Interests
    if (data.hobbies) {
        html += `<div class="cv-section"><h2 class="cv-section-title" style="${sectionTitleStyle}">${t.interests}</h2><p class="cv-hobbies">${escapeHtml(data.hobbies)}</p></div>`;
    }

    // References
    if (data.references.length > 0 || data.referenceOnRequest) {
        html += `<div class="cv-section"><h2 class="cv-section-title" style="${sectionTitleStyle}">${t.references}</h2>`;
        if (data.referenceOnRequest && data.references.length === 0) {
            html += `<p class="cv-reference-note">${t.requestRef}</p>`;
        } else {
            html += `<div class="cv-references-grid">`;
            data.references.forEach(ref => {
                html += `<div class="cv-reference-item">
                    <div class="cv-reference-name">${escapeHtml(ref.name)}</div>
                    <div class="cv-reference-position">${escapeHtml(ref.position)}${ref.company ? `, ${escapeHtml(ref.company)}` : ''}</div>
                    <div class="cv-reference-contact">${ref.phone ? `${t.phoneLabel}: ${escapeHtml(ref.phone)}` : ''}${ref.email ? `${ref.phone ? ' | ' : ''}${escapeHtml(ref.email)}` : ''}</div>
                </div>`;
            });
            if (data.referenceOnRequest) {
                html += `<p class="cv-reference-note" style="grid-column: 1/-1">${t.requestRef}</p>`;
            }
            html += `</div>`;
        }
        html += `</div>`;
    }

    return html;
}

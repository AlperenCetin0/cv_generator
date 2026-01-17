/* ============================================
   ATS SCORE CHECKER
   ============================================ */

import { atsScoreBadge } from '../dom/elements.js';

export function updateATSCheck(data) {
    let score = 0;

    if (data.firstName && data.lastName) score += 10;
    if (data.email && data.phone) score += 10;
    if (data.summary && data.summary.length > 50) score += 15;
    if (data.experiences.length > 0) score += 20;
    if (data.education.length > 0) score += 15;
    if (data.technicalSkills && data.technicalSkills.split(',').length > 3) score += 15;
    if (data.languages.length > 0) score += 10;
    if (data.linkedin) score += 5;

    if (atsScoreBadge) {
        atsScoreBadge.textContent = `ATS Score: ${score}%`;
        atsScoreBadge.style.background = score > 70 ? '#dcfce7' : (score > 40 ? '#fef9c3' : '#fee2e2');
        atsScoreBadge.style.color = score > 70 ? '#166534' : (score > 40 ? '#854d0e' : '#991b1b');
    }
}

/* ============================================
   PREVIEW MANAGER
   ============================================ */

import { currentState } from '../config/state.js';
import { getFormData } from '../data/formData.js';
import { cvPreview } from '../dom/elements.js';
import { saveToLocalStorage } from '../storage/persistence.js';
import { renderModernTemplate } from '../templates/modernTemplate.js';
import { renderClassicTemplate } from '../templates/classicTemplate.js';
import { renderMinimalTemplate } from '../templates/minimalTemplate.js';
import { renderCreativeTemplate } from '../templates/creativeTemplate.js';

export function updatePreview() {
    const data = getFormData();
    const fullName = `${data.firstName} ${data.lastName}`.trim();

    // Apply Customization to Preview Container
    cvPreview.style.fontFamily = currentState.fontFamily;
    document.documentElement.style.setProperty('--accent-color', currentState.themeColor);

    // Check if any data exists
    const hasData = fullName || data.email || data.phone || data.address ||
        data.city || data.summary || data.technicalSkills || currentState.profilePhoto ||
        data.experiences.length > 0 || data.education.length > 0 ||
        data.certificates.length > 0 || data.languages.length > 0;

    if (!hasData) {
        cvPreview.innerHTML = `<div class="cv-placeholder"><p>${currentState.language === 'tr' ? "Bilgilerinizi girerek CV'nizi oluşturmaya başlayın" : "Start creating your CV by entering your information"}</p></div>`;
        return;
    }

    // Render based on selected template
    switch (currentState.template) {
        case 'classic':
            renderClassicTemplate(data);
            break;
        case 'creative':
            renderCreativeTemplate(data);
            break;
        case 'minimal':
            renderMinimalTemplate(data);
            break;
        case 'modern':
        default:
            renderModernTemplate(data);
            break;
    }

    saveToLocalStorage();
}

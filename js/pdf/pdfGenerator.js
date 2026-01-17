/* ============================================
   PDF GENERATOR
   ============================================ */

import { getFormData } from '../data/formData.js';
import { cvPreview, downloadBtn } from '../dom/elements.js';

export async function generatePDF() {
    const data = getFormData();
    const fullName = `${data.firstName} ${data.lastName}`.trim();

    if (!fullName) {
        alert('Lütfen en azından adınızı ve soyadınızı girin.');
        return;
    }

    downloadBtn.disabled = true;
    const originalText = downloadBtn.innerHTML;
    downloadBtn.innerHTML = 'Oluşturuluyor...';

    try {
        const opt = {
            margin: [10, 10, 10, 10],
            filename: `${fullName.replace(/\s+/g, '_')}_CV.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true, letterRendering: true, logging: false },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
            pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
        };
        await html2pdf().set(opt).from(cvPreview).save();
    } catch (error) {
        console.error('PDF oluşturulurken hata:', error);
        alert('PDF oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
        downloadBtn.disabled = false;
        downloadBtn.innerHTML = originalText;
    }
}

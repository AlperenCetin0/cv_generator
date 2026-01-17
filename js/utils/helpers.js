/* ============================================
   HELPER UTILITIES
   ============================================ */

// HTML escape
export function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Format description with bullets
export function formatDescription(text) {
    const lines = text.split('\n');
    const hasBullets = lines.some(line => line.trim().startsWith('-') || line.trim().startsWith('•'));
    if (hasBullets) {
        const items = lines.filter(l => l.trim()).map(l => l.replace(/^[-•]\s*/, '').trim()).filter(l => l);
        return `<ul>${items.map(i => `<li>${escapeHtml(i)}</li>`).join('')}</ul>`;
    }
    return escapeHtml(text);
}

// Debounce function
export function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Turkish uppercase
export function trUpperCase(text) {
    if (!text) return '';
    return text.toLocaleUpperCase('tr-TR');
}

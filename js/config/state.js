/* ============================================
   APPLICATION STATE & COUNTERS
   ============================================ */

// Counters for unique IDs
export const counters = {
    experience: 0,
    education: 0,
    certificate: 0,
    computerSkill: 0,
    language: 0,
    project: 0,
    publication: 0,
    award: 0,
    membership: 0,
    volunteer: 0,
    reference: 0
};

// Current application state
export const currentState = {
    template: 'modern',
    themeColor: '#000000',
    fontFamily: "'Inter', sans-serif",
    language: 'tr',
    profilePhoto: null
};

// Reset counters
export function resetCounters() {
    Object.keys(counters).forEach(k => counters[k] = 0);
}

/* ============================================
   THEME TOGGLE - Dark/Light Mode Manager
   ============================================ */

// Get initial theme from localStorage or system preference
function getInitialTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) return savedTheme;

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

// Apply theme to document
function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
}

// Toggle theme
export function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
    return newTheme;
}

// Initialize theme on load
export function initTheme() {
    const theme = getInitialTheme();
    applyTheme(theme);

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            applyTheme(e.matches ? 'dark' : 'light');
        }
    });
}

// Get current theme
export function getCurrentTheme() {
    return document.documentElement.getAttribute('data-theme') || 'light';
}

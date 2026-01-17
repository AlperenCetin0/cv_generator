/* ============================================
   TOAST NOTIFICATION SYSTEM
   ============================================ */

let toastContainer = null;

function ensureContainer() {
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container';
        document.body.appendChild(toastContainer);
    }
    return toastContainer;
}

export function showToast(message, type = 'success', duration = 3000) {
    const container = ensureContainer();

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <span>${message}</span>
        <button class="toast-close" onclick="this.parentElement.remove()">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
        </button>
    `;

    container.appendChild(toast);

    // Auto remove after duration
    setTimeout(() => {
        if (toast.parentElement) {
            toast.classList.add('hiding');
            setTimeout(() => toast.remove(), 300);
        }
    }, duration);

    return toast;
}

export function showSuccess(message) {
    return showToast(message, 'success');
}

export function showError(message) {
    return showToast(message, 'error');
}

export function showWarning(message) {
    return showToast(message, 'warning');
}

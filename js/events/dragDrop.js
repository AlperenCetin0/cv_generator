/* ============================================
   DRAG & DROP HANDLERS
   ============================================ */

import { updatePreview } from '../preview/previewManager.js';

let dragSrcEl = null;

export function handleDragStart(e) {
    if (e.target.classList.contains('dynamic-item')) {
        this.style.opacity = '0.4';
        dragSrcEl = this;
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', this.innerHTML);
    }
}

export function handleDragOver(e) {
    if (e.preventDefault) e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    return false;
}

export function handleDragEnter(e) {
    this.classList.add('over');
}

export function handleDragLeave(e) {
    this.classList.remove('over');
}

export function handleDrop(e) {
    if (e.stopPropagation) e.stopPropagation();
    if (dragSrcEl !== this) {
        const container = this.parentNode;
        const allItems = Array.from(container.querySelectorAll('.dynamic-item'));
        const srcIndex = allItems.indexOf(dragSrcEl);
        const targetIndex = allItems.indexOf(this);

        if (srcIndex < targetIndex) {
            container.insertBefore(dragSrcEl, this.nextSibling);
        } else {
            container.insertBefore(dragSrcEl, this);
        }
        updatePreview();
    }
    return false;
}

export function handleDragEnd(e) {
    this.style.opacity = '1';
    const items = document.querySelectorAll('.dynamic-item');
    items.forEach(item => item.classList.remove('over'));
}

/* ============================================
   EVENT LISTENERS
   ============================================ */

import { currentState } from '../config/state.js';
import { debounce } from '../utils/helpers.js';
import {
    form,
    downloadBtn,
    templateBtns,
    themeColorInput,
    colorPresets,
    fontFamilySelect,
    langBtns,
    exportJsonBtn,
    importJsonTrigger,
    importJsonInput,
    profilePhotoInput,
    removePhotoBtn,
    experienceContainer,
    educationContainer,
    languageContainer
} from '../dom/elements.js';
import { updatePreview } from '../preview/previewManager.js';
import { generatePDF } from '../pdf/pdfGenerator.js';
import {
    loadFromLocalStorage,
    exportJson,
    importJson,
    handlePhotoUpload,
    removePhoto
} from '../storage/persistence.js';
import {
    addExperience,
    addEducation,
    addLanguage
} from '../sections/dynamicSections.js';
import {
    handleDragStart,
    handleDragEnter,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleDragEnd
} from './dragDrop.js';

const debouncedUpdate = debounce(updatePreview, 150);

export function attachInputListeners() {
    const allInputs = form.querySelectorAll('input, textarea, select');
    allInputs.forEach(input => {
        input.removeEventListener('input', debouncedUpdate);
        input.removeEventListener('change', updatePreview);
        input.addEventListener('input', debouncedUpdate);
        input.addEventListener('change', updatePreview);
    });

    // Attach Drag events
    const items = document.querySelectorAll('.dynamic-item');
    items.forEach(item => {
        item.addEventListener('dragstart', handleDragStart, false);
        item.addEventListener('dragenter', handleDragEnter, false);
        item.addEventListener('dragover', handleDragOver, false);
        item.addEventListener('dragleave', handleDragLeave, false);
        item.addEventListener('drop', handleDrop, false);
        item.addEventListener('dragend', handleDragEnd, false);
    });
}

export function initEventListeners() {
    // Load saved data
    loadFromLocalStorage();

    attachInputListeners();
    downloadBtn.addEventListener('click', generatePDF);

    // Add default items only if empty
    if (experienceContainer && experienceContainer.children.length === 0) addExperience();
    if (educationContainer && educationContainer.children.length === 0) addEducation();
    if (languageContainer && languageContainer.children.length === 0) addLanguage();

    form.addEventListener('submit', (e) => e.preventDefault());

    const refCheckbox = document.getElementById('referenceOnRequest');
    if (refCheckbox) refCheckbox.addEventListener('change', updatePreview);

    // Template selection
    templateBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            templateBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentState.template = btn.dataset.template;
            updatePreview();
        });
    });

    // Theme color
    themeColorInput.addEventListener('input', (e) => {
        currentState.themeColor = e.target.value;
        updatePreview();
    });

    // Color presets
    colorPresets.forEach(preset => {
        preset.addEventListener('click', () => {
            const color = preset.dataset.color;
            currentState.themeColor = color;
            themeColorInput.value = color;
            updatePreview();
        });
    });

    // Font family
    fontFamilySelect.addEventListener('change', (e) => {
        currentState.fontFamily = e.target.value;
        updatePreview();
    });

    // Language Toggle
    langBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            langBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentState.language = btn.dataset.lang;
            updatePreview();
        });
    });

    // JSON Export/Import
    exportJsonBtn.addEventListener('click', exportJson);
    importJsonTrigger.addEventListener('click', () => importJsonInput.click());
    importJsonInput.addEventListener('change', importJson);

    // Photo Upload
    if (profilePhotoInput) {
        profilePhotoInput.addEventListener('change', handlePhotoUpload);
        removePhotoBtn.addEventListener('click', removePhoto);
    }

    // Military status conditional field
    const militaryStatusSelect = document.getElementById('militaryStatus');
    const militaryPostponedGroup = document.getElementById('militaryPostponedGroup');
    if (militaryStatusSelect && militaryPostponedGroup) {
        militaryStatusSelect.addEventListener('change', () => {
            if (militaryStatusSelect.value === 'Tecilli') {
                militaryPostponedGroup.style.display = 'flex';
            } else {
                militaryPostponedGroup.style.display = 'none';
            }
        });
    }
}

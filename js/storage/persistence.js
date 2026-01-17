/* ============================================
   PERSISTENCE - LocalStorage, JSON, Photo
   ============================================ */

import { currentState, counters, resetCounters } from '../config/state.js';
import { getFormData } from '../data/formData.js';
import { updateATSCheck } from '../utils/atsChecker.js';
import {
    themeColorInput,
    fontFamilySelect,
    langBtns,
    photoPreview,
    removePhotoBtn,
    profilePhotoInput,
    getAllContainers
} from '../dom/elements.js';
import {
    addExperience,
    addEducation,
    addLanguage
} from '../sections/dynamicSections.js';
import { updatePreview } from '../preview/previewManager.js';

// Save to LocalStorage
export function saveToLocalStorage() {
    const data = getFormData();
    const state = currentState;
    localStorage.setItem('cvData', JSON.stringify({ data, state }));
    updateATSCheck(data);
}

// Load from LocalStorage
export function loadFromLocalStorage() {
    const saved = localStorage.getItem('cvData');
    if (saved) {
        const { data, state } = JSON.parse(saved);
        Object.assign(currentState, state);
        populateForm(data);
        updatePreview();
    }
}

// Export as JSON
export function exportJson() {
    const data = {
        formData: getFormData(),
        state: currentState
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cv_data_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Import from JSON
export function importJson(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
        try {
            const { formData, state } = JSON.parse(event.target.result);
            Object.assign(currentState, state);
            populateForm(formData);
            updatePreview();
            saveToLocalStorage();
        } catch (err) {
            alert('Geçersiz JSON dosyası!');
        }
    };
    reader.readAsText(file);
}

// Photo upload handler
export function handlePhotoUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
        alert('Dosya boyutu 2MB\'dan küçük olmalıdır!');
        return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
        currentState.profilePhoto = event.target.result;
        photoPreview.innerHTML = `<img src="${event.target.result}" alt="Profil">`;
        removePhotoBtn.style.display = 'block';
        updatePreview();
        saveToLocalStorage();
    };
    reader.readAsDataURL(file);
}

// Remove photo
export function removePhoto() {
    currentState.profilePhoto = null;
    photoPreview.innerHTML = `<span>Fotoğraf Ekle</span>`;
    removePhotoBtn.style.display = 'none';
    profilePhotoInput.value = '';
    updatePreview();
    saveToLocalStorage();
}

// Populate form with data
export function populateForm(data) {
    // Basic fields
    const fields = [
        'firstName', 'lastName', 'title', 'birthDate', 'birthPlace',
        'nationality', 'maritalStatus', 'militaryStatus', 'militaryPostponedDate',
        'drivingLicense', 'email', 'phone', 'address', 'city', 'postalCode',
        'linkedin', 'website', 'github', 'summary', 'technicalSkills',
        'softSkills', 'hobbies'
    ];
    fields.forEach(f => {
        const el = document.getElementById(f);
        if (el) el.value = data[f] || '';
    });

    const refCheckbox = document.getElementById('referenceOnRequest');
    if (refCheckbox) refCheckbox.checked = data.referenceOnRequest;

    // Clear dynamic containers
    getAllContainers().forEach(c => {
        if (c) c.innerHTML = '';
    });

    // Reset counters
    resetCounters();

    // Restore dynamic items
    if (data.experiences) data.experiences.forEach(exp => {
        addExperience();
        const item = document.getElementById('experienceContainer').lastElementChild;
        if (item) {
            item.querySelector('.exp-company').value = exp.company || '';
            item.querySelector('.exp-position').value = exp.position || '';
            item.querySelector('.exp-location').value = exp.location || '';
            item.querySelector('.exp-type').value = exp.type || '';
            item.querySelector('.exp-description').value = exp.description || '';
        }
    });

    if (data.education) data.education.forEach(edu => {
        addEducation();
        const item = document.getElementById('educationContainer').lastElementChild;
        if (item) {
            item.querySelector('.edu-school').value = edu.school || '';
            item.querySelector('.edu-field').value = edu.field || '';
            item.querySelector('.edu-degree').value = edu.degree || '';
            item.querySelector('.edu-location').value = edu.location || '';
            item.querySelector('.edu-start').value = edu.startYear || '';
            item.querySelector('.edu-end').value = edu.endYear || '';
            item.querySelector('.edu-gpa').value = edu.gpa || '';
        }
    });

    if (data.languages) data.languages.forEach(lang => {
        addLanguage();
        const item = document.getElementById('languageContainer').lastElementChild;
        if (item) {
            item.querySelector('.lang-name').value = lang.name || '';
            item.querySelector('.lang-level').value = lang.level || '';
        }
    });

    // Restore state
    if (themeColorInput) themeColorInput.value = currentState.themeColor;
    if (fontFamilySelect) fontFamilySelect.value = currentState.fontFamily;

    // Language UI
    langBtns.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === currentState.language);
    });

    // Photo
    if (currentState.profilePhoto) {
        photoPreview.innerHTML = `<img src="${currentState.profilePhoto}" alt="Profil">`;
        removePhotoBtn.style.display = 'block';
    } else {
        photoPreview.innerHTML = `<span>Fotoğraf Ekle</span>`;
        removePhotoBtn.style.display = 'none';
    }
}

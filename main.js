/* ============================================
   CV GENERATOR - MAIN ENTRY POINT
   ============================================ */

// Import dynamic section functions and expose to global scope for HTML onclick
import {
    addExperience,
    addEducation,
    addCertificate,
    addComputerSkill,
    addLanguage,
    addProject,
    addPublication,
    addAward,
    addMembership,
    addVolunteer,
    addReference
} from './js/sections/dynamicSections.js';

// Import initialization
import { initEventListeners } from './js/events/eventListeners.js';

// Expose add functions to global scope for HTML onclick handlers
window.addExperience = addExperience;
window.addEducation = addEducation;
window.addCertificate = addCertificate;
window.addComputerSkill = addComputerSkill;
window.addLanguage = addLanguage;
window.addProject = addProject;
window.addPublication = addPublication;
window.addAward = addAward;
window.addMembership = addMembership;
window.addVolunteer = addVolunteer;
window.addReference = addReference;

// Initialize application
document.addEventListener('DOMContentLoaded', () => {
    initEventListeners();
});

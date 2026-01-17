/* ============================================
   DOM ELEMENT REFERENCES
   ============================================ */

// Core elements
export const cvPreview = document.getElementById('cvPreview');
export const downloadBtn = document.getElementById('downloadPdf');
export const form = document.getElementById('cvForm');

// Dynamic containers
export const experienceContainer = document.getElementById('experienceContainer');
export const educationContainer = document.getElementById('educationContainer');
export const certificateContainer = document.getElementById('certificateContainer');
export const computerSkillContainer = document.getElementById('computerSkillContainer');
export const languageContainer = document.getElementById('languageContainer');
export const projectContainer = document.getElementById('projectContainer');
export const publicationContainer = document.getElementById('publicationContainer');
export const awardContainer = document.getElementById('awardContainer');
export const membershipContainer = document.getElementById('membershipContainer');
export const volunteerContainer = document.getElementById('volunteerContainer');
export const referenceContainer = document.getElementById('referenceContainer');

// Control elements
export const templateBtns = document.querySelectorAll('.template-btn');
export const themeColorInput = document.getElementById('themeColor');
export const colorPresets = document.querySelectorAll('.color-preset');
export const fontFamilySelect = document.getElementById('fontFamily');
export const langBtns = document.querySelectorAll('.lang-btn');
export const exportJsonBtn = document.getElementById('exportJson');
export const importJsonTrigger = document.getElementById('importJsonTrigger');
export const importJsonInput = document.getElementById('importJson');
export const profilePhotoInput = document.getElementById('profilePhoto');
export const photoPreview = document.getElementById('photoPreview');
export const removePhotoBtn = document.getElementById('removePhoto');
export const atsScoreBadge = document.getElementById('atsScore');

// Get all containers as array
export function getAllContainers() {
    return [
        experienceContainer,
        educationContainer,
        certificateContainer,
        computerSkillContainer,
        languageContainer,
        projectContainer,
        publicationContainer,
        awardContainer,
        membershipContainer,
        volunteerContainer,
        referenceContainer
    ];
}

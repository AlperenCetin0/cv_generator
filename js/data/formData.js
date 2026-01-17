/* ============================================
   FORM DATA COLLECTION
   ============================================ */

import { formatMonthDate } from './formatters.js';

// Get value from input by ID
export function getValue(id) {
    const el = document.getElementById(id);
    return el ? el.value.trim() : '';
}

// Collect all form data
export function getFormData() {
    const data = {
        firstName: getValue('firstName'),
        lastName: getValue('lastName'),
        title: getValue('title'),
        birthDate: getValue('birthDate'),
        birthPlace: getValue('birthPlace'),
        nationality: getValue('nationality'),
        maritalStatus: getValue('maritalStatus'),
        militaryStatus: getValue('militaryStatus'),
        drivingLicense: getValue('drivingLicense'),
        email: getValue('email'),
        phone: getValue('phone'),
        address: getValue('address'),
        city: getValue('city'),
        postalCode: getValue('postalCode'),
        linkedin: getValue('linkedin'),
        website: getValue('website'),
        github: getValue('github'),
        summary: getValue('summary'),
        technicalSkills: getValue('technicalSkills'),
        softSkills: getValue('softSkills'),
        hobbies: getValue('hobbies'),
        referenceOnRequest: document.getElementById('referenceOnRequest')?.checked || false,
        militaryPostponedDate: getValue('militaryPostponedDate'),
        experiences: [],
        education: [],
        certificates: [],
        computerSkills: [],
        languages: [],
        projects: [],
        publications: [],
        awards: [],
        memberships: [],
        volunteers: [],
        references: []
    };

    // Collect experiences
    document.querySelectorAll('#experienceContainer .dynamic-item').forEach(item => {
        const exp = {
            company: item.querySelector('.exp-company')?.value.trim() || '',
            position: item.querySelector('.exp-position')?.value.trim() || '',
            location: item.querySelector('.exp-location')?.value.trim() || '',
            type: item.querySelector('.exp-type')?.value || '',
            startDate: formatMonthDate(item.querySelector('.exp-start')?.value),
            endDate: item.querySelector('.exp-current')?.checked ? 'Devam Ediyor' : formatMonthDate(item.querySelector('.exp-end')?.value),
            isCurrent: item.querySelector('.exp-current')?.checked || false,
            description: item.querySelector('.exp-description')?.value.trim() || ''
        };
        if (exp.company || exp.position) data.experiences.push(exp);
    });

    // Collect education
    document.querySelectorAll('#educationContainer .dynamic-item').forEach(item => {
        const edu = {
            school: item.querySelector('.edu-school')?.value.trim() || '',
            field: item.querySelector('.edu-field')?.value.trim() || '',
            degree: item.querySelector('.edu-degree')?.value || '',
            location: item.querySelector('.edu-location')?.value.trim() || '',
            startYear: item.querySelector('.edu-start')?.value || '',
            endYear: item.querySelector('.edu-end')?.value || '',
            gpa: item.querySelector('.edu-gpa')?.value.trim() || ''
        };
        if (edu.school || edu.field) data.education.push(edu);
    });

    // Collect certificates
    document.querySelectorAll('#certificateContainer .dynamic-item').forEach(item => {
        const cert = {
            name: item.querySelector('.cert-name')?.value.trim() || '',
            issuer: item.querySelector('.cert-issuer')?.value.trim() || '',
            date: formatMonthDate(item.querySelector('.cert-date')?.value),
            expiry: formatMonthDate(item.querySelector('.cert-expiry')?.value)
        };
        if (cert.name) data.certificates.push(cert);
    });

    // Collect computer skills
    document.querySelectorAll('#computerSkillContainer .dynamic-item').forEach(item => {
        const cs = {
            name: item.querySelector('.cs-name')?.value.trim() || '',
            level: item.querySelector('.cs-level')?.value || ''
        };
        if (cs.name) data.computerSkills.push(cs);
    });

    // Collect languages
    document.querySelectorAll('#languageContainer .dynamic-item').forEach(item => {
        const lang = {
            name: item.querySelector('.lang-name')?.value.trim() || '',
            level: item.querySelector('.lang-level')?.value || ''
        };
        if (lang.name) data.languages.push(lang);
    });

    // Collect projects
    document.querySelectorAll('#projectContainer .dynamic-item').forEach(item => {
        const proj = {
            name: item.querySelector('.proj-name')?.value.trim() || '',
            role: item.querySelector('.proj-role')?.value.trim() || '',
            startDate: formatMonthDate(item.querySelector('.proj-start')?.value),
            endDate: formatMonthDate(item.querySelector('.proj-end')?.value),
            description: item.querySelector('.proj-description')?.value.trim() || '',
            tech: item.querySelector('.proj-tech')?.value.trim() || ''
        };
        if (proj.name) data.projects.push(proj);
    });

    // Collect publications
    document.querySelectorAll('#publicationContainer .dynamic-item').forEach(item => {
        const pub = {
            title: item.querySelector('.pub-title')?.value.trim() || '',
            authors: item.querySelector('.pub-authors')?.value.trim() || '',
            venue: item.querySelector('.pub-venue')?.value.trim() || '',
            date: formatMonthDate(item.querySelector('.pub-date')?.value)
        };
        if (pub.title) data.publications.push(pub);
    });

    // Collect awards
    document.querySelectorAll('#awardContainer .dynamic-item').forEach(item => {
        const award = {
            name: item.querySelector('.award-name')?.value.trim() || '',
            issuer: item.querySelector('.award-issuer')?.value.trim() || '',
            date: formatMonthDate(item.querySelector('.award-date')?.value)
        };
        if (award.name) data.awards.push(award);
    });

    // Collect memberships
    document.querySelectorAll('#membershipContainer .dynamic-item').forEach(item => {
        const member = {
            org: item.querySelector('.member-org')?.value.trim() || '',
            role: item.querySelector('.member-role')?.value.trim() || '',
            startDate: formatMonthDate(item.querySelector('.member-start')?.value),
            endDate: formatMonthDate(item.querySelector('.member-end')?.value)
        };
        if (member.org) data.memberships.push(member);
    });

    // Collect volunteers
    document.querySelectorAll('#volunteerContainer .dynamic-item').forEach(item => {
        const vol = {
            org: item.querySelector('.vol-org')?.value.trim() || '',
            role: item.querySelector('.vol-role')?.value.trim() || '',
            startDate: formatMonthDate(item.querySelector('.vol-start')?.value),
            endDate: formatMonthDate(item.querySelector('.vol-end')?.value),
            description: item.querySelector('.vol-description')?.value.trim() || ''
        };
        if (vol.org) data.volunteers.push(vol);
    });

    // Collect references
    document.querySelectorAll('#referenceContainer .dynamic-item').forEach(item => {
        const ref = {
            name: item.querySelector('.ref-name')?.value.trim() || '',
            position: item.querySelector('.ref-position')?.value.trim() || '',
            company: item.querySelector('.ref-company')?.value.trim() || '',
            phone: item.querySelector('.ref-phone')?.value.trim() || '',
            email: item.querySelector('.ref-email')?.value.trim() || ''
        };
        if (ref.name) data.references.push(ref);
    });

    return data;
}

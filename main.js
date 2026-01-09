/* ============================================
   CV GENERATOR - PROFESSIONAL JAVASCRIPT
   Complete form handling, live preview, PDF generation
   ============================================ */

// DOM Elements
const cvPreview = document.getElementById('cvPreview');
const downloadBtn = document.getElementById('downloadPdf');
const form = document.getElementById('cvForm');

// Containers
const experienceContainer = document.getElementById('experienceContainer');
const educationContainer = document.getElementById('educationContainer');
const certificateContainer = document.getElementById('certificateContainer');
const computerSkillContainer = document.getElementById('computerSkillContainer');
const languageContainer = document.getElementById('languageContainer');
const projectContainer = document.getElementById('projectContainer');
const publicationContainer = document.getElementById('publicationContainer');
const awardContainer = document.getElementById('awardContainer');
const membershipContainer = document.getElementById('membershipContainer');
const volunteerContainer = document.getElementById('volunteerContainer');
const referenceContainer = document.getElementById('referenceContainer');

// Counters for unique IDs
let counters = {
    experience: 0, education: 0, certificate: 0, computerSkill: 0,
    language: 0, project: 0, publication: 0, award: 0,
    membership: 0, volunteer: 0, reference: 0
};

// Current State
let currentState = {
    template: 'modern',
    themeColor: '#000000',
    fontFamily: "'Inter', sans-serif"
};

// DOM Elements for controls
const templateBtns = document.querySelectorAll('.template-btn');
const themeColorInput = document.getElementById('themeColor');
const colorPresets = document.querySelectorAll('.color-preset');
const fontFamilySelect = document.getElementById('fontFamily');

// ============================================
// ADD DYNAMIC SECTIONS
// ============================================

function addExperience() {
    counters.experience++;
    const id = counters.experience;
    const html = `
        <div class="dynamic-item" id="exp-${id}">
            <button type="button" class="remove-btn" onclick="removeItem('exp-${id}')">×</button>
            <div class="form-grid">
                <div class="form-group">
                    <label>Şirket / Kurum Adı</label>
                    <input type="text" class="exp-company" placeholder="Şirket adı">
                </div>
                <div class="form-group">
                    <label>Pozisyon / Görev</label>
                    <input type="text" class="exp-position" placeholder="Ünvan / pozisyon">
                </div>
                <div class="form-group">
                    <label>Şehir / Ülke</label>
                    <input type="text" class="exp-location" placeholder="İstanbul, Türkiye">
                </div>
                <div class="form-group">
                    <label>Çalışma Şekli</label>
                    <select class="exp-type">
                        <option value="">Seçiniz</option>
                        <option value="Tam Zamanlı">Tam Zamanlı</option>
                        <option value="Yarı Zamanlı">Yarı Zamanlı</option>
                        <option value="Sözleşmeli">Sözleşmeli</option>
                        <option value="Stajyer">Stajyer</option>
                        <option value="Serbest">Serbest Çalışan</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Başlangıç Tarihi</label>
                    <input type="month" class="exp-start">
                </div>
                <div class="form-group">
                    <label>Bitiş Tarihi</label>
                    <input type="month" class="exp-end">
                    <label class="checkbox-label" style="margin-top: 4px;">
                        <input type="checkbox" class="exp-current">
                        <span>Halen çalışıyorum</span>
                    </label>
                </div>
                <div class="form-group full-width">
                    <label>Görev ve Sorumluluklar</label>
                    <textarea class="exp-description" rows="3" placeholder="- Ana görev ve sorumluluklarınız"></textarea>
                </div>
            </div>
        </div>
    `;
    experienceContainer.insertAdjacentHTML('beforeend', html);
    attachInputListeners();
}

function addEducation() {
    counters.education++;
    const id = counters.education;
    const html = `
        <div class="dynamic-item" id="edu-${id}">
            <button type="button" class="remove-btn" onclick="removeItem('edu-${id}')">×</button>
            <div class="form-grid">
                <div class="form-group full-width">
                    <label>Okul / Üniversite Adı</label>
                    <input type="text" class="edu-school" placeholder="Kurum adı">
                </div>
                <div class="form-group">
                    <label>Bölüm / Alan</label>
                    <input type="text" class="edu-field" placeholder="Bölüm">
                </div>
                <div class="form-group">
                    <label>Derece</label>
                    <select class="edu-degree">
                        <option value="">Seçiniz</option>
                        <option value="Doktora">Doktora</option>
                        <option value="Yüksek Lisans">Yüksek Lisans</option>
                        <option value="Lisans">Lisans</option>
                        <option value="Ön Lisans">Ön Lisans</option>
                        <option value="Lise">Lise</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Şehir</label>
                    <input type="text" class="edu-location" placeholder="Şehir">
                </div>
                <div class="form-group">
                    <label>Başlangıç Yılı</label>
                    <input type="number" class="edu-start" placeholder="2015" min="1950" max="2030">
                </div>
                <div class="form-group">
                    <label>Mezuniyet Yılı</label>
                    <input type="number" class="edu-end" placeholder="2019" min="1950" max="2030">
                </div>
                <div class="form-group">
                    <label>Not Ortalaması (GPA)</label>
                    <input type="text" class="edu-gpa" placeholder="3.50 / 4.00">
                </div>
            </div>
        </div>
    `;
    educationContainer.insertAdjacentHTML('beforeend', html);
    attachInputListeners();
}

function addCertificate() {
    counters.certificate++;
    const id = counters.certificate;
    const html = `
        <div class="dynamic-item" id="cert-${id}">
            <button type="button" class="remove-btn" onclick="removeItem('cert-${id}')">×</button>
            <div class="form-grid">
                <div class="form-group">
                    <label>Sertifika / Kurs Adı</label>
                    <input type="text" class="cert-name" placeholder="Sertifika adı">
                </div>
                <div class="form-group">
                    <label>Veren Kurum</label>
                    <input type="text" class="cert-issuer" placeholder="Kurum adı">
                </div>
                <div class="form-group">
                    <label>Alınma Tarihi</label>
                    <input type="month" class="cert-date">
                </div>
                <div class="form-group">
                    <label>Geçerlilik Tarihi</label>
                    <input type="month" class="cert-expiry">
                </div>
            </div>
        </div>
    `;
    certificateContainer.insertAdjacentHTML('beforeend', html);
    attachInputListeners();
}

function addComputerSkill() {
    counters.computerSkill++;
    const id = counters.computerSkill;
    const html = `
        <div class="dynamic-item" id="cs-${id}">
            <button type="button" class="remove-btn" onclick="removeItem('cs-${id}')">×</button>
            <div class="form-grid">
                <div class="form-group">
                    <label>Program / Yazılım</label>
                    <input type="text" class="cs-name" placeholder="Microsoft Excel">
                </div>
                <div class="form-group">
                    <label>Yetkinlik Seviyesi</label>
                    <select class="cs-level">
                        <option value="">Seçiniz</option>
                        <option value="Uzman">Uzman</option>
                        <option value="İleri Düzey">İleri Düzey</option>
                        <option value="Orta Düzey">Orta Düzey</option>
                        <option value="Başlangıç">Başlangıç</option>
                    </select>
                </div>
            </div>
        </div>
    `;
    computerSkillContainer.insertAdjacentHTML('beforeend', html);
    attachInputListeners();
}

function addLanguage() {
    counters.language++;
    const id = counters.language;
    const html = `
        <div class="dynamic-item" id="lang-${id}">
            <button type="button" class="remove-btn" onclick="removeItem('lang-${id}')">×</button>
            <div class="form-grid">
                <div class="form-group">
                    <label>Dil</label>
                    <input type="text" class="lang-name" placeholder="İngilizce">
                </div>
                <div class="form-group">
                    <label>Seviye</label>
                    <select class="lang-level">
                        <option value="">Seçiniz</option>
                        <option value="Ana Dil">Ana Dil</option>
                        <option value="C2 - Ustalaşmış">C2 - Ustalaşmış</option>
                        <option value="C1 - İleri Düzey">C1 - İleri Düzey</option>
                        <option value="B2 - Orta Üstü">B2 - Orta Üstü</option>
                        <option value="B1 - Orta Düzey">B1 - Orta Düzey</option>
                        <option value="A2 - Temel">A2 - Temel</option>
                        <option value="A1 - Başlangıç">A1 - Başlangıç</option>
                    </select>
                </div>
            </div>
        </div>
    `;
    languageContainer.insertAdjacentHTML('beforeend', html);
    attachInputListeners();
}

function addProject() {
    counters.project++;
    const id = counters.project;
    const html = `
        <div class="dynamic-item" id="proj-${id}">
            <button type="button" class="remove-btn" onclick="removeItem('proj-${id}')">×</button>
            <div class="form-grid">
                <div class="form-group">
                    <label>Proje Adı</label>
                    <input type="text" class="proj-name" placeholder="Proje başlığı">
                </div>
                <div class="form-group">
                    <label>Rol</label>
                    <input type="text" class="proj-role" placeholder="Proje Yöneticisi">
                </div>
                <div class="form-group">
                    <label>Başlangıç</label>
                    <input type="month" class="proj-start">
                </div>
                <div class="form-group">
                    <label>Bitiş</label>
                    <input type="month" class="proj-end">
                </div>
                <div class="form-group full-width">
                    <label>Açıklama</label>
                    <textarea class="proj-description" rows="2" placeholder="Proje açıklaması"></textarea>
                </div>
                <div class="form-group full-width">
                    <label>Teknolojiler</label>
                    <input type="text" class="proj-tech" placeholder="Virgülle ayırarak yazın">
                </div>
            </div>
        </div>
    `;
    projectContainer.insertAdjacentHTML('beforeend', html);
    attachInputListeners();
}

function addPublication() {
    counters.publication++;
    const id = counters.publication;
    const html = `
        <div class="dynamic-item" id="pub-${id}">
            <button type="button" class="remove-btn" onclick="removeItem('pub-${id}')">×</button>
            <div class="form-grid">
                <div class="form-group full-width">
                    <label>Yayın Başlığı</label>
                    <input type="text" class="pub-title" placeholder="Makale başlığı">
                </div>
                <div class="form-group">
                    <label>Yazarlar</label>
                    <input type="text" class="pub-authors" placeholder="Yazarlar">
                </div>
                <div class="form-group">
                    <label>Yayın Yeri</label>
                    <input type="text" class="pub-venue" placeholder="Dergi adı">
                </div>
                <div class="form-group">
                    <label>Tarih</label>
                    <input type="month" class="pub-date">
                </div>
            </div>
        </div>
    `;
    publicationContainer.insertAdjacentHTML('beforeend', html);
    attachInputListeners();
}

function addAward() {
    counters.award++;
    const id = counters.award;
    const html = `
        <div class="dynamic-item" id="award-${id}">
            <button type="button" class="remove-btn" onclick="removeItem('award-${id}')">×</button>
            <div class="form-grid">
                <div class="form-group">
                    <label>Ödül / Başarı</label>
                    <input type="text" class="award-name" placeholder="Ödül adı">
                </div>
                <div class="form-group">
                    <label>Veren Kurum</label>
                    <input type="text" class="award-issuer" placeholder="Kurum">
                </div>
                <div class="form-group">
                    <label>Tarih</label>
                    <input type="month" class="award-date">
                </div>
            </div>
        </div>
    `;
    awardContainer.insertAdjacentHTML('beforeend', html);
    attachInputListeners();
}

function addMembership() {
    counters.membership++;
    const id = counters.membership;
    const html = `
        <div class="dynamic-item" id="member-${id}">
            <button type="button" class="remove-btn" onclick="removeItem('member-${id}')">×</button>
            <div class="form-grid">
                <div class="form-group">
                    <label>Kuruluş</label>
                    <input type="text" class="member-org" placeholder="Kuruluş adı">
                </div>
                <div class="form-group">
                    <label>Pozisyon</label>
                    <input type="text" class="member-role" placeholder="Üyelik türü">
                </div>
                <div class="form-group">
                    <label>Başlangıç</label>
                    <input type="month" class="member-start">
                </div>
                <div class="form-group">
                    <label>Bitiş</label>
                    <input type="month" class="member-end">
                </div>
            </div>
        </div>
    `;
    membershipContainer.insertAdjacentHTML('beforeend', html);
    attachInputListeners();
}

function addVolunteer() {
    counters.volunteer++;
    const id = counters.volunteer;
    const html = `
        <div class="dynamic-item" id="vol-${id}">
            <button type="button" class="remove-btn" onclick="removeItem('vol-${id}')">×</button>
            <div class="form-grid">
                <div class="form-group">
                    <label>Kuruluş</label>
                    <input type="text" class="vol-org" placeholder="STK adı">
                </div>
                <div class="form-group">
                    <label>Görev</label>
                    <input type="text" class="vol-role" placeholder="Gönüllü pozisyonu">
                </div>
                <div class="form-group">
                    <label>Başlangıç</label>
                    <input type="month" class="vol-start">
                </div>
                <div class="form-group">
                    <label>Bitiş</label>
                    <input type="month" class="vol-end">
                </div>
                <div class="form-group full-width">
                    <label>Açıklama</label>
                    <textarea class="vol-description" rows="2" placeholder="Yapılan çalışmalar"></textarea>
                </div>
            </div>
        </div>
    `;
    volunteerContainer.insertAdjacentHTML('beforeend', html);
    attachInputListeners();
}

function addReference() {
    counters.reference++;
    const id = counters.reference;
    const html = `
        <div class="dynamic-item" id="ref-${id}">
            <button type="button" class="remove-btn" onclick="removeItem('ref-${id}')">×</button>
            <div class="form-grid">
                <div class="form-group">
                    <label>Ad Soyad</label>
                    <input type="text" class="ref-name" placeholder="Referans kişi adı">
                </div>
                <div class="form-group">
                    <label>Ünvan</label>
                    <input type="text" class="ref-position" placeholder="Pozisyon">
                </div>
                <div class="form-group">
                    <label>Şirket</label>
                    <input type="text" class="ref-company" placeholder="Kurum">
                </div>
                <div class="form-group">
                    <label>Telefon</label>
                    <input type="tel" class="ref-phone" placeholder="+90 5XX XXX XX XX">
                </div>
                <div class="form-group">
                    <label>E-posta</label>
                    <input type="email" class="ref-email" placeholder="eposta@ornek.com">
                </div>
            </div>
        </div>
    `;
    referenceContainer.insertAdjacentHTML('beforeend', html);
    attachInputListeners();
}

function removeItem(id) {
    const element = document.getElementById(id);
    if (element) {
        element.style.opacity = '0';
        setTimeout(() => { element.remove(); updatePreview(); }, 200);
    }
}

// ============================================
// DATA COLLECTION
// ============================================

function getFormData() {
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
        experiences: [], education: [], certificates: [], computerSkills: [],
        languages: [], projects: [], publications: [], awards: [],
        memberships: [], volunteers: [], references: []
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

function getValue(id) {
    const el = document.getElementById(id);
    return el ? el.value.trim() : '';
}

function formatMonthDate(value) {
    if (!value) return '';
    const [year, month] = value.split('-');
    const months = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
        'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
    return `${months[parseInt(month) - 1]} ${year}`;
}

function formatBirthDate(value) {
    if (!value) return '';
    const [year, month, day] = value.split('-');
    return `${day}.${month}.${year}`;
}

function trUpperCase(text) {
    if (!text) return '';
    return text.toLocaleUpperCase('tr-TR');
}

// ============================================
// PREVIEW GENERATION
// ============================================

function updatePreview() {
    const data = getFormData();
    const fullName = `${data.firstName} ${data.lastName}`.trim();

    // Apply Customization to Preview Container
    cvPreview.style.fontFamily = currentState.fontFamily;
    document.documentElement.style.setProperty('--accent-color', currentState.themeColor);

    // Check if any data exists
    const hasData = fullName || data.email || data.phone || data.address ||
        data.city || data.summary || data.technicalSkills ||
        data.experiences.length > 0 || data.education.length > 0 ||
        data.certificates.length > 0 || data.languages.length > 0;

    if (!hasData) {
        cvPreview.innerHTML = `<div class="cv-placeholder"><p>Bilgilerinizi girerek CV'nizi oluşturmaya başlayın</p></div>`;
        return;
    }

    // Render based on selected template
    switch (currentState.template) {
        case 'classic':
            renderClassicTemplate(data);
            break;
        case 'creative':
            renderCreativeTemplate(data);
            break;
        case 'minimal':
            renderMinimalTemplate(data);
            break;
        case 'modern':
        default:
            renderModernTemplate(data);
            break;
    }
}

// ============================================
// TEMPLATE RENDERING FUNCTIONS
// ============================================

function renderModernTemplate(data) {
    const fullName = `${data.firstName} ${data.lastName}`.trim();
    let html = '';

    // Header - Modern centered
    html += `<div class="cv-header" style="border-bottom-color: var(--accent-color)">`;
    if (fullName) html += `<h1 class="cv-name" style="color: var(--accent-color)">${escapeHtml(trUpperCase(fullName))}</h1>`;
    if (data.title) html += `<p class="cv-title">${escapeHtml(data.title)}</p>`;
    html += `</div>`;

    // Rest of the modern template sections (mostly identical to original but with accent colors)
    html += renderCommonSections(data);

    cvPreview.innerHTML = html;
}

function renderClassicTemplate(data) {
    const fullName = `${data.firstName} ${data.lastName}`.trim();
    let html = '';

    // Header - Classic Left Aligned
    html += `<div class="cv-header" style="text-align: left; border-bottom: 3px double var(--accent-color); padding-bottom: 20px;">`;
    if (fullName) html += `<h1 class="cv-name" style="font-size: 28px; margin-bottom: 8px;">${escapeHtml(trUpperCase(fullName))}</h1>`;
    if (data.title) html += `<p class="cv-title" style="font-style: italic; font-weight: 600; font-size: 14px; color: var(--color-dark-700)">${escapeHtml(data.title)}</p>`;
    html += `</div>`;

    html += renderCommonSections(data, true); // true for classic style

    cvPreview.innerHTML = html;
}

function renderMinimalTemplate(data) {
    const fullName = `${data.firstName} ${data.lastName}`.trim();
    let html = '';

    // Header - Ultra minimal
    html += `<div class="cv-header" style="text-align: left; border-bottom: none; margin-bottom: 40px; padding-bottom: 0;">`;
    if (fullName) html += `<h1 class="cv-name" style="font-size: 32px; letter-spacing: -1px; margin-bottom: 0;">${escapeHtml(trUpperCase(fullName))}</h1>`;
    if (data.title) html += `<p class="cv-title" style="color: var(--accent-color); font-weight: 500; font-size: 16px;">${escapeHtml(data.title)}</p>`;
    html += `</div>`;

    html += renderCommonSections(data);

    cvPreview.innerHTML = html;
}

function renderCreativeTemplate(data) {
    const fullName = `${data.firstName} ${data.lastName}`.trim();
    let html = '';

    // Header - Creative Layout
    html += `<div class="cv-header" style="background: var(--accent-color); color: white; padding: 40px; border-radius: 8px; margin-bottom: 30px; border-bottom: none;">`;
    if (fullName) html += `<h1 class="cv-name" style="color: white; font-size: 30px; margin-bottom: 5px;">${escapeHtml(trUpperCase(fullName))}</h1>`;
    if (data.title) html += `<p class="cv-title" style="color: rgba(255,255,255,0.8); font-size: 14px;">${escapeHtml(data.title)}</p>`;
    html += `</div>`;

    // Re-use common sections but in a slightly different structure if needed, 
    // for now we re-enable standard list for better visibility
    html += renderCommonSections(data);

    cvPreview.innerHTML = html;
}

function renderCommonSections(data, isClassic = false) {
    let html = '';
    const sectionTitleStyle = isClassic ? 'border-bottom: 2px solid var(--accent-color); color: var(--accent-color);' : 'border-bottom-color: var(--accent-color);';

    // İletişim Bilgileri Section
    const hasContact = data.email || data.phone || data.address || data.city || data.linkedin || data.website || data.github;
    if (hasContact) {
        html += `<div class="cv-section"><h2 class="cv-section-title" style="${sectionTitleStyle}">İLETİŞİM BİLGİLERİ</h2><div class="cv-contact-grid">`;
        if (data.email) html += `<div class="cv-contact-row"><span class="cv-contact-label">E-posta:</span><span class="cv-contact-value">${escapeHtml(data.email)}</span></div>`;
        if (data.phone) html += `<div class="cv-contact-row"><span class="cv-contact-label">Telefon:</span><span class="cv-contact-value">${escapeHtml(data.phone)}</span></div>`;
        let addr = [data.address, data.postalCode, data.city].filter(x => x).join(', ');
        if (addr) html += `<div class="cv-contact-row"><span class="cv-contact-label">Adres:</span><span class="cv-contact-value">${escapeHtml(addr)}</span></div>`;
        if (data.linkedin) html += `<div class="cv-contact-row"><span class="cv-contact-label">LinkedIn:</span><span class="cv-contact-value">${escapeHtml(data.linkedin)}</span></div>`;
        if (data.website) html += `<div class="cv-contact-row"><span class="cv-contact-label">Web Sitesi:</span><span class="cv-contact-value">${escapeHtml(data.website)}</span></div>`;
        if (data.github) {
            // Ensure no character replacement for GitHub links
            const githubLink = escapeHtml(data.github);
            html += `<div class="cv-contact-row"><span class="cv-contact-label">GitHub:</span><span class="cv-contact-value">${githubLink}</span></div>`;
        }
        html += `</div></div>`;
    }

    // Kişisel Bilgiler Section
    const hasPersonal = data.birthDate || data.birthPlace || data.nationality || data.maritalStatus || data.militaryStatus || data.drivingLicense;
    if (hasPersonal) {
        html += `<div class="cv-section"><h2 class="cv-section-title" style="${sectionTitleStyle}">KİŞİSEL BİLGİLERİ</h2><div class="cv-contact-grid">`;
        if (data.birthDate) html += `<div class="cv-contact-row"><span class="cv-contact-label">Doğum Tarihi:</span><span class="cv-contact-value">${formatBirthDate(data.birthDate)}</span></div>`;
        if (data.birthPlace) html += `<div class="cv-contact-row"><span class="cv-contact-label">Doğum Yeri:</span><span class="cv-contact-value">${escapeHtml(data.birthPlace)}</span></div>`;
        if (data.nationality) html += `<div class="cv-contact-row"><span class="cv-contact-label">Uyruk:</span><span class="cv-contact-value">${escapeHtml(data.nationality)}</span></div>`;
        if (data.maritalStatus) html += `<div class="cv-contact-row"><span class="cv-contact-label">Medeni Durum:</span><span class="cv-contact-value">${escapeHtml(data.maritalStatus)}</span></div>`;
        if (data.militaryStatus) {
            let statusText = escapeHtml(data.militaryStatus);
            if (data.militaryStatus === 'Tecilli' && data.militaryPostponedDate) {
                statusText += ` (Tecil: ${formatBirthDate(data.militaryPostponedDate)})`;
            }
            html += `<div class="cv-contact-row"><span class="cv-contact-label">Askerlik:</span><span class="cv-contact-value">${statusText}</span></div>`;
        }
        if (data.drivingLicense) html += `<div class="cv-contact-row"><span class="cv-contact-label">Ehliyet:</span><span class="cv-contact-value">${escapeHtml(data.drivingLicense)}</span></div>`;
        html += `</div></div>`;
    }

    // Profesyonel Özet
    if (data.summary) {
        html += `<div class="cv-section"><h2 class="cv-section-title" style="${sectionTitleStyle}">PROFESYONEL ÖZET</h2><p class="cv-summary">${escapeHtml(data.summary)}</p></div>`;
    }

    // İş Deneyimi
    if (data.experiences.length > 0) {
        html += `<div class="cv-section"><h2 class="cv-section-title" style="${sectionTitleStyle}">İŞ DENEYİMİ</h2>`;
        data.experiences.forEach(exp => {
            html += `<div class="cv-item">
                <div class="cv-item-header">
                    <div><div class="cv-item-title" style="${isClassic ? 'color: var(--accent-color)' : ''}">${escapeHtml(exp.position)}${exp.type ? ` (${escapeHtml(exp.type)})` : ''}</div>
                    <div class="cv-item-subtitle">${escapeHtml(exp.company)}${exp.location ? `, ${escapeHtml(exp.location)}` : ''}</div></div>
                    <span class="cv-item-date">${exp.startDate}${exp.endDate ? ` - ${exp.endDate}` : ''}</span>
                </div>
                ${exp.description ? `<div class="cv-item-description">${formatDescription(exp.description)}</div>` : ''}
            </div>`;
        });
        html += `</div>`;
    }

    // Eğitim
    if (data.education.length > 0) {
        html += `<div class="cv-section"><h2 class="cv-section-title" style="${sectionTitleStyle}">EĞİTİM</h2>`;
        data.education.forEach(edu => {
            html += `<div class="cv-item">
                <div class="cv-item-header">
                    <div><div class="cv-item-title" style="${isClassic ? 'color: var(--accent-color)' : ''}">${escapeHtml(edu.school)}</div>
                    <div class="cv-item-subtitle">${escapeHtml(edu.field)}${edu.degree ? ` - ${escapeHtml(edu.degree)}` : ''}${edu.location ? `, ${escapeHtml(edu.location)}` : ''}</div></div>
                    <span class="cv-item-date">${edu.startYear}${edu.endYear ? ` - ${edu.endYear}` : ''}</span>
                </div>
                ${edu.gpa ? `<div class="cv-item-description">GPA: ${escapeHtml(edu.gpa)}</div>` : ''}
            </div>`;
        });
        html += `</div>`;
    }

    // Sertifikalar
    if (data.certificates.length > 0) {
        html += `<div class="cv-section"><h2 class="cv-section-title" style="${sectionTitleStyle}">SERTİFİKALAR</h2>`;
        data.certificates.forEach(cert => {
            html += `<div class="cv-item">
                <div class="cv-item-header">
                    <div><div class="cv-item-title" style="${isClassic ? 'color: var(--accent-color)' : ''}">${escapeHtml(cert.name)}</div>
                    <div class="cv-item-subtitle">${escapeHtml(cert.issuer)}</div></div>
                    <span class="cv-item-date">${cert.date}</span>
                </div>
            </div>`;
        });
        html += `</div>`;
    }

    // Teknik Beceriler
    if (data.technicalSkills) {
        const skills = data.technicalSkills.split(',').map(s => s.trim()).filter(s => s);
        if (skills.length > 0) {
            html += `<div class="cv-section"><h2 class="cv-section-title" style="${sectionTitleStyle}">TEKNİK BECERİLER</h2>`;
            // If user typed without commas or just one long string, don't use boxy tags
            if (skills.length === 1 && !data.technicalSkills.includes(',')) {
                html += `<div class="cv-summary">${escapeHtml(data.technicalSkills)}</div>`;
            } else {
                html += `<div class="cv-skills-container">${skills.map(s => `<span class="cv-skill-tag" style="${isClassic ? 'border-color: var(--accent-color); border-radius: 0; background: transparent; color: inherit; padding: 2px 8px;' : ''}">${escapeHtml(s)}</span>`).join('')}</div>`;
            }
            html += `</div>`;
        }
    }

    // Kişisel Beceriler
    if (data.softSkills) {
        const skills = data.softSkills.split(',').map(s => s.trim()).filter(s => s);
        if (skills.length > 0) {
            html += `<div class="cv-section"><h2 class="cv-section-title" style="${sectionTitleStyle}">KİŞİSEL BECERİLER</h2>`;
            if (skills.length === 1 && !data.softSkills.includes(',')) {
                html += `<div class="cv-summary">${escapeHtml(data.softSkills)}</div>`;
            } else {
                html += `<div class="cv-skills-container">${skills.map(s => `<span class="cv-skill-tag" style="${isClassic ? 'border-color: var(--accent-color); border-radius: 0; background: transparent; color: inherit; padding: 2px 8px;' : ''}">${escapeHtml(s)}</span>`).join('')}</div>`;
            }
            html += `</div>`;
        }
    }

    // Bilgisayar Becerileri
    if (data.computerSkills.length > 0) {
        html += `<div class="cv-section"><h2 class="cv-section-title" style="${sectionTitleStyle}">BİLGİSAYAR BECERİLERİ</h2><div class="cv-languages-grid">`;
        data.computerSkills.forEach(cs => {
            html += `<div class="cv-language-item"><span class="cv-language-name">${escapeHtml(cs.name)}</span><span class="cv-language-level">${escapeHtml(cs.level)}</span></div>`;
        });
        html += `</div></div>`;
    }

    // Projeler
    if (data.projects.length > 0) {
        html += `<div class="cv-section"><h2 class="cv-section-title" style="${sectionTitleStyle}">PROJELER</h2>`;
        data.projects.forEach(proj => {
            html += `<div class="cv-item">
                <div class="cv-item-header">
                    <div><div class="cv-item-title" style="${isClassic ? 'color: var(--accent-color)' : ''}">${escapeHtml(proj.name)}</div>
                    ${proj.role ? `<div class="cv-item-subtitle">${escapeHtml(proj.role)}</div>` : ''}</div>
                    <span class="cv-item-date">${proj.startDate}${proj.endDate ? ` - ${proj.endDate}` : ''}</span>
                </div>
                ${proj.description ? `<div class="cv-item-description">${escapeHtml(proj.description)}</div>` : ''}
                ${proj.tech ? `<div class="cv-item-description"><strong>Teknolojiler:</strong> ${escapeHtml(proj.tech)}</div>` : ''}
            </div>`;
        });
        html += `</div>`;
    }

    // Yayınlar
    if (data.publications.length > 0) {
        html += `<div class="cv-section"><h2 class="cv-section-title" style="${sectionTitleStyle}">YAYINLAR</h2>`;
        data.publications.forEach(pub => {
            html += `<div class="cv-item">
                <div class="cv-item-header">
                    <div><div class="cv-item-title" style="${isClassic ? 'color: var(--accent-color)' : ''}">${escapeHtml(pub.title)}</div>
                    <div class="cv-item-subtitle">${escapeHtml(pub.authors)}${pub.venue ? `, ${escapeHtml(pub.venue)}` : ''}</div></div>
                    <span class="cv-item-date">${pub.date}</span>
                </div>
            </div>`;
        });
        html += `</div>`;
    }

    // Ödüller
    if (data.awards.length > 0) {
        html += `<div class="cv-section"><h2 class="cv-section-title" style="${sectionTitleStyle}">ÖDÜLLER VE BAŞARILAR</h2>`;
        data.awards.forEach(award => {
            html += `<div class="cv-item">
                <div class="cv-item-header">
                    <div><div class="cv-item-title" style="${isClassic ? 'color: var(--accent-color)' : ''}">${escapeHtml(award.name)}</div>
                    <div class="cv-item-subtitle">${escapeHtml(award.issuer)}</div></div>
                    <span class="cv-item-date">${award.date}</span>
                </div>
            </div>`;
        });
        html += `</div>`;
    }

    // Mesleki Üyelikler
    if (data.memberships.length > 0) {
        html += `<div class="cv-section"><h2 class="cv-section-title" style="${sectionTitleStyle}">ÜYELİKLER</h2>`;
        data.memberships.forEach(m => {
            html += `<div class="cv-item">
                <div class="cv-item-header">
                    <div><div class="cv-item-title" style="${isClassic ? 'color: var(--accent-color)' : ''}">${escapeHtml(m.org)}</div>
                    <div class="cv-item-subtitle">${escapeHtml(m.role)}</div></div>
                    <span class="cv-item-date">${m.startDate}${m.endDate ? ` - ${m.endDate}` : ''}</span>
                </div>
            </div>`;
        });
        html += `</div>`;
    }

    // Yabancı Diller
    if (data.languages.length > 0) {
        html += `<div class="cv-section"><h2 class="cv-section-title" style="${sectionTitleStyle}">YABANCI DİLLER</h2><div class="cv-languages-grid">`;
        data.languages.forEach(lang => {
            html += `<div class="cv-language-item"><span class="cv-language-name">${escapeHtml(lang.name)}</span><span class="cv-language-level">${escapeHtml(lang.level)}</span></div>`;
        });
        html += `</div></div>`;
    }

    // Gönüllü Çalışmalar
    if (data.volunteers.length > 0) {
        html += `<div class="cv-section"><h2 class="cv-section-title" style="${sectionTitleStyle}">GÖNÜLLÜ ÇALIŞMALAR</h2>`;
        data.volunteers.forEach(v => {
            html += `<div class="cv-item">
                <div class="cv-item-header">
                    <div><div class="cv-item-title" style="${isClassic ? 'color: var(--accent-color)' : ''}">${escapeHtml(v.role)}</div>
                    <div class="cv-item-subtitle">${escapeHtml(v.org)}</div></div>
                    <span class="cv-item-date">${v.startDate}${v.endDate ? ` - ${v.endDate}` : ''}</span>
                </div>
                ${v.description ? `<div class="cv-item-description">${escapeHtml(v.description)}</div>` : ''}
            </div>`;
        });
        html += `</div>`;
    }

    // İlgi Alanları
    if (data.hobbies) {
        html += `<div class="cv-section"><h2 class="cv-section-title" style="${sectionTitleStyle}">İLGİ ALANLARI</h2><p class="cv-hobbies">${escapeHtml(data.hobbies)}</p></div>`;
    }

    // Referanslar
    if (data.references.length > 0 || data.referenceOnRequest) {
        html += `<div class="cv-section"><h2 class="cv-section-title" style="${sectionTitleStyle}">REFERANSLAR</h2>`;
        if (data.referenceOnRequest && data.references.length === 0) {
            html += `<p class="cv-reference-note">İstek üzerine sunulabilir.</p>`;
        } else {
            html += `<div class="cv-references-grid">`;
            data.references.forEach(ref => {
                html += `<div class="cv-reference-item">
                    <div class="cv-reference-name">${escapeHtml(ref.name)}</div>
                    <div class="cv-reference-position">${escapeHtml(ref.position)}${ref.company ? `, ${escapeHtml(ref.company)}` : ''}</div>
                    <div class="cv-reference-contact">${ref.phone ? `Tel: ${escapeHtml(ref.phone)}` : ''}${ref.email ? `${ref.phone ? '<br>' : ''}${escapeHtml(ref.email)}` : ''}</div>
                </div>`;
            });
            html += `</div>`;
        }
        html += `</div>`;
    }

    return html;
}

function updatePreviewContent(html) {
    cvPreview.innerHTML = html;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function formatDescription(text) {
    const lines = text.split('\n');
    const hasBullets = lines.some(line => line.trim().startsWith('-') || line.trim().startsWith('•'));
    if (hasBullets) {
        const items = lines.filter(l => l.trim()).map(l => l.replace(/^[-•]\s*/, '').trim()).filter(l => l);
        return `<ul>${items.map(i => `<li>${escapeHtml(i)}</li>`).join('')}</ul>`;
    }
    return escapeHtml(text);
}

// ============================================
// PDF GENERATION
// ============================================

async function generatePDF() {
    const data = getFormData();
    const fullName = `${data.firstName} ${data.lastName} `.trim();

    if (!fullName) {
        alert('Lütfen en azından adınızı ve soyadınızı girin.');
        return;
    }

    downloadBtn.disabled = true;
    const originalText = downloadBtn.innerHTML;
    downloadBtn.innerHTML = 'Oluşturuluyor...';

    try {
        const opt = {
            margin: [10, 10, 10, 10],
            filename: `${fullName.replace(/\s+/g, '_')}_CV.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true, letterRendering: true, logging: false },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
            pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
        };
        await html2pdf().set(opt).from(cvPreview).save();
    } catch (error) {
        console.error('PDF oluşturulurken hata:', error);
        alert('PDF oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
        downloadBtn.disabled = false;
        downloadBtn.innerHTML = originalText;
    }
}

// ============================================
// EVENT LISTENERS
// ============================================

function attachInputListeners() {
    const allInputs = form.querySelectorAll('input, textarea, select');
    allInputs.forEach(input => {
        input.removeEventListener('input', debouncedUpdate);
        input.removeEventListener('change', updatePreview);
        input.addEventListener('input', debouncedUpdate);
        input.addEventListener('change', updatePreview);
    });
}

const debouncedUpdate = debounce(updatePreview, 150);

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => { clearTimeout(timeout); func(...args); };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    attachInputListeners();
    downloadBtn.addEventListener('click', generatePDF);
    addExperience();
    addEducation();
    addLanguage();
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
});

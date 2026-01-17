/* ============================================
   DYNAMIC SECTIONS - Add/Remove Items
   ============================================ */

import { counters } from '../config/state.js';
import {
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
} from '../dom/elements.js';
import { attachInputListeners } from '../events/eventListeners.js';
import { updatePreview } from '../preview/previewManager.js';

export function addExperience() {
    counters.experience++;
    const id = counters.experience;
    const html = `
        <div class="dynamic-item" id="exp-${id}" draggable="true">
            <div class="drag-handle">⋮⋮</div>
            <button type="button" class="remove-btn" onclick="window.removeItem('exp-${id}')">×</button>
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

export function addEducation() {
    counters.education++;
    const id = counters.education;
    const html = `
        <div class="dynamic-item" id="edu-${id}" draggable="true">
            <div class="drag-handle">⋮⋮</div>
            <button type="button" class="remove-btn" onclick="window.removeItem('edu-${id}')">×</button>
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
                    <label>Okul Ortalaması</label>
                    <input type="text" class="edu-gpa" placeholder="3.50 / 4.00">
                </div>
            </div>
        </div>
    `;
    educationContainer.insertAdjacentHTML('beforeend', html);
    attachInputListeners();
}

export function addCertificate() {
    counters.certificate++;
    const id = counters.certificate;
    const html = `
        <div class="dynamic-item" id="cert-${id}" draggable="true">
            <div class="drag-handle">⋮⋮</div>
            <button type="button" class="remove-btn" onclick="window.removeItem('cert-${id}')">×</button>
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

export function addComputerSkill() {
    counters.computerSkill++;
    const id = counters.computerSkill;
    const html = `
        <div class="dynamic-item" id="cs-${id}" draggable="true">
            <div class="drag-handle">⋮⋮</div>
            <button type="button" class="remove-btn" onclick="window.removeItem('cs-${id}')">×</button>
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

export function addLanguage() {
    counters.language++;
    const id = counters.language;
    const html = `
        <div class="dynamic-item" id="lang-${id}" draggable="true">
            <div class="drag-handle">⋮⋮</div>
            <button type="button" class="remove-btn" onclick="window.removeItem('lang-${id}')">×</button>
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

export function addProject() {
    counters.project++;
    const id = counters.project;
    const html = `
        <div class="dynamic-item" id="proj-${id}" draggable="true">
            <div class="drag-handle">⋮⋮</div>
            <button type="button" class="remove-btn" onclick="window.removeItem('proj-${id}')">×</button>
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

export function addPublication() {
    counters.publication++;
    const id = counters.publication;
    const html = `
        <div class="dynamic-item" id="pub-${id}" draggable="true">
            <div class="drag-handle">⋮⋮</div>
            <button type="button" class="remove-btn" onclick="window.removeItem('pub-${id}')">×</button>
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

export function addAward() {
    counters.award++;
    const id = counters.award;
    const html = `
        <div class="dynamic-item" id="award-${id}" draggable="true">
            <div class="drag-handle">⋮⋮</div>
            <button type="button" class="remove-btn" onclick="window.removeItem('award-${id}')">×</button>
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

export function addMembership() {
    counters.membership++;
    const id = counters.membership;
    const html = `
        <div class="dynamic-item" id="member-${id}" draggable="true">
            <div class="drag-handle">⋮⋮</div>
            <button type="button" class="remove-btn" onclick="window.removeItem('member-${id}')">×</button>
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

export function addVolunteer() {
    counters.volunteer++;
    const id = counters.volunteer;
    const html = `
        <div class="dynamic-item" id="vol-${id}" draggable="true">
            <div class="drag-handle">⋮⋮</div>
            <button type="button" class="remove-btn" onclick="window.removeItem('vol-${id}')">×</button>
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

export function addReference() {
    counters.reference++;
    const id = counters.reference;
    const html = `
        <div class="dynamic-item" id="ref-${id}" draggable="true">
            <div class="drag-handle">⋮⋮</div>
            <button type="button" class="remove-btn" onclick="window.removeItem('ref-${id}')">×</button>
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

export function removeItem(id) {
    const element = document.getElementById(id);
    if (element) {
        element.style.opacity = '0';
        setTimeout(() => {
            element.remove();
            updatePreview();
        }, 200);
    }
}

// Expose removeItem to global scope for onclick handlers
window.removeItem = removeItem;

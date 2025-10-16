document.addEventListener('DOMContentLoaded', async () => {

    /* =====================================================
       🌍 GESTION DE LA LANGUE (localStorage + URL)
    ===================================================== */

    const urlParams = new URLSearchParams(window.location.search);
    let langCode = localStorage.getItem('user_lang');

    // 1️⃣ Si l’URL contient ?lang_id=...
    if (urlParams.has('lang_id')) {
        langCode = urlParams.get('lang_id');
        localStorage.setItem('user_lang', langCode);
    }

    // 2️⃣ Sinon, si rien en localStorage → détecter via PHP
    if (!langCode) {
        try {
            const res = await fetch('detect_language.php');
            const data = await res.json();
            langCode = data.lang;
            localStorage.setItem('user_lang', langCode);
        } catch (err) {
            console.warn('Erreur de détection de langue :', err);
            langCode = 1; // anglais par défaut
        }
    }

    // 3️⃣ Appliquer la langue
    const langMap = { 1: 'en', 4: 'es', 5: 'fr' };
    const lang = langMap[langCode] || 'en';


    // Chargement du fichier de traduction JSON
    let translations = {};
    try {
        const response = await fetch(`lang/${lang}.json`);
        translations = await response.json();

        // Traduire le texte des éléments
        document.querySelectorAll('[data-translate]').forEach(el => {
            const key = el.getAttribute('data-translate');
            if (translations[key]) el.textContent = translations[key];
        });

        // Traduire les placeholders
        document.querySelectorAll('[data-translate-placeholder]').forEach(el => {
            const key = el.getAttribute('data-translate-placeholder');
            if (translations[key]) el.setAttribute('placeholder', translations[key]);
        });

    } catch (error) {
        console.error('Erreur de chargement des traductions :', error);
    }

    /* =====================================================
       🌟 CODE D’ORIGINE DU SITE
    ===================================================== */
    const socialToggle = document.getElementById('social-toggle');
    const socialPanel = document.getElementById('social-panel');
    if (socialToggle && socialPanel) {
        socialToggle.addEventListener('click', () => socialPanel.classList.toggle('show'));
        document.addEventListener('click', (e) => {
            if (!socialToggle.contains(e.target) && !socialPanel.contains(e.target)) {
                socialPanel.classList.remove('show');
            }
        });
    }

    const trustpilotForm = document.getElementById('trustpilot-form');
    const trustpilotSubmit = document.getElementById('trustpilot-submit');
    const trustpilotSuccess = document.getElementById('trustpilot-success');
    const trustpilotError = document.getElementById('trustpilot-error');
    
    if (trustpilotForm && trustpilotSubmit && trustpilotSuccess && trustpilotError) {
        trustpilotForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const nameInput = document.getElementById('customer-name');
            const emailInput = document.getElementById('customer-email');

            if (!nameInput || !emailInput) {
                showError(trustpilotError, 'Form fields not found. Please refresh the page.');
                return;
            }

            const customerName = nameInput.value.trim();
            const customerEmail = emailInput.value.trim();

            if (!customerName || !customerEmail) {
                showError(trustpilotError, 'Please provide your name and email address');
                return;
            }

            trustpilotSubmit.disabled = true;
            trustpilotSubmit.innerHTML = `<div class="spinner"></div> Generating Review Link...`;

            try {
                const response = await fetch('api/trustpilot.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ customerName, customerEmail })
                });
                
                const data = await response.json();
                if (!response.ok) throw new Error(data.error || 'Failed to generate review link');

                const invitationUrl = data.invitationUrl;
                showSuccess(trustpilotSuccess, `
                    <div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:0.75rem;">
                        <svg style="width:1.5rem;height:1.5rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <span style="font-weight:600;">Ready to leave your review!</span>
                    </div>
                    <p style="font-size:0.875rem;margin-bottom:0.75rem;">
                        Click the button below to review All-Stars Motorsport on Trustpilot
                    </p>
                    <button onclick="openTrustpilotReview('${invitationUrl}')" class="review-button">
                        Review on Trustpilot
                    </button>
                `);

                trustpilotForm.reset();
                setTimeout(() => trustpilotSuccess.classList.remove('show'), 10000);

            } catch (error) {
                showError(trustpilotError, error.message);
            } finally {
                trustpilotSubmit.disabled = false;
                trustpilotSubmit.innerHTML = `<span>Generate My Trustpilot Review Link</span>`;
            }
        });
    }

    // Fonction d’ouverture Trustpilot
    window.openTrustpilotReview = function(url) {
        if (!url) return;
        const width = 600, height = 700;
        const left = (window.screen.width - width) / 2;
        const top = (window.screen.height - height) / 2;
        const features = `width=${width},height=${height},left=${left},top=${top},toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,noopener,noreferrer`;
        window.open(url, 'TrustpilotReview', features);
    }

    /* =====================================================
       📤 Gestion Upload Images/Vidéos
    ===================================================== */
    let selectedFiles = [];
    const uploadArea = document.getElementById('upload-area');
    const fileInput = document.getElementById('file-input');
    const fileList = document.getElementById('file-list');

    if (uploadArea && fileInput) {
        uploadArea.addEventListener('click', () => fileInput.click());
        fileInput.addEventListener('change', (e) => {
            const files = Array.from(e.target.files || []);
            const validFiles = files.filter(f => (f.type.startsWith('image/') || f.type.startsWith('video/')) && f.size <= 10*1024*1024);
            if (validFiles.length !== files.length) alert('Only images/videos under 10MB are allowed');
            selectedFiles = [...selectedFiles, ...validFiles].slice(0,5);
            renderFileList();
            fileInput.value = '';
        });
    }

    function renderFileList() {
        if (!fileList) return;
        if (!selectedFiles.length) { fileList.innerHTML = ''; return; }
        fileList.innerHTML = '<p style="font-size:0.875rem;font-weight:500;margin-bottom:0.5rem;">Selected Files:</p>';
        selectedFiles.forEach((file,index) => {
            const div = document.createElement('div'); div.className='file-item';
            const info = document.createElement('div'); info.className='file-item-info';
            if (file.type.startsWith('image/')) {
                const img = document.createElement('img'); img.className='file-preview';
                img.src = URL.createObjectURL(file); info.appendChild(img);
            }
            const nameSpan = document.createElement('span'); nameSpan.textContent=file.name; nameSpan.style.fontSize='0.875rem';
            info.appendChild(nameSpan);
            const removeBtn=document.createElement('button'); removeBtn.className='remove-file';
            removeBtn.type='button'; removeBtn.textContent='Remove';
            removeBtn.onclick=()=>removeFile(index);
            div.appendChild(info); div.appendChild(removeBtn);
            fileList.appendChild(div);
        });
    }

    function removeFile(index) {
        selectedFiles = selectedFiles.filter((_,i)=>i!==index);
        renderFileList();
    }

    /* =====================================================
       ✅ Fonctions utilitaires Success/Error
    ===================================================== */
    function showSuccess(el,message){if(!el)return;el.innerHTML=message;el.classList.add('show');}
    function showError(el,message){if(!el)return;el.innerHTML=`❌ ${message}`;el.classList.add('show');setTimeout(()=>el.classList.remove('show'),5000);}
});

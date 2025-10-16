// State
let selectedFiles = [];
let invitationUrl = '';

// Social panel toggle
const socialToggle = document.getElementById('social-toggle');
const socialPanel = document.getElementById('social-panel');

socialToggle.addEventListener('click', () => {
    socialPanel.classList.toggle('show');
});

// Close social panel when clicking outside
document.addEventListener('click', (e) => {
    if (!socialToggle.contains(e.target) && !socialPanel.contains(e.target)) {
        socialPanel.classList.remove('show');
    }
});

// Trustpilot Form
const trustpilotForm = document.getElementById('trustpilot-form');
const trustpilotSubmit = document.getElementById('trustpilot-submit');
const trustpilotSuccess = document.getElementById('trustpilot-success');
const trustpilotError = document.getElementById('trustpilot-error');

trustpilotForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const customerName = document.getElementById('customer-name').value.trim();
    const customerEmail = document.getElementById('customer-email').value.trim();
    const referenceId = document.getElementById('reference-id').value.trim();
    
    if (!customerName || !customerEmail) {
        showError(trustpilotError, 'Please provide your name and email address');
        return;
    }
    
    trustpilotSubmit.disabled = true;
    trustpilotSubmit.innerHTML = `
        <div class="spinner"></div>
        Generating Review Link...
    `;
    
    try {
        const response = await fetch('api/trustpilot.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                customerName,
                customerEmail,
                referenceId: referenceId || undefined
            })
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || 'Failed to generate review link');
        }
        
        invitationUrl = data.invitationUrl;
        
        showSuccess(trustpilotSuccess, `
            <div style="display: flex; align-items: center; justify-content: center; gap: 0.5rem; margin-bottom: 0.75rem;">
                <svg style="width: 1.5rem; height: 1.5rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span style="font-weight: 600;">Ready to leave your review!</span>
            </div>
            <p style="font-size: 0.875rem; margin-bottom: 0.75rem;">Click the button below to review All-Stars Motorsport on Trustpilot</p>
            <button onclick="openTrustpilotReview()" class="review-button">
                <span>⭐</span> Review on Trustpilot
                <svg style="width: 1rem; height: 1rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                </svg>
            </button>
        `);
        
        // Reset form
        trustpilotForm.reset();
        
        // Hide success after 10 seconds
        setTimeout(() => {
            trustpilotSuccess.classList.remove('show');
        }, 10000);
        
    } catch (error) {
        showError(trustpilotError, error.message);
    } finally {
        trustpilotSubmit.disabled = false;
        trustpilotSubmit.innerHTML = `
            <span>⭐</span>
            Generate My Trustpilot Review Link
        `;
    }
});

// Open Trustpilot review in popup
function openTrustpilotReview() {
    if (invitationUrl) {
        const width = 600;
        const height = 700;
        const left = (window.screen.width - width) / 2;
        const top = (window.screen.height - height) / 2;
        const features = `width=${width},height=${height},left=${left},top=${top},toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,noopener,noreferrer`;
        window.open(invitationUrl, 'TrustpilotReview', features);
    }
}

// Image Upload
const uploadArea = document.getElementById('upload-area');
const fileInput = document.getElementById('file-input');
const fileList = document.getElementById('file-list');
const imageForm = document.getElementById('image-form');
const imageSubmit = document.getElementById('image-submit');
const imageSuccess = document.getElementById('image-success');
const imageError = document.getElementById('image-error');

uploadArea.addEventListener('click', () => {
    fileInput.click();
});

fileInput.addEventListener('change', (e) => {
    const files = Array.from(e.target.files || []);
    
    const validFiles = files.filter(file => 
        (file.type.startsWith('image/') || file.type.startsWith('video/')) && 
        file.size <= 10 * 1024 * 1024 // 10MB limit
    );
    
    if (validFiles.length !== files.length) {
        showError(imageError, 'Only images and videos under 10MB are allowed');
    }
    
    selectedFiles = [...selectedFiles, ...validFiles].slice(0, 5); // Max 5 files
    renderFileList();
    fileInput.value = ''; // Reset input
});

function renderFileList() {
    if (selectedFiles.length === 0) {
        fileList.innerHTML = '';
        return;
    }
    
    fileList.innerHTML = '<p style="font-size: 0.875rem; font-weight: 500; margin-bottom: 0.5rem;">Selected Files:</p>';
    
    selectedFiles.forEach((file, index) => {
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        
        const fileInfo = document.createElement('div');
        fileInfo.className = 'file-item-info';
        
        // Preview if image
        if (file.type.startsWith('image/')) {
            const img = document.createElement('img');
            img.className = 'file-preview';
            img.src = URL.createObjectURL(file);
            fileInfo.appendChild(img);
        }
        
        const fileName = document.createElement('span');
        fileName.textContent = file.name;
        fileName.style.fontSize = '0.875rem';
        fileInfo.appendChild(fileName);
        
        const removeBtn = document.createElement('button');
        removeBtn.className = 'remove-file';
        removeBtn.textContent = 'Remove';
        removeBtn.type = 'button';
        removeBtn.onclick = () => removeFile(index);
        
        fileItem.appendChild(fileInfo);
        fileItem.appendChild(removeBtn);
        fileList.appendChild(fileItem);
    });
}

function removeFile(index) {
    selectedFiles = selectedFiles.filter((_, i) => i !== index);
    renderFileList();
}

// Image compression function
async function compressFile(file) {
    if (!file.type.startsWith('image/')) {
        // Don't compress videos
        return file;
    }
    
    try {
        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 1920,
            useWebWorker: true,
            fileType: 'image/jpeg',
        };
        
        return await imageCompression(file, options);
    } catch (error) {
        console.error('Image compression failed:', error);
        return file; // Return original if compression fails
    }
}

imageForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    if (selectedFiles.length === 0) {
        showError(imageError, 'Please select at least one photo to upload');
        return;
    }
    
    imageSubmit.disabled = true;
    imageSubmit.innerHTML = `
        <div class="spinner"></div>
        Uploading Photos...
    `;
    
    try {
        const fileUrls = [];
        
        for (const file of selectedFiles) {
            // Compress image before upload
            let fileToUpload = file;
            try {
                fileToUpload = await compressFile(file);
                console.log(`Compressed ${file.name}: ${(file.size / 1024 / 1024).toFixed(2)}MB -> ${(fileToUpload.size / 1024 / 1024).toFixed(2)}MB`);
            } catch (compressionError) {
                console.warn(`Compression failed for ${file.name}, uploading original:`, compressionError);
            }
            
            const formData = new FormData();
            formData.append('file', fileToUpload);
            formData.append('path', `reviews/${Date.now()}-${Math.random().toString(36).substring(2)}-${file.name}`);
            
            const uploadResponse = await fetch('api/upload.php', {
                method: 'POST',
                body: formData
            });
            
            const uploadData = await uploadResponse.json();
            
            if (!uploadResponse.ok) {
                throw new Error(uploadData.error || `Failed to upload ${file.name}`);
            }
            
            fileUrls.push(uploadData.url);
        }
        
        // Create review record
        const reviewResponse = await fetch('api/reviews.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                reviewText: 'Photo submission from customer',
                rating: 5,
                files: fileUrls
            })
        });
        
        if (!reviewResponse.ok) {
            const reviewData = await reviewResponse.json();
            throw new Error(reviewData.error || 'Failed to submit review');
        }
        
        showSuccess(imageSuccess, '✅ Your photos have been uploaded successfully!');
        
        // Reset
        selectedFiles = [];
        renderFileList();
        
        setTimeout(() => {
            imageSuccess.classList.remove('show');
        }, 5000);
        
    } catch (error) {
        showError(imageError, error.message);
    } finally {
        imageSubmit.disabled = false;
        imageSubmit.innerHTML = `
            <span>📤</span>
            Upload Photos
        `;
    }
});

// Helper functions
function showSuccess(element, message) {
    element.innerHTML = message;
    element.classList.add('show');
}

function showError(element, message) {
    element.innerHTML = `⚠️ ${message}`;
    element.classList.add('show');
    setTimeout(() => {
        element.classList.remove('show');
    }, 5000);
}

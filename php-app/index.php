<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>All-Stars Motorsport - Share Your Experience</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 2rem 1rem;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
        }

        .header {
            text-align: center;
            color: white;
            margin-bottom: 3rem;
        }

        .header h1 {
            font-size: 2.5rem;
            margin-bottom: 0.5rem;
        }

        .header p {
            font-size: 1.1rem;
            opacity: 0.9;
        }

        .grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 2rem;
        }

        @media (min-width: 1024px) {
            .grid {
                grid-template-columns: 1fr 1fr;
            }
        }

        .card {
            background: white;
            border-radius: 1rem;
            padding: 2rem;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }

        .card-title {
            font-size: 1.5rem;
            font-weight: 600;
            margin-bottom: 1rem;
            color: #1f2937;
        }

        .trustpilot-info {
            background: #eff6ff;
            border: 1px solid #dbeafe;
            border-radius: 0.5rem;
            padding: 1rem;
            margin-bottom: 1.5rem;
            display: flex;
            gap: 1rem;
        }

        .trustpilot-info img {
            width: 32px;
            height: 32px;
        }

        .trustpilot-info-text h3 {
            font-size: 0.875rem;
            font-weight: 500;
            color: #1e40af;
            margin-bottom: 0.25rem;
        }

        .trustpilot-info-text p {
            font-size: 0.75rem;
            color: #1d4ed8;
        }

        .form-group {
            margin-bottom: 1.5rem;
        }

        .form-label {
            display: block;
            font-size: 0.875rem;
            font-weight: 500;
            color: #374151;
            margin-bottom: 0.5rem;
        }

        .form-label .required {
            color: #ef4444;
        }

        .form-input {
            width: 100%;
            padding: 0.75rem;
            border: 1px solid #d1d5db;
            border-radius: 0.5rem;
            font-size: 1rem;
            transition: border-color 0.2s;
        }

        .form-input:focus {
            outline: none;
            border-color: #3b82f6;
            box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .form-hint {
            font-size: 0.75rem;
            color: #6b7280;
            margin-top: 0.25rem;
        }

        .button {
            width: 100%;
            padding: 0.75rem 1.5rem;
            background: #2563eb;
            color: white;
            border: none;
            border-radius: 0.5rem;
            font-size: 1rem;
            font-weight: 500;
            cursor: pointer;
            transition: background 0.2s;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
        }

        .button:hover {
            background: #1d4ed8;
        }

        .button:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }

        .button-green {
            background: #10b981;
        }

        .button-green:hover {
            background: #059669;
        }

        .upload-area {
            border: 2px dashed #d1d5db;
            border-radius: 0.5rem;
            padding: 2rem;
            text-align: center;
            cursor: pointer;
            transition: border-color 0.2s;
        }

        .upload-area:hover {
            border-color: #3b82f6;
        }

        .upload-icon {
            width: 48px;
            height: 48px;
            margin: 0 auto 1rem;
            color: #9ca3af;
        }

        .file-list {
            margin-top: 1rem;
        }

        .file-item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            background: #f3f4f6;
            padding: 0.75rem;
            border-radius: 0.5rem;
            margin-bottom: 0.5rem;
        }

        .file-item-info {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            flex: 1;
        }

        .file-preview {
            width: 40px;
            height: 40px;
            object-fit: cover;
            border-radius: 0.25rem;
        }

        .remove-file {
            background: #ef4444;
            color: white;
            border: none;
            border-radius: 0.25rem;
            padding: 0.25rem 0.5rem;
            cursor: pointer;
            font-size: 0.75rem;
        }

        .success-message {
            background: #10b981;
            color: white;
            padding: 1rem;
            border-radius: 0.5rem;
            text-align: center;
            margin-bottom: 1.5rem;
            display: none;
        }

        .success-message.show {
            display: block;
        }

        .error-message {
            background: #ef4444;
            color: white;
            padding: 1rem;
            border-radius: 0.5rem;
            text-align: center;
            margin-bottom: 1.5rem;
            display: none;
        }

        .error-message.show {
            display: block;
        }

        .spinner {
            width: 1rem;
            height: 1rem;
            border: 2px solid white;
            border-top-color: transparent;
            border-radius: 50%;
            animation: spin 0.6s linear infinite;
        }

        @keyframes spin {
            to { transform: rotate(360deg); }
        }

        /* Social Media Button */
        .social-button {
            position: fixed;
            bottom: 1.5rem;
            right: 1.5rem;
            width: 60px;
            height: 60px;
            background: #3b82f6;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            transition: transform 0.2s;
            z-index: 1000;
        }

        .social-button:hover {
            transform: scale(1.1);
        }

        .social-panel {
            position: fixed;
            bottom: 5.5rem;
            right: 1.5rem;
            background: white;
            border-radius: 0.75rem;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
            padding: 1rem;
            min-width: 200px;
            opacity: 0;
            transform: translateY(1rem);
            pointer-events: none;
            transition: all 0.3s;
            z-index: 999;
        }

        .social-panel.show {
            opacity: 1;
            transform: translateY(0);
            pointer-events: auto;
        }

        .social-link {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            padding: 0.75rem;
            border-radius: 0.5rem;
            text-decoration: none;
            color: #1f2937;
            transition: background 0.2s;
            margin-bottom: 0.5rem;
        }

        .social-link:hover {
            background: #f3f4f6;
        }

        .social-link.facebook { background: #eff6ff; }
        .social-link.instagram { background: #fce7f3; }
        .social-link.tiktok { background: #f3f4f6; }
        .social-link.whatsapp { background: #f0fdf4; }

        .social-link.facebook:hover { background: #dbeafe; }
        .social-link.instagram:hover { background: #fce7f3; }
        .social-link.tiktok:hover { background: #e5e7eb; }
        .social-link.whatsapp:hover { background: #dcfce7; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>All-Stars Motorsport</h1>
            <p>Share Your Experience</p>
        </div>

        <div class="grid">
            <!-- Trustpilot Section -->
            <div class="card">
                <h2 class="card-title">Leave a Review on Trustpilot</h2>
                
                <div id="trustpilot-success" class="success-message"></div>
                <div id="trustpilot-error" class="error-message"></div>

                <div class="trustpilot-info">
                    <img src="https://logo.trustpilot.com/trustpilot-logo.svg" alt="Trustpilot">
                    <div class="trustpilot-info-text">
                        <h3>Share your experience with All-Stars Motorsport</h3>
                        <p>Your review will be published on Trustpilot, helping other customers make informed decisions.</p>
                    </div>
                </div>

                <form id="trustpilot-form">
                    <div class="form-group">
                        <label class="form-label">
                            Your Name <span class="required">*</span>
                        </label>
                        <input type="text" class="form-input" id="customer-name" required placeholder="Enter your full name">
                    </div>

                    <div class="form-group">
                        <label class="form-label">
                            Your Email <span class="required">*</span>
                        </label>
                        <input type="email" class="form-input" id="customer-email" required placeholder="Enter your email address">
                        <p class="form-hint">This will be used to verify your review on Trustpilot</p>
                    </div>

                    <div class="form-group">
                        <label class="form-label">
                            Order/Service Reference (Optional)
                        </label>
                        <input type="text" class="form-input" id="reference-id" placeholder="e.g., Order #12345">
                        <p class="form-hint">Help us identify your specific service or order</p>
                    </div>

                    <button type="submit" class="button" id="trustpilot-submit">
                        <span>⭐</span>
                        Generate My Trustpilot Review Link
                    </button>
                </form>
            </div>

            <!-- Image Upload Section -->
            <div class="card">
                <h2 class="card-title">Share Your Experience with Images</h2>
                <p style="color: #6b7280; font-size: 0.875rem; margin-bottom: 1.5rem;">
                    Upload photos of your project or service experience
                </p>

                <div id="image-success" class="success-message"></div>
                <div id="image-error" class="error-message"></div>

                <form id="image-form">
                    <div class="form-group">
                        <label class="form-label">Upload Your Photos</label>
                        <div class="upload-area" id="upload-area">
                            <svg class="upload-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                            </svg>
                            <p>Upload images or videos (Max 5 files, 10MB each)</p>
                            <input type="file" id="file-input" accept="image/*,video/*" multiple style="display: none;">
                        </div>
                        <div id="file-list" class="file-list"></div>
                    </div>

                    <button type="submit" class="button button-green" id="image-submit">
                        <span>📤</span>
                        Upload Photos
                    </button>
                </form>
            </div>
        </div>
    </div>

    <!-- Social Media Button -->
    <div class="social-button" id="social-toggle">
        <svg style="width: 24px; height: 24px; color: white;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
        </svg>
    </div>

    <div class="social-panel" id="social-panel">
        <a href="https://www.facebook.com/allstarsmotorsport" target="_blank" class="social-link facebook">
            <svg style="width: 24px; height: 24px; color: #1877f2;" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            <span style="font-size: 0.875rem; font-weight: 500;">Facebook</span>
        </a>
        <a href="https://www.instagram.com/allstarsmotorsport" target="_blank" class="social-link instagram">
            <svg style="width: 24px; height: 24px; color: #e1306c;" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            <span style="font-size: 0.875rem; font-weight: 500;">Instagram</span>
        </a>
        <a href="https://www.tiktok.com/@allstarsmotorsport" target="_blank" class="social-link tiktok">
            <svg style="width: 24px; height: 24px;" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
            </svg>
            <span style="font-size: 0.875rem; font-weight: 500;">TikTok</span>
        </a>
        <a href="https://wa.me/1234567890" target="_blank" class="social-link whatsapp">
            <svg style="width: 24px; height: 24px; color: #25d366;" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            <span style="font-size: 0.875rem; font-weight: 500;">WhatsApp</span>
        </a>
    </div>

    <!-- Image Compression Library -->
    <script src="https://cdn.jsdelivr.net/npm/browser-image-compression@2.0.2/dist/browser-image-compression.min.js"></script>
    <script src="app.js"></script>
</body>
</html>

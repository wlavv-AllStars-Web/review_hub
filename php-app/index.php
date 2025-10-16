<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title data-translate="All-Stars Motorsport - Share Your Experience">All-Stars Motorsport - Share Your Experience</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            background: hsl(0 0% 100%);
            min-height: 100vh;
            padding: 2rem 1rem;
            background-image: radial-gradient(rgba(0, 0, 0, 0.04) 1px, transparent 1px);
            background-size: 4px 4px;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
        }

        .header {
            text-align: center;
            color: #1f2937;
            margin-bottom: 3rem;
        }

        .header h1 {
            font-size: 2.5rem;
            margin-bottom: 0.5rem;
            font-weight: 700;
        }

        .header p {
            font-size: 1.1rem;
            color: #6b7280;
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
            background: rgba(4, 218, 141, 0.2);
            border: 1px solid transparent;
            border-radius: 0.5rem;
            padding: 1rem;
            margin-bottom: 1.5rem;
            display: flex;
            gap: 1rem;
            align-items: start;
        }

        .trustpilot-info img {
            width: 100px;
            height: 48px;
            flex-shrink: 0;
        }

        .trustpilot-info-text {
            flex: 1;
        }

        .trustpilot-info-text h3 {
            font-size: 0.875rem;
            font-weight: 500;
            color: #005f41;
            margin-bottom: 0.25rem;
        }

        .trustpilot-info-text p {
            font-size: 0.75rem;
            color: rgba(0, 95, 65, 0.8);
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
            background: #04da8d;
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
            background: #009a67;
        }

        .button:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }

        .button-green {
            background: #04da8d;
        }

        .button-green:hover {
            background: #009a67;
        }
        
        .button-red {
            background: #ff8a8a;
            color: white;
            padding: 0.75rem 1.5rem;
            border-radius: 8px;
            border: none;
            font-weight: 600;
            cursor: pointer;
            transition: background 0.2s ease;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            text-decoration: none;
            width: 100%;
            justify-content: center;
        }
        
        .button-red:hover {
            background: #ff6b6b;
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
            background: #16a34a;
            color: white;
            padding: 1.5rem;
            border-radius: 0.5rem;
            text-align: center;
            margin-bottom: 1.5rem;
            display: none;
        }

        .success-message .review-button {
            background: white;
            color: #16a34a;
            border: none;
            padding: 0.625rem 1.25rem;
            border-radius: 0.5rem;
            font-weight: 500;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            margin-top: 0.75rem;
            transition: background 0.2s;
        }

        .success-message .review-button:hover {
            background: #f0fdf4;
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
        .lang-5 .trustpilot-info {
          padding: 2rem !important;
          margin-bottom: 1.8rem !important;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1 data-translate="All-Stars Motorsport">All-Stars Motorsport</h1>
            <p data-translate="Share Your Experience">Share Your Experience</p>
        </div>

        <div class="grid">
            <div class="card">
                <h2 class="card-title" data-translate="Leave a Review on Trustpilot">Leave a Review on Trustpilot</h2>
                
                <div id="trustpilot-success" class="success-message"></div>
                <div id="trustpilot-error" class="error-message"></div>

                <div class="trustpilot-info">
                    <img src="https://www.socialbuzzing.co.uk/wp-content/uploads/2021/06/The-Importance-Of-Online-Reviews-And-What-Social-Buzzing-Trust-Pilot-Reviews-Mean-For-Our-Clients.png" alt="Trustpilot">
                    <div class="trustpilot-info-text">
                        <h3 data-translate="Share your experience with All-Stars Motorsport">Share your experience with All-Stars Motorsport</h3>
                        <p data-translate="Your review will be published on Trustpilot, helping other customers make informed decisions. We value your honest feedback about our service.">Your review will be published on Trustpilot, helping other customers make informed decisions. We value your honest feedback about our service.</p>
                    </div>
                </div>

                <form id="trustpilot-form">
                    <div class="form-group">
                        <label class="form-label">
                        <span data-translate="Your Name">Your Name</span> <span class="required">*</span>
                        </label>
                        <input type="text" class="form-input" id="customer-name" required placeholder="Enter your full name" data-translate-placeholder="Enter your full name">
                    </div>

                    <div class="form-group">
                       <label class="form-label">
                       <span data-translate="Your Email">Your Email</span> <span class="required">*</span>
                       </label>
                        <input type="email" class="form-input" id="customer-email" required placeholder="Enter your email address" data-translate-placeholder="Enter your email address">
                        <p class="form-hint" data-translate="This will be used to verify your review on Trustpilot">This will be used to verify your review on Trustpilot</p>
                    </div>

                    <button type="submit" class="button" id="trustpilot-submit" data-translate="Generate My Trustpilot Review Link">
                        Generate My Trustpilot Review Link
                    </button>
                </form>
            </div>

            <div class="card">
                <div style="display: block; align-items: flex-start; gap: 1rem;">
                  <img 
                    src="https://www.all-stars-motorsport.com/img/all-stars-motorsport-logo_invoice-1632499801.jpg" 
                    alt="Trustpilot" 
                    style="max-width: 120px; height: auto;"
                  >
                  <div>
                    <h2 class="card-title" data-translate="Share Your Experience with Images">Share Your Experience with Images</h2>
                    <p style="color: #6b7280; font-size: 0.875rem; margin-bottom: 1.5rem;" data-translate="Upload photos of your project or service experience">
                      Upload photos of your project or service experience
                    </p>
                  </div>
                </div>

                <div id="image-success" class="success-message"></div>
                <div id="image-error" class="error-message"></div>
                <form id="image-form">
                    <div class="form-group">
                        <label class="form-label" data-translate="Upload Your Photos">Upload Your Photos</label>
                        <div class="upload-area" id="upload-area">
                            <svg class="upload-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                            </svg>
                            <p data-translate="Upload images or videos (Max 5 files, 10MB each)">Upload images or videos (Max 5 files, 10MB each)</p>
                            <input type="file" id="file-input" accept="image/*,video/*" multiple style="display: none;">
                        </div>
                        <div id="file-list" class="file-list"></div>
                    </div>

                    <button type="submit" class="button-red" id="image-submit">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-upload w-4 h-4 mr-2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" x2="12" y1="3" y2="15"></line></svg>
                        <span data-translate="Upload Photos">Upload Photos</span>
                    </button>
                </form>
            </div>
        </div>
    </div>

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
        <a href="https://wa.me/+34691161570" target="_blank" class="social-link whatsapp">
            <svg style="width: 24px; height: 24px; color: #25d366;" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            <span style="font-size: 0.875rem; font-weight: 500;">WhatsApp ðŸ‡ªðŸ‡¸</span>
        </a>
        <a href="https://wa.me/+33651871788" target="_blank" class="social-link whatsapp">
            <svg style="width: 24px; height: 24px; color: #25d366;" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            <span style="font-size: 0.875rem; font-weight: 500;">WhatsApp 🇫🇷</span>
        </a>
        <a href="https://wa.me/+351912201753" target="_blank" class="social-link whatsapp">
            <svg style="width: 24px; height: 24px; color: #25d366;" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            <span style="font-size: 0.875rem; font-weight: 500;">WhatsApp 🇬🇧</span>
        </a>
    </div>

    <!-- Image Compression Library -->
    <script src="https://cdn.jsdelivr.net/npm/browser-image-compression@2.0.2/dist/browser-image-compression.min.js"></script>
    <script src="app.js"></script>
    <script>
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('id_lang') === '5') {
        document.body.classList.add('lang-5');
      }
    </script>
    
</body>
</html>

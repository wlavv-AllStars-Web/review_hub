<?php
require_once '../config.php';

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, apikey');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonResponse(['error' => 'Method not allowed'], 405);
}

// Get file from POST
if (!isset($_FILES['file']) || $_FILES['file']['error'] !== UPLOAD_ERR_OK) {
    jsonResponse(['error' => 'No file uploaded or upload error'], 400);
}

$file = $_FILES['file'];
$path = $_POST['path'] ?? 'reviews/' . time() . '-' . bin2hex(random_bytes(8)) . '-' . basename($file['name']);

// Upload to Supabase Storage
$supabase_url = getenv('VITE_SUPABASE_URL');
$supabase_key = getenv('VITE_SUPABASE_ANON_KEY');

if (!$supabase_url || !$supabase_key) {
    jsonResponse(['error' => 'Supabase not configured'], 500);
}

// URL-encode path segments
$pathParts = explode('/', $path);
$encodedPath = implode('/', array_map('urlencode', $pathParts));

$uploadUrl = "$supabase_url/storage/v1/object/review-files/$encodedPath";

$ch = curl_init($uploadUrl);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, file_get_contents($file['tmp_name']));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer ' . $supabase_key,
    'apikey: ' . $supabase_key,
    'Content-Type: ' . ($file['type'] ?: 'application/octet-stream')
]);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($httpCode >= 200 && $httpCode < 300) {
    $publicUrl = "$supabase_url/storage/v1/object/public/review-files/$encodedPath";
    jsonResponse(['url' => $publicUrl]);
} else {
    $errorData = json_decode($response, true);
    $errorMessage = $errorData['message'] ?? $errorData['error'] ?? 'Upload failed';
    
    if (stripos($errorMessage, 'bucket') !== false && stripos($errorMessage, 'not found') !== false) {
        jsonResponse([
            'error' => 'Storage bucket "review-files" does not exist. Please create it in your Supabase dashboard: Storage > New Bucket > Name: "review-files" > Public bucket: Yes'
        ], 400);
    }
    
    jsonResponse(['error' => $errorMessage], $httpCode);
}

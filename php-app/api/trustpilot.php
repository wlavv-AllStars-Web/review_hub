<?php
require_once '../config.php';

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonResponse(['error' => 'Method not allowed'], 405);
}

$input = getJsonInput();

$customerName = trim($input['customerName'] ?? '');
$customerEmail = trim($input['customerEmail'] ?? '');
$referenceId = trim($input['referenceId'] ?? '');

// Validate
if (empty($customerName) || empty($customerEmail)) {
    jsonResponse(['error' => 'Name and email are required'], 400);
}

if (!filter_var($customerEmail, FILTER_VALIDATE_EMAIL)) {
    jsonResponse(['error' => 'Invalid email address'], 400);
}

// Generate Trustpilot invitation URL
// Note: This is a simulated URL. In production, you would use Trustpilot's API
$businessUnitId = 'your-business-unit-id';
$invitationUrl = "https://www.trustpilot.com/evaluate/$businessUnitId?" . http_build_query([
    'name' => $customerName,
    'email' => $customerEmail,
    'ref' => $referenceId
]);

jsonResponse([
    'success' => true,
    'invitationUrl' => $invitationUrl,
    'message' => 'Trustpilot review link generated successfully'
]);

<?php
// Database configuration
$database_url = getenv('DATABASE_URL');
if (!$database_url) {
    die('DATABASE_URL environment variable is required');
}

// Parse PostgreSQL connection URL
$db_parts = parse_url($database_url);
$db_host = $db_parts['host'];
$db_port = $db_parts['port'] ?? 5432;
$db_name = ltrim($db_parts['path'], '/');
$db_user = $db_parts['user'];
$db_pass = $db_parts['pass'];

// Supabase configuration
$supabase_url = getenv('VITE_SUPABASE_URL');
$supabase_key = getenv('VITE_SUPABASE_ANON_KEY');

// Database connection helper
function getDbConnection() {
    global $db_host, $db_port, $db_name, $db_user, $db_pass;
    
    $conn_string = "host=$db_host port=$db_port dbname=$db_name user=$db_user password=$db_pass sslmode=require";
    $conn = pg_connect($conn_string);
    
    if (!$conn) {
        throw new Exception('Database connection failed: ' . pg_last_error());
    }
    
    return $conn;
}

// Helper to return JSON response
function jsonResponse($data, $statusCode = 200) {
    http_response_code($statusCode);
    header('Content-Type: application/json');
    echo json_encode($data);
    exit;
}

// Helper to get JSON input
function getJsonInput() {
    return json_decode(file_get_contents('php://input'), true) ?? [];
}

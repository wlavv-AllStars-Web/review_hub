<?php
require_once '../config.php';

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

try {
    $conn = getDbConnection();
    
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        // Get all reviews
        $result = pg_query($conn, 'SELECT id, review_text as "reviewText", rating, files, created_at as "createdAt" FROM reviews ORDER BY created_at DESC');
        
        if (!$result) {
            throw new Exception('Failed to fetch reviews: ' . pg_last_error($conn));
        }
        
        $reviews = [];
        while ($row = pg_fetch_assoc($result)) {
            $reviews[] = [
                'id' => $row['id'],
                'reviewText' => $row['reviewText'],
                'rating' => (int)$row['rating'],
                'files' => json_decode($row['files'] ?? '[]', true),
                'createdAt' => $row['createdAt']
            ];
        }
        
        pg_close($conn);
        jsonResponse($reviews);
        
    } elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // Create review
        $input = getJsonInput();
        
        $reviewText = $input['reviewText'] ?? '';
        $rating = $input['rating'] ?? 0;
        $files = $input['files'] ?? [];
        
        // Validate
        if (empty($reviewText) || $rating < 1 || $rating > 5) {
            jsonResponse(['error' => 'Invalid review data'], 400);
        }
        
        // Insert review
        $filesJson = json_encode($files);
        $query = "INSERT INTO reviews (review_text, rating, files) VALUES ($1, $2, $3) RETURNING id, review_text as \"reviewText\", rating, files, created_at as \"createdAt\"";
        $result = pg_query_params($conn, $query, [$reviewText, $rating, $filesJson]);
        
        if (!$result) {
            throw new Exception('Failed to create review: ' . pg_last_error($conn));
        }
        
        $row = pg_fetch_assoc($result);
        $review = [
            'id' => $row['id'],
            'reviewText' => $row['reviewText'],
            'rating' => (int)$row['rating'],
            'files' => json_decode($row['files'] ?? '[]', true),
            'createdAt' => $row['createdAt']
        ];
        
        pg_close($conn);
        jsonResponse($review, 201);
    } else {
        jsonResponse(['error' => 'Method not allowed'], 405);
    }
    
} catch (Exception $e) {
    jsonResponse(['error' => $e->getMessage()], 500);
}

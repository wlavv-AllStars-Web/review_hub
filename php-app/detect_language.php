<?php
// detect_language.php

// Détecte la langue à partir du navigateur
$lang = substr($_SERVER['HTTP_ACCEPT_LANGUAGE'], 0, 2);

// Associe la langue détectée à ton code
switch ($lang) {
    case 'en':
        $lang_code = 1; // Anglais
        break;
    case 'es':
        $lang_code = 4; // Espagnol
        break;
    case 'fr':
        $lang_code = 5; // Français
        break;
    default:
        $lang_code = 1; // Par défaut : Anglais
        break;
}

// Renvoie le code sous forme JSON
header('Content-Type: application/json');
echo json_encode(['lang' => $lang_code]);

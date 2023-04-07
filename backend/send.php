<?php

error_reporting(E_ERROR | E_PARSE);
header('Content-Type: application/json; charset=utf-8');

// Telegram API token
$token = '6152127034:AAFgmqi2hYrVDVrMxiFoZqXr0ZCPNqs6RyY';
$chatId = '-1001749067057';


// POST data
$fullName = $_POST['name'] ?? null;
$subject = $_POST['subject'] ?? null;
$email = $_POST['email'] ?? null;
$message = $_POST['message'] ?? null;

// Prepared message for Telegram
$preparedMessage = urlencode(
    "🔔 *Получено новое сообщение*\n\n" .
        "*Полное имя*: $fullName\n" .
        "*Тема сообщения*: $subject\n" .
        "*E-mail*: $email\n" .
        "*Сообщение*: \n\n" .
        $message
);

// If everything is alright
if ($fullName != null && $subject != null && $email != null && $message != null) {
    try {
        $response = file_get_contents("https://api.telegram.org/bot$token/sendMessage?text=$preparedMessage&chat_id=$chatId&parse_mode=markdown");

        if ($response) {
            http_response_code(200);

            echo json_encode([
                'ok' => true,
                'code' => 200,
            ], JSON_PRETTY_PRINT);
        } else {
            http_response_code(500);

            echo json_encode([
                'ok' => false,
                'code' => 500,
                'message' => 'Something went wrong...'
            ], JSON_PRETTY_PRINT);
        }
        // If some shit happens...
    } catch (Exception $error) {
        http_response_code(500);

        echo json_encode([
            'ok' => false,
            'code' => 500,
            'message' => $error->__toString()
        ], JSON_PRETTY_PRINT);
    }
    // If user forgot to enter some data
} else {
    http_response_code(400);

    echo json_encode([
        'ok' => false,
        'code' => 400,
        'message' => 'Bad request.'
    ], JSON_PRETTY_PRINT);
}

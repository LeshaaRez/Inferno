<?php
require_once 'vendor/autoload.php';

$clientID = '76938804903-tnhvkqso85bs80h0guspc3ckgntd39cu.apps.googleusercontent.com';
$clientSecret = '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';
$redirectUri = 'https://3831-178-150-170-99.ngrok-free.app/WebSite/callback.php'; // The URI where Google will redirect after login

$client = new Google_Client();
$client->setClientId($clientID);
$client->setClientSecret($clientSecret);
$client->setRedirectUri($redirectUri);
$client->addScope('email');
$client->addScope('profile');

if (session_status() == PHP_SESSION_NONE) {
    session_start();
}
?>

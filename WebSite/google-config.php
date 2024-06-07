<?php
require_once 'vendor/autoload.php';

$clientID = '274956882933-rerbvdb4ghvflilmmkrksp621o5fif5b.apps.googleusercontent.com';
$clientSecret = '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';
$redirectUri = 'http://localhost/WebSite/callback.php'; // The URI where Google will redirect after login

$client = new Google\Client();
$client->setClientId($clientID);
$client->setClientSecret($clientSecret);
$client->setRedirectUri('http://localhost/WebSite/callback.php');
$client->addScope('email');
$client->addScope('profile');

if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

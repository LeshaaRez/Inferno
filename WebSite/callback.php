<?php
require_once 'vendor/autoload.php';
require_once 'google-config.php';

if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

if (isset($_GET['code'])) { // Corrected: Closing parenthesis was missing
    try {
        $token = $client->fetchAccessTokenWithAuthCode($_GET['code']);

        if (isset($token['error'])) {
            throw new Exception('Error fetching access token: ' . $token['error']);
        }

        if (!isset($token['access_token'])) {
            throw new Exception('Access token not found in the response.');
        }

        $client->setAccessToken($token['access_token']);

        // Исправлено: используйте Google\Client вместо Google_Client
        $oauth2 = new Google\Service\Oauth2($client); 
        $google_account_info = $oauth2->userinfo->get();

        if (empty($google_account_info)) {
            throw new Exception('Failed to get user info from Google.');
        }

        $email = $google_account_info->email;
        $name = $google_account_info->name;

        $_SESSION['email'] = $email;
        $_SESSION['name'] = $name;

        header('Location: index.php');
        exit();
    } catch (Exception $e) {
        echo 'Caught exception: ',  $e->getMessage(), "\n";
    }
} else {
    header('Location: login.php');
    exit();
}

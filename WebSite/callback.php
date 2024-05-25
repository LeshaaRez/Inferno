<?php
require_once 'vendor/autoload.php';
require_once 'google-config.php';

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$mysqli = new mysqli("localhost", "root", "123", "inferno");

if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
}

if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

if (isset($_GET['code'])) { 
    try {
        $token = $client->fetchAccessTokenWithAuthCode($_GET['code']);

        if (isset($token['error'])) {
            throw new Exception('Error fetching access token: ' . $token['error']);
        }

        if (!isset($token['access_token'])) {
            throw new Exception('Access token not found in the response.');
        }

        $client->setAccessToken($token['access_token']);

        $oauth2 = new Google\Service\Oauth2($client); 
        $google_account_info = $oauth2->userinfo->get();

        if (empty($google_account_info)) {
            throw new Exception('Failed to get user info from Google.');
        }

        $email = $google_account_info->email;
        $name = $google_account_info->name;

        // Сохранение информации о пользователе в базу данных
        $stmt = $mysqli->prepare("INSERT INTO user (email, username) VALUES (?, ?) ON DUPLICATE KEY UPDATE username=?");
        $stmt->bind_param("sss", $email, $name, $name);
        $stmt->execute();
        $stmt->close();

        $_SESSION['email'] = $email;
        $_SESSION['username'] = $name;

        header('Location: index.php');
        exit();
    } catch (Exception $e) {
        echo 'Caught exception: ',  $e->getMessage(), "\n";
    }
} else {
    header('Location: login.php');
    exit();
}

$mysqli->close();

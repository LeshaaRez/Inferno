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

        // Check if the user exists in the database
        $stmt = $mysqli->prepare("SELECT user_id, username FROM user WHERE email = ?");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $stmt->store_result();

        if ($stmt->num_rows > 0) {
            // User exists, fetch username
            $stmt->bind_result($user_id, $existing_username);
            $stmt->fetch();
            $username = $existing_username;
        } else {
            // User does not exist, insert new user
            $stmt->close();
            $username = $name;
            $stmt = $mysqli->prepare("INSERT INTO user (email, username) VALUES (?, ?)");
            $stmt->bind_param("ss", $email, $username);
            $stmt->execute();
        }

        $stmt->close();

        $_SESSION['email'] = $email;
        $_SESSION['username'] = $username;

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
?>

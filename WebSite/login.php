<?php
require_once 'google-config.php';

$loginUrl = $client->createAuthUrl();
header("Location: " . $loginUrl);
?>

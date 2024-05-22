<?php
session_start();

if (!isset($_SESSION['user_id'])) {
    header("Location: index.php");
    exit();
}

// Connect to the database
$mysqli = new mysqli("localhost", "root", "123", "inferno");

if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
}

$user_id = $_SESSION['user_id'];
$result = $mysqli->query("SELECT * FROM users WHERE user_id = $user_id");

$user = $result->fetch_assoc();

$mysqli->close();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Profile</title>
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    <div class="container mt-5">
        <h2>Welcome, <?php echo htmlspecialchars($user['username']); ?></h2>
        <p>Your email: <?php echo htmlspecialchars($user['email']); ?></p>
    </div>
</body>
</html>

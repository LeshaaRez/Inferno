<?php
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['email']) && isset($data['name'])) {
    $email = $data['email'];
    $name = $data['name'];

    $mysqli = new mysqli("localhost", "root", "123", "inferno");

    if ($mysqli->connect_error) {
        die("Connection failed: " . $mysqli->connect_error);
    }

    $result = $mysqli->query("SELECT * FROM user WHERE email='$email'");
    if ($result->num_rows == 0) {
        $stmt = $mysqli->prepare("INSERT INTO user (username, email, register_date) VALUES (?, ?, NOW())");
        $stmt->bind_param("ss", $name, $email);
        $stmt->execute();
        $stmt->close();
    }

    $mysqli->close();

    $_SESSION['email'] = $email;
    $_SESSION['name'] = $name;
    echo json_encode(['status' => 'success']);
} else {
    echo json_encode(['status' => 'error']);
}
?>

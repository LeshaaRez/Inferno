<?php
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

$mysqli = new mysqli("localhost", "root", "123", "inferno");

if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
}

$username = 'Имя пользователя';
$userinfo = 'Информация о пользователе';

if (isset($_SESSION['email'])) {
    $email = $_SESSION['email'];
    $result = $mysqli->query("SELECT username FROM user WHERE email='$email'");
    if ($result && $row = $result->fetch_assoc()) {
        $username = $row['username'];
        $userinfo = "Email: $email";
    }
    $result->free();
}

$mysqli->close();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Игра Викторина</title>
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
    <style>
        html, body {
            height: 100%;
        }
        body {
            display: flex;
            flex-direction: column;
        }
        .content {
            flex: 1 0 auto;
            padding-top: 56px; /* Высота навигационной панели */
        }
        .footer {
            flex-shrink: 0;
        }
    </style>
</head>
<body>
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <a class="navbar-brand" href="#">Викторина</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
            <ul class="navbar-nav ml-auto">
                <li class="nav-item active">
                    <a class="nav-link" href="#">Главная</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Профиль (<?php echo htmlspecialchars($username); ?>)</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Статьи</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Скачать</a>
                </li>
            </ul>
        </div>
    </nav>

    <!-- Main Content -->
    <div class="container content">
        <div class="row">
            <!-- Profile Section -->
            <div class="col-lg-4">
                <h2 class="mt-4">Профиль</h2>
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title"><?php echo htmlspecialchars($username); ?></h5>
                        <p class="card-text"><?php echo htmlspecialchars($userinfo); ?></p>
                        <a href="#" class="btn btn-primary">Редактировать профиль</a>
                    </div>
                </div>
            </div>

            <!-- Articles Section -->
            <div class="col-lg-8">
                <h2 class="mt-4">Статьи</h2>
                <div class="list-group">
                    <a href="#" class="list-group-item list-group-item-action">
                        <h5 class="mb-1">Заголовок статьи 1</h5>
                        <p class="mb-1">Краткое описание статьи 1...</p>
                    </a>
                    <a href="#" class="list-group-item list-group-item-action">
                        <h5 class="mb-1">Заголовок статьи 2</h5>
                        <p class="mb-1">Краткое описание статьи 2...</p>
                    </a>
                </div>
            </div>
        </div>

        <!-- Download Button -->
        <div class="row mt-4">
            <div class="col-lg-12 text-center">
                <a href="#" class="btn btn-success btn-lg">Скачать Викторину</a>
            </div>
        </div>
    </div>

    <!-- Footer -->
    <footer class="footer py-4 bg-dark text-white-50">
        <div class="container text-center">
            <small>© 2024 Викторина</small>
        </div>
    </footer>

    <!-- Bootstrap JS and dependencies -->
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.4/dist/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
</body>
</html>

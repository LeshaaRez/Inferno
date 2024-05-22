<?php
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}
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
                    <?php if (isset($_SESSION['user_id'])): ?>
                        <a class="nav-link" href="#" data-toggle="modal" data-target="#loginModal">Профиль (<?php echo htmlspecialchars($_SESSION['username']); ?>)</a>
                    <?php else: ?>
                        <a class="nav-link" href="#" data-toggle="modal" data-target="#loginModal">Профиль</a>
                    <?php endif; ?>
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
                        <h5 class="card-title">
                            <?php if (isset($_SESSION['user_id'])): ?>
                                Имя пользователя: <?php echo htmlspecialchars($_SESSION['username']); ?>
                            <?php else: ?>
                                Имя пользователя
                            <?php endif; ?>
                        </h5>
                        <p class="card-text">Информация о пользователе.</p>
                        <a href="#" class="btn btn-primary" data-toggle="modal" data-target="#loginModal">Редактировать профиль</a>
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

    <!-- Login Modal -->
    <div class="modal fade" id="loginModal" tabindex="-1" role="dialog" aria-labelledby="loginModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="loginModalLabel">Вход</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="form-group">
                            <label for="login">Логин</label>
                            <input type="text" class="form-control" id="login" placeholder="Введите логин">
                        </div>
                        <div class="form-group">
                            <label for="password">Пароль</label>
                            <input type="password" class="form-control" id="password" placeholder="Введите пароль">
                        </div>
                        <button type="submit" class="btn btn-success btn-block">Продолжить</button>
                        <hr>
                        <button type="button" class="btn btn-outline-primary btn-block" onclick="window.location.href='login.php'">Google</button>
                        <button type="button" class="btn btn-outline-primary btn-block">Facebook</button>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <!-- Bootstrap JS and dependencies -->
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.4/dist/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
</body>
</html>

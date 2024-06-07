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
$loggedIn = false;
$achievements = [];

if (isset($_POST['login'])) {
    $email = $mysqli->real_escape_string($_POST['email']);
    $password = $mysqli->real_escape_string($_POST['password']);

    // Fetch user data from the database
    $result = $mysqli->query("SELECT username, password FROM user WHERE email='$email'");
    if ($result && $row = $result->fetch_assoc()) {
        if ($password === $row['password']) { // Use password hashing in production
            $_SESSION['email'] = $email;
            $_SESSION['username'] = $row['username'];
            $username = $row['username'];
            $userinfo = "Email: $email";
            $loggedIn = true;
        } else {
            echo "Invalid password.";
        }
    } else {
        echo "No user found with that email.";
    }
    $result->free();

    $result = $mysqli->query("
        SELECT a.name, ua.date_achieved 
        FROM userachieve ua
        JOIN achieve a ON ua.achieve_id = a.achieve_id
        WHERE ua.user_id = (SELECT user_id FROM user WHERE email='$email')
    ");

    if ($result) {
        while ($row = $result->fetch_assoc()) {
            $achievements[] = $row;
        }
        $result->free();
    }
} elseif (isset($_SESSION['email'])) {
    $email = $_SESSION['email'];
    $username = $_SESSION['username'];

    // Fetch username from the database
    $result = $mysqli->query("SELECT username FROM user WHERE email='$email'");
    if ($result && $row = $result->fetch_assoc()) {
        $username = $row['username'];
        $userinfo = "Email: $email";
        $loggedIn = true;
    }
    $result->free();

    // Fetch achievements from the database
    $result = $mysqli->query("
        SELECT a.name, ua.date_achieved 
        FROM userachieve ua
        JOIN achieve a ON ua.achieve_id = a.achieve_id
        WHERE ua.user_id = (SELECT user_id FROM user WHERE email='$email')
    ");

    if ($result) {
        while ($row = $result->fetch_assoc()) {
            $achievements[] = $row;
        }
        $result->free();
    }
}

$mysqli->close();
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Inferno</title>
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet">
    <link rel="icon" type="image/png" href="assets/image2.png">
    <style>
        body {
            font-family: 'Roboto', sans-serif;
            display: flex;
            flex-direction: column;
            min-height: 100vh;
            margin: 0;
            background: rgb(253,255,33);
            background: linear-gradient(90deg, rgba(253,255,33,1) 0%, rgba(252,58,55,1) 51%, rgba(137,254,255,1) 100%);
            background-size: 400%;
            animation: gradient 10s infinite linear;
        }

        .content {
            flex: 1 0 auto;
            padding-top: 76px;
        }

        .footer {
            flex-shrink: 0;
        }

        .navbar-brand img {
            height: 50px;
            margin-right: 10px;
        }

        .navbar-brand {
            font-size: 2em;
            font-weight: 700;
        }

        .navbar-nav {
            margin-left: auto;
            margin-right: auto;
        }

        .navbar-nav .nav-link {
            display: flex;
            align-items: center;
            padding: 10px 20px;
        }

        .navbar-nav .nav-link i {
            margin-right: 5px;
        }

        .navbar-right {
            margin-left: auto;
        }

        .banner {
            background-image: url('assets/banner.png');
            background-size: cover;
            background-position: center;
            padding: 100px 0;
            text-align: center;
            color: white;
            position: relative;
            box-shadow: 0px 5px 15px black;
            height: 450px;
        }

        .banner h1 {
            font-size: 3em;
            margin-bottom: 20px;
        }

        .banner p {
            font-size: 1.5em;
            margin-bottom: 30px;
        }

        .banner .btn-download {
            font-size: 1.5em;
        }

        .banner::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.2);
            z-index: 0;
        }

        .banner-content {
            position: relative;
            z-index: 1;
        }

        .benefits h2 {
            margin-top: 50px;
        }

        .benefits-table {
            width: 100%;
            margin-top: 50px;
            border-collapse: collapse;
            text-align: center;
        }

        .benefits-table th,
        .benefits-table td {
            padding: 15px;
            border: 1px solid #ddd;
            background-color: rgba(0, 0, 0, 0.5);
            color: white;
        }

        .benefits-table th {
            background-color: rgba(0, 0, 0, 0.7);
        }

        .benefits-table tr:nth-child(even) td {
            background-color: rgba(0, 0, 0, 0.4);
        }

        .gallery {
            margin-top: 50px;
            text-align: center;
        }

        .gallery h2{
            margin-bottom: 50px;
        }

        .gallery img {
            width: 100%;
            height: auto;
            margin-bottom: 30px;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .testimonials {
            margin-top: 50px;
            margin-bottom: 80px;
            text-align: center;
        }

        .testimonials h2 {
            margin-bottom: 50px;
        }

        .testimonial {
            margin-bottom: 30px;
            text-align: center;
        }

        .testimonial img {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            margin-bottom: 10px;
        }

        .testimonial .name {
            font-weight: bold;
            font-size: 1.2em;
        }

        .testimonial .message {
            font-style: italic;
            color: #555;
        }

        .fa-quote-left,
        .fa-quote-right {
            color: #fd5c27;
        }

        @keyframes gradient {
            0% {
                background-position: 80% 0%;
            }

            50% {
                background-position: 20% 100%;
            }

            100% {
                background-position: 80% 0%;
            }
        }

        .login-icons img {
            width: 40px;
            height: 40px;
            cursor: pointer;
            display: block;
            margin: 0 auto;
        }

        .modal-body {
            text-align: left;
        }

        .navbar-nav .nav-item:not(:last-child) {
            margin-right: 20px;
        }

        h2, h5 {
            font-weight: bold;
        }

        #profile .row {
            margin-bottom: 50px;
        }
    </style>
</head>

<body>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <a class="navbar-brand" href="#">
            <img src="assets/image2.png" alt="Вікторина Icon">
            Inferno
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
            <ul class="navbar-nav mx-auto">
                <li class="nav-item">
                    <a class="nav-link" href="#home"></i> Головна</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#articles"></i> Статті</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#benefits"></i> Переваги</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#gallery"></i> Галерея</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#testimonials"></i> Відгуки</a>
                </li>
            </ul>
        </div>
        <ul class="navbar-nav ml-auto">
                <?php if (!$loggedIn) { ?>
                    <li class="nav-item">
                        <a class="nav-link profile-link" href="#"><i class="fas fa-sign-in-alt"></i> Увійти</a>
                    </li>
                <?php } ?>
                <?php if ($loggedIn) { ?>
                    <li class="nav-item">
                        <a class="nav-link" href="logout.php"><i class="fas fa-sign-out-alt"></i> Вийти</a>
                    </li>
                <?php } ?>
            </ul>
    </nav>

    <div id="home" class="banner">
        <div class="banner-content">
            <h1>Ласкаво просимо до Inferno</h1>
            <p>Inferno - це захоплююча вікторина, яка кидає виклик вашій ерудиції та знанням у різних галузях. Долучайтеся до гри та перевірте свої знання!</p>
            <a href="apk/Inferno.apk" class="btn btn-success btn-lg btn-download" download>Завантажити вікторину</a>
        </div>
    </div>

    <div id="profile" class="container content">
        <div class="row">
            <div class="col-lg-4">
                <h2 class="mt-4">Профіль</h2>
                <div class="card">
                    <div class="card-body text-left">
                        <h5 class="card-title" id="profile-name"><?php echo htmlspecialchars($username); ?></h5>
                        <p class="card-text" id="profile-info"><?php echo htmlspecialchars($userinfo); ?></p>
                        <?php if ($loggedIn) { ?>
                            <a href="logout.php" class="btn btn-danger">Вийти з профілю</a>
                        <?php } ?>
                        <h5 class="mt-4">Досягнення</h5>
                        <ul class="list-group">
                            <?php foreach ($achievements as $achievement) { ?>
                                <li class="list-group-item">
                                    <?php echo htmlspecialchars($achievement['name']); ?>
                                    <span class="badge badge-secondary"><?php echo htmlspecialchars($achievement['date_achieved']); ?></span>
                                </li>
                            <?php } ?>
                        </ul>
                    </div>
                </div>
            </div>
            <div id="articles" class="col-lg-8">
                <h2 class="mt-4">Статті</h2>
                <div class="list-group">
                    <a href="#" class="list-group-item list-group-item-action" data-toggle="collapse" data-target="#article1">
                        <h5 class="mb-1">Водний світ</h5>
                        <p class="mb-1">Чудесний світ медуз</p>
                        <div id="article1" class="collapse">
                            <br><img src="1.png" class="img-fluid" alt="Стаття 1"><br>
                            <p>
                                <br>Медузи є одними з найдавніших істот на планеті, їх вік налічує понад 500 мільйонів
                                років. Вони належать до типу кишковопорожнинних і мешкають у всіх океанах світу, від
                                поверхні до великих глибин. Медузи мають дзвоноподібне тіло, яке складається на 95% з
                                води, і довгі жалкі щупальця, якими вони захоплюють здобич.<br>
                            </p>
                        </div>
                    </a>
                    <a href="#" class="list-group-item list-group-item-action" data-toggle="collapse" data-target="#article2">
                        <h5 class="mb-1">Resident у селі</h5>
                        <p class="mb-1">Дивимось останню номерну частину </p>
                        <div id="article2" class="collapse">
                            <br><img src="2.png" class="img-fluid" alt="Стаття 2"><br><br>
                            <p>Сюжет Resident Evil Village продовжує історію Ітана Вінтерса, головного героя Resident
                                Evil 7: Biohazard. Після подій попередньої гри Ітан разом із дружиною Мією намагається
                                налагодити нормальне життя, але їхній спокій порушує несподіваний візит Кріса Редфілда. В
                                результаті їх дочка Розмарі викрадена, і Ітан опиняється в похмурому та таємничому селі,
                                розташованому у Східній Європі. <br>
                                <br>Село є центром подій гри і включає різноманітні локації: від стародавнього замку до
                                зловісних лісів і засніжених гір. Центральним елементом гри є замок Димитреску, де
                                мешкають зловісні жителі, включаючи культову Леді Димитреску.
                            </p>
                        </div>
                    </a>
                </div>
            </div>
        </div>

        <div id="benefits" class="row">
            <div class="col-lg-12">
                <h2 class="mt-4 text-center">Переваги нашої гри</h2>
                <table class="benefits-table table table-striped">
                    <thead>
                        <tr>
                            <th>Перевага</th>
                            <th>Опис</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Захоплюючий геймплей</td>
                            <td>Гра пропонує різноманітні категорії питань, які тримають гравців в напрузі.</td>
                        </tr>
                        <tr>
                            <td>Мультіплеєр</td>
                            <td>Можливість змагатися з друзями та іншими гравцями по всьому світу.</td>
                        </tr>
                        <tr>
                            <td>Регулярні оновлення</td>
                            <td>Постійне додавання нових питань та категорій для підтримання інтересу.</td>
                        </tr>
                        <tr>
                            <td>Інтуїтивний інтерфейс</td>
                            <td>Легкий у використанні інтерфейс, який дозволяє швидко зануритися в гру.</td>
                        </tr>
                        <tr>
                            <td>Безкоштовна гра</td>
                            <td>Гра доступна для всіх користувачів абсолютно безкоштовно.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div id="gallery" class="row gallery">
            <div class="col-lg-12">
                <h2 class="mt-4 text-center">Галерея</h2>
            </div>
            <div class="col-lg-4">
                <img src="assets/gallery1.jpg" alt="Скриншот 1">
            </div>
            <div class="col-lg-4">
                <img src="assets/gallery2.jpg" alt="Скриншот 2">
            </div>
            <div class="col-lg-4">
                <img src="assets/gallery3.jpg" alt="Скриншот 3">
            </div>
            <div class="col-lg-4">
                <img src="assets/gallery4.jpg" alt="Скриншот 4">
            </div>
            <div class="col-lg-4">
                <img src="assets/gallery5.jpg" alt="Скриншот 5">
            </div>
            <div class="col-lg-4">
                <img src="assets/gallery6.jpg" alt="Скриншот 6">
            </div>
        </div>

        <div id="testimonials" class="row testimonials">
            <div class="col-lg-12">
                <h2 class="mt-4 text-center">Відгуки користувачів</h2>
            </div>
            <div class="col-lg-4 testimonial">
                <img src="assets/user1.jpg" alt="Користувач 1">
                <div class="name">Олександр Петров</div>
                <div class="message">
                    <i class="fas fa-quote-left"></i>
                    <span>Ця гра просто неймовірна! Дуже цікаві питання і класний інтерфейс.</span>
                    <i class="fas fa-quote-right"></i>
                </div>
            </div>
            <div class="col-lg-4 testimonial">
                <img src="assets/user2.jpg" alt="Користувач 2">
                <div class="name">Марія Іваненко</div>
                <div class="message">
                    <i class="fas fa-quote-left"></i>
                    <span>Граю кожного дня, і кожного разу знаходжу щось нове. Рекомендую всім!</span>
                    <i class="fas fa-quote-right"></i>
                </div>
            </div>
            <div class="col-lg-4 testimonial">
                <img src="assets/user3.jpg" alt="Користувач 3">
                <div class="name">Іван Ковальчук</div>
                <div class="message">
                    <i class="fas fa-quote-left"></i>
                    <span>Чудова гра для розвитку знань та проведення часу з користю.</span>
                    <i class="fas fa-quote-right"></i>
                </div>
            </div>
        </div>
    </div>

    <div class="modal custom-modal fade" id="articleModal" tabindex="-1" role="dialog" aria-labelledby="articleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="articleModalLabel">Article Title</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <p id="articleModalContent">Article content...</p>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="loginModal" tabindex="-1" role="dialog" aria-labelledby="loginModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="loginModalLabel">Вхід</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form method="post" action="">
                        <div class="form-group">
                            <label for="loginEmail">Email</label>
                            <input type="email" class="form-control" id="loginEmail" name="email" placeholder="Введите email" required>
                        </div>
                        <div class="form-group">
                            <label for="loginPassword">Password</label>
                            <input type="password" class="form-control" id="loginPassword" name="password" placeholder="Введите пароль" required>
                        </div>
                        <div class="login-button-center">
                            <button type="submit" class="btn btn-primary" name="login">Увійти</button>
                        </div>
                        <div class="login-icons mt-3">
                            <img src="google.png" alt="Google" onclick="location.href='callback.php'">
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <footer class="footer py-4 bg-dark text-white-50">
        <div class="container text-center">
            <small>© 2024 Inferno</small>
        </div>
    </footer>

    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.4/dist/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    <script>
        document.querySelector('.profile-link').addEventListener('click', function(event) {
            event.preventDefault();
            $('#loginModal').modal('show');
        });

        document.querySelectorAll('.article-link').forEach(link => {
            link.addEventListener('click', function(event) {
                event.preventDefault();
                const title = this.getAttribute('data-title');
                const content = this.getAttribute('data-content');
                const rect = this.getBoundingClientRect();
                const modal = document.getElementById('articleModal');
                const modalDialog = modal.querySelector('.modal-dialog');
                document.getElementById('articleModalLabel').innerText = title;
                document.getElementById('articleModalContent').innerText = content;

                // Position the modal
                modal.style.top = `${rect.top}px`;
                modal.style.left = `${rect.left}px`;
                modal.style.transform = `translateY(${window.scrollY}px)`;
                $('#articleModal').modal('show');
            });
        });

        document.querySelectorAll('a.nav-link').forEach(link => {
            link.addEventListener('click', function(event) {
                event.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Adjust offset for fixed navbar height
                    behavior: 'smooth'
                });
            });
        });
    </script>
</body>

</html>

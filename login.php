</html>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Iniciar sesión</title>
    <link rel="stylesheet" href="stylos/logi.css">

    
</head>
<body>
    <div class="login-content">
        <form method="post" action="">
            <img src="th.jpeg" class="imagen" alt="">
            <h1 >Login</h1>
            <?php
            include "controlador/controlador_login.php";
            ?>
          
            <div class="input-box">
                <h5>Usuario</h5>
                <input id="usuario" type="text"  placeholder="user" name="usuario" required>
            </div>
            <div class="input-box">
                <h5>Contraseña</h5>
                <input type="password"  placeholder="password" name="password" required>
            </div>
            <input name="botingresar" class="btn" type="submit" value="Iniciar sesión">
        </form>
    </div>
</body>
</html>
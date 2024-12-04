<?php
session_start();
if (empty($_SESSION["id"]) || $_SESSION["rol"] !== 'auxiliar') {
    header("location: login.php");
    exit();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vista auxiliar</title>
</head>
<body>
    <main>
        <div>
            <p>Biembenido <?php echo $_SESSION["rol"] ," : " ,$_SESSION["usuario"]; ?></p>
            <p>ID: <?php echo $_SESSION["id"]; ?></p>
        </div>
        <div>
            <a href="controlador/controlador_cerrar.php">Salir</a>
        </div>
    </main>
</body>
</html>
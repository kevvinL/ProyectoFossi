<?php
session_start();
include "modelo/conexion.php"; // conexión a la base de datos

// Verificar si el usuario ha iniciado sesión correctamente
//estoy llamando el name del boton inciar sesion por estoy haciendo esta condicional para que cuando le oprima inicar sesion pueda validar todo los datos
if (isset($_POST["botingresar"])) {
    if (!empty($_POST["usuario"]) && !empty($_POST["password"])) {
        $usuario = $_POST["usuario"];
        $contraseña = $_POST["password"];

        // Consulta para verificar usuario y contraseña en la base de datos
        $sql = $conexion->query("SELECT * FROM usuarios WHERE usuario = '$usuario' AND contraseña = '$contraseña'");

        if ($datos = $sql->fetch_object()) {
            $_SESSION["usuario"] = $datos->usuario;
            $_SESSION["id"] = $datos->id;
            $_SESSION["rol"] = $datos->rol;

            // Redirigir según el rol
            if ($_SESSION["rol"] === 'coordinador') {
                header("Location: admin_inicio.php");
            } elseif ($_SESSION["rol"] === 'tecnico') {
                header("Location: inicio.php");
            } elseif ($_SESSION["rol"] === 'auxiliar') {
                header("Location: auxiliar.php");
            }
            exit();
        } else {
            echo "<div class='alert alert-danger'>Acceso denegado</div>";
        }
    } else {
        echo "<div class='alert alert-warning'>Campos vacíos.</div>";
    }
}

// Consultar usuarios
$usuariosQuery = "SELECT * FROM tecnicos;";
$usuariosResult = $conexion->query($usuariosQuery);

// Consultar computadores
$computadoresQuery = $conexion->query("SELECT * FROM equipos;");

//consulta procedimento

$proeceidmentos= $conexion->query("SELECT * FROM procedimientos;");


<?php
session_start();
session_unset();
include "php/Functions.php";
try {
    SQL_Connect("db_users");
}
catch(mysqli_sql_exception $e)
{
    $connection = mysqli_connect('localhost', 'root', '');
    $sql = file_get_contents("DB_Setup.sql");
    mysqli_multi_query($connection, $sql);

}

if(isset($_GET['logoutRequest']))
{
    session_destroy();
    header("Location: http://localhost/BancodeDados/");
}

if(isset($_POST["usernameRegister"], $_POST["passwordRegister"]))
{
    include "php/Classes/RegisterRequest.php";
    $RegisterRequest = new RegisterRequest($_POST);
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <link rel="stylesheet" href="http://localhost/BancodeDados/css/Index.css"/>
    <link rel="stylesheet" href="http://localhost/BancodeDados/css/Forms.css"/>
    <link rel="php" href="login.php"/>
    <script src="http://localhost/BancodeDados/scripts/Functions.js"></script>
    <script src="http://localhost/BancodeDados/scripts/IndexScript.js"></script>
    <script src="http://localhost/BancodeDados/scripts/FormsScript.js"></script>
    <title>DB Manager</title>
</head>
<body>
<div class="background-gradient">
<header id="header">
        <div id="loginwrapper">
            <span>
            <img id="login-img" src="http://localhost/BancodeDados/img/User.png" alt="Login"/>
            </span>
        </div>
</header>

<div id="mainwrapper">
<div id="main-text-wrapper">
    <span class="large-font" id="main-text">Database Management</span>
    <br/>
    <span class="small-font" id="sub-main-text">But with prety UI</span>
</div>
<div id="secondary-text-wrapper">
    <span class="large-font" id="secondary-text">Create</span>
    <br/>
    <!--<span class="small-font" id="sub-secondary-text"></span>-->

</div>
</div>
</div>
<div id="form">
        <div id="form-header">
            <div id="menu-title"></div>
            <div id="close-menu">
                <span id="x">X</span>
            </div>
        </div>
        <div id="formwrapper"></div>
</div>
<?php
?>
</body>
</html>
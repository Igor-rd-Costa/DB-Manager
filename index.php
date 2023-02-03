<?php
session_start();
include "php/Functions.php";
if(isset($_POST["username"],$_POST["password"]))
{
  USER_Login();
}

if(isset($_GET['logoutRequest']))
{
    session_destroy();
    header("Location: http://localhost/BancodeDados/");
}

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <link rel="stylesheet" href="css/Index.css"/>
    <link rel="stylesheet" href="css/Forms.css"/>
    <link rel="php" href="login.php"/>
    <script src="scripts/Functions.js"></script>
    <script src="scripts/IndexScript.js"></script>
    <script src="scripts/FormsScript.js"></script>
    <title>Document</title>
</head>
<body>
<div class="background-gradient">
<header id="header">
    <div id="main-img-wrapper"></div>
    <div id="test1"></div>
        <div id="loginwrapper">
            <span>
            <img id="login-img" src="img/User.png" alt="Login"/>
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
    <span class="small-font" id="sub-secondary-text"></span>

</div>
</div>
</div>
<div class="testss">
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